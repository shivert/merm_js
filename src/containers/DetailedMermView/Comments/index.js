import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/mermActions";
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Tooltip,
  Divider
} from "antd";

const TextArea = Input.TextArea;

const Editor = ({ onChange, onSubmit, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Comments extends React.Component {
  state = {
    data: [],
    value: ""
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.detailedMerm.comments.length !==
      this.props.detailedMerm.comments.length
    ) {
      this.getData();
    }
  }

  getData() {
    const data = this.props.detailedMerm.comments.map(comment => ({
      actions: [],
      author: comment.author.name,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: (
        <div>
          <p>{comment.content}</p>
          <Divider className="comment-divider" />
        </div>
      ),
      datetime: (
        <Tooltip title={<Moment format="lll">{comment.createdAt}</Moment>}>
          <span>
            <Moment fromNow>{comment.createdAt}</Moment>
          </span>
        </Tooltip>
      )
    }));

    this.setState({ data: data });
  }

  handleSubmit = () => {
    this.props.actions.addMermComment({
      content: this.state.value,
      merm_id: this.props.detailedMerm.id,
      author_id: this.props.userObject.id
    });

    this.setState({
      value: ""
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="comment-container">
        <List
          className="comment-list"
          header={`${this.state.data.length} comments`}
          itemLayout="horizontal"
          dataSource={this.state.data}
          renderItem={item => (
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          )}
        />
        <Comment
          className="comment-editor"
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              value={value}
            />
          }
        />
      </div>
    );
  }
}

Comments.propTypes = {
  actions: PropTypes.object.isRequired,
  detailedMerm: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired
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
)(Comments);
