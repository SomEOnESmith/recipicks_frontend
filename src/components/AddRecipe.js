import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addRecipe, resetErrors } from "../redux/actions";

class AddRecipe extends Component {
  state = {
    title: "",
    description: "",
    ingredients: [],
    course: [],
    meal: [],
    cuisine: ""
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.addRecipe(this.state, this.props.history);
  };

  handleChange = event => {
    const { name } = event.target;
    let value;
    if (name === "title" || name === "description" || name === "cuisine") {
      value = event.target.value;
    } else {
      value = [];
      Object.values(event.target.options).forEach(target => {
        if (target.selected) {
          value.push(+target.value);
        }
      });
    }
    this.setState({ [name]: value });
  };

  handleOption = filter => {
    return filter.map(filter => {
      return (
        <option value={filter.id} key={filter.id}>
          {filter.name}
        </option>
      );
    });
  };

  render() {
    const { meals, courses, cuisines } = this.props.filters;
    const { ingredients } = this.props;
    const ingredientsOptions = this.handleOption(ingredients);
    const mealOptions = this.handleOption(meals);
    const courseOptions = this.handleOption(courses);
    const cuisineOptions = this.handleOption(cuisines);
    const errors = this.props.errors;
    const user = this.props.user;

    if (!user) return <Redirect to="/" />;
    else {
      return (
        <div>
          <form onSubmit={this.submitHandler} style={{ margin: "30px" }}>
            {!!errors.length && (
              <div className="alert alert-danger" role="alert">
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}

            <p>
              <b>Title: </b>
            </p>
            <input
              className="form-control rounded-pill"
              placeholder="Title"
              type="text"
              onChange={this.handleChange}
              name="title"
              value={this.state.title}
            />
            <br />
            <p>
              <b>Description: </b>
            </p>
            <input
              className="form-control rounded-pill"
              placeholder="description"
              onChange={this.handleChange}
              type="text"
              name="description"
              value={this.state.description}
            />
            <br />
            <p>
              <b>Ingredients: </b>
            </p>
            <select
              className="form-control"
              name="ingredients"
              onChange={this.handleChange}
              multiple
            >
              {ingredientsOptions}
            </select>
            <br />
            <p>
              <b>Course: </b>
            </p>
            <div style={{ paddingLeft: "40px" }}>
              <select
                className="form-control"
                name="course"
                onChange={this.handleChange}
                multiple
              >
                {courseOptions}
              </select>
            </div>

            <br />

            <p>
              <b>Cuisine: </b>
            </p>
            <div style={{ paddingLeft: "67px" }}>
              <select
                className="ml-4 form-control"
                name="cuisine"
                onChange={this.handleChange}
                style={{ width: "60%" }}
              >
                <option>Select a cuisine</option>
                {cuisineOptions}
              </select>
            </div>
            <br />

            <p>
              <b>Meal: </b>
            </p>
            <div style={{ paddingLeft: "67px" }}>
              <select
                className="form-control"
                name="meal"
                onChange={this.handleChange}
                multiple
              >
                {mealOptions}
              </select>
            </div>
            <br />

            {/* <p>
              <b>Image: </b>
            </p>
            <div style={{ paddingLeft: "67px" }}>
              <select
                className="form-control"
                name="meal"
                defaultValue={this.state.meal}
                onChange={this.handleChange}
                multiple
              >
                {mealOptions}
              </select>
            </div>
            <br /> */}

            <input
              id="registerbtn"
              className="btn btn-primary btn-block"
              type="submit"
              value="Add Recipe"
            />
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    filters: state.rootFilters,
    ingredients: state.rootFilters.ingredients,
    errors: state.errors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRecipe: (recipeData, history) =>
      dispatch(addRecipe(recipeData, history)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecipe);
