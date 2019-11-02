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

      <div id="recipe-list" className="container">
        <div className="row" id="card-row">

          {RecipeCards}
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
