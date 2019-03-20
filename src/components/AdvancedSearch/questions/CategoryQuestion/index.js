import React from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import * as categoryActions from "../../../../actions/categoryActions";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

const Option = Select.Option;

class CategoryQuestion extends React.Component {
  componentDidMount() {
    this.props.categoryActions.getCategories();
  }

  handleChange = categoryName => {
    this.props.next("categoryId", categoryName);
  };

  render() {
    return (
      <>
        <div className="category-question">What is the category?</div>

        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a category"
          onChange={this.handleChange}
          value={this.props.value === 0 ? null : this.props.value}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.props.categories.map(category => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </>
    );
  }
}

CategoryQuestion.propTypes = {
  next: PropTypes.func.isRequired,
  categoryActions: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  value: PropTypes.string
};

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoryActions: bindActionCreators(categoryActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryQuestion);
