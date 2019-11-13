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
          <div className="main">
            <section className="header-profile">
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
                      My Profile
                    </h1>
                  </section>

                  <p style={{ color: "black", paddingLeft: 10, fontSize: 15 }}>
                    <span
                      style={{ fontWeight: "bold", color: "rgb(208, 6, 53)" }}
                    >
                      Username:{" "}
                    </span>
                    {profile.user.username}
                  </p>

                  <p style={{ color: "black", paddingLeft: 10, fontSize: 15 }}>
                    <span
                      style={{ fontWeight: "bold", color: "rgb(208, 6, 53)" }}
                    >
                      First Name:{" "}
                    </span>
                    {profile.user.first_name}
                  </p>

                  <p style={{ color: "black", paddingLeft: 10, fontSize: 15 }}>
                    <span
                      style={{ fontWeight: "bold", color: "rgb(208, 6, 53)" }}
                    >
                      Last Name:{" "}
                    </span>
                    {profile.user.last_name}
                  </p>

                  <p style={{ color: "black", paddingLeft: 10, fontSize: 15 }}>
                    <span
                      style={{ fontWeight: "bold", color: "rgb(208, 6, 53)" }}
                    >
                      Email:{" "}
                    </span>
                    {profile.user.email}
                  </p>

                  <p style={{ color: "black", paddingLeft: 10, fontSize: 15 }}>
                    <span
                      style={{ fontWeight: "bold", color: "rgb(208, 6, 53)" }}
                    >
                      Birthdate:{" "}
                    </span>
                    {profile.date_of_birth}
                  </p>

                  <p style={{ color: "black", paddingLeft: 10, fontSize: 15 }}>
                    <span
                      style={{ fontWeight: "bold", color: "rgb(208, 6, 53)" }}
                    >
                      Gender:{" "}
                    </span>
                    {profile.gender}
                  </p>

                  <p style={{ color: "black", paddingLeft: 10, fontSize: 15 }}>
                    <span
                      style={{ fontWeight: "bold", color: "rgb(208, 6, 53)" }}
                    >
                      Phone Number:{" "}
                    </span>
                    {profile.phone}
                  </p>

                  <Link id="edit" style={{ padding: 20 }} to="/edit-profile">
                    <button className="btn rounded-pill btn-block btn-danger">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </section>
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
