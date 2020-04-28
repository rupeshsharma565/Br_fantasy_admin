
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const onepagereportService = {
    onepagereportfilter,
    addSubAdmin,
    deletesubAdminService,
    getAllResourceList,
    saveAssignResourceSubAdmin,
    getAssignedResourceList,
    udpateStatus,
    getMatchList,
    getContestList,
    getPoolList,
    getOnePageReport,
    getTeamPlayerList,
    getTeamPlayerAll,
    updateTeamPlayer
};
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function onepagereportfilter(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/onepagereportfilter`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                filters: res.data
            }
            return userObj;
        });
}
function getMatchList(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/matchfilter`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                matchfilter: res.data
            }
            return userObj;
        });
}

function getContestList(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/contestfilter`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                contestfilter: res.data
            }
            return userObj;
        });
}

function getPoolList(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/contestpoolfilter`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                poolfilter: res.data
            }
            return userObj;
        });
}

function getOnePageReport(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/onepagereport`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                onepagedata: res.data
            }
            console.log(userObj);
            
            return userObj;
    });
}


function addSubAdmin(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/addonepagereport`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                addonepagereportres: res.data
            }
            return userObj;
        });
}
function deletesubAdminService(data) {
    //console.log("Enter into service ", data);

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/deleteonepagereport`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                addonepagereportres: res.data
            }
            return userObj;
        });
}
function getAllResourceList() {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header
    }
    return fetch(CONST.BACKEND_URL + `/api/listresoures`, requestOptions)
        .then(handleResponse)
        .then(res => {
            console.log(JSON.stringify(res));

            let userObj = {
                listOfResource: res.data
            }
            return userObj;
        });
}
function getAssignedResourceList(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getassignrole`, requestOptions)
        .then(handleResponse)
        .then(res => {
            console.log(JSON.stringify(res));

            let userObj = {
                listOfAssignedResource: res.data
            }
            return userObj;
        });
}
function saveAssignResourceSubAdmin(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/assignrole`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                updateResource: res
            }
            return userObj;
        });
}
function udpateStatus(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/updateonepagereportstatus`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                updatestatus: res.data
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

function getTeamPlayerList(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/teamplrs`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                teamplaylist: res.data
            }
            return userObj;
        });
}

function getTeamPlayerAll(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/frontapi/getmatchteamfront`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                teamplayall: res.data
            }
            return userObj;
        });
}


function updateTeamPlayer(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/updateteamuseradmin`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                updateteamplayer: res.data
            }
            return userObj;
        });
}