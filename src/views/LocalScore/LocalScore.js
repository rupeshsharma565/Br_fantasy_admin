import React, { Component } from 'react';
import Switch from 'react-switch';
import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Button,
  Input,
  Row,
  Col,
  Collapse,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { localscoreActions } from '../../_actions';
import Select from 'react-select';
import { CONST } from '../../_config';
import moment from 'moment'
import { log } from 'util';


class LocalScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      accordion: true,
      items: [],
      inninglist: [],
      multiSelect: [],
      matchlist: [],
      matchtypeselect: "",
      team1name: "",
      team2name: "",
      selectedmatches: [],
      battingteam: "",
      bowfieldteam: "",
      bowfieldlist: [],
      battinglist: [],
      matchstared: false,
      tosswinnerteam: "",
      manofthematch: {},
      winnerteam: {},
      opttosswinnerteam: [],
      optmanofthematch: [],
      optwinnerteam: [],
      matchid: "",
      callontime: 0,
      selectinninglist: [],
      selectteamlist: [],
      objfielding: {},
      objbowling: {},
      objbatting: {},
      selectbattinglist: [],
      objtosswinnerteam: {},
      scorelist: {},
      optdismissalby: [],
      optallmatchlist: [],
      scoretotalrun: 0,
      scoretotalover: 0,
      matchtype: "",
      currentInning: 0,
      bowledby: {},
      optallmatchobjlist: {},
      getTeam1SepList: [],
      getTeam2SepList: [],
      scoreboard: {},
      objscore: {},
      isDisableDissmBy: false,
      isDisableBowlBy: false,
      isDisableDissmByObj: {},
      isDisableBowlByObj: {},
      viewAllStatus: true,
      viewAllStatusName: "View All",
      statedismissal:{}
    };
    //this.handleSelectChangeMatchType = this.handleSelectChangeMatchType.bind(this);
    this.handleSelectChangeMatchs = this.handleSelectChangeMatchs.bind(this);
    this.handleSelectChangeBatting = this.handleSelectChangeBatting.bind(this);
    this.handleSelectChangeTossWTeam = this.handleSelectChangeTossWTeam.bind(this);
    this.handleSelectChangeMOMatch = this.handleSelectChangeMOMatch.bind(this);
    this.handleSelectChangeWinTeam = this.handleSelectChangeWinTeam.bind(this);
    this.handleSelectChangeBowFd = this.handleSelectChangeBowFd.bind(this);
    this.assignResourceSubAdminToggle = this.assignResourceSubAdminToggle.bind(this);
    this.assignResourceSubAdminToggleTeam2 = this.assignResourceSubAdminToggleTeam2.bind(this);
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(this);
    this.handleChangeCheckedResourceTeam2 = this.handleChangeCheckedResourceTeam2.bind(this);
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
    this.handleSelectChangeInning = this.handleSelectChangeInning.bind(this);
    this.handleChangeCheckedMatchStart = this.handleChangeCheckedMatchStart.bind(this);
    this.handleSelectChangeDismissal = this.handleSelectChangeDismissal.bind(this);
    this.handleSelectChangeDismissalBy = this.handleSelectChangeDismissalBy.bind(this);
    this.handleSelectChangeBowledBy = this.handleSelectChangeBowledBy.bind(this);
  }


  componentDidMount() {
    //this.props.dispatch(localscoreActions.getAllLocalScore());
    this.props.dispatch(localscoreActions.getLocalMatchList());
  }

  componentWillReceiveProps(nextProps) {
    let scoretotalrun = 0;
    let scoretotalover = 0;
    //////////////
    let { localscore } = this.props;
    let { localmatchlist } = localscore;

    if (nextProps.localscore.localmatchlist) {

      let arrayAllMatchList = [];
      let optallmatchobjlist = {};
      ((nextProps.localscore.localmatchlist) ? nextProps.localscore.localmatchlist : []).forEach(function (item) {
        arrayAllMatchList.push({ label: (item.matchname + "(" + moment(new Date(parseInt(item.mdate) * 1000)).utcOffset("+05:30").format("YYYY-MM-DD") + ")"), value: item.matchid, matchtype: item.mtype, team1: item.team1, team2: item.team2 });
        optallmatchobjlist[item.matchid] = { label: (item.matchname + "(" + moment(new Date(parseInt(item.mdate) * 1000)).utcOffset("+05:30").format("YYYY-MM-DD") + ")"), value: item.matchid, matchtype: item.mtype, team1: item.team1, team2: item.team2 };
      });

      this.setState({
        optallmatchlist: arrayAllMatchList,
        optallmatchobjlist: optallmatchobjlist
      })
    }

    //////////////////

    if (nextProps.localscore.listPlayers) {
      let arrayMatchList = [];
      ((nextProps.localscore.listPlayers[this.state.team1name]) ? nextProps.localscore.listPlayers[this.state.team1name] : []).forEach(function (item) {
        arrayMatchList.push({ label: item.pname, value: item.pid });
      });


      ((nextProps.localscore.listPlayers[this.state.team2name]) ? nextProps.localscore.listPlayers[this.state.team2name] : []).forEach(function (item) {
        arrayMatchList.push({ label: item.pname, value: item.pid });
      });

      ////////////Batting and Bowling//////////////
      let findInningIndex=(this.state.selectinninglist.value && this.state.selectinninglist.value>0)?(this.state.selectinninglist.value-1):0;
     
      let batsmanSelected=(nextProps.localscore.localmatchdetail && nextProps.localscore.localmatchdetail.match && nextProps.localscore.localmatchdetail.match.batting && nextProps.localscore.localmatchdetail.match.batting[findInningIndex] && nextProps.localscore.localmatchdetail.match.batting[findInningIndex].title);
      let BowlerSelected=(nextProps.localscore.localmatchdetail && nextProps.localscore.localmatchdetail.match && nextProps.localscore.localmatchdetail.match.bowling && nextProps.localscore.localmatchdetail.match.bowling[findInningIndex] && nextProps.localscore.localmatchdetail.match.bowling[findInningIndex].title);

      let arrayPlayerList = [];
      if(batsmanSelected && BowlerSelected)
      {
      let teamNameBattingSplit=batsmanSelected.split("-");
      let teamNameBatting=teamNameBattingSplit[0].trim();

      let teamNameBowlerSplit=BowlerSelected.split("-");
      let teamNameBowler=teamNameBowlerSplit[0].trim();
      ////////////////////////////////////////////
      
      if (teamNameBowler) {
        ((nextProps.localscore.listPlayers[teamNameBowler]) ? nextProps.localscore.listPlayers[teamNameBowler] : []).forEach(function (item) {
          arrayPlayerList.push({ label: (item.pname), value: item.pid, playerphoto: item.pimg });
        });
      }
    }

      let manofthematch = (nextProps.localscore.localmatchdetail && nextProps.localscore.localmatchdetail.match && nextProps.localscore.localmatchdetail.match["man-of-the-match"]) ? nextProps.localscore.localmatchdetail.match["man-of-the-match"] : "";
      let winnerteam = (nextProps.localscore.localmatchdetail && nextProps.localscore.localmatchdetail.match && nextProps.localscore.localmatchdetail.match["winner_team"]) ? nextProps.localscore.localmatchdetail.match["winner_team"] : "";
      this.setState({
        optmanofthematch: arrayMatchList,//man-of-the-match,
        manofthematch: { label: manofthematch },
        winnerteam: { label: winnerteam },
        // optdismissalby:arrOptdismissalby
        optdismissalby: arrayPlayerList,
        getTeam1SepList: nextProps.localscore.listPlayers[this.state.team1name],
        getTeam2SepList: nextProps.localscore.listPlayers[this.state.team2name]
      })
    }



    if (nextProps.localscore.localmatchdetail && nextProps.localscore.localmatchdetail.match) {
      let objtosswinnerteam = nextProps.localscore.localmatchdetail.match.toss_winner_team;
      let gfieldingteam = "";
      let gfieldinginning = 0;
      let gbattingteam = "";
      let gfieldingcount = (!(nextProps.localscore.localmatchdetail.match.fielding) || nextProps.localscore.localmatchdetail.match.fielding.length === 0) ? 0 : (nextProps.localscore.localmatchdetail.match.fielding.length - 1);



      if (nextProps.localscore.localmatchdetail.match.fielding && nextProps.localscore.localmatchdetail.match.fielding.length > 0) {
        let gfielding = nextProps.localscore.localmatchdetail.match.fielding[this.state.currentInning];//Raman
        //let gfieldingtitle=gfielding.title;
        let gfieldingteamsplit = ((gfielding) ? gfielding.title : "").split("-");
        gfieldingteam = (gfielding) ? gfieldingteamsplit[0].trim() : "";
        gfieldinginning = (gfielding) ? gfieldingteamsplit[1].trim() : null;
      }

      let gbattingcount = (!(nextProps.localscore.localmatchdetail.match.batting) || nextProps.localscore.localmatchdetail.match.batting.length === 0) ? 0 : (nextProps.localscore.localmatchdetail.match.batting.length - 1);

      if (nextProps.localscore.localmatchdetail.match.batting && nextProps.localscore.localmatchdetail.match.batting.length > 0) {
        let gbatting = nextProps.localscore.localmatchdetail.match.batting[this.state.currentInning];
        let gbattingteamsplit = (gbatting && gbatting.title) ? (gbatting.title).split("-") : "";
        gbattingteam = (gbatting) ? gbattingteamsplit[0].trim() : null;
      }


      this.setState({
        scorelist: nextProps.localscore.localmatchdetail.match,
        matchstared: nextProps.localscore.localmatchdetail.match.matchStarted,
        objtosswinnerteam: { label: objtosswinnerteam, value: objtosswinnerteam },
        //selectinninglist:{label:gfieldinginning},
        selectfieldinglist: { label: gfieldingteam },
        selectbattinglist: { label: gbattingteam },
        battingteam: gbattingteam
      });

      //let gfieldingtitle="";
      // let gfieldingteam="";
      // let gfieldinginning=0;
      let objfielding = {};
      //let objtosswinnerteam="";

      let getFielderList = [];
      if (nextProps.localscore.localmatchdetail.match.fielding && nextProps.localscore.localmatchdetail.match.fielding.length > 0) {

        let gfielding = nextProps.localscore.localmatchdetail.match.fielding[this.state.currentInning];
        // //let gfieldingtitle=gfielding.title;
        // let gfieldingteamsplit=(gfielding.title).split("-");
        // gfieldingteam=gfieldingteamsplit[0].trim();
        // gfieldinginning=gfieldingteamsplit[1].trim();

        if (nextProps.localscore.listPlayers) {
          {
            let sListPlayers = nextProps.localscore.listPlayers;
            getFielderList = sListPlayers[gfieldingteam];
          }



          let gfieldingscore = (gfielding && gfielding.scores && gfielding.scores.length > 0) ? gfielding.scores : [];

          gfieldingscore.forEach(function (itemField) {
            ///ADD///objfielding["name"+itemField["pid"]]=(itemField["name"])?itemField["name"]:"";
            objfielding["runout" + itemField["pid"]] = (itemField["runout"]) ? itemField["runout"] : 0;
            objfielding["stumped" + itemField["pid"]] = (itemField["stumped"]) ? itemField["stumped"] : 0;
            objfielding["bowled" + itemField["pid"]] = (itemField["bowled"]) ? itemField["bowled"] : 0;
            objfielding["lbw" + itemField["pid"]] = (itemField["lbw"]) ? itemField["lbw"] : 0;
            objfielding["catch" + itemField["pid"]] = (itemField["catch"]) ? itemField["catch"] : 0;
          });
        }

        // let arrOptdismissalby=[];

        // (nextProps.localscore.listPlayers[gfieldingteam]).forEach(function(item){
        //   arrOptdismissalby.push({label:item.pname ,value:item.pid});
        // });


        this.setState({
          // selectinninglist:{label:gfieldinginning},
          // selectfieldinglist:{label:gfieldingteam},
          objfielding: objfielding,
          bowfieldlist: getFielderList,
          bowfieldteam: gfieldingteam,
          //inningname:" - "+gfieldinginning,
          // optdismissalby:arrOptdismissalby
        })
      }


      ///Batting//
      //let gbattingcount=(!(nextProps.localscore.localmatchdetail.match.batting) || nextProps.localscore.localmatchdetail.match.batting.length===0)?0:(nextProps.localscore.localmatchdetail.match.batting.length -1);
      //let gbattingtitle="";
      //let gbattingteam="";
      //let gbattinginning=0;
      let objbatting = {};

      let getBattingList = [];
      if (nextProps.localscore.localmatchdetail.match.batting && nextProps.localscore.localmatchdetail.match.batting.length > 0) {
        let gbatting = nextProps.localscore.localmatchdetail.match.batting[this.state.currentInning];
        //gbattingtitle=gbatting.title;
        // let gbattingteamsplit=(gbatting.title).split("-");
        // gbattingteam=gbattingteamsplit[0].trim();
        // gbattinginning=gbattingteamsplit[1].trim();

        if (nextProps.localscore.listPlayers) {
          {
            let sListPlayers = nextProps.localscore.listPlayers;
            getBattingList = sListPlayers[gbattingteam];
          }


          let gbattingscore = (gbatting && gbatting.scores && gbatting.scores.length > 0) ? gbatting.scores : [];
          let totalscoreball = 0;
          gbattingscore.forEach(function (itemField) {
            if (itemField["pid"] === 0) {
              objbatting["detail"] = itemField["detail"];
              let removebra1 = (itemField["detail"]).split("(");
              removebra1 = removebra1[1].split(")");
              removebra1 = removebra1[0];
              removebra1 = removebra1.split(",");
              let arryScore = {};
              removebra1.forEach(function (itemSc) {
                let trimscr = itemSc.trim();
                trimscr = trimscr.split(" ");
                arryScore[trimscr[0]] = trimscr[1];
              })


              objbatting["exb"] = (arryScore["b"]) ? arryScore["b"] : 0;
              objbatting["exlb"] = (arryScore["lb"]) ? arryScore["lb"] : 0;
              objbatting["exnb"] = (arryScore["nb"]) ? arryScore["nb"] : 0;
              objbatting["exw"] = (arryScore["w"]) ? arryScore["w"] : 0;
              objbatting["expr"] = (arryScore["r"]) ? arryScore["r"] : 0;
              scoretotalrun = scoretotalrun + parseFloat(objbatting["exb"]) + parseFloat(objbatting["exlb"]) + parseFloat(objbatting["exnb"]) + parseFloat(objbatting["exw"]) + parseFloat(objbatting["expr"]);
            }
            else {
              //objbatting["dismissalby"+itemField["pid"]]=(itemField["dismissal-by"])?itemField["dismissal-by"]:{};
              ///ADD///objbatting["batsman"+itemField["pid"]]=(itemField["batsman"])?itemField["batsman"]:"";
              objbatting["dismissal" + itemField["pid"]] = (itemField["dismissal"]) ? itemField["dismissal"] : 0;
              objbatting["SR" + itemField["pid"]] = (itemField["SR"]) ? itemField["SR"] : 0;
              objbatting["6s" + itemField["pid"]] = (itemField["6s"]) ? itemField["6s"] : 0;
              objbatting["4s" + itemField["pid"]] = (itemField["4s"]) ? itemField["4s"] : 0;
              objbatting["B" + itemField["pid"]] = (itemField["B"]) ? itemField["B"] : 0;
              objbatting["R" + itemField["pid"]] = (itemField["R"]) ? itemField["R"] : 0;
              objbatting["WD" + itemField["pid"]] = (itemField["WD"]) ? itemField["WD"] : 0;
              objbatting["NB" + itemField["pid"]] = (itemField["NB"]) ? itemField["NB"] : 0;
              objbatting["dismissalinfo" + itemField["pid"]] = (itemField["dismissal-info"]) ? itemField["dismissal-info"] : 0;

              scoretotalrun = scoretotalrun + parseFloat(objbatting["R" + itemField["pid"]]);
              totalscoreball = totalscoreball + parseFloat(objbatting["B" + itemField["pid"]]);
            }

          });

          let dividball = (totalscoreball / 6).toFixed(0);
          let remenderball = (totalscoreball % 6) * 0.1;
          scoretotalover = dividball + remenderball;
        }

        this.setState({
          //selectinninglist:{label:gbattinginning},
          //selectbattinglist:{label:gbattingteam},
          objbatting: objbatting,
          bowfieldlist: getFielderList,
          multiSelect: getBattingList,
          // battingteam:gbattingteam,
          scoretotalrun: scoretotalrun,
          scoretotalover: scoretotalover
        })
      }


      let gbowlingcount = (!(nextProps.localscore.localmatchdetail.match.bowling) || nextProps.localscore.localmatchdetail.match.bowling.length === 0) ? 0 : (nextProps.localscore.localmatchdetail.match.bowling.length - 1);

      if (nextProps.localscore.localmatchdetail.match.bowling && nextProps.localscore.localmatchdetail.match.bowling.length > 0) {
        //let gbowlingtitle="";
        let gbowlingteam = "";
        let gbowlinginning = 0;
        let objbowling = {};
        let getBowlingList = [];

        let gbowling = nextProps.localscore.localmatchdetail.match.bowling[this.state.currentInning];//Raman Check
        //gbowlingtitle=gbowling.title;

        if (gbowling) {
          let gbowlingteamsplit = (gbowling.title).split("-");
          gbowlingteam = gbowlingteamsplit[0].trim();
          gbowlinginning = gbowlingteamsplit[1].trim();


          if (nextProps.localscore.listPlayers) {
            {
              let sListPlayers = nextProps.localscore.listPlayers;
              getBowlingList = sListPlayers[gbowlingteam];
            }


            let gbowlingscore = (gbowling && gbowling.scores && gbowling.scores.length > 0) ? gbowling.scores : [];

            gbowlingscore.forEach(function (itemBowling) {
              ///ADD///objbowling["bowler"+itemBowling["pid"]]=(itemBowling["bowler"])?itemBowling["bowler"]:"";
              objbowling["6s" + itemBowling["pid"]] = (itemBowling["6s"]) ? itemBowling["6s"] : 0;
              objbowling["4s" + itemBowling["pid"]] = (itemBowling["4s"]) ? itemBowling["4s"] : 0;
              objbowling["0s" + itemBowling["pid"]] = (itemBowling["0s"]) ? itemBowling["0s"] : 0;
              objbowling["Econ" + itemBowling["pid"]] = (itemBowling["Econ"]) ? itemBowling["Econ"] : 0;
              objbowling["W" + itemBowling["pid"]] = (itemBowling["W"]) ? itemBowling["W"] : 0;
              objbowling["R" + itemBowling["pid"]] = (itemBowling["R"]) ? itemBowling["R"] : 0;
              objbowling["M" + itemBowling["pid"]] = (itemBowling["M"]) ? itemBowling["M"] : 0;
              objbowling["WD" + itemBowling["pid"]] = (itemBowling["WD"]) ? itemBowling["WD"] : 0;
              objbowling["NB" + itemBowling["pid"]] = (itemBowling["NB"]) ? itemBowling["NB"] : 0;
              objbowling["O" + itemBowling["pid"]] = (itemBowling["O"]) ? itemBowling["O"] : 0;
            });
          }

          console.log("gbowlingteam----->>",gbowlingteam);
          
          this.setState({
            //selectinninglist:{label:gbowlinginning},
            selectbowlinglist: { label: gbowlingteam },
            objbowling: objbowling,
            bowfieldlist: getBowlingList,
            bowfieldteam: gbowlingteam,
            //inningname:" - "+gbowlinginning
          })
        }


      }


    }
  }

  // optionClicked(optionsList) {
  //   this.setState({ multiSelect: optionsList });
  // }
  // selectedBadgeClicked(optionsList) {
  //   this.setState({ multiSelect: optionsList });
  // }



  handleSelectChangeMatchs(e) {
    //this.getLocalMatchDetail(e.value);
    let formthis = this;
    let matchid = e.value;
    let arrytest = [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 }
    ];

    let arryodit20 = [
      { label: "1", value: 1 },
      { label: "2", value: 2 }
    ];

    if (e.matchtype === "Test") {
      this.setState({ inninglist: arrytest });
    }

    if (e.matchtype === "ODI" || e.matchtype === "Twenty20") {
      this.setState({ inninglist: arryodit20 });
    }
    let selectedmatches = [
      { label: e.team1, value: 1 },
      { label: e.team2, value: 2 }
    ];

    this.setState({
      matchtypeselect: "-" + e.matchtype,
      team1name: e.team1,
      team2name: e.team2,
      selectedmatches: selectedmatches,
      opttosswinnerteam: selectedmatches,
      optwinnerteam: selectedmatches,
      matchid: e.value,
      matchtype: e.matchtype
      //matchstared:scorelist.matchStarted,
      // selectinninglist:{label:gfieldinginning},
      // selectfieldinglist:{label:gfieldingteam},
      // objfielding:objfielding,
      // bowfieldlist:getFielderList
    }, () => {
      formthis.props.dispatch(localscoreActions.getPlayerList(matchid));
      formthis.props.dispatch(localscoreActions.getmatchdetail(matchid));
    })
  }

  getLocalMatchDetail = (matchid) => {
    this.props.dispatch(localscoreActions.getmatchdetail(matchid));
  }

  handleSelectChangeDismissal(pid, e) {
    let sisMulti = (e.label === "run-out") ? true : false;

    let val = e.value;
    let dissArrList1 = [0, 7, 4]; // bowled,lbw, hit wickets
    let dissArrList2 = [9]; // run out
    let dissArrList3 = [3, 5, 6, 8, 10]; // rest of cases
    let isDisableDissmBy = false;
    let isDisableBowlBy = false;
    if (dissArrList1.indexOf(val) > -1) {
      isDisableDissmBy = true;
    } else if (dissArrList2.indexOf(val) > -1) {
      isDisableBowlBy = true;
    } else if (dissArrList3.indexOf(val) > -1) {
      isDisableDissmBy = true;
      isDisableBowlBy = true;
    }
    let isDisableDissmByObj = this.state.isDisableDissmByObj;
    isDisableDissmByObj[pid] = isDisableDissmBy;

    let isDisableBowlByObj = this.state.isDisableBowlByObj;
    isDisableBowlByObj[pid] = isDisableBowlBy;

    let statedismissal=this.state.statedismissal;
    statedismissal[e.namepid]={ label: e.label };

    this.setState({
      //[e.namepid]: { label: e.label },
      statedismissal:statedismissal,
      ["isMulti" + pid]: sisMulti,
      isDisableDissmByObj: isDisableDissmByObj,
      isDisableBowlByObj: isDisableBowlByObj
    })
  }

  handleSelectChangeDismissalBy(pid, e) {
    
    let sdismissalby = null;
    if (this.state["isMulti" + pid] === true) {
      sdismissalby = []
      if (e.length > 0) {
        e.forEach(function (itemDissBy) {
          sdismissalby.push({ label: itemDissBy.label, value: itemDissBy.value });
        })
      }
    }
    else {
      sdismissalby = {};
      sdismissalby = { label: e.label, value: e.value };

    }



    this.setState({
      ["dismissalby" + pid]: sdismissalby
    })
  }

  handleSelectChangeBowledBy(pid, e) {
    let sbowledby = {};
    sbowledby = { label: e.label, value: e.value };
    this.setState({
      ["bowledby" + pid]: sbowledby
    })
  }

  handleSelectChangeBatting(e) {
    //let formthis=this;
    let { localscore } = this.props;
    let { listPlayers } = localscore;
    let arrayPlayerList = [];
    // ((listPlayers) ? (listPlayers[this.state.bowfieldteam]) : []).forEach(function (item) {
    //   arrayPlayerList.push({ label: (item.pname), value: item.pid, playerphoto: item.pimg });
    // });

    var listmult = ((listPlayers) ? listPlayers[e.label] : []);
    this.setState({
      battingteam: e.label,
      multiSelect: listmult,
      selectbattinglist: { label: e.label },
      //optdismissalby:arrayPlayerList
    }, () => {
      //formthis.assignResourceSubAdminToggle();
    });

  }


  handleSelectChangeTossWTeam(e) {

    // let arrayMatchList=[];
    // this.state.multiSelect.forEach(function(item){
    //   arrayMatchList.push({label:item.pname ,value:item.pid});
    // });

    // this.state.bowfieldlist.forEach(function(item){
    //   arrayMatchList.push({label:item.pname ,value:item.pid});
    // });

    this.setState({
      tosswinnerteam: e.label,
      //optmanofthematch:arrayMatchList,
      objtosswinnerteam: { label: e.label, value: e.label }
    });
  }

  handleSelectChangeMOMatch(e) {
    this.setState({ manofthematch: { label: e.label } });
  }

  handleSelectChangeWinTeam(e) {
    this.setState({ winnerteam: { label: e.label } });
  }

  handleSelectChangeBowFd(e) {
    //let formthis=this;
    let { localscore } = this.props;
    let { listPlayers } = localscore;

    // let arrayPlayerList=this.state.optmanofthematch;
    // (listPlayers[e.label]).forEach(function(item){
    //   arrayPlayerList.push({label:(item.pname),value:item.pid});
    // });

    let platmult = ((listPlayers) ? listPlayers[e.label] : []);
    this.setState({
      bowfieldteam: e.label,
      bowfieldlist: platmult,
      selectfieldinglist: { label: e.label }
      // optmanofthematch:arrayPlayerList
    }, () => {
      //formthis.assignResourceSubAdminToggleTeam2();
    });
  }

  assignResourceSubAdminToggle() {
    this.setState({
      assignResourceSubAdminModal: !this.state.assignResourceSubAdminModal
    });
  }

  assignResourceSubAdminToggleTeam2() {
    this.setState({
      assignResourceSubAdminModalTeam2: !this.state.assignResourceSubAdminModalTeam2
    });
  }


  handleChangeCheckedResource(resource) {
    let { multiSelect } = this.state;
    //let findelement=multiSelect.find(x => x.pid === resource.pid);
    let findindex = multiSelect.findIndex(x => x.pid === resource.pid);
    //let battinglist=[];
    //battinglist=this.state.battinglist;

    multiSelect[findindex].checketstatus = !multiSelect[findindex].checketstatus;
    this.setState({
      multiSelect,
    });

  }


  handleChangeCheckedResourceTeam2(resource) {
    //let formthis=this;
    let { bowfieldlist } = this.state;
    //let findelement=bowfieldlist.find(x => x.pid === resource.pid);
    let findindex = bowfieldlist.findIndex(x => x.pid === resource.pid);

    //let battinglist=[];
    //battinglist=this.state.battinglist;

    bowfieldlist[findindex].checketstatus = !bowfieldlist[findindex].checketstatus;
    this.setState({
      bowfieldlist,
    });

  }


  submitBattingPlayer(e) {

  }

  handleChangeAddSubAdmin(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSelectChangeInning(e) {
    let formthis = this;
    let objInning = {
      1: "1st Inning",
      2: "2nd Inning",
      3: "3rd Inning",
      4: "4th Inning",
    };


    this.setState({
      inningname: " - " + objInning[e.label],
      selectinninglist: { label: objInning[e.value], value: e.value },
      currentInning: (e.value > 0) ? (e.value - 1) : 0,
      statedismissal:{}
    }, () => {
      //formthis.props.dispatch(localscoreActions.getLocalMatchList());
      formthis.props.dispatch(localscoreActions.getPlayerList(formthis.state.matchid));
      formthis.props.dispatch(localscoreActions.getmatchdetail(formthis.state.matchid));
    });



  }



  updateFielding = (pid, plyname) => {
    if (this.state.matchstared != true || !this.state.selectbattinglist || !this.state.selectfieldinglist || !this.state.selectbattinglist.label || !this.state.selectfieldinglist.label || !this.state.matchstared || this.state.selectinninglist.length === 0 || !this.state.objtosswinnerteam) {
      alert("Matches, Match Start, Innings, Toss winner team, Batting, Bowling/Fielding is compulsory");

    } else {
      if (this.state.selectbattinglist.label === this.state.selectfieldinglist.label) {
        alert("Batting and Bowling team is not same.");
      } else {
        let formthis = this;
        let name = plyname;
        let runout = ((this.state["runout" + pid]) ? parseFloat(this.state["runout" + pid]) : 0) + ((formthis.state.objfielding["runout" + pid]) ? parseFloat(formthis.state.objfielding["runout" + pid]) : 0);
        let stumped = ((this.state["stumped" + pid]) ? parseFloat(this.state["stumped" + pid]) : 0) + ((formthis.state.objfielding["stumped" + pid]) ? parseFloat(formthis.state.objfielding["stumped" + pid]) : 0);
        let bowled = ((this.state["bowled" + pid]) ? parseFloat(this.state["bowled" + pid]) : 0) + ((formthis.state.objfielding["bowled" + pid]) ? parseFloat(formthis.state.objfielding["bowled" + pid]) : 0);
        let lbw = ((this.state["lbw" + pid]) ? parseFloat(this.state["lbw" + pid]) : 0) + ((formthis.state.objfielding["lbw" + pid]) ? parseFloat(formthis.state.objfielding["lbw" + pid]) : 0);
        let scatch = ((this.state["catch" + pid]) ? parseFloat(this.state["catch" + pid]) : 0) + ((formthis.state.objfielding["catch" + pid]) ? parseFloat(formthis.state.objfielding["catch" + pid]) : 0);

        let titlename = this.state.bowfieldteam + " " + this.state.inningname;

        let scorelist = this.state.scorelist;

        let stitlename = (((scorelist["fielding"]).filter(x => x.title === titlename)).length === 0) ? "" : ((scorelist["fielding"]).filter(x => x.title === titlename))[0].title;
        if (titlename === stitlename) {
          let indexfielding = (scorelist["fielding"]).findIndex(obj => obj["title"] === titlename);
          let playerid = (((scorelist["fielding"][indexfielding]["scores"]).filter(x => x.pid === pid)).length === 0) ? "" : (scorelist["fielding"][indexfielding]["scores"]).filter(x => x.pid === pid)[0].pid;
          if (pid === playerid) {
            let getindex = (scorelist["fielding"][indexfielding]["scores"]).findIndex(obj => obj["pid"] === pid);
            scorelist["fielding"][indexfielding]["scores"][getindex]["runout"] = runout;
            scorelist["fielding"][indexfielding]["scores"][getindex]["stumped"] = stumped;
            scorelist["fielding"][indexfielding]["scores"][getindex]["bowled"] = bowled;
            scorelist["fielding"][indexfielding]["scores"][getindex]["lbw"] = lbw;
            scorelist["fielding"][indexfielding]["scores"][getindex]["catch"] = scatch;
            scorelist["fielding"][indexfielding]["title"]=titlename;
          }
          else {
            (scorelist["fielding"][indexfielding]["scores"]).push({
              "name": name,
              "runout": runout,
              "stumped": stumped,
              "bowled": bowled,
              "lbw": lbw,
              "catch": scatch,
              "pid": pid
            });
            scorelist["fielding"][indexfielding]["title"]=titlename;
          }
        }
        else {
          let scores = [];
          scores.push({
            "name": name,
            "runout": runout,
            "stumped": stumped,
            "bowled": bowled,
            "lbw": lbw,
            "catch": scatch,
            "pid": pid
          });
          (scorelist["fielding"]).push({ "title": titlename, "scores": scores });
        }

        this.props.dispatch(localscoreActions.addLocalScore(this.state.matchid, this.state.matchtype, scorelist));
        this.setState({
          scorelist: scorelist,
          ["runout" + pid]: "",
          ["stumped" + pid]: "",
          ["bowled" + pid]: "",
          ["lbw" + pid]: "",
          ["catch" + pid]: ""
        });
      }
    }
  }

  updateBowling = (pid, plyname) => {
    if (this.state.matchstared != true || !this.state.selectbattinglist || !this.state.selectfieldinglist || !this.state.selectbattinglist.label || !this.state.selectfieldinglist.label || !this.state.matchstared || this.state.selectinninglist.length === 0 || !this.state.objtosswinnerteam) {
      alert("Matches, Match Start, Innings, Toss winner team, Batting, Bowling/Fielding is compulsory");

    } else {
      if (this.state.selectbattinglist.label === this.state.selectfieldinglist.label) {
        alert("Batting and Bowling team is not same.");
      } else {
        let formthis = this;
        let scorelist = this.state.scorelist;
        let s6s = parseFloat((this.state["6s" + pid]) ? this.state["6s" + pid] : 0) + ((formthis.state.objbowling["6s" + pid]) ? parseFloat(formthis.state.objbowling["6s" + pid]) : 0);
        let s4s = parseFloat((this.state["4s" + pid]) ? this.state["4s" + pid] : 0) + ((formthis.state.objbowling["4s" + pid]) ? parseFloat(formthis.state.objbowling["4s" + pid]) : 0);
        let s0s = parseFloat((this.state["0s" + pid]) ? this.state["0s" + pid] : 0) + ((formthis.state.objbowling["0s" + pid]) ? parseFloat(formthis.state.objbowling["0s" + pid]) : 0);
        //let sEcon=parseFloat((this.state["Econ"+pid])?this.state["Econ"+pid]:0)+((formthis.state.objbowling["Econ"+pid])?parseFloat(formthis.state.objbowling["Econ"+pid]):0);
        let sW = parseFloat((this.state["W" + pid]) ? this.state["W" + pid] : 0) + ((formthis.state.objbowling["W" + pid]) ? parseFloat(formthis.state.objbowling["W" + pid]) : 0);
        let sR = parseFloat((this.state["R" + pid]) ? this.state["R" + pid] : 0) + ((formthis.state.objbowling["R" + pid]) ? parseFloat(formthis.state.objbowling["R" + pid]) : 0);
        let sM = parseFloat((this.state["M" + pid]) ? this.state["M" + pid] : 0) + ((formthis.state.objbowling["M" + pid]) ? parseFloat(formthis.state.objbowling["M" + pid]) : 0);
        //let sO = parseFloat((this.state["O" + pid]) ? this.state["O" + pid] : 0) + ((formthis.state.objbowling["O" + pid]) ? parseFloat(formthis.state.objbowling["O" + pid]) : 0);

        

        /////////////
        // let totalInningOver=sO.toFixed(1);
        // let splitIO=(totalInningOver).split(".");
        // let qilply=parseInt(splitIO[1]);
        // console.log("qilply------1111--->>>>>>>>>>",splitIO);        
        
        // let totalOverBefore=parseInt(splitIO[0]);
        ///////////////
        let lastOver=((formthis.state.objbowling["O" + pid])?parseFloat(formthis.state.objbowling["O" + pid]):0).toFixed(1);
       /*
        lastOver=lastOver.toString().split(".")
        let lastOver1=parseFloat(lastOver[0]);
        let lastOver2=parseFloat(lastOver[1]);
        let totalOldOverBall=(lastOver1*6)+lastOver2;
        */
        let newOver=(((this.state["O" + pid])?parseFloat(this.state["O" + pid]):0).toFixed(1));
        /*
        let checkNewOver=newOver;
        newOver=newOver.toString().split(".");
        let newOver1=parseFloat(newOver[0]);
        let newOver2=parseFloat(newOver[1]);
        let totalOverNewBall=(newOver1*6)+newOver2;

        let addOldNew=(checkNewOver<0)?(totalOldOverBall-totalOverNewBall):(totalOldOverBall+totalOverNewBall);

        //let newOverCal=(totalOverBefore*6+qilply+lastOver);
      
        let getOver1=parseInt(addOldNew/6);
        let getOver2=(addOldNew%6);
        let finalResult=0;
        let decO=0;
        if(getOver2>5)
        {
          decO=getOver2-6;
          finalResult=(getOver1+1)+(decO*0.1);
        }
        else
        {
          finalResult=getOver1+(getOver2*0.1);
        }
        */
        
        let sO =this.calculateOvers(lastOver,newOver);

        let wD = parseFloat((this.state["WD" + pid]) ? this.state["WD" + pid] : 0) + ((formthis.state.objbowling["WD" + pid]) ? parseFloat(formthis.state.objbowling["WD" + pid]) : 0);
        let extrasW = (this.state["WD" + pid]) ? parseFloat(this.state["WD" + pid]) : 0;
        let nB = parseFloat((this.state["NB" + pid]) ? this.state["NB" + pid] : 0) + ((formthis.state.objbowling["NB" + pid]) ? parseFloat(formthis.state.objbowling["NB" + pid]) : 0);
        let extrasNB = (this.state["NB" + pid]) ? parseFloat(this.state["NB" + pid]) : 0;

        ////////////////////////////////////////////
        if (extrasW > 0 || extrasNB > 0) {
       
          // for scoreboard run update start
          let lastRun = (scorelist["score"][formthis.state.battingteam] && scorelist["score"][formthis.state.battingteam]['run']) ? parseFloat(scorelist["score"][formthis.state.battingteam]['run']) : 0;
          let extraTotalRun = extrasW + extrasNB + lastRun;
          //let Run = ((nB>0) ? parseFloat(this.state["exnb"]) : 0) + ((this.state["exw"]) ? parseFloat(this.state["exw"]) : 0) + ((this.state["expr"]) ? parseFloat(this.state["expr"]) : 0);
          scorelist["score"][formthis.state.battingteam]['run'] = extraTotalRun; //(extraTotalRun || scorelist["score"][formthis.state.battingteam]['run']) ? parseInt(extraTotalRun) + parseInt(scorelist["score"][formthis.state.battingteam]['run']) : 0;
          // for scoreboard run update end 



          let bttitlename = this.state.battingteam + " " + this.state.inningname;
          let indexbatting = (scorelist["batting"]).findIndex(obj => obj["title"] === bttitlename);

          let getExtraIndex = (scorelist["batting"][indexbatting]["scores"]).findIndex(obj => obj["batsman"] === "Extras");

          let getLastCount=(scorelist["batting"][indexbatting]["scores"]).length;

          if (getExtraIndex > -1) {
            let removebra1 = (scorelist["batting"][indexbatting]["scores"][getExtraIndex]["detail"]).split("(");
            removebra1 = removebra1[1].split(")");
            removebra1 = removebra1[0];
            removebra1 = removebra1.split(",");
            let arryScore = {};
            removebra1.forEach(function (itemSc) {
              let trimscr = itemSc.trim();
              trimscr = trimscr.split(" ");
              arryScore[trimscr[0]] = trimscr[1];
            })


            let extraB = (arryScore["b"]) ? parseInt(arryScore["b"]) : 0;
            let extraLB = (arryScore["lb"]) ? parseInt(arryScore["lb"]) : 0;
            let extraNB = (arryScore["nb"]) ? parseInt(arryScore["nb"]) + extrasNB : 0;
            let extraW = (arryScore["w"]) ? parseInt(arryScore["w"]) + extrasW : 0;
            let extraR = (arryScore["r"]) ? parseInt(arryScore["r"]) : 0;

            let totalextra = extraB + extraLB + extraNB + extraW + extraR;

            scorelist["batting"][indexbatting]["scores"][getExtraIndex]["detail"] = totalextra + " (lb " + extraLB + ", nb " + extraNB + ", w " + extraW + ", r " + extraR + ")";
            //scorelist["batting"][indexbatting]["title"]=bttitlename;

          } else {
            let extraB = 0;
            let extraLB = 0;
            let extraNB = extrasNB;
            let extraW = extrasW;
            let extraR = 0;

            let totalextra = extraB + extraLB + extraNB + extraW + extraR;


            let scores = scorelist["batting"][indexbatting]["scores"];
            let objBat = {
              "SR": "",
              "6s": "",
              "4s": "",
              "B": "",
              "R": "",
              "dismissal-info": "",
              "detail": totalextra + " (lb " + extraLB + ", nb " + extraNB + ", w " + extraW + ", r " + extraR + ")",
              "batsman": "Extras",
              "pid": 0
            };
            //scores.push(objBat);
            // if(getLastCount===0)
            // {
            //   (scorelist["batting"]).push({ "title": bttitlename, "scores": scores });
            // }else{
              (scorelist["batting"][indexbatting]["scores"]).push(objBat);
            //}
            
          }
        }


        ////////////////////////////////////////////

        // for scoreboard overs, wickets update start
        //let overs = parseFloat((this.state["O" + pid]) ? this.state["O" + pid] : 0);
        //let wickets = parseFloat((this.state["W" + pid]) ? this.state["W" + pid] : 0);
        //let totalover=(overs || scorelist["score"][formthis.state.battingteam]['overs']) ? parseFloat(overs) + parseFloat(scorelist["score"][formthis.state.battingteam]['overs']) : 0; //ttOver

        /*
        let totalover = parseFloat((this.state["O" + pid]) ? this.state["O" + pid] : 0) + ((scorelist["score"][formthis.state.battingteam]['overs']) ? parseFloat(scorelist["score"][formthis.state.battingteam]['overs']) : 0);
        
        /////////
        
        let totalInningOverT=totalover.toFixed(1);

        console.log("totalInningOverT----------->>>",totalInningOverT);
        let splitIOT=(totalInningOverT).split(".");
        
        let qilplyT=parseInt(splitIOT[1]);
        let totalOverBeforeT=parseInt(splitIOT[0]);
        let hhhT=0;
        let ttT=0;
        
        if(qilplyT>5)
        {
            hhhT=qilplyT-6;
            ttT=parseFloat(totalOverBeforeT) + parseFloat("1."+hhhT);
           
        }
        else
        {
         
          
            ttT=parseFloat(totalInningOverT);
        }
        */

        let lastTotalOver=((scorelist["score"][formthis.state.battingteam]['overs'])?parseFloat(scorelist["score"][formthis.state.battingteam]['overs']):0).toFixed(1);
        let newTotalOver=(((this.state["O" + pid])?parseFloat(this.state["O" + pid]):0).toFixed(1));

        let totalOver =this.calculateOvers(lastTotalOver,newTotalOver);

        ////////////
        scorelist["score"][formthis.state.battingteam]['overs'] =totalOver;
        //scorelist["score"][formthis.state.battingteam]['wickets'] = (wickets || scorelist["score"][formthis.state.battingteam]['wickets']) ? parseInt(wickets) + parseInt(scorelist["score"][formthis.state.battingteam]['wickets']) : 0;
        // for scoreboard overs, wickets update end 

        let sbowler = plyname;//this.state["bowler"+pid];
        let sEcon = (sR > 0 && sO) ? (sR / sO).toFixed(2) : 0;
        let titlename = this.state.bowfieldteam + " " + this.state.inningname;
        let stitlename = (((scorelist["bowling"]).filter(x => x.title === titlename)).length === 0) ? "" : ((scorelist["bowling"]).filter(x => x.title === titlename))[0].title;
        if (titlename === stitlename) {
          let indexbowling = (scorelist["bowling"]).findIndex(obj => obj["title"] === titlename);
          let playerid = (((scorelist["bowling"][indexbowling]["scores"]).filter(x => x.pid === pid)).length === 0) ? "" : (scorelist["bowling"][indexbowling]["scores"]).filter(x => x.pid === pid)[0].pid;
          if (pid === playerid) {
            let getindex = (scorelist["bowling"][indexbowling]["scores"]).findIndex(obj => obj["pid"] === pid);
            scorelist["bowling"][indexbowling]["scores"][getindex]["6s"] = s6s;
            scorelist["bowling"][indexbowling]["scores"][getindex]["4s"] = s4s;
            scorelist["bowling"][indexbowling]["scores"][getindex]["0s"] = s0s;
            scorelist["bowling"][indexbowling]["scores"][getindex]["Econ"] = sEcon;
            scorelist["bowling"][indexbowling]["scores"][getindex]["W"] = sW;
            scorelist["bowling"][indexbowling]["scores"][getindex]["R"] = sR;
            scorelist["bowling"][indexbowling]["scores"][getindex]["M"] = sM;
            scorelist["bowling"][indexbowling]["scores"][getindex]["WD"] = wD;
            scorelist["bowling"][indexbowling]["scores"][getindex]["NB"] = nB;
            scorelist["bowling"][indexbowling]["scores"][getindex]["O"] = sO;
            scorelist["bowling"][indexbowling]["scores"][getindex]["bowler"] = sbowler;
            scorelist["bowling"][indexbowling]["title"] = titlename;
          }
          else {
            (scorelist["bowling"][indexbowling]["scores"]).push({
              "6s": s6s,
              "4s": s4s,
              "0s": s0s,
              "Econ": sEcon,
              "W": sW,
              "R": sR,
              "M": sM,
              "WD": wD,
              "NB": nB,
              "O": sO,
              "bowler": sbowler,
              "pid": pid
            });
            scorelist["bowling"][indexbowling]["title"] = titlename;
          }
        }
        else {
          let scores = [];
          scores.push({
            "6s": s6s,
            "4s": s4s,
            "0s": s0s,
            "Econ": sEcon,
            "W": sW,
            "R": sR,
            "M": sM,
            "WD": wD,
            "NB": nB,
            "O": sO,
            "bowler": sbowler,
            "pid": pid
          });
          (scorelist["bowling"]).push({ "title": titlename, "scores": scores });
        }




        this.props.dispatch(localscoreActions.addLocalScore(this.state.matchid, this.state.matchtype, scorelist));
        this.setState({
          scorelist: scorelist,
          ["6s" + pid]: "",
          ["4s" + pid]: "",
          ["0s" + pid]: "",
          ["Econ" + pid]: "",
          ["W" + pid]: "",
          ["R" + pid]: "",
          ["M" + pid]: "",
          ["WD" + pid]: "",
          ["NB" + pid]: "",
          ["O" + pid]: ""
        });
      }
    }
  }


  calculateOvers=(lastOver,newOver)=>{
    let checkNewOverMinus=(newOver<0)?-1:1;
    newOver=(checkNewOverMinus<0)?(newOver*-1):newOver;
    //let lastOver=((parseFloat(formthis.state.objbowling["O" + pid]))?parseFloat(formthis.state.objbowling["O" + pid]):0).toFixed(1);
    lastOver=lastOver.toString().split(".")
    let lastOver1=(lastOver[0])?parseFloat(lastOver[0]):0;
    let lastOver2=(lastOver[1])?parseFloat(lastOver[1]):0;
    let totalOldOverBall=(lastOver1*6)+lastOver2;
    

    //let newOver=((parseFloat(this.state["O" + pid])?parseFloat(this.state["O" + pid]):0).toFixed(1));
    let checkNewOver=newOver;
    newOver=newOver.toString().split(".");
    let newOver1=(newOver[0])?parseFloat(newOver[0]):0;
    let newOver2=(newOver[1])?parseFloat(newOver[1]):0;
    if(newOver2>5){
      
    }
    let totalOverNewBall=(newOver1*6)+newOver2;

    
    

    let addOldNew=(checkNewOverMinus<0)?(totalOldOverBall-totalOverNewBall):(totalOldOverBall+totalOverNewBall);
    addOldNew=(addOldNew && addOldNew>-1)?addOldNew:0;
    
    console.log("addOldNew--->>>",addOldNew,totalOldOverBall,totalOverNewBall);
    //let newOverCal=(totalOverBefore*6+qilply+lastOver);
    let getOver1=parseInt(addOldNew/6);
    let getOver2=(addOldNew%6);
    let finalResult=0;
    let decO=0;
    if(getOver2>5)
    {
      decO=getOver2-6;
      return finalResult=((getOver1+1)+(decO*0.1)).toFixed(1);
      
    }
    else
    {
      return finalResult=(getOver1+(getOver2*0.1)).toFixed(1);
    }
  }


  updateBatting = (pid, plyname) => {
    if (this.state.matchstared != true || !this.state.selectbattinglist || !this.state.selectfieldinglist || !this.state.selectbattinglist.label || !this.state.selectfieldinglist.label || !this.state.matchstared || (this.state.selectinninglist.length === 0) || !this.state.objtosswinnerteam) {
      alert("Matches, Match Start, Innings, Toss winner team, Batting, Bowling/Fielding is compulsory");

    } else {
      if (this.state.selectbattinglist.label === this.state.selectfieldinglist.label) {
        alert("Batting and Bowling team is not same.");
      } else {
        let formthis = this;
        let dismissalby = null;
        let sdisinfo = "";
        let scorelist = this.state.scorelist;
        let ssdisby = this.state["dismissalby" + pid];

        if (this.state["dismissalby" + pid] && this.state["dismissalby" + pid].label) {
          dismissalby = { "name": ssdisby.label, "pid": ssdisby.value };
        }
        else
          if ((this.state["dismissalby" + pid]) && (this.state["dismissalby" + pid])) {

            if (ssdisby.length === 1) {
              dismissalby = {};
              dismissalby = { "name": ssdisby[0].label, "pid": ssdisby[0].value };
              sdisinfo = ssdisby[0].label;
            }

            if (ssdisby.length > 1) {
              dismissalby = [];
              let spash = "";

              ssdisby.forEach(function (itemDissBy, index) {
                dismissalby.push({ "name": itemDissBy.label, "pid": itemDissBy.value });
                if (index > 0) {
                  spash = "/ ";
                }
                sdisinfo = sdisinfo + spash + itemDissBy.label;

              })
              dismissalby = ssdisby
            }

          }

        let bowledby = null;
        let sbowlbyinfo = "";
        let sbowby = this.state["bowledby" + pid];

        // if(sbowby && sbowby.label)
        // {
        //   bowledby={"name":sbowby.label,"pid":sbowby.value};
        // }
        // else
        if (sbowby && sbowby.label) {
          bowledby = {};
          bowledby = { "name": sbowby.label, "pid": sbowby.value };
          sbowlbyinfo = sbowby.label;
        }

        let scal6s = ((this.state["6s" + pid]) ? parseFloat(this.state["6s" + pid]) : 0);
        let scal4s = ((this.state["4s" + pid]) ? parseFloat(this.state["4s" + pid]) : 0);

        //let dismissalby=((this.state["dismissalby"+pid])?(this.state["dismissalby"+pid]).label:((formthis.state.objbatting["dismissalby"+pid])?formthis.state.objbatting["dismissalby"+pid].name:""));
        let dismissal = ((this.state.statedismissal["dismissal" + pid]) ? (this.state.statedismissal["dismissal" + pid]).label : ((formthis.state.objbatting["dismissal" + pid]) ? formthis.state.objbatting["dismissal" + pid] : "not out"));
        let s6s = ((this.state["6s" + pid]) ? parseFloat(this.state["6s" + pid]) : 0) + ((formthis.state.objbatting["6s" + pid]) ? parseFloat(formthis.state.objbatting["6s" + pid]) : 0);
        let s4s = ((this.state["4s" + pid]) ? parseFloat(this.state["4s" + pid]) : 0) + ((formthis.state.objbatting["4s" + pid]) ? parseFloat(formthis.state.objbatting["4s" + pid]) : 0);
        let B = ((this.state["B" + pid]) ? parseFloat(this.state["B" + pid]) : 0) + ((formthis.state.objbatting["B" + pid]) ? parseFloat(formthis.state.objbatting["B" + pid]) : 0);
        let R = ((this.state["R" + pid]) ? parseFloat(this.state["R" + pid]) : 0) + (scal6s * 6) + (scal4s * 4) + ((formthis.state.objbatting["R" + pid]) ? parseFloat(formthis.state.objbatting["R" + pid]) : 0);
        let SR = parseFloat((R > 0 && B > 0 ? ((R * 100) / B).toFixed(2) : 0));//((this.state["SR"+pid])?parseFloat(this.state["SR"+pid]):0)+((formthis.state.objbatting["SR"+pid])?parseFloat(formthis.state.objbatting["SR"+pid]):0);

        //let dismissalinfo=(dismissal && dismissalby && bowledby)? ((dismissal==="run-out")?"run out ("+sdisinfo+")":dismissal+" c "+ssdisby.label) + " b " + sbowby.label:"not out";//this.state["dismissalinfo"+pid];
        let dismissalinfo = "";
        let ssdisbyLbl = (ssdisby && ssdisby.label) ? ssdisby.label : "";
        let sbowbyLbl = (sbowby && sbowby.label) ? sbowby.label : "";
       
       
        if (dismissal) {
          if ((dismissal === "run-out")) {
            dismissalinfo = "run out (" + sdisinfo + ")";
            //"run out ("+sdisinfo+")":dismissal+" c "+ssdisby.label) + " b " + sbowby.label
          } else if (dismissal === "lbw") {
            dismissalinfo = dismissal + " b " + sbowbyLbl;
          } else if (dismissal === "caught") {
            dismissalinfo = " c " + ssdisbyLbl + " b " + sbowbyLbl;//Raman Correct
          } else if (dismissal === "stumped") {
            dismissalinfo = " st " + ssdisbyLbl + " b " + sbowbyLbl;
          } else if (dismissal === "hit wicket") {
            dismissalinfo = dismissal + " b " + sbowbyLbl;
          } else if (dismissal === "bowled") {
            dismissalinfo = " b " + sbowbyLbl;
          }

          else if (dismissal === "hit the ball twice") {
            dismissalinfo = "hit the ball twice";//b
          } else if (dismissal === "obstructing the field") {
            dismissalinfo = "obstructing the field";//b
          } else if (dismissal === "timed-out") {
            dismissalinfo = "timed-out";//
          } else if (dismissal === "Handled the ball") {
            dismissalinfo = "Handled the ball";//b
          } else if (dismissal === "retired") {
            dismissalinfo = "retired";
          }

          else {
            dismissalinfo = dismissal;
          }
        } else {
          dismissalinfo = "not out"
        }
        let batsman = plyname;//this.state["batsman"+pid];

        // for scoreboard run update start
        let Run = ((this.state["R" + pid]) ? parseFloat(this.state["R" + pid]) : 0) + (scal6s * 6) + (scal4s * 4);
        scorelist["score"][formthis.state.battingteam]['run'] = (Run || scorelist["score"][formthis.state.battingteam]['run']) ? parseInt(Run) + parseInt(scorelist["score"][formthis.state.battingteam]['run']) : 0;
        // for scoreboard run update end 

        let titlename = this.state.battingteam + " " + this.state.inningname;
        let stitlename = (((scorelist["batting"]).filter(x => x.title === titlename)).length === 0) ? "" : ((scorelist["batting"]).filter(x => x.title === titlename))[0].title;
        console.log("titlename === stitlename---->>>",titlename, stitlename);
        
        if (titlename === stitlename) {
          let indexbatting = (scorelist["batting"]).findIndex(obj => obj["title"] === titlename);
          let playerid = (((scorelist["batting"][indexbatting]["scores"]).filter(x => x.pid === pid)).length === 0) ? "" : (scorelist["batting"][indexbatting]["scores"]).filter(x => x.pid === pid)[0].pid;
          if (pid === playerid) {
            let getindex = (scorelist["batting"][indexbatting]["scores"]).findIndex(obj => obj["pid"] === pid);
            if (dismissalby) {
              scorelist["batting"][indexbatting]["scores"][getindex]["dismissal-by"] = dismissalby;//(dismissalbyid && dismissalby)?{"name":dismissalby,"pid":dismissalbyid}:{};
            }
            scorelist["batting"][indexbatting]["scores"][getindex]["dismissal"] = dismissal;
            scorelist["batting"][indexbatting]["scores"][getindex]["SR"] = SR;
            scorelist["batting"][indexbatting]["scores"][getindex]["6s"] = s6s;
            scorelist["batting"][indexbatting]["scores"][getindex]["4s"] = s4s;
            scorelist["batting"][indexbatting]["scores"][getindex]["B"] = B;
            scorelist["batting"][indexbatting]["scores"][getindex]["R"] = R;
            scorelist["batting"][indexbatting]["scores"][getindex]["dismissal-info"] = dismissalinfo;
            scorelist["batting"][indexbatting]["scores"][getindex]["bowledby"] = bowledby;
            scorelist["batting"][indexbatting]["title"]=titlename;
          }
          else {
            let objBat = {
              "dismissal": dismissal,
              "SR": SR,
              "6s": s6s,
              "4s": s4s,
              "B": B,
              "R": R,
              "dismissal-info": dismissalinfo,
              "batsman": batsman,
              "pid": pid,
              "bowledby": bowledby
            }
              ;
            if (dismissalby) {
              objBat["dismissal-by"] = dismissalby;
            }
            (scorelist["batting"][indexbatting]["scores"]).push(objBat);
            scorelist["batting"][indexbatting]["title"]=titlename;
          }

          ///////////////////////////////
          // for scoreboard run update start
          //let countOut=((scorelist["batting"][indexbatting]["scores"]).filter(x=>x.dismissal=="caught" || x.dismissal=="stumped" || x.dismissal=="hit the ball twice" || x.dismissal=="hit wicket" || x.dismissal=="obstructing the field" || x.dismissal=="timed-out" || x.dismissal=="lbw" || x.dismissal=="Handled the ball" || x.dismissal=="run-out");
          let totalWicket=0;
          (scorelist["batting"][indexbatting]["scores"]).forEach(tirem => {
            if(tirem.dismissal==="bowled" || tirem.dismissal==="caught" || tirem.dismissal==="stumped" || tirem.dismissal==="hit the ball twice" || tirem.dismissal==="hit wicket" || tirem.dismissal==="obstructing the field" || tirem.dismissal==="timed-out" || tirem.dismissal==="lbw" || tirem.dismissal==="Handled the ball" || tirem.dismissal==="run-out")
            {
              totalWicket=totalWicket+1;
            }
          })
          scorelist["score"][formthis.state.battingteam]['wickets']=totalWicket;
          //((scorelist["batting"][indexbatting]["scores"].foracj)
          //scorelist["score"][formthis.state.battingteam]['overs']=(scorelist["batting"][indexbatting]["scores"].filter(x=>x.dismissal=="caught" || x.dismissal=="stumped" || x.dismissal=="hit the ball twice" || x.dismissal=="hit wicket" || x.dismissal=="obstructing the field" || x.dismissal=="timed-out" || x.dismissal=="lbw" || x.dismissal=="Handled the ball" || x.dismissal=="run-out"))
          // for scoreboard run update end 
          /////////////////////////////////
        }
        else {
          let scores = [];
          let objBat = {
            "dismissal": dismissal,
            "SR": SR,
            "6s": s6s,
            "4s": s4s,
            "B": B,
            "R": R,
            "dismissal-info": dismissalinfo,
            "batsman": batsman,
            "pid": pid,
            "bowledby": bowledby
          };
          if (dismissalby) {
            objBat["dismissal-by"] = dismissalby;
          }
          scores.push(objBat);
          (scorelist["batting"]).push({ "title": titlename, "scores": scores });
        }



        this.props.dispatch(localscoreActions.addLocalScore(this.state.matchid, this.state.matchtype, scorelist));
        this.setState({
          scorelist: scorelist,
          ["SR" + pid]: "",
          ["6s" + pid]: "",
          ["4s" + pid]: "",
          ["B" + pid]: "",
          ["R" + pid]: "",
          //"statedismissal":{}
        });

      }
    }

  }

  updateScoreBoard = () => {
    let pid = 0;
    let formthis = this;
    let run = ((this.state["run"]) ? parseInt(this.state["run"]) : 0) + ((formthis.state.scorelist['score'][formthis.state.battingteam]) ? parseInt(formthis.state.scorelist['score'][formthis.state.battingteam]["run"]) : 0);
    let overs = ((this.state["overs"]) ? parseFloat(this.state["overs"]) : 0) + ((formthis.state.scorelist['score'][formthis.state.battingteam]) ? parseFloat(formthis.state.scorelist['score'][formthis.state.battingteam]["overs"]) : 0);
    let wickets = ((this.state["wickets"]) ? parseInt(this.state["wickets"]) : 0) + ((formthis.state.scorelist['score'][formthis.state.battingteam]) ? parseInt(formthis.state.scorelist['score'][formthis.state.battingteam]["wickets"]) : 0);
  }

  viewAllPlayers = () => {
    let formthis = this;
    if (this.state.matchstared != true || !this.state.selectbattinglist || !this.state.selectfieldinglist || !this.state.selectbattinglist.label || !this.state.selectfieldinglist.label || !this.state.matchstared || (this.state.selectinninglist.length === 0) || !this.state.objtosswinnerteam) {
      alert("Matches, Match Start, Innings, Toss winner team, Batting, Bowling/Fielding is compulsory");

    } else {
      if (this.state.selectbattinglist.label === this.state.selectfieldinglist.label) {
        alert("Batting and Bowling team is not same.");
      } else {

        let { multiSelect, bowfieldlist } = this.state;
        multiSelect.forEach(item => {
          item.checketstatus = this.state.viewAllStatus;
        })
        bowfieldlist.forEach(item => {
          item.checketstatus = this.state.viewAllStatus;
        })

        this.setState({
          multiSelect,
          bowfieldlist,
          viewAllStatus: !formthis.state.viewAllStatus,
          viewAllStatusName: (formthis.state.viewAllStatus) ? "Unselect" : "View All"
        });
      }
    }

  }

  updateBattingExtras = () => {

    if (this.state.matchstared != true || !this.state.selectbattinglist || !this.state.selectfieldinglist || !this.state.selectbattinglist.label || !this.state.selectfieldinglist.label || !this.state.matchstared || this.state.selectinninglist.length === 0 || !this.state.objtosswinnerteam) {
      alert("Matches, Match Start, Innings, Toss winner team, Batting, Bowling/Fielding is compulsory");

    } else {
      if (this.state.selectbattinglist.label === this.state.selectfieldinglist.label) {
        alert("Batting and Bowling team is not same.");
      } else {
        let pid = 0;
        let formthis = this;
        let scorelist = this.state.scorelist;
        let exb = ((this.state["exb"]) ? parseFloat(this.state["exb"]) : 0) + ((formthis.state.objbatting["exb"]) ? parseFloat(formthis.state.objbatting["exb"]) : 0);
        let exlb = ((this.state["exlb"]) ? parseFloat(this.state["exlb"]) : 0) + ((formthis.state.objbatting["exlb"]) ? parseFloat(formthis.state.objbatting["exlb"]) : 0);
        let exnb = ((this.state["exnb"]) ? parseFloat(this.state["exnb"]) : 0) + ((formthis.state.objbatting["exnb"]) ? parseFloat(formthis.state.objbatting["exnb"]) : 0);
        let exw = ((this.state["exw"]) ? parseFloat(this.state["exw"]) : 0) + ((formthis.state.objbatting["exw"]) ? parseFloat(formthis.state.objbatting["exw"]) : 0);
        let expr = ((this.state["expr"]) ? parseFloat(this.state["expr"]) : 0) + ((formthis.state.objbatting["expr"]) ? parseFloat(formthis.state.objbatting["expr"]) : 0);
        let detailper = "";//(exb+exlb+exnb+exw+expr);
        let detailtotal = (exb + exlb + exnb + exw + expr);
        let batsman = "Extras";

        // for scoreboard run update start
        let Run = ((this.state["exb"]) ? parseFloat(this.state["exb"]) : 0) + ((this.state["exlb"]) ? parseFloat(this.state["exlb"]) : 0) + ((this.state["exnb"]) ? parseFloat(this.state["exnb"]) : 0) + ((this.state["exw"]) ? parseFloat(this.state["exw"]) : 0) + ((this.state["expr"]) ? parseFloat(this.state["expr"]) : 0);
        scorelist["score"][formthis.state.battingteam]['run'] = (Run || scorelist["score"][formthis.state.battingteam]['run']) ? parseInt(Run) + parseInt(scorelist["score"][formthis.state.battingteam]['run']) : 0;
        // for scoreboard run update end 

        let comm = "";
        let chkcomm = 0;
        if (exb != 0) {
          chkcomm = 1;
          detailper = detailper + comm + "b " + exb;
        }
        else {
          chkcomm = 0;
        }

        comm = (chkcomm === 1) ? ", " : "";
        detailper = detailper + comm + "lb " + exlb;
        chkcomm = 1;

        comm = (chkcomm === 1) ? ", " : "";
        detailper = detailper + comm + "nb " + exnb;
        chkcomm = 1;

        comm = (chkcomm === 1) ? ", " : "";
        detailper = detailper + comm + "w " + exw;
        chkcomm = 1;

        comm = (chkcomm === 1) ? ", " : "";
        detailper = detailper + comm + "r " + expr;
        //}

        let titlename = this.state.battingteam + " " + this.state.inningname;
        let stitlename = (((scorelist["batting"]).filter(x => x.title === titlename)).length === 0) ? "" : ((scorelist["batting"]).filter(x => x.title === titlename))[0].title;
        if (titlename === stitlename) {
          let indexbatting = (scorelist["batting"]).findIndex(obj => obj["title"] === titlename);
          let playerid = (((scorelist["batting"][indexbatting]["scores"]).filter(x => x.pid === pid)).length === 0) ? "" : (scorelist["batting"][indexbatting]["scores"]).filter(x => x.pid === pid)[0].pid;
          if (pid === playerid) {
            let getindex = (scorelist["batting"][indexbatting]["scores"]).findIndex(obj => obj["pid"] === pid);
            scorelist["batting"][indexbatting]["scores"][getindex]["detail"] = detailtotal + " (" + detailper + ")";
          }
          else {
            let objBat = {
              "SR": "",
              "6s": "",
              "4s": "",
              "B": "",
              "R": "",
              "dismissal-info": "",
              "detail": detailtotal + " (" + detailper + ")",
              "batsman": batsman,
              "pid": pid
            };
            (scorelist["batting"][indexbatting]["scores"]).push(objBat);
          }
        }
        else {
          let scores = [];
          let objBat = {
            "SR": "",
            "6s": "",
            "4s": "",
            "B": "",
            "R": "",
            "dismissal-info": "",
            "detail": detailtotal + " (" + detailper + ")",
            "batsman": batsman,
            "pid": pid
          };
          scores.push(objBat);
          (scorelist["batting"]).push({ "title": titlename, "scores": scores });
        }


        this.props.dispatch(localscoreActions.addLocalScore(this.state.matchid, this.state.matchtype, scorelist));
        this.setState({
          scorelist: scorelist,
          ["exb"]: "",
          ["exlb"]: "",
          ["exnb"]: "",
          ["exw"]: "",
          ["expr"]: ""
        });

      }
    }
  }


  onChangeScore = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleChangeCheckedMatchStart(e) {
    this.setState({ matchstared: !this.state.matchstared });

  }

  updateScore = () => {
    let formthis = this;
    let scorelist = this.state.scorelist;
    let batInningCnt=0;
    let titlename = this.state.battingteam + " " + this.state.inningname;
    (scorelist["batting"]?scorelist["batting"]:[]).forEach(itemTitle=>{
      if((itemTitle.title).indexOf(this.state.battingteam)>-1){
        let stitlename = ((((scorelist["batting"]) ? scorelist["batting"] : []).filter(x => x.title === titlename)).length === 0) ? "" : ((scorelist["batting"]).filter(x => x.title === titlename))[0].title;
        if (titlename !== stitlename) {
          batInningCnt=batInningCnt+1;
        }

      }
    })
    let titlename2 = this.state.bowfieldteam + " " + this.state.inningname;
    let bowlInningCnt=0;
        (scorelist["bowling"]?scorelist["bowling"]:[]).forEach(itemTitle=>{
          if((itemTitle.title).indexOf(this.state.bowfieldteam)>-1){
            
            let stitlename2 = ((((scorelist["bowling"]) ? scorelist["bowling"] : []).filter(x => x.title === titlename2)).length === 0) ? "" : ((scorelist["bowling"]).filter(x => x.title === titlename2))[0].title;
            console.log("titlename2 !== stitlename2--->>>",titlename2, stitlename2);
            if (titlename2 !== stitlename2) {
            bowlInningCnt=bowlInningCnt+1;
            }
          }
        })


    if (this.state.matchstared != true || !this.state.selectbattinglist || !this.state.selectfieldinglist || !this.state.selectbattinglist.label || !this.state.selectfieldinglist.label || !this.state.matchstared || this.state.selectinninglist.length === 0 || !this.state.objtosswinnerteam) {
      alert("Matches, Match Start, Innings, Toss winner team, Batting, Bowling/Fielding is compulsory");

    } else {
      if (this.state.selectbattinglist.label === this.state.selectfieldinglist.label) {
        alert("Batting and Bowling team is not same.");
      } else 
      if (batInningCnt>0 && bowlInningCnt>0) {
        alert("These teams already selected in previous inning.");
      }else{

       
        // score key added
        if (!scorelist.hasOwnProperty('score')) {
          scorelist["score"] = {
            [formthis.state.battingteam]: {
              "run": 0,
              "overs": 0,
              "wickets": 0
            },
            [formthis.state.bowfieldteam]: {
              "run": 0,
              "overs": 0,
              "wickets": 0
            }
          };
        }
        scorelist["man-of-the-match"] = (this.state.manofthematch && this.state.manofthematch.label) ? this.state.manofthematch.label : "";
        scorelist["toss_winner_team"] = this.state.objtosswinnerteam.value;//this.state.tosswinnerteam;
        scorelist["winner_team"] = (this.state.winnerteam && this.state.winnerteam.label) ? this.state.winnerteam.label : "";
        scorelist["matchStarted"] = this.state.matchstared;
        scorelist["team"] = [];


        //scorelist["batting"]=[];
        //scorelist["bowling"]=[];
        //scorelist["fielding"]=[];
        /////////////
        
       
        
       
        
        let stitlename = ((((scorelist["batting"]) ? scorelist["batting"] : []).filter(x => x.title === titlename)).length === 0) ? "" : ((scorelist["batting"]).filter(x => x.title === titlename))[0].title;
        console.log("titlename !== stitlename--->>>",titlename, stitlename);
        if (titlename !== stitlename) {
          //(scorelist["fielding"]).push({"title":titlename,"scores":[]});
          //(scorelist["bowling"]).push({"title":titlename,"scores":[]});
          if (!(scorelist["batting"])) {
            scorelist["batting"] = [];
          }
          (scorelist["batting"]).push({ "title": titlename, "scores": [] });
        }
      
        

        
        
        let stitlename2 = ((((scorelist["bowling"]) ? scorelist["bowling"] : []).filter(x => x.title === titlename2)).length === 0) ? "" : ((scorelist["bowling"]).filter(x => x.title === titlename2))[0].title;
        console.log("titlename2 !== stitlename2--->>>",titlename2, stitlename2);
        if (titlename2 !== stitlename2) {
          if (!(scorelist["fielding"])) {
            scorelist["fielding"] = [];
          }
          if (!(scorelist["bowling"])) {
            scorelist["bowling"] = [];
          }
          (scorelist["fielding"]).push({ "title": titlename2, "scores": [] });
          (scorelist["bowling"]).push({ "title": titlename2, "scores": [] });
        }
      
        ///////////////
        //if(this.state.multiSelect && this.state.multiSelect.length>0  && this.state.bowfieldlist && this.state.bowfieldlist.length>0){
        let teambattinglist = [];
        let teambowfieldlist = [];
        this.state.getTeam1SepList.forEach((itemBatting) => {
          teambattinglist.push({ "pid": itemBatting.pid, "name": itemBatting.pname });
        })
        this.state.getTeam2SepList.forEach((itemBowl) => {
          teambowfieldlist.push({ "pid": itemBowl.pid, "name": itemBowl.pname });
        })


        // if(this.state.optallmatchobjlist[this.state.matchid].team1===this.state.battingteam) 
        // {
        //   scorelist["team"][0]={"players":teambattinglist,"name":this.state.battingteam};
        // }
        // if(this.state.optallmatchobjlist[this.state.matchid].team1===this.state.bowfieldteam) 
        // {
        //   scorelist["team"][0]={"players":teambowfieldlist,"name":this.state.bowfieldteam};
        // }

        // if(this.state.optallmatchobjlist[this.state.matchid].team2===this.state.battingteam) 
        // {
        //   scorelist["team"][1]={"players":teambattinglist,"name":this.state.battingteam};
        // }
        // if(this.state.optallmatchobjlist[this.state.matchid].team2===this.state.bowfieldteam) 
        // {
        //   scorelist["team"][1]={"players":teambowfieldlist,"name":this.state.bowfieldteam};
        // }

        scorelist["team"] = [{ "players": teambattinglist, "name": this.state.team1name },
        { "players": teambowfieldlist, "name": this.state.team2name }];
        //}  

        ////////////////
        this.setState({ scorelist: scorelist });
        this.props.dispatch(localscoreActions.addLocalScore(this.state.matchid, this.state.matchtype, scorelist));
      }
    }
  }


  onClickSelectBatsman = () => {
    this.assignResourceSubAdminToggle();
  }

  onClickSelectBowler = () => {
    this.assignResourceSubAdminToggleTeam2();
  }

  render() {
    let formthis = this;

    return (
      <div className="animated fadeIn ">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Add Scores
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody className="ftcardbody">

                <Card>
                  <Row>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="pid">Matches</Label>
                        <Select options={this.state.optallmatchlist}
                          name="addStatus"
                          value={this.state.selectedOption}
                          onChange={this.handleSelectChangeMatchs}
                          isSearchable={true} />
                      </FormGroup>

                    </Col>



                    <Col xs="2">
                      <Label htmlFor="pid">Match Start</Label>
                      <br />
                      <Switch
                        className="float-left"
                        onChange={() => this.handleChangeCheckedMatchStart()}
                        checked={this.state.matchstared}
                        id={"matchstared"}
                      />
                    </Col>

                    <Col xs="2">
                      <Label htmlFor="pid">Match Type</Label>
                      <br />
                      {this.state.matchtype}
                    </Col>

                    <Col xs="2">
                      <Label htmlFor="pid">Innings</Label>
                      <Select options={this.state.inninglist}
                        name="addStatus"
                        value={this.state.selectinninglist}
                        onChange={this.handleSelectChangeInning}
                        isSearchable={false} />
                    </Col>
                    <Col xs="3">
                      <Label htmlFor="pid">Toss winner team</Label>
                      <Select options={this.state.opttosswinnerteam}
                        name="addStatus"
                        value={this.state.objtosswinnerteam}
                        onChange={this.handleSelectChangeTossWTeam}
                        isSearchable={false} />
                    </Col>
                    <Col xs="3">
                      <Label htmlFor="pid">Batting</Label>
                      <Select options={this.state.selectedmatches}
                        name="addStatus"
                        value={this.state.selectbattinglist}
                        onChange={this.handleSelectChangeBatting}
                        isSearchable={false} />
                    </Col>
                    <Col xs="3">
                      <Label htmlFor="pid">Bowling/Fielding</Label>
                      <Select options={this.state.selectedmatches}
                        name="addStatus"
                        value={this.state.selectfieldinglist}
                        onChange={this.handleSelectChangeBowFd}
                        isSearchable={false} />
                    </Col>
                    <Col xs="3">
                      <Label htmlFor="pid">Man of the match</Label>
                      <Select options={this.state.optmanofthematch}
                        name="addStatus"
                        value={this.state.manofthematch}
                        onChange={this.handleSelectChangeMOMatch}
                        isSearchable={false} />

                    </Col>


                    <Col xs="3">
                      <Label htmlFor="pid">Winner Team</Label>

                      <Select options={this.state.optwinnerteam}
                        name="winnerteam"
                        value={this.state.winnerteam}
                        onChange={this.handleSelectChangeWinTeam}
                        isSearchable={false} />
                    </Col>

                    <Col xs="12">
                      <div className="squresub_btn">
                        <Button className="btn btn-square btn-success" onClick={() => this.viewAllPlayers()}>{this.state.viewAllStatusName}</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="btn btn-square btn-success" onClick={() => this.updateScore()}>Submit</Button>
                      </div>
                    </Col>

                  </Row>
                </Card>
              </CardBody>
              <CardBody>
                {/* <div id="accordion">
                  <Card>
                    <CardHeader id="headingOne">
                    <div className="forselect_betsmand">
                      
                        <h5 className="m-0 p-0">Run - {this.state.scoretotalrun}/{this.state.scoretotalover}</h5>
             
                       </div>
                    </CardHeader> 
                    </Card>
          </div> */}

                <div id="accordion">
                  <Card>
                    <CardHeader id="headingOne">
                      <div className="forselect_betsmand">
                        <h5 className="m-0 p-0">{this.state.battingteam} Score</h5>

                      </div>
                    </CardHeader>
                    <Collapse
                      isOpen={this.state.accordion}
                      data-parent="#accordion"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                    >
                      <CardBody className="card-body-scroll vjcard_customed">
                        <Row className="custom_row" >
                          <Col className="formore_score" xs="1">Run</Col>
                          <Col className="formore_score" xs="1"> Overs</Col>
                          <Col className="formore_score" xs="1"> Wickets</Col>

                          <hr
                            style={{
                              color: 'inherit',
                              backgroundColor: 'inherit',
                              height: '1px',
                              width: '100%',
                            }}
                          />

                        </Row>

                        <Row className="custom_row">
                          <Col className="formore_score" xs="1">
                            {(formthis.state.scorelist['score'] && formthis.state.scorelist['score'][formthis.state.battingteam]) ? formthis.state.scorelist['score'][formthis.state.battingteam]["run"] : ""}
                            {/* <Input type="text" id={"run"} name={'exb'} value={formthis.state["run"]} title="Run" placeholder="R" onChange={formthis.onChangeScore} /> */}
                          </Col>
                          <Col className="formore_score" xs="1">
                            {(formthis.state.scorelist['score'] && formthis.state.scorelist['score'][formthis.state.battingteam]) ? formthis.state.scorelist['score'][formthis.state.battingteam]["overs"] : ""}
                            {/* <Input type="text" id={"overs"} name={'overs'} value={formthis.state["overs"]} title="Overs" placeholder="O" onChange={formthis.onChangeScore} /> */}
                          </Col>
                          <Col className="formore_score" xs="1">
                            {(formthis.state.scorelist['score'] && formthis.state.scorelist['score'][formthis.state.battingteam]) ? formthis.state.scorelist['score'][formthis.state.battingteam]["wickets"] : ""}
                            {/* <Input type="text" id={"wickets"} name={'wickets'} value={formthis.state["wickets"]} title="Wickets" placeholder="W" onChange={formthis.onChangeScore} /> */}
                          </Col>

                          {/* <Col xs="1"> 
                                  <Button
                                    color="success"
                                    onClick={() =>formthis.updateScoreBoard()}>Update</Button>
                                </Col> */}

                          <hr
                            style={{
                              color: 'inherit',
                              backgroundColor: 'inherit',
                              height: '1px',
                              width: '100%',
                            }}
                          />

                        </Row>


                      </CardBody>
                    </Collapse>
                  </Card>
                </div>


                <div id="accordion">
                  <Card>
                    <CardHeader id="headingOne">
                      <div className="forselect_betsmand">
                        <h5 className="m-0 p-0">{this.state.battingteam} (Batting) {this.state.matchtypeselect} {this.state.inningname} - Extras</h5>

                      </div>
                    </CardHeader>
                    <Collapse
                      isOpen={this.state.accordion}
                      data-parent="#accordion"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                    >
                      <CardBody className="card-body-scroll vjcard_customed">
                        <Row className="custom_row" >
                          <Col className="formore_score" xs="1">Bye</Col>
                          <Col className="formore_score" xs="1"> Leg-bye</Col>
                          <Col className="formore_score" xs="1"> No-ball</Col>
                          <Col className="formore_score" xs="1"> Wide</Col>
                          <Col className="formore_score" xs="1">Penalty runs</Col>

                          <hr
                            style={{
                              color: 'inherit',
                              backgroundColor: 'inherit',
                              height: '1px',
                              width: '100%',
                            }}
                          />

                        </Row>

                        <Row className="custom_row">
                          <Col className="formore_score" xs="1">
                            {formthis.state.objbatting["exb"]}
                            <Input type="text" id={"exb"} name={'exb'} value={formthis.state["exb"]} placeholder="b" onChange={formthis.onChangeScore} />
                          </Col>
                          <Col className="formore_score" xs="1">
                            {formthis.state.objbatting["exlb"]}
                            <Input type="text" id={"exlb"} name={'exlb'} value={formthis.state["exlb"]} placeholder="lb" onChange={formthis.onChangeScore} />
                          </Col>
                          <Col className="formore_score" xs="1">
                            {formthis.state.objbatting["exnb"]}
                            <Input type="text" id={"exnb"} name={'exnb'} value={formthis.state["exnb"]} placeholder="nb" onChange={formthis.onChangeScore} />
                          </Col>
                          <Col className="formore_score" xs="1">
                            {formthis.state.objbatting["exw"]}
                            <Input type="text" id={"exw"} name={'exw'} value={formthis.state["exw"]} placeholder="w" onChange={formthis.onChangeScore} />
                          </Col>
                          <Col className="formore_score" xs="1">
                            {formthis.state.objbatting["expr"]}
                            <Input type="text" id={"expr"} name={'expr'} value={formthis.state["expr"]} placeholder="pr" onChange={formthis.onChangeScore} />
                          </Col>

                          <Col xs="1">
                            <Button
                              color="success"
                              onClick={() => formthis.updateBattingExtras()}>Add</Button>
                          </Col>

                          <hr
                            style={{
                              color: 'inherit',
                              backgroundColor: 'inherit',
                              height: '1px',
                              width: '100%',
                            }}
                          />

                        </Row>


                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
                <div id="accordion">
                  <Card>
                    <CardHeader id="headingOne">
                      <div className="forselect_betsmand">

                        <h5 className="m-0 p-0">{this.state.battingteam} (Batting) {this.state.matchtypeselect} {this.state.inningname}</h5>

                        <span onClick={this.onClickSelectBatsman}>Select Batsman</span> </div>
                    </CardHeader>
                    <Collapse
                      isOpen={this.state.accordion}
                      data-parent="#accordion"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                    >
                      <CardBody className="card-body-scroll vjcard_customed">
                        <Row className="custom_row" >
                          <Col className="formore_score" xs="1"></Col>
                          <Col xs="1">Name</Col>
                          <Col className="formore_score" xs="1">SR</Col>
                          <Col className="formore_score" xs="1">6s</Col>
                          <Col className="formore_score" xs="1">4s</Col>
                          <Col className="formore_score" xs="1">B</Col>
                          <Col className="formore_score" xs="1">R</Col>
                          <Col className="formore_disisal" xs="1">dismissal</Col>
                          <Col className="formore_disisal" xs="1">dismissal-by</Col>
                          <Col className="formore_disisal" xs="1">bowler</Col>
                          <Col className="formore_disisal" xs="1">dismissal-info</Col>

                          <hr
                            style={{
                              color: 'inherit',
                              backgroundColor: 'inherit',
                              height: '1px',
                              width: '100%',
                            }}
                          />

                        </Row>
                        {/* <div style={{width:'100%', height:'100%', overflow: 'auto'}} > */}
                        {this.state.multiSelect
                          ? this.state.multiSelect.map(
                            //(matchdetails, index) => (
                            function (matchdetails, index) {
                              if (matchdetails.checketstatus === true) {
                                return (
                                  <Row key={index} className="custom_row">
                                    <Col className="formore_score" xs="1">
                                      <img
                                        src={matchdetails.pimg}
                                        width="30"
                                        height="30"
                                        className="img-avatar"
                                        onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/icons/dummy.png' }}
                                        alt=""
                                      />
                                    </Col>

                                    <Col xs="1">
                                      {matchdetails.pname}
                                    </Col>
                                    <Col className="formore_score" xs="1">
                                      {(formthis.state.objbatting["SR" + matchdetails.pid] > 0) ? formthis.state.objbatting["SR" + matchdetails.pid] : "0"}
                                      {/* <Input type="text" id={"SR"+matchdetails.pid} name={'SR'+matchdetails.pid} value={formthis.state["SR"+matchdetails.pid]} placeholder="SR" onChange={formthis.onChangeScore} /> */}
                                    </Col>
                                    <Col className="formore_score" xs="1">
                                      {formthis.state.objbatting["6s" + matchdetails.pid]}
                                      <Input type="text" id={"6s" + matchdetails.pid} name={'6s' + matchdetails.pid} value={formthis.state["6s" + matchdetails.pid]} placeholder="6s" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col className="formore_score" xs="1">
                                      {formthis.state.objbatting["4s" + matchdetails.pid]}
                                      <Input type="text" id={"4s" + matchdetails.pid} name={'4s' + matchdetails.pid} value={formthis.state["4s" + matchdetails.pid]} placeholder="4s" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col className="formore_score" xs="1">
                                      {formthis.state.objbatting["B" + matchdetails.pid]}
                                      <Input type="text" id={"B" + matchdetails.pid} name={'B' + matchdetails.pid} value={formthis.state["B" + matchdetails.pid]} placeholder="B" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col className="formore_score" xs="1">
                                      {formthis.state.objbatting["R" + matchdetails.pid]}
                                      <Input type="text" id={"R" + matchdetails.pid} name={'R' + matchdetails.pid} value={formthis.state["R" + matchdetails.pid]} placeholder="R" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col className="formore_disisal" xs="1" lg="1">
                                      {formthis.state.objbatting["dismissal" + matchdetails.pid]}
                                      {/* <Input type="text" id={"dismissal"+matchdetails.pid} name={'dismissal'+matchdetails.pid} value={formthis.state["dismissal"+matchdetails.pid]} placeholder="dismissal" onChange={formthis.onChangeScore} /> */}
                                      <Select options={[
                                        { label: "bowled", value: 0, namepid: "dismissal" + matchdetails.pid },
                                        { label: "caught", value: 1, namepid: "dismissal" + matchdetails.pid },
                                        { label: "stumped", value: 2, namepid: "dismissal" + matchdetails.pid },
                                        { label: "hit the ball twice", value: 3, namepid: "dismissal" + matchdetails.pid },
                                        { label: "hit wicket", value: 4, namepid: "dismissal" + matchdetails.pid },
                                        { label: "obstructing the field", value: 5, namepid: "dismissal" + matchdetails.pid },
                                        { label: "timed-out", value: 6, namepid: "dismissal" + matchdetails.pid },
                                        { label: "lbw", value: 7, namepid: "dismissal" + matchdetails.pid },
                                        { label: "Handled the ball", value: 8, namepid: "dismissal" + matchdetails.pid },
                                        { label: "run-out", value: 9, namepid: "dismissal" + matchdetails.pid },
                                        { label: "retired", value: 10, namepid: "dismissal" + matchdetails.pid },
                                        { label: "not-out", value: 11, namepid: "dismissal" + matchdetails.pid }
                                      ]}
                                        name={"dismissal" + matchdetails.pid}
                                        value={formthis.state.statedismissal["dismissal" + matchdetails.pid]}
                                        onChange={e => formthis.handleSelectChangeDismissal(matchdetails.pid, e)}
                                        isSearchable={false} />
                                    </Col>
                                    <Col className="formore_disisal" xs="1">
                                      <Select isDisabled={(formthis.state.isDisableDissmByObj[matchdetails.pid]===false)?false:true}
                                      options={formthis.state.optdismissalby}
                                        className="css-vjplayer"
                                        name={"dismissalby" + matchdetails.pid}
                                        isMulti={formthis.state["isMulti" + matchdetails.pid]}
                                        value={formthis.state["dismissalby" + matchdetails.pid]}
                                        onChange={e => formthis.handleSelectChangeDismissalBy(matchdetails.pid, e)}
                                        isSearchable={false} />
                                    </Col>

                                    <Col className="formore_disisal" xs="1">
                                      <Select isDisabled={(formthis.state.isDisableBowlByObj[matchdetails.pid]===false)?false:true}
                                      options={formthis.state.optdismissalby}
                                        className="css-vjplayer"
                                        name={"bowledby" + matchdetails.pid}
                                        value={formthis.state["bowledby" + matchdetails.pid]}
                                        onChange={e => formthis.handleSelectChangeBowledBy(matchdetails.pid, e)}
                                        isSearchable={false} />
                                    </Col>

                                    <Col className="formore_disisal" xs="1">
                                      {formthis.state.objbatting["dismissalinfo" + matchdetails.pid]}

                                    </Col>


                                    <Col xs="1">
                                      <Button
                                        color="success"
                                        onClick={() => formthis.updateBatting(matchdetails.pid, matchdetails.pname)}>Add</Button>
                                    </Col>
                                    <hr
                                      style={{
                                        color: 'inherit',
                                        backgroundColor: 'inherit',
                                        height: '1px',
                                        width: '100%',
                                      }}
                                    />

                                  </Row>

                                )
                              }
                              else
                                return (null)
                            })

                          : null}
                        {/* </div> */}
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
                <div id="accordion11">
                  <Card>
                    <CardHeader id="headingOne11">
                      <div className="forselect_betsmand">
                        <h5 className="m-0 p-0"> {this.state.bowfieldteam} (Bowling) {this.state.matchtypeselect}{this.state.inningname}</h5>
                        <span onClick={this.onClickSelectBowler}>Select Bowler</span>
                      </div>
                    </CardHeader>
                    <Collapse
                      isOpen={true}
                      data-parent="#accordion"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                    >
                      <CardBody className="card-body-scroll vjcard_customed">
                        <Row className="custom_row" >

                          <Col xs="1"></Col>
                          <Col xs="1">bowler</Col>
                          <Col xs="1">6s</Col>
                          <Col xs="1">4s</Col>
                          {/* <Col xs="1">0s</Col> */}
                          <Col xs="1">Econ</Col>
                          <Col xs="1">W</Col>
                          <Col xs="1">R</Col>
                          <Col xs="1">M</Col>
                          <Col xs="1">WD</Col>
                          <Col xs="1">NB</Col>
                          <Col xs="1">O</Col>
                          <hr
                            style={{
                              color: 'inherit',
                              backgroundColor: 'inherit',
                              height: '1px',
                              width: '100%',
                            }}
                          />

                        </Row>
                        {/* <div style={{width:'100%', height:'100%', overflow: 'auto'}} > */}
                        {this.state.bowfieldlist
                          ? this.state.bowfieldlist.map(
                            //(matchdetails, index) => (
                            function (matchdetails, index) {
                              if (matchdetails.checketstatus === true) {
                                return (

                                  <Row key={index} className="custom_row">

                                    <Col xs="1">
                                      <img
                                        src={matchdetails.pimg}
                                        width="30"
                                        height="30"
                                        className="img-avatar"
                                        onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/icons/dummy.png' }}
                                        alt=""
                                      />
                                    </Col>
                                    <Col xs="1">
                                      {matchdetails.pname}
                                    </Col>

                                    <Col xs="1">
                                      {formthis.state.objbowling["6s" + matchdetails.pid]}

                                      <Input type="text" id={"6s" + matchdetails.pid} name={'6s' + matchdetails.pid} value={formthis.state["6s" + matchdetails.pid]} placeholder="6s" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col xs="1">
                                      {formthis.state.objbowling["4s" + matchdetails.pid]}
                                      <Input type="text" id={"4s" + matchdetails.pid} name={'4s' + matchdetails.pid} value={formthis.state["4s" + matchdetails.pid]} placeholder="4s" onChange={formthis.onChangeScore} />
                                    </Col>
                                    {/* <Col xs="1">
                                {formthis.state.objbowling["0s"+matchdetails.pid]}
                                <Input type="text" id={"0s"+matchdetails.pid} name={'0s'+matchdetails.pid} value={formthis.state["0s"+matchdetails.pid]} placeholder="0s" onChange={formthis.onChangeScore} />
                                </Col> */}
                                    <Col xs="1">
                                      {formthis.state.objbowling["R" + matchdetails.pid] > 0 && formthis.state.objbowling["O" + matchdetails.pid] > 0 ? (formthis.state.objbowling["R" + matchdetails.pid] / formthis.state.objbowling["O" + matchdetails.pid]).toFixed(2) : "0"}
                                      {/* <Input type="text" id={"Econ"+matchdetails.pid} name={'Econ'+matchdetails.pid} value={formthis.state["Econ"+matchdetails.pid]} placeholder="Econ" onChange={formthis.onChangeScore} /> */}
                                    </Col>
                                    <Col xs="1">
                                      {formthis.state.objbowling["W" + matchdetails.pid]}
                                      <Input type="text" id={"W" + matchdetails.pid} name={'W' + matchdetails.pid} value={formthis.state["W" + matchdetails.pid]} placeholder="W" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col xs="1">
                                      {formthis.state.objbowling["R" + matchdetails.pid]}
                                      <Input type="text" id={"R" + matchdetails.pid} name={'R' + matchdetails.pid} value={formthis.state["R" + matchdetails.pid]} placeholder="R" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col xs="1">
                                      {formthis.state.objbowling["M" + matchdetails.pid]}
                                      <Input type="text" id={"M" + matchdetails.pid} name={'M' + matchdetails.pid} value={formthis.state["M" + matchdetails.pid]} placeholder="M" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col xs="1">
                                      {(formthis.state.objbowling["WD" + matchdetails.pid] > 0) ? formthis.state.objbowling["WD" + matchdetails.pid] : "0"}
                                      <Input type="text" id={"WD" + matchdetails.pid} name={'WD' + matchdetails.pid} value={formthis.state["WD" + matchdetails.pid]} placeholder="WD" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col xs="1">
                                      {(formthis.state.objbowling["NB" + matchdetails.pid] > 0) ? formthis.state.objbowling["NB" + matchdetails.pid] : "0"}
                                      <Input type="text" id={"NB" + matchdetails.pid} name={'NB' + matchdetails.pid} value={formthis.state["NB" + matchdetails.pid]} placeholder="NB" onChange={formthis.onChangeScore} />
                                    </Col>
                                    <Col xs="1">
                                      {formthis.state.objbowling["O" + matchdetails.pid]}
                                      <Input type="text" id={"O" + matchdetails.pid} name={'O' + matchdetails.pid} pattern="[0-9]+\.[0-5]{1,2}" value={formthis.state["O" + matchdetails.pid]} placeholder="O" onChange={formthis.onChangeScore} />
                                    </Col>



                                    <Col xs="1">
                                      <Button
                                        color="success"
                                        onClick={() => formthis.updateBowling(matchdetails.pid, matchdetails.pname)}

                                      >
                                        Add
                                  </Button>

                                    </Col>
                                    <hr
                                      style={{
                                        color: 'inherit',
                                        backgroundColor: 'inherit',
                                        height: '1px',
                                        width: '100%',
                                      }}
                                    />

                                  </Row>

                                )
                              }
                              else {
                                return (null)
                              }
                            })
                          : null}
                        {/* </div> */}
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>


                <div id="accordion11">
                  <Card>
                    <CardHeader id="headingOne11">
                      <div className="forselect_betsmand">
                        <h5 className="m-0 p-0"> {this.state.bowfieldteam} (Fielding) {this.state.matchtypeselect}{this.state.inningname}</h5>
                      </div>
                    </CardHeader>
                    <Collapse
                      isOpen={true}
                      data-parent="#accordion"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                    >
                      <CardBody className="card-body-scroll vjcard_customed">
                        <Row className="custom_row" >

                          <Col xs="1"></Col>
                          <Col xs="1">Name</Col>
                          <Col xs="1">runout</Col>
                          <Col xs="1">stumped</Col>
                          <Col xs="1">bowled</Col>
                          <Col xs="1">lbw</Col>
                          <Col xs="1">catch</Col>
                          <hr
                            style={{
                              color: 'inherit',
                              backgroundColor: 'inherit',
                              height: '1px',
                              width: '100%',
                            }}
                          />

                        </Row>
                        {/* <div style={{width:'100%', height:'100%', overflow: 'auto'}} > */}
                        {this.state.bowfieldlist
                          ? this.state.bowfieldlist.map(
                            //(matchdetails, index) => (
                            function (matchdetails, index) {
                              return (
                                <Row key={index} className="custom_row">

                                  <Col xs="1">
                                    <img
                                      src={matchdetails.pimg}
                                      width="30"
                                      height="30"
                                      className="img-avatar"
                                      onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/icons/dummy.png' }}
                                      alt=""
                                    />
                                  </Col>
                                  <Col xs="1">
                                    {matchdetails.pname}
                                  </Col>
                                  <Col xs="1">
                                    {formthis.state.objfielding["runout" + matchdetails.pid]}
                                    <Input type="text" id={"runout" + matchdetails.pid} name={'runout' + matchdetails.pid} value={formthis.state["runout" + matchdetails.pid]} placeholder="runout" onChange={formthis.onChangeScore} />
                                  </Col>
                                  <Col xs="1">
                                    {formthis.state.objfielding["stumped" + matchdetails.pid]}
                                    <Input type="text" id={"stumped" + matchdetails.pid} name={'stumped' + matchdetails.pid} value={formthis.state["stumped" + matchdetails.pid]} placeholder="stumped" onChange={formthis.onChangeScore} />
                                  </Col>
                                  <Col xs="1">
                                    {formthis.state.objfielding["bowled" + matchdetails.pid]}
                                    <Input type="text" id={"bowled" + matchdetails.pid} name={'bowled' + matchdetails.pid} value={formthis.state["bowled" + matchdetails.pid]} placeholder="bowled" onChange={formthis.onChangeScore} />
                                  </Col>
                                  <Col xs="1">
                                    {formthis.state.objfielding["lbw" + matchdetails.pid]}
                                    <Input type="text" id={"lbw" + matchdetails.pid} name={'lbw' + matchdetails.pid} value={formthis.state["lbw" + matchdetails.pid]} placeholder="lbw" onChange={formthis.onChangeScore} />
                                  </Col>
                                  <Col xs="1">
                                    {formthis.state.objfielding["catch" + matchdetails.pid]}
                                    <Input type="text" id={"catch" + matchdetails.pid} name={'catch' + matchdetails.pid} value={formthis.state["catch" + matchdetails.pid]} placeholder="catch" onChange={formthis.onChangeScore} />
                                  </Col>

                                  <Col xs="1">
                                    <Button
                                      color="success"
                                      onClick={() => formthis.updateFielding(matchdetails.pid, matchdetails.pname)}
                                    >
                                      Add
                                  </Button>

                                  </Col>
                                  <hr
                                    style={{
                                      color: 'inherit',
                                      backgroundColor: 'inherit',
                                      height: '1px',
                                      width: '100%',
                                    }}
                                  />

                                </Row>

                              )

                            })
                          : null}
                        {/* </div> */}
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.assignResourceSubAdminModal}
          toggle={this.assignResourceSubAdminToggle}
          className={'my-modal ' + this.props.className}>
          >
          <ModalHeader toggle={this.assignResourceSubAdminToggle}>
            Select 2 players for batting
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              <Row>
                {this.state.multiSelect
                  ? this.state.multiSelect.map((resource, i) => (
                    <Col xl={4}> <ListGroupItem className="justify-content-between" key={i}>
                      {resource.pname}
                      <Switch
                        className="float-right"
                        onChange={() => this.handleChangeCheckedResource(resource)}
                        checked={
                          resource.checketstatus
                        }
                        id={resource.pid}
                      />

                    </ListGroupItem>
                    </Col>
                  ))
                  : null}
              </Row>
            </ListGroup>
          </ModalBody>
          <ModalFooter>

            <Button
              color="secondary"
              onClick={this.assignResourceSubAdminToggle}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>


        <Modal
          isOpen={this.state.assignResourceSubAdminModalTeam2}
          toggle={this.assignResourceSubAdminToggleTeam2}
          className={'my-modal ' + this.props.className}>
          >
          <ModalHeader toggle={this.assignResourceSubAdminToggleTeam2}>
            Select 1 player for bowling
          </ModalHeader>
          <ModalBody>
            <ListGroup>
              <Row>
                {this.state.bowfieldlist
                  ? this.state.bowfieldlist.map((resource, i) => (
                    <Col xl={4}> <ListGroupItem className="justify-content-between" key={i}>
                      {resource.pname}
                      <Switch
                        className="float-right"
                        onChange={() => this.handleChangeCheckedResourceTeam2(resource)}
                        checked={
                          resource.checketstatus
                        }
                        id={resource.pid}
                      />

                    </ListGroupItem>
                    </Col>
                  ))
                  : null}
              </Row>
            </ListGroup>
          </ModalBody>
          <ModalFooter>

            <Button
              color="secondary"
              onClick={this.assignResourceSubAdminToggleTeam2}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}
// export default CricketSetting;
function mapStateToProps(state) {
  const { localscore, authentication, listPlayers, liveData, localmatchlist, localmatchdetail } = state;
  const { user } = authentication;

  return {
    user,
    localscore,
    listPlayers,
    liveData,
    localmatchlist,
    localmatchdetail
  };
}
export default connect(mapStateToProps)(LocalScore);
