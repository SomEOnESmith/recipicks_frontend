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
    this.randomIngredients(this.filterIngredients());
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
        console.log("TCL: SearchBar -> newItems", newItems);

        await this.setState({
          items: newItems,
          value: ""
        });

        this.randomIngredients(this.filterIngredients());
      }
    }
  };

  handleAdd = async item => {
    if (this.isValid(item.name)) {
      await this.setState({
        items: this.state.items.concat(item)
      });
      if (!this.state.value) this.randomIngredients(this.filterIngredients());
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
    const suggest = this.filterIngredients().filter(ingredient => {
      if (ingredient.name.includes(evt.target.value)) {
        counter = counter + 1;
        if (counter <= 10) return ingredient;
        return false;
      }
      return false;
    });

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
      <>
        {this.state.suggestedItems.map((suggestItem, idx) => (
          <div className="suggest-list" key={idx}>
            <button
              type="button"
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
        {this.state.items.map((item, idx) => (
          <div className="tag-item" key={idx}>
            {item.name}
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
