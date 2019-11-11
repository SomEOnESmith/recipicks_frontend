import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";

// Components
import FilterButton from "./FilterModal";

//Assets
import searchIcon from "../../assets/search.png";

// Actions
import { fetchRecipes } from "../../redux/actions";
import { deleteIngredient } from "../../redux/actions";

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

  handleKeyDown = async event => {
    if (["Enter", "Tab", ","].includes(event.key)) {
      event.preventDefault();
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
        const { cuisine, meals, courses } = this.props;
        this.props.fetchRecipes(cuisine, meals, courses, this.state.itemsID);
      }
    }
  };

  handleAdd = async item => {
    if (this.isValid(item.name)) {
      await this.setState({
        items: this.state.items.concat(item),
        itemsID: this.state.itemsID.concat(item.id)
      });
      const { cuisine, meals, courses } = this.props;
      this.props.fetchRecipes(cuisine, meals, courses, this.state.itemsID);
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

  handleChange = async event => {
    const { ingredients } = this.props;
    const fuse = new Fuse(ingredients, fuseOptions);
    const suggest = event.target.value
      ? fuse.search(event.target.value).slice(0, 10)
      : this.randomIngredients(this.filterIngredients());

    await this.setState({
      value: event.target.value.toLowerCase(),
      suggestedItems: suggest,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item),
      itemsID: this.state.itemsID.filter(i => i !== item.id)
    });
    this.props.deleteIngredient(item);
  };

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
      <>
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
        <div className="row">
          <FilterButton />
          <input
            className={"input " + (this.state.error && " has-error")}
            value={this.state.value}
            placeholder='Type ingredients and press "Enter"...'
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            id="serach-input"
            style={{
              backgroundColor: "white",
              borderColor: "transparent"
            }}
          />

          <div
            style={{
              paddingTop: "17px"
            }}
          >
            <button
              id="suggest_btn"
              style={{
                backgroundColor: "#D00635",
                borderColor: "transparent",
                padding: 10
              }}
              onClick={() => {
                const { cuisine, meals, courses } = this.props;
                this.props.fetchRecipes(
                  cuisine,
                  meals,
                  courses,
                  this.state.itemsID
                );
              }}
            >
              <img
                src={searchIcon}
                style={{
                  backgroundColor: "transparent",
                  height: "23px"
                }}
                alt=""
              />
            </button>
          </div>
        </div>
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
      </>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.rootFilters.ingredients,
  cuisine: state.rootFilters.selectedFilters.cuisine,
  meals: state.rootFilters.selectedFilters.meals,
  courses: state.rootFilters.selectedFilters.courses
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: (cuisine, meals, courses, ingredients) => {
    dispatch(fetchRecipes(cuisine, meals, courses, ingredients));
  },
  deleteIngredient: ingredient => dispatch(deleteIngredient(ingredient))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
