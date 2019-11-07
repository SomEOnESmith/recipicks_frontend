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
      const { ingredients, cuisines, courses, meals } = payload;
      return {
        ...state,
        ingredients,
        cuisines,
        courses,
        meals,
        loading: false
      };
    default:
      return state;
  }
};
