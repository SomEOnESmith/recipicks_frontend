import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Components
import RecipesList from "./Components/RecipesList";
import RecipeDetail from "./Components/RecipeDetail";
import LoginForm from "./Components/Login/LoginForm";
import SignupForm from "./Components/Signup/SignupForm";
import NavBar from "./Components/Navigation/NavBar";
import Home from "./Components/homepage/HomePage";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import Loading from "./Components/Loading";

function App({ loading }) {
  const getView = () => {
    if (loading) return <Loading />;
    return (
      <Switch>
        <Route exact path="/recipes/:recipeID" component={RecipeDetail} />
        <Route path="/recipes" component={RecipesList} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/profile" component={Profile} />
        <Route path="/edit-profile" component={EditProfile} />
        <Route path="/home" component={Home} />
        <Redirect exact from="/" to="/recipes" />
      </Switch>
    );
  };
  return (
    <div>
      <div>{getView()}</div>
      <NavBar />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.rootRecipes.loading
  };
};

export default withRouter(connect(mapStateToProps)(App));
