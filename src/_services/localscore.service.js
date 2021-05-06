
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const localscoreService = {
    getLocalMatchList,
    getAllLocalScore,
    getPlayerList,
    addLocalScore,
    getmatchdetail
};
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function getAllLocalScore(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "GET",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/listlocalscore`, requestOptions)
    //return fetch(`http://172.104.186.169:9990/match?matchid=1168246`,requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                liveData: res.data
            }
            return userObj;
        });
}
function getPlayerList(matchid) { 
    
    let data={"matchid":matchid};
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getlocalmatchteam`, requestOptions)
    //return fetch(`http://172.104.186.169:9990/match?matchid=1168246`,requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listPlayers: res.data
            }
            return userObj;
        });
}


function getLocalMatchList() {

    let data={"gameid":1};
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getlocalmatch`, requestOptions)
    //return fetch(`http://192.168.1.17/brfantasy/public/api/getmastertblmatchupcomming`,requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                localmatchlist: res.data
            }
            return userObj;
        });
}


function addLocalScore(matchid,matchtype,matchlist) {

    let data={"matchid":matchid,"type":matchtype,"match":matchlist};
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/addscore`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                savescore: res
            }            
            return userObj;
        });
}


function getmatchdetail(matchid){
    let data={"matchid":matchid};
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getscore`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                localmatchdetail: res.data
            }
            return userObj;
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