import React from "react";
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
          <div className="row">
            <div className="col">
              <div className="search">
                <SearchBar />
              </div>
            </div>
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
