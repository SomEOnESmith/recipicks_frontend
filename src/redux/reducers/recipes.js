import {
  FETCH_RECIPES,
  FETCH_RECIPE,
  HANDLE_DELETE,
  ADD_RECIPE
} from "../actions/actionTypes";

const initialState = {
  recipes: [],
  recipe: null,
  loading: true
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RECIPES:
      const recipes = payload;
      return {
        ...state,
        recipes: recipes,
        loading: false
      };
    case FETCH_RECIPE:
      const recipe = payload;
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
        if (recipe.ingredients.includes(payload.id)) newMissing.push(payload);
      });
      return {
        ...state,
        recipes: {
          perfect_match: state.recipes.perfect_match,
          user_excess_ings: state.recipes.user_excess_ings,
          user_missing_ings: newMissing
        }
      };
    case ADD_RECIPE:
      const newRecipe = payload;
      return {
        ...state,
        recipes: state.recipes.concat(newRecipe)
      };
    default:
      return state;
  }
};

export default reducer;
