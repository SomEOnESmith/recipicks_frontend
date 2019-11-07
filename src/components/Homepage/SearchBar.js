import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";

// Components
import FilterButton from "./FilterModal";

//Assets
import searchIcon from "../../assets/search.png";

// Actions
import { fetchRecipes } from "../../redux/actions";
import { handleDeleteIngredients } from "../../redux/actions";

const fuseOptions = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 50,
  maxPatternLength: 12,
  minMatchCharLength: 3,
  keys: ["name"]
};

class SearchBar extends Component {
  state = {
    items: [],
    value: "",
    suggestedItems: [],
    error: null,
    itemsID: []
  };

  componentDidMount() {
    const newSuggestedItems = this.randomIngredients(this.filterIngredients());
    this.setState({ suggestedItems: newSuggestedItems });
  }

  handleKeyDown = async evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      let value = this.state.value.trim();

      if (value && this.isValid(value)) {
        const theItem = this.props.ingredients.find(
          ingredient => ingredient.name === value
        );
        const newItems = this.state.items.concat(theItem);
        await this.setState({
          items: newItems,
          itemsID: newItems.map(i => i.id),
          value: ""
        });
        const newSuggestedItems = this.randomIngredients(
          this.filterIngredients()
        );
        this.setState({ suggestedItems: newSuggestedItems });
        this.props.fetch(this.state.itemsID);
      }
    }
  };

  handleAdd = async item => {
    if (this.isValid(item.name)) {
      await this.setState({
        items: this.state.items.concat(item),
        itemsID: this.state.itemsID.concat(item.id)
      });
      this.props.fetch(this.state.itemsID);
      if (!this.state.value) {
        const newSuggestedItems = this.randomIngredients(
          this.filterIngredients()
        );
        this.setState({ suggestedItems: newSuggestedItems });
      }
      if (this.state.value) {
        const newSuggestedItems = this.state.suggestedItems.filter(
          ingredient => !this.state.items.includes(ingredient)
        );
        this.setState({ suggestedItems: newSuggestedItems });
      }
    }
  };

  filterIngredients = () => {
    return this.props.ingredients.filter(
      ingredient => !this.state.items.includes(ingredient)
    );
  };

  randomIngredients = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      if (currentIndex === 9) break;
    }
    return array.slice(0, 10);
  };

  handleChange = async evt => {
    const { ingredients } = this.props;
    const fuse = new Fuse(ingredients, fuseOptions);
    const suggest = evt.target.value
      ? fuse.search(evt.target.value).slice(0, 10)
      : this.randomIngredients(this.filterIngredients());

    await this.setState({
      value: evt.target.value,
      suggestedItems: suggest,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item),
      itemsID: this.state.itemsID.filter(i => i !== item.id)
    });
    this.props.handleDeleteIngredients(item);
  };

  // handlePaste = evt => {
  //   evt.preventDefault();

  //   let paste = evt.clipboardData.getData("text");
  //   // let ingredients = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

  //   if (ingredients) {
  //     let toBeAdded = ingredients.filter(ingredient => !this.isInList(ingredient));

  //     this.setState({
  //       items: [...this.state.items, ...toBeAdded]
  //     });
  //   }
  // };

  isValid(ingredient) {
    let error = null;

    if (this.isInList(ingredient)) {
      error = `${ingredient} has already been added.`;
    }
    if (!this.isInIngredients(ingredient)) {
      error = `${ingredient} is not an ingredient.`;
    }
    if (error) {
      this.setState({ error });
      return false;
    }
    return true;
  }

  isInList(ingredient) {
    return this.state.items
      .map(item => item.name)
      .includes(ingredient.toLowerCase());
  }

  isInIngredients(ingredient) {
    return this.props.ingredients
      .map(ing => ing.name.toLowerCase())
      .includes(ingredient.toLowerCase());
  }

  render() {
    return (
      <div>
        {this.state.suggestedItems.map((suggestItem, idx) => (
          <div className="suggest-list" key={idx}>
            <button
              type="button"
              id="suggest_item"
              className="button suggestion-item"
              onClick={() => this.handleAdd(suggestItem)}
            >
              {suggestItem.name}
            </button>
          </div>
        ))}
        <div
          className="row"
          style={{
            backgroundColor: "#D00635",
            borderRadius: "35px",
            height: "70px",
            paddingBottom: "5px"
          }}
        >
          <div
            className="col-2"
            style={{ paddingTop: "18px", paddingLeft: "30px", height: "50px" }}
          >
            <FilterButton />
          </div>
          <div className="col-8">
            <input
              className={"input " + (this.state.error && " has-error")}
              value={this.state.value}
              placeholder="Type or paste ingredients and press 'Enter'..."
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              style={{
                borderRadius: "25px",
                backgroundColor: "white",
                borderColor: "transparent",
                width: "840px",
                position: "relative",
                left: "-100px"
              }}
            />
          </div>

          <div
            className="col-2"
            style={{
              paddingTop: "17px",
              height: "50px",
              width: "50px",
              position: "relative",
              left: "80px"
            }}
          >
            <button
              id="suggest_btn"
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
              onClick={() => this.props.fetch(this.state.itemsID)}
            >
              <img
                src={searchIcon}
                style={{
                  backgroundColor: "transparent",
                  height: "30px"
                }}
                alt=""
              />
            </button>
          </div>
        </div>
        {/* This needs to be inside input onPaste="This needs to be a function" */}
        {this.state.items.map((item, idx) => (
          <div className="tag-item" key={idx}>
            {item.name}
            <button
              id="cancel"
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}

        {this.state.error && <p className="error">{this.state.error}</p>}
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.rootFilters.ingredients
});

const mapDispatchToProps = dispatch => ({
  fetch: ingredients => dispatch(fetchRecipes("", [], [], ingredients)),
  handleDeleteIngredients: ingredient =>
    dispatch(handleDeleteIngredients(ingredient))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
