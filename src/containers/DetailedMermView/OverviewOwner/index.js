import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/mermActions";
import { Row, Col, Divider, Tag, Avatar, Input, Icon, Select } from "antd";

class OverviewOwner extends React.Component {
  state = {
    inputVisible: false,
    inputValue: ""
  };
  removeTag = tagId => {
    this.props.actions.removeTag(tagId);
  };
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  saveInputRef = input => (this.input = input);
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleInputConfirm = () => {
    this.setState({
      inputVisible: false,
      inputValue: ""
    });
    this.props.actions.addTag({
      name: this.state.inputValue,
      merm_id: this.props.detailedMerm.id
    });
  };

  render() {
    const { inputVisible, inputValue } = this.state;
    const { TextArea } = Input;
    const Option = Select.Option;
    const InputGroup = Input.Group;
    const {
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
      sharedWith
    } = this.props.detailedMerm;

    const editMode = this.props.editMode;

    return (
      <div>
        <Row gutter={80}>
          <Col className="merm-overview" span={15}>
            <Divider orientation="left">Details</Divider>
            <div className="merm-overview-container">
              <p>
                <b>Source:</b> {source}
              </p>
              {editMode ? (
                <p>
                  <b>Category:</b>{" "}
                  <InputGroup>
                    <Select defaultValue={category == null ? "None" : category} className="overview-form-select">
                      <Option value="abc">abc</Option>
                      <Option value="def">def</Option>
                    </Select>
                  </InputGroup>
                </p>
              ) : (
                <p>
                  <b>Category: </b>
                  {category == null ? "None" : category}
                </p>
              )}
              {editMode ? (
                <p>
                  <b>Resource URL:</b>{" "}
                  <Input defaultValue={resourceUrl} className="overview-form" />
                </p>
              ) : (
                <p>
                  <b>Resource URL:</b>{" "}
                  <a href={resourceUrl} target="_blank">
                    {resourceUrl}
                  </a>
                </p>
              )}
              {editMode ? (
                <p>
                  <b>Resource Title:</b>{" "}
                  <Input
                    defaultValue={resourceName}
                    className="overview-form"
                  />
                </p>
              ) : (
                <p>
                  <b>Resource Title:</b> {resourceName}
                </p>
              )}
            </div>
            <Divider orientation="left">Description</Divider>
            <div className="merm-overview-container">
              {editMode ? (
                <TextArea rows={4} defaultValue={description}/>
              ) : (
                <p>{description}</p>
              )}
            </div>
            <Divider orientation="left">Captured Text</Divider>
            <div className="merm-overview-container">
              <p>{`"${capturedText}"`}</p>
            </div>
            <Divider orientation="left">Tags</Divider>
            <div className="merm-overview-container">
              {tags.length !== 0
                ? tags.map(tag => (
                    <Tag
                      closable
                      onClose={() => this.removeTag(tag.id)}
                      key={tag.id}
                    >
                      {tag.name}
                    </Tag>
                  ))
                : ""}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <Icon type="plus"/> New Tag
                </Tag>
              )}
            </div>
          </Col>
          <Col span={9}>
            <Divider orientation="left">Sharing</Divider>
            <div className="merm-overview-container">
              <p>
                <b>Owner: </b> <Avatar icon="user"/>
                {owner.name}
              </p>
              <p>
                <b>Shared With:</b>
              </p>
              <div className="shared-with">
                {sharedWith.length !== 0
                  ? sharedWith.map(person => (
                    <p key={person.name}>
                      <Avatar icon="user"/> {person.name}
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
            </div>
            <Divider orientation="left">Related</Divider>
            <div className="merm-overview-container">
              <p>
                {category === null ? (
                  "No Related Merms, Add a category to see related Merms"
                ) : (
                  <a>View Related Merms</a>
                )}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

OverviewOwner.propTypes = {
  actions: PropTypes.object.isRequired,
  detailedMerm: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    detailedMerm: state.detailedMerm,
    userObject: state.userObject
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
)(OverviewOwner);
