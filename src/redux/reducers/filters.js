import { FETCH_FILTERS, SELECT_FILTERS } from "../actions/actionTypes";

const initialState = {
  ingredients: [],
  cuisines: [],
  courses: [],
  meals: [],
  selectedFilters: { cuisine: "", courses: [], meals: [] },
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FILTERS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case SELECT_FILTERS:
      return {
        ...state,
        selectedFilters: payload
      };
    default:
      return state;
  }
};
