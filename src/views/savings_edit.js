import React, { useState, useEffect } from "react";
import "./savings_edit.scss";
import { API_URL } from "../api_url";
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
  addSavingsEntry,
  removeSavingsEntry,
  selectIntermediarySavingsData,
  assignSavingsCategory,
} from "../redux/slices/savings_slice";
import { selectUserId } from "../redux/slices/user_slice";

const COLORS = ["#006992", "#1A535C", "#4ECDC4", "#FBB13C", "#FF5B5B"];

const CATEGORIES = [
  "job",
  "investments",
  "pension",
  "gifts",
  "insurance payout",
  "Others",
];

export default function SavingsEdit() {
  const IntermediarySavingsData = useSelector(selectIntermediarySavingsData);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("jwtToken")}`)
    console.log(JSON.stringify(IntermediarySavingsData))

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(IntermediarySavingsData),
      redirect: "follow",
    };

    fetch( API_URL + "savings", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
                <Button onClick = {submitEntries}>Submit New Entries</Button>
              </Row>
              <Row>
                <Link to= "/savings/">
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
