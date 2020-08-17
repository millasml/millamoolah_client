import React, { useState, useEffect } from "react";
import "./savings.scss";
import { getSavingsData, deleteSavingsEntry } from "../lib";
import { Link } from "react-router-dom";

import Layout from "../containers/user_layout";
import TransactionEntry from "../components/database_entry";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { Chart } from "react-charts";
import { PieChart } from "react-minimal-pie-chart";

import { useSelector, useDispatch } from "react-redux";
import {
  initializeSavingsData,
  selectSavingsData,
} from "../redux/slices/savings_slice";

const COLORS = ["#1A535C", "#4ECDC4", "#FBB13C", "#FF5B5B", "#006992"];

export default function Savings() {
  const savingsData = useSelector(selectSavingsData);
  const dispatch = useDispatch();

  const [currentYear, setCurrentYear] = useState(2020);

  const setSavingsData = async () => {
    dispatch(initializeSavingsData(await getSavingsData()));
  };

  const deleteEntry = (id) => {
    deleteSavingsEntry(id).then(setSavingsData());
  };

  useEffect(() => {
    setSavingsData();
  }, []);

  return (
    <div className="savings-view">
      <Layout>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Title>your savings so far</Card.Title>
                <Card.Body>a cumulative chart</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-5 mb-5">
              <Link to="/savings/edit">
                <Button>Add New Income Entry</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Title>Sources of Income</Card.Title>
                <ListGroup variant="flush">
                  {savingsData &&
                    savingsData.map((item) => {
                      return (
                        <TransactionEntry
                          date={new Date(item.date).toDateString()}
                          item={item.item}
                          cost={item.amount}
                          category={item.category}
                          onDelete={() => {
                            deleteEntry(item._id);
                          }}
                        />
                      );
                    })}
                </ListGroup>
                <div></div>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
