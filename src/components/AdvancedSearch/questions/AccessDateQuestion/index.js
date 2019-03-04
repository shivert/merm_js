import React from "react";
import { Button, Modal, DatePicker } from "antd";
import PropTypes from "prop-types";


var moment = require('moment');

class AccessDateQuestion extends React.Component {
    state = {
      startValue: moment().subtract(7, 'days'),
      endValue: moment(),
      endOpen: false,
    };
  
    disabledStartDate = (startValue) => {
      const endValue = this.state.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    }
  
    disabledEndDate = (endValue) => {
      const startValue = this.state.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return endValue.valueOf() <= startValue.valueOf();
    }
  
    onChange = (field, value) => {
      this.setState({
        [field]: value,
      });
    }
  
    onStartChange = (value) => {
      this.onChange('startValue', value);
    }
  
    onEndChange = (value) => {
      this.onChange('endValue', value);
    }
  
    handleStartOpenChange = (open) => {
      if (!open) {
        this.setState({ endOpen: true });
      }
    }
  
    handleEndOpenChange = (open) => {
      this.setState({ endOpen: open });
    }
  
    render() {
      const { startValue, endValue, endOpen } = this.state;
      return (
        <div>
          <div className="access-date-question">
            What dates did you last access the resource?
          </div>
          <DatePicker
            style={{marginRight: "10px"}}
            disabledDate={this.disabledStartDate}
            format="YYYY-MM-DD"
            value={startValue}
            placeholder="Start Range"
            onChange={this.onStartChange}
            onOpenChange={this.handleStartOpenChange}
          />
          <DatePicker
            style={{marginLeft: "10px"}}
            disabledDate={this.disabledEndDate}
            format="YYYY-MM-DD"
            value={endValue}
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
};

export default AccessDateQuestion;
