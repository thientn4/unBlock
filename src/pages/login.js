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
        localStorage.setItem('email', res.account.username.toLowerCase())
        localStorage.setItem('token', 'A'+res.idToken) // 'A' for Azure
        navigate("account")
      })
      .catch((error) => {
        // Handle login error
        if(!String(error).includes("cancelled"))alert(`Login error: '${error}'`);
      });
    };
    const loginGoogle = async(obj)=>{
      console.log(obj.credential)
      localStorage.setItem('token', 'G'+obj.credential) // 'A' for Azure
      navigate("account")
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
          <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'1.3in'
          }}>
            <div style={{
              display:'flex',
              flexDirection:'column',
              width:'0.41in', 
              height:'0.41in', 
              borderRadius:'0.5in', 
              justifyContent:'center',
              alignItems:'center', 
              border:'0.02in solid',
              borderColor:'grey'
            }}>
              <img style={{width:'0.25in'}} src={require('../assets/signinBtn.png')} onClick={loginAzure} alt='signin button'></img>
            </div>
            <div style={{
              display:'flex',
              flexDirection:'column',
              width:'0.45in', 
              height:'0.45in', 
              borderRadius:'0.5in', 
              justifyContent:'center',
              alignItems:'center', 
              backgroundColor:'grey'
            }}>
              <GoogleLogin 
                onSuccess={(credential)=>loginGoogle(credential)}
                type="icon"
                shape="circle"
              />
            </div>
          </div>
        </div>
    );
}

export default Login;