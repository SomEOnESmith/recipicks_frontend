import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipes } from "../../redux/actions";
import Fuse from "fuse.js";

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
        const theItem = this.props.ingredientsReducer.ingredients.find(
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
      }
    }
  };

  handleAdd = async item => {
    if (this.isValid(item.name)) {
      await this.setState({
        items: this.state.items.concat(item),
        itemsID: this.state.itemsID.concat(item.id)
      });
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
    return this.props.ingredientsReducer.ingredients.filter(
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
    const { ingredients } = this.props.ingredientsReducer;
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
    return this.props.ingredientsReducer.ingredients
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

        <input
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Type or paste ingredients and press 'Enter'..."
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
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
        <button
          className="btn btn-info my-3 btn-block"
          id="suggest_btn"
          onClick={() => this.props.fetch(this.state.itemsID)}
        >
          Search
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredientsReducer: state.rootIngredients
});

const mapDispatchToProps = dispatch => ({
  fetch: ingredients => dispatch(fetchRecipes(ingredients))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
