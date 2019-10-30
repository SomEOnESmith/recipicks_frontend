import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    items: [],
    value: "",
    error: null
  };

  handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ""
        });
      }
    }
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

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

    // if (!this.isIngredient(ingredient)) {
    //   error = `${ingredient} is not a valid ingredient.`;
    // }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(ingredient) {
    return this.state.items.includes(ingredient);
  }

  // isIngredient(ingredient) {
  //   return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(ingredient);
  // }

  render() {
    return (
      <>
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

        <input
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Type or paste ingredients and press `Enter`..."
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onPaste="This needs to be a function"
        />

        {this.state.error && <p className="error">{this.state.error}</p>}
      </>
    );
  }
}

export default SearchBar;