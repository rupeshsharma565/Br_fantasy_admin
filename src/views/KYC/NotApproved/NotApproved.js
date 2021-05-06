import React, { Component } from 'react';

import { Card, CardBody, CardHeader, Col, Row, Table, Badge,
 FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
 } from 'reactstrap';
import { CSVLink } from "react-csv";

import PaginationComponent from "react-reactstrap-pagination";
import { connect } from 'react-redux';
import { userActions } from '../../../_actions';
import moment from 'moment'


class NotApproved extends Component {
   constructor(props) {
    super(props);
    this.state = {
       totalpage: 0,
       selectedPage:0,
        isCSV:false,
    }
    this.udpateUserStatus = this.udpateUserStatus.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.downloadMeClick = this.downloadMeClick.bind(this);

  }
  componentDidMount() {
    console.log("componentDidMount");
    let data={
      atype:'kycnonapproved',
      limit: 10,
      page: 1,
      search: ""
    }
    this.props.dispatch(userActions.getAll(data));
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.isCSV) {
       let newArray=nextProps.users.items?nextProps.users.items.map(({id,username,...element})=>({...element,logindate:moment(element.logindate*1000).format("DD-MM-YYYY h:mm"),
       created:moment(element.created*1000).format("DD-MM-YYYY h:mm"),
       status:element.status==='0'?'Inactive':'Active',isuserverify:element.isuserverify==='0'?'No':'Yes',
       isphoneverify:element.isphoneverify==='0'?'No':'Yes',
       logintype:element.logintype==='N'?'Normal':element.logintype==='F'?'Facebook':'Google',
       isemailverify:element.isemailverify==='0'?'No':'Yes',
       isbankdverify:element.isbankdverify==='0'?'No':'Yes',ispanverify:element.ispanverify==='0'?'No':'Yes'})):null;
        this.setState({ 
          totalpage: nextProps.users.prevTotal,
          items: nextProps.users.prevItem,
          csvuseritem: newArray,
         });
    }else{
      this.setState({ 
        totalpage: nextProps.users.prevTotal,
        items: nextProps.users.items
      })
    }
    if (nextProps.users.isUpdate) {
       let data = {
          "limit": 10,
          "page": this.state.selectedPage,
          "search": '',
          atype:'kycnonapproved'
        }
        this.props.dispatch(userActions.getAll(data));
    }
     this.setState({ 
      totalpage: nextProps.users.prevTotal?nextProps.users.prevTotal:nextProps.users.total
    });
  }
  getBadge = (status) => {
    return status === "1" ? 'success' :
      'danger'
  }
  handleSelectedPaginate(selectedPage) {
    let data = {
      limit: 10,
      page: selectedPage,
      search: '',
      atype:'kycnonapproved'
    }
    this.setState({isCSV:false});
    this.setState({ selectedPage: selectedPage })
  

    this.props.dispatch(userActions.getAll(data));
  }
  handleChangeSearch(e) {
    const { value } = e.target;
    let data = {
      "limit": 10,
      "page": 1,
      "search": value.replace(/^\s+|\s+$/g, ''),
      atype:'kycnonapproved'
    }
    this.setState({isCSV:false});
    this.props.dispatch(userActions.getAll(data));
  }
  udpateUserStatus = (user,status) => {
    console.log(user);
    console.log(status);
    let data={
      userid:user.id,
      status:status
    }
    this.props.dispatch(userActions.updateUserStatus(data));
  }
    downloadMeClick=()=>{
    this.setState({isCSV:true});
    let data1={
      atype:'kycnonapproved'
    }
    this.props.dispatch(userActions.getAll(data1));
  }
  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify"></i> User <small className="text-muted">List</small>
                  </Col>
                  <Col xl="3">
                  <Button color="secondary" onClick={this.downloadMeClick} >
                   Download All Users Report
                </Button>
                
                {this.state.isCSV===true && this.state.csvuseritem?
                <CSVLink 
                  asyncOnClick={true}
                  //onClick={this.getReportCSV} 
                  data={this.state.csvuseritem} 
                  >
                  Download link
                </CSVLink>:null}
                  </Col>
                  <Col xl="3">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="primary" ><i className="fa fa-search"></i></Button>
                      </InputGroupAddon>
                      <Input type="text" id="search" name="search" placeholder="search" onChange={this.handleChangeSearch} autoComplete="off" />
                    </InputGroup>
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">PHONE</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">TEAM NAME</th>
                      <th scope="col">REG. DATE</th>
                      <th scope="col">PHONE VERIFY</th>
                      <th scope="col">EMAIL VERIFY</th>
                      <th scope="col">PAN VERIFY</th>
                      <th scope="col">BANK VERIFY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.items ? this.state.items.map((user, index) => <tr key={user.id}>
                        <td>{this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}</td>
                        <td><a block color="link" href={`#/users/allusers/${user.id}`}>{user.phone}</a></td>
                        <td><a block color="link" href={`#/users/allusers/${user.id}`}>{user.email}</a></td>
                        <td><a block color="link" href={`#/users/allusers/${user.id}`}>{user.teamname}</a></td>
                        <td>{moment(new Date(parseInt(user.created)*1000)).utcOffset("+05:30").format("YYYY-MM-DD")}</td>
                        <td><Badge color={this.getBadge(user.isphoneverify)} >{user.isphoneverify==="0"?"Not Verify":"Verified"}</Badge></td>
                        <td><Badge color={this.getBadge(user.isemailverify)} >{user.isemailverify==="0"?"Not Verify":"Verified"}</Badge></td>
                        <td><Badge color={this.getBadge(user.ispanverify)} >{user.ispanverify==="0"?"Not Verify":"Verified"}</Badge></td>
                        <td><Badge color={this.getBadge(user.isbankdverify)} >{user.isbankdverify==="0"?"Not Verify":"Verified"}</Badge></td>
                      </tr >
                      ) : null
                    }
                  </tbody>
                </Table>
                {
                parseInt(this.state.totalpage) > 10 ?
                 (<PaginationComponent totalItems={parseInt(this.state.totalpage)} pageSize={10} onSelect={this.handleSelectedPaginate} />) 
                 : (null)
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}
export default connect(mapStateToProps)(NotApproved);


