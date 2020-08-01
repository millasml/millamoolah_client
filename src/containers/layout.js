import React from "react";

import "./layout.scss";

export default function Layout(props){

    function callDB() {
        fetch("http://localhost:9000/testDB")
          .then((res) => res.text())
          .then((res) => console.log(res))
          .catch((err) => err);
      }

    return (
        <div>
            {props.children}
        </div>
    )
}