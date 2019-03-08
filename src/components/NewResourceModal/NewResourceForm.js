import React from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

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
      <Form id="createNewMerm" onSubmit={this.handleSubmit}>
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
        <div>Category</div>
        <Form.Item>
          {getFieldDecorator("categoryId")(
            <Select>
              {this.props.categories.map(category => (
                <Select.Option key={category.id} value={Number(category.id)}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
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
  tags: PropTypes.array.isRequired
};
