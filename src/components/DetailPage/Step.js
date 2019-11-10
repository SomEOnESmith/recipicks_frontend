import React, { Component } from "react";

class Step extends Component {
  render() {
    const step = this.props.step;
    return (
      <div id="text-padding" className="row">
        <div className="col">
          <p>
            <span style={{ fontSize: 25, fontWeight: "bold", color: "black" }}>
              {step.order}.
            </span>
            <span style={{ paddingLeft: 5, color: "black" }}>
              {step.instruction}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Step;
