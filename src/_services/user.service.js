
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const userService = {
    login,
    logout,
    getAll,
    updateUserStatus,
    getAllNotification,
    getAllCONTACT,
    getAllInfo,
    udpateUserKYC,
    udpateUserDetails,
    changePassword
};

function login(username, password) {
    let header = new Headers({
        'Content-Type': 'application/json'
    });
    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ username: username, password: password })
    };
    return fetch(CONST.BACKEND_URL + `/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.data.token) {
                localStorage.setItem('user', JSON.stringify(user.data));
            }
            return user;
        });
}
function logout() {
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function getAll(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getusers`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                listOfUser: data.data
            }
            return userObj;
        });
}

function getAllNotification(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getnotification`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                listNotification: data.data
            }
            return userObj;
        });
}

function getAllInfo(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getuserinfo`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                userInfo: data.data
            }
            return userObj;
        });
}

function getAllCONTACT(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getcontactus`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                listCONTACT: data.data
            }
            return userObj;
        });
}

function updateUserStatus(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/updateuserstatus`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                updatedata: data
            }
            return userObj;
        });
}

function udpateUserKYC(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/updatekycstatus`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                updatekyc: data
            }
            return userObj;
        });
}

function changePassword(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/changepassword`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function udpateUserDetails(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/updateuserinfo`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                updatekyc: data
            }
            return userObj;
        });
}


function handleResponse(response) {
    console.log("response22222   ");

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        //console.log("datadatadatadatadata   ", data.error);
        if (data.error) {
            console.log("datadatadatadatadata   ", data.error);
            const error = (data && data.msg) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}