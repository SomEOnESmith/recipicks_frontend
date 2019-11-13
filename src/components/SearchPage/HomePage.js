import React from "react";

// Components
import SearchBar from "./SearchBar";
import RecipesList from "../ListPage/RecipesList";

const HomePage = () => {
  const currentTime = new Date().getHours();
  let message;
  if (currentTime > 6 && currentTime < 12) {
    message = "What's for Breakfast?";
  } else if (currentTime >= 12 && currentTime < 14) {
    message = "What's for Brunch?";
  } else if (currentTime >= 14 && currentTime < 16) {
    message = "What's for Lunch?";
  } else if (currentTime >= 16 && currentTime < 23) {
    message = "What's for Dinner?";
  } else if (currentTime >= 23 && currentTime < 2) {
    message = "Midnight Snack?";
  } else {
    message = "Binge Eating?";
  }
  return (
    <div className="main">
      <section className="header">
        <div className="header-container">
          <div className="row">
            <div className="col">
              <div className="typewriter">
                <h1
                  style={{
                    color: "white",
                    fontFamily: "Futura"
                  }}
                >
                  {message}
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
