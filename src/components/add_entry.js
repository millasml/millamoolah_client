import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import "./add_entry.scss";

export default function AddSpendingEntry(props) {

  const [entryName, setEntryName] = useState(null)
  const [entryCost, setEntryCost] = useState(null)
  const [entryDate, setEntryDate] = useState(null)

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(entryName, entryCost, entryDate)
      }}
    >
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Item"
          aria-label="Item"
          onChange = {event => setEntryName(event.target.value)}
          required
        />
        <FormControl
          placeholder="Cost"
          aria-label="Cost"
          type = "number"
          step=".01"
          onChange = {event => setEntryCost(event.target.value)}
          required
        />
        <FormControl
          placeholder="Date"
          aria-label="Date"
          type="date"
          onChange = {event => setEntryDate(event.target.value)}
          required
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit">
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}
