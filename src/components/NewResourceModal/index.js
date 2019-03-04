import React from "react";
import { Button, Modal, Form } from "antd";
import PropTypes from "prop-types";
import NewResourceForm from "./NewResourceForm";

class NewResourceModal extends React.Component {
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
        <AddNewResourceForm onSubmitClick={this.props.handleOk} />
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

export default NewResourceModal;
