import React, { useState, useEffect } from "react";
import "./savings_edit.scss";
import { submitSavingsEntries, getSavingsData } from "../lib";
import { Link } from "react-router-dom";

import Layout from "../containers/user_layout";
import AddSavingsEntry from "../components/add_entry";
import SavingsEntry from "../components/entry";
import CategoryDrop from "../components/category_drop";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useSelector, useDispatch } from "react-redux";
import {
  initializeSavingsData,
  addSavingsEntry,
  removeSavingsEntry,
  selectIntermediarySavingsData,
  assignSavingsCategory,
  selectSavingsData,
} from "../redux/slices/savings_slice";
import { selectUserId } from "../redux/slices/user_slice";

import { COLORS, SAVINGS_CATEGORIES } from "../categories";

export default function SavingsEdit() {
  const IntermediarySavingsData = useSelector(selectIntermediarySavingsData);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const setSavingsData = async () => {
    dispatch(initializeSavingsData(await getSavingsData()));
  };

  const onSubmit = (name, cost, date) => {
    console.log("submit", name, cost, date);
    dispatch(
      addSavingsEntry({
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
    dispatch(removeSavingsEntry(index));
  };

  const addCategory = (index, category) => {
    dispatch(
      assignSavingsCategory({
        index: index,
        category: category,
      })
    );
  };

  const submitEntries = () => {
    submitSavingsEntries(IntermediarySavingsData).then(setSavingsData());
  };

  return (
    <div className="savings-edit-view dark-theme">
      <Layout>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Title>Add Transactions Here</Card.Title>
                <AddSavingsEntry onSubmit={onSubmit} />
                {IntermediarySavingsData.map((entry, index) => {
                  return (
                    <SavingsEntry
                      key={`savings_entry ${index} ${entry.item} ${entry.amount} ${entry.date}`}
                      entryName={entry.item}
                      entryCost={entry.amount}
                      entryDate={entry.date}
                      entryIndex={index}
                      color={
                        entry.category
                          ? COLORS[SAVINGS_CATEGORIES.indexOf(entry.category)]
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
                {SAVINGS_CATEGORIES.map((category, index) => {
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
                <Button onClick={submitEntries}>Submit New Entries</Button>
              </Row>
              <Row>
                <Link to="/savings/">
                  <Button>Go Back</Button>
                </Link>
              </Row>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
