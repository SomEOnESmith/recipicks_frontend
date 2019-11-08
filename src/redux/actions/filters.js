import { FETCH_FILTERS, SELECT_FILTERS } from "./actionTypes";
import instance from "./instance";

export const fetchFilters = () => async dispatch => {
  try {
    const res = await instance.get("filters/");
    const filters = res.data;
    dispatch({
      type: FETCH_FILTERS,
      payload: filters
    });
  } catch (error) {
    console.error(error);
  }
};

export const selectFilters = filters => {
  return {
    type: SELECT_FILTERS,
    payload: filters
  };
};
