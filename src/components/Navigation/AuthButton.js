import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "../Logout/Logout";

const AuthButton = ({ user }) => {
  let buttons = [
    <li key="loginButton" className="nav-item">
      <Link id="nav-link" to="/login" className="nav-link nav">
        Login
      </Link>
    </li>,
    <li key="signupButton" className="nav-item">
      <Link id="nav-link" to="/signup" className="nav-link nav">
        Signup
      </Link>
    </li>
  ];

  if ((user)) {
    buttons = (
      <>
        <li id="nav-link" key="profileButton" className="nav-item">
          {/* fix the link to the profile once the profile feature is added */}
          <Link id="nav-link" to="#" className="nav-link nav">

            {user.username}'s Profile

          </Link>
          <Logout />
        </li>
      </>
    );
  }

  return <ul className="navbar-nav ml-auto">{buttons}</ul>;
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps)(AuthButton);
