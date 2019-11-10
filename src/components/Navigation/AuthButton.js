import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import Logout from "../Authentication/Logout";

const AuthButton = ({ user, profile }) => {
  let buttons = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Register
        </Link>
      </li>
    </>
  );
  if ((user, profile)) {
    buttons = (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            {profile.user.username}'s Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/recipe/create">
            Add a Recipe
          </Link>
        </li>
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
