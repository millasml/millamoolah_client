import React from "react";

import "./layout.scss";

import Header from "../containers/header"
import Footer from "../containers/footer"

export default function Layout(props){

    function callDB() {
        fetch("http://localhost:9000/testDB")
          .then((res) => res.text())
          .then((res) => console.log(res))
          .catch((err) => err);
      }

    return (
        <div className = "layout">
            <Header/>
            <div className = "content">
                {props.children}
            </div>
            
            <Footer/>
        </div>
    )
}