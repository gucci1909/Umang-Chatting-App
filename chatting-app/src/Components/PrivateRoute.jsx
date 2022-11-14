import React from "react";
import Chatting from "./Chatting";
import Signup from "./Signup";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDu9vt8G3TVHwkJvfilXa0lyvwst3Da_lI",
  authDomain: "a-chatting-app-b721d.firebaseapp.com",
  projectId: "a-chatting-app-b721d",
  storageBucket: "a-chatting-app-b721d.appspot.com",
  messagingSenderId: "145084853077",
  appId: "1:145084853077:web:693671cbb7de2a63b15ddc",
  measurementId: "G-0S6LDGBZEV",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function PrivateRoute() {
  const [user] = useAuthState(auth);
  if (user) {
    return <Chatting />;
  }
  return <Signup />;
}

export default PrivateRoute;
