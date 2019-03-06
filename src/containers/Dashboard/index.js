import React from "react";
import MermCard from "../../components/MermCard/";
import { Collapse, Row, Icon, Empty } from "antd";
import MermCardCarousel from "../../components/Carousel/MermCardCarousel";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as mermActions from "../../actions/searchActions";
import * as categoryActions from "../../actions/categoryActions";
import { bindActionCreators } from "redux";
import Button from "antd/es/button";
import ManageCategoriesModal from "../../components/ManageCategoriesModal";

const Panel = Collapse.Panel;

const customPanelStyle = {
  borderRadius: 4,
  border: 0,
  overflow: "hidden",
  textAlign: "left"
};

class Dashboard extends React.Component {
  state = {
    visible: false,
    loading: false,
    confirmLoading: false
  };

  componentDidMount() {
    this.props.categoryActions.getCategories();
    this.props.mermActions.getDashboardMerms();
  }

  componentWillUnmount() {
    this.props.categoryActions.clearCategories();
    this.props.mermActions.clearDashboardMerms();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
    this.props.categoryActions.getCategories();
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  findMermsByCategory = categoryId =>
    Object.keys(this.props.merms).includes(categoryId)
      ? this.props.merms[categoryId]
      : [];

  render() {
    const { visible, confirmLoading } = this.state;
    const { loading } = this.props.requestStatus;
    return (
      <div>
        {loading === true ? (
          <Icon
            type="loading"
            style={{
              fontSize: "100px",
              marginTop: "125px"
            }}
          />
        ) : (
          <div>
            <div className="dashboard-button-container">
              <Button onClick={this.showModal} type="primary">
                Manage Categories
              </Button>
            </div>
            <Collapse
              bordered={false}
              defaultActiveKey={this.props.categories.map(
                (category, idx) => `${idx}`
              )}
              className="dashboard-collapse"
              style={{ marginTop: "-32px" }}
            >
              {this.props.categories.map((category, idx) => (
                <Panel
                  header={category.name}
                  key={idx}
                  style={customPanelStyle}
                >
                  <Row gutter={16}>
                    {this.findMermsByCategory(category.id).length === 0 ? (
                      <Empty description={`No Merms in ${category.name}!`} />
                    ) : (
                      <MermCardCarousel
                        items={this.findMermsByCategory(category.id).map(
                          merm => (
                            <MermCard
                              id={merm.id}
                              key={merm.id}
                              title={merm.name}
                              lastAccessed={merm.last_accessed}
                              owner={`${merm.user.first_name} ${
                                merm.user.last_name
                              }`}
                              contentType={merm.content_type}
                              tags={merm.tags}
                            />
                          )
                        )}
                      />
                    )}
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </div>
        )}
        <ManageCategoriesModal
          visible={visible}
          loading={loading}
          confirmLoading={confirmLoading}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  mermActions: PropTypes.object.isRequired,
  categoryActions: PropTypes.object.isRequired,
  merms: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  requestStatus: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    merms: state.merms,
    categories: state.categories,
    requestStatus: state.requestStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mermActions: bindActionCreators(mermActions, dispatch),
    categoryActions: bindActionCreators(categoryActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
