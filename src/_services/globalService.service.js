import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const globalService = {
  getGlobalList
};
function logout() {
  localStorage.removeItem('user');
  window.location.href = "#/login"
}
function getGlobalList(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data.parameter)
  };

  return fetch(CONST.BACKEND_URL + data.apiurl, requestOptions)
    .then(handleResponse)
    .then(res => {

      let userObj = {
        [data.secondname]: res
      };
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
      const error = (data) || response.statusText;
      return Promise.reject(error);
    }
    if (data.error) {
      const error = (data) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

