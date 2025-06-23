import { PAGE_SIZE } from "@/utils/constants/default.constant";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ReactPaginate from "react-paginate";

const CustomPagination = ({
  metaData,
  handlePageClick,
  currentPage,
  handlePageSizeChange = () => {},
  paginationType = "",
  isLoading,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === metaData?.totalPages;

  const [gotoPage, setGotoPage] = useState(currentPage);
  const calculateStartIndex = () => {
    return (currentPage - 1) * metaData?.pageSize + 1;
  };
  const calculateEndIndex = () => {
    return currentPage * metaData?.pageSize > metaData?.totalElements
      ? metaData?.totalElements
      : currentPage * metaData?.pageSize;
  };

  const handleShortcutEvent = useCallback(
    (e) => {
      if (isLoading) return;

      if (e.shiftKey && e.key === "ArrowRight") {
        if (currentPage < metaData?.totalPages) {
          handlePageClick({ selected: currentPage });
        }
      }

      if (e.shiftKey && e.key === "ArrowLeft") {
        if (currentPage > 1) {
          handlePageClick({ selected: currentPage - 2 });
        }
      }
    },
    [isLoading, currentPage, metaData?.totalPages, handlePageClick],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleShortcutEvent);
    return () => {
      document.removeEventListener("keydown", handleShortcutEvent);
    };
  }, [handleShortcutEvent]);

  useEffect(() => {
    setGotoPage(currentPage);
  }, [currentPage]);

  if (!metaData?.totalElements) {
    return;
  }

  return (
    <div className="pagination-container">
      <div>
        <span className="me-2">
          Show {calculateStartIndex() || 0} to {calculateEndIndex() || 0} of{" "}
          {metaData?.totalElements} entries
        </span>
        <select
          name="pagelimit"
          id="pagelimit"
          value={metaData?.pageSize}
          onChange={(e) => {
            const newPageSize = parseInt(e.target.value);
            handlePageSizeChange(newPageSize);
          }}
          disabled={isLoading}
        >
          {PAGE_SIZE.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        {paginationType === "simple" && metaData?.totalPages ? (
          <div className="d-flex gap-2">
            <div className="d-flex justify-content-center gap-2 align-items-center">
              <form
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePageClick({ selected: gotoPage - 1 });
                }}
              >
                <input
                  type="number"
                  min={1}
                  max={metaData?.totalPages}
                  value={gotoPage}
                  className="form-control goto-page-input"
                  onChange={(e) => {
                    setGotoPage(e?.target?.value);
                  }}
                  disabled={isLoading}
                  required
                />
              </form>
              <p>of {metaData?.totalPages} pages</p>
            </div>
            <div className="d-flex gap-2">
              <Button
                onClick={() => {
                  handlePageClick({ selected: currentPage - 2 });
                }}
                disabled={currentPage <= 1 || isLoading}
                title="Previous Page (shift + <)"
              >
                {"<"}
              </Button>
              <Button
                onClick={() => {
                  handlePageClick({ selected: currentPage });
                }}
                disabled={currentPage >= metaData?.totalPages || isLoading}
                title="Next Page (shift + >)"
              >
                {">"}
              </Button>
            </div>
          </div>
        ) : null}
        {paginationType === "" && (
          <ReactPaginate
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            forcePage={currentPage - 1}
            pageCount={metaData?.totalPages || 0}
            previousLabel={
              <span
                className={`${isFirstPage ? "disabled" : ""}`}
                disabled={isFirstPage}
              >
                <MdKeyboardArrowLeft />
              </span>
            }
            // breakLabel="..."
            nextLabel={
              <span
                className={`${isLastPage ? "disabled" : ""}`}
                disabled={isLastPage}
              >
                <MdKeyboardArrowRight />
              </span>
            }
            activeClassName="active"
            // previousClassName=""
            // nextClassName=""
          />
        )}
      </div>
    </div>
  );
};

export default CustomPagination;
