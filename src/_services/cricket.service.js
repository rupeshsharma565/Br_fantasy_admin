import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const cricketService = {
  getListMatches,
  addSubAdmin,
  deletesubAdminService,
  getAllResourceList,
  saveAssignResourceSubAdmin,
  getTeamList,
  addTeam,
  getTeamListSearch,
  getPlayerListByTeam,
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
  addDomMatch,
  updateMatchTime,
  cancelMatch
};
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  window.location.href = "#/login"
}
function getPoolList(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/getcontestsmeta`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        listOfPool: res.data
      };
      return userObj;
    });
}
function getListMatches(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/listmatches`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        listOfMatches: res.data
      };
      return userObj;
    });
}
function getTeamListSearch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/listteam`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        teamsList: res.data
      };
      return userObj;
    });
}
function getPlayerListByTeam(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/listplayerbyteam`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        playerList: res.data
      };
      return userObj;
    });
}
function getMatchList(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/getmastertblmatch`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        matchList: res.data
      };
      return userObj;
    });
}
function getTeamList(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/listteam`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log('Api response get ----------------', res);

      let teamList = res.data;

      return teamList;
    });
}
function getPlayerList(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  console.log("dataaaaaaaaaaaa=====", data)
  let teamid = {
    teamid: data
  }
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(teamid)
  }
  return fetch(CONST.BACKEND_URL + `/api/listplayerbyteam`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log("Api response get ----------------", res)

      let playerList = {
        playerList: res.data
      }

      return playerList;
    });
}
function addSubAdmin(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/addsubadmin`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        addsubadminres: res.data
      };
      return userObj;
    });
}
function deletesubAdminService(data) {
  //console.log("Enter into service ", data);

  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/deletesubadmin`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        addsubadminres: res.data
      };
      return userObj;
    });
}
function getAllResourceList() {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header
  };
  return fetch(CONST.BACKEND_URL + `/api/listresoures`, requestOptions)
    .then(handleResponse)
    .then(res => {
      console.log(JSON.stringify(res));

      let userObj = {
        listOfResource: res.data
      };
      return userObj;
    });
}
function saveAssignResourceSubAdmin(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/assignrole`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        addsubadminres: res.data
      };
      return userObj;
    });
}

function addTeam(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });

  let apiurl=`/api/addteam`;
  if(data.ssteamid!=="0")
  {
    data.id=data.ssteamid;
    apiurl=`/api/editteam`;
  }

  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };

 

  return fetch(CONST.BACKEND_URL + apiurl, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        addteamres: res
      };
      return userObj;
    });
}


function addPlayer(data) {

  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });

  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/addplayertoteam`, requestOptions)
    .then(handleResponse)
    .then(res => {

      let addplayerRes = {

        addteamres: res
      }
      return addplayerRes;
    });
}
function addCricketMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/addmatch`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let addplayerRes = {
        addmatch: res
      }
      return addplayerRes;
    });
}
function getContenstsList() {
      let header = new Headers({
          'Content-Type': 'application/json',
          "Authorization": authHeader().Authorization
      });
      const requestOptions = {
          method: "POST",
          headers: header
      }
      return fetch(CONST.BACKEND_URL + `/api/listcontests`, requestOptions)
          .then(handleResponse)
          .then(res => {
              let userObj = {
                  listOfContests: res.data
              }
              return userObj;
          });
}
function addCricketContensts(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/addmatch`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let addplayerRes = {
        addmatch: res
      }
      return addplayerRes;
    });
}
function addPool(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/addcontestsmeta`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let addPool = {
        addpool: res
      }
      return addPool;
    });
}
function addPrize(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/addpoolprizebreaks`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let addprize = {
        addprize: res
      }
      return addprize;
    });
}
function getPrize(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/getpoolprizebreaks`, requestOptions)
    .then(handleResponse)
    .then(res => {
      
      return res.data;
    });
}
function getMatchDetails(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/getmatchedit`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res.data;
    });
}
function assignContestToMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/getmatchcontestlist`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assigncontestotmatch = {
        assignedContestList: res.data
      }
      return assigncontestotmatch;
    });
}
function updateAssignContestToMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/assignconteststomatch`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assigncontestotmatch = {
        assignedContestList: res.data
      }
      return assigncontestotmatch;
    });
}
function getAssignedPoolByContestMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/getmatchcontestpoollist`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assigncontestotmatch = {
        assignedContestList: res.data
      }
      return assigncontestotmatch;
    });
}
function savePoolToConestByMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/assigncontestspooltomatch`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assignpoolsave = {
        assignpoolsave: res
      }
      return assignpoolsave;
    });
}
function getPlayerImageByid(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/getplayerimg`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assignpoolsave = {
        playerImageList: res.data
      }
      return assignpoolsave;
    });
}
function getUpcommingMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/getmastertblmatchupcomming`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assignpoolsave = {
        listOfMatches: res.data
      }
      return assignpoolsave;
    });
}
function addPlayerImageByid(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/addplayerimg`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assignpoolsave = {
        playerImageList: res.data
      }
      return assignpoolsave;
    });
}
function updateUpcommingMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/upcmgtoactivematch`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assignpoolsave = {
        updatestatus: res
      }
      return assignpoolsave;
    });
}


function allMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/listmatchesadmin`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let assignpoolsave = {
        updatestatus: res
      }
      return assignpoolsave;
    });
}

function addPoolAndPrize(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/addpoolandprizebreak`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let addPool = {
        addpool: res
      }
      return addPool;
    });
}
function addDomMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/addlocalmatch`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let adddommatch = {
        adddommatch: res
      }
      return adddommatch;
    });
}


function updateMatchTime(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/matchtimeupdate`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let updatematchtime = {
        updatematchtime: res
      }
      return updatematchtime;
    });
}


function cancelMatch(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    "Authorization": authHeader().Authorization
  });
  const requestOptions = {
    method: "POST",
    headers: header,
    body: JSON.stringify(data)
  }
  return fetch(CONST.BACKEND_URL + `/api/cancelMatch`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let cancelmatch = {
        cancelmatch: res
      }
      return cancelmatch;
    });
}


function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.msg) || response.statusText;
      return Promise.reject(error);
    }
    if (data.error) {
      const error = (data && data.msg) || response.statusText;
      return Promise.reject(error);
    }
    //console.log("datadatadata ", data);

    return data;
  });
}