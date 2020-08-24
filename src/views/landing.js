import React from "react";
import "./landing.scss";
import {Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import SignInComponent from "../components/sign_in"

import Header from "../containers/header"


export default function LandingView() {
  return (
    <div className="landing-view">
      <Header/>
      <div className="landing-circle"></div>
      <div className="signup-panel">
        <h1>millamoolah.</h1>
        <p>Your money manager, all in one.</p>
        <Card>
        <SignInComponent/>
        </Card>
        
      </div>
      
      
    </div>
  );
}
