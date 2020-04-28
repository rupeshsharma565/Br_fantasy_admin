
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const rewardsService = {
    getAllRewards,updateRewards,getAllRewardsSettings,getAllLevels,updateLevels,
};
function logout() {
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function getAllRewards(data) {

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
                listOfRewards: res.data
            }
            return userObj;
        });
}

function getAllRewardsSettings(data) {

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
                listOfRewards: res.data
            }
            return userObj;
        });
}



function updateRewards(data) {
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


function getAllLevels(data) { 

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
        apiurl="/api/bonuslevel";
    }
    if(data.apitype==="detail")
    {
        apiurl="/api/bonuslevel/"+data.promoid;
    }
    
    return fetch(CONST.BACKEND_URL + apiurl, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfLevels: res.data
            }
            return userObj;
        });
}

function updateLevels(data) {
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
    apiurl="/api/bonuslevel/create";
  }
  if(data.apitype==="edit")
  {
    apiurl="/api/bonuslevel/edit"; 
  }

  return fetch(CONST.BACKEND_URL + apiurl, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

/*
 function updateRewards(fdata) {
    let formData = new FormData();
  //  formData.append('imgtype', 'playerimg');
   // formData.append('images[]', picture[picture.length - 1]);
   formData=fdata;
    let apiurl="";
      if(fdata.apitype==="create")
      {
        apiurl="/api/promocode/create";
      }
      if(fdata.apitype==="edit")
      {
        apiurl="/api/promocode/edit";
      }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + apiurl, formData, config)
      .then(handleResponse)
      .then(res => {
        return res;
      }); 
      //.catch(error => {});
    
  }
  */

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