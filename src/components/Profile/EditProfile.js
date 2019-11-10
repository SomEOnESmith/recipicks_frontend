import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Components
import Loading from "../Loading";

// Actions
import { editProfile, resetErrors } from "../../redux/actions";

class EditProfile extends Component {
  state = {
    username: this.props.profile.user.username,
    first_name: "",
    last_name: "",
    email: "",
    phone: null,
    gender: null,
    date_of_birth: null,
    image: null,
    liked_recipes: null,
    disliked_recipes: null
  };

  componentDidMount() {
    if (this.props.user) {
      const profile = this.props.profile;
      this.setState({
        first_name: profile.user.first_name,
        last_name: profile.user.last_name,
        email: profile.user.email,
        phone: profile.phone,
        gender: profile.gender,
        date_of_birth: profile.date_of_birth,
        image: profile.image,
        liked_recipes: profile.liked_recipes,
        disliked_recipes: profile.disliked_recipes
      });
    }
  }

  submitHandler = e => {
    e.preventDefault();

    this.props.editProfile(this.state, this.props.history);
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const profile = this.props.profile;
    const user = this.props.user;
    const errors = this.props.errors;
    const loading = this.props.profileLoading;

    if (!user) return <Redirect to="/" />;

    if (loading) {
      return <Loading />;
    } else {
      return (
        <div className="main">
          <section className="header-edit-profile">
            <div className="header-container">
              <div
                className="card col-lg-10 col-md-10 col-sm-12 col-xs-12 mx-auto p-3  jumbotron profile"
                style={{ marginTop: "10%" }}
              >
                <section id="overlay" className="single-section">
                  <h1
                    className="mt-5 profile-head"
                    style={{
                      textAlign: "center",
                      color: "rgb(208, 6, 53)"
                    }}
                  >
                    Update Profile
                  </h1>
                </section>

                <form id="update-profile" onSubmit={this.submitHandler}>
                  {!!errors.length && (
                    <div className="alert alert-danger" role="alert">
                      {errors.map(error => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  )}

                  <p>
                    <b style={{ color: "rgb(208, 6, 53)" }}> First Name: </b>
                    <span style={{ color: "black" }}>
                      {" "}
                      {profile.user.first_name}
                    </span>
                  </p>
                  <input
                    className="form-control rounded-pill"
                    placeholder={profile.user.first_name}
                    onChange={this.changeHandler}
                    name="first_name"
                    value={this.state.first_name}
                  />
                  <br />
                  <p>
                    <b style={{ color: "rgb(208, 6, 53)" }}>Last Name: </b>
                    <span style={{ color: "black" }}>
                      {profile.user.last_name}
                    </span>
                  </p>
                  <input
                    className="form-control rounded-pill"
                    placeholder={profile.user.last_name}
                    onChange={this.changeHandler}
                    name="last_name"
                    value={this.state.last_name}
                  />
                  <br />
                  <p>
                    <b style={{ color: "rgb(208, 6, 53)" }}>Email: </b>
                    <span style={{ color: "black" }}>{profile.user.email}</span>
                  </p>
                  <input
                    className="form-control rounded-pill"
                    placeholder={profile.user.email}
                    onChange={this.changeHandler}
                    name="email"
                    type="email"
                    value={this.state.email}
                  />
                  <br />
                  <p>
                    <b style={{ color: "rgb(208, 6, 53)" }}>Phone: </b>
                    <span
                      style={{ color: "black" }}>{profile.user.phone}</span>
                  </p>
                  <input
                    className="form-control rounded-pill"
                    placeholder={profile.phone}
                    onChange={this.changeHandler}
                    name="phone"
                    type="phone"
                    value={this.state.phone}
                  />
                  <br />
                  <div class="form-group rounded-pill">
                    <label
                      style={{ color: "rgb(208, 6, 53)", fontWeight: "bold" }}
                      for="exampleFormControlSelect1"
                    >
                      Gender:
                    </label>
                    <select
                      name="gender"
                      onChange={this.changeHandler}
                      class="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option>choose a gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                
                  <p>
                    <b style={{ color: "rgb(208, 6, 53)" }}>Date of Birth: </b>
                    <span
                      style={{ color: "black" }}>{profile.date_of_birth}</span>
                  </p>
                  <input
                    className="form-control rounded-pill"
                    placeholder={profile.user.date_of_birth}
                    onChange={this.changeHandler}
                    name="age"
                    value={this.state.date_of_birth}
                  />
                  <br />

                  <input
                    id="registerbtn"
                    className="btn rounded-pill btn-block btn-danger"
                    type="submit"
                    value="Update Profile"
                  />
                </form>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  errors: state.errors.errors,
  profile: state.authReducer.profile,
  profileLoading: state.authReducer.profileLoading
});

const mapDispatchToProps = dispatch => {
  return {
    editProfile: (userDate, history) =>
      dispatch(editProfile(userDate, history)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
