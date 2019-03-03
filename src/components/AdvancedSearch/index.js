import React from "react";
import PropTypes from "prop-types";
import { Steps, Button, message, Icon } from "antd";
const Step = Steps.Step;

import CategoryQuestion from "./questions/CategoryQuestion";
import OwnerQuestion from "./questions/OwnerQuestion";
import AccessDateQuestion from "./questions/AccessDateQuestion";
import TagQuestion from "./questions/TagQuestion";
import SourceQuestion from "./questions/SourceQuestion"

const steps = [
  {
    title: "Category",
    content: <CategoryQuestion />,
    iconType: "file-unknown"
  },
  {
    title: "Owner",
    content: <OwnerQuestion />,
    iconType: "user"
  },
  {
    title: "Access Date",
    content: <AccessDateQuestion />,
    iconType: "calendar"
  },
  {
    title: "Tags",
    content: <TagQuestion />,
    iconType: "tag"
  },
  {
    title: "Source",
    content: <SourceQuestion />,
    iconType: "question-circle"
  }
];

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;

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
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
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
};

export default AdvancedSearch;
