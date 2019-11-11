import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Actions
import { addRecipe, resetErrors } from "../../redux/actions";

// Components
import Steps from "./Steps";
import FilterSelect from "./FilterSelect";

class AddRecipe extends Component {
  state = {
    title: "",
    description: "",
    ingredients: [],
    courses: [],
    meals: [],
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
      courses,
      meals,
      cuisine,
      steps
    } = this.state;
    this.props.addRecipe(
      { title, description, ingredients, courses, meals, cuisine, steps },
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
    const steps = [];
    for (let i = 0; i < this.state.currentSteps; i++) {
      steps.push(<Steps order={i + 1} key={i + 1} addStep={this.addStep} />);
    }
    const { meals, courses, cuisines, ingredients } = this.props.filters;
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
                    <FilterSelect
                      handleChange={this.handleChange}
                      name="ingredients"
                      filter={ingredients}
                    />
                    <FilterSelect
                      handleChange={this.handleChange}
                      name="courses"
                      filter={courses}
                    />
                    <FilterSelect
                      handleChange={this.handleChange}
                      name="cuisine"
                      filter={cuisines}
                    />
                    <FilterSelect
                      handleChange={this.handleChange}
                      name="meals"
                      filter={meals}
                    />
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
