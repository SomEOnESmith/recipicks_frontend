import {
  FETCH_RECIPES,
  FETCH_RECIPE,
  DELETE_INGREDIENT,
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
    case DELETE_INGREDIENT:
      let newPerfect = [];
      let newMissing = state.recipes.perfect_match.concat(
        state.recipes.user_missing_ingrs
      );
      let newExcess = state.recipes.user_excess_ingrs.filter(recipe => {
        if (
          recipe.ingredients.every(ingredient => payload.includes(ingredient))
        ) {
          if (recipe.ingredients.length === payload.length) {
            newPerfect.unshift(recipe);
          } else if (recipe.ingredients.length > payload.length) {
            newMissing.unshift(recipe);
          } else return recipe;
        } else newMissing.unshift(recipe);
      });
      if (payload.length === 0) newMissing = [];
      return {
        ...state,
        recipes: {
          perfect_match: newPerfect,
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
