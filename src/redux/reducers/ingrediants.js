import { FETCH_INGREDIANTS } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_INGREDIANTS:
      return { ingrediants: payload };

    default:
      return state;
  }
};
