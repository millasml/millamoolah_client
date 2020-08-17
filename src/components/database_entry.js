import React from "react";

import "./database_entry.scss";

import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ModalWrapper from "../components/modal_wrapper"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function TransactionEntry(props) {
  return (
    <ListGroup.Item className="database-entry">
      <Row>
        <Col lg={8}>
          <small>{props.date}</small>
          <h5>{props.item}</h5>
          <small>{props.category}</small>
        </Col>
        <Col className="vertical-center">
          <h6>${props.cost}</h6>
        </Col>
        <Col className="vertical-center" lg = {1}>
            <ModalWrapper
            headerText = "Do you want to delete this entry?"
            bodyText = {`You are attempting to delete ${props.item} recorded on ${props.date}. Would you like to proceed?`}
            confirmationText = "Proceed"
            onConfirmation = {props.onDelete}>
            <FontAwesomeIcon icon={faTimesCircle} />
            </ModalWrapper>
          
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
