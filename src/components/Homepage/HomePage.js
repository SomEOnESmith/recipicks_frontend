import React from "react";
import SearchBar from "../Searchbar/SearchBar";
import RecipesList from "../RecipesList";

const HomePage = () => {
  return (
    <div className="main">
      <section className="header">
        <div className="header-container">
          <div class="typewriter">
            <h1
              style={{
                color: "white"
              }}
            >
              Find a Recipe
            </h1>
          </div>
          <div className="search">
            <SearchBar />
          </div>
        </div>
      </section>
      <section className="the-list">
      <RecipesList />
      </section>
    </div>
  );
};

export default HomePage;
