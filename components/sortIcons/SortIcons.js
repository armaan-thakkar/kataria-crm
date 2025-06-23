import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { RiExpandUpDownLine } from "react-icons/ri";

const SortIcons = ({ isUpActive, isDownActive }) => {
  return (
    <div className="sort-icons">
      {!(isUpActive || isDownActive) && (
        <RiExpandUpDownLine size={16} className="active fw-bold" />
      )}

      {isUpActive && (
        <FaArrowUp
          size={14}
          className={`up-icon ${isUpActive ? "active" : "inactive"}`}
        />
      )}
      {isDownActive && (
        <FaArrowDown
          size={14}
          className={`down-icon ${isDownActive ? "active" : "inactive"}`}
        />
      )}
    </div>
  );
};

export default SortIcons;
