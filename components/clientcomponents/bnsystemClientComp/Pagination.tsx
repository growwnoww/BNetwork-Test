'use client'
import React, { useState } from 'react';

// Dummy data for illustration
const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

// Constants
const ITEMS_PER_PAGE = 10;

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // Calculate the items to show on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToShow = items.slice(startIndex, endIndex);

  // Event handlers for pagination controls
  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {/* Items Display */}
      <div>
        {itemsToShow.map(item => (
          <div key={item}>{item}</div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          &larr; Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '10px' }}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
