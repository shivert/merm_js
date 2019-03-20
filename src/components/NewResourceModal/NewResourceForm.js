import React from "react";
import { Form, Input, Select, DatePicker, Tooltip, Icon } from "antd";
import PropTypes from "prop-types";
var moment = require("moment");

export default class NewResourceForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) this.props.onSubmitClick(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        className="manual-add-merm"
        id="createNewMerm"
        onSubmit={this.handleSubmit}
      >
        <div>Resource URL</div>
        <Form.Item>
          {getFieldDecorator("resourceUrl", {
            rules: [{ required: true, message: "Please input resource url!" }]
          })(<Input placeholder="Resource URL" />)}
        </Form.Item>
        <div>Title</div>
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input a title!" }]
          })(<Input placeholder="Resource Title" />)}
        </Form.Item>
        <div>Description</div>
        <Form.Item>
          {getFieldDecorator("description")(
            <Input.TextArea placeholder="Resource Description" />
          )}
        </Form.Item>
        <Form.Item className="split" style={{ paddingRight: 30 }}>
          <div>Category</div>
          {getFieldDecorator("categoryId")(
            <Select>
              {this.props.categories
                .filter(c => c.custom === true)
                .map(category => (
                  <Select.Option key={category.id} value={Number(category.id)}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item className="split">
          <div>
            Expiry Date
            <Tooltip title="All resources expire in 6 months by default, but don't worry, if we see you're using this resource, we'll extend it automatically!">
              <Icon
                style={{ paddingLeft: 5 }}
                type="info-circle"
                theme="filled"
              />
            </Tooltip>
          </div>
          {getFieldDecorator("expiryDate", {
            initialValue: moment().add(6, "months")
          })(
            <DatePicker
              style={{ width: "100%" }}
              showToday={false}
              defaultPickerValue={moment().add(6, "months")}
            />
          )}
        </Form.Item>
        <div>Snippet</div>
        <Form.Item>
          {getFieldDecorator("capturedText")(
            <Input.TextArea placeholder="Resource Snippet" />
          )}
        </Form.Item>
        <div>Tags</div>
        <Form.Item>
          {getFieldDecorator("tags")(
            <Select mode="tags" placeholder="Tags">
              {this.props.tags.map(tag => (
                <Select.Option key={tag.id} value={tag.name}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

NewResourceForm.propTypes = {
  categories: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  onSubmitClick: PropTypes.func.isRequired
};
