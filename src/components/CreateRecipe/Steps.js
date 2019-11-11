import React, { Component } from "react";

class Steps extends Component {
  state = {
    instruction: "",
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  handleKeyDown = event => {
    if (["e", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  handleChange = async event => {
    const { name, value } = event.target;
    await this.setState({ [name]: value });
    const { instruction, hours, minutes, seconds } = this.state;
    const { order } = this.props;
    const required_time = `${hours}:${minutes}:${seconds}`;
    const step = { instruction, order, required_time };
    this.props.addStep(step);
  };

  render() {
    return (
      <div className="my-2">
        <div className="row">
          <div className="col">Step {this.props.order}:</div>
          <div className="col">
            <input
              onChange={this.handleChange}
              name="instruction"
              type="text"
            />
          </div>
          <div className="col">
            <input
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              name="hours"
              type="number"
              style={{ width: "50px" }}
              min="0"
              max="72"
            />
          </div>
          <div className="col">
            <input
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              name="minutes"
              type="number"
              style={{ width: "50px" }}
              min="0"
              max="60"
            />
          </div>
          <div className="col">
            <input
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              name="seconds"
              type="number"
              style={{ width: "50px" }}
              min="0"
              max="60"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Steps;