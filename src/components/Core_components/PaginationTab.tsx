import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function PaginationTab({ currentPage = 1, totalResults = 0, onPageChange }: any) {
  const itemsPerPage = 20;

  // Ensure safe values for calculations
  const safeCurrentPage = Number(currentPage) || 1;
  const safeTotalResults = Number(totalResults) || 0;
  const totalPages = Math.ceil(safeTotalResults / itemsPerPage) || 1;

  // Ensure start and end page calculations are valid
  const startPage = Math.floor((safeCurrentPage - 1) / 10) * 10 + 1;
  const endPage = Math.max(startPage, Math.min(startPage + 9, totalPages));

  // Ensure pages array is valid
  const pages = totalPages > 0 ? Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i) : [];

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{Math.min((safeCurrentPage - 1) * itemsPerPage + 1, safeTotalResults)}</span>{" "}
          to{" "}
          <span className="font-medium">{Math.min(safeCurrentPage * itemsPerPage, safeTotalResults)}</span> of{" "}
          <span className="font-medium">{safeTotalResults}</span> results
        </p>

        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20"
            disabled={safeCurrentPage === 1}
          >
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </button>

          {/* Page Numbers */}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                page === safeCurrentPage
                  ? "z-10 bg-indigo-600 text-white focus-visible:outline-indigo-600"
                  : "text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, safeCurrentPage + 1))}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20"
            disabled={safeCurrentPage === totalPages}
          >
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default PaginationTab;
