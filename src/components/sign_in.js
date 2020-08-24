import React, { useState, useEffect } from "react";
import "./sign_in.scss";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as firebase from "firebase/app";

import "../helpers/firebase_config";

import { ERROR_MESSAGES } from "../helpers/firebase_errors";

export default withRouter(function SignInComponent(props) {
  const [userSignedIn, setUserSignedIn] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  function storeIdToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        console.log(token);
        sessionStorage.setItem("jwtToken", token);
      });
  }

  function submitEmailandPassword() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log(error);
        setErrorMessage(ERROR_MESSAGES.get(error.code));
      });
  }

  useEffect(() => {
    if (userSignedIn) {
      props.history.push("/home");
    }
  }, [userSignedIn]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user
          .getIdToken()
          .then((token) => {
            console.log(token);
            sessionStorage.setItem("jwtToken", token);
          })
          .then(() => {
            setUserSignedIn(true);
          });
      } else {
        // No user is signed in.
      }
    });
  });

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }, [errorMessage]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submitEmailandPassword();
      }}
      className="sign-in"
    >
      <Form.Group controlId="sign-in-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="sign-in-password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign In
      </Button>
      &nbsp;&nbsp;
      <Link to="/sign-up">Dont have an account? </Link>
      <div className="error-container">
        {errorMessage !== null && errorMessage}
      </div>
    </Form>
  );
});
