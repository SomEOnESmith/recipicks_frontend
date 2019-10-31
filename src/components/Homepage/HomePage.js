import React from "react";
import SearchBar from "../Searchbar/SearchBar";
import List from "../RecipesList";

const HomePage = () => {
  return (
    <div className="mx-5 mt-4">
      <SearchBar />
      <List />
    </div>
  );
};

export default HomePage;
