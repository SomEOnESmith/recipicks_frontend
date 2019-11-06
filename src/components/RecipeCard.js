import React, { Component } from "react";
import { Link } from "react-router-dom";

class RecipeCard extends Component {
  render() {
    const recipe = this.props.recipe;
    // const msg = this.props.exactmsg;
    console.log("recipe!!!!!!!!", recipe);
    // console.log("msg-------", msg);
    return (
      <>
        <div
          style={{
            width: "25rem"
          }}
          className="card my-3"
          id="recipe-card"
        >
          <span class="badge badge-success">Success</span>
          <img
            src={`http://127.0.0.1:8000${recipe.image}`}
            id="card-img"
            className="card-img-top"
            alt="..."
          ></img>

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
                  ></img>
                  American
                </p>
              </div>
              <div className="col">
                <p id="card-text-orange">
                  <img
                    src="https://img.icons8.com/small/16/000000/pizza.png"
                    alt=""
                  ></img>
                  Dinner
                </p>
              </div>
              <div className="col">
                <p id="card-text-orange">
                  <img
                    src="https://img.icons8.com/small/16/000000/alarm-clock.png"
                    alt=""
                  ></img>
                  15 min
                </p>
              </div>
            </div>

            <p id="card-text-black" className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a
              href={`/recipes/${recipe.id}`}
              id="card-btn"
              className="btn btn-block"
            >
              Let's Cook!
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default RecipeCard;
