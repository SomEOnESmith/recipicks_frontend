import { FETCH_RECIPES } from "../actions/actionTypes";

const initialState = {
  recipes: {
    perfectMatch: [],
    userExcess: [],
    userMissing: []
  },
  loading: true,

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
