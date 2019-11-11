import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Actions
import { addRecipe, resetErrors } from "../../redux/actions";

// Components
import Steps from "./Steps";

class AddRecipe extends Component {
  state = {
    title: "",
    description: "",
    ingredients: [],
    course: [],
    meal: [],
    cuisine: "",
    steps: [],
    currentSteps: 1
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      title,
      description,
      ingredients,
      course,
      meal,
      cuisine,
      steps
    } = this.state;
    this.props.addRecipe(
      { title, description, ingredients, course, meal, cuisine, steps },
      this.props.history
    );
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

  addStep = step => {
    let exists = this.state.steps.find(
      stateStep => stateStep.order === step.order
    );
    if (exists) {
      const newSteps = this.state.steps
        .filter(stateStep => stateStep !== exists)
        .concat(step);
      this.setState({ steps: newSteps });
    } else {
      const newSteps = this.state.steps.concat(step);
      this.setState({ steps: newSteps });
    }
  };

  render() {
    const { meals, courses, cuisines, ingredients } = this.props.filters;

    const ingredientsOptions = this.handleOption(ingredients);
    const mealOptions = this.handleOption(meals);
    const courseOptions = this.handleOption(courses);
    const cuisineOptions = this.handleOption(cuisines);
    const errors = this.props.errors;
    const user = this.props.user;

    const steps = [];
    for (let i = 0; i < this.state.currentSteps; i++) {
      steps.push(<Steps order={i + 1} key={i + 1} addStep={this.addStep} />);
    }

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
                    New Recipe
                  </h1>
                  <form onSubmit={this.handleSubmit} style={{ margin: "30px" }}>
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
                      placeholder="Add a title"
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
                      placeholder="Add a description"
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
                      <b style={{ color: "rgb(208, 6, 53)" }}>Courses: </b>
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
                      <b style={{ color: "rgb(208, 6, 53)" }}>Meals: </b>
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
                    <p>
                      <b style={{ color: "rgb(208, 6, 53)" }}>Instructions:</b>
                    </p>
                    {steps}
                    <p>
                      +
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer"
                        }}
                        onClick={() =>
                          this.setState({
                            currentSteps: this.state.currentSteps + 1
                          })
                        }
                      >
                        Add another step
                      </span>
                    </p>
                    <br />
                    <input
                      id="registerbtn"
                      className="btn btn-danger btn-block"
                      type="submit"
                      value="Save"
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
