import React, { Component } from "react";
import { Link } from "react-router-dom";

class RecipeCard extends Component {
  render() {
    const recipe = this.props.recipe;
    const icon = this.props.type;

    const meal = recipe.meal.map(meal => {
      return <li> {meal.name}</li>;
    });

    let span;
    if (icon === "exact") {
      span = (
        <span class="badge badge-success">exact amount of ingredients</span>
      );
    } else if (icon === "excess") {
      span = (
        <span class="badge badge-warning">excess amount of ingredients</span>
      );
    } else if (icon === "missing") {
      span = <span class="badge badge-danger">missing some ingredients</span>;
    } else {
      span = <></>;
    }

    return (
      <>
        <div
          style={{
            width: "25rem"
          }}
          className="card my-3"
          id="recipe-card"
        >
          {span}
          <img
            src={recipe.image}
            id="card-img"
            className="card-img-top"
            alt="..."
          />

          <div className="card-body">
            <Link to={`/recipes/${recipe.id}`}>
              <h5 id="title-link" className="card-title">
                {recipe.title}
              </h5>
            </Link>
            <hr />

            <div className="row">
              <div className="col">
                <p id="card-text-orange">
                  <img
                    src="https://img.icons8.com/small/16/000000/halal-food.png"
                    alt=""
                  />
                  {recipe.cuisine.name}
                </p>
              </div>
              <div className="col">
                <p id="card-text-orange">
                  <img
                    src="https://img.icons8.com/small/16/000000/pizza.png"
                    alt=""
                  />
                  {meal}
                </p>
              </div>
              <div className="col">
                <p id="card-text-orange">
                  <img
                    src="https://img.icons8.com/small/16/000000/alarm-clock.png"
                    alt=""
                  />
                  {recipe.total_time}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RecipeCard;
