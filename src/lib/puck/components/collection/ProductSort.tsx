'use client';

import { ComponentConfig } from "@measured/puck";
import { useCollectionProducts } from "@lib/hooks/useCollectionProducts";
import { useState } from "react";
import { Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline';

export interface ProductSortProps {
  defaultSort: string;
  showResultCount: boolean;
  showViewToggle: boolean;
  position: "left" | "right" | "center";
}

export const ProductSort: ComponentConfig<ProductSortProps> = {
  label: "Product Sort",

  fields: {
    defaultSort: {
      type: "select",
      label: "Default Sort",
      options: [
        { label: "Featured", value: "featured" },
        { label: "Price: Low to High", value: "price_asc" },
        { label: "Price: High to Low", value: "price_desc" },
        { label: "Newest First", value: "created_desc" },
        { label: "Best Selling", value: "sales_desc" },
        { label: "Name: A-Z", value: "title_asc" },
        { label: "Name: Z-A", value: "title_desc" },
      ],
    },
    showResultCount: {
      type: "radio",
      label: "Show Result Count",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showViewToggle: {
      type: "radio",
      label: "Show Grid/List Toggle",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    position: {
      type: "select",
      label: "Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  },

  defaultProps: {
    defaultSort: "featured",
    showResultCount: true,
    showViewToggle: true,
    position: "right",
  },

  render: ({ defaultSort, showResultCount, showViewToggle, position }: ProductSortProps) => {
    const { products, sort, updateSort, count, pageSize } = useCollectionProducts();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const sortOptions = [
      { label: "Featured", value: "featured" },
      { label: "Price: Low to High", value: "price_asc" },
      { label: "Price: High to Low", value: "price_desc" },
      { label: "Newest First", value: "created_desc" },
      { label: "Best Selling", value: "sales_desc" },
      { label: "Name: A-Z", value: "title_asc" },
      { label: "Name: Z-A", value: "title_desc" },
    ];

    const positionClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };

    const currentSort = sort || defaultSort;
    const totalProducts = count || 0;
    const showingCount = products?.length || 0;

    return (
      <div className={`flex items-center ${positionClasses[position]} gap-4 mb-6 py-4 border-b border-gray-200`}>
        {/* Result Count */}
        {showResultCount && (
          <span className="text-sm text-gray-600">
            Showing <strong>{showingCount}</strong> of <strong>{totalProducts}</strong> products
          </span>
        )}

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 font-medium">Sort by:</label>
          <select
            value={currentSort}
            onChange={(e) => updateSort && updateSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        {showViewToggle && (
          <div className="flex items-center gap-1 border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              title="Grid View"
            >
              <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
              title="List View"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    );
  },
};
