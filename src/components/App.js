/* eslint-disable import/no-named-as-default */

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import LoginPage from "../containers/LoginPage";
import RegisterPage from "../containers/RegisterPage";
import NotFoundPage from "../containers/NotFoundPage";
import TopLevelContainer from "../containers/TopLevelContainer";
import CustomNotification from "./CustomNotification";

import { initLibrary } from "../utils/initFontAwesome";

initLibrary();

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={TopLevelContainer} />
          <Route component={NotFoundPage} />
        </Switch>
        <CustomNotification />
      </div>
    );
  }
}

export default hot(module)(App);
