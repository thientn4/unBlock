import React, { useEffect, useState } from "react";
import { PublicClientApplication } from '@azure/msal-browser';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [waiting, setWaiting]=useState(false)
    const navigate=useNavigate();
    const pca = new PublicClientApplication({
      auth: {
        clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
        authority: 'https://login.microsoftonline.com/'+process.env.REACT_APP_AZURE_TENANT_ID,
        //redirectUri: 'http://localhost:3002/fleet/login',
      },
    });
    useEffect(() => {
      if(localStorage.getItem('userInfo')&&localStorage.getItem('token'))navigate("deliveries")
    }, []);
    const loginAzure = async () => {
    //   if(waiting)return
    //   pca.loginPopup({prompt: "select_account"})
    //   .then(async (res) => {
    //     // Handle successful login
    //     setWaiting(true)
    //     axios({
    //       url:process.env.REACT_APP_BACKEND+'fleet/login',
    //       method:'POST',
    //       timeout: 20000,
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       data:JSON.stringify({
    //         "azureToken":res.idToken
    //       })
    //     }).then((response)=>{
    //       if(response.data.status==='success'){
    //         localStorage.setItem('token', response.data.token)
    //         localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
    //         //console.log(JSON.parse(localStorage.getItem('userInfo')))
    //         //localStorage.removeItem('toRemove')
    //         //localStorage.removeItem('token')
    //         setWaiting(false)
    //         navigate("deliveries")
    //       }else if(response.data.status==='no user found'){
    //         alert('User not found')
    //         setWaiting(false)
    //       }else{
    //         alert("An error occured, please try again later")
    //         setWaiting(false)
    //       }
    //     }).catch((error)=>{
    //       alert("An error occured, please try again later")
    //       setWaiting(false)
    //     })
    //   })
    //   .catch((error) => {
    //     // Handle login error
    //     if(!String(error).includes("cancelled"))alert(`Login error: '${error}'`);
    //   });
    };
    const loginGoogle = async()=>{

    }
    return (
        <div className="Login" style={{
            display:'flex',
            flexDirection:'column',
            width:'100vw',
            height:'100svh',
            justifyContent:'center',
            alignItems:'center', 
            opacity:waiting?0.4:1,
            userSelect: 'none'
        }}>
          <img style={{width:'2in', paddingBottom:'1in'}} src={require('../assets/logo.png')} alt='logo'></img> 
          <img style={{width:'2.2in', paddingBottom:'0.2in'}} src={require('../assets/signinBtn.png')} onClick={loginAzure} alt='signin button'></img>
          <GoogleLogin onSuccess={loginGoogle} />
        </div>
    );
}

export default Login;