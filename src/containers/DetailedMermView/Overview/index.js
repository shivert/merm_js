import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/authenticationActions";

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Call API to fetch information here
  }

  render() {
    return (
      <div>
        Overview Section
      </div>
    );
  }
}

Overview.propTypes = {
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
)(Overview);
