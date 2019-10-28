import React from "react";
import loadingIcon from "../assets/Yx9l.gif"
const Loading = () => (
  <div id="loading" className="spinner mx-automt-5 text-center">

    <img
      style={{ position: "relative", bottom: "30px", width: "150px", height: "150px" }}
      src={loadingIcon}>
    </img>


  </div>
);

export default Loading;
