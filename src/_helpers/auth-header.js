// import React from 'react'
// import  { Redirect } from 'react-router-dom'
// return <Redirect to='/login'  />


export const overrideLoaderCss = "display: block;margin: 0 auto;border-color: red;"; 
export const loaderColorCode = "#ea4c89";
export function authHeader() {
    // return authorization header with jwt token

    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}