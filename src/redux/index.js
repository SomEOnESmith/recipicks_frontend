import { createStore, compose, applyMiddleware } from "redux";
import { fetchRecipes, checkForExpiredToken } from "./actions";
import reducer from "./reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(fetchRecipes());
store.dispatch(checkForExpiredToken());


export default store;
