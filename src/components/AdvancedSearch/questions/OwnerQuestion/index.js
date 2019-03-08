import React from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import * as mermActions from "../../../../actions/mermActions";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

const Option = Select.Option;

class OwnerQuestion extends React.Component {
  componentDidMount() {
    this.props.mermActions.getUsers();
  }

  handleChange = userId => {
    this.props.next("owner", userId);
  };

  render() {
    return (
      <>
        <div className="category-question">Who is the owner of the merm?</div>

        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a user"
          defaultValue={this.props.value}
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.props.users.map(user => (
            <Option key={user.id} value={Number(user.id)}>
              {user.name}
            </Option>
          ))}
        </Select>
      </>
    );
  }
}

OwnerQuestion.propTypes = {
  value: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  mermActions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users
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
)(OwnerQuestion);
