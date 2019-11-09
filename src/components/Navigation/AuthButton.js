import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import Logout from "../Authentication/Logout";

const AuthButton = ({ user, profile }) => {
  let buttons = [
    <li key="loginButton" className="nav-item">
      <Link
        style={{
          color: "black"
        }}
        id="nav-link"
        to="/login"
        className="nav-link nav"
      >
        Login
      </Link>
    </li>,
    <li key="signupButton" className="nav-item">
      <Link
        style={{
          color: "black"
        }}
        id="nav-link"
        to="/signup"
        className="nav-link nav"
      >
        Signup
      </Link>
    </li>
  ];

  if ((user, profile)) {
    buttons = (
      <>
        <Link
          style={{
            color: "black"
          }}
          id="nav-link"
          to="/recipe/create/"
          className="nav-link nav"
        >
          Add Recipe
        </Link>

        <Link id="nav-link" to="/profile" className="nav-link nav">
          {profile.user.username}'s Profile
        </Link>
        <Logout />
      </>
    );
  }

  return <ul className="navbar-nav ml-auto">{buttons}</ul>;
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  profile: state.authReducer.profile
});

export default connect(mapStateToProps)(AuthButton);
