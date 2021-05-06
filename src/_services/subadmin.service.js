
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const subadminService = {
    getAllSubAdmin,
    addSubAdmin,
    deletesubAdminService,
    getAllResourceList,
    saveAssignResourceSubAdmin,
    getAssignedResourceList,
    udpateStatus,
    getSelectedSubMenu
};
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function getAllSubAdmin(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/listsubadmin`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfSubAdmins: res.data
            }
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
    return fetch(CONST.BACKEND_URL + `/api/menus`, requestOptions)//listresoures
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
    return fetch(CONST.BACKEND_URL + `/api/updatesubadminstatus`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                updatestatus: res.data
            }
            return userObj;
        });
}

function getSelectedSubMenu(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getassignrole `, requestOptions)
        .then(handleResponse)
        .then(res => {
            console.log(JSON.stringify(res));

            let userObj = {
                getselmenu: res.data
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