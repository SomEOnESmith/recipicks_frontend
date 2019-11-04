import { FETCH_INGREDIENTS } from "../actions/actionTypes";

const initialState = {
  ingredients: [],
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

    default:
      return state;
  }
};
