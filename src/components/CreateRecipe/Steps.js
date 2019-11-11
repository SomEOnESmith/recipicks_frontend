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

  handlePaste = event => {
    event.preventDefault();
    // let paste = event.clipboardData.getData("text");
    // let ingredients = paste.match(regex)
    // paste
    //   .split("")
    //   .filter(element => element !== "-" && element !== "+" && element !== "e")
    //   .join("");
  };

  render() {
    return (
      <div className="my-2">
        <div className="col stepTitle mb-2">Step {this.props.order}:</div>
        <div className="col">
          <input
            className="form-control rounded-pill"
            onChange={this.handleChange}
            name="instruction"
            placeholder="Write the instructions of the step here..."
            type="text"
          />
        </div>
        <div className="row m-2">
          <div className="col pl-2 stepTitle">
            Step Total Time:
            <div className="row">
              <div className="col-3 stepTime">
                Hours
                <input
                  className="form-control rounded-pill"
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  onPaste={this.handlePaste}
                  name="hours"
                  type="number"
                  placeholder="00"
                  style={{ width: "60px" }}
                  min="00"
                  max="72"
                />
              </div>

              <div className="col-3 stepTime center ">
                Minutes
                <input
                  className="form-control rounded-pill"
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  onPaste={this.handlePaste}
                  name="minutes"
                  type="number"
                  placeholder="00"
                  style={{ width: "60px" }}
                  min="0"
                  max="60"
                />
              </div>
              <div className="col-3 stepTime">
                Seconds
                <input
                  className="form-control rounded-pill"
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  onPaste={this.handlePaste}
                  name="seconds"
                  type="number"
                  placeholder="00"
                  style={{ width: "60px" }}
                  min="0"
                  max="60"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default Steps;
