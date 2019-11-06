import { FETCH_CUISINES } from "../actions/actionTypes";

const initialState = {
  cuisines: [],
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
