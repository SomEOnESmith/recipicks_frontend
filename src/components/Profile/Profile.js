import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// Components
import Loading from "../Loading";

class Profile extends Component {
  render() {
    const user = this.props.user;
    const profile = this.props.profile;
    const loading = this.props.profileLoading;

    if (!user) return <Redirect to="/" />;

    if (user) {
      if (loading) {
        return <Loading />;
      } else {
        return (
          <div className="card col-6 mx-auto p-0" style={{ marginTop: "10%" }}>
            <section id="overlay" className="single-section">
              <h1 id="my-cart" className="mt-5" style={{ fontSize: "3em" }}>
                My Profile
              </h1>
            </section>
            <div className="jumbotron">
              <p> Username: {profile.user.username}</p>
              <p> First Name: {profile.user.first_name} </p>
              <p> Last Name: {profile.user.last_name} </p>
              <p> Email: {profile.user.email} </p>
              <p> Birthdate: {profile.date_of_birth} </p>
              <p> Gender: {profile.gender} </p>
              <p> Phone: {profile.phone} </p>
            </div>

            <br />
            <Link to="/edit-profile">
              <button className="btn rounded-pill btn-outline-secondary">
                Edit Profile
              </button>
            </Link>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  profile: state.authReducer.profile,
  profileLoading: state.authReducer.profileLoading
});

export default connect(mapStateToProps)(Profile);
