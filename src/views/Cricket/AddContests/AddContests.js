import React, { Component } from 'react';
import Switch from 'react-switch';
import { authHeader } from '../../../_helpers';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker} from 'react-dates';
import TimePicker from 'react-times';
import { toast } from 'react-toastify';
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
  Label,
  ModalFooter,
  Button,
  ListGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ListGroupItem
} from 'reactstrap';
import axios from 'axios';
import { CONST } from '../../../_config'; 
import { connect } from 'react-redux';
import moment from 'moment'
import swal from 'sweetalert';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { cricketActions } from '../../../_actions';
const statusOption = [{ value: 1, name: "Active" },{ value: 0, name: "Deactive" }];

class CricketMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      addPoolModal: false,
      checked: false,
      combined: false,
      single: false,
      multiple: false,
      getId: 0,
      isLoading: false,
      addCricketModal: false,
      options: [],
      pictures: [],
      chkbox: true,
      optionsMatchList: [],
      matchid: '',
      totalPoint: '',
      showContast:false,
      addPoolStatus:statusOption[0].value,
      selectedMathId:0,
      prizeBreaker: [],
      editTimeModel: false,
      favToggle:false,
      copypool:"0",
      callCopyPool:0,
      cpyobj:{cpybfrtim:0,cpypoolstatus:0},
    };
    this.addPoolToggle = this.addPoolToggle.bind(this);
    this.openPoolList = this.openPoolList.bind(this);
    this.handleCheckPool = this.handleCheckPool.bind(this);
    this.openAssignedContestList = this.openAssignedContestList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionStatus = this.handleOptionStatus.bind(this);
    this.handleChangeAddPool1 = this.handleChangeAddPool1.bind(this);
    this.handleChangeAddPool = this.handleChangeAddPool.bind(this);
    this.handleCheckContest = this.handleCheckContest.bind(this);
    this.deletePool=this.deletePool.bind(this);
    this.handleChangeCpyPool=this.handleChangeCpyPool.bind(this);
    this.updateFavContest=this.updateFavContest.bind(this);
    this.updateFavStatus = this.updateFavStatus.bind(this);
    this.updatePoolStatus=this.updatePoolStatus.bind(this);
    
  }
  componentDidMount() {
    let formthis=this;
    let gameid=0;
    if(this.props.location.pathname==="/kabaddi/addContests"){
      gameid=3;
    }else if(this.props.location.pathname==="/cricket/addContests"){
      gameid=1;
    }else if(this.props.location.pathname==="/football/addContests"){
      gameid=2;
    }
    this.setState({gameid:gameid},()=>{
    let data={gameid:gameid};
    formthis.props.dispatch(cricketActions.getListMatches(data)); 
    formthis.props.dispatch(cricketActions.getContenstsList(data));
    });
  }
  componentWillReceiveProps(nextProps) {
    //console.log('contenstsList  ', nextProps.cricket.contenstsList);
    //console.log('assignedContestList  ', nextProps.cricket.assignedContestList);
    //let contenstsList= nextProps.cricket.contenstsList;   poolAdded
    let assignedContestList= nextProps.cricket.assignedContestList;
    if(nextProps.cricket.contenstsList){
      let items = nextProps.cricket.contenstsList.map((array, key) => {

        if (assignedContestList) {
           this.setState({
            showContast:true
          });
          let findelement=assignedContestList.find(x => x.contestid === array.id);
         // console.log("findelement sfsdffsdf ",array);
         
          if (findelement) {
            array['cpybfrtim']=findelement.cpybfrtim; 
            array['cpypoolstatus']=findelement.cpypoolstatus;
            array['assigned']=true;
            array['matchcontestid']=findelement.id; 
          } else {
             array['assigned']=false;
             array['matchcontestid']=0; 
          }
        }
        return array;
      }, []);
      console.log('items===>>>', items);
      this.setState({
        assignedContestListRender: items
      });
    }
    if(nextProps.cricket.assignedContestStatus){
      console.log("lllllllllllllll");
      this.props.dispatch(cricketActions.assignContestToMatch({ matchid: this.state.selectedMathId }))
    }
    if(nextProps.cricket.assignedContestPoolList){
      this.setState({
        poolList: nextProps.cricket.assignedContestPoolList
      });
    }
    if(nextProps.cricket.poolAddedAndPrize){
      console.log("poolAddedpoolAddedpoolAdded  ",nextProps.cricket.poolAdded);
      console.log("this.state.selectedMathId  ",this.state.selectedMathId);
      
      //this.props.dispatch(cricketActions.assignContestToMatch({ matchid: this.state.selectedMathId }));
        this.setState({
          addPoolModal: false,
          prizeBreaker:[]
        });
       this.props.dispatch(cricketActions.getAssignedPoolByContestMatch({ contestid: this.state.selectedContestId,matchid:this.state.selectedMathId }));
    }
  }
  handleCheckContest(contest) {
    let status=contest.assigned ? "0" : "1";
    let data = {
      matchid:this.state.selectedMathId,
      status:status, 
      contestid: contest.id
    }
 
    this.props.dispatch(cricketActions.updateAssignContestToMatch(data));

    this.setState({
      copypool: status,
    });
  }

  //Add Dialog box
  addCricketMatchToggle() {
    this.setState({
      addCricketModal: !this.state.addCricketModal
    });
  }
  //Update checkbox to  select player
  handleChange(e) {
    console.log('e  ', e.target.name);
    console.log('e  ', e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  getBadge = status => {
    return status === true ? 'success' : 'danger';
  }
  openAssignedContestList(matchId) {
    this.setState({
     selectedMathId:matchId,
     poolList:[],
     isContestAssigned:false,
     favToggle:false,
    });
    this.props.dispatch(cricketActions.assignContestToMatch({ matchid: matchId }))
  }
  openPoolList(contestdetails) {
    console.log("contestdetails  ",contestdetails);
    console.log(this.state.selectedMathId+" asdasdf");
    
    this.setState({
     selectedContestId:contestdetails.id,
     isContestAssigned:contestdetails.assigned,
     matchcontestid:contestdetails.matchcontestid
    });

    //console.log("getAssignedPoolByContestMatch");
    
    this.props.dispatch(cricketActions.getAssignedPoolByContestMatch({ contestid: contestdetails.id,matchid:this.state.selectedMathId }));
    //console.log("getPoolList");
    
    //this.props.dispatch(cricketActions.getPoolList({ contestid: contestdetails.id}));
  }
  handleChangeAddPool1(name, value) {
   console.log('name  ',name);
   console.log('value  ',value);
    this.setState({ [name]: value });
  }

  handleCheckPool(poolData) {
    if (this.state.poolList) {
      let {poolList}=this.state;
      let objindex = poolList.findIndex(pool => pool.id === poolData.id);
      poolList[objindex].matchpoolstatus = poolList[objindex].matchpoolstatus===1 ? 0: 1;
      this.setState({
        poolList,
      });
  this.saveSelectedPool(poolData);  
    }
  }
  saveSelectedPool(poolid,type='') {
    let pool=[];
    for (let index = 0; index < this.state.poolList.length; index++) {
      const element = this.state.poolList[index].matchpoolstatus;
      console.log(element);
      if (element===1) {
         pool.push(this.state.poolList[index].id)
      }
    }

    let data={
      matchid:this.state.selectedMathId,
      contestid:this.state.selectedContestId,
      matchcontestid:this.state.matchcontestid,
      poolcontestid:poolid.id,
      isassign:poolid.matchpoolstatus,
      favpool:poolid.favpool,
      atype:type,
    }
    this.props.dispatch(cricketActions.savePoolToConestByMatch(data));
  }
  addPoolToggle() {
    this.setState({
      addPoolModal: !this.state.addPoolModal
    });
  }
  handleOptionStatus(e) {
    const { name, value } = e.target;
   console.log(name +"  "+value);
    this.setState({addPoolStatus: value });
  }
  handleChangeAddPool(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  addPool() {
    // console.log("this.state.pooljoinfee  ",this.state.pooljoinfee);
    // console.log("this.state.pooltotalwining  ",this.state.pooltotalwining);
    // console.log("this.state.poolwinners  ",this.state.poolwinners);
    // console.log("this.state.poolmaxteams  ",this.state.poolmaxteams);
    // console.log("this.state.addPoolStatus  ",this.state.addPoolStatus);
    // console.log("this.state.combined  ",this.state.combined);
    // console.log("this.state.single  ",this.state.single);
    // console.log("this.state.multiple  ",this.state.multiple);
        
    let data={
      contestid:this.state.selectedContestId,
      joinfee:this.state.pooljoinfee,
      totalwining:this.state.pooltotalwining,
      winners:this.state.poolwinners,
      maxteams:this.state.poolmaxteams,
      c:this.state.combined?1:0,
      m:this.state.multiple?1:0,
      s:this.state.single?1:0,
      status:this.state.addPoolStatus,
      prizekeyvalue:this.state.prizeBreaker
    };
    console.log(data);
   // console.log("this.state.prizeBreaker  ",this.state.prizeBreaker);
    
    this.props.dispatch(cricketActions.addPoolAndPrize(data));
  }
  addPrize() {
    console.log("this.state.pooljoinfee  ",this.state.prizeBreaker);
    let data={
      poolcontestid:this.state.poolid,
      prizekeyvalue:this.state.prizeBreaker,
    };
   this.props.dispatch(cricketActions.addPrize(data));
  }
  handleParameterKeyValueChange = idx => evt => {
    const newprizeBreaker = this.state.prizeBreaker.map((prizeBreaker, sidx) => {
      if (idx !== sidx) return prizeBreaker;
      console.log("evt.target.name   ",evt.target.name);
      return { ...prizeBreaker, [evt.target.name]: evt.target.value };
    });
    console.log("newprizeBreaker  ",newprizeBreaker);
    this.setState({ prizeBreaker: newprizeBreaker });
  };
  handleAddPrizeBreaker = () => {
    this.setState({
      prizeBreaker: this.state.prizeBreaker.concat([{ pmin: '',pmax: '',pamount: '' }])
    });
  };
  handleRemoveprizeBreaker = idx => () => {
    this.setState({
      prizeBreaker: this.state.prizeBreaker.filter((s, sidx) => idx !== sidx)
    });
  };
updatePoolStatus = (contest)=>{
        let cpyobj= this.state.cpyobj;
        const formData = new FormData();
        formData.append('matchid',  this.state.selectedMathId);
        formData.append('contestid',  contest.id);
        formData.append('cpybfrtim',  cpyobj.cpybfrtim);
        formData.append('cpypoolstatus',  cpyobj.cpypoolstatus);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: authHeader().Authorization
          }
        };
        axios
          .post(CONST.BACKEND_URL + `/api/copypoolstatus`, formData, config)
          .then(response => {
           
              if (!response.data.error) {
                 toast(response.data.msg);
                  this.props.dispatch(cricketActions.getContenstsList());
                  this.props.dispatch(cricketActions.assignContestToMatch({ matchid: this.state.selectedMathId }))
              }else{
                 toast(response.data.msg);
              }
            
          })
          .catch(error => {}); 
}

handleChangeCpyPool(index,e){
 let { name, value } = e.target;
let cpyobj=this.state.cpyobj;
let contestlist=this.state.assignedContestListRender;
contestlist[index][name]=value;
cpyobj[name]=value;
this.setState({ cpyobj:cpyobj,assignedContestListRender:contestlist}); 
}
  deletePool(pooldetail){
    var formthis = this;
             swal({
                  html:true,
                  title: "Are you sure?",
                  text: "You want to delete",
                  icon: "warning",
                  buttons: [
                    'No, cancel it!',
                    'Yes, Delete!'
                  ],
                  dangerMode: true,
                }).then(function (isConfirm) {
                  if (isConfirm) {
                    
                    /////////////
                    var args1 = {
                      poolid : pooldetail.id
                    };
                    var object = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader().Authorization
                      },
                      body: JSON.stringify(args1)
                    }

                    var apiUrl = CONST.BACKEND_URL + "/api/deletepool";
                    fetch(apiUrl, object)
                      .then(function (response) {
                          response.json().then(json => {
                            if (json.error === false) {
                              swal({
                                title: "Deleted",
                                text: "Pool deleted successfully",
                                icon: "success",
                              });
                              let data = {
                                limit: 10,
                                page: 1,
                                search: ''
                              };
                              formthis.props.dispatch(cricketActions.getAssignedPoolByContestMatch({ contestid: pooldetail.contestid,matchid:formthis.state.selectedMathId }));
                            }
                            else {
                              swal({
                                title: "Wrong!",
                                text: json.msg,
                                icon: "warning",
                              });  
                            }
                          })
                        
                      }).catch(error => {
                        swal({
                          title: "Error!",
                          text: error.toString(),
                          icon: "error",
                        });  
                      });
                    ////////////////

                  }
                })
  }


  editTimeToggle() {
    this.setState({
      editTimeModel: !this.state.editTimeModel,
    });
  }

  onDateChangematch = (matchDate) => {
    this.setState(() => ({ matchDate }));
  }

  onFocusTimeChangematch = ({ focused }) => {
    this.setState(() => ({ matchTimeFocused: focused }))
  }

  onTimeChangematch = (matchTime) => {
    console.log("matchTime  ",matchTime);
    this.setState(() => ({hour: matchTime.hour,minute: matchTime.minute}));
  }

  onFocusChangematch = ({ focused }) => {
    this.setState(() => ({ matchDateFocused: focused }))
  }
 
 updateFavContest =(e)=>{

  let formthis=this;
  let favToggle=(this.state.favToggle==false)?true:false;

  if(favToggle){
      var args1 = {
        matchid : this.state.selectedMathId,
        setorrm :favToggle
      };
      var object = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader().Authorization
        },
        body: JSON.stringify(args1)
      }

      var apiUrl = CONST.BACKEND_URL + "/api/assignfavpools";
      fetch(apiUrl, object)
        .then(function (response) {
            response.json().then(json => {
              if (json.error === false) {
                swal({
                  title: "Update Favorite ",
                  text: "All Favorite Pool Assigned successfully",
                  icon: "success",
                });
                let data = {
                  limit: 10,
                  page: 1,
                  search: ''
                };
                 formthis.props.dispatch(cricketActions.assignContestToMatch({ matchid: formthis.state.selectedMathId }));
              }
              else {
                swal({
                  title: "Wrong!",
                  text: json.msg,
                  icon: "warning",
                });  
              }
            })
          
        }).catch(error => {
          swal({
            title: "Error!",
            text: error.toString(),
            icon: "error",
          });  
        });
    }

 this.setState({
            favToggle:favToggle
          });
 }

 updateFavStatus(objData,type='') {  
   
      if(type=='pool'){
        
   
    this.saveSelectedPool(objData,'favStatusUpdate');
    this.props.dispatch(cricketActions.getContenstsList({gameid:this.state.gameid}));
    this.props.dispatch(cricketActions.assignContestToMatch({ matchid: this.state.selectedMathId }))
    this.props.dispatch(cricketActions.getAssignedPoolByContestMatch({ contestid: objData.contestid,matchid:this.state.selectedMathId }));
      }else{
        const formData = new FormData();
        formData.append('id',  objData.id);
        formData.append('favstatus',  objData.favstatus);
        formData.append('atype',  "favStatusUpdate");
      /*  const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: authHeader().Authorization
          }
        };
        axios
          .post(CONST.BACKEND_URL + `/api/editcontests`, formData, config)
          .then(response => {
           
              if (!response.data.error) {
                 toast(response.data.msg);
                  this.props.dispatch(cricketActions.getContenstsList());
              }else{
                 toast(response.data.msg);
              }
            
          })
          .catch(error => {}); */
      }
  }


  render() {
    const { cricket } = this.props;
    let { items } = cricket;
    let formthis=this;
    const {
      hour,
      minute,
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="12">
                    <i className="fa fa-align-justify"></i><strong>ASSIGN CONTEST TO MATCH</strong> <small></small>
                  </Col>
                  <br />
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="3">
                    <ListGroup id="list-tab" role="tablist">
                      {
                        items ? items.map((matchs, index) =>
                          <ListGroupItem key={index} onClick={() => this.openAssignedContestList(matchs.matchid)} style={{cursor:'pointer'}}  active={this.state.selectedMathId === matchs.matchid} >
                            {matchs.matchname}&nbsp;&nbsp;&nbsp;
                            <small>{moment(new Date(parseInt(matchs.mdate)*1000)).utcOffset("+05:30").format("YYYY-MM-DD")} 
                           
                           
                            </small>
                          </ListGroupItem>
                        ) : null
                      }
                    </ListGroup>
                  </Col>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      
                         {  this.state.assignedContestListRender && this.state.showContast ? <Row>
                          <Col xl="5">
                          Favorite
                          </Col>
                          <Col xl="7"> 
                              <span  style={{cursor:'pointer'}} ></span><Switch
                              className="float-right"
                              onChange={()=>this.updateFavContest()}
                              checked={this.state.favToggle} 
                            />
                          </Col>
                        </Row>:null  }
                        {
                       this.state.assignedContestListRender && this.state.showContast ?this.state.assignedContestListRender.map((contenst, index) =>
                          <ListGroupItem key={index} active={this.state.selectedContestId === contenst.id}>
                          <span className='contest-heart'>
                          <img
                            src={contenst.contestlogo}
                            width="50"
                            height="50"
                            style={{cursor:'pointer'}}
                            ref={img => this.img = img}
                            onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}
                            className="img-avatar"
                            onClick={() =>  this.openPoolList(contenst)}
                            alt=""
                          />
                          <span id={'heart_'+index} onClick={()=>this.updateFavStatus(contenst)}>{(contenst.favpool>0)?<span className="heart-red contest-heart-icon"><i className="fa fa-heart"></i></span>:<span className="heart-red contest-heart-icon"><i className="fa fa-heart-o"></i></span> }</span>
                          </span>
                          <span  style={{cursor:'pointer'}} onClick={() => this.openPoolList(contenst)}>{contenst.title}</span><Switch
                              className="float-right"
                              onChange={()=>this.handleCheckContest(contenst)}
                              checked={contenst.assigned}
                            />
                            
                            {(contenst.assigned)?
                              <Col xs="12">
                            <Row>


                            <Col xs="4">
                <FormGroup>
                  <Label htmlFor="pid">Copy Pool</Label>
                  <Input
                    type="select"
                    name="cpypoolstatus"
                    id={"cpypoolstatus"+contenst.id} 
                    onChange={(e)=>this.handleChangeCpyPool(index,e)}
                    value={contenst.cpypoolstatus}
                  >
                  { <option  key="0" value="0">Off</option>}
                  { <option  key="1" value="1"> On </option> }
                </Input>
                </FormGroup>
              </Col>

              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="pid">Time(Min)</Label>
                  <Input
                    type="number"
                    name="cpybfrtim"
                    id={"cpybfrtim"+contenst.id} 
                    autoComplete="off" 
                    onChange={(e)=>this.handleChangeCpyPool(index,e)}
                    value={contenst.cpybfrtim}
                    min="0"
                    max= "60"
                   
                  />
                </FormGroup>
              </Col>
              <Col xs="4">
              <FormGroup>
                 <Label htmlFor="pid"> Action </Label>
                  <Button color="info" onClick={()=>this.updatePoolStatus(contenst)}>
                    Update
                  </Button>
               </FormGroup>
              </Col>

                            </Row>
                            </Col>
                            :null}
                            </ListGroupItem>
                        ) : null
                      }

                    </ListGroup>
                  </Col>
                  <Col lg={5}>
                  {this.state.poolList && this.state.isContestAssigned ?   
                  <Card>
                      <CardHeader>
                        <FormGroup row>
                          <Col xl="8"><strong><i className="icon-info pr-1"></i>Pool id: {this.state.selectedContestId}</strong></Col>
                             <Button  onClick={this.addPoolToggle}  className="mr-1"  color="success">
                              Add New Pool
                            </Button>
                        </FormGroup>
                      </CardHeader>
                      <CardBody>
                        <Table responsive striped hover >
                          <thead>
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Fav</th>
                              <th scope="col">FEE</th>
                              <th scope="col">WINNING</th>
                              <th scope="col">MAX TEAM</th>
                              <th scope="col">WINNERS</th>
                              <th scope="col">Type</th>
                              <th scope="col">Delete</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.poolList ? this.state.poolList.map((pool, index) => (
                                <tr key={pool.id}>
                                  <td>{pool.id}</td> 
                                  <td><span  style={{cursor:'pointer'}} id={'heart_'+index} onClick={()=>this.updateFavStatus(pool,'pool')}>{(pool.favpool==1)?<span className="heart-red"><i className="fa fa-heart"></i></span>:<span className="heart-red"><i className="fa fa-heart-o"></i></span> }</span>
                                  </td>
                                  <td>{pool.joinfee}</td>
                                  <td>{pool.totalwining}</td>
                                  <td>{pool.maxteams}</td>
                                  <td>{pool.winners}</td>
                                  <td>{(pool.s==="1")?"S":null}{(pool.m==="1")?" M":null}{(pool.c==="1")?" C":null}</td>
                                  <td><i className="cui-trash h5" onClick={()=>this.deletePool(pool)}></i></td>
                                  <td> <Switch
                                    className="float-right"
                                    onChange={()=>this.handleCheckPool(pool)}
                                    checked={pool.matchpoolstatus===1?true:false}/> 
                                  </td>
                                </tr>
                              )) : null
                            }
                          </tbody>
                        </Table>
                       { /* <Row>
                          <Col xl="9"/>
                          <Col xl="3"> 
                              <Button onClick={()=>this.saveSelectedPool()} className="mr-1" color="success">
                                Save
                              </Button>
                          </Col>
                        </Row> */ }
                      </CardBody>
                    </Card>
                    :null} </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.addPoolModal} toggle={this.addPoolToggle} className={ 'my-modal ' + this.props.className}>
    <ModalHeader toggle={this.addPoolToggle}>
        Add Pool
    </ModalHeader>
    <ModalBody>
      <Row>
        <Col xs="6"> 
          <Row>
              <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="pid">Joining Fee</Label>
                      <Input type="text" name="pooljoinfee" id="pooljoinfee" autoComplete="off" onChange={this.handleChangeAddPool} />
                  </FormGroup>
              </Col>
          </Row>
          <Row>
              <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="fpname">Total Wining</Label>
                      <Input type="text" name="pooltotalwining" id="pooltotalwining" autoComplete="off" onChange={this.handleChangeAddPool} />
                  </FormGroup>
              </Col>
          </Row>
          <Row>
              <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="fpname">winners</Label>
                      <Input type="text" name="poolwinners" id="poolwinners" autoComplete="off" onChange={this.handleChangeAddPool} />
                  </FormGroup>
              </Col>
          </Row>
          <Row>
              <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="poolmaxteams">Max Teams</Label>
                      <Input type="text" name="poolmaxteams" id="poolmaxteams" autoComplete="off" onChange={this.handleChangeAddPool} />
                  </FormGroup>
              </Col>
          </Row>
          <Row>
              <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="poolmaxteams">Pool Type</Label>
                      <Row>
                          <Col xs="4">
                              Confirmed
                              <Switch name="combined" id="combined" className="float-right" onChange={()=>this.handleChangeAddPool1("combined",!this.state.combined)} checked={ this.state.combined } />
                          </Col>
                          <Col xs="4">
                              Single
                              <Switch name="single" id="single" className="float-right" onChange={()=>this.handleChangeAddPool1("single",!this.state.single)} checked={ this.state.single } />
                          </Col>
                          <Col xs="4">
                              Multiple
                              <Switch name="multiple" id="multiple" className="float-right" onChange={()=>this.handleChangeAddPool1("multiple",!this.state.multiple)} checked={ this.state.multiple } />
                          </Col>
                      </Row>
                  </FormGroup>
              </Col>
          </Row>
          <Row>
              <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="poolmaxteams">Status</Label>
                      <Input type="select" name="playertype" id="playertype" onChange={this.handleOptionStatus} value={this.state.addPoolStatus}> 
                          {
                        statusOption.map((e, key) => {
                          return <option key={key} value={e.value}>{e.name}</option>;
                        })
                      }
                      </Input>
                  </FormGroup>
              </Col>
          </Row>
        </Col>
        <Col xs="6"> 
          <FormGroup row>
                    <Col md="6">
                      <Label >Range</Label>
                    </Col>
                    <Col md="6">
                      <Label >Amount</Label>
                    </Col>
              </FormGroup>
                {
                 this.state.prizeBreaker.map((prizeBreaker, idx) => (
                      <FormGroup row key={idx}>
                            <Col md="3">
                              <Input type="text" name="pmin" value={prizeBreaker.pmin}  placeholder="Min"   autoComplete="off" onChange={this.handleParameterKeyValueChange(idx)}/>
                            </Col>
                            <Col md="3">
                              <Input type="text" name="pmax" value={prizeBreaker.pmax}  placeholder="Max"   autoComplete="off" onChange={this.handleParameterKeyValueChange(idx)}/>
                            </Col>
                            <Col md="3">
                              <Input type="text"  name="pamount"  value={prizeBreaker.pamount} placeholder="Amount"  autoComplete="off"  onChange={this.handleParameterKeyValueChange(idx)}/>
                            </Col>
                            <Col md="1">
                            <Button color="info" onClick={this.handleRemoveprizeBreaker(idx)}>
                              Remove
                            </Button>
                            </Col>
                                
                      </FormGroup>
                  ))
                }
              <Button
               color="success" onClick={this.handleAddPrizeBreaker}>
                Add Prize
              </Button>
          
        </Col>
      </Row>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={()=> this.addPool()}> Submit
        </Button>{' '}
        <Button color="secondary" onClick={this.addPoolToggle}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>

 
      </div >
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
