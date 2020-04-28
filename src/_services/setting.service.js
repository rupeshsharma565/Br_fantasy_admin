import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const settingService = {
  getGlobalPoints,
  addGlobalPoints,
  getMainSetting,
  updateMainSetting,
  getCatptainsSetting,
  updateCatptainsSetting,
  getGameType,
  getReferralPoint,
  updateReferralPoint,
  getstaticpage,
  updatestaticpage,
  getSliderList,
  addSlider,
  udpateSlider
};
function logout() {
  localStorage.removeItem('user');
  window.location.href = "#/login"
}
function getGlobalPoints(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/getglobalpoints`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        listOfsettings: res.data
      };
      return userObj;
    });
}
function getMainSetting(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/getglobalsetting`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        mainsettings: res.data
      };
      return userObj;
    });
}
function addGlobalPoints(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/addglobalpoints `, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}
function updateMainSetting(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/addglobalsetting `, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}
function getCatptainsSetting(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/getcapvcappoint`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let userObj = {
        captainsettings: res.data
      };
      return userObj;
    });
}
function updateCatptainsSetting(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/updatecapvcappoint `, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function getReferralPoint(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/getreferalcommisions `, requestOptions)
    .then(handleResponse)
    .then(res => {
      let data={
        referralDetails: res.data
      }
      return data;
    });
}
function updateReferralPoint(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/updatereferalcommisions `, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function getGameType() {
 
  const requestOptions = {
    method: 'GET',
  };
  return fetch(CONST.BACKEND_URL + `/getgametype`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function getstaticpage(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/getpage `, requestOptions)
    .then(handleResponse)
    .then(res => {
      let data={
        staticpageDetails: res.data
      }
      return data;
    });
}
function getSliderList(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/getslider`, requestOptions)
    .then(handleResponse)
    .then(res => {
      let data={
        sliderList: res.data
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

function addSlider(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/addslider`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function udpateSlider(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };
  return fetch(CONST.BACKEND_URL + `/api/addslider`, requestOptions)
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
    //console.log("datadatadata ", data);

    return data;
  });
}

