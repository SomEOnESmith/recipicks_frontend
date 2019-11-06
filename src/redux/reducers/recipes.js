import { FETCH_RECIPES, FETCH_RECIPE } from "../actions/actionTypes";

const initialState = {
  recipes: [],
  recipe: null,
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
    case FETCH_RECIPE:
      const recipe = action.payload;
      return {
        ...state,
        recipe: recipe,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
