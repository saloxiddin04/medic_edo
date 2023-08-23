import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 8;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };  

  const renderPaginationItems = () => {
    const paginationItems = [];

    if (totalPages <= maxVisiblePages) {
      // Render all pages if the total number of pages is less than or equal to the maximum visible pages
      for (let i = 1; i <= totalPages; i++) {
        const isActive = currentPage === i;

        paginationItems.push(
          <li
            key={i}
            className={`inline-block mx-1 rounded border ${
              isActive ? "bg-primary text-white" : "bg-white text-primary"
            }`}
          >
            <button
              className="py-1 w-8 focus:outline-none"
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      // Render ellipsis (...) when there are more than maxVisiblePages pages
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

      if (startPage > 1) {
        paginationItems.push(
          <li
            key={1}
            className={`inline-block mx-1 rounded border ${
              currentPage === 1
                ? "bg-primary text-white"
                : "bg-white text-primary"
            }`}
          >
            <button
              className="py-1 w-8 focus:outline-none"
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
          </li>
        );

        if (startPage > 2) {
          paginationItems.push(
            <li key="start-ellipsis">
              <span className="inline-block mx-1">&hellip;</span>
            </li>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        const isActive = currentPage === i;

        paginationItems.push(
          <li
            key={i}
            className={`inline-block mx-1 rounded border ${
              isActive ? "bg-primary text-white" : "bg-white text-primary"
            }`}
          >
            <button
              className="py-1 w-8 focus:outline-none"
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          paginationItems.push(
            <li key="end-ellipsis">
              <span className="inline-block mx-1">&hellip;</span>
            </li>
          );
        }

        paginationItems.push(
          <li
            key={totalPages}
            className={`inline-block mx-1 rounded border ${
              currentPage === totalPages
                ? "bg-primary text-white"
                : "bg-white text-primary"
            }`}
          >
            <button
              className="py-1 w-8 focus:outline-none"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        );
      }
    }

    return paginationItems;
  };

  return (
    <ul className="flex items-center mt-4">
      <li>
        <button
          className={currentPage === 1 && "cursor-not-allowed opacity-50"}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FiChevronLeft />
        </button>
      </li>
      {renderPaginationItems()}
      <li>
        <button
          className={currentPage === totalPages && "cursor-not-allowed opacity-50"}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FiChevronRight />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
