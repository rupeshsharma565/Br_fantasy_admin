
import { authHeader } from '../_helpers';
import { CONST } from '../_config';
export const privateContestService = {
    getAllPrivateContest,updatePrivateContest,
};


function logout() {
    localStorage.removeItem('user');
    window.location.href = "#/login"
}

function getAllPrivateContest(data) {

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
    if(data.atype==="list" || data.atype==="upsert" || data.atype==="getbycnstsize" || data.atype==="upsertrank")
    {
        apiurl="/api/privatecontest";
    }
    else if(data.atype==="details")
    {
        apiurl="/api/privatecontest/"+data.id;
    }
    
    return fetch(CONST.BACKEND_URL + apiurl, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                listOfPrivateContest: res.data
            }
            return userObj;
        });
}



function updatePrivateContest(data) {
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
  if(data.atype==="create")
  {
    apiurl="/api/privatecontest/create";
  }
  if(data.atype==="edit")
  {
    apiurl="/api/privatecontest/edit";
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