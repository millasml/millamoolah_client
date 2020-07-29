import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";

import Button from "react-bootstrap/Button";

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
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "www.google.com",
  privacyPolicyUrl: "www.yahoo.com",
};

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const [dbResponse, setDbResponse] = useState("");
  const [dataResponse, setDataResponse] = useState("");

  function callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  }

  function callDB() {
    fetch("http://localhost:9000/testDB")
      .then((res) => res.text())
      .then((res) => setDbResponse(res))
      .catch((err) => err);
  }
  function callData() {
    fetch("http://localhost:9000/testData")
      .then((res) => res.text())
      .then((res) => setDataResponse(res))
      .catch((err) => err);
  }

  function storeIdToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        console.log(token)
        sessionStorage.setItem('jwtToken', token)
      })
  }

  function getIdToken() {
    console.log(sessionStorage.getItem('jwtToken'))
  }

  useEffect(() => {
    callAPI();
    callDB();
    callData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <p>{apiResponse}</p>
        <p>{dbResponse}</p>
        <p>{dataResponse}</p>

        <Button
          onClick={() => {
            console.log("click!");
            storeIdToken();
          }}
        >
          Store Token
        </Button>
        <Button onClick = {getIdToken}>
          Get Token
        </Button>
      </header>
    </div>
  );
}

export default App;
