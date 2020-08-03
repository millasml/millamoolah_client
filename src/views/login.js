import React from "react";
import "./login.scss";

import Layout from "../containers/layout";

import { useDispatch } from "react-redux";
import { signIn } from "../redux/slices/user_slice";

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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export default function LoginView() {
  const dispatch = useDispatch();

  function storeIdToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        console.log(token);
        sessionStorage.setItem("jwtToken", token);
      });
    dispatch(signIn(firebase.auth().currentUser.displayName))
  }
  
  const uiConfig = {
    signInSuccessUrl: "/home",
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        storeIdToken();
        return true;
      },
    },
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "/toc",
    privacyPolicyUrl: "/privacy-policy",
  };

  return (
    <div className="login-view">
      <Layout>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Layout>
    </div>
  );
}
