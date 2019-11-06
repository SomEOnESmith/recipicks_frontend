import { FETCH_RECIPES } from "./actionTypes";
import instance from "./instance";

export const fetchRecipes = ingredients => async dispatch => {
  try {
    const res = await instance.get("recipes/ingredients/", {
      params: { ingredients: ingredients }
    });
    const recipes = {
      perfectMatch: res.data.perfect_match,
      userExcess: res.data.user_excess_ings,
      userMissing: res.data.user_missing_ings
    };
    dispatch({ type: FETCH_RECIPES, payload: recipes });
  } catch (error) {
    console.error(error);
  }
};
