import React, { useEffect, useState } from "react";
import { PublicClientApplication } from '@azure/msal-browser';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    const navigate=useNavigate();
    const pca = new PublicClientApplication({
      auth: {
        clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
        authority: 'https://login.microsoftonline.com/common'
      },
    });
    useEffect(() => {
      if(localStorage.getItem('token'))navigate("account")
    }, []);
    const loginAzure = async () => {
      pca.loginPopup({prompt: "select_account"})
      .then(async (res) => {
        // Handle successful login
        localStorage.setItem('token', 'A'+res.idToken) // 'A' for Azure
        navigate("account")
      })
      .catch((error) => {
        // Handle login error
        if(!String(error).includes("cancelled"))alert(`Login error: '${error}'`);
      });
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
            userSelect: 'none'
        }}>
          <img style={{width:'2in', paddingBottom:'1in'}} src={require('../assets/logo.png')} alt='logo'></img> 
          <img style={{width:'2.2in', paddingBottom:'0.2in'}} src={require('../assets/signinBtn.png')} onClick={loginAzure} alt='signin button'></img>
          <div style={{width:'2.19in'}}>
            <GoogleLogin 
              onSuccess={loginGoogle}
              render={renderProps => (
                <button style={{width:'2.2in', paddingBottom:'0.2in'}}>This is my custom Google button</button>
              )} 
              buttonText="Login"
            />
          </div>
        </div>
    );
}

export default Login;