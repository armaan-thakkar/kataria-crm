import React from "react";

const Tooltip = ({ id, children, placement = "top", className = "" }) => {
  return (
    <div className={`toooltip ${className}`} data-placement={placement} id={id}>
      {children}
    </div>
  );
};

export default Tooltip;
