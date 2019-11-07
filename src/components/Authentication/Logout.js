import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import { logout } from "../../redux/actions/authentication";

class Logout extends Component {
  render() {
    const logout = () => {
      return (
        <span
          id="nav-link"
          onClick={this.props.logout}
          className="nav-link nav"
          style={{ cursor: "pointer" }}
        >
          Logout
        </span>
      );
    };

    const login = () => {
      return (
        <Link to="/login">
          <button id="login" className="btn btn-primary">
            Login
          </button>
        </Link>
      );
    };

    return <>{this.props.user ? logout() : login()}</>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
