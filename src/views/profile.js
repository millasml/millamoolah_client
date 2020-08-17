import React, { useState, useEffect } from "react";
import "./profile.scss";
import {
  getUserData,
  submitRecurringSpendingEntries,
  submitRecurringSavingsEntries,
  deleteRecurringSavingsEntry,
  deleteRecurringSpendingEntry
} from "../lib";

import { SPENDING_CATEGORIES, SAVINGS_CATEGORIES } from "../categories";

import Layout from "../containers/user_layout";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import RecurringEntry from "../components/recurring_entry";
import AddRecurringEntry from "../components/add_recurring_entry";

import { useSelector, useDispatch } from "react-redux";
import { signIn, selectUser } from "../redux/slices/user_slice";

export default function ProfileView() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showAddSpending, setShowAddSpending] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);

  const setUserData = async () => {
    dispatch(signIn(await getUserData()));
  };

  const submitNewRecurringExpense = (
    entryName,
    entryCost,
    entryCategory,
    entryStartDate,
    entryEndDate
  ) => {
    const entry = {
      item: entryName,
      start_date: entryStartDate,
      end_date: entryEndDate,
      category: entryCategory,
      monthly_amount: entryCost,
    };
    submitRecurringSpendingEntries(entry).then(setUserData());
  };

  const submitNewRecurringIncome = (
    entryName,
    entryCost,
    entryCategory,
    entryStartDate,
    entryEndDate
  ) => {
    const entry = {
      item: entryName,
      start_date: entryStartDate,
      end_date: entryEndDate,
      category: entryCategory,
      monthly_amount: entryCost,
    };
    submitRecurringSavingsEntries(entry).then(setUserData());
  };

  const removeRecurringSpendingEntry = (id) => {
    console.log(id)
    deleteRecurringSpendingEntry(id).then(setUserData());
  };

  const removeRecurringSavingsEntry = (id) => {
    deleteRecurringSavingsEntry(id).then(setUserData());
  };

  useEffect(() => {
    if (!user) {
      setUserData();
    }
  }, [user]);

  return (
    <div className="profile-view">
      <Layout>
        {user && (
          <Container>
            <Row>
              <Col className="text-center mt-5 mb-5">
                <Card>
                  <Card.Title>user profile</Card.Title>
                  <Row>
                    <Col>
                      <div className="user-section">
                        <h1>
                          <span className="name">
                            {user !== null && user.name}
                          </span>
                        </h1>
                        <Row>
                          <Col lg={4}>
                            <h4>Location</h4>
                          </Col>
                          <Col>{user.location}</Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <h4>Main Currency</h4>
                          </Col>
                          <Col>{user.main_currency}</Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <h4>Email</h4>
                          </Col>
                          <Col>{user.email}</Col>
                        </Row>
                      </div>
                    </Col>
                    <Col>
                      <Card className="goal-card">
                        <Card.Title>
                          goals <Button>Edit</Button>
                        </Card.Title>
                        <Card.Body>
                          {user.goals.map((goal) => {
                            return (
                              <>
                                <Form.Check
                                  type={"checkbox"}
                                  id={`default-checkbox active`}
                                  label={goal.item}
                                  defaultChecked={goal.isComplete}
                                  disabled
                                />
                              </>
                            );
                          })}
                        </Card.Body>
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
                  <Card.Subtitle>
                    These entries are added to your record every month for the
                    time period specified
                  </Card.Subtitle>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {user.recurring_expenses.map((item) => {
                        return (
                          <RecurringEntry
                            startDate={new Date(item.start_date).toDateString()}
                            endDate={new Date(item.end_date).toDateString()}
                            item={item.item}
                            cost={item.monthly_amount}
                            category={item.category}
                            onDelete={()=>{removeRecurringSpendingEntry(item._id)}}
                          />
                        );
                      })}
                    </ListGroup>
                    <div className="text-right">
                      <Button
                        disabled={showAddSpending}
                        onClick={() => {
                          setShowAddSpending(true);
                        }}
                      >
                        Add
                      </Button>
                    </div>

                    {showAddSpending && (
                      <AddRecurringEntry
                        categories={SPENDING_CATEGORIES}
                        onClose={() => {
                          setShowAddSpending(false);
                        }}
                        onSubmit={submitNewRecurringExpense}
                      />
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Title>Recurring Income</Card.Title>
                  <Card.Subtitle>
                    These entries are added to your record every month for the
                    time period specified
                  </Card.Subtitle>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {user.recurring_incomes.map((item) => {
                        return (
                          <RecurringEntry
                            startDate={new Date(item.start_date).toDateString()}
                            endDate={new Date(item.end_date).toDateString()}
                            item={item.item}
                            cost={item.monthly_amount}
                            category={item.category}
                            onDelete={()=>{removeRecurringSavingsEntry(item._id)}}
                          />
                        );
                      })}
                    </ListGroup>
                    <div className="text-right">
                      <Button
                        disabled={showAddIncome}
                        onClick={() => {
                          setShowAddIncome(true);
                        }}
                      >
                        Add
                      </Button>
                    </div>

                    {showAddIncome && (
                      <AddRecurringEntry
                        categories={SAVINGS_CATEGORIES}
                        onClose={() => {
                          setShowAddIncome(false);
                        }}
                        onSubmit={submitNewRecurringIncome}
                      />
                    )}
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
