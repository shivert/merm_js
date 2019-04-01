import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/mermActions";
import { Row, Col, Divider, Tag, Avatar } from "antd";
class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      source,
      category,
      resourceName,
      resourceUrl,
      description,
      capturedText,
      tags,
      owner,
      lastAccessed,
      createdAt,
      updatedAt,
      sharedWith,
      expiryDate
    } = this.props.detailedMerm;

    return (
      <div>
        <Row gutter={80}>
          <Col className="merm-overview" span={15}>
            <Divider orientation="left">Details</Divider>
            <div className="merm-overview-container">
              <p>
                <b>Name:</b> {name}
              </p>
              <p>
                <b>Source:</b> {source}
              </p>
              <p>
                <b>Category: </b>
                {category === null ? "None" : category.name}
              </p>
              <p>
                <b>Resource URL:</b>{" "}
                <a href={resourceUrl} rel="noopener noreferrer">
                  {resourceUrl}
                </a>
              </p>
              <p>
                <b>Resource Title:</b> {resourceName}
              </p>
            </div>
            <Divider orientation="left">Description</Divider>
            <div className="merm-overview-container">
              <p>{description}</p>
            </div>
            <Divider orientation="left">Snippet</Divider>
            <div className="merm-overview-container">
              <p>{`"${capturedText}"`}</p>
            </div>
            <Divider orientation="left">Tags</Divider>
            <div className="merm-overview-container">
              {tags.length != 0
                ? tags.map(tag => <Tag key={tag.name}>{tag.name}</Tag>)
                : ""}
            </div>
          </Col>
          <Col span={9}>
            <Divider orientation="left">Sharing</Divider>
            <div className="merm-overview-container">
              <p>
                <b>Owner: </b> <Avatar icon="user" />
                {owner.name}
              </p>
              <p>
                <b>Shared With:</b>
              </p>
              <div className="shared-with">
                {sharedWith.length !== 0
                  ? sharedWith.map(person => (
                      <p key={person.name}>
                        <Avatar icon="user" /> {person.name}
                      </p>
                    ))
                  : ""}
              </div>
            </div>
            <Divider orientation="left">Dates</Divider>
            <div className="merm-overview-container">
              <p>
                <b>Last Viewed:</b> <Moment format="lll">{lastAccessed}</Moment>
              </p>
              <p>
                <b>Created:</b> <Moment format="lll">{createdAt}</Moment>
              </p>
              <p>
                <b>Updated:</b> <Moment format="lll">{updatedAt}</Moment>
              </p>
              <p>
                <b>Expires At:</b> <Moment format="ll">{expiryDate}</Moment>
              </p>
            </div>
            <Divider orientation="left">Related</Divider>
            <div className="merm-overview-container">
              <p>
                {category === null ? (
                  "No Related Merms, Add a category to see related Merms"
                ) : (
                  <Link
                    to={`/search?categoryId=${
                      this.props.detailedMerm.category.id
                    }`}
                  >
                    View Related Merms
                  </Link>
                )}
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
