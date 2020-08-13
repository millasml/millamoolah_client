import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import "./add_entry.scss";

export default function AddSpendingEntry() {

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target);
      }}
    >
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Item"
          aria-label="Item"
          aria-describedby="basic-addon2"
          required
        />
        <FormControl
          placeholder="Cost"
          aria-label="Cost"
          aria-describedby="basic-addon2"
          pattern="^[0-9].?[0-9]+$"
          required
        />
        <FormControl
          placeholder="Date"
          aria-label="Date"
          type="date"
          aria-describedby="basic-addon2"
          required
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit">
            Button
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}
