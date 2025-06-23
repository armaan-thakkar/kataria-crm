import React from "react";
import { FaSpinner } from "react-icons/fa";

const FullPageLoader = () => {
  return (
    <div className="full-page-loader">
      <div className="spinner-container">
        <FaSpinner className="spinner" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
