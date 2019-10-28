import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// Components
import LoginForm from "./Components/Login/LoginForm";
import SignupForm from "./Components/Signup/SignupForm";
import NavBar from "./Components/Navigation/NavBar";
import Home from "./Components/homepage/HomePage";

function App() {
  const getView = () => {
    return (
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/home" component={Home} />
        <Redirect exact from="/" to="/home" />
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


export default withRouter((App));
