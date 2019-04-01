import React from "react";
import MermCard from "../../components/MermCard/";
import { Collapse, Row, Icon, Empty } from "antd";
import MermCardCarousel from "../../components/Carousel/MermCardCarousel";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as mermActions from "../../actions/mermActions";
import * as searchActions from "../../actions/searchActions";
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

  defaultCategories = ["Recent", "Favorites", "Unread Resources"];
  activePanels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  componentDidMount() {
    if (this.props.userObject.id !== 0) {
      this.props.categoryActions.getDashboardCategories();
      this.props.searchActions.getDashboardMerms();
    }
  }

  componentWillUnmount() {
    this.props.categoryActions.clearCategories();
    this.props.searchActions.clearDashboardMerms();
    this.props.searchActions.clearDashboardStatus();
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState(
      {
        visible: false
      },
      this.getDashboardCategories
    );
  };

  getDashboardCategories = () => {
    this.props.categoryActions.getDashboardCategories();
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  findMermsByCategory = category =>
    Object.keys(this.props.merms).includes(category.toString())
      ? this.props.merms[category]
      : [];

  getCarousal = key => (
    <MermCardCarousel
      items={this.findMermsByCategory(key).map(merm => this.getMermCard(merm))}
    />
  );

  getMermCard = merm => (
    <MermCard
      id={merm.id}
      key={merm.id}
      title={merm.name}
      shared={merm.shared}
      time={merm.last_accessed}
      user={merm.user}
      resourceUrl={merm.resource_url}
      contentType={merm.content_type}
      tags={merm.tags}
      logAccess={this.logAccess}
    />
  );

  getEmptyDescription = category => (
    <Empty description={`No Merms in ${category.name}!`} />
  );

  logAccess = mermId => {
    this.props.mermActions.logAccess(mermId);
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { categoriesReady, mermsReady } = this.props.dashboardStatus;
    const loading = !(categoriesReady && mermsReady);
    return (
      <div>
        {loading === true ? (
          <Icon type="loading" className="dashboard-loading" />
        ) : (
          <div>
            <div className="dashboard-button-container">
              <Button onClick={this.showModal} type="primary">
                Manage Categories
              </Button>
            </div>
            <Collapse
              bordered={false}
              className="dashboard-collapse"
              defaultActiveKey={this.activePanels}
            >
              {this.props.categories.map((category, idx) => (
                <Panel
                  key={idx}
                  header={category.name}
                  style={customPanelStyle}
                >
                  <Row gutter={16}>
                    {this.defaultCategories.includes(category.name)
                      ? this.findMermsByCategory(category.name).length === 0
                        ? this.getEmptyDescription(category)
                        : this.getCarousal(category.name)
                      : this.findMermsByCategory(category.id).length === 0
                      ? this.getEmptyDescription(category)
                      : this.getCarousal(category.id)}
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
  searchActions: PropTypes.object.isRequired,
  categoryActions: PropTypes.object.isRequired,
  merms: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  dashboardStatus: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    merms: state.merms,
    categories: state.categories,
    dashboardStatus: state.dashboardStatus,
    userObject: state.userObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mermActions: bindActionCreators(mermActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
    categoryActions: bindActionCreators(categoryActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
