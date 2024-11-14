const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        hidden={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        hidden={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
