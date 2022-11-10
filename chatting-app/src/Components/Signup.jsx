import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDu9vt8G3TVHwkJvfilXa0lyvwst3Da_lI",
      authDomain: "a-chatting-app-b721d.firebaseapp.com",
      projectId: "a-chatting-app-b721d",
      storageBucket: "a-chatting-app-b721d.appspot.com",
      messagingSenderId: "145084853077",
      appId: "1:145084853077:web:693671cbb7de2a63b15ddc",
      measurementId: "G-0S6LDGBZEV"
};

firebase.initializeApp(firebaseConfig);
  
  
const auth = firebase.auth();


function Signup() {
    const logginIn = ()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
  return (
    <div>
        <h1>Signup to Umang Arora's Chatting App</h1>
      <button className="button-24" onClick={logginIn}>Sign up</button>
    </div>
  )
}

export default Signup
