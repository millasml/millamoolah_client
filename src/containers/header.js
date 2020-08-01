import { Link } from "react-router-dom"
import React from "react"


import "./header.scss"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

export default function Header(props) {
  return (
    <header className="header">
      <Navbar fixed="top">
        <Navbar.Brand><Link exact to = "/"><h1>millamoolah.</h1></Link></Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>ABOUT</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>SETTINGS</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </header>
  )
}