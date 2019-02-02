import React from "react";
import { Button, Layout, Badge, Icon, Input, Popover } from "antd";
const Search = Input.Search;

import NewResourceModal from "../NewResourceModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticationActions";
import * as mermActions from "../../actions/mermActions";
import { history } from "./../../store/configureStore";
import * as queryString from "query-string";

import PropTypes from "prop-types";
const { Header } = Layout;

class CustomHeader extends React.Component {
  state = {
    loading: false,
    visible: false,
    queryString: ""
  };

  logOut = () => {
    this.props.authActions.userLogOut();
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);

    if (queryParams["q"] != null) {
      this.setState({
        queryString: queryParams["q"]
      });
    }
  }

  handleChange = e => {
    this.setState({
      queryString: e.target.value
    });
  };

  search = queryString => {
    history.push(`/search?q=${queryString}`);
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;

    return (
      <Header style={{ background: "#f0f2f5" }}>
        <div className="header-container">
          <div style={{ float: "left" }}>
            <Button type="primary" icon="plus-circle" onClick={this.showModal}>
              Add New Resource
            </Button>
          </div>
          <h2>merm.io</h2>
          <div
            style={{ marginTop: "16px", marginRight: "10px", float: "right" }}
          >
            <div style={{ float: "left" }}>
              <Search
                value={this.state.queryString}
                placeholder="Search..."
                onChange={this.handleChange}
                onSearch={this.search}
                enterButton
              />
            </div>
            <div
              style={{ marginTop: "-8px", marginLeft: "10px", float: "right" }}
            >
              <Popover
                placement="bottomRight"
                title={<span>Settings</span>}
                content={<div>Insert Notifications Here</div>}
                trigger="click"
              >
                <Icon
                  style={{ fontSize: "24px" }}
                  type="setting"
                  theme="filled"
                />
              </Popover>
            </div>
            <div style={{ margin: "-8px 10px 0px 10px", float: "right" }}>
              <Popover
                placement="bottomRight"
                title={this.text}
                content={
                  <div>
                    <Button type="primary" onClick={this.logOut}>
                      Logout
                    </Button>
                  </div>
                }
                trigger="click"
              >
                <Badge count={5}>
                  <Icon
                    style={{ fontSize: "24px" }}
                    type="bell"
                    theme="filled"
                  />
                </Badge>
              </Popover>
            </div>
          </div>
        </div>
        <NewResourceModal
          visible={visible}
          loading={loading}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </Header>
    );
  }
}

CustomHeader.propTypes = {
  authActions: PropTypes.object.isRequired,
  mermActions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    location: state.router.location,
    history: state.history
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    mermActions: bindActionCreators(mermActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
