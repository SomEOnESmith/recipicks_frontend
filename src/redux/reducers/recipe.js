import { FETCH_RECIPE_DETAIL } from "../actions/actionTypes";

const initialState = {
  recipe: null,
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPE_DETAIL:
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
