import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Tabs, Icon, Popconfirm } from "antd";
import { bindActionCreators } from "redux";
import * as mermActions from "../../actions/mermActions";
import * as categoryActions from "../../actions/categoryActions";
import { history } from "../../store/configureStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as queryString from "query-string";

import Overview from "./Overview";
import OverviewOwner from "./OverviewOwner";
import Comments from "./Comments";
import Statistics from "./Statistics";

const TabPane = Tabs.TabPane;

class DetailedMermView extends React.Component {
  state = {
    editMode: false,
    title: ""
  };

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    const mermId = this.props.match.params.mermId;
    this.props.mermActions.getMerm(mermId, queryParams.shared);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.mermId !== this.props.match.params.mermId) {
      const mermId = this.props.match.params.mermId;
      this.props.mermActions.getMerm(mermId);
    }
  }

  componentWillUnmount() {
    this.props.mermActions.clearDetailedMerm();
  }

  favoriteMerm = () => {
    const flipFav = !this.props.detailedMerm.favorite;
    this.props.mermActions.favoriteMerm(this.props.detailedMerm.id, flipFav);
  };

  handleTabChange = key => {
    history.push(`${this.props.match.url}/${key}`);
  };

  updateTitle = newTitle => {
    this.setState({ title: newTitle });
  };

  confirm = () => {
    this.props.mermActions.deleteMerm(this.props.detailedMerm.id);
  };

  loadEditMermFields = () => {
    this.props.categoryActions.getCategories();
  };

  copyToMyMerms = () => {
    this.props.mermActions.copyMerm(this.props.detailedMerm.id);
  };

  render() {
    const activeTab = this.props.pathname.split("/").slice(-1)[0];
    const { name, favorite, contentType } = this.props.detailedMerm;
    const isOwner =
      this.props.detailedMerm.owner.id === this.props.userObject.id;
    return (
      <div>
        <div className="detailed-merm-header">
          <div style={{ float: "left", marginLeft: "15px" }}>
            <FontAwesomeIcon
              icon={["fab", contentType]}
              className={contentType}
              size="3x"
              style={{ marginBottom: "-8px" }}
            />
            <h1>{this.state.title === "" ? name : this.state.title}</h1>
            <Button
              className="favorite-button"
              shape="circle"
              size="large"
              onClick={this.favoriteMerm}
            >
              {favorite ? (
                <Icon
                  type="heart"
                  theme="filled"
                  style={{ fontSize: "20px" }}
                />
              ) : (
                <Icon type="heart" style={{ fontSize: "20px" }} />
              )}
            </Button>
          </div>
          <div style={{ float: "right" }}>
            {isOwner ? (
              this.state.editMode === false ? (
                <>
                  <Button
                    style={{ marginRight: "15px" }}
                    size="large"
                    type="primary"
                    onClick={() =>
                      this.setState({ editMode: true }, this.loadEditMermFields)
                    }
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure delete this merm?"
                    placement="bottomRight"
                    onConfirm={this.confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                      shape="circle"
                      icon="delete"
                      size="large"
                    />
                  </Popconfirm>
                </>
              ) : (
                <>
                  <Button
                    style={{ marginRight: "20px" }}
                    size="large"
                    type="primary"
                    onClick={() => {
                      this.setState({ editMode: false });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ marginRight: "20px" }}
                    size="large"
                    type="primary"
                    onClick={() => {
                      this.setState({ editMode: false });
                      this.child.onSubmit();
                    }}
                  >
                    Save
                  </Button>
                </>
              )
            ) : (
              <Button
                style={{ marginRight: "20px" }}
                size="large"
                type="primary"
                onClick={this.copyToMyMerms}
              >
                Copy to My Merms
              </Button>
            )}
          </div>
        </div>
        <Tabs
          tabPosition="top"
          defaultActiveKey={activeTab}
          onChange={this.handleTabChange}
        >
          <TabPane tab="Overview" key="overview">
            {isOwner ? (
              <OverviewOwner
                onRef={ref => (this.child = ref)}
                editMode={this.state.editMode}
                updateTitle={this.updateTitle}
              />
            ) : (
              <Overview />
            )}
          </TabPane>
          <TabPane tab="Comments" key="comments">
            <Comments />
          </TabPane>
          <TabPane tab="Statistics" key="statistics">
            <Statistics />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

DetailedMermView.propTypes = {
  mermActions: PropTypes.object.isRequired,
  categoryActions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  detailedMerm: PropTypes.object.isRequired,
  userObject: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    detailedMerm: state.detailedMerm,
    pathname: state.router.location.pathname,
    userObject: state.userObject
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
  mapDispatchToProps
)(DetailedMermView);
