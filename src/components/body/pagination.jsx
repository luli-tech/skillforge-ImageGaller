import React, { useEffect } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, newSearch }) => {
  const pageNumbers = [];

  pageNumbers.push(1);

  if (currentPage > 3) pageNumbers.push("...");

  for (
    let i = Math.max(2, currentPage - 2);
    i <= Math.min(totalPages - 1, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Add ellipses if current page is more than 2 pages away from last
  if (currentPage < totalPages - 2) pageNumbers.push("...");

  // Add last page
  if (totalPages > 1) pageNumbers.push(totalPages);

  // Handle page change with smooth scroll
  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top with smooth animation
  };

  useEffect(() => {
    if (newSearch) {
      onPageChange(1);
    }
  }, [newSearch, onPageChange]);

  return (
    <div className="flex justify-center items-center mt-6 gap-2 sm:gap-1">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-2 sm:px-2 sm:py-1 rounded-md bg-gray-300 hover:bg-gray-400 text-sm sm:text-xs"
        disabled={currentPage === 1}
      >
        «
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-3 cursor-pointer py-2 sm:px-2 sm:py-1 rounded-md ${currentPage === page
              ? "bg-blue-500 text-white font-bold"
              : "bg-gray-300 hover:bg-gray-400 text-sm sm:text-xs"
              }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-2 text-gray-500">
            ...
          </span>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-1 cursor-pointer py-2 sm:px-2 sm:py-1 rounded-md bg-gray-300 hover:bg-gray-400 text-sm sm:text-xs"
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
