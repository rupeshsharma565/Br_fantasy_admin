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
  Button,
  Input,
  Badge,
  Collapse,

} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as moment from 'moment';
//import { cricketActions} from '../../../_actions';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

class ActiveMatchScore extends Component {

  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange1 = this.onDateChange1.bind(this);
    this.onFocusChange1 = this.onFocusChange1.bind(this);
    this.searchMatchesList = this.searchMatchesList.bind(this);
    this.showImageToggle1 = this.showImageToggle1.bind(this);
    this.selectedImage1 = this.selectedImage1.bind(this);
    this.showImageToggle2 = this.showImageToggle2.bind(this);
    this.selectedImage2 = this.selectedImage2.bind(this);
    this.setNewImageOfPlayer1 = this.setNewImageOfPlayer1.bind(this);
    this.setNewImageOfPlayer2 = this.setNewImageOfPlayer2.bind(this);
    this.onDropNewPlayer1 = this.onDropNewPlayer1.bind(this);
    this.onDropNewPlayer2 = this.onDropNewPlayer2.bind(this);
    this.onChnageSearchMatch = this.onChnageSearchMatch.bind(this);
    this.state = {
      collapse: false,
      accordion: [false, false, false],
      custom: [true, false],
      status: 'Closed',
      isLoading: false,
      fadeIn: true,
      updateMachToggle: false,
      timeout: 300,
      teammatchlist: [],
      tabstatus: "tab1",
      teamdetails: {
        team1: {
          teamName: "",
          teamlogo: ""
        },
        team2: {
          teamName: "",
          teamlogo: ""
        }
      },
      teamScore: [],
      pageCount:0,
      pageno: 1,
    };
   
    this.showImageToggle1Update = this.showImageToggle1Update.bind(this);
    this.selectedImage1Update = this.selectedImage1Update.bind(this);
    this.showImageToggle2Update = this.showImageToggle2Update.bind(this);
    this.selectedImage2Update = this.selectedImage2Update.bind(this);
    this.setNewImageOfPlayer1Update = this.setNewImageOfPlayer1Update.bind(this);
    this.setNewImageOfPlayer2Update = this.setNewImageOfPlayer2Update.bind(this);
    this.onDropNewPlayer1Update = this.onDropNewPlayer1Update.bind(this);
    this.onDropNewPlayer2Update = this.onDropNewPlayer2Update.bind(this);
    
  }
  componentDidMount() {
    const config1 = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };
    let gameid=1;
    axios.get(CONST.BACKEND_URL + "/getplayertypeadmin/"+gameid, null, config1).then(response => {
      console.log('getactivematch  :: ', response.data);
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
  }
  componentWillReceiveProps(nextProps) { }
  toggleAccordion(matchDetails) {
    var formthis = this;
    formthis.setState({
      teammatchlist: {},
      team1name: "",
      team2name: "",
      teamselected: "",
      matchtype: "",
      teamdetails: {
        team1: {
          teamName: "",
          teamlogo: ""
        },
        team2: {
          teamName: "",
          teamlogo: ""
        }
      },
      teamScore: [],
      matchstatus: "",
    })

    if (matchDetails.matchid === this.state.isOpenAccordian) {
      this.setState({ isOpenAccordian: 0 });
    }
    else {
      this.setState({ isOpenAccordian: matchDetails.matchid });
      var object = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      var apiUrl = "";
      apiUrl = CONST.BACKEND_NODE_URL + '/match?matchid=' + matchDetails.matchid;//"http://172.104.186.169:9990/match?matchid="+matchid;

      fetch(apiUrl, object)
        .then(function (response) {
          response.json().then(json => {
            if (!json.error) {
              formthis.setState({
                teammatchlist: json.data.match,
                team1name: json.data.match.team[0]["name"],
                team2name: json.data.match.team[1]["name"],
                teamselected: json.data.match.team[0]["name"],
                matchtype: json.data.type,
                teamdetails: json.data.teamdetails,
                teamScore: json.data.teamScore,
                matchstatus: json.data.matchstatus,
              })
            }
            
          })
        })
    }
  }
  getActiveMatchList = (value) => {
    console.log(value);
    const config = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };
    var pageno = this.state.pageno;
    
    let data = {
      search: '',
      page : pageno,
      limit:CONST.PAGELIMIT,
      date1: '',
      date2: '',
    };
    axios.post(CONST.BACKEND_URL + `/api/getactivematchscore`, data, config).then(response => {
      console.log('getactivematch  :: ', response.data);
      if (response.data.code === 0) {
        let result = response.data.data.list.map(function (el, index) {
          var o = Object.assign({}, el);
          o.isOpenAccordian = false;
          return o;
        });
        var total_count =(response.data.data.total)?parseInt(response.data.data.total):0;        
        this.setState({
          activeMatchList: result,
          activeMatchListtotal: response.data.data.total,
          pageCount: Math.ceil(total_count / CONST.PAGELIMIT)
        });
      }
      else {
        this.setState({
          activeMatchList: [],
          pageCount:0
        });
        toast(response.data.msg);

      }
    }).catch(error => { });
  }


  searchMatchesList() {
    var pageno = this.state.pageno;
    const config = {
      headers: {
        Authorization: authHeader().Authorization
      }
    };

    console.log("p,l=",pageno,CONST.PAGELIMIT);
    
      let data = {};
      if (this.state.findmatch) {
        data['search'] = this.state.findmatch;
      }

      if (this.state.startDate) {
        data['date1'] = moment(this.state.startDate).format('DD-MM-YYYY');
      }
      if (this.state.endDate) {
        data['date2'] = moment(this.state.endDate).format('DD-MM-YYYY');
      }
      data['page'] = pageno;
      data['limit'] =CONST.PAGELIMIT;
    

      console.log("data=", data)
      axios.post(CONST.BACKEND_URL + `/api/getactivematchscore`, data, config).then(response => {
        console.log('getactivematch  :: ', response.data);
        if (response.data.code === 0) {
          let result = response.data.data.list.map(function (el, index) {
            var o = Object.assign({}, el);
            o.isOpenAccordian = false;
            return o;
          });

          var total_count =(response.data.data.total)?parseInt(response.data.data.total):0;        
          this.setState({
            activeMatchList: result,
            activeMatchListtotal: response.data.data.total,
            pageCount: Math.ceil(total_count / CONST.PAGELIMIT)
          });
        }
        else {
          this.setState({
            activeMatchList: [],
            pageCount:0
          });
          toast(response.data.msg);
        }
      }).catch(error => { });
  


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
      gametype: 'cricket',
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
        console.log('datadatadatadata  :: ', response.data.data);
        if (response.data.code === 0) {
          this.setState({
            listOfPlayerImage1: response.data.data
          });
          console.log('this.state.listOfPlayerImage1  :: ', this.state.listOfPlayerImage1);
        }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
    //this.props.dispatch(cricketActions.getPlayerImageByid(data));
  }
  selectedImage1(selectedPlayerImage) {
    console.log("selectedPlayerImage  ", selectedPlayerImage);
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
      axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config).then(response => {
        console.log('datadatadatadata  :: ', response.data);
        if (response.data.code === 0) {
          this.setState({
            listOfPlayerImage2: response.data.data
          });
          console.log('response.data.dataresponse.data.data ', response.data.data[0]);
        }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
    //this.props.dispatch(cricketActions.getPlayerImageByid(data));
  }
  selectedImage2(selectedPlayerImage) {
    console.log("selectedPlayerImage  ", selectedPlayerImage);
    this.setState({
      selectedImage2: selectedPlayerImage.id,
      selectedImageDetails2: selectedPlayerImage
    });
  }
  setNewImageOfPlayer1(player) {
    console.log("selectedImageDetails  ", this.state.selectedImageDetails1);
    console.log("selectedPlayer1  ", this.state.selectedPlayer1);
    console.log("this.state.playerList1  ", this.state.playerList1);
    let {
      playerList1
    } = this.state;
    let findindex = playerList1.findIndex(x => x.pid === this.state.selectedPlayer1.pid);
    console.log("findindex  ", findindex);
    playerList1[findindex].pimg = this.state.selectedImageDetails1.pimg;
    playerList1[findindex].playerimage = this.state.selectedImageDetails1.playerimage;
    this.setState({
      playerList1,
      showImageModal1: !this.state.showImageModal1
    });
  }
  setNewImageOfPlayer2(player) {
    console.log("selectedImageDetails2  ", this.state.selectedImageDetails2);
    console.log("selectedPlayer2  ", this.state.selectedPlayer2);
    console.log("this.state.playerList1  ", this.state.playerList2);
    let {
      playerList2
    } = this.state;
    let findindex = playerList2.findIndex(x => x.pid === this.state.selectedPlayer2.pid);
    console.log("findindex  ", findindex);
    playerList2[findindex].pimg = this.state.selectedImageDetails2.pimg;
    playerList2[findindex].playerimage = this.state.selectedImageDetails2.playerimage;
    this.setState({
      playerList2,
      showImageModal2: !this.state.showImageModal2
    });
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
      axios.post(CONST.BACKEND_URL + `/api/addplayerimg`, formData, config).then(response => {
        //alert("The file is successfully uploaded");
        if (response.data.code === 0) {
          console.log('addplayerimgaddplayerimgaddplayerimg  data ', response.data);
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
          axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1).then(response => {
            console.log('datadatadatadata  :: ', response.data.data);
            if (response.data.code === 0) {
              this.setState({
                listOfPlayerImage1: response.data.data
              });
              console.log('this.state.listOfPlayerImage1  :: ', this.state.listOfPlayerImage1);
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
      axios.post(CONST.BACKEND_URL + `/api/addplayerimg`, formData, config).then(response => {
        //alert("The file is successfully uploaded");
        if (response.data.code === 0) {
          console.log('addplayerimgaddplayerimgaddplayerimg  data ', response.data);
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
          axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1).then(response => {
            console.log('datadatadatadata  :: ', response.data.data);
            if (response.data.code === 0) {
              this.setState({
                listOfPlayerImage2: response.data.data
              });
              console.log('this.state.listOfPlayerImage2  :: ', this.state.listOfPlayerImage2);
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
        console.log('datadatadatadata  :: ', response.data.data);
        if (response.data.code === 0) {
          this.setState({
            listOfPlayerImage1Update: response.data.data
          });
          console.log('this.state.listOfPlayerImage1  :: ', this.state.listOfPlayerImage1Update);
        }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
    //this.props.dispatch(cricketActions.getPlayerImageByid(data));
  }
  selectedImage1Update(selectedPlayerImage) {
    console.log("selectedPlayerImage  ", selectedPlayerImage);
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
        console.log('datadatadatadata  :: ', response.data);
        if (response.data.code === 0) {
          this.setState({
            listOfPlayerImage2Update: response.data.data
          });
          console.log('response.data.dataresponse.data.data ', response.data.data[0]);
        }
        else {
          toast(response.data.msg);
        }
      }).catch(error => { });
    }
    //this.props.dispatch(cricketActions.getPlayerImageByid(data));
  }
  selectedImage2Update(selectedPlayerImage) {
    console.log("selectedPlayerImage  ", selectedPlayerImage);
    this.setState({
      selectedImage2Update: selectedPlayerImage.id,
      selectedImageDetails2Update: selectedPlayerImage
    });
  }
  setNewImageOfPlayer1Update(player) {
    console.log("selectedImageDetails  ", this.state.selectedImageDetails1Update);
    console.log("selectedPlayer1  ", this.state.selectedPlayer1Update);
    console.log("this.state.updatePlayerList1  ", this.state.updatePlayerList1);
    let {
      updatePlayerList1
    } = this.state;
    let findindex = updatePlayerList1.findIndex(x => x.pid === this.state.selectedPlayer1Update.pid);
    console.log("findindex  ", findindex);
    updatePlayerList1[findindex].pimg = this.state.selectedImageDetails1Update.pimg;
    updatePlayerList1[findindex].playerimage = this.state.selectedImageDetails1Update.playerimage;
    this.setState({
      updatePlayerList1,
      showImageModal1Update: !this.state.showImageModal1Update
    });
  }
  setNewImageOfPlayer2Update(player) {
    console.log("selectedImageDetails2Update  ", this.state.selectedImageDetails2Update);
    console.log("selectedPlayer2Update  ", this.state.selectedPlayer2Update);
    console.log("this.state.updatePlayerList2  ", this.state.updatePlayerList2);
    let {
      updatePlayerList2
    } = this.state;
    let findindex = updatePlayerList2.findIndex(x => x.pid === this.state.selectedPlayer2Update.pid);
    console.log("findindex  ", findindex);
    updatePlayerList2[findindex].pimg = this.state.selectedImageDetails2Update.pimg;
    updatePlayerList2[findindex].playerimage = this.state.selectedImageDetails2Update.playerimage;
    this.setState({
      updatePlayerList2,
      showImageModal2Update: !this.state.showImageModal2Update
    });
  }
  //Upload team logo
  onDropNewPlayer1Update(picture) {
    console.log(picture);
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
          console.log('addplayerimgaddplayerimgaddplayerimg  data ', response.data);
          console.log('response.', response.data.data);
          let data = {
            pid: this.state.selectedPlayer1Update.pid
          }
          const config1 = {
            headers: {
              'content-type': 'application/json',
              Authorization: authHeader().Authorization
            }
          };
          console.log("::::::::::::::::::::::::::::::::::::::: ", data);
          axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1).then(response => {
            console.log('datadatadatadata  :: ', response.data.data);
            if (response.data.code === 0) {
              this.setState({
                listOfPlayerImage1Update: response.data.data
              });
              console.log('this.state.listOfPlayerImage1  :: ', this.state.listOfPlayerImage1Update);
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
    console.log(picture);
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
          console.log('addplayerimgaddplayerimgaddplayerimg  data ', response.data);
          console.log('response.', response.data.data);
          let data = {
            pid: this.state.selectedPlayer2Update.pid
          }
          const config1 = {
            headers: {
              'content-type': 'application/json',
              Authorization: authHeader().Authorization
            }
          };
          console.log("::::::::::::::::::::::::::::::::::::::: ", data);
          axios.post(CONST.BACKEND_URL + `/api/getplayerimg`, data, config1).then(response => {
            console.log('datadatadatadata  :: ', response.data.data);
            if (response.data.code === 0) {
              this.setState({
                listOfPlayerImage2Update: response.data.data
              });
              console.log('this.state.listOfPlayerImage2  :: ', this.state.listOfPlayerImage2Update);
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
  
 
  onChnageSearchMatch(e) {
    console.log("e.target.value", e.target);
    this.setState({ [e.target.name]: e.target.value });
  }

  onClickActive = (e) => {
    this.setState({
      tabstatus: e.target.id,
      teamselected: e.target.innerHTML
    });
  }

  handlePageClick = (data) => {
    let formthis=this;
    let selected = data.selected;
    //let offset = Math.ceil(selected * 2);
    let pno = selected + 1;

console.log("pno=",pno);
    this.setState(
      { pageno: pno },
      () => {
        formthis.searchMatchesList();
      }
    );
  };

  render() {
    let formthis = this;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <Row >
                  <Col xs="2">
                    Matche Score
                  </Col>
                  <Col xs="2">
                    <SingleDatePicker
                      date={formthis.state.startDate}
                      onDateChange={formthis.onDateChange}
                      focused={formthis.state.calendarFocused}
                      onFocusChange={formthis.onFocusChange}
                      numberOfMonths={1}
                      small={true}
                      displayFormat="DD/MM/YYYY"
                      placeholder="Start Date"
                      isOutsideRange={day => (moment().diff(day) > 0)}
                    />
                  </Col>
                  <Col xs="2">
                    <SingleDatePicker
                      date={formthis.state.endDate}
                      onDateChange={formthis.onDateChange1}
                      focused={formthis.state.calendarFocused1}
                      onFocusChange={formthis.onFocusChange1}
                      small={true}
                      numberOfMonths={1}
                      isOutsideRange={day => (moment().diff(day) > 0)}
                      placeholder="End Date"
                      displayFormat="DD/MM/YYYY"
                    />
                  </Col>
                  <Col xs="2">
                    <Input type="text" placeholder="Search Match" name="findmatch" id="findmatch" autoComplete="off" value={formthis.state.findmatch} onChange={formthis.onChnageSearchMatch} />
                  </Col>
                  <Col xs="1">
                    <Button color="success" onClick={() => formthis.searchMatchesList()}> Find
                                </Button>
                  </Col>
                  <Col xs="1">
                    <Button color="info" onClick={() => formthis.resetMatch()}> Reset
                                </Button>
                  </Col>
                </Row>

              </CardHeader>
              <CardBody>
                {
                  formthis.state.activeMatchList ? formthis.state.activeMatchList.map((matchdetails, index) => (
                    <div id={matchdetails.matchid} key={matchdetails.matchid}>
                      <Card>
                        <CardHeader id="headingOne">
                          <Button block color="link" className="text-left m-0 p-0" onClick={() => formthis.toggleAccordion(matchdetails)} aria-expanded={formthis.state.accordion[0]} aria-controls="collapseOne">
                            {matchdetails.team1} V/S {matchdetails.team2}
                            <small className="for_margin_left">{moment(new Date(parseInt(matchdetails.mdategmt)*1000)).utcOffset("+05:30").format("YYYY-MM-DD HH:mm")}</small>
                          </Button>
                          {matchdetails.isactive === "1" && matchdetails.iscreated === "1" ? <Badge className="mr-1 float-right for_margin_top" color="success">Created</Badge> : null}
                        </CardHeader>
                        <Collapse isOpen={(formthis.state.isOpenAccordian === matchdetails.matchid) ? true : false} data-parent="#accordion" id={matchdetails.matchid} aria-labelledby="headingOne">
                          {(formthis.state.teamdetails.team1.teamName)?
                          (<div className="tab_area home_nttabsbox matchboxes_intels">
                          <div className="match_score">
                            <div>
                              <div className="teamvs_icon"><img src={formthis.state.teamdetails.team1.teamlogo} alt="image" /></div>
                              <div className="teamvs_name"> <span className="teamname_dinamic"> {formthis.state.teamdetails.team1.teamName} </span>
                                <span className="teamname_dinamic">
                                  {((formthis.state.teamScore.team1) ? formthis.state.teamScore.team1 : []).map(function (itemSc, indexSc) {
                                    var comm = "";
                                    if (formthis.state.teamScore.team1.length > (indexSc + 1)) {
                                      comm = ", ";
                                    }
                                    return (<span key={indexSc}>{itemSc.inningRun + " / " + itemSc.inningWicket + " (" + itemSc.inningOver + ")" + comm}</span>)
                                  })} </span></div>
                            </div>

                            <div><div className="teamvs_icon"><img src={this.state.teamdetails.team2.teamlogo} alt="image" /></div>
                              <div className="teamvs_name"> <span className="teamname_dinamic"> {this.state.teamdetails.team2.teamName} </span>
                                <span className="teamname_dinamic"> {((this.state.teamScore.team2) ? this.state.teamScore.team2 : []).map(function (itemSc, indexSc) {
                                  var comm = "";
                                  if (formthis.state.teamScore.team2.length > (indexSc + 1)) {
                                    comm = ", ";
                                  }
                                  return (<span key={indexSc}>{itemSc.inningRun + " / " + itemSc.inningWicket + " (" + itemSc.inningOver + ")" + comm}</span>)
                                })} </span></div>
                            </div>
                            </div>
                            <ul className="nav nav-pills">
                              <li className={"fullscr " + (("tab1" === formthis.state.tabstatus) ? "active" : "")} ><a id="tab1" onClick={formthis.onClickActive} data-toggle="tab pointernone">{formthis.state.team1name} </a></li>
                              <li className={"fullscr " + (("tab2" === formthis.state.tabstatus) ? "active" : "")} ><a id="tab2" onClick={formthis.onClickActive} data-toggle="tab pointernone">{formthis.state.team2name} </a></li>
                              {/* <li><a data-toggle="tab">Live </a></li>
                <li><a data-toggle="tab">Results </a></li>           */}
                            </ul>
                            <div className="tab-content clearfix">
                              <div className={"tab-pane active"} id="match1">
                                <div className="main_matchesallover">
                                  <ul>
                                    {
                                      ((formthis.state.teammatchlist["batting"]) ? formthis.state.teammatchlist["batting"] : []).map(function (itemPlayRole, indexPlayRole) {

                                        let findnameIndex = (itemPlayRole.title).indexOf(formthis.state.teamselected);
                                        if (findnameIndex > -1) {
                                          return (

                                            <div className="innings_fullmainbox" key={indexPlayRole}>
                                              <div className="innigs_teamfullscored">
                                                <h5>{itemPlayRole.title}
                                                  <span className="full_scoreright pull-right">
                                                  </span></h5>
                                              </div>
                                              <div className="full_scorealldetatable">
                                                <div className="table-responsive">
                                                  <table className="table table-bordered" >
                                                    <thead>
                                                      <tr>
                                                        <th> Batsman</th>
                                                        <th> 4s</th>
                                                        <th> 6s</th>
                                                        <th> B</th>
                                                        <th> R</th>
                                                        <th> SR</th>
                                                        <th> dismissal</th>
                                                        <th> dismissal-info</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {
                                                        itemPlayRole.scores.map(function (itemScores, indexScores) {

                                                          return (
                                                            <tr key={indexScores}>
                                                              <td> {itemScores["batsman"]} </td>
                                                              <td> {itemScores["4s"]} </td>
                                                              <td> {itemScores["6s"]} </td>
                                                              <td> {itemScores["B"]} </td>
                                                              <td> {itemScores["R"]} </td>
                                                              <td> {itemScores["SR"]} </td>
                                                              <td> {itemScores["dismissal"]} </td>
                                                              <td> {itemScores["dismissal-info"]} </td>
                                                            </tr>
                                                          )
                                                        })
                                                      }
                                                    </tbody>
                                                  </table>

                                                </div>
                                              </div>
                                            </div>
                                          )
                                        }
                                      })
                                    }

                                    {
                                      ((formthis.state.teammatchlist["bowling"]) ? formthis.state.teammatchlist["bowling"] : []).map(function (itemPlayRole, indexPlayRole) {

                                        let findnameIndex = (itemPlayRole.title).indexOf(formthis.state.teamselected);
                                        if (findnameIndex > -1) {
                                          return (

                                            <div className="innings_fullmainbox" key={indexPlayRole}>
                                              <div className="innigs_teamfullscored">
                                                <h5>{itemPlayRole.title} <span className="full_scoreright pull-right"></span></h5>
                                              </div>
                                              <div className="full_scorealldetatable">
                                                <div className="table-responsive">
                                                  <table className="table table-bordered" >
                                                    <thead>
                                                      <tr>
                                                        <th> Bowler</th>
                                                        <th> 0s</th>
                                                        <th> 4s</th>
                                                        <th> 6s</th>
                                                        <th> Econ</th>
                                                        <th> M</th>
                                                        <th> O</th>
                                                        <th> R</th>
                                                        <th> W</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {
                                                        itemPlayRole.scores.map(function (itemScores, indexScores) {

                                                          return (
                                                            <tr key={indexScores}>
                                                              <td> {itemScores["bowler"]} </td>
                                                              <td> {itemScores["0s"]} </td>
                                                              <td> {itemScores["4s"]} </td>
                                                              <td> {itemScores["6s"]} </td>
                                                              <td> {itemScores["Econ"]} </td>
                                                              <td> {itemScores["M"]} </td>
                                                              <td> {itemScores["O"]} </td>
                                                              <td> {itemScores["R"]} </td>
                                                              <td> {itemScores["W"]} </td>
                                                            </tr>
                                                          )
                                                        })
                                                      }
                                                    </tbody>
                                                  </table>

                                                </div>
                                              </div>
                                            </div>
                                          )
                                        }
                                      })
                                    }


                                    {
                                      ((formthis.state.teammatchlist["fielding"]) ? formthis.state.teammatchlist["fielding"] : []).map(function (itemPlayRole, indexPlayRole) {

                                        let findnameIndex = (itemPlayRole.title).indexOf(formthis.state.teamselected);
                                        if (findnameIndex > -1) {
                                          return (

                                            <div className="innings_fullmainbox" key={indexPlayRole}>
                                              <div className="innigs_teamfullscored">
                                                <h5>{itemPlayRole.title} <span className="full_scoreright pull-right"></span></h5>
                                              </div>
                                              <div className="full_scorealldetatable">
                                                <div className="table-responsive">
                                                  <table className="table table-bordered">
                                                    <thead>
                                                      <tr>
                                                        <th> Name</th>
                                                        <th> Bowled</th>
                                                        <th> Catch</th>
                                                        <th> LBW</th>
                                                        <th> Stumped</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {
                                                        itemPlayRole.scores.map(function (itemScores, indexScores) {

                                                          return (
                                                            <tr key={indexScores}>
                                                              <td> {itemScores["name"]} </td>
                                                              <td> {itemScores["bowled"]} </td>
                                                              <td> {itemScores["catch"]} </td>
                                                              <td> {itemScores["lbw"]} </td>
                                                              <td> {itemScores["stumped"]} </td>
                                                            </tr>
                                                          )
                                                        })
                                                      }
                                                    </tbody>
                                                  </table>

                                                </div>
                                              </div>
                                            </div>
                                          )
                                        }
                                      })
                                    }

                                  </ul>
                                </div>
                              </div>

                            </div>
                          </div>):"No score available."}
                        </Collapse>
                      </Card>
                    </div>
                  )) : null
                }

                <ReactPaginate previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages page-item"}
                  activeClassName={"active"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}
export default connect(mapStateToProps)(ActiveMatchScore);
