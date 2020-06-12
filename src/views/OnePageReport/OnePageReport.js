import React, { Component } from 'react';
//import Switch from 'react-switch';
import axios from 'axios';
import { authHeader } from '../../_helpers';
import { CONST } from '../../_config';
import { toast } from 'react-toastify';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  FormGroup,
  Input,
  Table,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker} from 'react-dates';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { onepagereportActions } from '../../_actions';
//import { toast } from 'react-toastify';
import { CSVLink } from "react-csv";
import PaginationComponent from "react-reactstrap-pagination";
import Select from 'react-select';
import { formatWithOptions } from 'util';

// const headers = [
//   { label: "First Name", key: "firstname" },
//   { label: "Last Name", key: "lastname" },
//   { label: "Email", key: "email" }
// ];
 
// const data = [
//   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
//   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
//   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
// ];

class OnePageReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOnePageReportModal: false,
      showOnePageReportModal: false,
      deleteOnePageReportModal: false,
      selectedPage:1,
      selectematch:"",
      onepagedatatotal: 0,
      totalpage: 0,
      checked: false,
      startDate:null,
      endDate:null,
      heading:[],
      headingShow:[],
      assignResourceSubAdminModal:false,
      userteamid:0,
      teamuserid:0,
      isCSV:false,
      csvdatalist:[],
      isLoading:false,
      selectedTrans:false,
      amounttype:{},
      selectedFormField:{amounttype:''}
      //teamplayalllist:[]
    };
    this.getMatchList = this.getMatchList.bind(this);
    this.showOnePageReportToggle = this.showOnePageReportToggle.bind(this);
    this.getContestList = this.getContestList.bind(this);
    this.getPoolList = this.getPoolList.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.selectType = this.selectType.bind(this);
    this.selectedPool = this.selectedPool.bind(this);
    this.getReport = this.getReport.bind(this);
    this.resetReport = this.resetReport.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange1 = this.onDateChange1.bind(this);
    this.onFocusChange1 = this.onFocusChange1.bind(this);
    this.handleSelectChangePlayes=this.handleSelectChangePlayes.bind(this);
    this.assignResourceSubAdminToggle = this.assignResourceSubAdminToggle.bind(this);
    this.onChangeCaptian=this.onChangeCaptian.bind(this);
    this.onChangeVCaptian=this.onChangeVCaptian.bind(this);
    this.getReportCSV=this.getReportCSV.bind(this);
    this.searchTeam=this.searchTeam.bind(this);
    this.getSelectedUser=this.getSelectedUser.bind(this);
    this.updateFormField=this.updateFormField.bind(this);
    this.downloadMeClick=this.downloadMeClick.bind(true);
    
  }
  componentDidMount() {
     this.props.dispatch(onepagereportActions.onepagereportfilter());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.onepagereport.updateteamplayer) {
      this.setState({
        assignResourceSubAdminModal: false
      });
    }
    if (nextProps.onepagereport.teamplaylist) {
      let capid="";
      let vcapid="";
      nextProps.onepagereport.teamplaylist.forEach(function(item){
        if(item.iscap==="1")
        {
          capid=item.pid;
        }
        if(item.isvcap==="1") 
        {
          vcapid=item.pid;
        }
        
      })
      
      this.setState({teamplaylist:nextProps.onepagereport.teamplaylist,
        selectedcaptain:capid,
        selectedvcaptain:vcapid
      });
    }
    if (nextProps.onepagereport.teamplayall) {
      let arrPAll=[];
      nextProps.onepagereport.teamplayall.forEach(function(item){
        arrPAll.push({label:item.pname+"("+item.ptype+")",value:item.pid});
      })
      this.setState({teamplayall:arrPAll});
    }
    if (nextProps.onepagereport.filters) {
      let rtype = [];
      Object.keys(nextProps.onepagereport.filters.rtype).reduce((array, key) => {
        rtype.push({ name : nextProps.onepagereport.filters.rtype[key], value: key })
        return [...array, { name : nextProps.onepagereport.filters.rtype[key], value: key }];
      }, []);

      let games = [{name:"SelectAll",value:-1}];
       nextProps.onepagereport.filters.games.map(function(el) {
         games.push({name:el.gname,value:el.id})
         var o = Object.assign({});
        return o;
      });

     /* let users = [{name:"SelectAll",value:-1}];
       nextProps.onepagereport.filters.users.map(function(el) {
        var o = Object.assign({});
        users.push({name:el.email,value:el.id})
        
        return o;
      }); */

      let matchList = [{name:"SelectAll",value:-1}];
      let contestList = [{name:"SelectAll",value:-1}];
      let poolList = [{name:"SelectAll",value:-1}];

      this.setState({ 
          games: games,
          rtype: rtype,
          matchList: matchList,
          contestList: contestList,
          poolList:poolList,
          totalpage:0
      });
    }
    if (nextProps.onepagereport.matchfilter) {
     let matchList = [{name:"SelectAll",value:-1}];
       nextProps.onepagereport.matchfilter.map(function(el) {
         matchList.push({name:el.matchname +" : "+moment(el.mdate*1000).format('DD-MM-YYYY'),value:el.matchid})
         var o = Object.assign({});
        return o;
      });
      if(this.state.selectedgame>-1)
      {
       this.setState({ 
         matchList: matchList,
       });
      }
    }
    if (nextProps.onepagereport.contestfilter) {
     
     let contestList = [{name:"SelectAll",value:-1}];
       nextProps.onepagereport.contestfilter.map(function(el) {
         contestList.push({name:el.title,value:el.contestid})
         var o = Object.assign({});
        return o;
      });
      this.setState({ 
        contestList: contestList,
          totalpage:0
      });
    }
    if (nextProps.onepagereport.poolfilter) {
      let poolList = [{name:"SelectAll",value:-1}];
      nextProps.onepagereport.poolfilter.map(function(el) {
         poolList.push({name:"FEE "+el.joinfee+" WINNING "+el.totalwining,value:el.contestmetaid})
         var o = Object.assign({});
        return o;
      });
      this.setState({ 
        poolList: poolList,
          totalpage:0
      });
    }
let frmthis=this;
    if(this.state.isCSV===false)
    {
    if (nextProps.onepagereport.onepagedata) {
      this.setState({ totalpage: nextProps.onepagereport.onepagedata.total })
      this.setState({ 
        onepagedatalist: nextProps.onepagereport.onepagedata.list,
        onepagedatatotal: nextProps.onepagereport.onepagedata.total,
        heading: Object.keys(nextProps.onepagereport.onepagedata.heading),
        headingShow: nextProps.onepagereport.onepagedata.heading,
        totalpage:nextProps.onepagereport.onepagedata.total,
          
      },()=>{
       
      });
    }else{
       this.setState({ 
        onepagedata: null,
        onepagedatalist:[],
        onepagedatatotal:0,
        heading:[],
        totalpage:0
      });
    }
  }
  else
  {  
    
    if (nextProps.onepagereport.onepagedata) {
      this.setState({ totalpage: nextProps.onepagereport.onepagedata.total })
      this.setState({ 
        csvdatalist: nextProps.onepagereport.onepagedata.list,
        onepagedatatotal: nextProps.onepagereport.onepagedata.total,
        heading: Object.keys(nextProps.onepagereport.onepagedata.heading),
        headingShow: nextProps.onepagereport.onepagedata.heading,
        totalpage:nextProps.onepagereport.onepagedata.total,
          
      },()=>{
        
      });
    }
    else
    {
      this.setState({ 
        onepagedata: null,
        onepagedatalist:[],
        onepagedatatotal:0,
        heading:[],
        totalpage:0
      });
    }
    //////////
  }
  if(nextProps.onepagereport.filters){
  this.setState({amounttype:nextProps.onepagereport.filters.amounttype});
  }
}
  //Show Badge in Table
  getBadge = status => {
    return status === '1' ? 'success' : 'danger';
  };
  //Show Dialog box
  showOnePageReportToggle() {
    this.setState({
      showOnePageReportModal: !this.state.showOnePageReportModal
    });
  }
  showOnePageReportInfo(data) {
    this.setState({
      showAdminid: data.id,
      showAdminname: data.name,
      showAdminusername: data.username,
      showAdminstatus: data.status === '1' ? 'Active' : 'Deactive',
      showOnePageReportModal: !this.state.showOnePageReportModal,
      showAdminusertype: data.usertype,
      showAdmincreated: data.name
    });
  }
  //Add Dialog box
  addOnePageReportToggle() {
    this.setState({
      addOnePageReportModal: !this.state.addOnePageReportModal
    });
  }
  addOnePageReport() {
    this.setState({ submitted: true });
    const { username, password, name } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      let data = {
        username: username,
        name: name,
        password: password
      };
      dispatch(onepagereportActions.addOnePageReport(data));
    }
  }
  handleSelectedPaginate(selectedPage) {
    let data={
       type:this.state.selectedtype?this.state.selectedtype:'teamwise',
       userid:this.state.selecteduser && this.state.selecteduser > 0?this.state.selecteduser:'',
       gameid:this.state.selectedgame && this.state.selectedgame > 0?this.state.selectedgame:'',
       matchid:this.state.selectematch,
       fromdate:this.state.startDate? moment(this.state.startDate).format('DD-MM-YYYY'):'',
       todate:this.state.endDate? moment(this.state.endDate).format('DD-MM-YYYY'):'',
       contest:this.state.selectedcontest && this.state.selectedcontest > 0?this.state.selectedcontest:'',
       pool:this.state.selectedpool && this.state.selectedpool > 0?this.state.selectedpool:'',
       amounttype:this.state.selectedFormField.amounttype,
       limit: 10,
       page: selectedPage,
    }
    this.setState({ selectedPage: selectedPage })

    this.props.dispatch(onepagereportActions.getOnePageReport(data));
  }
  getMatchList(e) {
    const { value } = e.target;
    let data = {
      gameid: value
    };
    if (value<=0) {
      this.setState({
        selectedgame:-1,
        selectematch:"",
        selectedpool:-1,
        selectedcontest:-1
      })
    }else{
      this.setState({selectedgame:value})
      this.props.dispatch(onepagereportActions.getMatchList(data));
    }

  }
  getContestList(e) {
    const { value } = e.target;
    let data = {
      matchid: value
    };

    this.setState({selectematch:value})
    console.log("data::::::::  ",data);
    this.props.dispatch(onepagereportActions.getContestList(data));
  }
  getPoolList(e) {
    const { value } = e.target;
    let data = {
      matchid: this.state.selectematch,
      contestid: value,
    };
    //console.log(data);
    this.setState({ selectedcontest: value })
    this.props.dispatch(onepagereportActions.getPoolList(data));
  }
  selectedPool(e) {
    const { value } = e.target;
    this.setState({ selectedpool: value })
  }
  selectUser(e) {
    const { value } = e.target;
    this.setState({selecteduser:value})
  }
  selectType(e) {
    const { value } = e.target;
    let selectedTrans=false;
    if(value=='transactions')
      selectedTrans=true;
    this.setState({selectedtype:value,selectedTrans:selectedTrans})
  }

 updateFormField(e) {
    const { value , name } = e.target;
    let selectedFormField=this.state.selectedFormField;
    selectedFormField[name]=value;
    this.setState({selectedFormField:selectedFormField})
  }

  getReport() {
    let data={
       type:this.state.selectedtype?this.state.selectedtype:'teamwise',
       userid:this.state.selecteduser && this.state.selecteduser > 0?this.state.selecteduser:'',
       gameid:this.state.selectedgame && this.state.selectedgame > 0?this.state.selectedgame:'',
       matchid:(this.state.selectematch!='-1')?this.state.selectematch:'',
       fromdate:this.state.startDate? moment(this.state.startDate).format('DD-MM-YYYY'):'',
       todate:this.state.endDate? moment(this.state.endDate).format('DD-MM-YYYY'):'',
       contest:this.state.selectedcontest && this.state.selectedcontest > 0?this.state.selectedcontest:'',
       pool:this.state.selectedpool && this.state.selectedpool > 0?this.state.selectedpool:'',
       amounttype:this.state.selectedFormField.amounttype,
       page:'1',
       limit: 10,
     }
     this.setState({isCSV:false,selectedPage:1});
     this.props.dispatch(onepagereportActions.getOnePageReport(data));
  }




  resetReport() {
     this.setState({
        selectedgame:-1,
        selecteduser:-1,
        selectedtype:'teamwise',
        selectematch:"",
        selectedpool:-1,
        selectedcontest:-1,
        totalpage:0,
        selectedPage:1,
        matchList:[{name:"SelectAll",value:-1}],
        onepagedatalist:[],
        teamplaylist:[],
        teamplayall:[],
        selectedFormField:{amounttype:''},
        isCSV:false
      })

    let data={
       type:'teamwise',
       limit: 10,
       page: 1,
    }

    //8+++++++++++++++++++++++++++++++++++++++++++++++++65414141459502222222222222222222222222222222this.props.dispatch(onepagereportActions.getOnePageReport(data));
  }
  onDateChange = (startDate) => {
    this.setState(() => ({ startDate }));
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  };
  onDateChange1 = (endDate) => {
    this.setState(() => ({ endDate }));
  };
  onFocusChange1 = ({ focused }) => {
    this.setState(() => ({ calendarFocused1: focused }))
  };
  renderContent() {
    console.log("llllllllllllllllllllllll");
  }

  assignResourceSubAdminToggle() {
    this.setState({
      assignResourceSubAdminModal: !this.state.assignResourceSubAdminModal
    });
  }

  onClickPlayerList=(teamid,userid)=>{
   
    if(this.state.selectematch && teamid)
    {
      this.setState({userteamid:teamid,
        teamuserid:userid});
      let data={
        teamid:teamid
      }
      this.props.dispatch(onepagereportActions.getTeamPlayerList(data));
      let data2={
        matchid:this.state.selectematch
      };
      this.props.dispatch(onepagereportActions.getTeamPlayerAll(data2));
      this.assignResourceSubAdminToggle();
    }
  }
  

  handleSelectChangePlayes(e,pidold){
  
  this.setState({
    ["pidnew"+pidold]:e.value
  })
  }

  onChangeCaptian(e){
 
    if(e.target.value===this.state.selectedvcaptain)
    {
      this.setState({selectedvcaptain:"0"});
    }
    else
    {
    this.setState({selectedcaptain:e.target.value});
    }
  }

  onChangeVCaptian(e){
  
    if(e.target.value===this.state.selectedcaptain)
    {
      this.setState({selectedcaptain:"0"});
    }
    else
    {
    this.setState({selectedvcaptain:e.target.value});
    }
  }

  updateTeamPlayer=()=>{
    let formthis=this;
let arrPlayerList=[];
let replacePlayerList={};
    this.state.teamplaylist.forEach(function(itemPL){
      //if(formthis.state[""+itemPL.pid])
      let checkPlayer=formthis.state["pidnew"+itemPL.pid];
      if(checkPlayer)
      {
        replacePlayerList[itemPL.pid]=checkPlayer;
        arrPlayerList.push(checkPlayer);
      }
      else
      {
        replacePlayerList[itemPL.pid]=itemPL.pid;
        arrPlayerList.push(itemPL.pid);
      }
    });

  let data={
      "iscap":replacePlayerList[this.state.selectedcaptain],
      "isvcap":replacePlayerList[this.state.selectedvcaptain],
      "userid":this.state.teamuserid,
      "matchid":this.state.selectematch,
      "userteamid":this.state.userteamid,
      "userteamplayers":arrPlayerList,
      "gameid":(this.state.selectedgame)?this.state.selectedgame:'',
    };

   
    this.props.dispatch(onepagereportActions.updateTeamPlayer(data));
  }


  getReportCSV() {
    let data={
       type:this.state.selectedtype?this.state.selectedtype:'teamwise',
       userid:this.state.selecteduser && this.state.selecteduser > 0?this.state.selecteduser:'',
       gameid:this.state.selectedgame && this.state.selectedgame > 0?this.state.selectedgame:'',
       matchid:(this.state.selectematch!='-1')?this.state.selectematch:'',
       fromdate:this.state.startDate? moment(this.state.startDate).format('DD-MM-YYYY'):'',
       todate:this.state.endDate? moment(this.state.endDate).format('DD-MM-YYYY'):'',
       contest:this.state.selectedcontest && this.state.selectedcontest > 0?this.state.selectedcontest:'',
       pool:this.state.selectedpool && this.state.selectedpool > 0?this.state.selectedpool:'',
       amounttype:this.state.selectedFormField.amounttype,
    }
    this.setState({isCSV:true});
     this.props.dispatch(onepagereportActions.getOnePageReport(data));
  }

  downloadMeClick=()=>{
    this.setState({isCSV:true},
    ()=>{
      let data={
        type:this.state.selectedtype?this.state.selectedtype:'teamwise',
        userid:this.state.selecteduser && this.state.selecteduser > 0?this.state.selecteduser:'',
        gameid:this.state.selectedgame && this.state.selectedgame > 0?this.state.selectedgame:'',
        matchid:(this.state.selectematch!='-1')?this.state.selectematch:'',
        fromdate:this.state.startDate? moment(this.state.startDate).format('DD-MM-YYYY'):'',
        todate:this.state.endDate? moment(this.state.endDate).format('DD-MM-YYYY'):'',
        contest:this.state.selectedcontest && this.state.selectedcontest > 0?this.state.selectedcontest:'',
        pool:this.state.selectedpool && this.state.selectedpool > 0?this.state.selectedpool:'',
        amounttype:this.state.selectedFormField.amounttype,
     }
     
      this.props.dispatch(onepagereportActions.getOnePageReport(data));
    });
  }

  searchTeam(query) {

    const config = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };

 let data = {
      "limit": 15,
      "page": 1,
      "search": query.replace(/^\s+|\s+$/g, ''),
      atype:'alluser'
    }
 //   this.props.dispatch(userActions.getAll(data));
    axios.post(CONST.BACKEND_URL + `/api/getusers`, data, config).then(response => {
      if (response.data.code === 0) {
        this.setState({
          options: response.data.data.list,
        });
      }
      else {
       
       
      }
    }).catch(error => {});
  }

  getSelectedUser (value) {
    let userid=0;
     if(value[0]){
       userid = value[0]['id'];

    }
    this.setState({
            selecteduser: userid,
          });
  }

  isOutsideRange = day =>
    day.isBefore(moment(this.state.startDate));

    //|| day.isBefore(moment().subtract(30, "days")

  render() {
    let formthis=this;

    return (
      <div className="animated fadeIn custom_background">
        <Card>
          <CardHeader>
               One Page Report 
          </CardHeader>
          <CardBody>
            <Row>

                <Col  xs="3">
                      <FormGroup>
                      <Label htmlFor="pid">Users</Label>
       <AsyncTypeahead id="selectuser" isLoading={this.state.isLoading} onChange={this.getSelectedUser} labelKey={option=> `${option.email +' '+ option.phone +' '+ option.teamname}`} onSearch={this.searchTeam} options={this.state.options} />
                  </FormGroup>    
                  </Col>  
              {
                this.state.rtype?
                  <Col  xs="3">
                  <FormGroup>
                    <Label htmlFor="pid">Type</Label>
                      <Input
                        type="select"
                        name="selectedtype"
                        id="selectedtype"
                        onChange={this.selectType}
                        value={this.state.selectedtype}>
                        {
                          this.state.rtype.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                          })
                        }
                      </Input>
                  </FormGroup>
                  </Col>
                :null
              }

              {
                (this.state.selectedTrans)?
               
                <Col  xs="3">
                  <FormGroup>
                    <Label htmlFor="pid">Amount Type</Label>
                      <Input
                        type="select"
                        name="amounttype"
                        id="amounttype"
                        onChange={this.updateFormField}
                        value={this.state.selectedFormField.amounttype}>
                        {
                          Object.keys(this.state.amounttype).map((e, key) => {
                            return <option key={e} value={e}>{formthis.state.amounttype[e]}</option>;
                          })
                        }
                      </Input>
                  </FormGroup>
                  </Col>
                   :null
              }
                 { /*
                  <Col xs="4" >
                  <FormGroup>
                    <Label htmlFor="pid">Type</Label>
                      <Input
                        type="select"
                        name="trnstype"
                        id="trnstype"
                        onChange={this.selectType}
                        value={this.state.selectedtype}>
                        { <option key="cr" value="cr"> Credit </option> }
                        { <option key="dr" value="dr"> Debit </option> }
                      </Input>
                  </FormGroup>
                  </Col>
                  
                  */
               }


              {
                this.state.games?
                  <Col  xs="3">
                  <FormGroup>
                      <Label htmlFor="pid">Sports</Label>
                        <Input
                          type="select"
                          name="selectedgame"
                          id="selectedgame"
                          onChange={this.getMatchList}
                          value={this.state.selectedgame}>
                          {
                            this.state.games.map((e, key) => {
                              return <option key={key} value={e.value}>{e.name}</option>;
                            })
                          }
                        </Input>
                    </FormGroup>
                  </Col>:null
              }
              {
                this.state.matchList?
                <Col  xs="3">
                  <FormGroup>
                    <Label htmlFor="pid">Matches</Label>
                      <Input
                        type="select"
                        name="selectematch"
                        id="selectematch"
                        onChange={this.getContestList}
                        value={this.state.selectematch}>
                        {
                          this.state.matchList.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                          })
                        }
                      </Input>
                  </FormGroup>
                </Col>:null
              }
                    <Col xs="3" >
                      <FormGroup>
                          <Label htmlFor="pid">Start Date</Label>
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
                      <Col xs="3" >
                          <FormGroup>
                          <Label htmlFor="pid">End Date</Label>
                              <SingleDatePicker
                                  date={this.state.endDate} 
                                  onDateChange={this.onDateChange1}
                                  focused={this.state.calendarFocused1} 
                                  onFocusChange={this.onFocusChange1} 
                                  numberOfMonths={1}
                                  small={true}
                                  isOutsideRange={this.isOutsideRange}
                                  placeholder="End Date"
                                  displayFormat="DD/MM/YYYY"
                              />
                        </FormGroup>
                </Col>

              { this.state.contestList? 
                <Col  xs="3">
                  <FormGroup>
                    <Label htmlFor="pid">Contest</Label>
                      <Input
                        type="select"
                        name="selectedcontest"
                        id="selectedcontest"
                        onChange={this.getPoolList}
                        value={this.state.selectedcontest}>
                        {
                          this.state.contestList.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                          })
                        }
                      </Input>
                  </FormGroup>
                </Col>:null
              }

              {  
                this.state.poolList?
                <Col  xs="3">
                  <FormGroup>
                    <Label htmlFor="pid">Pool</Label>
                      <Input
                        type="select"
                        name="selectedpool"
                        id="selectedpool"
                        onChange={this.selectedPool}
                        value={this.state.selectedpool}>
                        {
                          this.state.poolList.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                          })
                        }
                      </Input>
                  </FormGroup>
                </Col>
                :null
              }
            </Row>
            <Row>
            <Col  xs="1">
                 <Button
                      className="mr-1"
                      color="info"
                      onClick={this.getReport}
                    >
                      Submit
                    </Button>
              </Col>
              <Col  xs="1">
                 <Button
                      onClick={this.resetReport}
                      className="mr-1"
                      color="info"
                    >
                      Reset
                    </Button>
              </Col>
              <Col  xs="2">
              
                {this.state.onepagedatalist && this.state.onepagedatalist.length > 0 && this.state.heading.length > 0?

                <Button color="secondary" onClick={this.downloadMeClick} >
                   Download
                </Button>:null}
                
                {this.state.isCSV===true?
                <CSVLink 
                  asyncOnClick={true}
                  //onClick={this.getReportCSV} 
                  data={this.state.csvdatalist} 
                  headers={this.state.heading}
                  >
                  Download link
                </CSVLink>:null}
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardBody> 
            {this.state.onepagedatalist && this.state.onepagedatalist.length > 0 && this.state.heading.length > 0?
              <Table responsive striped>
                <thead>
                  <tr>
                    {this.state.heading?<th scope="col">#</th>:null}
                    
                    {
                      this.state.heading?(this.state.heading).map((head, index) => (
                        <th key={index} scope="col">{formthis.state.headingShow[head]}</th>
                        )):null
                    }
                  </tr>
                </thead>
                <tbody>
                  {this.state.onepagedatalist
                    ? this.state.onepagedatalist.map((subadmin, index) => (
                        <tr key={index}>
                          <td>
                          {this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}
                          </td>
                          {
                            this.state.heading?this.state.heading.map((head, index1) => (
                              <td key={index1}> {subadmin[head]? (head=== 'txdate' ||head=== 'logindate'||head=== 'mdate'  ) ?moment(new Date(parseInt(subadmin[head])*1000)).utcOffset("+05:30").format("YYYY-MM-DD"):head=== 'teamname'?<span className="pointer" onClick={()=>this.onClickPlayerList(subadmin["teamid"],subadmin["userid"])}>{subadmin[head]}</span>:subadmin[head]:' - '}</td>
                             
                            )):null
                          }
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
                
                
              
              
              :'Data not found.'
              
            }
          
             {   parseInt(this.state.totalpage) > 10 ?

                 (<PaginationComponent totalItems={parseInt(this.state.totalpage)} pageSize={10} onSelect={this.handleSelectedPaginate} activePage={parseInt(this.state.selectedPage)} />) 
                 : (null)
            }
          </CardBody>
        </Card>
        <Modal
          isOpen={this.state.assignResourceSubAdminModal}
          toggle={this.assignResourceSubAdminToggle}
          className={'my-modal ' + this.props.className}>        
          <ModalHeader toggle={this.assignResourceSubAdminToggle}>
            Select to change players
          </ModalHeader>
          <ModalBody>
            <ListGroup>
            <Table responsive striped>
                  <thead>
                    <tr>
                     <th scope="col"> 
                      Existing Player
                      </th>
                      <th scope="col"> 
                      Team
                      </th>
                      <th scope="col"> 
                      New Player
                      </th>
                      <th scope="col">
                      Captain
                      </th>
                      <th scope="col"> 
                      Vice Captain

                      </th>
                      </tr>
                  </thead>
                  <tbody>
            
              {this.state.teamplaylist
                ? this.state.teamplaylist.map((resource, i) => (
                    <tr key={i}>
                      
                      <td> 
                      {resource.pname}({resource.ptype})
                      
                      </td>

                       <td> 
                      {resource.teamname}
                      
                      </td>

                      

                      <td> 
                        <Select options={this.state.teamplayall} 
                      name="addStatus" 
                      value={this.state.selectedOption} 
                      onChange={(e)=>this.handleSelectChangePlayes(e,resource.pid)} 
                      isSearchable={true} />
                     
                      </td>

                      <td> 
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id={"cap"+resource.pid} name="radios1" value={resource.pid} checked={(formthis.state.selectedcaptain===(resource.pid)?true:false)} onChange={formthis.onChangeCaptian} />
                        <Label check className="form-check-label" htmlFor="radio1"></Label>
                      </FormGroup>
                     
                      </td>

                       <td> 
                      <FormGroup check className="radio">
                        <Input className="form-check-input" type="radio" id={"vcap"+resource.pid} name="radios2" value={resource.pid} checked={(formthis.state.selectedvcaptain===(resource.pid)?true:false)} onChange={formthis.onChangeVCaptian} />
                        <Label check className="form-check-label" htmlFor="radio2"></Label>
                      </FormGroup>
                     
                      </td>
                    </tr>


                  ))
                : null}
            </tbody>
                </Table>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            
            <Button
              color="secondary"
              onClick={this.updateTeamPlayer}
            >
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { onepagereport, authentication } = state;
  const { user } = authentication;

  return {
    user,
    onepagereport
  };
}
export default connect(mapStateToProps)(OnePageReport);
