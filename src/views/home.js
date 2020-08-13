import React, { useEffect, useState } from "react";
import "./home.scss";
import { API_URL } from "../api_url";
import { Link } from "react-router-dom";

import {mmYYYYComparator} from "../helpers/comparator"
import Layout from "../containers/user_layout";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { Chart } from "react-charts";

import { useSelector, useDispatch } from "react-redux";
import { signIn, selectUser } from "../redux/slices/user_slice";

export default function HomeView() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [monthlyOverviewData, setMonthlyOverviewData] = useState([]);

  const getUserData = () => {
    fetch(API_URL + "user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),
      },
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        dispatch(signIn(JSON.parse(result)));
      })
      .catch((error) => console.log("error", error));
  };


  const monthlyOverviewToChart = () => {
    if (user) {
      const monthlyOverview = [...user.monthly_overview];
      monthlyOverview.sort((itemA, itemB) => {
        return mmYYYYComparator(itemA.date, itemB.date);
      });
      const monthlyExpense = [];
      const monthlyIncome = [];
      monthlyOverview.forEach((d) => {
        monthlyExpense.push([d.date, d.month_expense]);
        monthlyIncome.push([d.date, d.month_income]);
      });
      setMonthlyOverviewData([
        {
          label: "Expenses",
          data: monthlyExpense,
        },
        {
          label: "Income",
          data: monthlyIncome,
        },
      ]);
    }
  };

  const monthlyOverviewToSpending = () => {};

  const monthlyOverviewToSavings = () => {};

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    monthlyOverviewToChart();
  }, [user]);

  return (
    <div className="home-view">
      <Layout>
        <Container>
          <Row>
            <Col>
              <Card>
                <h1>
                  Welcome,{" "}
                  <span className="name">{user !== null && user.name}</span>
                </h1>
                <p>Check out an overview of your moolah.</p>
                <div className = "chart-container">
                {monthlyOverviewData.length > 0 && (
                  <Chart
                    data={monthlyOverviewData}
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
            <Col lg={6}>
              <Link to= "/spending"><Card className="overview-card">
                <Card.Title>Spending</Card.Title>
                user.monthly
              </Card></Link>
              
            </Col>
            <Col lg={6}>
            <Link to= "/savings"><Card className="overview-card">
                <Card.Title>Savings</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card></Link>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
