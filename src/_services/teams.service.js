import { authHeader } from '../_helpers';
import { CONST } from '../_config';
import axios from 'axios';
export const teamService = {
    uploadPlayerImg,
    addPlayer,
    getPlayerList,
    getCountryList,
    getRoleList,
};
function logout() {
    localStorage.removeItem('user');
    window.location.href = "#/login"
}
function getPlayerList(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getplayer`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfPlayers: res.data
            }
            return userObj;
        });
}
function uploadPlayerImg(formData) {

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': authHeader().Authorization
        }
    };
    axios.post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config)
        .then(handleResponse)
        .then((response) => {
            alert("The file is successfully uploaded1111111111111");
            console.log("response   ", response);
            return response.data;
        })
        .catch((error) => {
            console.log('========================33333333============');
            console.log(error);
            console.log('====================================');
        });
}
function addPlayer(data) {

   

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    let apiurl="/api/addplayers";
    if(data.sspid!=="0")
    {
        apiurl="/api/editplayers";
    }
   

    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    };
    return fetch(CONST.BACKEND_URL + apiurl, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}
function getCountryList() {
    const requestOptions = {
        method: "GET",
    }
    return fetch(CONST.BACKEND_URL + `/getcountry`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let countryObj = {
                countryList: res.data
            }
            return countryObj;
        });
}
function getRoleList() {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "GET",
        headers: header
    }
    return fetch(CONST.BACKEND_URL + `/getplayertypeadmin`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfRoles: res.data
            }
            return userObj;
        });
}
function handleResponse(response) {
  //  console.log("handleResponse   " + JSON.stringify(response));
    return response.text().then(text => {
       // console.log("texttexttexttexttext   ", text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (data.error) {
            console.log("datadatadatadatadata   ", data.error);
            const error = (data && data.msg) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

