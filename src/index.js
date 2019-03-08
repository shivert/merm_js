/* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import configureStore, { history } from "./store/configureStore";
import Root from "./components/Root";
import "./styles/styles.scss";
import "./styles/font-awesome-color-brand.scss";
import "antd/dist/antd.css";
import "react-alice-carousel/lib/alice-carousel.css";
require("./favicon.ico"); // Tell webpack to load favicon.ico

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept("./components/Root", () => {
    const NewRoot = require("./components/Root").default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}
