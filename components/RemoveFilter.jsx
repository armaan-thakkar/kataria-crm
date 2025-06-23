import { isFilterActive } from "@/utils/helpers/common.helper";
import React, { useMemo } from "react";

const RemoveFilter = ({
  filterParams,
  FILTER_PARAMS,
  setFilterParams,
  isRouterPushAction = false,
}) => {
  const isActive = useMemo(
    () =>
      isFilterActive(filterParams, [
        FILTER_PARAMS.CURRENT_PAGE,
        FILTER_PARAMS.PAGE_SIZE,
        FILTER_PARAMS.SORT_FIELD,
        FILTER_PARAMS.SORT_DIRECTION,
      ]),
    [filterParams],
  );

  const handleClearFilters = () => {
    const clearedFilters = { ...filterParams };

    Object.keys(clearedFilters).forEach((key) => {
      if (
        key !== FILTER_PARAMS.PAGE_SIZE &&
        key !== FILTER_PARAMS.SORT_FIELD &&
        key !== FILTER_PARAMS.SORT_DIRECTION
      ) {
        clearedFilters[key] = Array.isArray(clearedFilters[key]) ? [] : "";
      }
    });
    // Ensure current page is reset to 1
    clearedFilters[FILTER_PARAMS.CURRENT_PAGE] = 1;
    isRouterPushAction?.(clearedFilters);
    setFilterParams(clearedFilters);
  };

  return (
    <div>
      {isActive && (
        <div className="filter-applied">
          Showing Results for - &quot;Filter Applied&quot;
          <span onClick={handleClearFilters}>
            {" "}
            Clear Filter <i className="text-danger">X</i>
          </span>
        </div>
      )}{" "}
    </div>
  );
};

export default RemoveFilter;
