import React from "react";

// Components
import SearchBar from "./SearchBar";
import RecipesList from "../ListPage/RecipesList";

const HomePage = () => {
  return (
    <div className="main">
      <section className="header">
        <div className="header-container">
          <div className="row">
            <div className="col">
              <div className="typewriter">
                <h1
                  style={{
                    color: "white"
                  }}
                >
                  Find a Recipe
                </h1>
              </div>
            </div>
          </div>
          <div className="container">
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
