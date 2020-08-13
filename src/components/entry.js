import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./entry.scss";

export default function Entry(props) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}

      draggable = "true"
      onDragStart = {(e) => {
          e.dataTransfer.setData("text/plain", props.entryIndex)
      }}
    >
      <InputGroup className="entry mb-3" style = {{backgroundColor: props.color}}>
        <FormControl
          placeholder="Item"
          aria-label="Item"
          defaultValue={props.entryName}
          plaintext
          readOnly
        />
        <FormControl
          placeholder="Cost"
          aria-label="Cost"
          aria-describedby="basic-addon2"
          defaultValue={parseFloat(props.entryCost).toFixed(2)}
          plaintext
          readOnly
        />
        <FormControl
          placeholder="Date"
          aria-label="Date"
          type="date"
          aria-describedby="basic-addon2"
          defaultValue={props.entryDate}
          plaintext
          readOnly
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit">
            <FontAwesomeIcon icon={faTimesCircle} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}
