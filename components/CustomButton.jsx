import React from "react";
import { Button } from "react-bootstrap";
import BounceLoader from "./loader/BounceLoader";

const CustomButton = (props) => {
  const {
    title = "",
    id = "",
    children = "",
    type = "button",
    disabled = false,
    loading = false,
    onClick,
    className = "",
    variant = "",

  } = props;

  return (
    <Button
      id={id}
      className={className}
      title={title}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      variant={variant}
    >
      {loading ? <BounceLoader /> : children}
    </Button>
  );
};

export default CustomButton;
