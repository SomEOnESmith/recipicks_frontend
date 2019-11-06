import { FETCH_INGREDIENTS, FETCH_CUISINES } from "../actions/actionTypes";

const initialState = {
  ingredients: [],
  cuisines: [],
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_INGREDIENTS:
      return {
        ...state,
        ingredients: payload,
        loading: false
      };
    case FETCH_CUISINES:
      return {
        ...state,
        cuisines: payload,
        loading: false
      };
    default:
      return state;
  }
};
