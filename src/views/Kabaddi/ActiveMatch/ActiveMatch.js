import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import React, { Component } from 'react';
import axios from 'axios';
import { authHeader } from '../../../_helpers';
import { CONST } from '../../../_config';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
  Label,
  Input,
  Badge,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

} from 'reactstrap';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';
import { connect } from 'react-redux';
import * as moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

class KabaddiMatch extends Component {

  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.submitNewAddMatch = this.submitNewAddMatch.bind(this);
    this.getTeam1List = this.getTeam1List.bind(this);
    this.getTeam2List = this.getTeam2List.bind(this);
    this.onDrop1 = this.onDrop1.bind(this);
    this.onDrop2 = this.onDrop2.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange1 = this.onDateChange1.bind(this);
    this.onFocusChange1 = this.onFocusChange1.bind(this);
    this.searchTeam = this.searchTeam.bind(this);
    this.searchMatchesList = this.searchMatchesList.bind(this);
    this.showImageToggle1 = this.showImageToggle1.bind(this);
    this.selectedImage1 = this.selectedImage1.bind(this);
    this.showImageToggle2 = this.showImageToggle2.bind(this);
    this.selectedImage2 = this.selectedImage2.bind(this);
    this.setNewImageOfPlayer1 = this.setNewImageOfPlayer1.bind(this);
    this.setNewImageOfPlayer2 = this.setNewImageOfPlayer2.bind(this);
    this.onDropNewPlayer1 = this.onDropNewPlayer1.bind(this);
    this.onDropNewPlayer2 = this.onDropNewPlayer2.bind(this);
    this.setPlayerType1 = this.setPlayerType1.bind(this);
    this.setPlayerType2 = this.setPlayerType2.bind(this);
    this.onDrop1Update = this.onDrop1Update.bind(this);
    this.onDrop2Update = this.onDrop2Update.bind(this);
    this.onChangePlaying1 = this.onChangePlaying1.bind(this);
    this.onChangePlaying2 = this.onChangePlaying2.bind(this);
    this.getValuePlayerType = this.getValuePlayerType.bind(this);
    this.state = {
      collapse: false,
      accordion: [false, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      updateMachToggle: false,
      timeout: 300,
      openAccordianID: "",
      playerList1: [],
      playerList2: [],
      allPlayerList: {},
      teamname1: "",
      teamname2: "",
      showImageModal1: false,
      allplayerdetails:{},
      status_overview:"",
      seriesid:"",
      seriesname:"",
      gameid:0
    };
    this.onInputBoxChange1Update = this.onInputBoxChange1Update.bind(this);
    this.onInputBoxChange2Update = this.onInputBoxChange2Update.bind(this);
    this.setPlayerType1Update = this.setPlayerType1Update.bind(this);
    this.setPlayerType2Update = this.setPlayerType2Update.bind(this);
    this.onInputBoxChangeSelect1Update = this.onInputBoxChangeSelect1Update.bind(this);
    this.onInputBoxChangeSelect2Update = this.onInputBoxChangeSelect2Update.bind(this);
    this.submitUpdatedMatch = this.submitUpdatedMatch.bind(this);
    this.showImageToggle1Update = this.showImageToggle1Update.bind(this);
    this.selectedImage1Update = this.selectedImage1Update.bind(this);
    this.showImageToggle2Update = this.showImageToggle2Update.bind(this);
    this.selectedImage2Update = this.selectedImage2Update.bind(this);
    this.setNewImageOfPlayer1Update = this.setNewImageOfPlayer1Update.bind(this);
    this.setNewImageOfPlayer2Update = this.setNewImageOfPlayer2Update.bind(this);
    this.onDropNewPlayer1Update = this.onDropNewPlayer1Update.bind(this);
    this.onDropNewPlayer2Update = this.onDropNewPlayer2Update.bind(this);
    this.getTeam1ListUpdate = this.getTeam1ListUpdate.bind(this);
    this.getTeam2ListUpdate = this.getTeam2ListUpdate.bind(this);
    this.onInputBoxChange1=this.onInputBoxChange1.bind(this);
    this.onInputBoxChange2=this.onInputBoxChange2.bind(this);
    this.converPlayerType=this.converPlayerType.bind(this);

  }
  componentDidMount() {
    const formthis= this;
    let gameid=0;
    if(this.props.location.pathname==="/kabaddi/activematch"){
      gameid=3;
    }
    this.setState({gameid:gameid},()=>{

    const config1 = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };
    formthis.setState({loading:true});
    axios.get(CONST.BACKEND_URL + "/getplayertypeadmin/"+gameid, null, config1).then(response => {
      formthis.setState({loading:false});
      if (response.data.code === 0) {
        let roleData = response.data.data ? response.data.data.map(person => ({
          value: person.id,
          name: person.fullname
        })) : [];
        this.setState({
          roleData
        });
      }
      else {
        this.setState({
          activeMatchList: []
        });
        toast(response.data.msg);
      }
    }).catch(error => { });
    this.getActiveMatchList();
  })
  }
  componentWillReceiveProps(nextProps) { }


  getValuePlayerType(playertypedetail) {
    let playertype = 5;
    
        if (playertypedetail==="defender_right_cover" || playertypedetail==="defender_left_cover" || playertypedetail==="defender") {
           playertype = 5;
        } else if (playertypedetail==="raider") {
           playertype = 6;
        }
        else if (playertypedetail==="all_rounder") {
           playertype = 7;
        }
        return playertype;
  }


  converPlayerType(platertype){
    //let playertypedetail={};
    if(platertype)
    {
      if(platertype===5){
          // playertypedetail["keeper"]=true;
          //  playertypedetail["batsman"]=false;
          // playertypedetail["bowler"]=false;
          return "defender";
      }
      else if(platertype===6){
        // playertypedetail["batsman"]=true;
        
        // playertypedetail["keeper"]=false;
        // playertypedetail["bowler"]=false;
        return "raider";

      }else if(platertype===7){
          // playertypedetail["batsman"]=true;
          // playertypedetail["bowler"]=true;
          // playertypedetail["keeper"]=false;
          return "all_rounder";
      }
      else
      {
        // playertypedetail["batsman"]=false;
        // playertypedetail["bowler"]=true;
        // playertypedetail["keeper"]=false;
        return "defender";
      }
       
    }
    
  }


  toggleAccordionNew(matchDetails) {

    let formthis = this;
    this.setState({
      playerList1: [],
      playerList2: [],
      teamLogo1: '',
      teamLogo2: '',
    },()=>{
    let matchid = matchDetails.unique_id;
    if (formthis.state.openAccordianID === matchDetails.unique_id) {
      formthis.setState({
        openAccordianID: "",
      })
    }else
    if (matchDetails.isactive === "1" && matchDetails.iscreated === "1") {
      let reqdata = {
        matchid: matchDetails.unique_id
      }
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      formthis.setState({loading:true});
      axios.post(CONST.BACKEND_URL + `/api/getmatchedit`, reqdata, config).then(response => {
        formthis.setState({loading:false});
        if (response.data.code === 0) {
          let updatePlayerlist1 = response.data.data.players.filter(player => player.teamname === response.data.data.team1);
          let updatePlayerlist2 = response.data.data.players.filter(player => player.teamname === response.data.data.team2);
          let result1 = updatePlayerlist1.map(function (el) {
            var o = Object.assign({}, el);
            o.playerchecked = true;
            return o;
          });
          let result2 = updatePlayerlist2.map(function (el) {
            var o = Object.assign({}, el);
            o.playerchecked = true;
            return o;
          });
          let seriesid=response.data.data.seriesid;
          let seriesname=response.data.data.seriesname;
          formthis.setState({
            updatematchDetails: response.data.data,
            updatePlayerList1: result1,
            updateteam1logo: response.data.data.team1logoname,
            updateteam2logo: response.data.data.team2logoname,
            updateteam1logoURL: response.data.data.team1logourl,
            updateteam2logoURL: response.data.data.team2logourl,
            updatePlayerList2: result2,
            openAccordianID: matchDetails.unique_id,
            selectedMatchDetails: matchDetails,
            seriesid:seriesid,
            seriesname:seriesname
          });
        }
        else {
          formthis.setState({
            matchDetails: {},
            playerList1: [],
            playerList2: [],
          });
          toast(response.data.msg);

        }
      }).catch(error => { });
    }
    else
    {        
        const config = {
          headers: {
            Authorization: authHeader().Authorization
          }
        };
        
        let matchurl="";
        if(formthis.props.location.pathname==="/kabaddi/activematch"){
          matchurl=CONST.BACKEND_URL + "/ucmatch/3/" + matchid;
        }
        formthis.setState({loading:true});
        axios.get(matchurl, config).then(response => {
        formthis.setState({loading:false});
          if (response.data) {
                let teamA = response.data.match.teams.a.match.players;
                let teamB = response.data.match.teams.b.match.players;
                let teamC = teamA.concat(teamB);
                let seriesid=response.data.match.season.key;
                let seriesname=response.data.match.season.name;
                
                formthis.getplayerdetails(matchid, teamC, 3,seriesid);
                formthis.setState({
                  allPlayerList: response.data.match.players,
                  playerList1: response.data.match.teams.a,
                  playerList2: response.data.match.teams.b,
                  openAccordianID: matchDetails.unique_id,
                  teamname1: response.data.match.teams.a.name,
                  teamname2: response.data.match.teams.b.name,
                  selectedMatchDetails: matchDetails,
                  status_overview:response.data.match.status_overview,
                  seriesid:seriesid,
                  seriesname:seriesname
                  //updatematchDetails: response.data.data,
                  //updatePlayerList1: result1,
                  //updateteam1logo: response.data.data.team1logoname,
                  //updateteam2logo: response.data.data.team2logoname,
                  //updateteam1logoURL: response.data.data.team1logourl,
                  //updateteam2logoURL: response.data.data.team2logourl
                  //updatePlayerList2: result2,
                }, () => {
                  
                });
            
          }
          else {
            formthis.setState({
              matchDetails: {},
              playerList1: [],
              playerList2: [],
            });
            toast(response.data.msg);
  
          }
        }).catch(error => { });
      
    }
  });
  }

  getplayerdetails(matchid, players, gameid,seriesid) {
    const formthis= this;
    const formData = new FormData();
    formData.append('matchid', matchid);
    formData.append('players', players);
    formData.append('gameid', gameid);
    formData.append('seriesid', seriesid);
    const config = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };
    formthis.setState({loading:true});
    axios.post(CONST.BACKEND_URL + `/api/matchplayerdetails`, formData, config).then(response => {
      formthis.setState({loading:false});
      if (response.data) {
        console.log("response.data-------->>>",response.data);
        this.setState({
          allplayerdetails: response.data
        });
      }
      else {
        this.setState({
          matchDetails: {},
          playerList1: [],
          playerList2: [],
        });
        toast(response.data.msg);

      }
    }).catch(error => { });
  }

  toggleAccordion(matchDetails) {
    const formthis = this;
    if (matchDetails.isOpenAccordian) {
      let index = this.state.activeMatchList.findIndex(x => x.unique_id === matchDetails.unique_id);
      let activeMatchList = [...this.state.activeMatchList];
      let match = {
        ...activeMatchList[index]
      };
      match["isOpenAccordian"] = !match.isOpenAccordian;
      activeMatchList[index] = match;
      this.setState({
        activeMatchList,
        updateMachToggle: false,
        selectedMatchDetails: matchDetails,
        playerList1: [],
        playerList2: [],
        teamLogo1: '',
        teamLogo2: '',
      });
    }
    else {
      let result = this.state.activeMatchList.map(function (el) {
        var o = Object.assign({}, el);
        o.isOpenAccordian = false;
        return o;
      });
      let index = result.findIndex(x => x.unique_id === matchDetails.unique_id);
      let activeMatchList = [...result];
      let match = {
        ...activeMatchList[index]
      };
      match["isOpenAccordian"] = !match.isOpenAccordian;
      activeMatchList[index] = match;
      this.setState({
        activeMatchList,
        updateMachToggle: false,
        selectedMatchDetails: matchDetails,
        playerList1: [],
        playerList2: []
      });

      if (matchDetails.isactive === "1" && matchDetails.iscreated === "1") {
      let reqdata = {
          matchid: matchDetails.unique_id
        }
        const config = {
          headers: {
            Authorization: authHeader().Authorization
          }
        };
        formthis.setState({loading:true});
        axios.post(CONST.BACKEND_URL + `/api/getmatchedit`, reqdata, config).then(response => {
          formthis.setState({loading:false});
          if (response.data.code === 0) {
            let updatePlayerlist1 = response.data.data.players.filter(player => player.teamname === response.data.data.team1);
            let updatePlayerlist2 = response.data.data.players.filter(player => player.teamname === response.data.data.team2);
            let result1 = updatePlayerlist1.map(function (el) {
              var o = Object.assign({}, el);
              o.playerchecked = true;
              return o;
            });
            let result2 = updatePlayerlist2.map(function (el) {
              var o = Object.assign({}, el);
              o.playerchecked = true;
              return o;
            });
            this.setState({
              updatematchDetails: response.data.data,
              updatePlayerList1: result1,
              updateteam1logo: response.data.data.team1logoname,
              updateteam2logo: response.data.data.team2logoname,
              updateteam1logoURL: response.data.data.team1logourl,
              updateteam2logoURL: response.data.data.team2logourl,
              updatePlayerList2: result2,
            });
          }
          else {
            this.setState({
              matchDetails: {},
              playerList1: [],
              playerList2: [],
            });
            toast(response.data.msg);

          }
        }).catch(error => { });
      }
    }
  }
  getActiveMatchList = (value) => {
    let formthis= this;
    const config = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };
    let data = {
      search: '',
      page: '',
      limit: '',
      date1: '',
      date2: '',
      gameid:this.state.gameid
    };
    formthis.setState({loading:true});
    axios.post(CONST.BACKEND_URL + `/api/getactivematch`, data, config).then(response => {
      formthis.setState({loading:false});
      if (response.data.code === 0) {
        let result = response.data.data.list.map(function (el, index) {
          var o = Object.assign({}, el);
          o.isOpenAccordian = false;
          return o;
        });
        this.setState({
          activeMatchList: result,
          activeMatchListtotal: response.data.data.total
        });
      }
      else {
        this.setState({
          activeMatchList: []
        });
        toast(response.data.msg);

      }
    }).catch(error => { });
  }
  getTeam1List = value => {
    const formthis = this;
    if (value[0] && value[0].id === this.state.teamid2) {
      toast("Team already selected.");
    }
    else if (value[0]) {
    let data = {
        teamid: value[0].id
      };
      this.setState({
        teamname1: value[0].shortname,//.teamname,//Raman
        teamid1: value[0].id
      });
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      formthis.setState({loading:true});
      axios.post(CONST.BACKEND_URL + `/api/listplayerbyteam`, data, config).then(response => {
       formthis.setState({loading:false});
        if (response.data.code === 0) {
          let result = response.data.data.map(function (el) {
            var o = Object.assign({}, el);
            //o.pts = 8;
            o.isplaying = "-1";
            //o.credit = 8;
            o.playerchecked = true;
            return o;
          });
          
          this.setState({
            playerList1: result
          });
        }
        else {
          this.setState({
            playerList1: []
          });
          toast(response.data.msg);

        }
      }).catch(error => { });
      
    }
  }
  getTeam2List = value => {
    const formthis = this;
    if (value[0] && value[0].id === this.state.teamid2) {
      toast("Team already selected.");
    }
    else if (value[0]) {
      let data = {
        teamid: value[0].id
      };
      this.setState({
        teamname2: value[0].shortname,//Raman
        teamid2: value[0].id
      });
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      formthis.setState({loading:true});
      axios.post(CONST.BACKEND_URL + `/api/listplayerbyteam`, data, config).then(response => {
       formthis.setState({loading:false});
        if (response.data.code === 0) {
          let result = response.data.data.map(function (el) {
            var o = Object.assign({}, el);
            //o.pts = 8;
            o.isplaying = "-1";
            //o.credit = 8;
            o.playerchecked = true;
            return o;
          });
          this.setState({
            playerList2: result
          });
        }
        else {
          this.setState({
            playerList2: []
          });
          toast(response.data.msg);

        }
      }).catch(error => { });
      
    }
  }
  onChange2 = value => {
    const formthis=this;
    if (value[0] && value[0].id === this.state.teamid1) {
      toast("Team already selected.");
    }
    else if (value[0]) {
      let data = {
        teamid: value[0].id
      };
      this.setState({
        teamname2: value[0].teamname,
        teamid2: value[0].id
      });
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      formthis.setState({loading:true});
      axios.post(CONST.BACKEND_URL + `/api/listplayerbyteam`, data, config).then(response => {
      formthis.setState({loading:false});
        if (response.data.code === 0) {
          let result = response.data.data.map(function (el, index) {
            var o = Object.assign({}, el);
            o.pts = 0;
            o.credit = 0;
            o.playerchecked = false;
            return o;
          });
          this.setState({
            playerList2: result
          });
        }
        else {
          this.setState({
            playerList2: []
          });
          toast(response.data.msg);

        }
      }).catch(error => { });
    }
  }
  updateMatchToggle = () => {
    this.setState({
      updateMachToggle: !this.state.updateMachToggle
    });
  }
  searchTeam(query) {
    const formthis=this;
    let data = {
      search: query.replace(/^\s+|\s+$/g, '')
    };
    const config = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };
    formthis.setState({loading:true});
    axios.post(CONST.BACKEND_URL + `/api/listteam`, data, config).then(response => {
      formthis.setState({loading:false});
      if (response.data.code === 0) {
        this.setState({
          options: response.data.data
        });
      }
      else {
        this.setState({
          playerList1: []
        });
        toast(response.data.msg);

      }
    }).catch(error => { });
  }
  onInputBoxChange1 = e => {
    let allplayerdetails=this.state.allplayerdetails;
    allplayerdetails.data[e.target.id]["credit"]=e.target.value;
    this.setState({
      allplayerdetails: allplayerdetails
    },()=>{
      
    });
  }
  onInputBoxChange2 = e => {

    let allplayerdetails=this.state.allplayerdetails;
    allplayerdetails.data[e.target.id]["credit"]=e.target.value;
    this.setState({
      allplayerdetails: allplayerdetails
    },()=>{
      
    });
  }
  setPlayerType1(e) {
    let currentstatus=parseInt(e.target.value);
    let allPlayerList=this.state.allPlayerList;
    allPlayerList[e.target.id].role=this.converPlayerType(currentstatus);//this.state.allPlayerList.data[e.target.id].identified_roles;
    this.setState({allPlayerList:allPlayerList},()=>{
    })
  }
  setPlayerType2(e) {
    let currentstatus=parseInt(e.target.value);
    let allPlayerList=this.state.allPlayerList;
    allPlayerList[e.target.id].role=this.converPlayerType(currentstatus);//this.state.allPlayerList.data[e.target.id].identified_roles;
    this.setState({allPlayerList:allPlayerList},()=>{})

  }
  onInputBoxChangeSelect1 = player => {
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
  //Upload team logo
  onDrop1(picture) {
    if (picture[0]) {
      const formData = new FormData();
      formData.append('imgtype', 'teamlogo');
      formData.append('images[]', picture[picture.length - 1]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config).then(response => {
        //alert("The file is successfully uploaded");
        if (response.data.code === 0) {
          picture = [];
          this.setState({
            teamLogo1: response.data.data[0]
          });
        }
        else {
          picture = [];
          this.setState({
            teamLogo1: ''
          });
          toast(response.data.msg);

        }
      }).catch(error => { });
      // this.setState({
      //   pictures: this.state.pictures.concat(picture)
      // });
    }
  }
  onDrop2(picture) {
    if (picture[0]) {
      const formData = new FormData();
      formData.append('imgtype', 'teamlogo');
      formData.append('images[]', picture[picture.length - 1]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config).then(response => {
        //alert("The file is successfully uploaded");
        if (response.data.code === 0) {
          this.setState({
            teamLogo2: response.data.data[0]
          });
          picture = [];
        }
        else {
          picture = [];
          this.setState({
            teamLogo2: ''
          });
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
  }
  submitNewAddMatch(matchdetails) {
    let data = {};
    let playerslist = [];
    const formthis= this;
    if (this.state.playerList1 && this.state.playerList2) {
      this.state.playerList1.match.players.forEach((result1, index1) => {
        let objPlayerList = {};
        objPlayerList["pid"] = result1;//this.state.allPlayerList[result1].;
        objPlayerList["pts"] = (this.state.allplayerdetails.data[result1] &&  this.state.allplayerdetails.data[result1].pts)?this.state.allplayerdetails.data[result1].pts:0;
        objPlayerList["credit"] = (this.state.allplayerdetails.data[result1] &&  this.state.allplayerdetails.data[result1].credit)?this.state.allplayerdetails.data[result1].credit:0;
        objPlayerList["teamname"] = this.state.playerList1.short_name;
        objPlayerList["teamid"] = this.state.playerList1.key;
        objPlayerList["playerimg"] = (this.state.allPlayerList[result1].imgdetail) ? this.state.allPlayerList[result1].imgdetail.playerimage : "dummy.png";
        objPlayerList["ptype"] = this.getValuePlayerType(this.state.allPlayerList[result1].role);
        objPlayerList["fullname"] = this.state.allPlayerList[result1].name;
        objPlayerList["pname"] = this.state.allPlayerList[result1].short_name;
        objPlayerList["country"] = this.state.playerList1.name;
        objPlayerList["isplaying"] = -1;

        playerslist.push(objPlayerList);
      })


      this.state.playerList2.match.players.forEach((result2, index1) => {
        let objPlayerList = {};
        objPlayerList["pid"] = result2;//this.state.allPlayerList[result2].;
        objPlayerList["pts"] = (this.state.allplayerdetails.data[result2] &&  this.state.allplayerdetails.data[result2].pts)?this.state.allplayerdetails.data[result2].pts:0;
        objPlayerList["credit"] = (this.state.allplayerdetails.data[result2] &&  this.state.allplayerdetails.data[result2].credit)?this.state.allplayerdetails.data[result2].credit:0;
        objPlayerList["teamname"] = this.state.playerList2.short_name;
        objPlayerList["teamid"] = this.state.playerList2.key;
        objPlayerList["playerimg"] = (this.state.allPlayerList[result2].imgdetail) ? this.state.allPlayerList[result2].imgdetail.playerimage : "dummy.png";
        objPlayerList["ptype"] = this.getValuePlayerType(this.state.allPlayerList[result2].role);
        objPlayerList["fullname"] = this.state.allPlayerList[result2].name;
        objPlayerList["pname"] = this.state.allPlayerList[result2].short_name;
        objPlayerList["country"] = this.state.playerList2.name;
        objPlayerList["isplaying"] = -1;
        playerslist.push(objPlayerList);
      })
    }


    //toast("Please select team1");

    if (!this.state.teamLogo1 || !this.state.teamname2) {
      toast("Please select team logo");
    }
    
    if (this.state.selectedMatchDetails) {
      data["players"] = playerslist;
      data["matchid"] = this.state.selectedMatchDetails.unique_id;
      data["matchname"] = this.state.selectedMatchDetails.team1 + " V/S " + this.state.selectedMatchDetails.team2;
      data["team1"] = this.state.playerList1.short_name;
      data["team2"] = this.state.playerList2.short_name;
      data["gametype"] = this.state.gametype;
      data["team1logo"] = this.state.teamLogo1;
      data["team2logo"] = this.state.teamLogo2;
      data["mtype"] = this.state.selectedMatchDetails.mtype;
      data["mstarted"] = this.state.selectedMatchDetails.matchStarted;
      data["mdate"] = this.state.selectedMatchDetails.mdate;
      data["mdategmt"] = this.state.selectedMatchDetails.dateTimeGMT;
      data["gametype"] = 'kabaddi';
      data["gameid"] = this.state.gameid;
      data["seriesid"]=this.state.seriesid;
      data["seriesname"]=this.state.seriesname;

      
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      formthis.setState({loading:true});
      axios.post(CONST.BACKEND_URL + `/api/addmatch`, data, config).then(response => {
        formthis.setState({loading:false});
        if (response.data.code === 0) {
          this.getActiveMatchList();
          this.toggleAccordionNew(matchdetails);
          toast(response.data.data.msg);
          
          this.setState({
            activeMatchList: [],
            playerList1: [],
            playerList2: [],
            teamLogo1: '',
            teamLogo2: '',
          });
        }
        else {
          toast(response.data.msg);

        }
      }).catch(error => { });
    }
    else {
      toast("Please select match");
    }
  }
  onDateChange = (startDate) => {
    this.setState(() => ({
      startDate
    }));
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({
      calendarFocused: focused
    }))
  };
  onDateChange1 = (endDate) => {
    this.setState(() => ({
      endDate
    }));
  };
  onFocusChange1 = ({ focused }) => {

    this.setState(() => ({
      calendarFocused1: focused
    }))

  };
  searchMatchesList() {
    const formthis =this;
    const config = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };
    if (this.state.startDate && !this.state.endDate) {
      let data = {
        'search': this.state.findmatch,
        'date1': moment(this.state.startDate).format('DD-MM-YYYY'),
        'date2': moment(this.state.startDate).format('DD-MM-YYYY'),
        page: 1,
        limit: 10,
        gameid:this.state.gameid
      }
      formthis.setState({loading:true});
      axios.post(CONST.BACKEND_URL + `/api/getactivematch`, data, config).then(response => {
        formthis.setState({loading:false});
        if (response.data.code === 0) {
          let result = response.data.data.list.map(function (el, index) {
            var o = Object.assign({}, el);
            o.isOpenAccordian = false;
            return o;
          });
          this.setState({
            activeMatchList: result,
            activeMatchListtotal: response.data.data.total
          });
        }
        else {
          this.setState({
            activeMatchList: []
          });
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
    else if (this.state.startDate && this.state.endDate) {
      let data = {
        'search': this.state.findmatch,
        'date1': moment(this.state.startDate).format('DD-MM-YYYY'),
        'date2': moment(this.state.endDate).format('DD-MM-YYYY'),
        page: 1,
        limit: 10,
        gameid:this.state.gameid
      }
      formthis.setState({loading:true});
      axios.post(CONST.BACKEND_URL + `/api/getactivematch`, data, config).then(response => {
        formthis.setState({loading:false});
        if (response.data.code === 0) {
          let result = response.data.data.list.map(function (el, index) {
            var o = Object.assign({}, el);
            o.isOpenAccordian = false;
            return o;
          });
          this.setState({
            activeMatchList: result,
            activeMatchListtotal: response.data.data.total
          });
        }
        else {
          this.setState({
            activeMatchList: []
          });
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
  }
  resetMatch() {
    this.setState({
      listOfMatches: [],
      listOfMatchesTotal: 0,
      startDate: null,
      endDate: null,
      findmatch: '',
      selectedMathId: '',
      matchid: '',
      team1: '',
      team2: '',
      matchname: '',
      gametype: 'kabaddi',
      mstarted: false,
      mdate: '',
      mtype: '',
      mdategmt: ''
    });
  }
  //Add Dialog box
  showImageToggle1(player) {
    this.setState({
      showImageModal1: !this.state.showImageModal1,
      selectedPlayer1: player
    });
    if (player) {
      let data = {
        pid: player
      }
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config).then(response => {
        if (response.data.code === 0) {
          this.setState({
            listOfPlayerImage1: response.data.data
          });
        }
        // else {
        //   toast(response.data.msg);
        // }
      }).catch(error => { });
    }
    
  }
  selectedImage1(selectedPlayerImage) {
    this.setState({
      selectedImage1: selectedPlayerImage.id,
      selectedImageDetails1: selectedPlayerImage
    });
  }


  showImageToggle2(player) {
    this.setState({
      showImageModal2: !this.state.showImageModal2,
      selectedPlayer2: player
    },()=>{
      this.showImageGetImage2();
    });
    
  }

  showImageGetImage2(){
    // this.setState({
    //   selectedPlayer2: player
    // });
    let player=this.state.selectedPlayer2;
    if (player) {
      let data = {
        pid: player
      }
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config).then(response => {
        if (response.data.code === 0) {
          this.setState({
            listOfPlayerImage2: response.data.data
          });
        }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
  }


  selectedImage2(selectedPlayerImage) {
    this.setState({
      selectedImage2: selectedPlayerImage.id,
      selectedImageDetails2: selectedPlayerImage
    });
  }
  setNewImageOfPlayer1() {
    let allPlayerList = this.state.allPlayerList;
    let plyrdetail = allPlayerList[this.state.selectedPlayer1];
    plyrdetail["imgdetail"] = this.state.selectedImageDetails1;

    allPlayerList[this.state.selectedPlayer1] = plyrdetail;
    this.setState({
      allPlayerList: allPlayerList,
      showImageModal1: !this.state.showImageModal1
    });

    
    // let findindex = playerList1.findIndex(x => x.pid === this.state.selectedPlayer1);
    // playerList1[findindex].pimg = this.state.selectedImageDetails1.pimg;
    // playerList1[findindex].playerimage = this.state.selectedImageDetails1.playerimage;
    // this.setState({
    //   playerList1,
    //   showImageModal1: !this.state.showImageModal1
    // });
  }
  setNewImageOfPlayer2(player) {  
    // let {
    //   playerList2
    // } = this.state;
    // let findindex = playerList2.findIndex(x => x.pid === this.state.selectedPlayer2);
    // playerList2[findindex].pimg = this.state.selectedImageDetails2.pimg;
    // playerList2[findindex].playerimage = this.state.selectedImageDetails2.playerimage;
    // this.setState({
    //   playerList2,
    //   showImageModal2: !this.state.showImageModal2
    // });
    let allPlayerList = this.state.allPlayerList;
    let plyrdetail = allPlayerList[this.state.selectedPlayer2];
    plyrdetail["imgdetail"] = this.state.selectedImageDetails2;

    allPlayerList[this.state.selectedPlayer2] = plyrdetail;
    this.setState({
      allPlayerList: allPlayerList,
      showImageModal2: !this.state.showImageModal2
    });
  }
  //Upload team logo
  onDropNewPlayer1(picture) {
    if (picture[0]) {
      const formData = new FormData();
      formData.append('pid', this.state.selectedPlayer1);
      formData.append('img', picture[0]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/addplayerimg`, formData, config).then(response => {
        //alert("The file is successfully uploaded");
        if (response.data.code === 0) {
          let data = {
            pid: this.state.selectedPlayer1
          }
          const config1 = {
            headers: {
              'content-type': 'application/json',
              Authorization: authHeader().Authorization
            }
          };
          
          axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1).then(response => {
          
            if (response.data.code === 0) {
              this.setState({
                listOfPlayerImage1: response.data.data
              });
              
            }
            else {
              toast(response.data.msg);
            }
          }).catch(error => { });
        }
        else {
          toast(response.data.msg);

        }
      }).catch(error => { });
      // this.setState({
      //   pictures: this.state.pictures.concat(picture)
      // });
    }
  }
  //Upload team logo
  onDropNewPlayer2(picture) {
    if (picture[0]) {
      const formData = new FormData();
      formData.append('pid', this.state.selectedPlayer2);
      formData.append('img', picture[0]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/addplayerimg`, formData, config).then(response => {
        //alert("The file is successfully uploaded");
        if (response.data.code === 0) {
          let data = {
            pid: this.state.selectedPlayer2
          }
          const config1 = {
            headers: {
              'content-type': 'application/json',
              Authorization: authHeader().Authorization
            }
          };
         axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1).then(response => {
         
            if (response.data.code === 0) {
              this.setState({
                listOfPlayerImage2: response.data.data
              });
         
            }
            else {
              toast(response.data.msg);
            }
          }).catch(error => { });
        }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
  }
  //Update Match Details 88888888888
  onInputBoxChange1Update = e => {
    var index = this.state.updatePlayerList1.findIndex(x => x.pid === e.target.id);
    let updatePlayerList1 = [...this.state.updatePlayerList1];
    let player = {
      ...updatePlayerList1[index]
    };
    if (e.target.name === 'playerchecked') {
      player[e.target.name] = !player.playerchecked;
    }
    else {
      player[e.target.name] = e.target.value;
    }
    updatePlayerList1[index] = player;
    this.setState({
      updatePlayerList1: updatePlayerList1
    });
  }
  onInputBoxChange2Update = e => {
    var index = this.state.updatePlayerList2.findIndex(x => x.pid === e.target.id);
    let updatePlayerList2 = [...this.state.updatePlayerList2];
    let player = {
      ...updatePlayerList2[index]
    };
    if (e.target.name === 'playerchecked') {
      player[e.target.name] = !player.playerchecked;
    }
    else {
      player[e.target.name] = e.target.value;
    }
    updatePlayerList2[index] = player;
    
    this.setState({
      updatePlayerList2: updatePlayerList2
    });
  }
  setPlayerType1Update(e) {
    let {
      value,
      id
    } = e.target
    
    let {
      updatePlayerList1
    } = this.state;
    let findindex = updatePlayerList1.findIndex(x => x.pid === id);
    updatePlayerList1[findindex].playertype = value;
    this.setState({
      updatePlayerList1
    });
  }
  setPlayerType2Update(e) {
    
    let {
      value,
      id
    } = e.target
    let {
      updatePlayerList2
    } = this.state;
    let findindex = updatePlayerList2.findIndex(x => x.pid === id);
    updatePlayerList2[findindex].playertype = value;
    this.setState({
      updatePlayerList2
    });
  }
  onInputBoxChangeSelect1Update = player => {
    var index = this.state.updatePlayerList1.findIndex(x => x.pid === player.pid);
    let updatePlayerList1 = [...this.state.updatePlayerList1];
    let player1 = {
      ...updatePlayerList1[index]
    };
    player1['playerchecked'] = !player.playerchecked;
    updatePlayerList1[index] = player1;
    this.setState({
      updatePlayerList1: updatePlayerList1
    });
  }
  onInputBoxChangeSelect2Update = player => {
    var index = this.state.updatePlayerList2.findIndex(x => x.pid === player.pid);
    let updatePlayerList2 = [...this.state.updatePlayerList2];
    let player1 = {
      ...updatePlayerList2[index]
    };
    player1['playerchecked'] = !player.playerchecked;
    updatePlayerList2[index] = player1;
    this.setState({
      updatePlayerList2: updatePlayerList2
    });
  }
  submitUpdatedMatch() {
    let data = {};
    let players = [];
    const formthis=this;
    if (this.state.updatePlayerList1) {
      let checkUpdatePlayerList1 = this.state.updatePlayerList1.filter(x => x.isplaying === "0").length;
      let checkUpdatePlayerList2 = this.state.updatePlayerList2.filter(x => x.isplaying === "0").length;
      this.state.updatePlayerList1.map((player, index) => {
        if (player.playerchecked) {
          players.push({
            "pid": player.pid,
            "isplaying": (checkUpdatePlayerList1 > 0 || checkUpdatePlayerList2 > 0) ? ((player.isplaying === "-1" || player.isplaying === "1") ? "1" : "0") : "-1",
            "playerimg": player.playerimage ? player.playerimage : player.playerimg,
            "pts": player.pts,
            "ptype": player.playertype,
            "credit": player.credit,
            "teamname": player.teamname ? player.teamname : this.state.teamname1Update,
            "teamid": player.teamid ? player.teamid : this.state.teamid1Update
          })
        }
        return data;
      })
    }
    else {
      toast("Please select team1");
    }
    if (this.state.updatePlayerList2) {
      let checkUpdatePlayerList1 = this.state.updatePlayerList1.filter(x => x.isplaying === "0").length;
      let checkUpdatePlayerList2 = this.state.updatePlayerList2.filter(x => x.isplaying === "0").length;
      this.state.updatePlayerList2.map((player, index) => {
        if (player.playerchecked) {
          players.push({
            "pid": player.pid,
            "isplaying": (checkUpdatePlayerList1 > 0 || checkUpdatePlayerList2 > 0) ? ((player.isplaying === "-1" || player.isplaying === "1") ? "1" : "0") : "-1",
            "playerimg": player.playerimage ? player.playerimage : player.playerimg,
            "pts": player.pts,
            "ptype": player.playertype,
            "credit": player.credit,
            "teamname": player.teamname ? player.teamname : this.state.teamname2Update,
            "teamid": player.teamid ? player.teamid : this.state.teamid2Update
          })
        }
        return data;
      })
    }
    else {
      toast("Please select team2");
    }
    // if (!this.state.teamLogo1 || !this.state.teamname2) {
    //   toast("Please select team logo");
    // }
    if (this.state.selectedMatchDetails) {
      formthis.setState({loading:true});
      data["players"] = players;
      data["matchid"] = this.state.selectedMatchDetails.unique_id;
      data["matchname"] = this.state.selectedMatchDetails.team1 + " V/S " + this.state.selectedMatchDetails.team2;
      data["team1"] = this.state.teamname1Update ? this.state.teamname1Update : this.state.updatematchDetails.team1;
      data["team2"] = this.state.teamname2Update ? this.state.teamname2Update : this.state.updatematchDetails.team2;
      data["gametype"] = this.state.gametype;
      data["team1logo"] = this.state.updateteam1logo ? this.state.updateteam1logo : this.state.updatematchDetails.team1logoname;
      data["team2logo"] = this.state.updateteam2logo ? this.state.updateteam2logo : this.state.updatematchDetails.team2logoname;
      data["mtype"] = this.state.selectedMatchDetails.mtype;
      data["mstarted"] = this.state.selectedMatchDetails.matchStarted;
      data["mdate"] = this.state.selectedMatchDetails.mdate;
      data["mdategmt"] = this.state.selectedMatchDetails.dateTimeGMT;
      data["gametype"] = 'kabaddi';
      data["gameid"] = this.state.gameid;
      data["seriesid"]=this.state.seriesid;
      data["seriesname"]=this.state.seriesname;
      
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/editmatch`, data, config).then(response => {
        formthis.setState({loading:false});
        if (response.data.code === 0) {
          this.getActiveMatchList();
          toast(response.data.msg);
          this.setState({
            updateMachToggle: false,
            openAccordianID: "",
          });
        }
        else {

          toast(response.data.msg);
        }
      }).catch(error => { });
    }
    else {
      toast("Please select match");
    }
  }
  //Upload team logo
  onDrop1Update(picture) {
    if (picture[0]) {
      const formData = new FormData();
      formData.append('imgtype', 'teamlogo');
      formData.append('images[]', picture[picture.length - 1]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config).then(response => {
        
        if (response.data.code === 0) {
          picture = [];
          this.setState({
            updateteam1logo: response.data.data[0],
            updateteam1logoURL: CONST.BACKEND_URL + "/uploads/teamlogo/" + response.data.data[0]
          });
        }
        else {
          picture = [];
          this.setState({
            teamLogo1Update: ''
          });
          toast(response.data.msg);

        }
      }).catch(error => { });
      // this.setState({
      //   pictures: this.state.pictures.concat(picture)
      // });
    }
  }
  onDrop2Update(picture) {
    if (picture[0]) {
      const formData = new FormData();
      formData.append('imgtype', 'teamlogo');
      formData.append('images[]', picture[picture.length - 1]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config).then(response => {
        if (response.data.code === 0) {
          this.setState({
            updateteam2logo: response.data.data[0],
            updateteam2logoURL: CONST.BACKEND_URL + "/uploads/teamlogo/" + response.data.data[0],
          });
          picture = [];
        }
        else {
          picture = [];
          this.setState({
            teamLogo2Update: ''
          });
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
  }
  //Add Dialog box
  showImageToggle1Update(player) {
    this.setState({
      showImageModal1Update: !this.state.showImageModal1Update,
      selectedPlayer1Update: player
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
      axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config).then(response => {
        if (response.data.code === 0) {
          this.setState({
            listOfPlayerImage1Update: response.data.data
          });
          }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
    
  }
  selectedImage1Update(selectedPlayerImage) {
    this.setState({
      selectedImage1Update: selectedPlayerImage.id,
      selectedImageDetails1Update: selectedPlayerImage
    });
  }
  showImageToggle2Update(player) {
    this.setState({
      showImageModal2Update: !this.state.showImageModal2,
      selectedPlayer2Update: player
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
      axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config).then(response => {
        if (response.data.code === 0) {
          this.setState({
            listOfPlayerImage2Update: response.data.data
          });
          }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
    
  }
  selectedImage2Update(selectedPlayerImage) {
    this.setState({
      selectedImage2Update: selectedPlayerImage.id,
      selectedImageDetails2Update: selectedPlayerImage
    });
  }
  setNewImageOfPlayer1Update(player) {
    let {
      updatePlayerList1
    } = this.state;
    let findindex = updatePlayerList1.findIndex(x => x.pid === this.state.selectedPlayer1Update.pid);
    updatePlayerList1[findindex].pimg = this.state.selectedImageDetails1Update.pimg;
    updatePlayerList1[findindex].playerimage = this.state.selectedImageDetails1Update.playerimage;
    this.setState({
      updatePlayerList1,
      showImageModal1Update: !this.state.showImageModal1Update
    });
  }
  setNewImageOfPlayer2Update(player) {
    let {
      updatePlayerList2
    } = this.state;
    let findindex = updatePlayerList2.findIndex(x => x.pid === this.state.selectedPlayer2Update.pid);
    updatePlayerList2[findindex].pimg = this.state.selectedImageDetails2Update.pimg;
    updatePlayerList2[findindex].playerimage = this.state.selectedImageDetails2Update.playerimage;
    this.setState({
      updatePlayerList2,
      showImageModal2Update: !this.state.showImageModal2Update
    });
  }
  //Upload team logo
  onDropNewPlayer1Update(picture) {
    if (picture[0]) {
      const formData = new FormData();
      formData.append('pid', this.state.selectedPlayer1Update.pid);
      formData.append('img', picture[0]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/addplayerimg`, formData, config).then(response => {
        //alert("The file is successfully uploaded");
        if (response.data.code === 0) {
          let data = {
            pid: this.state.selectedPlayer1Update.pid
          }
          const config1 = {
            headers: {
              'content-type': 'application/json',
              Authorization: authHeader().Authorization
            }
          };
          
          axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1).then(response => {          
            if (response.data.code === 0) {
              this.setState({
                listOfPlayerImage1Update: response.data.data
              });
              
            }
            else {
              toast(response.data.msg);
            }
          }).catch(error => { });
        }
        else {
          toast(response.data.msg);

        }
      }).catch(error => { });
      // this.setState({
      //   pictures: this.state.pictures.concat(picture)
      // });
    }
  }
  //Upload team logo
  onDropNewPlayer2Update(picture) {
    if (picture[0]) {
      const formData = new FormData();
      formData.append('pid', this.state.selectedPlayer2Update.pid);
      formData.append('img', picture[0]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/addplayerimg`, formData, config).then(response => {
        //alert("The file is successfully uploaded");
        if (response.data.code === 0) {
         let data = {
            pid: this.state.selectedPlayer2Update.pid
          }
          const config1 = {
            headers: {
              'content-type': 'application/json',
              Authorization: authHeader().Authorization
            }
          };
          
          axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1).then(response => {
            if (response.data.code === 0) {
              this.setState({
                listOfPlayerImage2Update: response.data.data
              });            
            }
            else {
              toast(response.data.msg);
            }
          }).catch(error => { });
        }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
  }
  getTeam1ListUpdate = value => {
    if (value[0] && value[0].id === this.state.teamid1Update) {
      toast("Team already selected.");
    }
    else if (value[0]) {
      let data = {
        teamid: value[0].id
      };
      this.setState({
        teamname1Update: value[0].shortname,
        teamid1Update: value[0].id
      });
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/listplayerbyteam`, data, config).then(response => {
        if (response.data.code === 0) {
          let result = response.data.data.map(function (el) {
            var o = Object.assign({}, el);
            //o.pts = 8.00;
            o.isplaying = "-1";
            //o.credit = 8.00;
            o.playerchecked = true;
            return o;
          });
          
          this.setState({
            updatePlayerList1: result
          });
        }
        else {
          this.setState({
            updatePlayerList1: []
          });
          toast(response.data.msg);
        }
      }).catch(error => { });
      
    }
  }
  getTeam2ListUpdate = value => {
    if (value[0] && value[0].id === this.state.teamid2Update) {
      toast("Team already selected.");
    }
    else if (value[0]) {
      let data = {
        teamid: value[0].id
      };
      this.setState({
        teamname2Update: value[0].shortname,
        teamid2Update: value[0].id
      });
      const config = {
        headers: {
          Authorization: authHeader().Authorization
        }
      };
      axios.post(CONST.BACKEND_URL + `/api/listplayerbyteam`, data, config).then(response => {
        if (response.data.code === 0) {
          let result = response.data.data.map(function (el) {
            var o = Object.assign({}, el);
            //o.pts = 8.00;
            o.isplaying = "-1";
            //o.credit = 8.00;
            o.playerchecked = true;
            return o;
          });
          this.setState({
            updatePlayerList2: result
          });
        }
        else {
          this.setState({
            updatePlayerList2: []
          });
          toast(response.data.msg);
        }
      }).catch(error => { });
      
    }
  }

  onChangePlaying1(e, chk) {
    let supdatePlayerList1 = this.state.updatePlayerList1;
    let indexPlayer = supdatePlayerList1.findIndex(x => x.pid === e.target.id);
    supdatePlayerList1[indexPlayer].isplaying = (chk === "1") ? "0" : "1";

    this.setState({ updatePlayerList1: supdatePlayerList1 });
  }

  onChangePlaying2(e, chk) {
    let supdatePlayerList2 = this.state.updatePlayerList2;
    let indexPlayer = supdatePlayerList2.findIndex(x => x.pid === e.target.id);
    supdatePlayerList2[indexPlayer].isplaying = (chk === "1") ? "0" : "1";
    this.setState({ updatePlayerList2: supdatePlayerList2 });
  }

  render() {
    let formthis = this;
    let cricket= this.props;
    var style = {
      padding: 0,
      margin: 0,
      width: '20px',
    };
    return (
      <div className="animated fadeIn">
      {(cricket.loading || formthis.state.loading)?<div className="loader"></div>:null}
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <Row >
                  <Col xs="2">
                    Active Match
                              </Col>
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
                      small={true}
                      numberOfMonths={1}
                      isOutsideRange={day => (moment().diff(day) > 0)}
                      placeholder="End Date"
                      displayFormat="DD/MM/YYYY"
                    />
                  </Col>
                  <Col xs="2">
                    <Input type="text" placeholder="Search Match" name="findmatch" id="findmatch" autoComplete="off" value={this.state.findmatch} onChange={this.onChnageSearchMatch} />
                  </Col>
                  <Col xs="1">
                    <Button color="success" onClick={() => this.searchMatchesList()}> Find
                                </Button>
                  </Col>
                  <Col xs="1">
                    <Button color="info" onClick={() => this.resetMatch()}> Reset
                                </Button>
                  </Col>
                </Row>

              </CardHeader>
              <CardBody>
                {
                  this.state.activeMatchList ? this.state.activeMatchList.map((matchdetails, index) => (
                    <div id={matchdetails.unique_id} key={matchdetails.unique_id}>
                      <Card>
                        <CardHeader id="headingOne">
                          <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordionNew(matchdetails)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                            {matchdetails.team1} V/S {matchdetails.team2}
                            <small className="for_margin_left">{moment(matchdetails.dateTimeGMT).utcOffset("+05:30").format("YYYY-MM-DD HH:mm")}</small>
                          </Button>
                          {matchdetails.isactive === "1" && matchdetails.iscreated === "1" ? <Badge className="mr-1 float-right for_margin_top" color="success">Created</Badge> : null}
                        </CardHeader>
                        <Collapse isOpen={(formthis.state.openAccordianID === matchdetails.unique_id) ? true : false} data-parent="#accordion" id={matchdetails.unique_id} aria-labelledby="headingOne">
                          { /** Create New Match **/
                            matchdetails.isactive === "1" && matchdetails.iscreated === "0" ?
                             ((this.state.status_overview==="canceled")?(<CardBody>
                              <Row>Match Canceled</Row></CardBody>):( <CardBody>
                                <Row>
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="pid">Select Team11</Label>({this.state.teamname1})
                                                        {/* <AsyncTypeahead isLoading={this.state.isLoading} labelKey={option => `${option.teamname}`} onChange={this.getTeam1List} onSearch={this.searchTeam} options={this.state.options} /> */}
                                    </FormGroup>
                                    <ListGroup className="forscroll ">
                                      <ListGroupItem key={-1}>
                                        <Row>
                                          <Col xs="2">
                                            Image
                                                                </Col>
                                          <Col xs="3">
                                            <Label htmlFor="fpname">Name</Label>
                                          </Col>
                                          <Col xs="2" />

                                          <Col xs="3">
                                            <Label htmlFor="fpname">Points</Label>
                                          </Col>
                                          <Col xs="2">
                                            <Label htmlFor="fpname">Credit</Label>
                                          </Col>

                                        </Row>
                                      </ListGroupItem>
                                      {(this.state.playerList1 && this.state.playerList1.match) ? (this.state.playerList1.match.players).map((player, index) => (
                                        <ListGroupItem key={index} >
                                          <Row>
                                            <Col xs="2">
                                              <img src={(formthis.state.allPlayerList[player].imgdetail) ? formthis.state.allPlayerList[player].imgdetail.pimg : ""} width="50" height="50" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} className="img-avatar" style={{ cursor: 'pointer' }} alt="" onClick={() => this.showImageToggle1(player)} />
                                            </Col>
                                            <Col xs="4">{formthis.state.allPlayerList[player].name}</Col>
                                            <Col xs="6">
                                              <Row>
                                                <Col xs="6">
                                                  {((formthis.state.allplayerdetails.data) && formthis.state.allplayerdetails.data[player])?formthis.state.allplayerdetails.data[player].pts:0}
                                                </Col>
                                                <Col xs="6">
                                                  <Input type="text" id={player} name="credit" placeholder="Credit" value={((formthis.state.allplayerdetails.data) && formthis.state.allplayerdetails.data[player])?formthis.state.allplayerdetails.data[player].credit:0} onChange={this.onInputBoxChange1} />
                                                </Col>
                                                <Col xs="8" className={"mt-top"}>                                                  
                                                  <Input type="select" name="ptype" id={player} onChange={this.setPlayerType1} value={formthis.getValuePlayerType(formthis.state.allPlayerList[player].role)}>

                                                    {
                                                      ((this.state.roleData)?this.state.roleData:[]).map((e, key) => {
                                                        return <option key={key} value={e.value}>{e.name}</option>;
                                                      })
                                                    }
                                                  </Input>
                                                </Col>
                                                {/* <Col xs="4" className={ "mt-top"}>
                                                                            <Switch onChange={()=>this.onInputBoxChangeSelect1(player)} checked={ this.state.playerList1[index].playerchecked } id={player.pid} />
                                                                        </Col> */}
                                              </Row>
                                            </Col>
                                          </Row>
                                        </ListGroupItem>
                                      )) : null}
                                    </ListGroup>
                                  </Col>
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="fpname">Select Team2</Label>({this.state.teamname2})
                                                        {/* <AsyncTypeahead isLoading={this.state.isLoading} labelKey={option => `${option.teamname}`} onChange={this.getTeam2List} onSearch={this.searchTeam} options={this.state.options} /> */}
                                    </FormGroup>
                                    <ListGroup className="forscroll">
                                      <ListGroupItem key={-1}>
                                        <Row>

                                          <Col xs="2">
                                            Image
                                                                </Col>
                                          <Col xs="3">
                                            <Label htmlFor="fpname">Name</Label>
                                          </Col>
                                          <Col xs="2" />

                                          <Col xs="3">
                                            <Label htmlFor="fpname">Points</Label>
                                          </Col>
                                          <Col xs="2">
                                            <Label htmlFor="fpname">Credit</Label>
                                          </Col>
                                        </Row>
                                      </ListGroupItem>
                                      {(this.state.playerList2 && this.state.playerList2.match) ? (this.state.playerList2.match.players).map((player, index) => (
                                        <ListGroupItem key={index}>
                                          <Row>
                                            <Col xs="2">
                                              <img src={(formthis.state.allPlayerList[player].imgdetail) ? formthis.state.allPlayerList[player].imgdetail.pimg : ""} width="50" height="50" className="img-avatar" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} style={{ cursor: 'pointer' }} alt="" onClick={() => this.showImageToggle2(player)} />
                                            </Col>
                                            <Col xs="4">{formthis.state.allPlayerList[player].name}</Col>
                                            <Col xs="6">
                                              <Row>
                                                <Col xs="6">
                                                  {(formthis.state.allplayerdetails.data && formthis.state.allplayerdetails.data[player])?formthis.state.allplayerdetails.data[player].pts:0}
                                                </Col>
                                                <Col xs="6">
                                                  <Input type="text" id={player} name="credit" placeholder="Credit" value={(formthis.state.allplayerdetails.data && formthis.state.allplayerdetails.data[player])?formthis.state.allplayerdetails.data[player].credit:0} onChange={this.onInputBoxChange2} />
                                                </Col>
                                                <Col xs="8" className={"mt-top"}>
                                                  <Input type="select" name="ptype" id={player} onChange={this.setPlayerType2} value={formthis.getValuePlayerType(formthis.state.allPlayerList[player].role)}>
                                                  {
                                                      this.state.roleData.map((e, key) => {
                                                        return <option key={key} value={e.value}>{e.name}</option>;
                                                      })
                                                    }
                                                  </Input>
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
                                  <Col xs="1">
                                    <img src={CONST.BACKEND_URL + '/uploads/teamlogo/' + this.state.teamLogo1} width="50" height="50" alt="" />
                                  </Col>
                                  <Col xs="2">
                                    <ImageUploader withIcon={false} buttonText="Team1 Logo" withLabel={false} onChange={this.onDrop1} singleImage={true} label='Max file size: 100kb' maxFileSize={100000} style={{ width: '10px', margin: "0px auto" }} fileContainerStyle={style} />
                                  </Col>
                                  <Col xs="1">
                                    <img src={CONST.BACKEND_URL + '/uploads/teamlogo/' + this.state.teamLogo2} width="50" height="50" alt="" />
                                  </Col>
                                  <Col xs="2">
                                    <ImageUploader withIcon={false} buttonText="Team2 Logo" withLabel={false} onChange={this.onDrop2} singleImage={true} label='Max file size: 100kb' maxFileSize={100000} style={{ width: '10px', margin: "0px auto" }} fileContainerStyle={style} />
                                  </Col>
                                  <Col xs="1">
                                    <Button color="primary" onClick={() => this.submitNewAddMatch(matchdetails)}> Submit
                                                    </Button>
                                  </Col>
                                  <Col xs="2" />
                                </Row>
                                    </CardBody>)) : null
                          }

                          { /*1111111 Update Match Details **/
                            matchdetails.isactive === "1" && matchdetails.iscreated === "1" ?
                              <CardBody>
                                <Row >
                                  <Col xs="10" />
                                  <Col xs="1">Update</Col>
                                  <Col xs="1">
                                    <Switch onChange={() => this.updateMatchToggle()} checked={this.state.updateMachToggle} id="updateidMatchToggle" />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="pid">Select Team12</Label>({matchdetails.team1})
                                                        <AsyncTypeahead isLoading={this.state.isLoading} labelKey={option => `${option.teamname}`} onChange={this.getTeam1ListUpdate} onSearch={this.searchTeam} options={this.state.options} disabled={!this.state.updateMachToggle} />
                                    </FormGroup>
                                    <ListGroupItem key={-1}>
                                      <Row>
                                        <Col xs="2">
                                          Image
                                                                </Col>
                                        <Col xs="2">
                                          <Label htmlFor="fpname">Name</Label>
                                        </Col>
                                        <Col xs="2">
                                          <Label htmlFor="fpname">Playing</Label>
                                        </Col>

                                        <Col xs="3">
                                          <Label htmlFor="fpname">Points</Label>
                                        </Col>
                                        <Col xs="2">
                                          <Label htmlFor="fpname">Credit</Label>
                                        </Col>
                                      </Row>
                                    </ListGroupItem>
                                    <ListGroup className="forscroll ">
                                      {this.state.updatePlayerList1 ? this.state.updatePlayerList1.map((player, index) => (
                                        <ListGroupItem key={index} >
                                          <Row>
                                            <Col xs="2">
                                              <img src={player.pimg} width="50" height="50" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} className="img-avatar" alt="" style={{ cursor: 'pointer' }} onClick={() => this.showImageToggle1Update(player)} />
                                            </Col>
                                            <Col xs="3">{player.pname}</Col>
                                            <Col xs="1">

                                              <Input type="checkbox" id={player.pid} name="playing" disabled={!this.state.updateMachToggle} checked={((this.state.updatePlayerList1[index].isplaying === "-1" || this.state.updatePlayerList1[index].isplaying === "1") ? "checked" : "")} onChange={(e) => this.onChangePlaying1(e, this.state.updatePlayerList1[index].isplaying)} />
                                            </Col>

                                            <Col xs="3">
                                              {this.state.updatePlayerList1[index].pts}
                                            </Col>
                                            <Col xs="3">
                                              <Input type="text" id={player.pid} name="credit" placeholder="Credit" value={this.state.updatePlayerList1[index].credit} onChange={this.onInputBoxChange1Update} disabled={!this.state.updateMachToggle} />
                                            </Col>
                                            <Col xs="4" className={"mt-top"}>
                                              <Input type="select" name="ptype" id={this.state.updatePlayerList1[index].pid} onChange={this.setPlayerType1Update} value={this.state.updatePlayerList1[index].playertype} disabled={!this.state.updateMachToggle}>
                                                {
                                                  this.state.roleData.map((e, key) => {
                                                    return <option key={key} value={e.value}>{e.name}</option>;
                                                  })
                                                }
                                              </Input>
                                            </Col>
                                            {/* <Col xs="4" className={ "mt-top"}>
                                                                            <Switch onChange={()=>this.onInputBoxChangeSelect1Update(player)} checked={ this.state.updatePlayerList1[index].playerchecked } id={player.pid} disabled={!this.state.updateMachToggle}/>
                                                                        </Col> */}

                                          </Row>
                                        </ListGroupItem>
                                      )) : null}
                                    </ListGroup>
                                  </Col>
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="fpname">Select Team2</Label>({matchdetails.team2})
                                                        <AsyncTypeahead isLoading={this.state.isLoading} labelKey={option => `${option.teamname}`} onChange={this.getTeam2ListUpdate} onSearch={this.searchTeam} options={this.state.options} disabled={!this.state.updateMachToggle} />
                                    </FormGroup>
                                    <ListGroupItem key={-1}>
                                      <Row>
                                        <Col xs="2">
                                          Image
                                                                </Col>
                                        <Col xs="2">
                                          <Label htmlFor="fpname">Name</Label>
                                        </Col>
                                        <Col xs="2">
                                          <Label htmlFor="fpname">Playing</Label>
                                        </Col>

                                        <Col xs="3">
                                          <Label htmlFor="fpname">Points</Label>
                                        </Col>
                                        <Col xs="2">
                                          <Label htmlFor="fpname">Credit</Label>
                                        </Col>
                                      </Row>
                                    </ListGroupItem>
                                    <ListGroup className="forscroll">
                                      {this.state.updatePlayerList2 ? this.state.updatePlayerList2.map((player, index) => (
                                        <ListGroupItem key={index}>
                                          <Row>
                                            <Col xs="2">
                                              <img src={player.pimg} width="50" height="50" className="img-avatar" alt="" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} style={{ cursor: 'pointer' }} onClick={() => this.showImageToggle2Update(player)} />
                                            </Col>
                                            <Col xs="3">{player.pname}</Col>
                                            <Col xs="1">
                                              <Input type="checkbox" id={player.pid} name="playing" disabled={!this.state.updateMachToggle} checked={((this.state.updatePlayerList2[index].isplaying === "-1" || this.state.updatePlayerList2[index].isplaying === "1") ? "checked" : "")} onChange={(e) => this.onChangePlaying2(e, this.state.updatePlayerList2[index].isplaying)} />
                                            </Col>

                                            <Col xs="3">
                                              {this.state.updatePlayerList2[index].pts}
                                            </Col>
                                            <Col xs="3">
                                              <Input type="text" id={player.pid} name="credit" placeholder="Credit" value={this.state.updatePlayerList2[index].credit} onChange={this.onInputBoxChange2Update} disabled={!this.state.updateMachToggle} />
                                            </Col>
                                            <Col xs="4" className={"mt-top"}>
                                              <Input type="select" name="ptype" id={this.state.updatePlayerList2[index].pid} onChange={this.setPlayerType2Update} value={this.state.updatePlayerList2[index].playertype} disabled={!this.state.updateMachToggle}>
                                                {
                                                  this.state.roleData.map((e, key) => {
                                                    return <option key={key} value={e.value}>{e.name}</option>;
                                                  })
                                                }
                                              </Input>
                                            </Col>
                                            {/* <Col xs="4" className={ "mt-top"}>
                                                                            <Switch onChange={()=>this.onInputBoxChangeSelect2Update(player)} checked={ this.state.updatePlayerList2[index].playerchecked } id={player.pid} disabled={!this.state.updateMachToggle} />
                                                                        </Col> */}

                                          </Row>
                                        </ListGroupItem>
                                      )) : null}
                                    </ListGroup>
                                  </Col>
                                </Row>

                                <Row>
                                  {

                                    this.state.updatematchDetails ?
                                      <Col xs="1">
                                        <img src={this.state.updateteam1logoURL} width="50" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} height="50" className="img-avatar" alt="" />
                                      </Col> : null
                                  }
                                  {
                                    this.state.updatematchDetails ?
                                      <Col xs="2">
                                        <img src={this.state.updateteam2logoURL} width="50" height="50" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} className="img-avatar" alt="" />
                                      </Col> : null
                                  }
                                  {this.state.updateMachToggle ? <Col xs="2">
                                    <ImageUploader withIcon={false} buttonText="Team11 Logo" withLabel={false} onChange={this.onDrop1Update} singleImage={true} label='Max file size: 100kb' maxFileSize={100000} style={{ width: '10px', margin: "0px auto" }} fileContainerStyle={style} />
                                  </Col> : null}
                                  {this.state.updateMachToggle ? <Col xs="2">
                                    <ImageUploader withIcon={false} buttonText="Team21 Logo" withLabel={false} onChange={this.onDrop2Update} singleImage={true} label='Max file size: 100kb' maxFileSize={100000} style={{ width: '10px', margin: "0px auto" }} fileContainerStyle={style} />
                                  </Col> : null}
                                  {this.state.updateMachToggle ? <Col xs="1">
                                    <Button color="primary" onClick={() => this.submitUpdatedMatch()}> Update
                                                        </Button>
                                  </Col> : null}
                                  {/* {this.state.updateMachToggle?<Col xs="2">
                                                        <Button color="secondary" onClick={()=> this.resetNewAddMatch()}> Reset Form
                                                        </Button>
                                                    </Col>:null} */}

                                  <Col xs="2" />
                                </Row>

                              </CardBody> : null
                          }
                        </Collapse>
                      </Card>
                    </div>
                  )) : null
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.showImageModal1} toggle={this.showImageToggle1} className={'my-modal ' + this.props.className}>
          <ModalHeader toggle={this.showImageToggle1}>
            Update Image 1
            </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                <Card className="border-secondary">

                  <CardBody>
                    <ListGroup>
                      <Row>
                        {this.state.listOfPlayerImage1 ? this.state.listOfPlayerImage1.map((player, index) =>
                          <ListGroupItem key={index} onClick={() => this.selectedImage1(player)} style={{ cursor: 'pointer' }} active={this.state.selectedImage1 === player.id} >
                            <Col xs="4">
                              <img src={player.pimg} width="200" height="200" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} alt="" />
                            </Col>
                          </ListGroupItem>
                        ) : null}
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
                          <ImageUploader withIcon={false} buttonText="Player Image" withLabel={false} withPreview={false} onChange={this.onDropNewPlayer1} label='Max file size: 100kb' maxFileSize={100000} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.setNewImageOfPlayer1()}> Submit
                </Button>{' '}
            <Button color="secondary" onClick={this.showImageToggle1}>
              Cancel
                </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showImageModal2} toggle={this.showImageToggle2} className={'my-modal ' + this.props.className}>
          <ModalHeader toggle={this.showImageToggle2}>
            Update Image
            </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                <Card className="border-secondary">

                  <CardBody>
                    <ListGroup>
                      <Row>
                        {this.state.listOfPlayerImage2 ? this.state.listOfPlayerImage2.map((player, index) =>
                          <ListGroupItem key={index} onClick={() => this.selectedImage2(player)} style={{ cursor: 'pointer' }} active={this.state.selectedImage2 === player.id} >
                            <Col xs="4">
                              <img src={player.pimg} width="200" height="200" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} alt="" />
                            </Col>
                          </ListGroupItem>
                        ) : null}
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
                          <Label htmlFor="pname">If Image is not available then upload new12</Label>
                          <ImageUploader withIcon={false} buttonText="Player Image" withLabel={false} withPreview={false} onChange={this.onDropNewPlayer2} maxFileSize={100000
                          } />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.setNewImageOfPlayer2()}> Submit
                </Button>{' '}
            <Button color="secondary" onClick={this.showImageToggle2}>
              Cancel
                </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showImageModal1Update} toggle={this.showImageToggle1Update} className={'my-modal ' + this.props.className}>
          <ModalHeader toggle={this.showImageToggle1Update}>
            Update Image
            </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                <Card className="border-secondary">

                  <CardBody>
                    <ListGroup>
                      <Row>
                        {this.state.listOfPlayerImage1Update ? this.state.listOfPlayerImage1Update.map((player, index) =>
                          <ListGroupItem key={index} onClick={() => this.selectedImage1Update(player)} style={{ cursor: 'pointer' }} active={this.state.selectedImage1Update === player.id} >
                            <Col xs="4">
                              <img src={player.pimg} width="200" height="200" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} alt="" />
                            </Col>
                          </ListGroupItem>
                        ) : null}
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
                          <ImageUploader withIcon={false} buttonText="Player Image" withLabel={false} withPreview={false} onChange={this.onDropNewPlayer1Update} label='Max file size: 100kb' maxFileSize={100000} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.setNewImageOfPlayer1Update()}> Submit
                </Button>{' '}
            <Button color="secondary" onClick={this.showImageToggle1Update}>
              Cancel
                </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showImageModal2Update} toggle={this.showImageToggle2Update} className={'my-modal ' + this.props.className}>
          <ModalHeader toggle={this.showImageToggle2Update}>
            Update Image
            </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                <Card className="border-secondary">

                  <CardBody>
                    <ListGroup>
                      <Row>
                        {this.state.listOfPlayerImage2Update ? this.state.listOfPlayerImage2Update.map((player, index) =>
                          <ListGroupItem key={index} onClick={() => this.selectedImage2Update(player)} style={{ cursor: 'pointer' }} active={this.state.selectedImage2Update === player.id} >
                            <Col xs="4">
                              <img src={player.pimg} width="200" height="200" onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/players/dummy.png' }} alt="" />
                            </Col>
                          </ListGroupItem>
                        ) : null}
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
                          <ImageUploader withIcon={false} buttonText="Player Image" withLabel={false} withPreview={false} onChange={this.onDropNewPlayer2Update} label='Max file size: 100kb' maxFileSize={100000} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.setNewImageOfPlayer2Update()}> Submit
                </Button>{' '}
            <Button color="secondary" onClick={this.showImageToggle2Update}>
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
export default connect(mapStateToProps)(KabaddiMatch);
