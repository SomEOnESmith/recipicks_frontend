import { FETCH_RECIPE } from "./actionTypes";
import instance from "./instance";

export const fetchRecipeDetail = recipeID => async dispatch => {
  try {
    const res = await instance.get(`recipes/${recipeID}/`);
    const recipe = res.data;
    dispatch({ type: FETCH_RECIPE, payload: recipe });
  } catch (error) {
    console.error(error);
  }
};
