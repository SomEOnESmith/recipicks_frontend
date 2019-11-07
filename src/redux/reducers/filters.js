import { FETCH_FILTERS } from "../actions/actionTypes";

const initialState = {
  ingredients: [],
  cuisines: [],
  courses: [],
  meals: [],
  loading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FILTERS:
      return {
        ...state,
        ingredients: payload.ingredients,
        cuisines: payload.cuisines,
        courses: payload.courses,
        meals: payload.meals,
        loading: false
      };
    default:
      return state;
  }
};
