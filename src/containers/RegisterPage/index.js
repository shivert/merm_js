import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { history } from "../../store/configureStore";
import * as actions from "../../actions/authenticationActions";
import RegisterPageForm from "../../components/RegisterPageForm/";
import { Row, Form } from "antd";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    if (props.userObject.token !== "") {
      history.push("/dashboard");
    }
  }

  submitForm = fields => {
    this.props.actions.userCreate(fields);
  };

  render() {
    const RegisterForm = Form.create()(RegisterPageForm);

    return (
      <div style={{ marginTop: "200px" }}>
        <Row style={{ textAlign: "center" }}>
          <h1>merm.io</h1>
        </Row>
        <Row>
          <RegisterForm onSubmitClick={this.submitForm} />
        </Row>
      </div>
    );
  }
}
RegisterPage.propTypes = {
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
)(RegisterPage);
