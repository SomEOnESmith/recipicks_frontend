import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import RecipeCard from "./RecipeCard";

class RecipesList extends Component {
  render() {
    const exact = this.props.recipes.perfectMatch.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
    const excess = this.props.recipes.userExcess.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
    const missing = this.props.recipes.userMissing.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
    return (
      <div id="recipe-list" className="container">
        <div className="row" id="card-row">
          {exact.length !== 0 && (
            <>
              <h3 style={{ color: "yellow" }}>
                I have the exact amount of ingredients:
              </h3>
              {exact}
            </>
          )}
          {excess.length !== 0 && (
            <>
              <h3 style={{ color: "yellow" }}>
                I have an excess amount of ingredients:
              </h3>
              {excess}
            </>
          )}
          {missing.length !== 0 && (
            <>
              <h3 style={{ color: "yellow" }}>
                I am missing some ingredients:{" "}
              </h3>
              {missing}
            </>
          )}
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
