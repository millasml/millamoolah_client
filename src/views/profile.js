import React, { useEffect } from "react";
import "./profile.scss";
import { API_URL } from "../api_url";
import { Link } from "react-router-dom";

import Layout from "../containers/user_layout";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { useSelector, useDispatch } from "react-redux";
import { signIn, selectUser } from "../redux/slices/user_slice";

export default function ProfileView() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, [user]);

  return (
    <div className="profile-view">
      <Layout>
        {user !== null && (
          <Container>
            <Row>
              <Col className="text-center mt-5 mb-5">
                <Card>
                  <Card.Title>user profile</Card.Title>
                  <Row>
                    <Col>
                      <p>{user.name}</p>
                      <p>{user.location}</p>
                      <p>{user.main_currency}</p>
                      <p>{user.email}</p>
                    </Col>
                    <Col>
                      <Card className = "goal-card">
                        <Card.Title>goals</Card.Title>
                        {user.goals.map((goal) => {
                          return (
                            <>
                              <p>
                                {goal.item} {goal.isComplete.toString()}
                              </p>
                            </>
                          );
                        })}
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Title>Recurring Spending</Card.Title>
                  <Card.Body>
                    {user.recurring_expenses.map((entry) => {
                      return (
                        <p>
                          {entry.item} from {entry.start_date} to{" "}
                          {entry.end_date} of amount {entry.amount}
                        </p>
                      );
                    })}
                    }
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Title>Recurring Income</Card.Title>
                  <Card.Body>
                    {user.recurring_incomes.map((entry) => {
                      return (
                        <p>
                          {entry.item} from {entry.start_date} to{" "}
                          {entry.end_date} of amount {entry.amount}
                        </p>
                      );
                    })}
                    }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </Layout>
    </div>
  );
}
