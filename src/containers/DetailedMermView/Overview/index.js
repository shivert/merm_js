import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/authenticationActions";
import { Row, Col, Divider, Tag } from "antd";
class Overview extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // Call API to fetch information here
  }

  render() {
    return (
      <div>
        <Row gutter={80}>
          <Col className="merm-overview" span={15}>
            <Divider orientation="left">Details</Divider>
            <div className="merm-overview-container">
              <p>
                <b>Source:</b> {this.props.detailedMerm.source}
              </p>
              <p>
                <b>Category: </b>
                {this.props.detailedMerm.category === null
                  ? "None"
                  : this.props.detailedMerm.category}
              </p>
              <p>
                <b>Resource URL:</b> <a href={this.props.detailedMerm.resourceUrl}>{this.props.detailedMerm.resourceUrl}</a>
              </p>
              <p>
                <b>Resource Title:</b> {this.props.detailedMerm.resourceTitle}
              </p>
            </div>
            <Divider orientation="left">Description</Divider>
            <div className="merm-overview-container">
              <p>{this.props.detailedMerm.description}</p>
            </div>
            <Divider orientation="left">Captured Text</Divider>
            <div className="merm-overview-container">
              <p>{`"${this.props.detailedMerm.capturedText}"`}</p>
            </div>
            <Divider orientation="left">Tags</Divider>
            <div className="merm-overview-container">
              {this.props.detailedMerm.tags.length != 0
                ? this.props.detailedMerm.tags.map(tag => (
                  <Tag key={tag.name}>
                    {tag.name}
                  </Tag>
                  ))
                : ""}
            </div>
          </Col>
          <Col span={9}>
            <Divider orientation="left">Sharing</Divider>
            <div className="merm-overview-container">
              <p>
                <b>Owner:</b> {this.props.detailedMerm.owner.name}
              </p>
              <p>
                <b>Shared With:</b>
                {this.props.detailedMerm.sharedWith.length != 0
                  ? this.props.detailedMerm.sharedWith.map(person => (
                    <p>{person.name}</p>
                    ))
                  : ""}
              </p>
            </div>
            <Divider orientation="left">Dates</Divider>
            <div className="merm-overview-container">
              <p>
                <b>Last Viewed:</b> {this.props.detailedMerm.lastViewed}
              </p>
              <p>
                <b>Created:</b> {this.props.detailedMerm.created}
              </p>
              <p>
                <b>Updated:</b> {this.props.detailedMerm.updated}
              </p>
            </div>
            <Divider orientation="left">Related</Divider>
            <div className="merm-overview-container">
              <p>
                {this.props.detailedMerm.category === null
                ? "No Related Merms, Add a category to see related Merms"
                : <a> Show Related Merm’s </a>}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Overview.propTypes = {
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
)(Overview);
