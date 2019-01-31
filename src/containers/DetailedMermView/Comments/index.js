import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../actions/authenticationActions";
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
import moment from "moment";

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      comments: [],
      submitting: false,
      value: ""
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const data = this.props.detailedMermComments.comments.map(comment => ({
      actions: [],
      author: comment.authorName,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: (
        <div>
          <p>{comment.message}</p>
          <Divider />
        </div>
      ),
      datetime: (
        <Tooltip
          title={moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>
            {moment()
              .subtract(1, "days")
              .fromNow()}
          </span>
        </Tooltip>
      )
    }));

    this.setState({ data: data });
  }

  handleSubmit = () => {
    this.setState({
      submitting: true
    });

    const newComments = this.state.data.concat([
      {
        actions: [],
        author: "Me",
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: (
          <div>
            <p>{this.state.value}</p>
            <Divider />
          </div>
        ),
        datetime: (
          <Tooltip
            title={moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD HH:mm:ss")}
          >
            <span>
              {moment()
                .subtract(1, "days")
                .fromNow()}
            </span>
          </Tooltip>
        )
      }
    ]);

    this.setState({ data: newComments });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: ""
      });
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    return (
      <div>
        <List
          className="comment-list"
          header={`${this.state.data.length} replies`}
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

        {comments.length > 0 && (
          <CommentList comments={this.props.detailedMermComments.comments} />
        )}
        <Comment
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
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
  detailedMermComments: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    detailedMermComments: state.detailedMermComments
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
