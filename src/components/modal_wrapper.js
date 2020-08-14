import React, { useState } from "react";

import "./modal_wrapper.scss";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ModalWrapper(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow} className="modal-button">
        {props.children}
      </div>

      <Modal show={show} onHide={handleClose} className="modal-wrapper">
        <Modal.Header closeButton>
          <Modal.Title>{props.headerText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.bodyText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.onConfirmation();
              handleClose();
            }}
          >
            {props.confirmationText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
