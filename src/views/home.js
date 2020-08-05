import React, { useEffect, useState } from "react";
import "./home.scss";
import { API_URL } from "../api_url";

import Layout from "../containers/layout";

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

  const mmYYYYComparator = (a, b) => {
    const [aMonth, aYear] = a.split("-");
    const [bMonth, bYear] = b.split("-");
    if (aYear < bYear) {
      return -1;
    } else if (aYear > bYear) {
      return 1;
    } else {
      if (aMonth < bMonth) {
        return -1;
      } else if (aMonth > bMonth) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  const monthlyOverviewToChart = () => {
    if (user) {
      const monthlyOverview = [...user.monthy_overview];
      monthlyOverview.sort((itemA, itemB) => {
        return mmYYYYComparator(itemA.date, itemB.date);
      });
      const monthlyExpense = [];
      const monthlyIncome = [];
      monthlyOverview.forEach((d) => {
        monthlyExpense.push([d.date, d.month_expense]);
        monthlyIncome.push([d.date, d.month_income]);
      });
      console.log(monthlyExpense);
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

  useEffect(() => {
    console.log(monthlyOverviewData);
  });

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
              <Card className="overview-card">
                <Card.Title>Spending</Card.Title>
                user.monthly
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="overview-card">
                <Card.Title>Savings</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}