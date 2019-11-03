import { createStore, compose, applyMiddleware } from "redux";
import { fetchIngredients, fetchRecipes, checkForExpiredToken } from "./actions";
import reducer from "./reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(checkForExpiredToken());
store.dispatch(fetchRecipes());
store.dispatch(fetchIngredients());

export default store;
