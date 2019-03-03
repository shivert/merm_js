import React from "react";
import { Button, Modal, Select } from "antd";
import PropTypes from "prop-types";

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

class TagQuestion extends React.Component {
  render() {
    return (
      <>
      <div className="tag-question">
        What are the tags?
      </div>

      <Select
        placeholder="Enter a tag"
        mode="multiple"
        style={{ width: '50%' }}
        onChange={handleChange}
      >
      {children}
      </Select>
      </>
    );
  }
}

TagQuestion.propTypes = {

};

export default TagQuestion;
