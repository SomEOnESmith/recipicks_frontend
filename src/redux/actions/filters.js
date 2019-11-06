import { FETCH_CUISINES, FETCH_INGREDIENTS } from "./actionTypes";

import instance from "./instance";

export const fetchCuisines = () => async dispatch => {
  try {
    const res = await instance.get("cuisines/");
    const cuisines = res.data;
    dispatch({
      type: FETCH_CUISINES,
      payload: cuisines
    });
  } catch (error) {
    console.error(error);
  }
};

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
