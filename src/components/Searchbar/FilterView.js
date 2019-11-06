import React, { Component } from "react";
import Modal from "react-responsive-modal";
import filterIcon from "../../assets/filter.png";
import { connect } from "react-redux";

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
        return <option value={cuisine.id}>{cuisine.name}</option>;
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
            style={{
              backgroundColor: "transparent",
              height: "30px",
              width: "27px"
            }}
          />
        </button>

        <Modal
          open={open}
          onClose={this.onCloseModal}
          styles={{ modal: {}, overlay: { background: "transparent" } }}
        >
          <div
            style={{
              width: "550px",
              paddingTop: "20px",
              backgroundColor: "black"
            }}
          >
            <h3 style={{ color: "gray", paddingLeft: "160px" }}>
              Filter Options
            </h3>

            <hr />

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
                <div style={{ paddingLeft: "40px" }}>
                  <select name="meal" onChange={this.handleChange} multiple>
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
                <div style={{ paddingLeft: "40px" }}>
                  <select name="course" onChange={this.handleChange} multiple>
                    {cuisineOptions}
                  </select>
                </div>
              </div>

              <div className="row" style={{ paddingLeft: "40px" }}>
                <h5 style={{ color: "white", paddingBottom: "15px" }}>
                  Cuisine
                </h5>
                <div style={{ paddingLeft: "40px" }}>
                  <select name="cuisine" onChange={this.handleChange}>
                    <option>Select a value</option>
                    {cuisineOptions}
                  </select>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="submit"
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
    loadingCuisines: state.rootCuisines.loading,
    cuisines: state.rootCuisines.cuisines
  };
};

export default connect(mapStateToProps)(FilterView);