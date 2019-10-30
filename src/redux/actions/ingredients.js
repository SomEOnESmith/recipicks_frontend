import { FETCH_INGREDIENTS } from "./actionTypes";

import instance from "./instance";

export const fetchIngredients = () => async dispatch => {
  try {
    const res = await instance.get("ingredients/");
    const ingredients = res.data;
    dispatch({
      type: FETCH_INGREDIENTS,
      payload: ingredients
    });
  } catch (error) {
    console.error(error);
  }
};
