/* eslint-disable import/no-named-as-default */

import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Layout } from 'antd';
const {
  Header, Content, Footer, Sider,
} = Layout;


import { hot } from "react-hot-loader";
import Dashboard from "../containers/dashboard";
import Favourites from "../containers/favourites";
import Recent from "../containers/recent";
import Shared from "../containers/shared";
import Settings from "../containers/settings";
import NotFoundPage from "../containers/NotFoundPage";
import CustomMenu from "./NavBar";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };

  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
             collapsible
             collapsed={this.state.collapsed}
             onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <CustomMenu />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />

            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              <Switch>
                <Redirect exact from='/' to='/dashboard'/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/recent" component={Recent} />
                <Route path="/shared" component={Shared} />
                <Route path="/favourites" component={Favourites} />
                <Route path="/settings" component={Settings} />
                <Route component={NotFoundPage} />
              </Switch>
              </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
