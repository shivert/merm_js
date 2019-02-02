import React from "react";
import { Collapse, Col, Row, Icon } from "antd";
import MermCard from "../../components/MermCard/index";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/mermActions";
import { bindActionCreators } from "redux";

const Panel = Collapse.Panel;

const customPanelStyle = {
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden",
  textAlign: "left"
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getMerms();
  }

  componentWillUnmount() {
    this.props.actions.clearMerms();
  }

  render() {
    const { loading } = this.props.requestStatus;
    return loading === true ? (
      <Icon
        type="loading"
        style={{
          fontSize: "100px",
          marginTop: "125px"
        }}
      />
    ) : (
      <Collapse bordered={false} defaultActiveKey={["1", "2"]}>
        <Panel header="Suggested" key="1" style={customPanelStyle}>
          <Row gutter={16}>
            <Col>
              <Row>
                <CustomCarousel>
                  {this.props.merms.dashboardMerms.suggested.map(merm => (
                    <MermCard
                      id={merm.id}
                      key={merm.id}
                      title={merm.name}
                      lastAccessed={merm.lastAccessed}
                      sharedTime="Jan 12, 2018"
                      owner={`${merm.owner.firstName} ${merm.owner.lastName}`}
                      sharer="Veryvery long named Person"
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      tags={merm.tags}
                    />
                  ))}
                </CustomCarousel>
              </Row>
            </Col>
          </Row>
        </Panel>
        <Panel header="Favorites" key="2" style={customPanelStyle}>
          <Row gutter={16}>
            <Col>
              <Row>
                <CustomCarousel>
                  {this.props.merms.dashboardMerms.favorites.map(merm => (
                    <MermCard
                      id={merm.id}
                      key={merm.id}
                      title={merm.name}
                      lastAccessed={merm.lastAccessed}
                      sharedTime="Jan 12, 2018"
                      owner={`${merm.owner.firstName} ${merm.owner.lastName}`}
                      sharer="Veryvery long named Person"
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      tags={merm.tags}
                    />
                  ))}
                </CustomCarousel>
              </Row>
            </Col>
          </Row>
        </Panel>
        <Panel header="Unread Resources" key="3" style={customPanelStyle}>
          <Row gutter={16} />
        </Panel>
      </Collapse>
    );
  }
}

Dashboard.propTypes = {
  actions: PropTypes.object.isRequired,
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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
