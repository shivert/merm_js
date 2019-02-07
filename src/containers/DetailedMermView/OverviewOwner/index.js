import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/mermActions";
import {
  Row,
  Col,
  Divider,
  Tag,
  Avatar,
  Input,
  Icon,
  Select,
  Form
} from "antd";

class OverviewOwner extends React.Component {
  state = {
    inputVisible: false,
    inputValue: ""
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

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

  onSubmit() {
    const id = this.props.detailedMerm.id;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.editMerm(id, values);
      }
    });
  }
  updateTitle = (e) => {
    this.props.updateTitle(e.target.value);
  }

  render() {
    const { inputVisible, inputValue } = this.state;
    const { TextArea } = Input;
    const Option = Select.Option;
    const { getFieldDecorator } = this.props.form;
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
      sharedWith
    } = this.props.detailedMerm;

    const editMode = this.props.editMode;

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
      <div>
        <Form onSubmit={this.onSubmit}>
          <Row gutter={80}>
            <Col className="merm-overview" span={15}>
              <Divider orientation="left">Details</Divider>
              <div className="merm-overview-container">
                {editMode ? (
                  <div className="overview-edit-container">
                    <p>
                      <b>Name:</b>
                    </p>
                    <Form.Item>
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Required: Please input a name"
                          }
                        ],
                        initialValue: name
                      })(<Input onChange={this.updateTitle}/>)}
                    </Form.Item>
                  </div>
                ) : (
                  <p>
                    <b>Name: </b> {name}
                  </p>
                )}
                <p>
                  <b>Source:</b> {source}
                </p>
                {editMode ? (
                  <div className="overview-edit-container">
                    <p>
                      <b>Category:</b>
                    </p>
                    {/*<Form.Item>*/}
                      {/*{getFieldDecorator("category", {*/}
                        {/*initialValue: category*/}
                      {/*})(*/}
                        {/*<Select*/}
                          {/*dropdownRender={menu => (*/}
                            {/*<div>*/}
                              {/*{menu}*/}
                              {/*<Divider style={{ margin: "4px 0" }} />*/}
                              {/*<div*/}
                                {/*style={{ padding: "8px", cursor: "pointer" }}*/}
                              {/*>*/}
                                {/*<Icon type="plus" /> Add item*/}
                              {/*</div>*/}
                            {/*</div>*/}
                          {/*)}*/}
                        {/*>*/}
                          {/*<Option value="abc">abc</Option>*/}
                          {/*<Option value="def">def</Option>*/}
                        {/*</Select>*/}
                      {/*)}*/}
                    {/*</Form.Item>*/}
                  </div>
                ) : (
                  <p>
                    <b>Category: </b>
                    {category == null ? "None" : category}
                  </p>
                )}
                {editMode ? (
                  <div className="overview-edit-container">
                    <p>
                      <b>Resource URL:</b>
                    </p>
                    <Form.Item>
                      {getFieldDecorator("resourceUrl", {
                        rules: [
                          {
                            required: true,
                            type: "url",
                            message: "Required: Please input a valid URL"
                          }
                        ],
                        initialValue: resourceUrl
                      })(<Input />)}
                    </Form.Item>
                  </div>
                ) : (
                  <p>
                    <b>Resource URL:</b>{" "}
                    <a href={resourceUrl} target="_blank">
                      {resourceUrl}
                    </a>
                  </p>
                )}
                {editMode ? (
                  <div className="overview-edit-container">
                    <p>
                      <b>Resource Title:</b>
                    </p>
                    <Form.Item>
                      {getFieldDecorator("resourceName", {
                        rules: [
                          {
                            required: true,
                            message: "Required: Please input a Title"
                          }
                        ],
                        initialValue: resourceName
                      })(<Input />)}
                    </Form.Item>
                  </div>
                ) : (
                  <p>
                    <b>Resource Title:</b> {resourceName}
                  </p>
                )}
              </div>
              <Divider orientation="left">Description</Divider>
              <div className="merm-overview-container overview-edit-container">
                {editMode ? (
                  <Form.Item>
                    {getFieldDecorator("description", {
                      rules: [
                        {
                          required: true,
                          message: "Required: Please input a description"
                        }
                      ],
                      initialValue: description
                    })(<TextArea rows={4} />)}
                  </Form.Item>
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
                    <Icon type="plus" /> New Tag
                  </Tag>
                )}
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
                  <b>Last Viewed:</b>{" "}
                  <Moment format="lll">{lastAccessed}</Moment>
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
        </Form>
      </div>
    );
  }
}

OverviewOwner.propTypes = {
  actions: PropTypes.object.isRequired,
  detailedMerm: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  updateTitle: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    detailedMerm: state.detailedMerm,
    userObject: state.userObject,
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
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Form.create({ name: "edit_merm" })(OverviewOwner));
