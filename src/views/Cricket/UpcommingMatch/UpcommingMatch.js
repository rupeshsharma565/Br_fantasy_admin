import React, { Component } from 'react';
//import { AsyncTypeahead } from 'react-bootstrap-typeahead';
//import axios from 'axios';
//import { authHeader } from '../../../_helpers';
//import { CONST } from '../../../_config';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker} from 'react-dates';
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';


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
  Input,
  ModalFooter,
  Badge
} from 'reactstrap';

import * as moment from 'moment';
import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { cricketActions } from '../../../_actions';

class CricketMatch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      startDate:null,
      endDate:null,
      selectedteam1:-1,
      selectedteam2:-1,
      total:0,
      selectedPage:1,
      addMatchModal: false,
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
    this.searchMatchesList = this.searchMatchesList.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
    this.onDateChangematch = this.onDateChangematch.bind(this);
    this.onFocusChangematch = this.onFocusChangematch.bind(this);
    this.selectMatchType = this.selectMatchType.bind(this);
    this.onTimeChangematch = this.onTimeChangematch.bind(this);
    this.onFocusTimeChangematch = this.onFocusTimeChangematch.bind(this);
  }
  componentDidMount() {
    let formthis=this;
    let gameid=0;
    if(this.props.location.pathname==="/kabaddi/upcommingmatch"){
      gameid=3;
    }else if(this.props.location.pathname==="/cricket/upcommingmatch"){
      gameid=1;
    }
    else if(this.props.location.pathname==="/football/upcommingmatch"){
      gameid=2;
    }
      console.log("this.state.selectedPage-->>",this.state.selectedPage);
    let data={
      page:this.state.selectedPage,
      limit:10,
      gameid:gameid
    }
    this.setState({gameid:gameid},()=>{
      formthis.props.dispatch(cricketActions.getUpcommingMatch(data));
      formthis.props.dispatch(cricketActions.getTeamList());
    });

    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cricket.isActivated) {
      // let data={
      //   limit:10
      // }
      let data = {
        limit: 10,
        page: this.state.selectedPage,
        search: '',
        gameid:this.state.gameid
      };
      this.props.dispatch(cricketActions.getUpcommingMatch(data));
    }
    if (nextProps.cricket.teamList) {

      let teamList = [{name:"Select Team",value:-1}];
      nextProps.cricket.teamList.map(function(el) {
         teamList.push({name:el.teamname,value:el.teamname})
         var o = Object.assign({});
        return o;
      });
      this.setState({ 
          teamList: teamList
      });
    }
    if (nextProps.cricket.domMatchAdded) {
      this.setState({ 
          addMatchModal: false
      });
      let data={
        page:1,
        limit:10,
        gameid:this.state.gameid
      }
      this.props.dispatch(cricketActions.getUpcommingMatch(data));
    }
    if (nextProps.cricket.upcommingmatch) {
      this.setState({ 
          total: nextProps.cricket.upcommingmatch.total,
          selectedPage:this.state.selectedPage
      });
    }

    if (nextProps.cricket.loading===false) {
      this.setState({ loading:false});
    }

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
      mdategmt: ''
    });
    let data={
      page:1,
      limit:10,
      gameid:this.state.gameid
    }
    this.props.dispatch(cricketActions.getUpcommingMatch(data));
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
  searchMatchesList() {
   
      let data={
          'search': this.state.findmatch,
          'date1': this.state.startDate?moment(this.state.startDate).format('DD-MM-YYYY'):'',
          'date2': this.state.endDate?moment(this.state.endDate).format('DD-MM-YYYY'):'',
          'page':1,
          'limit':10,
          gameid:this.state.gameid
      }
      this.props.dispatch(cricketActions.getUpcommingMatch(data));
    // else   if (this.state.startDate && this.state.endDate) {
    // let data={
    //   'search': this.state.findmatch,
    //   'date1': moment(this.state.startDate).format('DD-MM-YYYY'),
    //   'date2': moment(this.state.endDate).format('DD-MM-YYYY'),
    //   page:1,
    //   limit:10
    // }
    // this.props.dispatch(cricketActions.getUpcommingMatch(data));
      
    // }else   if (this.state.findmatch) {
    // let data={
    //   'search': this.state.findmatch,
    //   page:1,
    //   limit:10
    // }
    // this.props.dispatch(cricketActions.getUpcommingMatch(data));
      
    // }

  }
  activeMatch(matchDetails) {
   
      let data={
          'matchid': matchDetails.unique_id,
          'isactive':1,
          'page':this.state.selectedPage          
      }
      this.setState({loading:true});
      this.props.dispatch(cricketActions.updateUpcommingMatch(data));
  }
  handleChangeSearch(e) {

    const { value } = e.target;
    this.setState({selectedPage:0,findmatch:value.replace(/^\s+|\s+$/g, '')})
  }
  //Pagination
  handleSelectedPaginate(selectedPage) {
     
    let data = {
      limit: 10,
      page: selectedPage,
      'search': this.state.findmatch,
      'date1': this.state.startDate? moment(this.state.startDate).format('DD-MM-YYYY'):null,
      'date2': this.state.endDate? moment(this.state.endDate).format('DD-MM-YYYY'):null,
      gameid:this.state.gameid
    };
    this.setState( { selectedPage:selectedPage });
    this.props.dispatch(cricketActions.getUpcommingMatch(data));
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
  render() {
    const { cricket } = this.props;
    let { upcommingmatch } = cricket;
    this.matchTypeData=[{value:'Test',name:'Test'},{value:'ODI',name:'ODI'},{value:'Twenty20',name:'Twenty20'}]
    const {
      hour,
      minute,
    } = this.state;

    return (
      <div className="animated fadeIn ">
       {(cricket.loading || this.state.loading)?<div className="loader"></div>:null}
        <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                <Row>
                      <Col xs="2">
                            <SingleDatePicker
                                date={this.state.startDate} 
                                onDateChange={this.onDateChange}
                                focused={this.state.calendarFocused} 
                                onFocusChange={this.onFocusChange} 
                                numberOfMonths={1}
                                small={true}
                                displayFormat="DD/MM/YYYY"
                                placeholder="Start Date"
                                isOutsideRange={day => (moment().diff(day) > 0)}
                            />
                      </Col>
                      <Col xs="2">
                            <SingleDatePicker
                                date={this.state.endDate} 
                                onDateChange={this.onDateChange1}
                                focused={this.state.calendarFocused1} 
                                onFocusChange={this.onFocusChange1} 
                                numberOfMonths={1}
                                small={true}
                                isOutsideRange={day => (moment().diff(day) > 0)}
                                placeholder="End Date"
                                displayFormat="DD/MM/YYYY"
                            />
                      </Col>
                      <Col xs="2">
                          <Input type="text" placeholder="Search Team Name" name="findmatch" id="findmatch" autoComplete="off" value={this.state.findmatch} onChange={this.handleChangeSearch} />                            
                      </Col>
                      <Col xs="1">
                        <Button color="success" onClick={()=> this.searchMatchesList()}> Find
                        </Button>
                      </Col>
                      <Col xs="1">
                        <Button color="info" onClick={()=> this.resetMatch()}> Reset
                        </Button>
                      </Col>

                      <Col xs="2"/>
                      {/* <Col xs="2">
                        <Button color="info" onClick={this.addMatchToggle}> Add Domestic Match
                        </Button>
                      </Col> */}
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
                      <th scope="col">TEAM 1</th>
                      <th scope="col">TEAM 2</th>
                      <th scope="col">Match ID</th>
                      <th scope="col">DATE</th>
                      <th scope="col">MATCH NAME</th>
                      {/* <th scope="col">ACTION</th> */}
                      <th scope="col">Series </th>
                      <th scope="col">UPDATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcommingmatch
                      ? upcommingmatch.list.map((matchs, index) => (
                          <tr key={index}>
                            <td>{this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}</td>
                            <td>{matchs.team1}</td>
                            <td>{matchs.team2}</td>
                            <td>{matchs.unique_id}</td>
                            <td>{moment(matchs.dateTimeGMT).utcOffset("+05:30").format("YYYY-MM-DD HH:mm")}</td>
                            <td>{matchs.mtype}</td>
                            {/* <td >
                                <Badge
                                  className="mr-1"
                                  color={matchs.isactive === 1?"info":"success"}
                                >
                                  {matchs.isactive === 1?'Created':'Not Created'}
                                </Badge>
                            </td> */}
                            <td>{matchs.seriesname}</td>
                              <td >
                                {matchs.isactive === "0"?<button className="custom_btn" onClick={()=> this.activeMatch(matchs)}><i className="fa fa-check"></i></button>:
                                    <Badge className="mr-1" color={"success"} > {'Active'} </Badge>
                                }
                              </td>
                              
                          </tr>
                        ))
                      : null}
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
        <Modal isOpen={this.state.addMatchModal} toggle={this.addMatchToggle} className={this.props.className}>
          <ModalHeader toggle={this.addMatchToggle}> Add Match </ModalHeader>
          <ModalBody>
            {this.state.teamList?<Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pname">Team1</Label>
                  <Input
                            type="select"
                            name="team1"
                            id="team1"
                            onChange={this.selectTeam}
                            value={this.state.selectedteam1}>
                            {
                              this.state.teamList.map((e, key) => {
                                return <option key={key} value={e.value}>{e.name}</option>;
                              })
                            }
                    </Input>
                </FormGroup>
              </Col>
            </Row>:null}

            {this.state.teamList?<Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pname">Team2</Label>
                  <Input
                            type="select"
                            name="team2"
                            id="team2"
                            onChange={this.selectTeam}
                            value={this.state.selectedteam2}>
                            {
                              this.state.teamList.map((e, key) => {
                                return <option key={key} value={e.value}>{e.name}</option>;
                              })
                            }
                    </Input>
                </FormGroup>
              </Col>
            </Row>:null}
            <Row>
              <Col xs="4">
                <FormGroup>
                    <Label htmlFor="pid">Match Date</Label>
                    <SingleDatePicker
                        date={this.state.matchDate} 
                        onDateChange={this.onDateChangematch}
                        focused={this.state.matchDateFocused} 
                        onFocusChange={this.onFocusChangematch} 
                        numberOfMonths={1}
                        small={true}
                        isOutsideRange={day => (moment().diff(day) === 0)}
                        placeholder="End Date"
                        displayFormat="DD/MM/YYYY"
                    />
                </FormGroup>
              </Col>
              <Col xs="8">
                <FormGroup>
                    <Label htmlFor="pid">Match Time</Label>
                    <TimePicker
                    onFocusChange={this.onFocusTimeChangematch.bind(this)}
                    onTimeChange={this.onTimeChangematch.bind(this)}
                    time={hour && minute ? `${hour}:${minute}` : null}
                  />
                </FormGroup>
              </Col>
            </Row>
            {this.matchTypeData?<Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pname">Match Type</Label>
                  <Input
                            type="select"
                            name="team2"
                            id="team2"
                            onChange={this.selectMatchType}
                            value={this.state.selectedmatchType}>
                            {
                              this.matchTypeData.map((e, key) => {
                                return <option key={key} value={e.value}>{e.name}</option>;
                              })
                            }
                    </Input>
                </FormGroup>
              </Col>
             
            </Row>:null}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=> this.addMatch()}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.addMatchToggle}>Cancel</Button> </ModalFooter>
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
export default connect(mapStateToProps)(CricketMatch);