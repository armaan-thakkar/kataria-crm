import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

// Function to filter options based on search string
const searchInDropdownOptions = (options, searchStr) => {
  const normalizedSearchStr = searchStr.toLowerCase();
  return options?.filter((option) =>
    option.label.toLowerCase().includes(normalizedSearchStr),
  );
};

const SingleSelect = ({
  value,
  options,
  placeholder,
  isSortable = true,
  isSearchable = true,
  onChange,
  extraClassOption = "",
  extraClassLabel = "",
  extraLabelOption = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchString, setSearchString] = useState("");
  const ref = useRef(null);

  const filteredOptions = useMemo(() => {
    return searchInDropdownOptions(options, searchString);
  }, [options, searchString]);

  const sortedOptions = useMemo(() => {
    if (isSortable && value) {
      return [
        value,
        ...filteredOptions.filter((option) => option.value !== value.value),
      ];
    }
    return filteredOptions;
  }, [filteredOptions, isSortable, value]);

  const handleSelect = useCallback(
    (selectedOption) => {
      onChange(selectedOption);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      if (!disabled) {
        onChange(null);
        setSearchString("");
      }
    },
    [disabled, onChange],
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        setSearchString("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isOpen) {
        if (event.key === "Escape") {
          setIsOpen(false);
          setSearchString("");
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className={`position-relative ${disabled ? "cursor-disabled disabled" : ""}`}
    >
      <div
        className={`select-label ${extraClassLabel} ${value ? "select-option-selected" : ""} ${isOpen ? "active-filter" : ""}`}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={(e) =>
          e.key === "Enter" && !disabled && setIsOpen((prev) => !prev)
        }
      >
        <div className="select-label-icons">
          <div className="d-flex align-items-center gap-1">
            <div className={`${value ? "text-light" : ""} custom-placeholder`}>
              {value ? value.label : placeholder}
            </div>
          </div>
          <div className="d-flex align-items-center gap-1">
            {value && (
              <RxCross2
                size={18}
                onClick={handleClear}
                className={value ? "text-light" : ""}
                aria-label="Clear selection"
              />
            )}
            <IoIosArrowDown
              size={18}
              className={`${value ? "text-light" : ""} ${isOpen ? "select-label-icons-arrow-down" : "select-label-icons-arrow-up"}`}
              aria-label="Toggle dropdown"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={`select-option ${extraClassOption}`} role="listbox">
          {isSearchable && options?.length > 0 && (
            <div className="position-relative mb-1">
              <input
                value={searchString}
                type="text"
                className="select-search"
                placeholder="Search"
                onChange={(e) => setSearchString(e.target.value)}
                autoFocus
                disabled={disabled}
                aria-label="Search options"
              />
              {searchString.length > 0 && (
                <RxCross2
                  size={18}
                  className="select-cross cursor-pointer"
                  onClick={() => setSearchString("")}
                  aria-label="Clear search"
                />
              )}
            </div>
          )}
          {sortedOptions?.length > 0 ? (
            sortedOptions.map((option) => {
              const customClass = extraLabelOption
                ? extraLabelOption(option)
                : "";
              return (
                <div
                  role="option"
                  aria-selected={value?.value === option.value}
                  className={`select-label-option ${value?.value === option.value ? "selected-label" : ""} ${customClass}`}
                  key={option.value}
                  onClick={() => !disabled && handleSelect(option)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !disabled && handleSelect(option)
                  }
                  tabIndex={0}
                >
                  <div className="select-value" title={option.label}>
                    {option.label}
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

export default SingleSelect;
