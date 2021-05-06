
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const paymentService = {
    getBankDetails,
    getPanCardDetails
};
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.href = "#/login"
}
function getBankDetails(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getuserbankdetails`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfPayments: res.data
            }
            return userObj;
        });
}
function getPanCardDetails(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getuserpancards`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfPancard: res.data
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