import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const NoteForColumnName = ({ value, containerClassName = "" }) => {
  return (
    <>
      {" "}
      {value && (
        <div
          className={`d-flex align-items-center gap-1 ${containerClassName}`}
        >
          <HiOutlineExclamationCircle size={20} />
          Note: Please ensure the uploaded Excel file includes a header named{" "}
          <b>{value}</b>.
        </div>
      )}
    </>
  );
};

export default NoteForColumnName;
