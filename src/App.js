import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const [dbResponse, setDbResponse] = useState("");
  const [dataResponse, setDataResponse] = useState("");

  function callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setApiResponse( res ));
  }

  function callDB() {
    fetch("http://localhost:9000/testDB")
        .then(res => res.text())
        .then(res => setDbResponse( res ))
        .catch(err => err);
}
function callData() {
  fetch("http://localhost:9000/testData")
      .then(res => res.text())
      .then(res => setDataResponse( res ))
      .catch(err => err);
}

  useEffect(() => {
    callAPI();
    callDB();
    callData();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {apiResponse}
        </p>
        <p>
          {dbResponse}
        </p>
        <p>
          {dataResponse}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
