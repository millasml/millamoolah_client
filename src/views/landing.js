import React from "react";
import "./landing.scss";
import {Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Header from "../containers/header"


export default function LandingView() {
  return (
    <div className="landing-view">
      <Header/>
      <div className="landing-circle"></div>
      <div className="signup-panel">
        <h1>millamoolah.</h1>
        <p>Your money manager, all in one.</p>
        <Link to="/login">
          <Button>Sign Up</Button>
        </Link>
      </div>
      
      
    </div>
  );
}
