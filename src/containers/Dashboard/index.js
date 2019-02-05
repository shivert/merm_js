import React from "react";
import MermCard from "../../components/MermCard/";
import { Collapse, Row, Icon } from "antd";
import MermCardCarousel from "../../components/Carousel/MermCardCarousel";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as mermActions from "../../actions/mermActions";
import * as categoryActions from "../../actions/categoryActions";
import { bindActionCreators } from "redux";
import Button from "antd/es/button";
import ManageCategoriesModal from "../../components/ManageCategoriesModal";

const Panel = Collapse.Panel;

const customPanelStyle = {
  borderRadius: 4,
  marginBottom: 24,
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
    this.props.mermActions.getMerms();
  }

  componentWillUnmount() {
    this.props.mermActions.clearMerms();
  }

  getMerms = () => {
    this.props.mermActions.getMerms();
  };

  showModal = () => {
    this.props.categoryActions.getCategories();
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.categoryActions.clearCategories();
  };

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
            <Button
              onClick={this.showModal}
              className="edit-category-button"
              type="primary"
            >
              Manage Categories
            </Button>

            <Collapse
              bordered={false}
              defaultActiveKey={["1", "2"]}
              className="dashboard-collapse"
            >
              <Panel header="Suggested" key="1" style={customPanelStyle}>
                <Row gutter={16}>
                  <MermCardCarousel
                    items={this.props.merms.dashboardMerms.suggested.map(
                      merm => (
                        <MermCard
                          id={merm.id}
                          key={merm.id}
                          title={merm.name}
                          lastAccessed={merm.lastAccessed}
                          sharedTime="Jan 12, 2018"
                          owner={`${merm.owner.firstName} ${
                            merm.owner.lastName
                          }`}
                          sharer="Veryvery long named Person"
                          cover={
                            <img
                              alt="example"
                              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                          }
                          tags={merm.tags}
                        />
                      )
                    )}
                  />
                </Row>
              </Panel>
              <Panel header="Favorites" key="2" style={customPanelStyle}>
                <Row>
                  <MermCardCarousel
                    items={this.props.merms.dashboardMerms.favorites.map(
                      merm => (
                        <MermCard
                          id={merm.id}
                          key={merm.id}
                          title={merm.name}
                          lastAccessed={merm.lastAccessed}
                          sharedTime="Jan 12, 2018"
                          owner={`${merm.owner.firstName} ${
                            merm.owner.lastName
                          }`}
                          sharer="Veryvery long named Person"
                          cover={
                            <img
                              alt="example"
                              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                          }
                          tags={merm.tags}
                        />
                      )
                    )}
                  />
                </Row>
              </Panel>
              <Panel header="Unread Resources" key="3" style={customPanelStyle}>
                <Row gutter={16} />
              </Panel>
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
  requestStatus: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    merms: state.merms,
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
