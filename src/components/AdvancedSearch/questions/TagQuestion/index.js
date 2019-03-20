import React from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import * as mermActions from "../../../../actions/mermActions";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

class TagQuestion extends React.Component {
  state = {
    selectedItems: []
  };

  componentDidMount() {
    this.setState({ selectedItems: this.props.value })
    this.props.mermActions.getTags();
  }

  handleChange = selectedItems => {
    this.setState(
      { selectedItems },
      this.props.next("tags", selectedItems, true)
    );
  };

  render() {
    const { selectedItems } = this.state;
    return (
      <>
        <div className="category-question">What are the tags?</div>

        <Select
          showSearch
          mode="multiple"
          style={{ width: 400 }}
          value={selectedItems}
          placeholder="Search for tags"
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.props.tags.map(user => (
            <Select.Option key={user.id} value={user.name}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </>
    );
  }
}

TagQuestion.propTypes = {
  mermActions: PropTypes.object.isRequired,
  next: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    tags: state.tags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mermActions: bindActionCreators(mermActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagQuestion);
