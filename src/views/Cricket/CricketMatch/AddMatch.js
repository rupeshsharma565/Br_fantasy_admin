import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Switch from 'react-switch';
import axios from 'axios';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker} from 'react-dates';
import {  Redirect } from 'react-router-dom';
import { authHeader } from '../../../_helpers';
import { CONST } from '../../../_config';
import {
  Card,
  CardBody,
  CardHeader,
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
import * as moment from 'moment';
import { connect } from 'react-redux';
import { cricketActions ,teamActions} from '../../../_actions';

class AddMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      checked: false,
      matchname:'',
      getId: 0,
      findmatch:'',
      showMatchList: false,
      isLoading: false,
      addCricketModal: false,
      showCricketModal: false,
      updateCricketModal: false,
      showImageModal1:false,
      showImageModal2:false,
      options: [],
      pictures: [],
      chkbox: true,
      optionsMatchList: [],
      matchid: '',
      startDate: null,
      calendarFocused: false,
      endDate: null,
      calendarFocused1: false,
      totalPoint: '',
      selectedMathId:0
    };
    this.resetMatch = this.resetMatch.bind(this);
    this.onChnageSearchMatch = this.onChnageSearchMatch.bind(this);
    this.searchMatchesList = this.searchMatchesList.bind(this);
    this.showMatchListToggle = this.showMatchListToggle.bind(this);
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
    this.updateAddMatchToggle = this.updateAddMatchToggle.bind(this);
    this.showAddMatchToggle = this.showAddMatchToggle.bind(this);
    this.onDrop1 = this.onDrop1.bind(this);
    this.onDrop2 = this.onDrop2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitNewAddMatch = this.submitNewAddMatch.bind(this);
    this.addAddMatchToggle = this.addAddMatchToggle.bind(this);
    this.searchMatch = this.searchMatch.bind(this);
    this.searchTeam = this.searchTeam.bind(this);
  }
  componentDidMount() {
    let gametype=1;
    this.props.dispatch(teamActions.getRoleList(gametype));
    this.props.dispatch(cricketActions.getListMatches());
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextPropsnextProps  ', nextProps.cricket.teamsList);
  
    this.setState({ options: nextProps.cricket.teamsList });
    this.setState({ optionsMatchList: nextProps.cricket.matchList });
    // if (nextProps.cricket.playerList1 ) {
    //   let result = nextProps.cricket.playerList1.map(function(el) {
    //     var o = Object.assign({}, el);
    //     o.pts = 0;
    //     o.credit = 0;
    //     o.playerchecked = false;
    //     return o;
    //   });
    //   console.log("resultresultresultresult ::::::::::::: ",result);
    //   this.setState({ playerList1: result });
    // } else {
    //   this.setState({ playerList1: [] });
    // }
    // if (nextProps.cricket.playerList2 ) {
    //   let result = nextProps.cricket.playerList2.map(function(el) {
    //     var o = Object.assign({}, el);
    //     o.pts = 0;
    //     o.credit = 0;
    //     o.playerchecked = false;
    //     return o;
    //   });
    //  console.log("resultresultresultresult ::::::::::::: ",result);
    //   this.setState({ playerList2: result });
    // } else {
    //   this.setState({ playerList2: [] });
    // }
    if (nextProps.cricket.matchAdded) {
      //this.setState({matchDetails:nextProps.cricket.matchDetails});
          this.setState({ 
            playerList1: [],
            playerList2: [],
            matchid:null,
            team1: null,
            team2: null,
            matchname: null,
            gametype: 'cricket',
            mstarted: null,
            mdate: null,
            mtype: null,
            mdategmt: null
          });
          
    } 
    if (nextProps.cricket.matchDetails) {
      this.setState({matchDetails:nextProps.cricket.matchDetails});
    } 
    // if (nextProps.cricket.listOfPlayerImage) {
    //   this.setState({listOfPlayerImage:nextProps.cricket.listOfPlayerImage});
    // } 
  }
  //Add Dialog box showCricketModal: !this.state.showCricketModal
  addAddMatchToggle() {
    this.setState({
      addCricketModal: !this.state.addCricketModal
    });
  }
  showMatchListToggle() {
    this.setState({
      showMatchList: !this.state.showMatchList
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
    let player = { ...playerList1[index] };
    if (e.target.name === 'playerchecked') {
      player[e.target.name] = !player.playerchecked;
    } else {
      player[e.target.name] = e.target.value;
    }
    playerList1[index] = player;
    this.setState({ playerList1: playerList1 });
  }
  onInputBoxChangeSelect1 = player => {
   // console.log("playerplayer  ",player);
    
    var index = this.state.playerList1.findIndex(x => x.pid === player.pid);
    let playerList1 = [...this.state.playerList1];
    let player1 = { ...playerList1[index] };
    player1['playerchecked'] = !player.playerchecked;
    playerList1[index] = player1;
    this.setState({ playerList1: playerList1 });
  }
  onInputBoxChangeSelect2 = player => {
   // console.log("playerplayer  ",player);
    
    var index = this.state.playerList2.findIndex(x => x.pid === player.pid);
    let playerList2 = [...this.state.playerList2];
    let player1 = { ...playerList2[index] };
    player1['playerchecked'] = !player.playerchecked;
    playerList2[index] = player1;
    this.setState({ playerList2: playerList2 });
  }
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
  //Update checkbox to  select player
  handleChange(e) {
    console.log('e  ', e.target.name);
    console.log('e  ', e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  //Now submit new cricket match asdf
  submitNewAddMatch() {
      let data={};
      let players =[];
      if (this.state.playerList1) {
          this.state.playerList1.map((player,index) => {
            if (player.playerchecked) {
                players.push({"pid":player.pid,playerimg:player.playerimage,"pts":player.pts,"ptype":player.playertype,"credit":player.credit,"teamname":this.state.teamname1, "teamid":this.state.teamid1})     
                
            }
            return data;   
        })
      }else{
         toast("Please select team1");
      }
      if (this.state.playerList2) {
         this.state.playerList2.map((player,index) => {
         if (player.playerchecked) {
            players.push({"pid":player.pid,playerimg:player.playerimage,"pts":player.pts,"ptype":player.playertype,"credit":player.credit,"teamname":this.state.teamname2, "teamid":this.state.teamid2})         
            }
            return data;  
        })
      } else {
         toast("Please select team2");
      }
      if (!this.state.teamLogo1 || !this.state.teamname2) {
          toast("Please select team logo");
      }
      if (this.state.matchid) {
          console.log("playersplayersplayers   ",players);
          data["players"]= players;
          data["matchid"]= this.state.matchid;
          data["matchname"]=this.state.matchname;
          data["team1"]= this.state.teamname1;
          data["team2"]= this.state.teamname2;
          data["gametype"]= this.state.gametype;
          data["totalpoints"]= this.state.totalPoint;
          data["team1logo"]= this.state.teamLogo1;
          data["team2logo"]= this.state.teamLogo2;
          data["mtype"]=this.state.mtype;
          data["mstarted"]=this.state.mstarted;
          data["mdate"]=this.state.mdate;
          data["mdategmt"]=this.state.mdategmt;
          data["gametype"]='cricket';
          data["gameid"]=1;
          console.log("datadata  datadatadata---------->>>>",data);
          this.props.dispatch(cricketActions.addCricketMatch(data));
      }else{
          toast("Please select match");
      }
  }
  //Upload team logo
  onDrop1(picture) {
    console.log("picture  ",picture);
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
            //alert("The file is successfully uploaded");
            console.log('response  data ', response.data);
            if (response.data.code === 0) {
               picture=[];
              this.setState({ teamLogo1: response.data.data[0] });
              console.log('response.',response.data.data);
            } else {
               picture=[];
              this.setState({ teamLogo1: '' });
                toast(response.data.msg);
              //alert('Error to upload image');
            }
          })
          .catch(error => {});
        // this.setState({
        //   pictures: this.state.pictures.concat(picture)
        // });
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
        //alert("The file is successfully uploaded");
        console.log('response  data ', response.data);
        if (response.data.code === 0) {
          this.setState({ teamLogo2: response.data.data[0] });
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
              console.log('addplayerimgaddplayerimgaddplayerimg  data ', response.data);
              console.log('response.',response.data.data);
                let data={
                   pid: this.state.selectedPlayer1.pid
                }
                 const config1 = {
                  headers: {
                    'content-type': 'application/json',
                    Authorization: authHeader().Authorization
                  }
                };
                console.log("::::::::::::::::::::::::::::::::::::::: ",data);
                
                 axios
                    .post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1)
                    .then(response => {
                      console.log('datadatadatadata  :: ', response.data.data);
                      if (response.data.code === 0) {
                        this.setState({ listOfPlayerImage1: response.data.data });
                        console.log('this.state.listOfPlayerImage1  :: ', this.state.listOfPlayerImage1);
                        
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
        //   pictures: this.state.pictures.concat(picture)
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
              console.log('addplayerimgaddplayerimgaddplayerimg  data ', response.data);
              console.log('response.',response.data.data);
                let data={
                   pid: this.state.selectedPlayer2.pid
                }
                 const config1 = {
                  headers: {
                    'content-type': 'application/json',
                    Authorization: authHeader().Authorization
                  }
                };
                console.log("::::::::::::::::::::::::::::::::::::::: ",data);
                
                 axios
                    .post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1)
                    .then(response => {
                      console.log('datadatadatadata  :: ', response.data.data);
                      if (response.data.code === 0) {
                        this.setState({ listOfPlayerImage2: response.data.data });
                        console.log('this.state.listOfPlayerImage2  :: ', this.state.listOfPlayerImage2);
                        
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
  showAddMatchToggle(data) {
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
  updateAddMatchToggle(data) {
    console.log("data  ",data);
    this.setState({
      updateCricketModal: !this.state.updateCricketModal
    });
  }
  //Add Dialog box
  showImageToggle1(player) {
    this.setState({
      showImageModal1: !this.state.showImageModal1,
      selectedPlayer1:player
    });
    if (player && player.pid) {
      let data={
      pid:player.pid
    }
    const config = {
      headers: {

        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config)
      .then(response => {
        console.log('datadatadatadata  :: ', response.data.data);
        if (response.data.code === 0) {
          this.setState({ listOfPlayerImage1: response.data.data });
          console.log('this.state.listOfPlayerImage1  :: ', this.state.listOfPlayerImage1);
          
        } else {
          alert('Error to upload image');
        }
      })
      .catch(error => {});
    }
    
    //this.props.dispatch(cricketActions.getPlayerImageByid(data));
  }
  selectedImage1(selectedPlayerImage) {
    console.log("selectedPlayerImage  ",selectedPlayerImage);
    this.setState({
      selectedImage1: selectedPlayerImage.id,
      selectedImageDetails1:selectedPlayerImage
    });      
  }
  showImageToggle2(player) {
    this.setState({
      showImageModal2: !this.state.showImageModal2,
      selectedPlayer2:player
    });
    if (player && player.pid) {
      let data={
      pid:player.pid
    }
    const config = {
      headers: {

        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config)
      .then(response => {
        console.log('datadatadatadata  :: ', response.data);
        if (response.data.code === 0) {
          this.setState({ listOfPlayerImage2: response.data.data });
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
    console.log("selectedPlayerImage  ",selectedPlayerImage);
    this.setState({
      selectedImage2: selectedPlayerImage.id,
      selectedImageDetails2:selectedPlayerImage
    });      
  }
  setNewImageOfPlayer1(player) {
    console.log("selectedImageDetails  ",this.state.selectedImageDetails1);
    console.log("selectedPlayer1  ",this.state.selectedPlayer1);
    console.log("this.state.playerList1  ",this.state.playerList1);
    let {playerList1}=this.state;
    let findindex=playerList1.findIndex(x => x.pid === this.state.selectedPlayer1.pid);
    console.log("findindex  ",findindex);
    playerList1[findindex].pimg=this.state.selectedImageDetails1.pimg;
    playerList1[findindex].playerimage=this.state.selectedImageDetails1.playerimage;
     this.setState({
        playerList1,
        showImageModal1: !this.state.showImageModal1
    });
  }
  setNewImageOfPlayer2(player) {
    console.log("selectedImageDetails2  ",this.state.selectedImageDetails2);
    console.log("selectedPlayer2  ",this.state.selectedPlayer2);
    console.log("this.state.playerList1  ",this.state.playerList2);
    let {playerList2}=this.state;
    let findindex=playerList2.findIndex(x => x.pid === this.state.selectedPlayer2.pid);
    console.log("findindex  ",findindex);
    playerList2[findindex].pimg=this.state.selectedImageDetails2.pimg;
    playerList2[findindex].playerimage=this.state.selectedImageDetails2.playerimage;
     this.setState({
        playerList2,
        showImageModal2: !this.state.showImageModal2
    });
  }
  setPlayerType1(e) {
    console.log("player  ",e.target);
    let {key,value,name,id}=e.target
    console.log("key ",key);
    console.log("value ",value);
    console.log("name ",name);
    console.log("id ",id);

    let {playerList1}=this.state;
    let findindex=playerList1.findIndex(x => x.pid === id);
    console.log("findindex  ",findindex);
    playerList1[findindex].playertype=value;
     this.setState({
        playerList1
    });
  }
  setPlayerType2(e) {
    console.log("player  ",e.target);
    let {key,value,name,id}=e.target
    console.log("key ",key);
    console.log("value ",value);
    console.log("name ",name);
    console.log("id ",id);

    let {playerList2}=this.state;
    let findindex=playerList2.findIndex(x => x.pid === id);
    console.log("findindex  ",findindex);
    playerList2[findindex].playertype=value;
     this.setState({
        playerList2
    });
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
  }
  resetNewAddMatch() {
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
      playerList1:[],
      playerList2:[],
      teamLogo1:'',
      teamLogo2:'',
    });
  }
  searchMatchesList() {
    if (this.state.startDate && !this.state.endDate) {
      let data={
       'search': this.state.findmatch,
       'date1': moment(this.state.startDate).format('DD-MM-YYYY'),
       'date2': moment(this.state.startDate).format('DD-MM-YYYY')
      }
      console.log("single date ::: ",data);
        const config = {
          headers: {
            Authorization: authHeader().Authorization
          }
        };
        axios
          .post(CONST.BACKEND_URL + `/api/getmastertblmatchupcomming`,data,  config)
          .then(response => {
            //console.log('datadatadatadata  :: ', response.data.data);
            if (response.data.code === 0) {
              this.setState({ 
                listOfMatches: response.data.data.list,
                listOfMatchesTotal: response.data.data.total 
              });
              console.log('this.state.listOfMatches  :: ', this.state.listOfMatches);
            } else {
               this.setState({ listOfMatches: []});
            }
          })
          .catch(error => {});
    }else  if (this.state.startDate && this.state.endDate) {
      let data={
        'search': this.state.findmatch,
        'date1':  moment(this.state.startDate).format('DD-MM-YYYY'),
        'date2':  moment(this.state.endDate).format('DD-MM-YYYY')
      }
      const config = {
          headers: {
            Authorization: authHeader().Authorization
          }
        };
        axios
          .post(CONST.BACKEND_URL + `/api/getmastertblmatchupcomming`,data,  config)
          .then(response => {
            //console.log('datadatadatadata  :: ', response.data.data);
            if (response.data.code === 0) {
              this.setState({                 
                    listOfMatches: response.data.data.list,
                    listOfMatchesTotal: response.data.data.total 
                 });
              console.log('this.state.listOfMatches  :: ', this.state.listOfMatches);
            } else {
               this.setState({ listOfMatches: []});
            }
          })
          .catch(error => {});
      console.log("both ",data);
    }
    else{
      let data={
        'search': this.state.findmatch,
      }
      const config = {
          headers: {
            Authorization: authHeader().Authorization
          }
        };
        axios
          .post(CONST.BACKEND_URL + `/api/getmastertblmatchupcomming`,data,  config)
          .then(response => {
            //console.log('datadatadatadata  :: ', response.data.data);
            if (response.data.code === 0) {
              this.setState({ 
                    listOfMatches: response.data.data.list,
                    listOfMatchesTotal: response.data.data.total 
              });
              console.log('this.state.listOfMatches  :: ', this.state.listOfMatches);
            } else {
               this.setState({ listOfMatches: []});
            }
          })
          .catch(error => {});
      console.log("Please select date");
    }
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
  onChnageSearchMatch = (e) => {
    let {name,value}=e.target;
    console.log(name);
    console.log(value);
    this.setState(() => ({findmatch: value }));
  };
  selectedMatch(match) {
    console.log(match);
    
    this.setState({
    //  selectedMatchdateTimeGMT:match.dateTimeGMT,
    //  selectedMathName:match.unique_id,
        selectedMathId:match.unique_id,
        matchid: match.unique_id,
        team1: match.team1,
        team2: match.team2,
        matchname: match.team1 + ' V/S ' + match.team2,
        gametype: 'cricket',
        mstarted: match.matchStarted === 'false' ? 0 : 1,
        mdate: match.mdate,
        mtype: match.mtype,
        mdategmt: match.dateTimeGMT
    });
  }
  render() {
    const { team ,cricket} = this.props;
    if (cricket.matchAdded) {
      return (<Redirect to={"/cricket/match"} />);
    }
    var style = {
        padding: 0, 
        margin: 0 ,
        width:'20px',

    };
    let {roleList} = team;
    this.roleData = roleList?roleList.map(person => ({ value: person.id, name: person.fullname })):[];
    return (
      <div className="animated fadeIn">
          <Row>
              <Col xl={12}>
                  <Card>
                      <CardHeader>
                          <FormGroup row>
                              <Col xl="6">
                                  <i className="fa fa-align-justify" />{' '}
                                  <strong>New Match</strong>
                              </Col>
                              <Col xl="4" />
                              <Col xl="2">
                                <Button color="success" onClick={()=> this.showMatchListToggle()}> Find Match
                                </Button>
                              </Col>
                          </FormGroup>
                      </CardHeader>
                      <CardBody>
                          <Row>
                              <Col xs="6">
                                 <FormGroup>
                                      <Label htmlFor="fpname">Match Name</Label>
                                      <Input type="text" name="matchid" id="matchid" autoComplete="off" value={this.state.matchname} disabled />
                                  </FormGroup>
                                  <FormGroup>
                                      <Label htmlFor="fpname">MatchId</Label>
                                      <Input type="text" name="matchid" id="matchid" autoComplete="off" value={this.state.matchid} disabled />
                                  </FormGroup>
                              </Col>
                              <Col xs="6">
                                <Row>
                                  <Col xs="6"><ImageUploader withIcon={false} buttonText="Team1 Logo" withLabel={false}  onChange={this.onDrop1} singleImage={true} maxFileSize={5242880} style={{ width: '10px', margin: "0px auto" }} fileContainerStyle={ style } />{this.state.teamLogo1}</Col>
                                  <Col xs="6"><ImageUploader withIcon={false} buttonText="Team2 Logo" withLabel={false}  onChange={this.onDrop2} singleImage={true} maxFileSize={5242880} style={{ width: '10px', margin: "0px auto" }} fileContainerStyle={ style } />{this.state.teamLogo2}</Col>
                                </Row>
                              </Col>
                          </Row>
                          <Row>
                              <Col xs="6">
                                  <FormGroup>
                                      <Label htmlFor="pid">Select Team1</Label>
                                      <AsyncTypeahead isLoading={this.state.isLoading} labelKey={option=> `${option.teamname}`} onChange={this.onChange1} onSearch={this.searchTeam} options={this.state.options} />
                                  </FormGroup>
                                  <ListGroup>
                                      <ListGroupItem key={-1}>
                                         <Row>
                                              
                                              <Col xs="2">
                                                  Image
                                              </Col>
                                              <Col xs="3">
                                                  <Label htmlFor="fpname">Name</Label>
                                              </Col>
                                              <Col xs="2"/>

                                              <Col xs="3">
                                                  <Label htmlFor="fpname">Points</Label>
                                              </Col>
                                              <Col xs="2">
                                                  <Label htmlFor="fpname">Credit</Label>
                                              </Col>
                                          </Row>
                                      </ListGroupItem>
                                      {
                                        this.state.playerList1 ? this.state.playerList1.map((player, index) => (
                                          <ListGroupItem key={index}>
                                              <Row>
                                                  <Col xs="2">
                                                      <img src={player.pimg} width="50" height="50" className="img-avatar" alt="" onClick={()=> this.showImageToggle1(player)} />
                                                  </Col>
                                                  <Col xs="4">{player.fullname}</Col>
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
                              <Col xs="6">
                                  <FormGroup>
                                      <Label htmlFor="fpname">Select Team2</Label>
                                      <AsyncTypeahead isLoading={this.state.isLoading} labelKey={option=> `${option.teamname}`} onChange={this.onChange2} onSearch={this.searchTeam} options={this.state.options} />
                                  </FormGroup>
                                  <ListGroup>
                                      <ListGroupItem key={-1}>
                                          <Row>
                                              
                                              <Col xs="2">
                                                  Image
                                              </Col>
                                              <Col xs="3">
                                                  <Label htmlFor="fpname">Name</Label>
                                              </Col>
                                              <Col xs="2"/>

                                              <Col xs="3">
                                                  <Label htmlFor="fpname">Points</Label>
                                              </Col>
                                              <Col xs="2">
                                                  <Label htmlFor="fpname">Credit</Label>
                                              </Col>
                                          </Row>
                                      </ListGroupItem>
                                      {this.state.playerList2 ? this.state.playerList2.map((player, index) => (
                                      <ListGroupItem key={index}>
                                          <Row>
                                              <Col xs="2">
                                                  <img src={player.pimg} width="50" height="50" className="img-avatar" alt="" onClick={()=> this.showImageToggle2(player)} />
                                              </Col>
                                              <Col xs="4">{player.fullname}</Col>
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
                          </Row>
                          <Row>
                              <Col xs="3"> </Col>
                              <Col xs="3"> </Col>
                              <Col xs="1">
                                  <Button color="primary" onClick={()=> this.submitNewAddMatch()}> Submit
                                  </Button>
                              </Col>
                              <Col xs="2">
                                  <Button color="secondary"  onClick={()=> this.resetNewAddMatch()}>
                                      Reset Form
                                  </Button>
                              </Col>
                              <Col xs="2" />
                          </Row>
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
                                              <ImageUploader withIcon={false} buttonText="Contest Logo" withLabel={false} withPreview={false} onChange={this.onDropNewPlayer2} maxFileSize={5242880} />
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
          <Modal isOpen={this.state.showMatchList} toggle={this.showMatchListToggle} className={ 'my-modal ' + this.props.className}>
              <ModalHeader toggle={this.showMatchListToggle}>
                  <Row>
                      <Col xs="2">
                        Start Date 
                      </Col>
                      <Col xs="2">
                             <SingleDatePicker
                                date={this.state.startDate} 
                                onDateChange={this.onDateChange}
                                focused={this.state.calendarFocused} 
                                onFocusChange={this.onFocusChange} 
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                                displayFormat="DD/MM/YYYY"
                            />
                      </Col>
                       <Col xs="2">
                       End Date 
                      </Col>
                      <Col xs="2">
                             <SingleDatePicker
                                date={this.state.endDate} 
                                onDateChange={this.onDateChange1}
                                focused={this.state.calendarFocused1} 
                                onFocusChange={this.onFocusChange1} 
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                                displayFormat="DD/MM/YYYY"
                            />
                      </Col>
                      <Col xs="2">
                          <Input type="text" placeholder="Search Match" name="findmatch" id="findmatch" autoComplete="off" value={this.state.findmatch} onChange={this.onChnageSearchMatch} />                            
                      </Col>
                      <Col xs="1">
                        <Button color="success" onClick={()=> this.searchMatchesList()}> Find
                        </Button>
                      </Col>
                      <Col xs="1">
                        <Button color="info" onClick={()=> this.resetMatch()}> Reset
                        </Button>
                      </Col>
                  </Row>
              </ModalHeader>
              <ModalBody>
              <ListGroup id="list-tab" role="tablist">
                  {
                    this.state.listOfMatches
                      ? this.state.listOfMatches.map((matchs, index) => (
                        <ListGroupItem key={index}  style={{cursor:'pointer'}}  onClick={() => this.selectedMatch(matchs)} active={this.state.selectedMathId === matchs.unique_id} >
                          <Row>
                              <Col xs="1">
                              <Label htmlFor="lkjlk">{index + 1}</Label>
                              </Col>
                              <Col xs="1">
                              <Label htmlFor="lkjlk">{matchs.unique_id}</Label>
                              </Col>
                              <Col xs="3">
                              <Label htmlFor="lkjlk">{matchs.dateTimeGMT}</Label>
                              </Col>
                              <Col xs="2">
                              <Label htmlFor="lkjlk">{matchs.team1}</Label>
                              </Col>
                              <Col xs="2">
                              <Label htmlFor="lkjlk">{matchs.team2}</Label>
                              </Col>
                              <Col xs="2">
                              <Label htmlFor="lkjlk">{matchs.mtype}</Label>
                              </Col>
                              <Col xs="1">
                                <Button color="info" onClick={this.showMatchListToggle}> Select
                                </Button>
                              </Col>
                          </Row>
                          </ListGroupItem>
                        ))
                      : null
                  }
                   </ListGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={()=> this.setNewImageOfPlayer2()}> Submit
                  </Button>{' '}
                  <Button color="secondary" onClick={this.showMatchListToggle}>
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
export default connect(mapStateToProps)(AddMatch);