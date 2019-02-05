import React from "react";
import { Button, Modal } from "antd";
import PropTypes from "prop-types";
import DragSortingTable from "./DragSortingTable";

class NewCategoryModal extends React.Component {

  handleChange = state => {
    // console.log(state);
  };

  render() {
    const { visible, loading } = this.props;

    return (
      <Modal
        visible={visible}
        title="Add New Category"
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={"45vw"}
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={this.props.handleOk}
          >
            Submit
          </Button>
        ]}
      >
        <DragSortingTable onChange={this.handleChange} />
      </Modal>
    );
  }
}

NewCategoryModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default NewCategoryModal;
