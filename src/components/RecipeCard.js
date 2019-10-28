import React, { Component } from "react";
import { Link } from "react-router-dom";

class RecipeCard extends Component {
  render() {
    const recipe = this.props.recipe;
    return (
      <div className="col-lg-4 col-md-6 col-12">
        <br />
        <Link to={`/recipes/${recipe.id}`} className="card">
          <div className="image">
            <img
              className="card-img-top img-fluid"
              src={recipe.image}
              alt={recipe.title}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <span>{recipe.name}</span>
            </h5>
          </div>
        </Link>
      </div>
    );
  }
}

export default RecipeCard;
