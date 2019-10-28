import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";

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
      return (
        <div className="col-lg-4 col-md-6 col-12">
          <div className="image">
            <img
              className="card-img-top img-fluid border"
              src={recipe.image}
              alt={recipe.title}
            />
          </div>
          <div className="card-body border">
            <h5 className="card-title">
              <span>{recipe.name}</span>
            </h5>
            <p>{recipe.description} </p>
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
