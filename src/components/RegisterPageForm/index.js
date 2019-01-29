import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Icon } from "antd";

class RegisterPageForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) this.props.onSubmitClick(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="register-form" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("firstName", {
            rules: [{ required: true, message: "Please input your first name!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="First Name"
            />
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator("lastName", {
          rules: [{ required: true, message: "Please input your last name!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Last Name"
          />
        )}
      </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please create your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Create Account
          </Button>
          Already have an account?  <a href="/login"> Sign in Here!</a>
        </Form.Item>
      </Form>
    );
  }
}

RegisterPageForm.propTypes = {
  onSubmitClick: PropTypes.func.isRequired,
  form: PropTypes.any.isRequired
};

export default RegisterPageForm;
