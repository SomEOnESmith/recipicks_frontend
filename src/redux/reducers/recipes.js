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
      let newMissing = state.recipes.perfect_match;
      let newExcess = state.recipes.user_excess_ingrs.filter(recipe => {
        if (recipe.ingredients.includes(payload.id)) {
          newMissing.push(payload);
          return false;
        } else {
          return recipe;
        }
      });
      return {
        ...state,
        recipes: {
          perfect_match: [],
          user_excess_ingrs: newExcess,
          user_missing_ingrs: newMissing
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
