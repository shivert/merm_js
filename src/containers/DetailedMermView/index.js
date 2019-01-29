import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Tabs, Icon } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/authenticationActions";

import Overview from "./Overview";
import Comments from "./Comments";
import Statistics from "./Statistics";

const TabPane = Tabs.TabPane;

class DetailedMermView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Call API to fetch information here
  }

  render() {
    return (
      <div>
        <div className="detailed-merm-header">
          <div style={{float: 'left', marginLeft: "15px"}}>
            <Button type="primary" shape="circle" icon="medium" size="large" />
            <h1>{this.props.detailedMerm.mermName}</h1>
            <Icon type="heart" style={{ fontSize: "20px", padding: "15px" }} />
          </div>

          <div style={{float: 'right'}}>
            <Button style={{marginRight: '20px'}} size="large" type="primary">Edit</Button>
            <Button type="primary" shape="circle" icon="link" size="large" />
          </div>
        </div>
        <Tabs tabPosition="top" defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Overview" key="1">
            <Overview />
          </TabPane>
          <TabPane tab="Comments" key="2">
            <Comments />
          </TabPane>
          <TabPane tab="Statistics" key="3">
            <Statistics />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

DetailedMermView.propTypes = {
  actions: PropTypes.object.isRequired,
  detailedMerm: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    detailedMerm: state.detailedMerm
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
)(DetailedMermView);
