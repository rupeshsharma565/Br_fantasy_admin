
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const promocodeService = {
    getAllPromocode,updatePromocode,getAllPromocodeSettings,
};
function logout() {
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function getAllPromocode(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    let apiurl="";
    if(data.apitype==="list")
    {
        apiurl="/api/promocode";
    }
    if(data.apitype==="detail")
    {
        apiurl="/api/promocode/"+data.promoid;
    }
    
    return fetch(CONST.BACKEND_URL + apiurl, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfPromocode: res.data
            }
            return userObj;
        });
}

function getAllPromocodeSettings(data) {

    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    let apiurl="/api/promocode/settings";
   
    return fetch(CONST.BACKEND_URL + apiurl, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                paymenttype: res.data
            }
            return userObj;
        });
}



function updatePromocode(data) {
  let header = new Headers({
    'Content-Type': 'application/json',
    Authorization: authHeader().Authorization
  });
  const requestOptions = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data)
  };

  let apiurl="";
  if(data.apitype==="create")
  {
    apiurl="/api/promocode/create";
  }
  if(data.apitype==="edit")
  {
    apiurl="/api/promocode/edit";
  }

  return fetch(CONST.BACKEND_URL + apiurl, requestOptions)
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