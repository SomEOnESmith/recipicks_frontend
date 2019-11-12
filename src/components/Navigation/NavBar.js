import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AuthButton from "./AuthButton";

//Assets
import icon from "../../assets/paniconrecipicks.png";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Recipicks
      </Link>
      <button
        className="navbar-toggler custom-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <AuthButton />
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default connect(mapStateToProps)(NavBar);
