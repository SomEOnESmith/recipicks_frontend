import React from "react";

const Loading = () => (
  <div style={{ position: "relative", top: 230 }} className="text-center">
    <div className="spinner-grow text-danger " role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loading;
