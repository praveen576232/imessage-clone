import './Login.css';
import React from 'react'
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase/firebase';

function Login() {
    const signin =() =>{
        auth.signInWithPopup(provider)
        .catch((err)=>alert(err.message))
        .then((user)=>{
            console.log(user);
        })
    }
    return (
        <div className="login">
          <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png"></img>
          <h2>iMessage</h2>
          <Button onClick={signin} className="login_button">Login in</Button>
        </div>
    )
}

export default Login
