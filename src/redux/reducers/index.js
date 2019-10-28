import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";


const rootReducer = combineReducers({
  authReducer: authReducer,
  errors: errorReducer,
});
export default rootReducer;
