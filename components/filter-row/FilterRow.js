import React from "react";
import { Form } from "react-bootstrap";
import CustomSelect from "../form-group/custom-select/CustomSelect";

const FilterRow = ({ columns, cellClass }) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={`${column.key}-filter`} className={cellClass}>
          {column.filterType === "text" && <Form.Control type="text" />}
          {column.filterType === "date" && <Form.Control type="date" />}
          {column.filterType === "select" && (
            <CustomSelect placeholder="Select" />
          )}
        </td>
      ))}
    </tr>
  );
};

export default FilterRow;
