import React from "react";
import { Form, FormControl } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";

const CustomInput = ({
  label,
  placeholder,
  value,
  onChange,
  onClear,
  type = "text",
  clearable = false,
  ...props
}) => {
  return (
    <Form.Group controlId="formCustomInput">
      {label && <Form.Label>{label}</Form.Label>}
      <div className="input-container">
        <FormControl
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          autoComplete="off"
          className={clearable && value ? "input-with-clear" : ""}
        />
        {clearable && value && (
          <RxCross2 className="clear-btn" onClick={onClear} size={16} />
        )}
      </div>
    </Form.Group>
  );
};

export default CustomInput;
