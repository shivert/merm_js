import React from "react";
import { notification } from "antd";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/authenticationActions";
import PropTypes from "prop-types";

class CustomNotification extends React.Component {
  constructor(props) {
    super(props);
    this.checkForNotification(props);
  }

  componentDidUpdate() {
    this.checkForNotification(this.props);
  }

  checkForNotification = props => {
    if (props.notification.show) {
      notification["error"]({
        message: props.notification.message,
        duration: 3,
        description: props.notification.description
      });
    }
  };

  render() {
    return <div />;
  }
}

CustomNotification.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    notification: state.notification
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
)(CustomNotification);
