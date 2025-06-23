import React, { useState } from "react";
import SortIcons from "@/components/sortIcons/SortIcons";
import TableLoader from "../loader/TableLoader";

const CustomTable = ({
  columns,
  isLoading,
  tableClass = "",
  headerClass = "",
  rowClass = "",
  cellClass = "",
  noDataClass = "",
  data = [],
  showFilters = false,
  showWaterMark = false,
  sortHandler = () => {},
  defaultSortKey = null,
  defaultSortField = "",
}) => {
  const [sortState, setSortState] = useState({
    key: defaultSortKey,
    direction: defaultSortField,
  });

  const handleSort = (key) => {
    let directionKey = "";
    if (sortState.key === key) {
      if (sortState.direction === "asc") {
        directionKey = "desc";
      } else if (sortState.direction === "desc") {
        directionKey = "";
      } else {
        directionKey = "asc";
      }
    } else {
      directionKey = "asc";
    }

    sortHandler?.({
      key,
      direction: directionKey,
    });

    setSortState({
      key,
      direction: directionKey,
    });
  };

  if (isLoading) {
    const columnWidths = columns.map((column) => column.width || "auto");

    return (
      <div className={`table-div ${tableClass}`}>
        <div className={`custom-table-header ${headerClass}`}>
          <div className="table-header-row">
            {columns.map((column) => (
              <div
                key={column.key}
                style={{
                  minWidth: column.width,
                  width: column.width,
                }}
                className={`custom-table-cell ${cellClass}`}
              >
                <div className="table-header">
                  {column.title}
                  {column.sorter && (
                    <SortIcons
                      isUpActive={
                        sortState.key === column.key &&
                        sortState.direction === "asc"
                      }
                      isDownActive={
                        sortState.key === column.key &&
                        sortState.direction === "desc"
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {showFilters && (
            <div className="table-header-row">
              {columns.map((column) => (
                <div
                  key={column.key}
                  style={{
                    minWidth: column.width,
                    width: column.width,
                  }}
                  className={`custom-table-cell ${cellClass} ${showFilters ? "floating-filter" : ""}`}
                >
                  {column.comp ? column.comp(column) : null}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="custom-table-body">
          <TableLoader
            rows={5}
            columns={columns.length}
            columnWidths={columnWidths}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={showWaterMark && "table-watermark"}>
      {showWaterMark && (
        <>
          <div className="code top-left">
            {showWaterMark} <br /> {Date.now()}
          </div>
          <div className="code top-right">
            {showWaterMark} <br /> {Date.now()}
          </div>
          <div className="code middle">
            {showWaterMark} <br /> {Date.now()}
          </div>
          <div className="code bottom-left">
            {showWaterMark} <br /> {Date.now()}
          </div>
          <div className="code bottom-right">
            {showWaterMark} <br /> {Date.now()}
          </div>
        </>
      )}
      <div className={`table-div ${tableClass}`}>
        <div className={`custom-table-header ${headerClass}`}>
          <div className="table-header-row">
            {columns.map((column) => (
              <div
                key={column.key}
                style={{
                  minWidth: column.width,
                  width: column.width,
                  cursor: column.sorter ? "pointer" : "default",
                }}
                className={`custom-table-cell ${cellClass}`}
                onClick={() => column.sorter && handleSort(column.key)}
              >
                <div className="table-header">
                  {column.title}
                  {column.sorter && (
                    <SortIcons
                      isUpActive={
                        sortState.key === column.key &&
                        sortState.direction === "asc"
                      }
                      isDownActive={
                        sortState.key === column.key &&
                        sortState.direction === "desc"
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {showFilters && (
            <div className="table-header-row">
              {columns.map((column) => (
                <div
                  key={column.key}
                  style={{
                    minWidth: column.width,
                    width: column.width,
                  }}
                  className={`custom-table-cell floating-filter ${cellClass}`}
                >
                  {column.comp ? column.comp(column) : null}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={`custom-table-body ${data?.length === 0 ? "no-data" : ""}`}
        >
          {data?.length === 0 ? (
            <div className={`custom-table-row no-data-row ${rowClass}`}>
              <div className={`custom-table-cell no-data-cell ${noDataClass}`}>
                No data available
              </div>
            </div>
          ) : (
            data?.map?.((data, index) => (
              <div key={index} className={`custom-table-row ${rowClass}`}>
                {columns.map((column) => (
                  <div
                    key={column.key}
                    style={{
                      minWidth: column.width,
                      width: column.width,
                      wordWrap: "break-word",
                    }}
                    className={`custom-table-cell ${cellClass}`}
                  >
                    {column.component ? (
                      <column.component
                        data={data}
                        value={data[column.key]}
                        columnName={column.key}
                      ></column.component>
                    ) : column.render ? (
                      column.render(data[column.key], data)
                    ) : (
                      data[column.key] || (
                        <span className="text-muted">N/A</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
