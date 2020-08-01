import { Link } from "react-router-dom";
import React from "react"

import "./footer.scss"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faTelegramPlane} from '@fortawesome/free-brands-svg-icons'


export default function Footer(props) {
  return (
    <footer className="footer">
      <Container className = "content">
        <Row>
          <Col>
            <h1>About</h1>
            <p>Topfolio is your one stop portfolio site solution, with fast delivery dates and guarantee that you will love you site. Thank you for your interest in us</p>
          </Col>
          <Col>
          <h1>Contact Us</h1>
          <p><FontAwesomeIcon icon = {faEnvelope}/> millasml@gmail.com</p>
          <p><FontAwesomeIcon icon = {faTelegramPlane}/> @millasml</p>
          </Col>
        </Row>
        <Row className = "text-center">
            <p >Copyright © 2020 All Rights Reserved | Topfolio 2020</p>
        </Row>
      </Container>
    </footer>
  )
}
