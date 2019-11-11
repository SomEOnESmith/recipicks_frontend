import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Assets
import cuisineIcon from "../../assets/icons8-globe-16.png";
import alarmIcon from "../../assets/icons8-alarm-clock-16.png";

class RecipeCard extends Component {
  render() {
    const { recipe, ingredients } = this.props;
    const icon = this.props.type;
    const ingredientList = recipe.ingredients.map(ingredient => {
      let ingredientObject = ingredients.find(
        rootIngredient => ingredient === rootIngredient.id
      );
      return (
        <li key={ingredient}>
          {ingredientObject.name[0].toUpperCase() +
            ingredientObject.name.slice(1)}
        </li>
      );
    });
    const meal = recipe.meals.map(meal => {
      return (
        <li key={meal.id} className="meal-style">
          <span className="meal-name">{meal.name}</span>
        </li>
      );
    });
    let span;
    if (icon === "perfect") {
      span = <span className="badge badge-pill badge-success">Perfect</span>;
    } else if (icon === "excess") {
      span = <span className="badge badge-pill badge-warning">Excess</span>;
    } else if (icon === "missing") {
      span = <span className="badge badge-pill badge-danger">Missing</span>;
    } else {
      span = null;
    }
    return (
      <>
        <div
          style={{
            width: "25rem"
          }}
          className="card image-container"
          id="recipe-card"
        >
          {span}
          <Link id="link" to={`/recipes/${recipe.id}`}>
            <img
              src={recipe.image}
              id="card-img"
              className="card-img-top image-overlay"
              alt="..."
            />
            <div className="card-img-overlay img-text-container">
              <h5 className="card-title img-text">Ingredients:</h5>
              <p className="card-text img-text">{ingredientList}</p>
            </div>
            <div className="card-body">
              <h5 id="title-link" className="card-title">
                {recipe.title}
              </h5>
              <hr />
              <div className="row list-style">
                <div className="cuisine-style">
                  <img src={cuisineIcon} alt="cuisine" />
                  <span className="name-style">
                    {recipe.cuisine ? recipe.cuisine.name : "Other"}
                  </span>
                </div>
                <div className="meal-style">{meal}</div>
                <div className="time-style">
                  <img src={alarmIcon} alt="time" />
                  <span className="name-style">
                    <span style={{ paddingLeft: 3 }}>{recipe.total_time}</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.rootFilters.ingredients
});

export default connect(mapStateToProps)(RecipeCard);
