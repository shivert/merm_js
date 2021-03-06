import React from "react";
import { Button, Modal, Form } from "antd";
import PropTypes from "prop-types";
import NewResourceForm from "./NewResourceForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/mermActions";

class NewResourceModal extends React.Component {
  state = {
    form: Form.create()(NewResourceForm)
  };

  componentDidMount() {
    if (this.props.userObject.id !== 0) {
      this.props.actions.getTags();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({ form: Form.create()(NewResourceForm) });
    }
  }

  getForm = () => {
    const AddNewResourceForm = this.state.form;

    return (
      <AddNewResourceForm
        onSubmitClick={this.props.handleOk}
        categories={this.props.categories}
        tags={this.props.tags}
      />
    );
  };

  render() {
    const { visible, loading } = this.props;
    return (
      <Modal
        visible={visible}
        title="Add New Resource"
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={"50vw"}
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
        {this.getForm()}
      </Modal>
    );
  }
}

NewResourceModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    tags: state.tags,
    userObject: state.userObject
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
