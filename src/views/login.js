import React, { useState, useEffect } from "react";
import "./login.scss";

import * as firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const firebaseConfig = {
  apiKey: "AIzaSyAUjBL5JnANZN2EeRB5un8S3rnuwiIK1pY",
  authDomain: "millamoolah.firebaseapp.com",
  databaseURL: "https://millamoolah.firebaseio.com",
  projectId: "millamoolah",
  storageBucket: "millamoolah.appspot.com",
  messagingSenderId: "119001529989",
  appId: "1:119001529989:web:79c45d9967a5ad9867b3ec",
  measurementId: "G-78CGCSG3PX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "www.google.com",
  privacyPolicyUrl: "www.yahoo.com",
};

export default function LoginView() {
  function storeIdToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        console.log(token);
        sessionStorage.setItem("jwtToken", token);
      });
  }

  return (
    <div className="login-view">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
