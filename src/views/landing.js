import React from "react";
import "./landing.scss";
import {Link } from "react-router-dom";

import Button from "react-bootstrap/Button";


export default function Landing() {
  return (
    <div className="landing-page">
      <div className="info">
        <Link to="/home">ABOUT</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/contact">CONTACT</Link>
      </div>
      <div className="landing-circle"></div>
      <div className="signup-panel">
        <h1>millamoolah</h1>
        <p>Your money manager, all in one.</p>
        <Link to="/login">
          <Button>Sign Up</Button>
        </Link>
      </div>
      
      
    </div>
  );
}
