
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const withdrawService = {
    getAllWithdraw,
    updateWithdraw
};
function logout() {
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function getAllWithdraw(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/api/getwithdrawalreq`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfWithdraws: res.data
            }
            return userObj;
        });
}
function updateWithdraw(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/withdrawstatus`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
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
        return data;
    });
}