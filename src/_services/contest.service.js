
import { authHeader } from '../_helpers';
import { CONST } from '../_config';
import axios from 'axios';

export const contestService = {
    getAllContest,
    updateContestStatus,
    addContest
};
function logout() {
    localStorage.removeItem('user');
    window.location.href = "#/login"
}
function getAllContest(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
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

function updateContestStatus(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/contestUpdateStatus`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                updateContest: res.data
            }
            return userObj;
        });
}
function addContest(formData) {

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
    // let header = new Headers({
    //     'Content-Type': 'multipart/form-data',
    //     "Authorization": authHeader().Authorization
    // });

    // const requestOptions = {
    //     method: "POST",
    //     headers: header,
    //     body: data
    // }
    // return fetch(CONST.BACKEND_URL + `/api/addcontests`, requestOptions)
    //     .then(handleResponse)
    //     .then(res => {
    //         let userObj = {
    //             updateContest: res.data
    //         }
    //         return userObj;
    //     });
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