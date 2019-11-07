import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";

// Images
import filterIcon from "../../assets/modernFilter.png";

class FilterView extends Component {
  state = {
    open: false,
    cuisine: "",
    meal: [],
    course: []
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  toggleModal = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = () => {
    // Do something
  };

  render() {
    const { open } = this.state;
    const { cuisines } = this.props;
    let cuisineOptions;
    if (this.props.loadingCuisines === false) {
      cuisineOptions = cuisines.map(cuisine => {
        return (
          <option value={cuisine.id} key={cuisine.id}>
            {cuisine.name}
          </option>
        );
      });
    }

    return (
      <div>
        <button
          onClick={this.toggleModal}
          style={{ backgroundColor: "transparent", borderColor: "transparent" }}
        >
          <img
            src={filterIcon}
            alt=""
            style={{
              backgroundColor: "transparent",
              height: "35px"
            }}
          />
        </button>

        <Modal
          open={open}
          onClose={this.onCloseModal}
          styles={{
            modal: {},
            overlay: { background: "rgba(15, 15, 15, 0.88)" }
          }}
        >
          <div
            style={{
              width: "550px",
              paddingTop: "20px",
              backgroundColor: "black"
            }}
          >
            <h3 style={{ color: "white", paddingLeft: "190px" }}>
              Filter Options
            </h3>

            <hr id="line-color" />

            <form onSubmit={this.handleSubmit}>
              <div className="row" style={{ paddingLeft: "20px" }}>
                <h5
                  style={{
                    color: "white",
                    paddingLeft: "25px",
                    paddingBottom: "15px"
                  }}
                >
                  Meal
                </h5>
                <div style={{ paddingLeft: "60px", paddingBottom: "20px" }}>
                  <select
                    style={{
                      backgroundColor: "rgb(196, 196, 196)",
                      color: "black"
                    }}
                    class="form-control"
                    id="exampleFormControlSelect1"
                    id="mealBox"
                    name="meal"
                    onChange={this.handleChange}
                    multiple
                  >
                    {cuisineOptions}
                  </select>
                </div>
              </div>

              <div className="row" style={{ paddingLeft: "20px" }}>
                <h5
                  style={{
                    color: "white",
                    paddingLeft: "25px",
                    paddingBottom: "15px"
                  }}
                >
                  Course
                </h5>
                <div style={{ paddingLeft: "42px", paddingBottom: "20px" }}>
                  <select
                    style={{
                      backgroundColor: "rgb(196, 196, 196)",
                      color: "black"
                    }}
                    class="form-control"
                    id="exampleFormControlSelect1"
                    id="courseBox"
                    name="course"
                    onChange={this.handleChange}
                    multiple
                  >
                    {cuisineOptions}
                  </select>
                </div>
              </div>

              <div className="row" style={{ paddingLeft: "40px" }}>
                <h5 style={{ color: "white", paddingBottom: "15px" }}>
                  Cuisine
                </h5>
                <div style={{ paddingLeft: "42px" }}>
                  <select
                    style={{
                      backgroundColor: "rgb(196, 196, 196)",
                      color: "black"
                    }}
                    className="form-control"
                    id="cuisineBox"
                    name="cuisine"
                    onChange={this.handleChange}
                  >
                    <option>Select a value</option>
                    {cuisineOptions}
                  </select>
                  <br />

                  <input
                    className="btn btn-block"
                    type="submit"
                    value="submit"
                    id="btn-fliter"
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingCuisines: state.rootFilters.loading,
    cuisines: state.rootFilters.cuisines
  };
};

export default connect(mapStateToProps)(FilterView);
