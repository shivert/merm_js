import React from "react";
import { Collapse, Col, Row } from "antd";
import MermCard from "../../components/MermCard/MermCard";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
import { history } from "../../store/configureStore";
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
    this.getMerms();
  }

  getMerms() {
    this.props.actions.getMerms(this.props.userObject.token);
  }

  render() {
    return (
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Panel header="Suggested" key="1" style={customPanelStyle}>
          <Row gutter={16}>
            <Col>
              <Row>
                <CustomCarousel>
                  {this.props.merms.allMerms.map(merm => (
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
        <Panel header="Unread Resources" key="2" style={customPanelStyle}>
        </Panel>
        <Panel header="Favourites" key="3" style={customPanelStyle}>
          <Row gutter={16} />
        </Panel>
      </Collapse>
    );
  }
}

Dashboard.propTypes = {
  actions: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired,
  merms: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userObject: state.userObject,
    merms: state.merms
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
