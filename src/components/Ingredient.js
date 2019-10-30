import React, { Component } from "react";

class Ingredient extends Component {
  render() {
    const ingredient = this.props.ingredient;
    return (
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id="Left"
        ></input>
        <label className="custom-control-label" for="customCheck1">
          {ingredient.name}
        </label>
      </div>
    );
  }
}

export default Ingredient;
