import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { logout } from "../../redux/actions/authentication";

class Logout extends Component {
  render() {
    const logout = () => {
      return (
        <>
          <span
            onClick={this.props.logout}
            className="nav-link"
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </>
      );
    };

    return <>{logout()}</>;
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
