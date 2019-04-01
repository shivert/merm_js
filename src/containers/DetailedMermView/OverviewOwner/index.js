import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as mermActions from "../../../actions/mermActions";
import * as categoryActions from "../../../actions/categoryActions";
import {
  Row,
  Col,
  Divider,
  Tag,
  Avatar,
  Input,
  Icon,
  Select,
  Form,
  Button,
  DatePicker,
  Timeline
} from "antd";
var moment = require("moment");

const Bold = ({ children }) => (
  <p style={{ fontWeight: "bold", display: "inline-block", margin: 0 }}>
    {children}
  </p>
);

class OverviewOwner extends React.Component {
  state = {
    inputVisible: false,
    inputValue: "",
    isEditingSharing: false,
    sharedWith: []
  };

  sharingInput = React.createRef();

  componentDidMount() {
    this.props.onRef(this);

    const { sharedWith } = this.props.detailedMerm;
    this.setState({
      sharedWith:
        sharedWith.length !== 0 ? sharedWith.map(person => person.id) : []
    });
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  saveSharingInputRef = input => (this.sharingInput = input);

  removeTag = tagId => {
    this.props.mermActions.removeTag(tagId);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => (this.input = input);
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = e => {
    e.preventDefault();
    if (e.target.value.length !== 0) {
      this.setState({
        inputVisible: false,
        inputValue: ""
      });
      this.props.mermActions.addTag({
        name: e.target.value,
        merm_id: this.props.detailedMerm.id
      });
    }
  };

  onSubmit() {
    const id = this.props.detailedMerm.id;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.categoryId = values.categoryId ? values.categoryId : null;
        this.props.mermActions.editMerm(id, values);
      }
    });
  }
  updateTitle = e => {
    this.props.updateTitle(e.target.value);
  };

  logAccess = mermId => {
    this.props.mermActions.logAccess(mermId);
  };

  render() {
    const { inputVisible, inputValue } = this.state;
    const { TextArea } = Input;
    const Option = Select.Option;
    const { getFieldDecorator } = this.props.form;
    const {
      id,
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
      expiryDate,
      history
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
                    <Form.Item>
                      <b>Name:</b>
                    </Form.Item>
                    <Form.Item className="edit-form-entry">
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Required: Please input a name"
                          }
                        ],
                        initialValue: name
                      })(<Input onChange={this.updateTitle} />)}
                    </Form.Item>
                  </div>
                ) : (
                  <p>
                    <b>Name: </b> {name}
                  </p>
                )}
                <div className="overview-edit-container">
                  <p className={editMode ? "edit-mode" : ""}>
                    <b>Source:</b> {source}
                  </p>
                </div>
                {editMode ? (
                  <div className="overview-edit-container">
                    <Form.Item>
                      <b>Category:</b>
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("categoryId", {
                        initialValue: (category || {}).id
                      })(
                        <Select
                          showSearch
                          allowClear={true}
                          showArrow={false}
                          style={{ width: 200, marginLeft: 10 }}
                          placeholder="No category selected!"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.props.categories.map(category => (
                            <Option key={category.id} value={category.id}>
                              {category.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                ) : (
                  <p>
                    <b>Category: </b>
                    {category == null ? "None" : category.name}
                  </p>
                )}
                <div className="overview-edit-container">
                  <p className={editMode ? "edit-mode" : ""}>
                    <b>Resource URL:</b>{" "}
                    <Button
                      className="overview-button-link"
                      href={resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => this.logAccess(id)}
                    >
                      {resourceUrl}
                    </Button>
                  </p>
                </div>
                <div className="overview-edit-container">
                  <p className={editMode ? "edit-mode" : ""}>
                    <b>Resource Title:</b> {resourceName ? resourceName : "N/A"}
                  </p>
                </div>
              </div>
              <Divider orientation="left">Description</Divider>
              <div className="merm-overview-container overview-edit-container">
                {editMode ? (
                  <Form.Item className="edit-form-entry">
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
              <Divider orientation="left">Snippet</Divider>
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
                  <span style={{ margin: "0px 12px" }}>
                    <Button
                      onClick={() => {
                        if (!this.state.isEditingSharing) {
                          this.props.mermActions.getUsers();
                        } else {
                          this.props.mermActions.shareMerm(
                            this.props.detailedMerm.id,
                            this.state.sharedWith
                          );
                        }
                        this.setState({
                          isEditingSharing: !this.state.isEditingSharing
                        });
                      }}
                      type="primary"
                      shape="circle"
                      icon={this.state.isEditingSharing ? "check" : "edit"}
                      size="small"
                    />
                  </span>
                </p>
                {this.state.isEditingSharing ? (
                  <div className="shared-with">
                    <Select
                      ref={this.saveSharingInputRef}
                      mode="multiple"
                      placeholder="Users"
                      filterOption={(input, option) =>
                        option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                      }
                      value={this.state.sharedWith}
                      onChange={value => {
                        this.setState({ sharedWith: value });
                      }}
                    >
                      {this.props.users.length !== 0
                        ? this.props.users.map(person => (
                            <Select.Option key={person.name} value={person.id}>
                              <Icon
                                style={{ marginRight: "8px" }}
                                type="user"
                              />
                              {person.name}
                            </Select.Option>
                          ))
                        : ""}
                    </Select>
                  </div>
                ) : (
                  <div className="shared-with">
                    {sharedWith.length !== 0
                      ? sharedWith.map(person => (
                          <p key={person.id}>
                            <Avatar icon="user" /> {person.name}
                          </p>
                        ))
                      : ""}
                  </div>
                )}
              </div>
              <Divider orientation="left">Dates</Divider>
              <div className="merm-overview-container">
                <p>
                  <b>Last Viewed:</b>{" "}
                  <Moment format="lll">{lastAccessed}</Moment>
                </p>
                <p>
                  <b>Updated:</b> <Moment format="lll">{updatedAt}</Moment>
                </p>
                <div
                  style={{
                    width: "fit-content",
                    display: "inline-block"
                  }}
                >
                  <b>Expires At:</b>{" "}
                  {editMode ? (
                    <Form.Item
                      className="edit-form-entry"
                      style={{
                        marginTop: "-9px",
                        display: "inline-block",
                        width: "60%"
                      }}
                    >
                      {getFieldDecorator("expiryDate", {
                        initialValue: moment(expiryDate)
                      })(
                        <DatePicker
                          style={{
                            paddingLeft: 5,
                            width: "100%",
                            display: "inline-block"
                          }}
                          show
                          Today={false}
                          defaultPickerValue={moment(expiryDate)}
                        />
                      )}
                    </Form.Item>
                  ) : (
                    <Moment format="ll">{expiryDate}</Moment>
                  )}
                </div>
              </div>
              <Divider orientation="left">Contextual History</Divider>
              <div className="merm-overview-container">
                <Timeline>
                  {history.map((h, idx) => (
                    <Timeline.Item key={idx}>
                      <Bold>
                        <a
                          href={h.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {h.title}
                        </a>
                      </Bold>{" "}
                      <Moment format="LT">{h.visitTime}</Moment>
                    </Timeline.Item>
                  ))}
                  <Timeline.Item>
                    <Bold>Merm Created!</Bold>{" "}
                    <Moment format="lll">{createdAt}</Moment>
                  </Timeline.Item>
                </Timeline>
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
        </Form>
      </div>
    );
  }
}

Bold.propTypes = {
  children: PropTypes.string.isRequired
};

OverviewOwner.propTypes = {
  mermActions: PropTypes.object.isRequired,
  categoryActions: PropTypes.object.isRequired,
  detailedMerm: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  userObject: PropTypes.object.isRequired,
  requestStatus: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  updateTitle: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    detailedMerm: state.detailedMerm,
    categories: state.categories,
    userObject: state.userObject,
    users: state.users,
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
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Form.create({ name: "edit_merm" })(OverviewOwner));
