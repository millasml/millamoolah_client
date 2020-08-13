import React, { useState, useEffect } from "react";
import "./spending_edit.scss";
import { API_URL } from "../api_url";
import { Link } from "react-router-dom";


import Layout from "../containers/user_layout";
import AddSpendingEntry from "../components/add_entry"

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";



const COLORS = ["#006992", "#1A535C", "#4ECDC4", "#FBB13C", "#FF5B5B"];

const CATEGORIES = [
  "Travel",
  "Transportation",
  "Food",
  "Utilities",
  "Subscriptions",
  "Others",
];

export default function SpendingEdit() {
  return (
    <div className="spending-edit-view dark-theme">
      <Layout>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Title>Add Transactions Here</Card.Title>
                <AddSpendingEntry/>
              </Card>
            </Col>
            <Col>
              <Row>
                {CATEGORIES.map((category, index) => {
                  return (
                    <Col xs={6} className="mb-5">
                      <Card className="category-card" style = {{backgroundColor: COLORS[index]}}>
                        <Card.Title>
                          <h1>{category}</h1>
                        </Card.Title>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              <Row>
              <Link to= "/spending"><Button>Finished</Button></Link>
              </Row>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
