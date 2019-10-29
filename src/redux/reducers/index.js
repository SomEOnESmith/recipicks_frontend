import { combineReducers } from "redux";
import recipesReducer from "./recipes";
import recipeReducer from "./recipe";
import authReducer from "./authentication";
import errorReducer from "./errors";

const rootReducer = combineReducers({
  authReducer: authReducer,
  errors: errorReducer,
  rootRecipes: recipesReducer,
  rootRecipe: recipeReducer,
});

export default rootReducer;
