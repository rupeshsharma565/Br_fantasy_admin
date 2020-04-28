import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const notificationService = {
  getnotificndetail,
  getnotificnlist,
  updatestaticpage,
  addnotification
};


function getnotificndetail(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/notificationlist `, requestOptions)
    .then(handleResponse)
    .then(res => {
      let data={
        notificndetail: res.data
      }
      return data;
    });
}


function getnotificnlist(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/notificationlist `, requestOptions)
    .then(handleResponse)
    .then(res => {
      let data={
        notificnlist: res.data
      }
      return data;
    });
}

function updatestaticpage(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/addpages `, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function addnotification(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/addnotification `, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}


