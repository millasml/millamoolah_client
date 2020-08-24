import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "./user_layout.scss";

import * as firebase from "firebase/app";

import "../helpers/firebase_config";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import Footer from "../containers/footer";
import ModalWrapper from "../components/modal_wrapper";

const SignOutButton = withRouter((props) => {
  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        sessionStorage.removeItem("jwtToken");
        props.history.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
  }
  return (
    <ModalWrapper
      headerText="Before you go......"
      bodyText="Are you sure you want to sign out of millamoolah?"
      confirmationText="Yes"
      onConfirmation={signOut}
    >
      <Button className="signout-button">SIGN OUT</Button>
    </ModalWrapper>
  );
});

function Header(props) {
  return (
    <header className="header">
      <Navbar fixed="top">
        <Navbar.Brand>
          <Link to="/home">
            <h1>millamoolah.</h1>
          </Link>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>
              <Link to="/home">HOME</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/spending">SPENDING</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/savings">SAVING</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/profile">PROFILE</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <SignOutButton />
          </Nav.Item>
        </Nav>
      </Navbar>
    </header>
  );
}

export default function UserLayout(props) {
  return (
    <div className="user-layout">
      <Header />
      <div className="content">{props.children}</div>

      <Footer />
    </div>
  );
}
