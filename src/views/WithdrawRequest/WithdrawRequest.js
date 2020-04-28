import React, { Component } from 'react';
//import Switch from 'react-switch';
import { CONST } from '../../_config';
 import { CSVLink } from "react-csv";
import { authHeader } from '../../_helpers';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  //Badge,
  Button,
  // Modal,
  // ModalBody,
  // ModalFooter,
  // ModalHeader,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  // ListGroup,
  // ListGroupItem
} from 'reactstrap';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker} from 'react-dates';
import axios from 'axios';
import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { withdrawActions } from '../../_actions';
//import { toast } from 'react-toastify';

class WithdrawRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tblheader:{tbl_status:null,startDate:null,endDate:null},
      addWithdrawModal: false,
      showWithdrawModal: false,
      deleteWithdrawModal: false,
      selectedPage: 0,
      totalpage: 0,
      reportData:null,
      checked: false,
      isCSV:false,
       startDate:null,
      endDate:null,
      searchValue:'',
    };
    this.getReportData = this.getReportData.bind(this);
    this.udpateStatus = this.udpateStatus.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.tblHeaderUpdate = this.tblHeaderUpdate.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange1 = this.onDateChange1.bind(this);
    this.onFocusChange1 = this.onFocusChange1.bind(this);
    this.resetFormData = this.resetFormData.bind(this);
  }
  componentDidMount() { 
      let data = {
      "limit": 10,
      "page": 1,
    }
    this.props.dispatch(withdrawActions.getAllWithdraw(data));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.withdraw.total >= 0) {
      this.setState({ totalpage: nextProps.withdraw.total })
    }

    if (nextProps.withdraw.isUpdate) {
      this.props.dispatch(withdrawActions.getAllWithdraw());
    }

  }
    handleChangeSearch(e) { 
    let { value } = e.target;
    // console.log("name ", name);
    //  console.log("value ", value);
    value = value.replace(/^\s+|\s+$/g, '');
    this.setState({ isCSV: false,searchValue:value });

    let data = {
      "limit": 10,
      "page": 1,
      "search":value ,
    }
    this.props.dispatch(withdrawActions.getAllWithdraw(data));
  }
  udpateStatus(withdraw) {
    this.setState({ isCSV: false });
    let data={
      id:withdraw.id,
      status:"1"
    }
    this.props.dispatch(withdrawActions.updateWithdraw(data));
  }

  handleSelectedPaginate(selectedPage) {
    this.setState({ isCSV: false });
    let formthis=this;
    this.setState({selectedPage:selectedPage},()=>{
    let data = {
      "limit": 10,
      "page": selectedPage,
      "search":this.state.searchValue ,
      "search_obj":this.state.tblheader,
    }
    formthis.props.dispatch(withdrawActions.getAllWithdraw(data));
  });
  }
  getReportData = () => {
    this.setState({ isCSV: true });
    let value= this.state.searchValue;
    value = value.replace(/^\s+|\s+$/g, '');
    let data = {
      search: value ,
      search_obj:this.state.tblheader,
    };

    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': authHeader().Authorization
      }
    };
    
    axios.post(CONST.BACKEND_URL + `/api/getwithdrawalreq`, data, config)
      .then((response) => {
        console.log("response   ", response.data.data.list);
        //...element,moment(1382086394000).format("DD-MM-YYYY h:mm:ss")
       //let newArray=response.data.data.list.map((element)=>({id:element.id,userid:element.userid,email:element.email,phone:element.phone,amount:element.amount,status:element.status,date:moment(element.created*1000).format("DD-MM-YYYY h:mm")}))
        let newArray=response.data.data.list.map((element)=>({...element,created:moment(element.created*1000).format("DD-MM-YYYY h:mm"),status:element.status==='0'?'Not Paid':'Paid'}))
       this.setState({reportData:newArray})

      })
      .catch((error) => {
        console.log('========================33333333============');
        console.log(error);
        console.log('====================================');
      });
  }

  tblHeaderUpdate(e) {
    const { name, value } = e.target;
    let tblheader=this.state.tblheader;
    tblheader[name]=value;
    this.setState({ tblheader: tblheader });

    let data = {
      "limit": 10,
      "page": 1,
      "search_obj":this.state.tblheader,
    }
    this.props.dispatch(withdrawActions.getAllWithdraw(data));
  }

  onDateChange = (startDate) => { 
    
    let tblheader=this.state.tblheader;
    tblheader["startDate"]=startDate;
    this.setState({ tblheader: tblheader ,startDate:startDate});
    let data = {
      "limit": 10,
      "page": 1,
      "search_obj":this.state.tblheader,
    }
    this.props.dispatch(withdrawActions.getAllWithdraw(data));

  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  };
  onDateChange1 = (endDate) => {

    let tblheader=this.state.tblheader;
    tblheader["endDate"]=endDate;
    this.setState({ tblheader: tblheader ,endDate:endDate});
    let data = {
      "limit": 10,
      "page": 1,
      "search_obj":this.state.tblheader,
    }
    this.props.dispatch(withdrawActions.getAllWithdraw(data));
  };
  onFocusChange1 = ({ focused }) => {
    this.setState(() => ({ calendarFocused1: focused })) 
  };

  resetFormData(type){
    if(type==='all'){

      this.setState({ searchValue:'', startDate:'',endDate:'',tblheader:{tbl_status:'',startDate:'',endDate:''} });
    }else{

      
    }

  }
  render() {
    const { withdraw } = this.props;
    let { items } = withdraw;
    return (
      <div className="animated fadeIn custom_background">
        {withdraw.loading?<div className="loader"></div>:null}
        <Row>

          <Col xl={12}> 
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="2">
                    <i className="fa fa-align-justify" /> WithdrawRequest{' '}
                    <small className="text-muted"></small>
                  </Col>
                  <Col xl="3">
                  <Button color="secondary" onClick={this.getReportData} >
                   Download Report
                  </Button>
                  
                  {this.state.isCSV===true && this.state.reportData?
                  <CSVLink 
                    asyncOnClick={true}
                    //onClick={this.getReportCSV} 
                    data={this.state.reportData} 
                    >
                    Download link
                  </CSVLink>:null}
                  </Col>

                  <Col xs="2" >
                      <FormGroup>
                       
                                  <SingleDatePicker
                                      date={this.state.startDate} 
                                      onDateChange={this.onDateChange}
                                      focused={this.state.calendarFocused} 
                                      onFocusChange={this.onFocusChange} 
                                      numberOfMonths={1}
                                      small={true}
                                      displayFormat="DD/MM/YYYY"
                                      placeholder="Start Date"
                                      isOutsideRange={day => (moment().diff(day) === 0)}
                                  />
                        </FormGroup>
                      </Col>
                      <Col xs="2" >
                          <FormGroup>
                         
                              <SingleDatePicker
                                  date={this.state.endDate} 
                                  onDateChange={this.onDateChange1}
                                  focused={this.state.calendarFocused1} 
                                  onFocusChange={this.onFocusChange1} 
                                  numberOfMonths={1}
                                  small={true}
                                  isOutsideRange={day => (moment().diff(day) === 0)}
                                  placeholder="End Date"
                                  displayFormat="DD/MM/YYYY"
                              />
                        </FormGroup>
                </Col>
                  <Col xl="3">
                   <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="primary">
                          <i className="fa fa-search" />
                        </Button>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="search"
                        onChange={this.handleChangeSearch} 
                        autoComplete="off"
                        value={this.state.searchValue}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>
                <Row>
                <Col xl="11" />
                <Col xl="1">
                <span title="Reset Form" className="mr-1" style={{cursor:'pointer'}} onClick={()=>this.resetFormData('all')} > <i class="fa fa-refresh" aria-hidden="true"></i> </span>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">PHONE</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">Name</th>
                      <th scope="col"> IFSC CODE</th>
                      <th scope="col"> ACCOUNT No.</th>
                    {/*  <th>Current Win Amt</th> */ }
                      <th scope="col">REQ. AMOUNT</th> 
                      <th scope="col">DATE</th>
                      <th scope="col"><Input
                    type="select"
                    name="tbl_status"
                    id="tbl_status"
                    autoComplete="off"
                    onChange={this.tblHeaderUpdate}
                    value={this.state.tblheader.tbl_status}      
                      >
                  { <option key='0' value='0'>STATUS</option>}
                  { <option key='1' value='1'>Pay</option>}
                  { <option key='2' value='2'>Paid</option>}          
                  </Input></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      ? items.map((withdraw, index) => (
                          <tr key={index}>
                            <td>{this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}</td>
                            <td><a block color="link" href={`#/users/allusers/${withdraw.userid}`}>{withdraw.phone}</a></td>
                            <td><a block color="link" href={`#/users/allusers/${withdraw.userid}`}>{withdraw.email}</a></td>
                            <td>{withdraw.acholdername}</td>
                            <td>{withdraw.ifsccode}</td>
                            <td>{withdraw.acno}</td>
                          {/*  <td>{withdraw.wltwin}</td> */}
                            <td>{withdraw.amount}</td>
                           
                             <td>{moment(new Date(parseInt(withdraw.created)*1000)).utcOffset("+05:30").format("YYYY-MM-DD")}</td>
                            <td>
                            {withdraw.status === "0" ?<span><Button className="btn-sm btn-square btn-success" onClick={() => this.udpateStatus(withdraw,1)}>Pay</Button> </span>:"Paid"} 
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
                {this.state.totalpage > 10 ? (
                  <PaginationComponent
                    totalItems={parseInt(this.state.totalpage)}
                    pageSize={10}
                    onSelect={this.handleSelectedPaginate}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { withdraw, authentication } = state;
  const { user } = authentication;

  return {
    user,
    withdraw
  };
}
export default connect(mapStateToProps)(WithdrawRequest);
