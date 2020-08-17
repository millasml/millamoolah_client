import React, { useState, useEffect } from "react";
import "./spending_edit.scss";
import { submitSpendingEntries, getSpendingData } from "../lib";
import { Link } from "react-router-dom";
import { dateStringComparator } from "../helpers/comparator";


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
  initializeSpendingData,
  addSpendingEntry,
  removeSpendingEntry,
  selectIntermediarySpendingData,
  assignSpendingCategory,
} from "../redux/slices/spending_slice";
import { selectUserId } from "../redux/slices/user_slice";

import {COLORS, SPENDING_CATEGORIES} from "../categories"

export default function SpendingEdit() {
  const IntermediarySpendingData = useSelector(selectIntermediarySpendingData);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const setSpendingData = async () => {
    dispatch(initializeSpendingData(await getSpendingData()));
  };

  const onSubmit = (name, cost, date) => {
    console.log("submit", name, cost, date);
    dispatch(
      addSpendingEntry({
        date: date,
        item: name,
        amount: cost,
        user_id: userId,
        category: "Others",
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

  const submitEntries = () => {

    submitSpendingEntries(IntermediarySpendingData).then(setSpendingData())

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
                          ? COLORS[SPENDING_CATEGORIES.indexOf(entry.category)]
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
                {SPENDING_CATEGORIES.map((category, index) => {
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
                <Button onClick = {submitEntries}>Submit New Entries</Button>
              </Row>
              <Row>
                <Link to= "/spending/">
                <Button >Go Back</Button>
                </Link>
               
              </Row>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
