import React from "react";
import { Button, Modal, Select } from "antd";
import PropTypes from "prop-types";

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

class CategoryQuestion extends React.Component {
  render() {
    return (
      <>
      <div className="category-question">
        What is the content type?
      </div>

      <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a category"
      optionFilterProp="children"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </Select>
      </>
    );
    
  }
}

CategoryQuestion.propTypes = {
};

export default CategoryQuestion;
