import { combineReducers } from "redux";
import recipesReducer from "./recipes";
import recipeReducer from "./recipe";
import authReducer from "./authentication";
import errorReducer from "./errors";
import ingrediantsReducer from "./ingrediants";

const rootReducer = combineReducers({
  authReducer: authReducer,
  errors: errorReducer,
  rootRecipes: recipesReducer,
  rootRecipe: recipeReducer,
  rootIngrediants: ingrediantsReducer
});

export default rootReducer;
