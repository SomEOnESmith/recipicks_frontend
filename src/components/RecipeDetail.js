import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import Background from "../assets/img/bg-img/breadcumb3.jpg";

// Components
import Ingredient from "./Ingredient";

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
      const Ingredients = this.props.recipe.ingredients.map(ingredient => (
        <Ingredient ingredient={ingredient} />
      ));

      return (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <div
            className="breadcumb-area bg-img bg-overlay"
            style={{
              backgroundImage: "url(" + Background + ")"
            }}
          >
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12">
                  <div className="breadcumb-text text-center">
                    <h2>Recipe</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="receipe-slider owl-carousel">
                  <img
                    style={{
                      height: 360,
                      width: 1400
                    }}
                    src={recipe.image}
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div id="toLeft" className="row">
            <div className="col-12 col-md-8">
              <div className="receipe-headline my-5">
                <h2>{recipe.title}</h2>
                <div className="receipe-duration">
                  <h6>Prep: </h6>
                  <h6>Cuisine: {recipe.cuisine.name}</h6>
                  <h6>Description:</h6> <p>{recipe.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div id="toLeft" className="row">
            <div className="col-12 col-lg-8">
              <div className="single-preparation-step d-flex">
                <h4>01.</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum nec varius dui. Suspendisse potenti. Vestibulum ac
                  pellentesque tortor. Aenean congue sed metus in iaculis. Cras
                </p>
              </div>

              <div className="single-preparation-step d-flex">
                <h4>02.</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum nec varius dui. Suspendisse potenti. Vestibulum ac
                  pellentesque tortor. Aenean congue sed metus in iaculis. Cras
                </p>
              </div>

              <div className="single-preparation-step d-flex">
                <h4>03.</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum nec varius dui. Suspendisse potenti. Vestibulum ac
                  pellentesque tortor. Aenean congue sed metus in iaculis. Cras
                </p>
              </div>

              <div className="single-preparation-step d-flex">
                <h4>04.</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum nec varius dui. Suspendisse potenti. Vestibulum ac
                  pellentesque tortor. Aenean congue sed metus in iaculis. Cras
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="ingredients">
                <h4>Ingredients</h4>

                {Ingredients}
              </div>
            </div>
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
