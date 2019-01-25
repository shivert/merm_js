import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/authenticationActions";

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Call API to fetch information here
  }

  render() {
    return (
      <div>
        Comments Section
      </div>
    );
  }
}

Comments.propTypes = {
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
)(Comments);
