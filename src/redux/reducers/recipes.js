import { FETCH_RECIPES } from "../actions/actionTypes";

const initialState = {
  recipes: [],
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
