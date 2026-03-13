'use client';

import { ComponentConfig } from "@measured/puck";
import { useCollectionProducts } from "@lib/hooks/useCollectionProducts";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export interface PaginationProps {
  showPageNumbers: boolean;
  showFirstLast: boolean;
  maxPageNumbers: number;
  style: "simple" | "numbered" | "load-more";
  alignment: "left" | "center" | "right";
}

export const Pagination: ComponentConfig<PaginationProps> = {
  label: "Pagination",

  fields: {
    style: {
      type: "select",
      label: "Pagination Style",
      options: [
        { label: "Simple (Prev/Next)", value: "simple" },
        { label: "Numbered Pages", value: "numbered" },
        { label: "Load More Button", value: "load-more" },
      ],
    },
    showPageNumbers: {
      type: "radio",
      label: "Show Page Numbers",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showFirstLast: {
      type: "radio",
      label: "Show First/Last Buttons",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    maxPageNumbers: {
      type: "number",
      label: "Max Page Numbers to Show",
    },
    alignment: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  },

  defaultProps: {
    showPageNumbers: true,
    showFirstLast: true,
    maxPageNumbers: 7,
    style: "numbered",
    alignment: "center",
  },

  render: ({ showPageNumbers, showFirstLast, maxPageNumbers, style, alignment }: PaginationProps) => {
    const { page, pageSize, count, setPage, products } = useCollectionProducts();
    
    const currentPage = page || 1;
    const totalProducts = count || 0;
    const productsPerPage = pageSize || 12;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const alignmentClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };

    // Simple style - just prev/next
    if (style === "simple") {
      return (
        <div className={`flex ${alignmentClasses[alignment]} gap-2 mt-8`}>
          <button
            onClick={() => setPage && setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          {showPageNumbers && (
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          )}
          <button
            onClick={() => setPage && setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      );
    }

    // Load more style
    if (style === "load-more") {
      const showingCount = products?.length || 0;
      return (
        <div className={`flex flex-col items-center gap-4 mt-8`}>
          <p className="text-sm text-gray-600">
            Showing <strong>{showingCount}</strong> of <strong>{totalProducts}</strong> products
          </p>
          {currentPage < totalPages ? (
            <button
              onClick={() => setPage && setPage(currentPage + 1)}
              className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800"
            >
              Load More Products
            </button>
          ) : (
            <p className="text-sm text-gray-600">All products loaded</p>
          )}
        </div>
      );
    }

    // Numbered pagination
    const getPageNumbers = () => {
      const pages = [];
      let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
      let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

      if (endPage - startPage + 1 < maxPageNumbers) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
      <div className={`flex ${alignmentClasses[alignment]} items-center gap-2 mt-8 flex-wrap`}>
        {/* First button */}
        {showFirstLast && currentPage > 1 && (
          <button
            onClick={() => setPage && setPage(1)}
            className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            First
          </button>
        )}

        {/* Previous button */}
        <button
          onClick={() => setPage && setPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Page numbers */}
        {pageNumbers[0] > 1 && (
          <span className="px-2 text-gray-500">...</span>
        )}

        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage && setPage(pageNum)}
            className={`px-4 py-2 border rounded ${
              pageNum === currentPage
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {pageNum}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <span className="px-2 text-gray-500">...</span>
        )}

        {/* Next button */}
        <button
          onClick={() => setPage && setPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>

        {/* Last button */}
        {showFirstLast && currentPage < totalPages && (
          <button
            onClick={() => setPage && setPage(totalPages)}
            className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Last
          </button>
        )}
      </div>
    );
  },
};
