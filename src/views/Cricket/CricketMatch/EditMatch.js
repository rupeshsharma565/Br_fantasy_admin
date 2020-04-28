import React, { Component } from 'react';
import axios from 'axios';
import {  Redirect } from 'react-router-dom';
import Switch from 'react-switch';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { authHeader } from '../../../_helpers';
import { CONST } from '../../../_config';
import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Button,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { cricketActions ,teamActions} from '../../../_actions';

class EditMatch extends Component {
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
        showImageModal1: false,
        showImageModal2: false,
        options: [],
        pictures: [],
        chkbox: true,
        optionsMatchList: [],
        matchid: '',
        totalPoint: ''
    };
    this.handleChangeMatchName = this.handleChangeMatchName.bind(this);
    this.setPlayerType2 = this.setPlayerType2.bind(this);
    this.setPlayerType1 = this.setPlayerType1.bind(this);
    this.onInputBoxChangeSelect1 = this.onInputBoxChangeSelect1.bind(this);
    this.setNewImageOfPlayer1 = this.setNewImageOfPlayer1.bind(this);
    this.setNewImageOfPlayer2 = this.setNewImageOfPlayer2.bind(this);
    this.onDropNewPlayer1 = this.onDropNewPlayer1.bind(this);
    this.onDropNewPlayer2 = this.onDropNewPlayer2.bind(this);
    this.showImageToggle1 = this.showImageToggle1.bind(this);
    this.showImageToggle2 = this.showImageToggle2.bind(this);
    this.selectedImage1 = this.selectedImage1.bind(this);
    this.selectedImage2 = this.selectedImage2.bind(this);
    this.updateEditMatchToggle = this.updateEditMatchToggle.bind(this);
    this.showEditMatchToggle = this.showEditMatchToggle.bind(this);
    this.onDrop1 = this.onDrop1.bind(this);
    this.onDrop2 = this.onDrop2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitNewEditMatch = this.submitNewEditMatch.bind(this);
    this.addEditMatchToggle = this.addEditMatchToggle.bind(this);
    this.searchMatch = this.searchMatch.bind(this);
    this.searchTeam = this.searchTeam.bind(this);
  }
  componentDidMount() {
    let gametype=1;
    this.props.dispatch(teamActions.getRoleList(gametype));
      let reqdata = {
          matchid: this.props.match.params.id
      }
      const config = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/getmatchedit`, reqdata, config)
      .then(response => {
        console.log('getmatchedit  :: ', response.data);
        if (response.data.code === 0) {
            console.log("response.data.response.data.  ",response.data.data);
            let playerlist1= response.data.data.players.filter(player => player.teamname === response.data.data.team1);
            let playerlist2= response.data.data.players.filter(player => player.teamname === response.data.data.team2);
            
            let result1 = playerlist1.map(function(el) {
                var o = Object.assign({}, el);
                o.playerchecked = true;
                return o;
            });

            let result2 = playerlist2.map(function(el) {
                var o = Object.assign({}, el);
                o.playerchecked = true;
                return o;
            });
            
            this.setState({
                matchDetails: response.data.data,
                playerList1: result1,
                playerList2: result2,
            });
        } else {
           this.setState({
              matchDetails: {},
              playerList1: [],
              playerList2: [],
          });
          alert('Error to get match details');
        }
      })
      .catch(error => {});
  }
  componentWillReceiveProps(nextProps) {
      this.setState({
        options: nextProps.cricket.teamsList
      });
      this.setState({
        optionsMatchList: nextProps.cricket.matchList
      });
  }
  //Add Dialog box showCricketModal: !this.state.showCricketModal
  addEditMatchToggle() {
      this.setState({
          addCricketModal: !this.state.addCricketModal
      });
  }
  searchTeam(query) {
      console.log('query ', query);
      let data = {
          search: query
      };
      this.props.dispatch(cricketActions.getTeamListSearch(data));
  }
  searchMatch(query) {
      console.log('query ', query);
      let data = {
          search: query
      };
      this.props.dispatch(cricketActions.getMatchList(data));
  }
  onChange1 = value => {
    console.log('value  ', value[0]);
    
    if (value[0] &&  value[0].id===this.state.teamid2) {
      toast("Team already selected.");
    }
    else if (value[0]) {
      let data = { teamid: value[0].id };
      this.setState({
        teamname1: value[0].teamname,
        teamid1: value[0].id
      });
    const config = {
      headers: {

        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/listplayerbyteam`, data, config)
      .then(response => {
        console.log('listplayerbyteam  :: ', response.data);
        if (response.data.code === 0) {
          let result = response.data.data.map(function(el) {
            var o = Object.assign({}, el);
            o.pts = 0;
            o.credit = 0;
            o.playerchecked = false;
            return o;
          });
          this.setState({ playerList1: result });
          
        } else {
          this.setState({ playerList1: [] });

          alert('Error to upload image');
        }
      })
      .catch(error => {});
      //this.props.dispatch(cricketActions.getPlayerListByTeam1(data));
    }
  }
  onChange2 = value => {
    console.log('value  ', value[0]);
    if (value[0] && value[0].id===this.state.teamid1) {
      toast("Team already selected.");
    }
    else if (value[0]) {
      let data = { teamid: value[0].id };
      this.setState({
        teamname2: value[0].teamname,
        teamid2: value[0].id
      });
      const config = {
      headers: {

        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/listplayerbyteam`, data, config)
      .then(response => {
        console.log('listplayerbyteam  :: ', response.data);
        if (response.data.code === 0) {
           let result = response.data.data.map(function(el) {
            var o = Object.assign({}, el);
            o.pts = 0;
            o.credit = 0;
            o.playerchecked = false;
            return o;
          });
          this.setState({ playerList2: result});
        } else {
          this.setState({ playerList1: [] });

          alert('Error to upload image');
        }
      })
      .catch(error => {});
      //this.props.dispatch(cricketActions.getPlayerListByTeam2(data));
    }
  }
  onInputBoxChange1 = e => {
      var index = this.state.playerList1.findIndex(x => x.pid === e.target.id);
      let playerList1 = [...this.state.playerList1];
      let player = {
          ...playerList1[index]
      };
      if (e.target.name === 'playerchecked') {
          player[e.target.name] = !player.playerchecked;
      } else {
          player[e.target.name] = e.target.value;
      }
      playerList1[index] = player;
      this.setState({
          playerList1: playerList1
      });
  }
  onInputBoxChangeSelect1 = player => {
      // console.log("playerplayer ",player);

      var index = this.state.playerList1.findIndex(x => x.pid === player.pid);
      let playerList1 = [...this.state.playerList1];
      let player1 = {
          ...playerList1[index]
      };
      player1['playerchecked'] = !player.playerchecked;
      playerList1[index] = player1;
      this.setState({
          playerList1: playerList1
      });
  }
  onInputBoxChangeSelect2 = player => {
      // console.log("playerplayer ",player);

      var index = this.state.playerList2.findIndex(x => x.pid === player.pid);
      let playerList2 = [...this.state.playerList2];
      let player1 = {
          ...playerList2[index]
      };
      player1['playerchecked'] = !player.playerchecked;
      playerList2[index] = player1;
      this.setState({
          playerList2: playerList2
      });
  }
  onInputBoxChange2 = e => {
      var index = this.state.playerList2.findIndex(x => x.pid === e.target.id);
      let playerList2 = [...this.state.playerList2];
      let player = {
          ...playerList2[index]
      };
      if (e.target.name === 'playerchecked') {
          player[e.target.name] = !player.playerchecked;
      } else {
          player[e.target.name] = e.target.value;
      }
      playerList2[index] = player;
      console.log(playerList2);

      this.setState({
          playerList2: playerList2
      });
  }
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
  }
  //Update checkbox to select player
  handleChange(e) {
      console.log('e ', e.target.name);
      console.log('e ', e.target.value);
      this.setState({
          [e.target.name]: e.target.value
      });
  }
  //Now submit new cricket match asdf
  submitNewEditMatch() {

      let data = {};
      let players = [];
      //console.log(JSON.stringify(this.state.playerList1));

      this.state.playerList1.map((player, index) => {
          if (player.playerchecked) {
              console.log(player);
              players.push({
                  "pid": player.pid,
                  "playerimg": player.playerimage,
                  "pts": player.pts,
                  "ptype": player.playertype,
                  "credit": player.credit,
                  "teamname": player.teamname,
                  "teamid": player.teamid
              })

          }
          return data;
      })
      this.state.playerList2.map((player, index) => {
          if (player.playerchecked) {
              players.push({
                  "pid": player.pid,
                  "playerimg": player.playerimage,
                  "pts": player.pts,
                  "ptype": player.playertype,
                  "credit": player.credit,
                  "teamname": player.teamname,
                  "teamid": player.teamid
              })
          }
          return data;
      })
      console.log("playersplayersplayers ", players);
      data["players"] = players;
      data["matchid"] = this.state.matchDetails.matchid;
      data["matchname"] = this.state.matchDetails.matchname;
      data["team1"] = this.state.matchDetails.team1;
      data["team2"] = this.state.matchDetails.team2;
      data["team1logo"] = this.state.matchDetails.team1logoname;
      data["team2logo"] = this.state.matchDetails.team2logoname;
      data["mtype"] = this.state.matchDetails.mtype;
      data["gametype"] = this.state.matchDetails.gametype;
    //   data["mstarted"] = this.state.matchDetails.mstarted;
    //   data["mdate"] = this.state.matchDetails.mdate;
    //   data["mdategmt"] = this.state.matchDetails.mdategmt;
      data["gameid"] = this.state.matchDetails.gameid;
    console.log("asdf ::: ",this.state.matchDetails);
    
      console.log("datadata datadatadata---------->>>>", data);
     //  this.props.dispatch(cricketActions.addCricketMatch(data));

        const config = {
            headers: {

                Authorization: authHeader().Authorization
            }
        };
        axios
        .post(CONST.BACKEND_URL + `/api/editmatch`, data, config)
        .then(response => {
            console.log('datadatadatadata :: ', response.data);
            if (response.data.code === 0) {
                console.log(response.data);
                
                
            } else {
                alert('Error to upload image');
            }
        })
        .catch(error => {});
  }
  onDrop1(picture) {
      console.log("picture ", picture);
      if (picture[0]) {
        const formData = new FormData();
        formData.append('imgtype', 'teamlogo');
        formData.append('images[]', picture[picture.length-1]);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: authHeader().Authorization
          }
        };
        axios
          .post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config)
          .then(response => {
            console.log('response  data ', response.data);
            if (response.data.code === 0) {
              this.setState({ teamLogo1: response.data.data[0] });
               var matchDetails = {
                  ...this.state.matchDetails
              }
              matchDetails.team1logourl = CONST.BACKEND_URL +"/uploads/teamlogo/"+response.data.data[0];
              matchDetails.team1logo1 = response.data.data[0];

              this.setState({
                  matchDetails
              })
              picture=[];
            } else {
              picture=[];
              this.setState({ teamLogo1: '' });
              toast(response.data.msg);
            }
          })
          .catch(error => {});
      }
  }
  onDrop2(picture) {
      console.log(picture.length);

      if (picture[0]) {

        const formData = new FormData();
        formData.append('imgtype', 'teamlogo');
        formData.append('images[]', picture[picture.length-1]);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: authHeader().Authorization
          }
        };
        axios
          .post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config)
          .then(response => {
            console.log('response  data ', response.data);
            if (response.data.code === 0) {
             
               var matchDetails = {
                  ...this.state.matchDetails
              }
              matchDetails.team2logourl = CONST.BACKEND_URL +"/uploads/teamlogo/"+response.data.data[0];
              matchDetails.team2logo1 = response.data.data[0];
              this.setState({
                  matchDetails
              })
              console.log(
                'response.data.dataresponse.data.data ', response.data.data[0]);
              picture=[];
            } else {
              picture=[];
              this.setState({ teamLogo2: '' });
              toast(response.data.msg);
            }
          })
          .catch(error => {});
          
      }
  }
  //Upload team logo
  onDropNewPlayer1(picture) {
      console.log(picture);
      if (picture[0]) {
          const formData = new FormData();
          formData.append('pid', this.state.selectedPlayer1.pid);
          formData.append('img', picture[0]);

          const config = {
              headers: {
                  'content-type': 'multipart/form-data',
                  Authorization: authHeader().Authorization
              }
          };
          axios
              .post(CONST.BACKEND_URL + `/api/addplayerimg`, formData, config)
              .then(response => {
                  //alert("The file is successfully uploaded");

                  if (response.data.code === 0) {
                      console.log('addplayerimgaddplayerimgaddplayerimg data ', response.data);
                      console.log('response.', response.data.data);
                      let data = {
                          pid: this.state.selectedPlayer1.pid
                      }
                      const config1 = {
                          headers: {
                              'content-type': 'application/json',
                              Authorization: authHeader().Authorization
                          }
                      };
                      console.log("::::::::::::::::::::::::::::::::::::::: ", data);

                      axios
                          .post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1)
                          .then(response => {
                              console.log('datadatadatadata :: ', response.data.data);
                              if (response.data.code === 0) {
                                  this.setState({
                                      listOfPlayerImage1: response.data.data
                                  });
                                  console.log('this.state.listOfPlayerImage1 :: ', this.state.listOfPlayerImage1);

                              } else {
                                  alert('Error to upload image');
                              }
                          })
                          .catch(error => {});
                  } else {
                      toast(response.data.msg);
                      //alert('Error to upload image');
                  }
              })
              .catch(error => {});
          // this.setState({
          // pictures: this.state.pictures.concat(picture)
          // });
      }
  }
  //Upload team logo
  onDropNewPlayer2(picture) {
      console.log(picture);
      if (picture[0]) {
          const formData = new FormData();
          formData.append('pid', this.state.selectedPlayer2.pid);
          formData.append('img', picture[0]);

          const config = {
              headers: {
                  'content-type': 'multipart/form-data',
                  Authorization: authHeader().Authorization
              }
          };
          axios
              .post(CONST.BACKEND_URL + `/api/addplayerimg`, formData, config)
              .then(response => {
                  //alert("The file is successfully uploaded");

                  if (response.data.code === 0) {
                      console.log('addplayerimgaddplayerimgaddplayerimg data ', response.data);
                      console.log('response.', response.data.data);
                      let data = {
                          pid: this.state.selectedPlayer2.pid
                      }
                      const config1 = {
                          headers: {
                              'content-type': 'application/json',
                              Authorization: authHeader().Authorization
                          }
                      };
                      console.log("::::::::::::::::::::::::::::::::::::::: ", data);

                      axios
                          .post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1)
                          .then(response => {
                              console.log('datadatadatadata :: ', response.data.data);
                              if (response.data.code === 0) {
                                  this.setState({
                                      listOfPlayerImage2: response.data.data
                                  });
                                  console.log('this.state.listOfPlayerImage2 :: ', this.state.listOfPlayerImage2);

                              } else {
                                  alert('Error to upload image');
                              }
                          })
                          .catch(error => {});
                  } else {
                      toast(response.data.msg);
                  }
              })
              .catch(error => {});
      }
  }
  //Show Cricket Modal
  showEditMatchToggle(data) {
      console.log("data ", data);
      //this.setState({matchDetails:null});
      if (data.matchid) {
          let reqdata = {
              matchid: data.matchid
          }
          this.props.dispatch(cricketActions.getMatchDetails(reqdata));
      }

      this.setState({
          showCricketModal: !this.state.showCricketModal
      });
  }
  //Show Cricket Modal
  updateEditMatchToggle(data) {
      console.log("data ", data);
      this.setState({
          updateCricketModal: !this.state.updateCricketModal
      });
  }
  //Add Dialog box
  showImageToggle1(player) {
      this.setState({
          showImageModal1: !this.state.showImageModal1,
          selectedPlayer1: player
      });
      if (player && player.pid) {
          let data = {
              pid: player.pid
          }
          const config = {
              headers: {

                  Authorization: authHeader().Authorization
              }
          };
          axios
              .post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config)
              .then(response => {
                  console.log('datadatadatadata :: ', response.data.data);
                  if (response.data.code === 0) {
                      this.setState({
                          listOfPlayerImage1: response.data.data
                      });
                      console.log('this.state.listOfPlayerImage1 :: ', this.state.listOfPlayerImage1);

                  } else {
                      alert('Error to upload image');
                  }
              })
              .catch(error => {});
      }

      //this.props.dispatch(cricketActions.getPlayerImageByid(data));
  }
  selectedImage1(selectedPlayerImage) {
      console.log("selectedPlayerImage ", selectedPlayerImage);
      this.setState({
          selectedImage1: selectedPlayerImage.id,
          selectedImageDetails1: selectedPlayerImage
      });
  }
  showImageToggle2(player) {
      this.setState({
          showImageModal2: !this.state.showImageModal2,
          selectedPlayer2: player
      });
      if (player && player.pid) {
          let data = {
              pid: player.pid
          }
          const config = {
              headers: {

                  Authorization: authHeader().Authorization
              }
          };
          axios
              .post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config)
              .then(response => {
                  console.log('datadatadatadata :: ', response.data);
                  if (response.data.code === 0) {
                      this.setState({
                          listOfPlayerImage2: response.data.data
                      });
                      console.log(
                          'response.data.dataresponse.data.data ', response.data.data[0]);
                  } else {
                      alert('Error to upload image');
                  }
              })
              .catch(error => {});
      }

      //this.props.dispatch(cricketActions.getPlayerImageByid(data));
  }
  selectedImage2(selectedPlayerImage) {
      console.log("selectedPlayerImage ", selectedPlayerImage);
      this.setState({
          selectedImage2: selectedPlayerImage.id,
          selectedImageDetails2: selectedPlayerImage
      });
  }
  setNewImageOfPlayer1(player) {
      console.log("selectedImageDetails ", this.state.selectedImageDetails1);
      console.log("selectedPlayer1 ", this.state.selectedPlayer1);
      console.log("this.state.playerList1 ", this.state.playerList1);
      let {
          playerList1
      } = this.state;
      let findindex = playerList1.findIndex(x => x.pid === this.state.selectedPlayer1.pid);
      console.log("findindex ", findindex);
      playerList1[findindex].pimg = this.state.selectedImageDetails1.pimg;
      playerList1[findindex].playerimage = this.state.selectedImageDetails1.playerimage;
      this.setState({
          playerList1,
          showImageModal1: !this.state.showImageModal1
      });
  }
  setNewImageOfPlayer2(player) {
      console.log("selectedImageDetails2 ", this.state.selectedImageDetails2);
      console.log("selectedPlayer2 ", this.state.selectedPlayer2);
      console.log("this.state.playerList1 ", this.state.playerList2);
      let {
          playerList2
      } = this.state;
      let findindex = playerList2.findIndex(x => x.pid === this.state.selectedPlayer2.pid);
      console.log("findindex ", findindex);
      playerList2[findindex].pimg = this.state.selectedImageDetails2.pimg;
      playerList2[findindex].playerimage = this.state.selectedImageDetails2.playerimage;
      this.setState({
          playerList2,
          showImageModal2: !this.state.showImageModal2
      });
  }
  setPlayerType1(e) {
      console.log("player ", e.target);
      let {
          key,
          value,
          name,
          id
      } = e.target
      console.log("key ", key);
      console.log("value ", value);
      console.log("name ", name);
      console.log("id ", id);

      let {
          playerList1
      } = this.state;
      let findindex = playerList1.findIndex(x => x.pid === id);
      console.log("findindex ", findindex);
      playerList1[findindex].playertype = value;
      this.setState({
          playerList1
      });
  }
  setPlayerType2(e) {
      console.log("player ", e.target);
      let {
          key,
          value,
          name,
          id
      } = e.target
      console.log("key ", key);
      console.log("value ", value);
      console.log("name ", name);
      console.log("id ", id);

      let {
          playerList2
      } = this.state;
      let findindex = playerList2.findIndex(x => x.pid === id);
      console.log("findindex ", findindex);
      playerList2[findindex].playertype = value;
      this.setState({
          playerList2
      });
  }
  handleChangeMatchName(e) {
      var matchDetails = {
          ...this.state.matchDetails
      }
      matchDetails.matchname = e.target.value;
      this.setState({
          matchDetails
      })
  }
  render() {
    const { team ,cricket} = this.props;
    if (cricket.matchAdded) {
      return (<Redirect to={"/cricket/match"} />);
    }
    let {roleList} = team;
    this.roleData = roleList?roleList.map(person => ({ value: person.id, name: person.fullname })):[];
    var style = {
        padding: 0, 
        margin: 0 ,
        width:'20px',

    };
    return (
      <div className="animated fadeIn">
        <Row>
              <Col xl={12}>
                  <Card>
                      <CardBody>
          {this.state.matchDetails ?
             <Row>
              <Col xs="6">
                  <FormGroup>
                      <Label htmlFor="fpname">Match Name</Label>
                      <Input type="text" name="matchname" id="matchname" autoComplete="off" value={this.state.matchDetails.matchname}  onChange={this.handleChangeMatchName}  />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="fpname">MatchId</Label>
                      <Input type="text" name="matchid" id="matchid" autoComplete="off" value={this.state.matchDetails.matchid}   disabled/>
                  </FormGroup>
              </Col>
              <Col xs="6">
                  <Row>
                      <Col xs="3">Team 1 Logo</Col>
                      <Col xs="4"><img src={this.state.matchDetails.team1logourl} width="100" height="100" className="img-avatar" alt="" />
                      </Col>
                      <Col xs="3"><ImageUploader withIcon={false} buttonText="Team1 Logo" withLabel={false}  onChange={this.onDrop1} singleImage={true} maxFileSize={5242880} style={{ width: '10px', margin: "0px auto" }} fileContainerStyle={ style } /></Col>
                  </Row>
                  <Row>
                      <Col xs="3"> Team 2 Logo </Col>
                      <Col xs="4">
                          <img src={this.state.matchDetails.team2logourl} width="100" height="100" className="img-avatar" alt="" />
                      </Col>
                      <Col xs="3"><ImageUploader withIcon={false} buttonText="Team1 Logo" withLabel={false}  onChange={this.onDrop2} singleImage={true} maxFileSize={5242880} style={{ width: '10px', margin: "0px auto" }} fileContainerStyle={ style } /></Col>
                  </Row>
              </Col>
          </Row>:null}
          
          {this.state.matchDetails?<Row>
              <Col xs="5">
                  <FormGroup>
                      <Label htmlFor="pid">Select Team1</Label>
                      <Input type="text" name="matchid" id="matchid" autoComplete="off" value={this.state.matchDetails.team1} disabled />
                      <AsyncTypeahead isLoading={this.state.isLoading} placeholder="New Search Team 1 Or Same Team with new player" labelKey={option=> `${option.teamname}`} onChange={this.onChange1} onSearch={this.searchTeam} options={this.state.options} />
                 
                  </FormGroup>
                  <ListGroup>
                      {this.state.playerList1 ? this.state.playerList1.map((player, index) => (
                                      <ListGroupItem key={index}>
                                          <Row>
                                              <Col xs="2">
                                                  <img src={player.pimg} width="50" height="50" className="img-avatar" alt="" onClick={()=> this.showImageToggle1(player)} />
                                              </Col>
                                              <Col xs="4">{player.pname}</Col>
                                              <Col xs="6">
                                                  <Row>
                                                      <Col xs="6">
                                                          <Input type="text" id={player.pid} name="pts" value={this.state.playerList1[index].pts} placeholder="Points" onChange={this.onInputBoxChange1} />
                                                      </Col>
                                                      <Col xs="6">
                                                          <Input type="text" id={player.pid} name="credit" placeholder="Credit" value={this.state.playerList1[index].credit} onChange={this.onInputBoxChange1} />
                                                      </Col>
                                                      <Col xs="8" className={ "mt-top"}>
                                                          <Input type="select" name="ptype" id={this.state.playerList1[index].pid} onChange={this.setPlayerType1} value={this.state.playerList1[index].playertype}> 
                                                           {
                                                            this.roleData.map((e, key) => {
                                                              return <option key={key} value={e.value}>{e.name}</option>;
                                                              })
                                                            }
                                                          </Input>
                                                      </Col>
                                                      <Col xs="4" className={ "mt-top"}>
                                                          <Switch onChange={()=>this.onInputBoxChangeSelect1(player)} checked={ this.state.playerList1[index].playerchecked } id={player.pid} />
                                                      </Col>
                                                  </Row>
                                              </Col>
                                          </Row>
                                      </ListGroupItem>
                                      )) : null}
                  </ListGroup>
              </Col>
              <Col xs="2">V/S</Col>
              <Col xs="5">
                  <FormGroup>
                      <Label htmlFor="fpname">Select Team2</Label>
                      <Input type="text" name="matchid" id="matchid" autoComplete="off" value={this.state.matchDetails.team2} disabled />
                      <AsyncTypeahead isLoading={this.state.isLoading} placeholder="New Search Team 2 Or Same Team with new player" labelKey={option=> `${option.teamname}`} onChange={this.onChange2} onSearch={this.searchTeam} options={this.state.options} />
                  </FormGroup>
                  <ListGroup>
                      {this.state.playerList2 ? this.state.playerList2.map((player, index) => (
                                      <ListGroupItem key={index}>
                                          <Row>
                                              <Col xs="2">
                                                  <img src={player.pimg} width="50" height="50" className="img-avatar" alt="" onClick={()=> this.showImageToggle2(player)} />
                                              </Col>
                                              <Col xs="4">{player.pname}</Col>
                                              <Col xs="6">
                                                  <Row>
                                                      <Col xs="6">
                                                          <Input type="text" id={player.pid} name="pts" value={this.state.playerList2[index].pts} placeholder="Points" onChange={this.onInputBoxChange2} />
                                                      </Col>
                                                      <Col xs="6">
                                                          <Input type="text" id={player.pid} name="credit" placeholder="Credit" value={this.state.playerList2[index].credit} onChange={this.onInputBoxChange2} />
                                                      </Col>
                                                      <Col xs="8" className={ "mt-top"}>
                                                          <Input type="select" name="ptype" id={this.state.playerList2[index].pid} onChange={this.setPlayerType2} value={this.state.playerList2[index].playertype}> 
                                                           {
                                                              this.roleData.map((e, key) => {
                                                                  return <option key={key} value={e.value}>{e.name}</option>;
                                                                  })
                                                            }
                                                          </Input>
                                                      </Col>
                                                      <Col xs="4" className={ "mt-top"}>
                                                          <Switch onChange={()=>this.onInputBoxChangeSelect2(player)} checked={ this.state.playerList2[index].playerchecked } id={player.pid} />
                                                      </Col>
                                                  </Row>
                                              </Col>
                                          </Row>
                                      </ListGroupItem>
                                      )) : null}
                  </ListGroup>
              </Col>
              <Col xs="12">
                  <Row>
                      <Col xs="3"> </Col>
                      <Col xs="3"> </Col>
                      <Col xs="1">
                          <Button color="primary" onClick={()=> this.submitNewEditMatch()}> Submit
                          </Button>
                      </Col>
                      <Col xs="2">
                          <Button color="secondary"  onClick={()=> this.resetNewAddMatch()}>
                              Reset Form
                          </Button> <br/>
                      </Col>
                      <Col xs="2" />
                  </Row>
                </Col>
          </Row>
            :null}


             </CardBody>
                  </Card>
              </Col>
          </Row>
          <Modal isOpen={this.state.showImageModal1} toggle={this.showImageToggle1} className={ 'my-modal ' + this.props.className}>
              <ModalHeader toggle={this.showImageToggle1}>
                  Add Contenst
              </ModalHeader>
              <ModalBody>
                  <Row>
                      <Col xs="6">
                          <Card className="border-secondary">

                              <CardBody>
                                  <ListGroup>
                                      <Row>
                                          { this.state.listOfPlayerImage1 ? this.state.listOfPlayerImage1.map((player, index) =>
                                          <ListGroupItem key={index} onClick={()=> this.selectedImage1(player)} style={{cursor:'pointer'}} active={this.state.selectedImage1 === player.id} >
                                              <Col xs="4">
                                                  <img src={player.pimg} width="200" height="200" alt="" />
                                              </Col>
                                          </ListGroupItem>
                                          ) : null }
                                      </Row>
                                  </ListGroup>
                              </CardBody>
                          </Card>
                      </Col>
                      <Col xs="6">
                          <Card className="border-secondary">
                              <CardBody>
                                  <Row>
                                      <Col xs="12">
                                          <FormGroup>
                                              <Label htmlFor="pname">If Image is not available then upload new</Label>
                                              <ImageUploader withIcon={false} buttonText="Contest Logo" withLabel={false} withPreview={false} onChange={this.onDropNewPlayer1} maxFileSize={5242880} />
                                          </FormGroup>
                                      </Col>
                                  </Row>
                              </CardBody>
                          </Card>
                      </Col>
                  </Row>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={()=> this.setNewImageOfPlayer1()}> Submit
                  </Button>{' '}
                  <Button color="secondary" onClick={this.showImageToggle1}>
                      Cancel
                  </Button>
              </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.showImageModal2} toggle={this.showImageToggle2} className={ 'my-modal ' + this.props.className}>
              <ModalHeader toggle={this.showImageToggle2}>
                  Add Contenst
              </ModalHeader>
              <ModalBody>
                  <Row>
                      <Col xs="6">
                          <Card className="border-secondary">

                              <CardBody>
                                  <ListGroup>
                                      <Row>
                                          { this.state.listOfPlayerImage2 ? this.state.listOfPlayerImage2.map((player, index) =>
                                          <ListGroupItem key={index} onClick={()=> this.selectedImage2(player)} style={{cursor:'pointer'}} active={this.state.selectedImage2 === player.id} >
                                              <Col xs="4">
                                                  <img src={player.pimg} width="200" height="200" alt="" />
                                              </Col>
                                          </ListGroupItem>
                                          ) : null }
                                      </Row>
                                  </ListGroup>
                              </CardBody>
                          </Card>
                      </Col>
                      <Col xs="6">
                          <Card className="border-secondary">
                              <CardBody>
                                  <Row>
                                      <Col xs="12">
                                          <FormGroup>
                                              <Label htmlFor="pname">If Image is not available then upload new</Label>
                                              <ImageUploader withIcon={false} buttonText="Contest Logo" withLabel={false} withPreview={false} onChange={this.onDrop1} maxFileSize={5242880} />
                                          </FormGroup>
                                      </Col>
                                  </Row>
                              </CardBody>
                          </Card>
                      </Col>
                  </Row>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={()=> this.setNewImageOfPlayer2()}> Submit
                  </Button>{' '}
                  <Button color="secondary" onClick={this.showImageToggle2}>
                      Cancel
                  </Button>
              </ModalFooter>
          </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { cricket, authentication ,team} = state;
  const { user } = authentication;

  return {
    user,
    cricket,
    team
  };
}
export default connect(mapStateToProps)(EditMatch);