import React, { Component } from 'react';
//import { AsyncTypeahead } from 'react-bootstrap-typeahead';
//import axios from 'axios';
import { authHeader } from '../../../_helpers';
import { CONST } from '../../../_config';
//import 'react-dates/initialize';
//import 'react-dates/lib/css/_datepicker.css';
//import { SingleDatePicker} from 'react-dates';
//import TimePicker from 'react-times';
// use material theme
//import 'react-times/css/material/default.css';
// or you can use classic theme
//import 'react-times/css/classic/default.css';
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';
import swal from 'sweetalert';


import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
} from 'reactstrap';

import * as moment from 'moment';
import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { cricketActions } from '../../../_actions';

const matchstatus={
  "cl":"Cancelled",
  "cm":"Complete",
  "dc":"Declared",
  "li":"Live",
  "uc":"Upcoming"
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  window.location.href = "#/login"
}

class AllMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      startDate:null,
      endDate:null,
      selectedteam1:-1,
      selectedteam2:-1,
      total:0,
      selectedPage:0,
      addMatchModal: false,
      checkmatchtype1:true,
      checkmatchtype2:false,
      checkmatchtype3:false,
      matchdate:"",
      smatchid:"",
      isLoading:false,
      gameid:0
    };
    this.activeMatch = this.activeMatch.bind(this);
    this.addMatchToggle = this.addMatchToggle.bind(this);
    this.addMatch = this.addMatch.bind(this);
    this.resetMatch = this.resetMatch.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange1 = this.onDateChange1.bind(this);
    this.onFocusChange1 = this.onFocusChange1.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
    this.onDateChangematch = this.onDateChangematch.bind(this);
    this.onFocusChangematch = this.onFocusChangematch.bind(this);
    this.selectMatchType = this.selectMatchType.bind(this);
    this.onTimeChangematch = this.onTimeChangematch.bind(this);
    this.onFocusTimeChangematch = this.onFocusTimeChangematch.bind(this);
    
    this.editTimeToggle = this.editTimeToggle.bind(this);
    this.editTimeCoseToggle=this.editTimeCoseToggle.bind(this);
    this.onFocusTimeChangematch = this.onFocusTimeChangematch.bind(this);
    this.onTimeChangematch = this.onTimeChangematch.bind(this);
    this.editTimeSubmit=this.editTimeSubmit.bind(this);
  }
  componentDidMount() {
    let data={};
    let gameid=0;
    if(this.props.location.pathname==="/kabaddi/allmatch"){
      gameid=3;
    }else if(this.props.location.pathname==="/cricket/allmatch"){
      gameid=1;
    }
    this.setState({gameid:gameid},()=>{
        data.atype="fixtures";
        data.gameid=gameid;
        this.props.dispatch(cricketActions.allMatch(data));
        //this.props.dispatch(cricketActions.getTeamList());
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cricket.allmatch) {
      // let data={
      //   limit:10
      // }
      /*let data = {
        limit: 10,
        page: this.state.selectedPage,
        allmatchlist:[]
      };
      //this.props.dispatch(cricketActions.allMatch(data));*/

      if(nextProps.cricket.allmatch.error===false)
      {
        this.setState({allmatchlist:nextProps.cricket.allmatch.data});
      }
      else
      {
        this.setState({allmatchlist:[]});
      }
    }
   
   
    if (nextProps.cricket.upcommingmatch) {
      this.setState({ 
          total: nextProps.cricket.upcommingmatch.total,selectedPage:1
      });
    }
  }

  editTimeToggle(matchdetail) {
    
    //moment(this.state.matchDate).format('YYYY-MM-DD')
    let matchdate=(new Date(parseInt(matchdetail.mdategmt)*1000));
    console.log("matchdetail--->>",matchdetail)
    this.setState({
      editTimeModel: !this.state.editTimeModel,
      matchdate,
      smatchid:matchdetail.matchid
    });
  }

  editTimeCoseToggle(){
    this.setState({
      editTimeModel: !this.state.editTimeModel
    })
  }

  onDateChange = (startDate) => {
    this.setState(() => ({ startDate }));
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }
  onDateChange1 = (endDate) => {
    this.setState(() => ({ endDate }));
  }
  onFocusChange1 = ({ focused }) => {
    this.setState(() => ({ calendarFocused1: focused }))
  }
  resetMatch() {
    this.setState({                 
      listOfMatches: [],
      listOfMatchesTotal: 0 ,
      startDate:null,
      endDate:null,
      findmatch:'',
      selectedMathId:'',
      matchid: '',
      team1: '',
      team2: '',
      matchname: '',
      gametype: 'cricket',
      mstarted: false,
      mdate: '',
      mtype: '',
      mdategmt: '',
      checkmatchtype1:true,
      checkmatchtype2:false,
      checkmatchtype3:false,
    });
    let data={
      page:1,
      limit:10,
      gameid:this.state.gameid
    }
    this.props.dispatch(cricketActions.allMatch(data));
  }
  //Add Dialog box
  addMatchToggle() {
    this.setState({
      addMatchModal: !this.state.addMatchModal
    });
  }
  addMatch() {
    let data = {
      mdate: moment(this.state.matchDate).format('YYYY-MM-DD'),
      dateTimeGMT: moment(this.state.matchDate).format('YYYY-MM-DD')+" "+this.state.hour+":"+this.state.minute,
      mtype: this.state.selectedmatchType,
      team1: this.state.selectedteam1,
      gameid: this.state.gameid,
      team2: this.state.selectedteam2
    };
    console.log(data);
    
    this.props.dispatch(cricketActions.addDomMatch(data));
  }

  activeMatch(matchDetails) {
    console.log(matchDetails);
    
      let data={
          'matchid': matchDetails.unique_id,
          'isactive':1,
          gameid:this.state.gameid
      }
      console.log(data);
      
      this.props.dispatch(cricketActions.allMatch(data));

  }
  handleChangeSearch(e) {

    const { value } = e.target;
    this.setState({selectedPage:0,findmatch:value.replace(/^\s+|\s+$/g, '')})
  }
  //Pagination
  handleSelectedPaginate(selectedPage) {
    console.log(selectedPage);
    
    let data = {
      limit: 10,
      page: selectedPage,
      'search': this.state.findmatch,
      'date1': this.state.startDate? moment(this.state.startDate).format('DD-MM-YYYY'):null,
      'date2': this.state.endDate? moment(this.state.endDate).format('DD-MM-YYYY'):null,
      gameid:this.state.gameid
    };
    this.setState( { selectedPage:selectedPage });
    this.props.dispatch(cricketActions.allMatch(data));
  }
  selectTeam(e) {
    const { value,name } = e.target;
   
    if (name==='team1') {
      this.setState({
        selectedteam1:value
      })
    }else if (name==='team2') {
      this.setState({
        selectedteam2:value
      })
    }
  }
  selectMatchType(e) {
    const { value } = e.target;
    this.setState({
      selectedmatchType:value
    })
  }
  onDateChangematch = (matchDate) => {
    console.log("onDateChangematchmatchDate===>>",matchDate);
    this.setState(() => ({ matchDate }));
  }
  onFocusChangematch = ({ focused }) => {
    this.setState(() => ({ matchDateFocused: focused }))
  }
  onTimeChangematch = (matchTime) => {
    console.log("matchTime  ",matchTime);
    this.setState(() => ({hour: matchTime.hour,minute: matchTime.minute}));
  }
  onFocusTimeChangematch = ({ focused }) => {
    this.setState(() => ({ matchTimeFocused: focused }))
  }

  onChaneType =(e)=>{
    let formthis=this;
    let data={
      gameid:this.state.gameid
    };
    if(e.target.name==="f1")
    {
      this.setState({checkmatchtype1:true,
        checkmatchtype2:false,
        checkmatchtype3:false,
        allmatchlist:[]},()=>{
          data.atype="fixtures";
          formthis.props.dispatch(cricketActions.allMatch(data));
        });
    }
    if(e.target.name==="f2")
    {
      this.setState({checkmatchtype2:true,
        checkmatchtype1:false,
        checkmatchtype3:false,
        allmatchlist:[]},()=>{
          data.atype="live";
          formthis.props.dispatch(cricketActions.allMatch(data));
        });
    }
    if(e.target.name==="f3")
    {
      this.setState({checkmatchtype3:true,
        checkmatchtype1:false,
        checkmatchtype2:false,
        allmatchlist:[]},()=>{
          data.atype="results";
          formthis.props.dispatch(cricketActions.allMatch(data));
        });
    }
    
  }


  editTimeSubmit=()=>{
    //console.log("this.state.matchdate--->>>",this.state.matchdate);
    let dateed=moment(new Date(this.state.matchdate)).utcOffset("+05:30").format("YYYY-MM-DD HH:mm")//(this.state.matchdate).format("YYYY-MM-DD HH:mm:ss");
    //console.log("dateed--->>>",dateed);
    let formthis=this;
    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    });
    let data={
      gameid:this.state.gameid
    };
    data.matchid=this.state.smatchid;
    data.mtime=dateed;
    const requestOptions = {
      method: "POST",
      headers: header,
      body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/matchtimeupdate`, requestOptions)
      .then(handleResponse)
      .then(res => {
        toast(res.msg);

        let data={};
        
        if(formthis.state.checkmatchtype1===true)
        {
          data.atype="fixtures";
        }
        if(formthis.state.checkmatchtype2===true)
        {
          data.atype="live";
        }
       
        formthis.props.dispatch(cricketActions.allMatch(data));

        formthis.editTimeCoseToggle();
        //return updatematchtime;
      });
  }

  onChange =(matchdate)=>{
    console.log("matchdate-->>",matchdate);
    this.setState({ matchdate })
  } 


  editCancelMatchSubmit=(matchdetail)=>{
    let formthis=this;
    this.setState({isLoading:true});
    let data={
      gameid:this.state.gameid
    };
    swal({
      html:true,
      title: "Are you sure?",
      text: "You want to cancel",
      icon: "warning",
      buttons: [
        'No',
        'Yes'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        
        /////////////
        var args1 = {
          matchid : matchdetail.matchid
        };
        var object = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader().Authorization
          },
          body: JSON.stringify(args1)
        }

        var apiUrl = CONST.BACKEND_URL + "/api/cancelMatch";
        fetch(apiUrl, object)
          .then(function (response) {
              response.json().then(json => {
                if (json.error === false) {
                  swal({
                    title: "Cancel",
                    text: "Cancel Match successfully",
                    icon: "success",
                  });
                  if(formthis.state.checkmatchtype1===true)
                  {
                    data.atype="fixtures";
                  }
                  if(formthis.state.checkmatchtype2===true)
                  {
                    data.atype="live";
                  }
                  formthis.setState({isLoading:false});
                  formthis.props.dispatch(cricketActions.allMatch(data));

                  
                  
                }
                else {
                  swal({
                    title: "Wrong!",
                    text: json.msg,
                    icon: "warning",
                  });  
                  formthis.setState({isLoading:false});
                }
              })
            
          }).catch(error => {
            swal({
              title: "Error!",
              text: error.toString(),
              icon: "error",
            });  
            formthis.setState({isLoading:false});
          });
        ////////////////

      }
      else
      {
        formthis.setState({isLoading:false});
      }
    })
    //////////////
    
  }

  render() {
    const { cricket } = this.props;
    this.matchTypeData=[{value:'Test',name:'Test'},{value:'ODI',name:'ODI'},{value:'Twenty20',name:'Twenty20'}]
    let formthis=this;
    return (
      <div className="animated fadeIn ">
      {cricket.loading || this.state.Loading?<div className="loader"></div>:null}
        <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                <Row>
                      <Col xs="2">
                           <input type="radio" name="f1"  checked={this.state.checkmatchtype1} onChange={formthis.onChaneType} /> Fixture
                      </Col>
                      <Col xs="2">
                           <input type="radio" name="f2" checked={this.state.checkmatchtype2} onChange={formthis.onChaneType} /> Live
                      </Col>
                      <Col xs="2">
                           <input type="radio" name="f3" checked={this.state.checkmatchtype3} onChange={formthis.onChaneType} /> Result
                      </Col>
                     
                  </Row>
                </CardBody>
              </Card>
            </Col>
          <Col xl={12}>
            <Card>
              <CardHeader>
                    <i className="fa fa-align-justify" />{' '}
                    <strong>MATCH List</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Match Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Team1</th>
                      <th scope="col">Team2</th>
                      <th scope="col">DateTime</th>
                      <th scope="col">Status</th>
                      {(formthis.state.checkmatchtype1===true)?(<th scope="col">Change Time</th>):null} 
                      {(formthis.state.checkmatchtype2===true)?(<th scope="col">Refund/Cancel Match</th>):null}

                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allmatchlist
                      ? this.state.allmatchlist.map((matchs, index) => (
                          <tr key={index}>
                          <td>{(index + 1)}</td>
                            <td>{matchs.matchname}</td>
                            <td>{matchs.mtype}</td>
                            <td>{matchs.team1}</td>
                            <td>{matchs.team2}</td>
                            <td>{moment(new Date(parseInt(matchs.mdategmt)*1000)).utcOffset("+05:30").format("YYYY-MM-DD HH:mm")}</td>
                            <td>{matchstatus[matchs.mstatus]}</td>
                           {(formthis.state.checkmatchtype1===true)?(<td><i className="cui-calendar h5" onClick={()=>formthis.editTimeToggle(matchs)}></i> </td>):null} 
                           {(formthis.state.checkmatchtype2===true)?( <td><i style={{cursor: 'pointer' }} className="cui-circle-x h5" onClick={()=>formthis.editCancelMatchSubmit(matchs)}></i></td>):null}
                          </tr>
                        ))
                      : "No result"}
                  </tbody>
                
                </Table>{this.state.total ?this.state.total:null}
                {this.state && this.state.total > 10 ? (
                  <PaginationComponent
                    totalItems={parseInt(this.state.total)}
                    pageSize={10}
                    onSelect={this.handleSelectedPaginate}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Col>
          <Col xl={6}>
          </Col>
        </Row>
        
        <Modal
          isOpen={this.state.editTimeModel}
          toggle={this.editTimeCoseToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.editTimeCoseToggle}>
          Set Time
          </ModalHeader>
          <ModalBody>
          <Row>
              <Col xs="4">
                <FormGroup>
                    <Label htmlFor="pid">Match Date</Label>
                    <DateTimePicker
                      onChange={this.onChange}
                      value={this.state.matchdate}
                    />
                </FormGroup>
              </Col>
             
            </Row>
           
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editTimeSubmit()}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.editTimeCoseToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { cricket, authentication } = state;
  const { user } = authentication;
  return {
    user,
    cricket
  };
}

function handleResponse(response) {
  
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log("response--->>>",data); 
    if(data.error===true)
    {
      toast(data.msg);
    }
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.msg) || response.statusText;
      return Promise.reject(error);
    }
    if (data.error) {
      const error = (data && data.msg) || response.statusText;
      return Promise.reject(error);
    }
    //console.log("datadatadata ", data);

    return data;
  });
}

export default connect(mapStateToProps)(AllMatch);