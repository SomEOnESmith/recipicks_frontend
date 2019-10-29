import React, { Component } from "react";
// import ReactTags from "react-tag-autocomplete";
import { MDCChipSet } from "@material/chips";

class SearchBar extends Component {
   state = {
     tags: [],
     suggestions: [
       { id: 1, name: "Apples" },
       { id: 2, name: "Pears" },
       { id: 3, name: "Bananas" },
       { id: 4, name: "Mangos" },
       { id: 5, name: "Lemons" },
       { id: 6, name: "Apricots" }
     ]
   };

  handleDelete = i => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  };

  handleAddition = tag => {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  };

  render() {
    return (
      <div className="mt-5 ml-5">
        <ReactTags
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          className="btn"
          placeholder="Input your ingredients bro"
          autoresize={false}
        />
      </div>
    );
  }
}

export default SearchBar;
