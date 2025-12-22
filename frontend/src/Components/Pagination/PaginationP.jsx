import './PaginationP.css'
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);
      
      // Adjust start if we're near the end
      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      return pages;
    };
  
    return (
      <div className="pagination">
        {/* Previous Button */}
        <button 
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ← Previous
        </button>
  
        {/* First Page */}
        {currentPage > 3 && (
          <>
            <button 
              className="pagination-number"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            <span className="pagination-ellipsis">...</span>
          </>
        )}
  
        {/* Page Numbers */}
        {getPageNumbers().map(page => (
          <button
            key={page}
            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
  
        {/* Last Page */}
        {currentPage < totalPages - 2 && (
          <>
            <span className="pagination-ellipsis">...</span>
            <button 
              className="pagination-number"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
  
        {/* Next Button */}
        <button 
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    );
  };