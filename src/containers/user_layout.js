import React from "react";
import { Link } from "react-router-dom";

import "./user_layout.scss";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Footer from "../containers/footer";

function Header(props) {
  return (
    <header className="header">
      <Navbar fixed="top">
        <Navbar.Brand>
          <Link to="/">
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
