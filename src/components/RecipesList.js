import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import RecipeCard from "./RecipeCard";

class RecipesList extends Component {
  render() {
    console.log("TCL: RecipesList -> render -> recipes", this.props.recipes);
    const exact = this.props.recipes.exact_match.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
    console.log("exact!!!!!", exact);
    const excess = this.props.recipes.user_has_excess_ingredients.map(
      recipe => <RecipeCard key={recipe.id} recipe={recipe} />
    );
    const missing = this.props.recipes.user_has_missing_ingredients.map(
      recipe => <RecipeCard key={recipe.id} recipe={recipe} />
    );
    console.log("missing!!!!!", missing);
    return (
      <div id="recipe-list" className="container">
        <div className="row" id="card-row">
          {exact.length !== 0 && <>{exact}</>}
          {excess.length !== 0 && <>{excess}</>}
          {missing.length !== 0 && <>{missing}</>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.rootRecipes.recipes
  };
};

export default connect(mapStateToProps)(RecipesList);
