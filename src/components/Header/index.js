import React from "react";
import {
  Button,
  Layout,
  Badge,
  Icon,
  Input,
  Popover,
  AutoComplete
} from "antd";

import NewResourceModal from "../NewResourceModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authenticationActions";
import * as mermActions from "../../actions/mermActions";
import * as searchActions from "../../actions/searchActions";
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

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChange = value => {
    this.setState({ queryString: value });
  };

  onSelect = value => {
    this.setState({ queryString: "" });
    const obj = this.props.autocompleteResults.find(obj => obj.value == value);
    history.push(`/merm/${obj.id}/overview`);
  };

  search = () => {
    history.push(`/search?q=${this.state.queryString}`);
  };

  popAuto = () => {
    if (this.props.autocompleteResults.length == 0) {
      this.props.searchActions.autoComplete();
    }
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

          <div className="header-right-container">
            <div>
              <AutoComplete
                className="global-search"
                size="large"
                filterOption={true}
                value={this.state.queryString}
                style={{ width: "100%" }}
                dataSource={this.props.autocompleteResults}
                onSelect={this.onSelect}
                onSearch={this.onChange}
                onFocus={this.popAuto}
                backfill={true}
                placeholder="Search.."
              >
                <Input
                  suffix={
                    <Button
                      onClick={this.search}
                      className="search-btn"
                      size="large"
                      type="primary"
                    >
                      <Icon type="search" />
                    </Button>
                  }
                />
              </AutoComplete>
            </div>
            <div>
              <Popover
                placement="bottomRight"
                title={this.text}
                content={<div>Insert Notifications Here</div>}
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
            <div>
              <Popover
                placement="bottomRight"
                title={<span>Settings</span>}
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
  searchActions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  autocompleteResults: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    location: state.router.location,
    history: state.history,
    autocompleteResults: state.autocompleteResults
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    mermActions: bindActionCreators(mermActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
