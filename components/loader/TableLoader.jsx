import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableLoader = ({ rows, columns, columnWidths }) => {
  return (
    <>
      {Array(rows)
        .fill()
        .map((row, rowIndex) => {
          const rowKey = `row-${rowIndex}`;
          return (
            <div key={rowKey} className="custom-table-row">
              {Array(columns)
                .fill()
                .map((column, columnIndex) => {
                  const cellKey = `cell-${rowIndex}-${columnIndex}`;
                  return (
                    <div
                      key={cellKey}
                      className="custom-table-cell"
                      style={{ minWidth: columnWidths[columnIndex] || "auto" }}
                    >
                      <Skeleton />
                    </div>
                  );
                })}
            </div>
          );
        })}
    </>
  );
};

export default TableLoader;
