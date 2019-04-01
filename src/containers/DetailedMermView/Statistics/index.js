import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/authenticationActions";

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Call API to fetch information here
  }

  render() {
    return (
      <div style={{ marginTop: "60px" }}>
        <Icon style={{ fontSize: "48px" }} type="tool" />
        <h2>Under construction!</h2>
      </div>
    );
  }
}

Statistics.propTypes = {
  actions: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired
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
)(Statistics);
