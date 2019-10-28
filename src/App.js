import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Components
import RecipesList from "./components/RecipesList";
import RecipeDetail from "./components/RecipeDetail";
import Loading from "./components/Loading";

function App({ loading }) {
  const getView = () => {
    if (loading) return <Loading />;
    return (
      <Switch>
        <Route exact path="/recipes/:recipeID" component={RecipeDetail} />
        <Route path="/recipes" component={RecipesList} />
        <Redirect exact from="/" to="/recipes" />
      </Switch>
    );
  };
  return (
    <div>
      <div>{getView()}</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.rootRecipes.loading
  };
};

export default withRouter(connect(mapStateToProps)(App));
