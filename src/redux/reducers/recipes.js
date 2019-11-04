import { FETCH_RECIPES } from "../actions/actionTypes";

const initialState = {
  recipes: {
    exact_match: [],
    user_has_excess_ingredients: [],
    user_has_missing_ingredients: []
  },
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      const recipes = action.payload;
      return {
        ...state,
        recipes: recipes,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
