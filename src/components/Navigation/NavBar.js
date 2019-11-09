import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AuthButton from "./AuthButton";

const NavBar = () => {
  return (
    <nav id="navbar" className="navbar navbar-expand-lg ">
      <Link
        style={{
          textDecoration: "none"
        }}
        className="logo-text"
        to="/"
      >
        <div className="row">
          <h3
            id="logo-text-2"
            style={{
              textDecoration: "none",
              paddingLeft: "10px",
              paddingTop: "5px",
              color: "red"
            }}
          >
            Recipicks
          </h3>
        </div>
      </Link>

      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* add if user  */}
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
      <AuthButton />
    </nav>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default connect(mapStateToProps)(NavBar);
