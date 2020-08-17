import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";


export default function AddRecurringEntry(props) {
  const [entryName, setEntryName] = useState(null);
  const [entryCost, setEntryCost] = useState(null);
  const [entryStartDate, setEntryStartDate] = useState(null);
  const [entryEndDate, setEntryEndDate] = useState(null);
  const [entryCategory, setEntryCategory] = useState(null);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(
          entryName,
          entryCost,
          entryCategory,
          entryStartDate,
          entryEndDate
        );
      }}
      className="recurring-form"
    >
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            placeholder="Date"
            aria-label="Date"
            type="date"
            onChange={(event) => setEntryStartDate(event.target.value)}
            max={entryEndDate}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            placeholder="Date"
            aria-label="Date"
            type="date"
            onChange={(event) => setEntryEndDate(event.target.value)}
            min={entryStartDate}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <FormControl
            placeholder="Item"
            aria-label="Item"
            onChange={(event) => setEntryName(event.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Control
            placeholder="Cost"
            aria-label="Cost"
            type="number"
            step=".01"
            onChange={(event) => setEntryCost(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control
            placeholder="Category"
            aria-label="Category"
            as="select"
            onChange={(event) => {
              setEntryCategory(
                event.target.options[event.target.selectedIndex].text
              );
            }}
            defaultValue=""
            required
          >
            <option disabled value="">
              Select
            </option>
            {props.categories.map((category) => (
              <option>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Button variant="outline-secondary" type="submit">
          Add Recurring Entry
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={props.onClose}>Close</Button>
      </Form.Row>
    </Form>
  );
}