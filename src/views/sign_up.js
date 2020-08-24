import React, { useState, useEffect } from "react";
import "./sign_up.scss";
import { withRouter } from "react-router-dom";
import { createNewUser } from "../lib";

import * as firebase from "firebase/app";

import "../helpers/firebase_config";

import Layout from "../containers/layout";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SignUpComponent = withRouter(function (props) {
  const [userSignedUp, setUserSignedUp] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [location, setLocation] = useState(null);
  const [currency, setCurrency] = useState(null);

  function addUserToDatabase() {
    const newUser = {
      email: email,
      name: `${firstName} ${lastName}`,
      location: location,
      main_currency: currency,
    };
    createNewUser(newUser);
    console.log("added user to db");
  }

  async function submitEmailandPassword() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setUserSignedUp(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (userSignedUp) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.getIdToken().then((token) => {
            console.log(token);
            sessionStorage.setItem("jwtToken", token);
            addUserToDatabase();
          });
        } else {
          // No user is signed in.
        }
      });
      console.log("User signed Up");
      setTimeout(() => {
        props.history.push("/home");
      }, 2000);
    }
  }, [userSignedUp]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submitEmailandPassword();
      }}
      className="sign-up"
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId="formNameFirst">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formNameLast">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formCurrency">
        <Form.Label>Currency</Form.Label>
        <Form.Control
          type="text"
          placeholder="Currency"
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
});

export default function SignUpView() {
  return (
    <div className="sign-up-view">
      <Layout>
        <div className="form-container">
          <h1>Welcome to millamoolah.</h1>
          <br />
          <Card>
            <SignUpComponent />
          </Card>
        </div>
      </Layout>
    </div>
  );
}
