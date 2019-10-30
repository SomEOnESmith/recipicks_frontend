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
      <div className="row mt-4">
        <div className="col-12 col-sm-6 col-lg-4">
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
