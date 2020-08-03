import React from "react";
import "./home.scss";

import Layout from "../containers/layout";

import { useSelector, useDispatch } from "react-redux";
import {  selectUser } from "../redux/slices/user_slice";


export default function LoginView() {

  const user = useSelector(selectUser);

  return (
    <div className="home-view">
      <Layout>
        <div>{user}</div>
        <div></div>
      </Layout>
    </div>
  );
}
