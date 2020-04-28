
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const matchService = {
    getListMatches,
    addSubAdmin,
    deletesubAdminService,
    getAllResourceList,
    saveAssignResourceSubAdmin,
    getTeamList,
    addTeam
};
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function getListMatches(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/listmatches`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfMatches: res.data
            }
            return userObj;
        });
}



function getTeamList(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/listteam`, requestOptions)
        .then(handleResponse)
        .then(res => {
            console.log("Api response get ----------------", res)

            let teamList = res.data

            return teamList;
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
    return fetch(CONST.BACKEND_URL + `/api/addsubadmin`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                addsubadminres: res.data
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
    return fetch(CONST.BACKEND_URL + `/api/deletesubadmin`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                addsubadminres: res.data
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
                addsubadminres: res.data
            }
            return userObj;
        });
}

function addTeam(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/addteam`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                addteamres: res
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
