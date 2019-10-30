import React, { Component } from "react";
import { Link } from "react-router-dom";


class RecipeCard extends Component {
  render() {
    const recipe = this.props.recipe;
    return (
      <>
        <div style={{
          width: "200px", height: "300px"
        }} >
          <Link to={`/recipes/${recipe.id}`} >

            <div className="single-best-receipe-area mb-30"
            >

              <img
                className="card-img-top img-fluid"

                src={recipe.image}
                alt={recipe.title}
              />


              <div className="receipe-content"
              >
                <h5>{recipe.title}</h5>

              </div>

            </div>

          </Link>

        </div>

      </>


    );
  }
}

export default RecipeCard;
