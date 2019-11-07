import { combineReducers } from "redux";
import recipesReducer from "./recipes";
import authReducer from "./authentication";
import errorReducer from "./errors";
import filtersReducer from "./filters";

const rootReducer = combineReducers({
  authReducer: authReducer,
  errors: errorReducer,
  rootRecipes: recipesReducer,
  rootFilters: filtersReducer
});

export default rootReducer;
