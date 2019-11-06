import { FETCH_RECIPES, FETCH_RECIPE } from "./actionTypes";
import instance from "./instance";

export const fetchRecipes = (
  cuisine,
  meal,
  course,
  ingredients
) => async dispatch => {
  try {
    const res = await instance.get("recipes/", {
      params: {
        ingredients: ingredients,
        cuisine: cuisine,
        meal: meal,
        course: course
      }
    });
    const recipes = res.data;
    dispatch({ type: FETCH_RECIPES, payload: recipes });
  } catch (error) {
    console.error(error);
  }
};

export const fetchRecipe = recipeID => async dispatch => {
  try {
    const res = await instance.get(`recipes/${recipeID}/`);
    const recipe = res.data;
    dispatch({ type: FETCH_RECIPE, payload: recipe });
  } catch (error) {
    console.error(error);
  }
};
