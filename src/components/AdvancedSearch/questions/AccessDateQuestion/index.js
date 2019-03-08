import React from "react";
import { Button, Modal, DatePicker } from "antd";
import PropTypes from "prop-types";

class AccessDateQuestion extends React.Component {
  state = {
    endOpen: false
  };

  disabledStartDate = startValue => {
    const endValue = this.props.endDate;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.props.startDate;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startDate", value);
  };

  onEndChange = value => {
    this.onChange("endDate", value);
    this.props.next();
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { endOpen } = this.state;
    const { startDate, endDate } = this.props;
    return (
      <div>
        <div className="access-date-question">
          What dates did you last access the resource?
        </div>
        <DatePicker
          style={{ marginRight: "10px" }}
          disabledDate={this.disabledStartDate}
          format="YYYY-MM-DD"
          value={startDate}
          placeholder="Start Range"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          style={{ marginLeft: "10px" }}
          disabledDate={this.disabledEndDate}
          format="YYYY-MM-DD"
          value={endDate}
          placeholder="End Range"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    );
  }
}

AccessDateQuestion.propTypes = {
  next: PropTypes.func.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired
};

export default AccessDateQuestion;
