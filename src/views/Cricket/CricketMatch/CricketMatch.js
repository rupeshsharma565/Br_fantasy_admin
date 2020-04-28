import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import { authHeader } from '../../../_helpers';
import { CONST } from '../../../_config';
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
  ListGroup,
  ListGroupItem,
  Badge
} from 'reactstrap';
import ImageUploader from 'react-images-upload';
import * as moment from 'moment';
import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { cricketActions } from '../../../_actions';

class CricketMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      checked: false,
      getId: 0,
      isLoading: false,
      addCricketModal: false,
      showCricketModal: false,
      updateCricketModal: false,
      options: [],
      pictures: [],
      chkbox: true,
      optionsMatchList: [],
      matchid: '',
      totalPoint: ''
    };
    this.updateCricketMatchToggle = this.updateCricketMatchToggle.bind(this);
    this.showCricketMatchToggle = this.showCricketMatchToggle.bind(this);
    this.onDrop1 = this.onDrop1.bind(this);
    this.onDrop2 = this.onDrop2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitNewCricketMatch = this.submitNewCricketMatch.bind(this);
    this.addCricketMatchToggle = this.addCricketMatchToggle.bind(this);
    this.searchMatch = this.searchMatch.bind(this);
    this.searchTeam = this.searchTeam.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(cricketActions.getListMatches());
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextPropsnextProps  ', nextProps.cricket.teamsList);
    this.setState({ options: nextProps.cricket.teamsList });
    this.setState({ optionsMatchList: nextProps.cricket.matchList });
    if (nextProps.cricket.playerList1) {
      let result = nextProps.cricket.playerList1.map(function(el) {
        var o = Object.assign({}, el);
        o.pts = 0;
        o.credit = 0;
        o.playerchecked = false;
        return o;
      });
      // console.log(result);
      this.setState({ playerList1: result });
    } else {
      this.setState({ playerList1: [] });
    }
    if (nextProps.cricket.playerList2) {
      let result = nextProps.cricket.playerList2.map(function(el) {
        var o = Object.assign({}, el);
        o.pts = 0;
        o.credit = 0;
        o.playerchecked = false;
        return o;
      });
      // console.log(result);
      this.setState({ playerList2: result });
    } else {
      this.setState({ playerList2: [] });
    }
    if (nextProps.cricket.matchDetails) {
      this.setState({matchDetails:nextProps.cricket.matchDetails});
    } 
  }
  //Add Dialog box showCricketModal: !this.state.showCricketModal
  addCricketMatchToggle() {
    this.setState({
      addCricketModal: !this.state.addCricketModal
    });
  }
  searchTeam(query) {
    console.log('query  ', query);
    let data = {
      search: query
    };
    this.props.dispatch(cricketActions.getTeamListSearch(data));
  }
  searchMatch(query) {
    console.log('query  ', query);
    let data = {
      search: query
    };
    this.props.dispatch(cricketActions.getMatchList(data));
  }
  cleanDate(d) {return new Date(+d.replace(/\/Date\((\d+)\)\//, '$1'));}
  onChange1 = value => {
    console.log('value  ', value[0]);
    if (value[0]) {
      let data = { teamid: value[0].id };
      this.setState({
        teamname1: value[0].teamname,
        teamid1: value[0].id
      });
      this.props.dispatch(cricketActions.getPlayerListByTeam1(data));
    }
  };
  onChange2 = value => {
    console.log('value  ', value[0]);
    if (value[0]) {
      let data = { teamid: value[0].id };
      this.setState({
        teamname2: value[0].teamname,
        teamid2: value[0].id
      });
      this.props.dispatch(cricketActions.getPlayerListByTeam2(data));
    }
  };
  onInputBoxChange1 = e => {
    var index = this.state.playerList1.findIndex(x => x.pid === e.target.id);
    let playerList1 = [...this.state.playerList1];
    let player = { ...playerList1[index] };
    if (e.target.name === 'playerchecked') {
      player[e.target.name] = !player.playerchecked;
    } else {
      player[e.target.name] = e.target.value;
    }
    playerList1[index] = player;
    this.setState({ playerList1: playerList1 });
  };
  onInputBoxChange2 = e => {
    var index = this.state.playerList2.findIndex(x => x.pid === e.target.id);
    let playerList2 = [...this.state.playerList2];
    let player = { ...playerList2[index] };
    if (e.target.name === 'playerchecked') {
      player[e.target.name] = !player.playerchecked;
    } else {
      player[e.target.name] = e.target.value;
    }
    playerList2[index] = player;
    console.log(playerList2);

    this.setState({ playerList2: playerList2 });
  };
  onChangeSelectMatch = value => {
    //console.log('value selected match ', value[0]);
    if (value[0]) {
      this.setState({
        matchid: value[0].unique_id,
        team1: value[0].team1,
        team2: value[0].team2,
        matchname: value[0].team1 + ' V/S ' + value[0].team2,
        gametype: 'cricket',
        mstarted: value[0].matchStarted === 'false' ? 0 : 1,
        mdate: value[0].mdate,
        mtype: value[0].mtype,
        mdategmt: value[0].dateTimeGMT
      });
    }
  };
  //Update checkbox to  select player
  handleChange(e) {
    console.log('e  ', e.target.name);
    console.log('e  ', e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  //Now submit new cricket match asdf
  submitNewCricketMatch() {
      
      let data={};
      let players =[];
      this.state.playerList1.map((player,index) => {
              players.push({"pid":player.pid,"pts":player.pts,"credit":player.credit,"teamname":this.state.teamname1, "teamid":this.state.teamid1})     
              return data;   
      })
      this.state.playerList2.map((player,index) => {
            players.push({"pid":player.pid,"pts":player.pts,"credit":player.credit,"teamname":this.state.teamname2, "teamid":this.state.teamid2})         
            return data;  
      })
      console.log("playersplayersplayers   ",players);
      
      data["players"]= players;
      data["matchid"]= this.state.matchid;
      data["matchname"]=this.state.matchname;
      data["team1"]= this.state.teamname1;
      data["team2"]= this.state.teamname2;
      data["gametype"]= this.state.gametype;
      data["totalpoints"]= this.state.totalPoint;
      data["wicket"]=4;
      data["catch"]=2;
      data["run"]=1;
      data["six"]=5;
      data["four"]=4;
      data["team1logo"]= this.state.teamLogo1;
      data["team2logo"]= this.state.teamLogo2;
      data["mtype"]=this.state.mtype;
      data["mstarted"]=this.state.mstarted;
      data["mdate"]=this.state.mdate;
      data["mdategmt"]=this.state.mdategmt;
      console.log("datadata  datadatadata---------->>>>",data);
      this.props.dispatch(cricketActions.addCricketMatch(data));

  }
  //Upload team logo
  onDrop1(picture) {
    //console.log(picture);

    const formData = new FormData();
    formData.append('imgtype', 'teamlogo');
    formData.append('images[]', picture[0]);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config)
      .then(response => {
        //alert("The file is successfully uploaded");
        console.log('response  data ', response.data);
        if (response.data.code === 0) {
          this.setState({ teamLogo1: response.data.data[0] });
          console.log('response.',response.data.data);
        } else {
          alert('Error to upload image');
        }
      })
      .catch(error => {});
    // this.setState({
    //   pictures: this.state.pictures.concat(picture)
    // });
  }
  onDrop2(picture) {
    console.log(picture);

    const formData = new FormData();
    formData.append('imgtype', 'teamlogo');
    formData.append('images[]', picture[0]);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config)
      .then(response => {
        //alert("The file is successfully uploaded");
        console.log('response  data ', response.data);
        if (response.data.code === 0) {
          this.setState({ teamLogo2: response.data.data[0] });
          console.log(
            'response.data.dataresponse.data.data ', response.data.data[0]);
        } else {
          alert('Error to upload image');
        }
      })
      .catch(error => {});
    // this.setState({
    //   pictures: this.state.pictures.concat(picture)
    // });
  }
  //Show Cricket Modal
  showCricketMatchToggle(data) {
    console.log("data  ",data);
    //this.setState({matchDetails:null});
    if (data.matchid) {
       let reqdata={
        matchid:data.matchid
      }
      this.props.dispatch(cricketActions.getMatchDetails(reqdata));
    }

    this.setState({
      showCricketModal: !this.state.showCricketModal
    });
  }
  //Show Cricket Modal
  updateCricketMatchToggle(data) {
    console.log("data  ",data);
    //this.setState({matchDetails:null});
    // if (data.matchid) {
    //    let reqdata={
    //     matchid:data.matchid
    //   }
    //   //this.props.dispatch(cricketActions.getMatchDetails(reqdata));
    // }

    this.setState({
      updateCricketModal: !this.state.updateCricketModal
    });
  }
  render() {
    const { cricket } = this.props;
    let { items } = cricket;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" />{' '}
                    <strong>MATCH List</strong>
                  </Col>
                  <Col xl="4" />
                  <Col xl="2">
                    <Button
                      href={`#/cricket/match/addmatch`}
                      className="mr-1"
                      color="success"
                    >
                      New Match
                    </Button>
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">TEAM 1</th>
                      <th scope="col">TEAM 2</th>
                      <th scope="col">Match ID</th>
                      <th scope="col">GMT DATE</th>
                      <th scope="col">MATCH NAME</th>
                      <th scope="col">ACTION</th>
                      <th scope="col">UPDATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      ? items.map((matchs, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={matchs.team1logo} width="50" height="50"  onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}} className="img-avatar" alt="" /></td>
                            <td><img src={matchs.team2logo} width="50" height="50"  onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}} className="img-avatar" alt="" /></td>
                            <td>{matchs.matchid}</td>
                            <td>{ moment(matchs.mdategmt*1000).format("DD-MM-YYYY h:mm:ss")}</td>
                            <td>{matchs.matchname}</td>
                            <td ><Badge
                                className="mr-1"
                                onClick={() =>
                                  this.showCricketMatchToggle(matchs)
                                }
                                color="info"
                                style={{ cursor: 'pointer' }}
                              >
                                Show
                              </Badge></td>
                              <td ><Badge
                                className="mr-1"
                                href={`#/cricket/match/${matchs.matchid}`}
                                color="info"
                                style={{ cursor: 'pointer' }}
                              >
                                Update
                              </Badge></td>
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
          <Col xl={6}>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.addCricketModal}
          toggle={this.addCricketMatchToggle}
          className={'my-modal ' + this.props.className}>
          <ModalHeader toggle={this.addCricketMatchToggle}>
            Add New Cricket Match
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="pid">Total Points</Label>
                    <Input
                      type="text"
                      name="totalPoint"
                      id="totalPoint"
                      autoComplete="off"
                      value={this.state.totalPoint}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="fpname">Search Match</Label>
                    <AsyncTypeahead
                      isLoading={this.state.isLoading}
                      labelKey={option =>
                        `${moment(option.dateTimeGMT).format('DD MMM YYYY')}, ${
                          option.team1
                        } V/S ${option.team2}  `
                      }
                      onChange={this.onChangeSelectMatch}
                      onSearch={this.searchMatch}
                      options={this.state.optionsMatchList}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="fpname">MatchId</Label>
                    <Input
                      type="text"
                      name="matchid"
                      id="matchid"
                      autoComplete="off"
                      value={this.state.matchid}
                      disabled
                    />
                  </FormGroup>
              </Col>
              <Col xs="6">
                  <ImageUploader
                    withIcon={false}
                    buttonText="Team1 Logo"
                    withLabel={false}
                    withPreview={false}
                    onChange={this.onDrop1}
                    maxFileSize={5242880}
                  />
                <ImageUploader
                  withIcon={false}
                  buttonText="Team2 Logo"
                  withLabel={false}
                  withPreview={false}
                  onChange={this.onDrop2}
                  maxFileSize={5242880}
                />                
              </Col>
            </Row>
            <Row>
              <Col xs="5">
                <FormGroup>
                  <Label htmlFor="pid">Select Team1</Label>

                  <AsyncTypeahead
                    isLoading={this.state.isLoading}
                    labelKey={option => `${option.teamname}`}
                    onChange={this.onChange1}
                    onSearch={this.searchTeam}
                    options={this.state.options}
                  />
                </FormGroup>
                <ListGroup>
                  {this.state.playerList1
                    ? this.state.playerList1.map((player, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col xs="1">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id={player.pid}
                                name="playerchecked"
                                value={
                                  this.state.playerList1[index].playerchecked
                                }
                                defaultChecked={
                                  this.state.playerList1[index].playerchecked
                                }
                                onChange={this.onInputBoxChange1}
                              />
                            </Col>
                            <Col xs="5">{player.fullname}</Col>
                            <Col xs="3">
                              <Input
                                type="text"
                                id={player.pid}
                                name="pts"
                                value={this.state.playerList1[index].pts}
                                placeholder="Points"
                                onChange={this.onInputBoxChange1}
                              />
                            </Col>
                            <Col xs="3">
                              <Input
                                type="text"
                                id={player.pid}
                                name="credit"
                                placeholder="Credit"
                                value={this.state.playerList1[index].credit}
                                onChange={this.onInputBoxChange1}
                              />
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))
                    : null}
                </ListGroup>
              </Col>
              <Col xs="2">V/S</Col>
              <Col xs="5">
                <FormGroup>
                  <Label htmlFor="fpname">Select Team2</Label>
                  <AsyncTypeahead
                    isLoading={this.state.isLoading}
                    labelKey={option => `${option.teamname}`}
                    onChange={this.onChange2}
                    onSearch={this.searchTeam}
                    options={this.state.options}
                  />
                </FormGroup>
                <ListGroup>
                  {this.state.playerList2
                    ? this.state.playerList2.map((player, index) => (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col xs="1">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id={player.pid}
                                name="playerchecked"
                                value={
                                  this.state.playerList2[index].playerchecked
                                }
                                defaultChecked={
                                  this.state.playerList2[index].playerchecked
                                }
                                onChange={this.onInputBoxChange2}
                              />
                            </Col>
                            <Col xs="5">{player.fullname}</Col>
                            <Col xs="3">
                              <Input
                                type="text"
                                id={player.pid}
                                name="pts"
                                value={this.state.playerList2[index].pts}
                                placeholder="Points"
                                onChange={this.onInputBoxChange2}
                              />
                            </Col>
                            <Col xs="3">
                              <Input
                                type="text"
                                id={player.pid}
                                name="credit"
                                placeholder="Credit"
                                value={this.state.playerList2[index].credit}
                                onChange={this.onInputBoxChange2}
                              />
                            </Col>
                          </Row>
                        </ListGroupItem>
                      ))
                    : null}
                </ListGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.submitNewCricketMatch()}
            >
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.addCricketMatchToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.showCricketModal}
          toggle={this.showCricketMatchToggle}
          className={'my-modal ' + this.props.className}>
          <ModalHeader toggle={this.showCricketMatchToggle}>
            Show Cricket Match
          </ModalHeader>
          {
            this.state.matchDetails? 
            <ModalBody>
              <Row>
                <Col xs="6">{this.state.matchDetails ? this.state.matchDetails.matchid : `` }
                    <FormGroup>
                      <Label htmlFor="pid">Total Points</Label>
                      <Input
                        type="text"
                        name="totalPoint"
                        id="totalPoint"
                        autoComplete="off"
                        value={this.state.matchDetails.totalpoints}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="fpname">Match Name</Label>
                      <Input
                        type="text"
                        name="totalPoint"
                        id="totalPoint"
                        autoComplete="off"
                        value={this.state.matchDetails.matchname}
                       
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="fpname">MatchId</Label>
                      <Input
                        type="text"
                        name="matchid"
                        id="matchid"
                        autoComplete="off"
                        value={this.state.matchDetails.matchid}
                        disabled
                      />
                    </FormGroup>
                </Col>
                <Col xs="6">
                <Row>
                  <Col xs="6">Team 1 Logo</Col>
                  <Col xs="6"><img src={this.state.matchDetails.team1logo}
                                width="100"
                                height="100"
                                className="img-avatar"
                                 onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}
                                alt=""
                     />
                  </Col>
                </Row>
                <Row>
                  <Col xs="6"> Team 2 Logo </Col>
                  <Col xs="6">
                    <img src={this.state.matchDetails.team2logo}  width="100"  height="100"  onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}  className="img-avatar" alt="" /></Col></Row>
                  </Col>
              </Row>
              <Row>
                <Col xs="5">
                  <FormGroup>
                    <Label htmlFor="pid">Selected Team1</Label>

                    <Input
                        type="text"
                        name="matchid"
                        id="matchid"
                        autoComplete="off"
                        value={this.state.matchDetails.team1}
                        disabled
                      />
                  </FormGroup>
                  <ListGroup> {/**/}
                    {this.state.matchDetails.players
                      ? this.state.matchDetails.players.filter(player => player.teamname === this.state.matchDetails.team1).map((player, index) => (
                          <ListGroupItem key={index}>
                            <Row>
                              <Col xs="3">
                               <img src={player.pimg}
                                            width="50"
                                            height="50"
                                             onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}
                                            className="img-avatar"
                                            alt=""
                                />
                              </Col>
                              <Col xs="3">{player.pname}</Col>
                              <Col xs="3">
                                <Input
                                  type="text"
                                  id={player.teamname}
                                  name="pts"
                                  value={this.state.matchDetails.players[index].pts}
                                  placeholder="Points"
                                  onChange={this.onInputBoxChange1}
                                  disabled
                                />
                              </Col>
                              <Col xs="3">
                                <Input
                                  type="text"
                                  id={player.pid}
                                  name="credit"
                                  placeholder="Credit"
                                  value={this.state.matchDetails.players[index].credit}
                                  onChange={this.onInputBoxChange1}
                                  disabled
                                />
                              </Col>
                            </Row>
                          </ListGroupItem>
                        ))
                      : null}
                  </ListGroup>
                </Col>
                <Col xs="2">V/S</Col>
                <Col xs="5">
                  <FormGroup>
                    <Label htmlFor="fpname">Selected Team2</Label>
                    <Input
                        type="text"
                        name="matchid"
                        id="matchid"
                        autoComplete="off"
                        value={this.state.matchDetails.team2}
                        disabled
                      />
                  </FormGroup>
                  <ListGroup>
                    {this.state.matchDetails.players
                      ? this.state.matchDetails.players.filter(player => player.teamname === this.state.matchDetails.team2).map((player, index) => (
                          <ListGroupItem key={index}>
                            <Row>
                             <Col xs="3">
                                <img src={player.pimg}
                                            width="50"
                                            height="50"
                                            onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}
                                            className="img-avatar"
                                            alt=""
                                />
                              </Col>
                              <Col xs="3">{player.pname}</Col>
                              <Col xs="3">
                                <Input
                                  type="text"
                                  id={player.teamname}
                                  name="pts"
                                  value={this.state.matchDetails.players[index].pts}
                                  placeholder="Points"
                                  onChange={this.onInputBoxChange1}

                                  disabled
                                />
                              </Col>
                              <Col xs="3">
                                <Input
                                  type="text"
                                  id={player.pid}
                                  name="credit"
                                  placeholder="Credit"
                                  value={this.state.matchDetails.players[index].credit}
                                  onChange={this.onInputBoxChange1}

                                  disabled
                                />
                              </Col>
                            </Row>
                          </ListGroupItem>
                        ))
                      : null}
                  </ListGroup>
                </Col>
              </Row>
            </ModalBody>
            :null
          }
          <ModalFooter>
            <Button color="secondary" onClick={this.showCricketMatchToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.updateCricketModal}
          toggle={this.updateCricketMatchToggle}
          className={'my-modal ' + this.props.className}>
          <ModalHeader toggle={this.updateCricketMatchToggle}>
            Update Cricket Match
          </ModalHeader>
          {
            this.state.matchDetails? 
            <ModalBody>
              <Row>
                <Col xs="6">{this.state.matchDetails ? this.state.matchDetails.matchid : `asdfasdf` }
                    <FormGroup>
                      <Label htmlFor="pid">Total Points</Label>
                      <Input
                        type="text"
                        name="totalPoint"
                        id="totalPoint"
                        autoComplete="off"
                        value={this.state.matchDetails.totalpoints}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="fpname">Match Name</Label>
                      <Input
                        type="text"
                        name="totalPoint"
                        id="totalPoint"
                        autoComplete="off"
                        value={this.state.matchDetails.matchname}
                       
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="fpname">MatchId</Label>
                      <Input
                        type="text"
                        name="matchid"
                        id="matchid"
                        autoComplete="off"
                        value={this.state.matchDetails.matchid}
                        disabled
                      />
                    </FormGroup>
                </Col>
                <Col xs="6">
                <Row>
                  <Col xs="6">Team 1 Logo</Col>
                  <Col xs="6"><img src={this.state.matchDetails.team1logo}
                                width="100"
                                height="100"
                                className="img-avatar"
                                alt=""
                     />
                  </Col>
                </Row>
                <Row>
                  <Col xs="6"> Team 2 Logo </Col>
                  <Col xs="6">
                    <img src={this.state.matchDetails.team2logo}  width="100"  height="100"  className="img-avatar" alt="" /></Col></Row>
                  </Col>
              </Row>
              <Row>
                <Col xs="5">
                  <FormGroup>
                    <Label htmlFor="pid">Select Team1</Label>

                    <Input
                        type="text"
                        name="matchid"
                        id="matchid"
                        autoComplete="off"
                        value={this.state.matchDetails.team1}
                        disabled
                      />
                  </FormGroup>
                  <ListGroup>
                    {this.state.matchDetails.players
                      ? this.state.matchDetails.players.filter(player => player.teamname === this.state.matchDetails.team1).map((player, index) => (
                          <ListGroupItem key={index}>
                            <Row>
                              <Col xs="1">
                               
                              </Col>
                              <Col xs="5">{player.pid}</Col>
                              <Col xs="3">
                                <Input
                                  type="text"
                                  id={player.teamname}
                                  name="pts"
                                  value={this.state.matchDetails.players[index].pts}
                                  placeholder="Points"
                                  onChange={this.onInputBoxChange1}
                                  disabled
                                />
                              </Col>
                              <Col xs="3">
                                <Input
                                  type="text"
                                  id={player.pid}
                                  name="credit"
                                  placeholder="Credit"
                                  value={this.state.matchDetails.players[index].credit}
                                  onChange={this.onInputBoxChange1}
                                  disabled
                                />
                              </Col>
                            </Row>
                          </ListGroupItem>
                        ))
                      : null}
                  </ListGroup>
                </Col>
                <Col xs="2">V/S</Col>
                <Col xs="5">
                  <FormGroup>
                    <Label htmlFor="fpname">Select Team2</Label>
                    <Input
                        type="text"
                        name="matchid"
                        id="matchid"
                        autoComplete="off"
                        value={this.state.matchDetails.team2}
                        disabled
                      />
                  </FormGroup>
                  <ListGroup>
                    {this.state.matchDetails.players
                      ? this.state.matchDetails.players.filter(player => player.teamname === this.state.matchDetails.team2).map((player, index) => (
                          <ListGroupItem key={index}>
                            <Row>
                              <Col xs="1">
                               
                              </Col>
                              <Col xs="5">{player.pid}</Col>
                              <Col xs="3">
                                <Input
                                  type="text"
                                  id={player.teamname}
                                  name="pts"
                                  value={this.state.matchDetails.players[index].pts}
                                  placeholder="Points"
                                  onChange={this.onInputBoxChange1}

                                  disabled
                                />
                              </Col>
                              <Col xs="3">
                                <Input
                                  type="text"
                                  id={player.pid}
                                  name="credit"
                                  placeholder="Credit"
                                  value={this.state.matchDetails.players[index].credit}
                                  onChange={this.onInputBoxChange1}

                                  disabled
                                />
                              </Col>
                            </Row>
                          </ListGroupItem>
                        ))
                      : null}
                  </ListGroup>
                </Col>
              </Row>
            </ModalBody>
            :null
          }
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.submitNewCricketMatch()}
            >
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.updateCricketMatchToggle}>
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
export default connect(mapStateToProps)(CricketMatch);
