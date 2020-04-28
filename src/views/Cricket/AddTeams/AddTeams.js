import React, { Component } from 'react';
import {
  Card, CardBody, Input,
  Label, Button, InputGroup,
  InputGroupAddon, FormGroup,  ListGroup, TabContent, TabPane, ListGroupItem, Modal, ModalBody,
  ModalFooter, ModalHeader, CardHeader, Col, Row
} from 'reactstrap';

import { connect } from 'react-redux';
//import PaginationComponent from "react-reactstrap-pagination";
import { cricketActions } from '../../../_actions';
import { teamActions } from '../../../_actions';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import { CONST } from '../../../_config';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}


class AddTeams extends Component {
  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      addTeamModal: false,
      showSubAdminModal: false,
      addColorModel: false,
      deleteSubAdminModal: false,
      selectedPage: 1,
      totalpage: 0,
      checked: false,
      modal: false,
      selectedOption: null,
      accordion: [true, false, false],
      query: "",
      people: [],
      file: null,
      imagePath: [],
      checkedItems: new Map(),
      arrayAddPlayer: [],
      teamName: '',
      playerFullListData:[],
      objSelectedPlayers:{},
      checkSelectedTeam:false,
      submittedAddPlayer:false,
      ssteamid:"0"
    }

    this.showSubAdminInfo = this.showSubAdminInfo.bind(this);
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(this);
    this.addTeamToggle = this.addTeamToggle.bind(this);
    this.editTeamToggle = this.editTeamToggle.bind(this);
    this.showSubAdminToggle = this.showSubAdminToggle.bind(this);
    this.deleteSubAdminToggle = this.deleteSubAdminToggle.bind(this);
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.assignResourceSubAdminToggle = this.assignResourceSubAdminToggle.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.playerSearch = this.playerSearch.bind(this);
    this.countrySearch = this.countrySearch.bind(this);
    this.addColorToggle = this.addColorToggle.bind(this);


  }
  componentDidMount() {

    this.props.dispatch(cricketActions.getTeamList());
    this.props.dispatch(teamActions.getPlayerList());
  }
  componentWillReceiveProps(nextProps) {
    let formthis=this;
    if (nextProps.cricket.teamAdded) {
   
      this.setState({ addTeamModal: false });
      this.props.dispatch(cricketActions.getTeamList());
    }
    if (nextProps.cricket.playerAdded1) {

      this.props.dispatch(cricketActions.getPlayerList(this.state.activeTeam));
      console.log("----------Close Now-----------");
      this.setState({ 
        showSubAdminModal: false
       });
      
    }
    if (nextProps.team.items) {//All Player from API 
      this.setState({ playerListData: nextProps.team.items });
      this.setState({ playerFullListData: nextProps.team.items });

    }
    if (nextProps.cricket.playerList) {//Teamwise  Player from API 
      let objSelectedPlayers={};
      ((nextProps.cricket.playerList)?nextProps.cricket.playerList:[]).map((array, key) => {
        // if (nextProps.cricket.playerList) {
        //   let findelement=nextProps.cricket.playerList.find(x => x.pid === array.pid);
        //   if (findelement) {
        //      array['checketstatus']=true;
        //   } else {
        //      array['checketstatus']=false;
        //   }
        // }
        // return array;

        
        objSelectedPlayers[array.pid]=true;
      });

      this.setState({
        //playerListData: items
        objSelectedPlayers:objSelectedPlayers
      });

     

    }
    // else if (this.state.playerListData){
      
    //   let items = this.state.playerListData.map((array, key) => {
    //     array['checketstatus']=false;
    //     return array;
    //   }, []);
    //   this.setState({
    //     playerListData: items
    //   });
      
      
    // }
  }
  assignResourceSubAdminToggle() {
    this.setState({
      assignResourceSubAdminModal: !this.state.assignResourceSubAdminModal,
    });
  }
  playerSearch(e) {
    let { team } = this.props;
    let { items } = team;
    let obj = items
    var results = [];   
    var name = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    
    //let exstPlayer=obj.filter(item => item.checketstatus===true);    
    results = obj.filter(item => item.pname.toLowerCase().indexOf(name.toLowerCase().replace(/^\s+|\s+$/g, '')) > -1);
    //let bindPlayers=exstPlayer.concat(results);
    this.setState({ playerListData: results });

  }
  countrySearch(e) {
    let { team } = this.props;
    let { items } = team;
    let obj = items
    var results = [];
    var country = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    results = obj.filter(item => item.country.indexOf(country) > -1);
    this.setState({ playerListData: results });

  }
  handleChangeSearch(e) {

    const { value } = e.target;
    let data = {
      "limit": 10,
      "page": 1,
      "search": value.replace(/^\s+|\s+$/g, '')
    }
    this.props.dispatch(cricketActions.getTeamList(data));
  }
  addSubAdmin() {
    //this.setState({ submitted: true });
    const { teamname ,shortname} = this.state;
    const { dispatch } = this.props;
    let ssteamid=this.state.ssteamid;
    if (teamname) {
      let data = {
        teamname: teamname,
        shortname: shortname,
        ssteamid:"0"
      }
      if(ssteamid!="0")
      {
        data = {
          teamname: teamname,
          shortname: shortname,
          ssteamid:ssteamid
        }
      }

      dispatch(cricketActions.addTeam(data));
    }
  }
  addPlayer(data) {

    //this.setState({ submitted: true });
    if(this.state.submittedAddPlayer===false)
    {
      this.setState({ submittedAddPlayer: true });
        const { activeTeam } = this.state;
        const { dispatch } = this.props;   
        
        // let  results = this.state.playerListData.filter(item => item.checketstatus===true);
        // //this.setState({ playerListData: results });
        
        let selectedpid=[];
        // for (let index = 0; index < results.length; index++) {
        //   selectedpid.push(results[index].pid)
        // }    

        console.log("this.state.objSelectedPlayers===>>",this.state.objSelectedPlayers)
        let objSelectedPlayers=this.state.objSelectedPlayers;

      Object.keys(objSelectedPlayers).forEach(function(itemSP,indexSP){
        console.log(itemSP,indexSP,"===>>",objSelectedPlayers[itemSP])
          if(objSelectedPlayers[itemSP]===true)
          {
            console.log("Object.keys(objSelectedPlayers[indexSP]=",itemSP);
            selectedpid.push(itemSP);
          }
        })
        
        if (activeTeam) {
          let data = {
            teamid: activeTeam,
            pids: selectedpid
          }
          console.log("data====>>>",data);
          dispatch(cricketActions.addPlayer(data));
        }
  }
  }
  showSubAdminToggle() {
    this.setState({
      showSubAdminModal: !this.state.showSubAdminModal,
    });
  }
  addColorToggle() {
    this.setState({
      addColorModel: !this.state.addColorModel,
    });
  }
  deleteSubAdminToggle() {
    this.setState({
      deleteSubAdminModal: !this.state.deleteSubAdminModal,
    });
  }
  addTeamToggle() {
    this.setState({
      addTeamModal: !this.state.addTeamModal,
    });
  }

  editTeamToggle(teamdetail){

    this.setState({
        teamname: teamdetail.teamname,
        shortname: teamdetail.shortname,
        ssteamid:teamdetail.id
    })
    this.addTeamToggle();
  }

  saveTeamToggle=()=> {
    let formthis=this;
    this.addTeamToggle();
    this.setState({
        teamname: "",
        shortname: "",
        ssteamid:"0"
    });
  }

  toggle(tab, name) {
    if (this.state.activeTeam !== tab) {
      this.setState({
        activeTeam: tab,
        teamName: name
      });
    }
    this.props.dispatch(cricketActions.getPlayerList(tab))
  }
  getBadge = (status) => {
    return status === "1" ? 'success' :
      'danger'
  }
  handleChangeAddSubAdmin(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);
    this.setState({
      accordion: state,
    });
  }

  handleSelectedTeam=(e)=>{
    const isChecked = e.target.checked;    
    this.setState({checkSelectedTeam:isChecked});
  }

  handleCheckChange = (e) => {
     const item = e.target.value;
     const isChecked = e.target.checked;    
    // var data = [...this.state.playerListData];
    // var index = data.findIndex(obj => obj.pid === item);
    // data[index].checketstatus = isChecked;
    // this.setState({data});

    let objSelectedPlayers=this.state.objSelectedPlayers;
    objSelectedPlayers[item]=isChecked;
    this.setState({objSelectedPlayers:objSelectedPlayers});

  }
  handleSelectedPaginate(selectedPage) {
    let data = {
      "limit": 10,
      "page": selectedPage,
      "search": ""
    }
    this.props.dispatch(cricketActions.getTeamList(data));
  }
  handleChangeCheckedResource(checked, e, id) {
    this.setState({ [id]: checked });
  }
  showSubAdminInfo(data) {
    this.setState({
      showSubAdminModal: !this.state.showSubAdminModal,
      submittedAddPlayer: false,
      checkSelectedTeam:false
    });
  }
  showMessage() {
    return "Not Found"
  }
  render() { 
    var formThis = this;
    let { cricket } = this.props;
    let { teamList, playerList } = cricket;
    let sno=0;
    return (
      <div className="animated fadeIn">
        {cricket.loading?<div className="loader"></div>:null}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="12">
                    <i className="fa fa-align-justify"></i><strong> TEAM LIST</strong> <small></small>
                  </Col>
                  <br />
                  <Col xl="3">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="primary" ><i className="fa fa-search"></i></Button>
                      </InputGroupAddon>
                      <Input type="text" id="search" name="search" placeholder="Team Name" onChange={this.handleChangeSearch} autoComplete="off" />
                    </InputGroup>
                  </Col>
                  <Col xl="7"></Col>
                  <Col xl="2">
                    <Button onClick={this.saveTeamToggle} className="mr-1" color="success" >Add Team</Button>
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      {
                        teamList ? teamList.map((team, index) =>
                          <ListGroupItem key={index} onClick={() => this.toggle(team.id, team.teamname)} action active={this.state.activeTeam === team.id} >{team.teamname}-({team.shortname}) <i class="cui-note h2" onClick={()=>this.editTeamToggle(team)}></i></ListGroupItem>
                        ) : null
                      }
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    {this.state.activeTeam ? <TabContent activeTab={this.state.activeTeam}>
                      <TabPane tabId={this.state.activeTeam} >
                        <Row>
                          <Col xl={12}>
                            <Card>
                              <CardHeader>
                                <FormGroup row>
                                  <Col xl="6">
                                    <i className="fa fa-align-justify"></i> {this.state.teamName} <small className="text-muted"></small>
                                  </Col>
                                  <Col xl="3"></Col>
                                  <Col xl="3" >
                                    <Button onClick={this.showSubAdminInfo} className="mr-1 float-right" color="success" >Add Player In Team</Button>
                                  </Col>
                                </FormGroup>
                              </CardHeader>
                              <CardBody>
                                <table className="fixed_header">
                                      <thead>
                                        <tr>
                                          <th scope="col">PLAYERID</th>
                                          <th scope="col">IMAGE</th>
                                          <th scope="col">NAME</th>
                                          
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {
                                            playerList ? playerList.map((player, index) => <tr key={player.pid}>
                                              <td>{player.pid}</td>
                                              <td><img src={player.pimg} width="50" height="50" onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}} className="img-avatar" alt="" /></td>
                                              <td>{player.pname}</td>
                                            </tr >
                                            ) : null
                                        }
                                      </tbody>
                                </table>
                                
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                      : null}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.addTeamModal} toggle={this.addTeamToggle} className={this.props.className}>
          <ModalHeader toggle={this.addTeamToggle}>Add Team</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Team Name</Label>
                  <Input type="text" name="teamname" id="teamname" autoComplete="off" value={this.state.teamname} placeholder="Team Name" onChange={this.handleChangeAddSubAdmin} >
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Short Name</Label>
                  <Input type="text" name="shortname" id="shortname" autoComplete="off" value={this.state.shortname} placeholder="Short Name" onChange={this.handleChangeAddSubAdmin} >
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addSubAdmin()}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.addTeamToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showSubAdminModal} toggle={this.showSubAdminToggle} className={'my-modal ' + this.props.className} >
          <ModalHeader toggle={this.showSubAdminToggle}>Add Player In Team</ModalHeader>
          <ModalBody>
            <Row>
              <Col xl={12}>
                <Card>
                  <CardHeader>
                    <FormGroup row>
                      <Col xl="12">
                        <i className="fa fa-align-justify"></i><strong>PLAYER LIST</strong>
                      </Col>
                      <Col xl="3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Button type="button" color="primary" ><i className="fa fa-search"></i></Button>
                          </InputGroupAddon>
                          <Input type="text" id="search" name="search" placeholder="PlayerName" onChange={this.playerSearch} autoComplete="off" />
                          
                        </InputGroup>
                      </Col>
                      <Col xl="6">
                      <InputGroup className="chksel">
                          Selected Players : 
                          <input type="checkbox" name="chkPro" checked={formThis.state.checkSelectedTeam}  onChange={formThis.handleSelectedTeam} />
                        </InputGroup>
                      </Col>
                      <Col xl="3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Button type="button" color="primary" ><i className="fa fa-search"></i></Button>
                          </InputGroupAddon>
                          <Input type="text" id="search" name="search" placeholder="CountryName" onChange={this.countrySearch} autoComplete="off" />
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </CardHeader>
                  <CardBody>
                  <table className="fixed_header">
                      <thead>
                        <tr>
                          <th scope="col">S.No.</th>
                          <th scope="col">PLAYERID</th>
                          <th scope="col">IMAGE</th>
                          <th scope="col">NAME</th>
                          <th scope="col">ROLE</th>
                          <th scope="col">COUNTRY</th>
                          <th scope="col">SELECT PLAYER</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.playerListData
                          ? this.state.playerListData.map(function(player, index){
                            let showSelected=(formThis.state.checkSelectedTeam===true)?((formThis.state.objSelectedPlayers[player.pid]===true)?player.pid:0):player.pid;
                            if(showSelected===player.pid)
                            {
                                return(
                                <tr key={player.pid}>
                                  <td>{++sno}</td>
                                  <td>{player.pid}</td>
                                  <td>
                                    <img
                                      src={player.pimg}
                                      width="50"
                                      height="50"
                                      className="img-avatar"
                                      onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}} 
                                      alt=""
                                    />
                                  </td>
                                  <td>{player.pname}</td>
                                  <td>{player.ptype}</td>
                                  <td>{player.country}</td>
                                  <td>{player.checketstatus}</td>
                                  <td> <input type="checkbox" name="chkPro" value={player.pid} checked={(formThis.state.objSelectedPlayers[player.pid]===true)?true:false} defaultChecked={player.checketstatus} onChange={formThis.handleCheckChange} /></td>
                                  
                                </tr>
                              )
                          }
                        })
                          : null
                         }
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            {/* //this.addPlayer() this.toggle(team.id, team.teamname)   this.toggle(this.state.activeTeam, this.state.teamName)*/}
            <Button color="primary" onClick={() => this.addPlayer()}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.showSubAdminToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.addColorModel}
          toggle={this.addColorToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.addColorToggle}>
          Tshirt's Color
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Tshirt's Color</Label>
                   <ListGroup id="list-tab" role="tablist">
                      {
                         playerList ? playerList.map((player, index) => 
                          <ListGroupItem key={index} onClick={() => this.toggle(player.id, player.teamname)} action active={this.state.activeTeam === player.id} ><img
                          src={"player.pimg"}
                          width="50"
                          height="50"
                          className="img-avatar"
                           onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}
                          alt=""
                        /></ListGroupItem>
                        ) : null
                      }
                    </ListGroup>    
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <ImageUploader
                    withIcon={false}
                    buttonText="Add new T'shirt Logo"
                    withLabel={false}
                    withPreview={false}
                    onChange={this.onDropEdit}
                    maxFileSize={5242880}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addContenst()}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.addColorToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

function mapStateToProps(state) {
  const { cricket, team, authentication } = state;
  const { user } = authentication;
  return {
    user,
    cricket,
    team
  };
}
export default connect(mapStateToProps)(AddTeams);
