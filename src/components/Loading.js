import React from "react";

const Loading = () => (
  <div style={{ position: "relative", top: 260 }} className="text-center">
    <div className="spinner-border text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loading;
