import React from "react";
import PropTypes from "prop-types";
import { Steps, Button, message, Icon } from "antd";
const Step = Steps.Step;
import * as actions from "../../actions/searchActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

var moment = require("moment");

import CategoryQuestion from "./questions/CategoryQuestion";
import OwnerQuestion from "./questions/OwnerQuestion";
import AccessDateQuestion from "./questions/AccessDateQuestion";
import TagQuestion from "./questions/TagQuestion";
import SourceQuestion from "./questions/SourceQuestion";

class AdvancedSearch extends React.Component {
  state = {
    current: 0,
    source: null,
    owner: null,
    tags: [],
    category: null,
    accessDates: {
      startDate: moment().subtract(7, "days"),
      endDate: moment()
    }
  };

  next = (field, value) => {
    this.setState({ [field]: value }, console.log(this.state));

    this.props.actions.advancedSearchMerms(this.state);

    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current } = this.state;

    const steps = [
      {
        title: "Source",
        content: <SourceQuestion next={this.next} value={this.state.source} />,
        iconType: "question-circle"
      },
      {
        title: "Category",
        content: (
          <CategoryQuestion next={this.next} value={this.state.category} />
        ),
        iconType: "file-unknown"
      },
      {
        title: "Owner",
        content: <OwnerQuestion next={this.next} value={this.state.owner} />,
        iconType: "user"
      },
      {
        title: "Access Date",
        content: <AccessDateQuestion next={this.next} startDate={this.state.accessDates.startDate} endDate={this.state.accessDates.endDate} />,
        iconType: "calendar"
      },
      {
        title: "Tags",
        content: <TagQuestion next={this.next} value={this.state.tags} />,
        iconType: "tag"
      }
    ];

    return (
      <div className="advanced-search-container">
        <Steps className="custom-steps" current={current}>
          {steps.map(item => (
            <Step
              key={item.title}
              title={item.title}
              icon={<Icon type={item.iconType} />}
            />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && (
            <Button style={{ float: "left" }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              style={{ float: "right" }}
              type="primary"
              onClick={() => this.next()}
            >
              Skip
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              style={{ float: "right" }}
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    );
  }
}

AdvancedSearch.propTypes = {
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    requestStatus: state.requestStatus,
    location: state.router.location
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
)(AdvancedSearch);
