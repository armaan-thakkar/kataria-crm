import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export const FormInputField = ({
  id = "",
  name = "",
  label = "",
  type,
  placeholder = "",
  required = false,
  readOnly = false,
  errors = "",
  inputClass = "",
  touched = false,
  disabled = false,
  value = "",
  handleChange = () => {},
  handleBlur = () => {},
  setFieldValue = () => {},
  setFieldTouched = () => {},
  max,
  step,
  maxLength,
}) => {
  //   const  = props;
  const [showPassword, setShowPassword] = useState(false);
  function getPasswordFieldType() {
    return showPassword ? "text" : "password";
  }
  return (
    <div className="position-relative custom-input">
      {label && (
        <label htmlFor={name} className="form-label">
          {" "}
          {label} {required ? <span className="text-danger">*</span> : null}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type === "password" ? getPasswordFieldType() : type}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => {
          const val = e?.target?.value?.trimStart?.() || null;
          setFieldTouched?.(name, true);
          handleChange?.(e);
          setFieldValue?.(name, val);
        }}
        onBlur={(e) => {
          // TODO: Remove this if you dont want to set field touch on blur
          setFieldTouched?.(name, true);
          handleBlur?.(e);
        }}
        // TODO: Add invalid class name later
        className={`form-control ${
          errors && touched ? "is-invalid" : ""
        } ${inputClass}`}
        min={type === "number" ? max : undefined}
        max={type === "number" ? max : undefined}
        step={type === "number" ? step : undefined}
        maxLength={type === ("text" || "email") ? maxLength : undefined}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete="off"
      />
      {type === "password" && (
        <div
          className={`position-absolute user-eye-icon ${errors && touched ? "text-danger" : ""}`}
          onClick={() => !disabled && setShowPassword(!showPassword)}
        >
          {showPassword ? <FaRegEye size={22} /> : <FaRegEyeSlash size={22} />}
        </div>
      )}

      {errors && touched ? (
        <span className="error-message">{errors}</span>
      ) : null}
    </div>
  );
};
