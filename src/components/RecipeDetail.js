import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";

// Components
import Ingredient from "./Ingredient";
import Step from "./Step";

import { fetchRecipeDetail } from "../redux/actions";

class RecipeDetail extends Component {
  componentDidMount() {
    this.props.fetchRecipeDetail(this.props.match.params.recipeID);
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      const recipe = this.props.recipe;

      const meal = recipe.meal.map(meal => {
        return meal.name;
      });

      const course = recipe.course.map(course => {
        return course.name;
      });

      const ingredients = recipe.ingredients.map(ingredient => (
        <Ingredient ingredient={ingredient} />
      ));

      const steps = recipe.steps.map(step => <Step step={step} />);

      return (
        <div>
          <div id="detail-space" className="container">
            <div className="row">
              <div className="col">
                <h2>{recipe.title}</h2>
                <div className="container">
                  <div className="row">
                    <div className="col-3">
                      <p id="spacing">
                        <img src="https://img.icons8.com/small/16/000000/halal-food.png"></img>{" "}
                        {recipe.cuisine.name}
                      </p>
                    </div>
                    <div className="col-3">
                      <p id="spacing">
                        <img src="https://img.icons8.com/small/16/000000/pizza.png"></img>{" "}
                        {meal}
                      </p>
                    </div>
                    <div className="col-3">
                      <p id="spacing">
                        <img src="https://img.icons8.com/small/16/000000/pizza.png"></img>{" "}
                        {course}
                      </p>
                    </div>
                    <div className="col-3">
                      <p id="spacing">
                        <img src="https://img.icons8.com/small/16/000000/alarm-clock.png"></img>{" "}
                        15 min
                      </p>
                    </div>
                  </div>
                </div>
                <br />
                <h4>WHY THIS RECIPE WORKS?</h4>

                <hr />
                {recipe.description}
              </div>

              <div className="col">
                <img
                  style={{
                    height: 300,
                    width: 500,
                    borderRadius: 30
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
    recipe: state.rootRecipe.recipe,
    loading: state.rootRecipe.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipeDetail: recipeID => dispatch(fetchRecipeDetail(recipeID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetail);
