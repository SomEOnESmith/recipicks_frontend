import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Loading from "../Loading";
import Step from "./Step";

// Actions
import { fetchRecipe } from "../../redux/actions";

class RecipeDetail extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.recipeID);
  }

  render() {
    if (this.props.recipe === null) {
      return <Loading />;
    } else {
      const { recipe } = this.props;
      const meals = recipe.meals.map(meal => {
        return (
          <li id="meal-style" key={meal.id} className="white">
            {meal.name}
          </li>
        );
      });
      const courses = recipe.courses.map(course => {
        return (
          <li key={course.id} className="white">
            {course.name}
          </li>
        );
      });
      const ingredients = recipe.ingredients.map(ingredient => {
        return (
          <li
            className="red"
            style={{
              paddingLeft: 5,
              fontSize: 20
            }}
            key={ingredient.id}
          >
            <span
              style={{
                color: "black"
              }}
            >
              {ingredient.name}
            </span>
          </li>
        );
      });
      const steps = recipe.steps.map(step => (
        <Step key={step.id} step={step} />
      ));
      return (
        <div className="detailBG">
          <div className="main-detail">
            <section className="header-detail">
              <div className="header-container">
                <div className="conatiner"></div>
              </div>
            </section>
          </div>
          <div id="detail-space" className="container">
            <div className="row">
              <div className="col">
                <h2 className="name-padding">{recipe.title}</h2>
                <div className="container">
                  <div className="row row-details">
                    <div className="col">
                      <span className="white" id="bold">
                        Cuisine:
                      </span>
                      <li
                        style={{ paddingBottom: 10 }}
                        className="white cuisine-style"
                      >
                        {recipe.cuisine ? recipe.cuisine.name : "Other"}
                      </li>
                      <span className="white" id="bold">
                        Total:
                      </span>
                      <li className="white clock-style">{recipe.total_time}</li>
                    </div>
                    <div className="col">
                      <span className="white" id="bold">
                        Meals:
                      </span>
                      {meals}
                    </div>
                    <div className="col">
                      <span className="white" id="bold">
                        Courses:
                      </span>
                      {courses}
                    </div>
                  </div>
                </div>
              </div>
              <img
                style={{
                  height: 350,
                  width: 350,
                  borderRadius: 10
                }}
                className="image-detail"
                src={recipe.image}
                alt="recipe"
              />
            </div>
            <div className="row">
              <div className="col">
                <h4 id="red">DESCRIPTION</h4>
                <hr />
                <span>{recipe.description}</span>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col">
                <h4 id="red">INSTRUCTIONS</h4>
                <hr />
                {steps}
              </div>
              <div className="col">
                <h4 id="red">INGREDIENTS</h4> <hr />
                {ingredients}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    recipe: state.rootRecipes.recipe,
    loading: state.rootRecipes.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipe: recipeID => dispatch(fetchRecipe(recipeID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetail);
