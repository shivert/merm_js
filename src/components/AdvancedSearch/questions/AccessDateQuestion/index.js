import React from "react";
import { DatePicker } from "antd";
import PropTypes from "prop-types";

var moment = require("moment");

class AccessDateQuestion extends React.Component {
  state = {
    endOpen: false,
    startDate: moment().subtract(7, "days"),
    endDate: moment()
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
    if (field === "endDate") {
      this.setState(
        {
          [field]: value
        },
        this.next
      );
    } else {
      this.setState({
        [field]: value
      });
    }
  };

  next = () => {
    this.props.next("accessDates", {
      startDate: this.state.startDate,
      endDate: this.state.endDate
    });
  };

  onStartChange = value => {
    this.onChange("startDate", value);
  };

  onEndChange = value => {
    this.onChange("endDate", value);
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
    const { startDate, endDate, endOpen } = this.state;
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
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

export default AccessDateQuestion;
