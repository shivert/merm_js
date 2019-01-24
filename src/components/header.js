import React from "react";
import { Button, Layout, Badge, Icon, Input, Popover } from "antd";
const Search = Input.Search;

import NewResourceModal from "./NewResourceModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/authenticationActions";
import PropTypes from "prop-types";

const { Header } = Layout;

class CustomHeader extends React.Component {
  text = <span>Settings</span>;
  state = {
    loading: false,
    visible: false
  };

  logOut = () => {
    console.log("we here");
    this.props.actions.userLogOut();
  };

  showModal = () => {
    this.setState({
      visible: true
    });
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
      <Header style={{ background: "#fff" }}>
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
                placeholder="Search..."
                onSearch={value => console.log(value)}
                enterButton
              />
            </div>
            <div
              style={{ marginTop: "-8px", marginLeft: "10px", float: "right" }}
            >
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
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userObject: state.userObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
