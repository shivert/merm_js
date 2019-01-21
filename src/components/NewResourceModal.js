import React from 'react';
import { Button, Modal, } from 'antd';
import PropTypes from "prop-types";

class NewResourceModal extends React.Component {
  render() {
    const { visible, loading } = this.props;

    return (
      <Modal
        visible={visible}
        title="Add New Resource"
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={'65vw'}
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>Return</Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.props.handleOk}>
            Submit
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
};

NewResourceModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default NewResourceModal;
