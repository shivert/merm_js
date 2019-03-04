import React from "react";
import { Button, Modal } from "antd";
import PropTypes from "prop-types";
import DragSortingTable from "./DragSortingTable";
import { connect } from "react-redux";
import * as actions from "../../actions/categoryActions";
import { bindActionCreators } from "redux";

class ManageCategoriesModal extends React.Component {
  state = {
    categories: []
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.updateCategoryStatus.loading !==
      this.props.updateCategoryStatus.loading
    ) {
      if (this.props.updateCategoryStatus.loading == false) {
        this.props.handleOk();
      }
    }
  }

  handleChange = state => {
    this.setState({ categories: state });
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    this.props.actions.updateCategories(this.state.categories);
  };

  render() {
    const { visible } = this.props;

    return (
      <Modal
        visible={visible}
        title="Manage Categories"
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={"45vw"}
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={this.props.updateCategoryStatus.loading}
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        ]}
      >
        <DragSortingTable onChange={this.handleChange} />
      </Modal>
    );
  }
}

ManageCategoriesModal.propTypes = {
  actions: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  updateCategoryStatus: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    updateCategoryStatus: state.updateCategoryStatus
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
)(ManageCategoriesModal);
