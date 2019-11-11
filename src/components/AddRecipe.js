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
        <div className="main">
          <section className="header-recipe">
            <div className="header-container">
              <div
                style={{ postion: "relative", top: 100 }}
                className="card col-lg-7 col-md-7 col-sm-12 col-xs-12 mx-auto p-3  jumbotron  "
              >
                <div className="card-body">
                  <h1
                    style={{ textAlign: "center", color: "rgb(208, 6, 53)" }}
                    className="card-title"
                  >
                    Add A Recipe
                  </h1>
                  <form
                    onSubmit={this.submitHandler}
                    style={{ margin: "30px" }}
                  >
                    {!!errors.length && (
                      <div role="alert">
                        {errors.map(error => (
                          <p id="error" key={error}>
                            {error}
                          </p>
                        ))}
                      </div>
                    )}

                    <p>
                      <b style={{ color: "rgb(208, 6, 53)" }}>Title: </b>
                    </p>
                    <input
                      className="form-control rounded-pill"
                      placeholder="title"
                      type="text"
                      onChange={this.handleChange}
                      name="title"
                      value={this.state.title}
                    />
                    <br />
                    <p>
                      <b style={{ color: "rgb(208, 6, 53)" }}>Description: </b>
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
                      <b style={{ color: "rgb(208, 6, 53)" }}>Ingredients: </b>
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
                      <b style={{ color: "rgb(208, 6, 53)" }}>Course: </b>
                    </p>
                    <div>
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
                      <b style={{ color: "rgb(208, 6, 53)" }}>Cuisine: </b>
                    </p>
                    <div>
                      <select
                        className="form-control"
                        name="cuisine"
                        onChange={this.handleChange}
                      >
                        <option style={{ color: "rgb(208, 6, 53)" }}>
                          Select a cuisine
                        </option>
                        {cuisineOptions}
                      </select>
                    </div>
                    <br />

                    <p>
                      <b style={{ color: "rgb(208, 6, 53)" }}>Meal: </b>
                    </p>
                    <div>
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
            ADD AN INPUT FIELD LATER FOR AN IMAGE FIELD
            </div>
            <br /> */}

                    <input
                      id="registerbtn"
                      className="btn btn-danger btn-block"
                      type="submit"
                      value="Add Recipe"
                    />
                  </form>
                </div>
              </div>
            </div>
          </section>
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
