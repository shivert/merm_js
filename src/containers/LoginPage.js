import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { history } from "../store/configureStore";
import * as actions from "../actions/authenticationActions";
import LoginPageForm from "../components/LoginPageForm";
import { Row } from "antd";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    if (props.userObject.token !== "") {
      history.push("/dashboard");
    }
  }

  state = {
    fields: {
      username: {
        value: ""
      },
      password: {
        value: ""
      }
    }
  };

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  submitForm = () => {
    this.props.actions.userLogIn(this.state.fields);
  };

  render() {
    const fields = this.state.fields;
    return (
      <div style={{ marginTop: "200px" }}>
        <Row style={{ textAlign: "center" }}>
          <h1>merm.io</h1>
        </Row>
        <Row>
          <LoginPageForm
            {...fields}
            onChange={this.handleFormChange}
            onSubmitClick={this.submitForm}
          />
        </Row>
      </div>
    );
  }
}
LoginPage.propTypes = {
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
)(LoginPage);
