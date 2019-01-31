/* eslint-disable import/no-named-as-default */

import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Layout, Menu, Icon, Avatar } from "antd";
const SubMenu = Menu.SubMenu;

const { Content, Footer, Sider } = Layout;
import CustomHeader from "../../components/Header";
import DetailedMermView from "../DetailedMermView";
import Dashboard from "../Dashboard";
import Favourites from "../Favourites";
import Recent from "../Recent";
import Shared from "../Shared";
import { history } from "../../store/configureStore";

class TopLevelContainer extends React.Component {
  constructor(props) {
    super(props);

    if (props.userObject.token === "") {
      history.push("/login");
    }

    let openMenu = "";
    let pathname = props.pathname;

    if (props.pathname.length === 1) {
      pathname = "/dashboard";
    }

    if (pathname === "/merm-reports" || pathname === "/user-reports") {
      openMenu = "analytics";
    }

    this.state = {
      collapsed: false,
      pathname: pathname,
      openMenu: openMenu
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            {this.state.collapsed ? (
              <div className="user-photo">
                <Avatar size={36} icon="user" />
              </div>
            ) : (
              <div className="user-photo">
                <Avatar size={84} icon="user" />
                <h2 style={{ color: "white", marginTop: "10px" }}>
                  {`${this.props.userObject.firstName} ${
                    this.props.userObject.lastName
                  }`}
                </h2>
              </div>
            )}

            <Menu
              theme="dark"
              mode="inline"
              defaultOpenKeys={[this.state.openMenu]}
              defaultSelectedKeys={[this.state.pathname]}
            >
              <Menu.Item key="/dashboard">
                <NavLink to="/dashboard">
                  <Icon type="appstore" />
                  <span>Dashboard</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="/recent">
                <NavLink to="/recent">
                  <Icon type="clock-circle" />
                  <span>Recent</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="/shared">
                <NavLink to="/shared">
                  <Icon type="user" />
                  <span>Shared With Me</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="/favourites">
                <NavLink to="/favourites">
                  <Icon type="heart" />
                  <span>Favourites</span>
                </NavLink>
              </Menu.Item>

              <SubMenu
                key="analytics"
                title={
                  <span>
                    <Icon type="bar-chart" />
                    <span>Analytics</span>
                  </span>
                }
              >
                <Menu.Item key="/merm-reports">
                  <NavLink to="/merm-reports">
                    <span>Merm Reports</span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="/user-reports">
                  <NavLink to="/user-reports">
                    <span>User Reports</span>
                  </NavLink>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="/settings">
                <NavLink to="/settings">
                  <Icon type="setting" />
                  <span>Settings</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <CustomHeader />
            <Content style={{ margin: "10px 24px 0", overflow: "initial" }}>
              <div
                style={{
                  padding: "24px",
                  background: "#fff",
                  textAlign: "center",
                  minHeight: "400px"
                }}
              >
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/merm/:mermId" component={DetailedMermView} />
                  <Route path="/recent" component={Recent} />
                  <Route path="/shared" component={Shared} />
                  <Route path="/favourites" component={Favourites} />
                </Switch>
              </div>
            </Content>

            <Footer style={{ textAlign: "center" }}>merm.io © 2019</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

TopLevelContainer.propTypes = {
  pathname: PropTypes.string.isRequired,
  userObject: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  userObject: state.userObject
});

export default connect(mapStateToProps)(TopLevelContainer);
