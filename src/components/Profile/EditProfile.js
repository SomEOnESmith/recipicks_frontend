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
        <div
          id="update-profile"
          className="card col-6 mx-auto p-0"
          style={{ marginTop: "10%" }}
        >
          <form id="update-profile" onSubmit={this.submitHandler}>
            {!!errors.length && (
              <div className="alert alert-danger" role="alert">
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}

            <p>
              <b>First Name: </b> {profile.user.first_name}
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
              <b>Last Name: </b>
              {profile.user.last_name}
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
              <b>Email: </b> {profile.user.email}
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
              <b>Phone: </b> {profile.user.phone}
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
              <label for="exampleFormControlSelect1">Gender:</label>
              <select
                name="gender"
                onChange={this.changeHandler}
                class="form-control"
                id="exampleFormControlSelect1"
              >
                <option>choose gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <br />
            <p>
              <b>Date of Birth: </b>
              {profile.date_of_birth}
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
              className="btn btn-primary btn-block"
              type="submit"
              value="Update Profile"
            />
          </form>
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
