import { FETCH_INGREDIANTS } from "./actionTypes";
import instance from "./instance";

export const fetchIngrediants = () => async dispatch => {
  try {
    const res = await instance.get("ingrediants/");
    const ingrediants = res.data;
    dispatch({
      type: FETCH_INGREDIANTS,
      payload: ingrediants
    });
  } catch (error) {
    console.error(error);
  }
};
