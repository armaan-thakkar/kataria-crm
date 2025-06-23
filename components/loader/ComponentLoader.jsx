import React from "react";

const ComponentLoader = ({ loading, children }) => {
  return (
    <div className="componentLoaderWrapper h-95vh d-flex align-items-center justify-content-center gap-3">
      <div className="componentLoaderOverlay">
        <div className="page-loader" />
      </div>
    </div>
  );
};

export default ComponentLoader;
