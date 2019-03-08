import React from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import * as mermActions from "../../../../actions/mermActions";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

class TagQuestion extends React.Component {
  componentDidMount() {
    this.props.mermActions.getTags();
  }

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
    return (
      <>
        <div className="category-question">What are the tags?</div>

        <Select
          showSearch
          mode="multiple"
          style={{ width: 400 }}
          placeholder="Search for tags"
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.props.tags.map(user => (
            <Select.Option key={user.id} value={user.id}>
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
