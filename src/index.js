import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link, withRouter } from "react-router-dom";

import { Provider } from "react-redux";

import LandingView from "./views/landing";
import LoginView from "./views/login";
import HomeView from "./views/home";
import SpendingView from "./views/spending";
import SpendingEditView from "./views/spending_edit";
import SavingsView from "./views/savings";
import SavingsEditView from "./views/savings_edit";

import TOCView from "./views/toc";
import PrivacyPolicyView from "./views/privacy_policy";

import * as serviceWorker from "./serviceWorker";

import storeCreator from "./redux/store";
const store = storeCreator();

function scrollToTop({ history }) {
  //eslint-disable-next-line
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
}

const ScrollToTop = withRouter(scrollToTop);

function App() {
  return (
    <Switch>
     
        <Route exact path="/" component={LandingView} />
        <Route exact path="/login" component={LoginView} />
        <Route exact path="/home" component={HomeView} />
        <Route exact path="/spending" component={SpendingView} />
        <Route exact path="/spending/edit" component={SpendingEditView} />
        <Route exact path="/savings" component={SavingsView} />
        <Route exact path="/savings/edit" component={SavingsEditView} />

        <Route exact path="/toc" component={TOCView} />
        <Route exact path="/privacy-policy" component={PrivacyPolicyView} />
    </Switch>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
      <Provider store={store}>
      <ScrollToTop/>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
