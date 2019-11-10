import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import { signup, resetErrors } from "../../redux/actions";

class SignupForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  submitHandler = e => {
    e.preventDefault();

    this.props.signup(this.state, this.props.history);
  };

  render() {
    if (this.props.user) return <Redirect to="/" />;

    const errors = this.props.errors;

    return (
      <div className="main">
        <section className="header-profile">
          <div className="header-container">
            <div
              id="loginCard"
              style={{ postion: "relative", top: 100 }}
              className="card col-lg-7 col-md-7 col-sm-12 col-xs-12 mx-auto p-3  jumbotron  "
            >
              <div className="card-body">
                <h5 className="card-title mb-4">Register</h5>
                <form onSubmit={this.submitHandler}>
                  {!!errors.length && (
                    <div className="alert alert-danger" role="alert">
                      {errors.map(error => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}

                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <input
                    id="registerbtn"
                    className="btn rounded-pill btn-block btn-danger"
                    type="submit"
                    value="Signup"
                  />
                </form>
              </div>
              <div className="card-footer">
                <Link
                  id="nav-link-auth"
                  to="/login"
                  className="btn btn-small btn-link"
                >
                  <span className="create-account">
                    I'm already registered!
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors.errors,
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (userData, history) => dispatch(signup(userData, history)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
