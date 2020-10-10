import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase/firebase";
import Imessage from "./imessage/Imessage";
import Login from "./login/Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
   
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
      
        dispatch(
          login({
            uid: authuser.uid,
            displayName: authuser.displayName,
            email: authuser.email,
            photourl: authuser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, []);
  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
