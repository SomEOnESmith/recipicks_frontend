import React, { Component } from "react";

class Step extends Component {
  render() {
    const step = this.props.step;
    return (
      <div id="text-padding" className="row">
        <div className="col">
          <p>
            <span style={{ fontWeight: "bold", color: "black" }}>
              0{step.order}.
            </span>
            {step.instruction}
          </p>
        </div>
      </div>
    );
  }
}

export default Step;
