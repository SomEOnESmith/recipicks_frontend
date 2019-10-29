import { FETCH_INGREDIENTS } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_INGREDIENTS:
      return { ingredients: payload };

    default:
      return state;
  }
};
