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
      let newExcess = [];
      let newMissing = state.recipes.perfect_match.map(recipe => recipe);
      console.log("TCL: reducer -> newMissing", newMissing);

      newExcess = state.recipes.user_excess_ingrs.filter(recipe => {
        if (recipe.ingredients.includes(action.payload.id))
          newMissing.push(action.payload);
        else return recipe;
      });

      console.log("TCL: reducer -> newExcess", newExcess);

      return {
        ...state,
        recipes: {
          perfect_match: [],
          user_excess_ingrs: newExcess,
          user_missing_ingrs: newMissing
        }
      };
    default:
      return state;
  }
};

export default reducer;
