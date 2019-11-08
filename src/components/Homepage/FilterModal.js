import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";

// Assets
import filterIcon from "../../assets/modernFilter.png";

// Actions
import { selectFilters } from "../../redux/actions";

class FilterModal extends Component {
  state = {
    open: false,
    cuisine: "",
    meals: [],
    courses: []
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = event => {
    this.handleSubmit(event);
    this.setState({ open: false });
  };

  toggleModal = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChange = event => {
    const { name } = event.target;
    const value = name === "cuisine" ? event.target.value : [];
    if (Array.isArray(value)) {
      Object.values(event.target.options).forEach(target => {
        if (target.selected) {
          value.push(+target.value);
        }
      });
    }
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { cuisine, meals, courses } = this.state;
    const filters = { cuisine: cuisine, meals: meals, courses: courses };
    this.props.selectFilters(filters);
    this.setState({ open: false });
  };

  handleClear = event => {
    event.preventDefault();
    this.setState({ cuisine: "", meals: [], courses: [] });
    this.handleSubmit(event);
  };

  handleOption = filter => {
    return filter.map(filter => {
      return (
        <option value={filter.id} key={filter.id}>
          {filter.name}
        </option>
      );
    });
  };

  render() {
    const { open } = this.state;
    const { meals, courses, cuisines } = this.props.filters;
    const mealOptions = this.handleOption(meals);
    const courseOptions = this.handleOption(courses);
    const cuisineOptions = this.handleOption(cuisines);

    return (
      <div>
        <button
          onClick={this.toggleModal}
          id="model-btn"
          style={{
            backgroundColor: "#D00635",
            borderColor: "transparent",
            padding: 7
          }}
        >
          <img
            src={filterIcon}
            alt=""
            style={{
              backgroundColor: "transparent",
              height: "28px"
            }}
          />
        </button>
        <Modal
          open={open}
          onClose={this.onCloseModal}
          // styles={{
          //   modal: {},
          //   overlay: { background: "rgba(15, 15, 15, 0.88)" }
          // }}
          center
        >
          <div
            style={{
              width: "550px",
              paddingTop: "20px",
              backgroundColor: "black"
            }}
          >
            <h3 className="text-center" style={{ color: "gray" }}>
              Filter Options
            </h3>
            <hr />
            <form className="pt-3 form-group">
              <div className="row" style={{ paddingLeft: "20px" }}>
                <h5
                  style={{
                    color: "white",
                    paddingLeft: "25px",
                    paddingBottom: "15px"
                  }}
                >
                  Meals
                </h5>
                <div style={{ paddingLeft: "67px" }}>
                  <select
                    className="form-control"
                    name="meals"
                    defaultValue={this.state.meals}
                    onChange={this.handleChange}
                    multiple
                  >
                    {mealOptions}
                  </select>
                </div>
              </div>
              <br />
              <div className="row" style={{ paddingLeft: "20px" }}>
                <h5
                  style={{
                    color: "white",
                    paddingLeft: "25px",
                    paddingBottom: "15px"
                  }}
                >
                  Courses
                </h5>
                <div style={{ paddingLeft: "40px" }}>
                  <select
                    className="form-control"
                    name="courses"
                    defaultValue={this.state.courses}
                    onChange={this.handleChange}
                    multiple
                  >
                    {courseOptions}
                  </select>
                </div>
              </div>
              <br />
              <div className="row" style={{ paddingLeft: "40px" }}>
                <div className="col">
                  <div className="row">
                    <h5 style={{ color: "white", paddingBottom: "15px" }}>
                      Cuisine
                    </h5>
                    <select
                      className="ml-4 form-control"
                      name="cuisine"
                      defaultValue={this.state.cuisine}
                      onChange={this.handleChange}
                      style={{ width: "60%" }}
                    >
                      <option>Select a cuisine</option>
                      {cuisineOptions}
                    </select>
                  </div>
                </div>

                <div className="col float-right text-right mr-5">
                  <button
                    className="btn btn-warning mr-2"
                    onClick={this.handleClear}
                  >
                    Clear Filters
                  </button>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Save"
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
              <br />
              <br />
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.rootFilters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectFilters: filters => dispatch(selectFilters(filters))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterModal);
