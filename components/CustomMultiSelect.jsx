import React, { useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

// Function to filter options based on search string
export const searchInDropdownOptions = (options, searchStr) => {
  const normalizedSearchStr = searchStr.toLowerCase();

  return options?.length
    ? options.filter((option) =>
        option.label.toLowerCase().includes(normalizedSearchStr),
      )
    : [];
};

const MultiSelect = ({
  value,
  options,
  count,
  placeholder,
  isSortable = true,
  isSearchable = true,
  onChange,
  isMulti,
  extraClassOption = "",
  extraClassLabel = "",
  extraLabelOption = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [optionsData, setOptionsData] = useState(options);
  const TEXT_LIGHT = "text-light";

  // Function to check if an option is selected
  const showSelectedHandler = (selectedValue, values) => {
    if (values) {
      if (Array.isArray(values)) return values.includes(selectedValue);
      return values.value === selectedValue.value;
    }
    return false;
  };

  // Update options when search string or options change
  useEffect(() => {
    setOptionsData(searchInDropdownOptions(options, searchString));
  }, [searchString, options]);

  // Handle selection of options
  const changeHandler = (selectedOption, value, isRemoved) => {
    if (isRemoved && value) {
      if (Array.isArray(value))
        return onChange(
          value.filter((val) => val.value !== selectedOption.value),
        );
      return onChange(value.value === selectedOption.value ? null : value);
    }

    if (isMulti) {
      if (value && Array.isArray(value))
        return onChange([...value, selectedOption]);
      else if (value) return onChange([value, selectedOption]);
      return onChange([selectedOption]);
    }
    return onChange(selectedOption);
  };

  // Sort options if isSortable is true
  const sortOptionsHandler = (value, options) => {
    if (isSortable && value) {
      if (Array.isArray(value)) {
        const valueId = value?.map((valueObj) => valueObj.value);
        return [
          ...value,
          ...options.filter((valueObj) => !valueId.includes(valueObj.value)),
        ];
      }
      return [
        value,
        ...options.filter((valueObj) => valueObj.value !== value.value),
      ];
    }
    return options;
  };

  const ref = useRef(null);

  // Custom hook to detect clicks outside of the component
  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  // Call the useOutsideClick hook
  useOutsideClick(ref, () => {
    setIsOpen(false);
    setSearchString("");
  });

  // Sort the options based on the selected value
  const sortedOptions = sortOptionsHandler(value, optionsData);

  return (
    <div
      ref={ref}
      className={`position-relative ${disabled ? "cursor-disabled disabled" : ""}`}
    >
      <div
        className={`select-label ${extraClassLabel} ${count ? "select-option-selected" : ""} ${isOpen ? "active-filter" : ""}`}
        tabIndex={0}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            setSearchString("");
          }
        }}
      >
        <div className="select-label-icons">
          <div className="d-flex align-items-center gap-1">
            <div className={` ${count ? TEXT_LIGHT : ""}  custom-placeholder`}>
              {placeholder}
            </div>
            <div>
              {count && count > 0 ? (
                <span className="selected-circle">{count}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-flex align-items-center gap-1">
            {count ? (
              <RxCross2
                size={18}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) {
                    onChange(null);
                    setSearchString("");
                  }
                }}
                className={` ${count ? TEXT_LIGHT : ""}`}
              />
            ) : null}
            <IoIosArrowDown
              size={18}
              className={`${count ? TEXT_LIGHT : ""} ${isOpen ? "select-label-icons-arrow-down" : "select-label-icons-arrow-up"}`}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`select-option ${extraClassOption}`}>
          {isSearchable && options?.length ? (
            <div className="position-relative mb-1">
              <input
                value={searchString}
                type="text"
                className="select-search"
                placeholder="Search"
                onChange={(e) => setSearchString(e.target.value)}
                autoFocus
                disabled={disabled} // Disable search input if disabled
              />
              {searchString.length ? (
                <RxCross2
                  size={18}
                  className="select-cross cursor-pointer"
                  onClick={() => setSearchString("")}
                />
              ) : null}
            </div>
          ) : null}

          {sortedOptions?.length ? (
            sortedOptions.map((e) => {
              // Get custom class from parent
              const customClass = extraLabelOption ? extraLabelOption(e) : "";

              return (
                <div
                  role="button"
                  className={`select-label-option ${showSelectedHandler(e, value) ? "selected-label" : ""} ${customClass}`}
                  key={e.value}
                  onClick={() => {
                    if (!disabled) {
                      changeHandler(e, value, showSelectedHandler(e, value));
                      !isMulti && setIsOpen(false);
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    id={`customCheckbox-${e.value}`}
                    checked={showSelectedHandler(e, value)}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (!disabled) {
                        changeHandler(e, value, showSelectedHandler(e, value));
                        !isMulti && setIsOpen(false);
                      }
                    }}
                    onChange={() => {}}
                    disabled={disabled} // Disable checkbox if disabled
                  />
                  <label htmlFor={`customCheckbox-${e.value}`}></label>
                  <div className="select-value" title={e.label}>
                    {e.label}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">No options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
