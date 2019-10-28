import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import RecipeCard from "./RecipeCard";

class RecipesList extends Component {
  render() {
    const RecipeCards = this.props.recipes.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));

    return (
      <div>
        <div className="row">{RecipeCards}</div>
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
