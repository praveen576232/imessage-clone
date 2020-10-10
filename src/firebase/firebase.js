import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCpRhZCT1PXdI8K_-5ANcKRMRtq5Uerw1Y",
    authDomain: "tryfirebase-c4edd.firebaseapp.com",
    databaseURL: "https://tryfirebase-c4edd.firebaseio.com",
    projectId: "tryfirebase-c4edd",
    storageBucket: "tryfirebase-c4edd.appspot.com",
    messagingSenderId: "984435581868",
    appId: "1:984435581868:web:cef7bb35ae293f1aaa9009"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export {auth,provider};
