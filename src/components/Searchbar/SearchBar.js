import React, { Component } from "react";
import { connect } from "react-redux";

class SearchBar extends Component {
  state = {
    items: [],
    value: "",
    suggestedItems: [],
    error: null
  };

  componentDidMount() {
    this.randomIngredients();
  }

  handleKeyDown = async evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();
      if (value && this.isValid(value)) {
        const newItems = this.state.items.concat(this.state.value);
        await this.setState({
          items: newItems,
          value: ""
        });
        this.randomIngredients();
      }
    }
  };

  randomIngredients = () => {
    const array = this.props.ingredientsReducer.ingredients.filter(
      ingredient => !this.state.items.includes(ingredient.name)
    );
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      if (currentIndex === 9) break;
    }
    this.setState({ suggestedItems: array.slice(0, 10) });
  };

  handleChange = evt => {
    let counter = 0;
    const suggest = this.props.ingredientsReducer.ingredients.filter(
      ingredient => {
        if (ingredient.name.includes(evt.target.value)) {
          counter = counter + 1;
          if (counter <= 10) return ingredient;
          return false;
        }
        return false;
      }
    );

    this.setState({
      value: evt.target.value.toLowerCase(),
      suggestedItems: suggest,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

  // handleSuggestion = item => {
  //   let suggest =
  //   this.setState({
  //     suggestedItems:
  //   })
  // }

  // handlePaste = evt => {
  //   evt.preventDefault();

  //   var paste = evt.clipboardData.getData("text");
  //   // var ingredients = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

  //   if (ingredients) {
  //     var toBeAdded = ingredients.filter(ingredient => !this.isInList(ingredient));

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
    return this.state.items.includes(ingredient.toLowerCase());
  }

  isInIngredients(ingredient) {
    return this.props.ingredientsReducer.ingredients
      .map(ing => ing.name.toLowerCase())
      .includes(ingredient.toLowerCase());
  }

  render() {
    return (
      <>
        {this.state.suggestedItems.map((suggestItem, idx) => (
          <div className="suggest-list" key={idx}>
            <button type="button" className="button suggestion-item">
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
        {this.state.items.map(item => (
          <div className="tag-item" key={item}>
            {item}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}

        {this.state.error && <p className="error">{this.state.error}</p>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  ingredientsReducer: state.rootIngredients
});

export default connect(mapStateToProps)(SearchBar);
