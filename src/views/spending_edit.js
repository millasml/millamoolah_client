import React, { useState, useEffect } from "react";
import "./spending_edit.scss";
import { API_URL } from "../api_url";
import { Link } from "react-router-dom";

import Layout from "../containers/user_layout";
import AddSpendingEntry from "../components/add_entry";
import SpendingEntry from "../components/entry";
import CategoryDrop from "../components/category_drop";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useSelector, useDispatch } from "react-redux";
import {
  addSpendingEntry,
  removeSpendingEntry,
  selectIntermediarySpendingData,
  assignSpendingCategory,
} from "../redux/slices/spending_slice";
import { selectUserId } from "../redux/slices/user_slice";

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
  const IntermediarySpendingData = useSelector(selectIntermediarySpendingData);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const onSubmit = (name, cost, date) => {
    console.log("submit", name, cost, date);
    dispatch(
      addSpendingEntry({
        date: date,
        item: name,
        amount: cost,
        user_id: userId,
      })
    );
  };

  const deleteEntry = (index) => {
    console.log("delete entry", index);
    dispatch(removeSpendingEntry(index));
  };

  const addCategory = (index, category) => {
    dispatch(
      assignSpendingCategory({
        index: index,
        category: category,
      })
    );
  };

  return (
    <div className="spending-edit-view dark-theme">
      <Layout>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Title>Add Transactions Here</Card.Title>
                <AddSpendingEntry onSubmit={onSubmit} />
                {IntermediarySpendingData.map((entry, index) => {
                  return (
                    <SpendingEntry
                      key={`spending_entry ${index} ${entry.item} ${entry.amount} ${entry.date}`}
                      entryName={entry.item}
                      entryCost={entry.amount}
                      entryDate={entry.date}
                      entryIndex={index}
                      color={
                        entry.category
                          ? COLORS[CATEGORIES.indexOf(entry.category)]
                          : null
                      }
                      onSubmit={() => {
                        deleteEntry(index);
                      }}
                    />
                  );
                })}
              </Card>
            </Col>
            <Col>
              <Row>
                {CATEGORIES.map((category, index) => {
                  return (
                    <Col xs={6} className="mb-5">
                      <CategoryDrop
                        color={COLORS[index]}
                        category={category}
                        onDrop={(i) => {
                          addCategory(i, category);
                        }}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Button>Submit New Entries</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
