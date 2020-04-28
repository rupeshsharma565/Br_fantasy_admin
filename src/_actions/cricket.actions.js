import { cricketConstants } from '../_constants';
import { cricketService } from '../_services';
import { alertActions } from './';

export const cricketActions = {
  getListMatches,
  getTeamList,
  addTeam,
  getTeamListSearch,
  getPlayerListByTeam1,
  getPlayerListByTeam2,
  getMatchList,
  getPlayerList,
  addPlayer,
  addCricketMatch,
  getContenstsList,
  addCricketContensts,
  getPoolList,
  addPool,
  addPrize,
  getPrize,
  getMatchDetails,
  assignContestToMatch,
  updateAssignContestToMatch,
  getAssignedPoolByContestMatch,
  savePoolToConestByMatch,
  getPlayerImageByid,
  addPlayerImageByid,
  getUpcommingMatch,
  updateUpcommingMatch,
  allMatch,
  addPoolAndPrize,
  addDomMatch
};
function getPoolList(data) {
  
  return dispatch => {
    
    cricketService.getPoolList(data).then(
      pool => {
        dispatch(success(pool));
        //dispatch(alertActions.success('Admin fetch'));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
 
  function success(pool) {
    return {
      type: cricketConstants.CRICKET_CONTESTS_POOL_LIST_SUCCESS,
      pool
    };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_CONTESTS_POOL_LIST_FAILURE, error };
  }
}
function getListMatches(data) {
  return dispatch => {
    dispatch(request());
    cricketService.getListMatches(data).then(
      cricketmatch => {
        dispatch(success(cricketmatch));
        //dispatch(alertActions.success('Admin fetch'));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: cricketConstants.CRICKET_MATCH_GETALL_REQUEST };
  }
  function success(cricketmatch) {
    return {
      type: cricketConstants.CRICKET_MATCH_GETALL_SUCCESS,
      cricketmatch
    };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_MATCH_GETALL_FAILURE, error };
  }
}
function getTeamListSearch(data) {
  return dispatch => {
    //dispatch(request());
    cricketService.getTeamListSearch(data).then(
      cricketmatch => {
        dispatch(success(cricketmatch));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function success(cricketmatch) {
    return {
      type: cricketConstants.CRICKET_MATCH_TEAM_SEARCH_SUCCESS,
      cricketmatch
    };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_MATCH_TEAM_SEARCH_FAILURE, error };
  }
}
function getPlayerListByTeam1(data) {
  return dispatch => {
    //dispatch(request());
    cricketService.getPlayerListByTeam(data).then(
      cricketmatch => {
        dispatch(success(cricketmatch));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(cricketmatch) {
    return {
      type: cricketConstants.GET_CRICKET_MATCH_TEAM_PLAYER_LIST_SUCCESS1,
      cricketmatch
    };
  }
  function failure(error) {
    return {
      type: cricketConstants.GET_CRICKET_MATCH_TEAM_PLAYER_LIST_FAILURE1,
      error
    };
  }
}
function getPlayerListByTeam2(data) {
  return dispatch => {
    //dispatch(request());
    cricketService.getPlayerListByTeam(data).then(
      cricketmatch => {
        dispatch(success(cricketmatch));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(cricketmatch) {
    return {
      type: cricketConstants.GET_CRICKET_MATCH_TEAM_PLAYER_LIST_SUCCESS2,
      cricketmatch
    };
  }
  function failure(error) {
    return {
      type: cricketConstants.GET_CRICKET_MATCH_TEAM_PLAYER_LIST_FAILURE2,
      error
    };
  }
}
function getMatchList(data) {
  return dispatch => {
    //dispatch(request());
    cricketService.getMatchList(data).then(
      cricketmatch => {
        dispatch(success(cricketmatch));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(cricketmatch) {
    return {
      type: cricketConstants.GET_CRICKET_MATCH_LIST_API_SUCCESS,
      cricketmatch
    };
  }
  function failure(error) {
    return {
      type: cricketConstants.GET_CRICKET_MATCH_LIST_API_FAILURE,
      error
    };
  }
}
function getTeamList(data) {
  return dispatch => {
    cricketService.getTeamList(data).then(
      teamList => {
        dispatch(success(teamList));
        // dispatch(alertActions.success('Subadmin added !'));
      },
      error => {
        dispatch(failure(error));
        // dispatch(alertActions.error(error));
      }
    );
  };

  //function request(user) { return { type: cricketConstants.LOGIN_REQUEST, user } }
  function success(teamList) {
    return { type: cricketConstants.CRICKET_TEAM_GET_SUCCESS, teamList };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_TEAM_GET_FAILURE, error };
  }
}
function addTeam(data) {
  return dispatch => {
    cricketService.addTeam(data).then(
      addTeamRes => {
        console.log('addTeamRes ------------------', addTeamRes.addteamres.msg);

        dispatch(success(addTeamRes));
        dispatch(alertActions.success(addTeamRes.addteamres.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(addTeamRes) {

    return { type: cricketConstants.CRICKET_TEAM_ADD_SUCCESS, addTeamRes };
  }
  function failure(error) {

    return { type: cricketConstants.CRICKET_TEAM_ADD_FAILURE, error };

  }
}
function addPlayer(data) {
  return dispatch => {
    cricketService.addPlayer(data).then(
      addplayerRes => {
        console.log('addTeamRes ------------------', addplayerRes.addteamres.msg);

        dispatch(success(addplayerRes));
        dispatch(alertActions.success(addplayerRes.addteamres.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(addplayerRes) {

    return { type: cricketConstants.CRICKET_PLAYER_ADD_SUCCESS, addplayerRes };
  }
  function failure(error) {

    return { type: cricketConstants.CRICKET_PLAYER_ADD_FAILURE, error };

  }
}
function getPlayerList(data) {
  return dispatch => {
    dispatch(request());
    cricketService.getPlayerList(data).then(
      playerList => {
        dispatch(success(playerList));
        // dispatch(alertActions.success('Subadmin added !'));
      },
      error => {
        dispatch(failure(error));
        // dispatch(alertActions.error(error));
      }
    );
  };

  function request() { return { type: cricketConstants.CRICKET_PLAYER_GETALL_REQUEST } }
  function success(playerList) {
    return { type: cricketConstants.CRICKET_PLAYER_GETALL_SUCCESS, playerList };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_PLAYER_GETALL_FAILURE, error };
  }
}
function addCricketMatch(data) {
  return dispatch => {
    cricketService.addCricketMatch(data).then(
      addCricketMatch => {
        dispatch(success(addCricketMatch));
        dispatch(alertActions.success(addCricketMatch.addmatch.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(addCricketMatch) {
    return { type: cricketConstants.CRICKET_MATCH_ADD_SUCCESS, addCricketMatch };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_MATCH_ADD_FAILURE, error };
  }
}
function getContenstsList(data) {
  return dispatch => {
    cricketService.getContenstsList(data).then(
      contenstsList => {
        dispatch(success(contenstsList));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(contenstsList) {
    return { type: cricketConstants.GET_CONTESTS_SUCCESS, contenstsList };
  }
  function failure(error) {
    return { type: cricketConstants.GET_CONTESTS_FAILURE, error };
  }
}
function addCricketContensts(data) {
  return dispatch => {
    cricketService.addPlayer(data).then(
      addcontestRes => {
        dispatch(success(addcontestRes));
        dispatch(alertActions.success(addcontestRes.addteamres.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(addcontestRes) {

    return { type: cricketConstants.CRICKET_CONTESTS_ADD_SUCCESS, addcontestRes };
  }
  function failure(error) {

    return { type: cricketConstants.CRICKET_CONTESTS_ADD_FAILURE, error };

  }
}
function addPool(data) {
  return dispatch => {
    cricketService.addPool(data).then(
      addpool => {
       // console.log('addTeamRes ------------------', addplayerRes.addteamres.msg);

        dispatch(success(addpool));
        dispatch(alertActions.success(addpool.addpool.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(addpool) {

    return { type: cricketConstants.CRICKET_CONTESTS_POOL_ADD_SUCCESS, addpool };
  }
  function failure(error) {

    return { type: cricketConstants.CRICKET_CONTESTS_POOL_ADD_FAILURE, error };

  }
}
function addPrize(data) {
  return dispatch => {
    cricketService.addPrize(data).then(
      addprize => {
       // console.log('addTeamRes ------------------', addplayerRes.addteamres.msg);

        dispatch(success(addprize));
        dispatch(alertActions.success(addprize.addprize.msg));
      },
      error => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error));
      }
    );
  };
  function success(addprize) {

    return { type: cricketConstants.CRICKET_CONTESTS_PRIZE_ADD_SUCCESS, addprize };
  }
  function failure(error) {

    return { type: cricketConstants.CRICKET_CONTESTS_PRIZE_ADD_FAILURE, error };

  }
}
function getPrize(data) {
  return dispatch => {
    cricketService.getPrize(data).then(
      getprizelist => {
       // console.log('addTeamRes ------------------', addplayerRes.addteamres.msg);

        dispatch(success(getprizelist));
        //dispatch(alertActions.success(getprizelist.getprizelist.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(getprizelist) {

    return { type: cricketConstants.CRICKET_CONTESTS_PRIZE_GET_SUCCESS, getprizelist };
  }
  function failure(error) {

    return { type: cricketConstants.CRICKET_CONTESTS_PRIZE_GET_FAILURE, error };

  }
}
function getMatchDetails(data) {
  return dispatch => {
    cricketService.getMatchDetails(data).then(
      matchDetails => {
        dispatch(success(matchDetails));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(matchDetails) {

    return { type: cricketConstants.CRICKET_CONTESTS_MATCH_SHOW_SUCCESS, matchDetails };
  }
  function failure(error) {

    return { type: cricketConstants.CRICKET_CONTESTS_MATCH_SHOW_FAILURE, error };

  }
}
function assignContestToMatch(data) {
  return dispatch => {
    cricketService.assignContestToMatch(data).then(
      assigncontestotmatch => {
       // console.log('addTeamRes ------------------', addplayerRes.addteamres.msg);

        dispatch(success(assigncontestotmatch));
        //dispatch(alertActions.success(assigncontestotmatch.assigncontestotmatch.msg));
      },
      error => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error));
      }
    );
  };
  function success(assigncontestotmatch) {
    return { type: cricketConstants.CRICKET_CONTESTS_ASSIGN_MATCH_SHOW_SUCCESS, assigncontestotmatch };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_CONTESTS_ASSIGN__MATCH_SHOW_FAILURE, error };
  }
}
function updateAssignContestToMatch(data) {
  return dispatch => {
    cricketService.updateAssignContestToMatch(data).then(
      assigncontestotmatch => {
       // console.log('addTeamRes ------------------', addplayerRes.addteamres.msg);

        dispatch(success(assigncontestotmatch));
        //dispatch(alertActions.success(assigncontestotmatch.assigncontestotmatch.msg));
      },
      error => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error));
      }
    );
  };
  function success(assigncontestotmatch) {
    return { type: cricketConstants.CRICKET_UPDATE_STATUS_CONTESTS_ASSIGN_MATCH_SHOW_SUCCESS, assigncontestotmatch };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_UPDATE_STATUS_CONTESTS_ASSIGN__MATCH_SHOW_FAILURE, error };
  }
}
function getAssignedPoolByContestMatch(data) {
  return dispatch => {
    cricketService.getAssignedPoolByContestMatch(data).then(
      matchDetails => {
        dispatch(success(matchDetails));
      },
      error => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error));
      }
    );
  };
  function success(matchDetails) {
    return { type: cricketConstants.Assigned_Pool_Contest_LIST_SUCCESS, matchDetails };
  }
  function failure(error) {
    return { type: cricketConstants.Assigned_Pool_Contest_LIST_FAILURE, error };
  }
}
function savePoolToConestByMatch(data) {
  return dispatch => {
    cricketService.savePoolToConestByMatch(data).then(
      assignpoolsave => {
        dispatch(success(assignpoolsave));
        dispatch(alertActions.success(assignpoolsave.assignpoolsave.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(assignpoolsave) {
    return { type: cricketConstants.Assigned_Pool_Contest_UPDATE_SUCCESS, assignpoolsave };
  }
  function failure(error) {
    return { type: cricketConstants.Assigned_Pool_Contest_UPDATE_FAILURE, error };
  }
}
function getPlayerImageByid(data) {
  return dispatch => {
    cricketService.getPlayerImageByid(data).then(
      playerDetails => {
        dispatch(success(playerDetails));
      },
      error => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error));
      }
    );
  };
  function success(playerDetails) {
    return { type: cricketConstants.PLAYER_IMAGE_LIST_BY_ID_SUCCESS, playerDetails };
  }
  function failure(error) {
    return { type: cricketConstants.PLAYER_IMAGE_LIST_BY_ID_FAILURE, error };
  }
}
function addPlayerImageByid(data) {
  return dispatch => {
    cricketService.addPlayerImageByid(data).then(
      playerDetails => {
        dispatch(success(playerDetails));
      },
      error => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error));
      }
    );
  };
  function success(playerDetails) {
    return { type: cricketConstants.PLAYER_IMAGE_LIST_BY_ID_SUCCESS, playerDetails };
  }
  function failure(error) {
    return { type: cricketConstants.PLAYER_IMAGE_LIST_BY_ID_FAILURE, error };
  }
}
function getUpcommingMatch(data) {
  return dispatch => {
    cricketService.getUpcommingMatch(data).then(
      cricketmatch => {
        dispatch(success(cricketmatch));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(cricketmatch) {
    return { type: cricketConstants.UPCOMMING_MATCH_SUCCESS, cricketmatch };
  }
  function failure(error) {
    return { type: cricketConstants.UPCOMMING_MATCH_FAILURE, error };
  }
}
function updateUpcommingMatch(data) {
  return dispatch => {
    cricketService.updateUpcommingMatch(data).then(
      activematch => {
        dispatch(success(activematch));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(activematch) {
    return { type: cricketConstants.ACTIVE_UPCOMMING_MATCH_SUCCESS, activematch };
  }
  function failure(error) {
    return { type: cricketConstants.ACTIVE_UPCOMMING_MATCH_FAILURE, error };
  }
}

function allMatch(data) {
  return dispatch => {
    cricketService.allMatch(data).then(
      allmatch => {
        console.log("e--->>.",allmatch);
        dispatch(success(allmatch));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(allmatch) {
    return { type: cricketConstants.ACTIVE_ALL_MATCH_SUCCESS, allmatch };
  }
  function failure(error) {
    return { type: cricketConstants.ACTIVE_ALL_MATCH_FAILURE, error };
  }
}


function addPoolAndPrize(data) {
  return dispatch => {
    cricketService.addPoolAndPrize(data).then(
      addpool => {
        dispatch(success(addpool));
        dispatch(alertActions.success(addpool.addpool.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(addpool) {
    return { type: cricketConstants.CRICKET_CONTESTS_POOL_AND_PRIZE_ADD_SUCCESS, addpool };
  }
  function failure(error) {
    return { type: cricketConstants.CRICKET_CONTESTS_POOL_AND_PRIZE_ADD_FAILURE, error };
  }
}
function addDomMatch(data) {
  return dispatch => {
    cricketService.addDomMatch(data).then(
      adddommatch => {
        dispatch(success(adddommatch));
        dispatch(alertActions.success(adddommatch.adddommatch.msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(adddommatch) {
    return { type: cricketConstants.ADD_DOM_UPCOMMING_MATCH_SUCCESS, adddommatch };
  }
  function failure(error) {
    return { type: cricketConstants.ADD_DOM_UPCOMMING_MATCH_FAILURE, error };
  }
}