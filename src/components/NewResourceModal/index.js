import React from "react";
import { Button, Modal, Form } from "antd";
import PropTypes from "prop-types";
import NewResourceForm from "./NewResourceForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/mermActions";

class NewResourceModal extends React.Component {

  componentDidMount() {
    this.props.actions.getTags();
  }

  render() {
    const { visible, loading } = this.props;
    const AddNewResourceForm = Form.create()(NewResourceForm);
    return (
      <Modal
        visible={visible}
        title="Add New Resource"
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={"65vw"}
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>
            Cancel
          </Button>,
          <Button
            form="createNewMerm"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
        ]}
      >
        <AddNewResourceForm onSubmitClick={this.props.handleOk} categories={this.props.categories}  tags={this.props.tags} />
      </Modal>
    );
  }
}

NewResourceModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    tags: state.tags
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
)(NewResourceModal);
