import {
  FETCH_RECIPES,
  FETCH_RECIPE,
  HANDLE_DELETE
} from "../actions/actionTypes";

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
    case HANDLE_DELETE:
      // let newPerfect = [];
      // let newExcess = [];
      let newMissing = state.recipes.perfect_match.map(recipe => recipe);
      state.recipes.user_excess_ings.forEach(recipe => {
        if (recipe.ingredients.includes(action.payload.id))
          newMissing.push(action.payload);
      });
      return {
        ...state,
        recipes: {
          perfect_match: state.recipes.perfect_match,
          user_excess_ings: state.recipes.user_excess_ings,
          user_missing_ings: newMissing
        }
      };
    default:
      return state;
  }
};

export default reducer;
