import { combineReducers } from "redux";
import recipesReducer from "./recipes";
import recipeReducer from "./recipe";
import authReducer from "./authentication";
import errorReducer from "./errors";
import ingredientsReducer from "./ingredients";
import cuisinesReducer from "./cuisines";

const rootReducer = combineReducers({
  authReducer: authReducer,
  errors: errorReducer,
  rootRecipes: recipesReducer,
  rootRecipe: recipeReducer,
  rootIngredients: ingredientsReducer,
  rootCuisines: cuisinesReducer,
});

export default rootReducer;
