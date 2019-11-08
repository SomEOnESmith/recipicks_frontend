import React from "react";

// Images
import loadingIcon from "../assets/img/loading-img/loading.gif";

const Loading = () => (
  <div id="loading" className="spinner mx-automt-5 text-center">
    <img
      style={{
        position: "relative",
        bottom: "30px",
        width: "150px",
        height: "150px"
      }}
      alt="Loading"
      src={loadingIcon}
    />
  </div>
);

export default Loading;
