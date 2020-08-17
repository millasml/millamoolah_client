import React, { useState, useEffect } from "react";
import "./spending.scss";
import { getSpendingData, deleteSpendingEntry } from "../lib";
import { Link } from "react-router-dom";

import Layout from "../containers/user_layout";
import TransactionEntry from "../components/database_entry"

import { dateStringComparator } from "../helpers/comparator";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { Chart } from "react-charts";
import { PieChart } from "react-minimal-pie-chart";

import { useSelector, useDispatch } from "react-redux";
import { initializeSpendingData, selectSpendingData } from "../redux/slices/spending_slice";

import {COLORS} from "../categories"

export default function Spending() {
  const spendingData = useSelector(selectSpendingData);
  const dispatch = useDispatch();

  const [currentYear, setCurrentYear] = useState(2020);
  const [monthOnMonthData, setMonthOnMonthData] = useState([]);

  const setSpendingData = async () => {
    dispatch(initializeSpendingData(await getSpendingData()));
  };

  const deleteEntry = (id) => {
    deleteSpendingEntry(id).then(setSpendingData())
  };

  const spendingDataToMonth = () => {
    if (spendingData) {
      const spendingDataMonth = spendingData.filter(
        (item) =>
          new Date(item.date) >
          new Date(
            new Date(Date.now()).getFullYear(),
            new Date(Date.now()).getMonth(),
            1
          )
      );
      let pieData = {};
      for (let i = 0; i < spendingDataMonth.length; i++) {
        const currentEntry = spendingDataMonth[i];
        if (pieData[currentEntry.category]) {
          pieData[currentEntry.category] =
            pieData[currentEntry.category] + currentEntry.amount;
        } else {
          pieData[currentEntry.category] = currentEntry.amount;
        }
      }

      const pieDataProcessed = [];

      Object.entries(pieData).forEach(([k, v]) => {
        pieDataProcessed.push({
          title: k,
          value: v,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      });

      console.log(pieDataProcessed);

      setMonthOnMonthData(pieDataProcessed);
    }
  };

  useEffect(() => {
    setSpendingData();
  }, []);

  useEffect(() => {
    spendingDataToMonth();
  }, [spendingData]);

  return (
    <div className="spending-view">
      <Layout>
        <Container>
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Title>month on month</Card.Title>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Title>in this month......</Card.Title>
                <div className="pie-chart">
                  {monthOnMonthData.length > 0 && (
                    <PieChart
                      data={monthOnMonthData}
                      series={{
                        type: "bar",
                      }}
                      axes={[
                        { primary: true, type: "ordinal", position: "bottom" },
                        { position: "left", type: "linear", stacked: false },
                      ]}
                      tooltip
                    />
                  )}
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className = "text-center mt-5 mb-5">
            <Link to= "/spending/edit"><Button>Add New Transactions</Button></Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Title>Transactions</Card.Title>
                <ListGroup variant="flush">
                  {spendingData &&
                    spendingData.map((item) => {
                      return (
                        <TransactionEntry
                          date={new Date(item.date).toDateString()}
                          item={item.item}
                          cost={item.amount}
                          category = {item.category}
                          onDelete = {() => {
                            deleteEntry(item._id)
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
