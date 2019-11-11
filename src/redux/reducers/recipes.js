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
      let newMissing = state.recipes.perfect_match;
      let newExcess = state.recipes.user_excess_ingrs.filter(recipe => {
        if (
          recipe.ingredients.every(ingredient => payload.includes(ingredient))
        ) {
          if (recipe.ingredients.length === payload.length) {
            newPerfect.push(recipe);
            console.log("TCL: reducer -> newPerfect", newPerfect);
          } else if (recipe.ingredients.length > payload.length) {
            newMissing.push(recipe);
            console.log("TCL: reducer -> newMissing", newMissing);
          } else return recipe;
        } else {
          newMissing.push(recipe);
        }
      });
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
