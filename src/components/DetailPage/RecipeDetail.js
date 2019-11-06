import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../Loading";

// Components
import Step from "./Step";

import { fetchRecipe } from "../../redux/actions";

class RecipeDetail extends Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.recipeID);
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      const recipe = this.props.recipe;

      const meal = recipe.meal.map(meal => {
        return <li> {meal.name}</li>;
      });

      const course = recipe.course.map(course => {
        return <li> {course.name} </li>;
      });

      const ingredients = recipe.ingredients.map(ingredient => {
        return (
          <li
            style={{
              paddingLeft: 22
            }}
          >
            {ingredient.name}
          </li>
        );
      });

      const steps = recipe.steps.map(step => <Step step={step} />);

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
                  <div id="RecipeInfo" className="row">
                    <div id="RecipeInfoLine" className="col-4">
                      <p id="spacing">
                        <span id="bold"> Cuisine: </span>
                        <li>{recipe.cuisine.name}</li>
                      </p>
                      <p id="spacing">
                        <span id="bold"> Total: </span> <li>15 min</li>
                      </p>
                    </div>
                    <div id="RecipeInfoLine" className="col-4">
                      <p id="spacing">
                        <span id="bold"> Meal: </span> {meal}
                      </p>
                    </div>
                    <div className="col-4">
                      <p id="spacing">
                        <span id="bold"> Course: </span> {course}
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <h4>DESCRIPTION</h4>

                <hr />
                {recipe.description}
              </div>

              <div className="col">
                <img
                  style={{
                    height: 300,
                    width: 500,
                    borderRadius: 15
                  }}
                  src={recipe.image}
                  alt=""
                />
              </div>
            </div>

            <div id="padding" className="row">
              <div className="col">
                <h4>INSTRUCTIONS</h4>
                <hr />
                {steps}
              </div>
              <div className="col">
                <h4>INGREDIENTS</h4> <hr />
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
