import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Components
import RecipeDetail from "./components/DetailPage/RecipeDetail";
import LoginForm from "./components/Authentication/LoginForm";
import SignupForm from "./components/Authentication/SignupForm";
import NavBar from "./components/Navigation/NavBar";
import Home from "./components/Homepage/HomePage";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import Loading from "./components/Loading";
import AddRecipe from "./components/CreateRecipe/AddRecipe";

function App({ loading }) {
  if (loading) return <Loading />;
  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route exact path="/recipes/:recipeID" component={RecipeDetail} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/profile" component={Profile} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="/home" component={Home} />
        <Route path="/recipe/create/" component={AddRecipe} />
        <Redirect exact from="/" to="/home" />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.rootFilters.loading
  };
};

export default withRouter(connect(mapStateToProps)(App));
