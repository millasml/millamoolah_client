import React, { useState } from "react";
import "./category_drop.scss";

import Card from "react-bootstrap/Card";

export default function CategoryDrop(props) {

  const [dragOver, setDragOver] = useState(false)

  return (
    <Card
      className= {`category-drop ${dragOver? "on-drag-over" : ""}`}
      style={{ backgroundColor: props.color }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true)
      }}
      onDragLeave = {(e) => {
        e.preventDefault();
        setDragOver(false)
      }}
      onDrop = {(e) => {
        e.preventDefault();
        setDragOver(false)
        const data = e.dataTransfer.getData("text/plain")
        props.onDrop(parseInt(data))
        console.log(props.category, data)
      }}
    >
      <Card.Title>
        <h1>{props.category}</h1>
      </Card.Title>
    </Card>
  );
}
