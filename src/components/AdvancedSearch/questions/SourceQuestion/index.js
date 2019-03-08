import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

const ButtonGroup = Button.Group;

class SourceQuestion extends React.Component {
  handleClick = source => {
    this.props.next("source", source);
  };

  render() {
    return (
      <>
        <div className="source-question">
          What is the Source of the Resource?
        </div>

        <ButtonGroup>
          <Button onClick={() => this.handleClick("Browser Extension")}>
            Browser Extension
          </Button>
          <Button onClick={() => this.handleClick("merm.io")}>merm.io</Button>
          <Button onClick={() => this.handleClick("Slackbot")}>Slackbot</Button>
        </ButtonGroup>
      </>
    );
  }
}

SourceQuestion.propTypes = {
  next: PropTypes.func.isRequired
};

export default SourceQuestion;
