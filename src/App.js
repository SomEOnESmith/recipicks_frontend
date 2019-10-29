import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Components
import RecipesList from "./components/RecipesList";
import RecipeDetail from "./components/RecipeDetail";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Signup/SignupForm";
import NavBar from "./components/Navigation/NavBar";
import Home from "./components/Homepage/HomePage";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import Loading from "./components/Loading";

function App({ loading }) {
  if (loading) return <Loading />;
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/recipes/:recipeID" component={RecipeDetail} />
        <Route path="/recipes" component={RecipesList} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/profile" component={Profile} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="/home" component={Home} />
        <Redirect exact from="/" to="/home" />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.rootRecipes.loading
  };
};

export default withRouter(connect(mapStateToProps)(App));
