import { combineReducers } from "redux";

// Reducers
import recipesReducer from "./recipes";
import recipeReducer from "./recipe";

const rootReducer = combineReducers({
  rootRecipes: recipesReducer,
  rootRecipe: recipeReducer
});
export default rootReducer;
