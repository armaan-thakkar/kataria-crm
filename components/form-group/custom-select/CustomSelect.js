import React from "react";
import ReactSelect from "react-select";

const CustomSelect = (props) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#ced4da",
      minHeight: "33px",
      height: "33px",
      boxShadow: state.isFocused ? null : null,
      fontSize: "13.5px",
      width: "100% ",
      // maxWidth: "160px",
      // minWidth: "100px",
      borderRadius: "5px",
      "&:hover": {
        borderColor: "#ced4da",
      },
    }),

    valueContainer: (provided) => ({
      ...provided,
      // height: "33px",
      padding: "0 6px",
    }),

    // input: (provided) => ({
    //   ...provided,
    //   margin: "0px",
    //   width: "100%",
    //   minWidth: "100px",
    // }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "33px",
    }),
    option: (provided, state) => ({
      ...provided,
      width: "100%",
      minWidth: "100px",
      overflow: "auto",
      padding: "5px",
      backgroundColor: state.isSelected
        ? "#2684FF"
        : state.isFocused
          ? "#e6f4ff"
          : "white",
      color: state.isSelected ? "white" : "black",
    }),
    menu: (provided) => ({
      ...provided,
      // minWidth:"100%",
      overflow: "auto",
      padding: "5px",
      fontSize: "14px",
      zIndex: 9999,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#667085",
    }),
  };

  // Custom search function
  function searchOption(option, searchText) {
    const searchTextLower = searchText.toLowerCase();
    if (props?.searchKey?.length) {
      for (const key of props.searchKey) {
        const searchString = option?.data?.data?.[key] || "";
        if (
          searchString.toLowerCase().includes(searchTextLower) ||
          option.data.label?.toLowerCase().includes(searchTextLower)
        ) {
          return true;
        }
      }
      return false;
    }
    return !!option.data.label?.toLowerCase().includes(searchTextLower);
  }

  return (
    <ReactSelect
      name={props.name}
      value={props.value}
      onChange={(e, triggerAction) => {
        if (
          triggerAction.action === "pop-value" &&
          !triggerAction?.removedValue
        ) {
          return;
        }
        props.onChange && props.onChange(e);
      }}
      onFocus={(e) => props?.onFocus?.(e)}
      onBlur={(e) => props?.onBlur?.(e)}
      onKeyDown={(e) => {
        if (e.code === "Space" && !e.target.value) e.preventDefault();
      }}
      placeholder={props.placeholder}
      options={props.options}
      isMulti={props.isMulti}
      isSearchable={props.isSearchable}
      isClearable={true}
      filterOption={searchOption}
      isOptionDisabled={(option) => option.disabled ?? false}
      className={props.extraClass}
      noOptionsMessage={() => props.noOptionsMessage || "No result found"}
      isDisabled={props.disabled}
      isLoading={props.isLoading}
      closeMenuOnSelect={props.closeMenuOnSelect}
      menuIsOpen={props.menuIsOpen}
      styles={customStyles} // Apply custom styles
    />
  );
};

export default CustomSelect;
