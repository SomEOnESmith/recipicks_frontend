import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import RecipeCard from "./RecipeCard";

class RecipesList extends Component {
  render() {
    const exact = this.props.recipes.perfectMatch.map(recipe => (
      <RecipeCard type={"exact"} key={recipe.id} recipe={recipe} />
    ));
    const excess = this.props.recipes.userExcess.map(recipe => (
      <RecipeCard type={"excess"} key={recipe.id} recipe={recipe} />
    ));
    const missing = this.props.recipes.userMissing.map(recipe => (
      <RecipeCard type={"missing"} key={recipe.id} recipe={recipe} />
    ));
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
