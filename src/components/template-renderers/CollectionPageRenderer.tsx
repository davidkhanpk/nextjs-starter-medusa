'use client'

import React, { useState } from 'react';
import { CollectionTemplate } from '@lib/template/types';
import { HttpTypes } from "@medusajs/types"
import { 
  cn, 
  getButtonClasses, 
  getCardClasses, 
  spacingToTailwind,
  colorToTailwind,
  borderRadiusToTailwind,
  gridColumnsToTailwind,
  aspectRatioToTailwind,
  getHoverEffectClasses
} from '@lib/template/tailwind-mapper';
import Link from 'next/link';
import { ChevronDown, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import ProductPreview from '@modules/products/components/product-preview';

interface CollectionPageRendererProps {
  template: CollectionTemplate | null;
  collection: HttpTypes.StoreCollection;
  products: HttpTypes.StoreProduct[];
}

/**
 * Collection Page Renderer
 * Renders product collection/category pages with filters, sorting, and grid layouts
 */
export function CollectionPageRenderer({ template, collection, products }: CollectionPageRendererProps) {
  const config = template || getDefaultCollectionTemplate();
  const { zones, settings } = config;

  // State
  const [showFilters, setShowFilters] = useState(zones.filters.position !== 'drawer');
  const [currentSort, setCurrentSort] = useState(zones.sorting.defaultSort);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const itemsPerPage = zones.pagination.itemsPerPage;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  // Render header
  const renderHeader = () => {
    if (!zones.header.showTitle && !zones.header.showDescription) return null;

    return (
      <div className={cn(
        'mb-8',
        zones.header.showBanner && 'bg-cover bg-center h-48 flex items-center justify-center text-white'
      )}>
        {zones.header.showBreadcrumbs && (
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/collections" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
              Collections
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white">{collection.title}</span>
          </nav>
        )}

        <div>
          {zones.header.showTitle && (
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {collection.title}
            </h1>
          )}
          {zones.header.showDescription && collection.metadata?.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              {collection.metadata.description as string}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Render filters
  const renderFilters = () => {
    if (!showFilters && zones.filters.position === 'drawer') return null;

    const filterContent = (
      <div className={cn('space-y-6', spacingToTailwind(settings.spacing, 'padding'))}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
          {zones.filters.position === 'drawer' && (
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Price range */}
        {zones.filters.showPriceRange && (
          <div>
            <h4 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">Price Range</h4>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        )}

        {/* Categories */}
        {zones.filters.showCategories && (
          <div>
            <h4 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">Categories</h4>
            <div className="space-y-2">
              {['Electronics', 'Clothing', 'Home & Garden', 'Sports'].map((category) => (
                <label key={category} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-700 dark:text-gray-300">{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {zones.filters.showColors && (
          <div>
            <h4 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">Colors</h4>
            <div className="flex flex-wrap gap-2">
              {['#000000', '#ffffff', '#3b82f6', '#ef4444', '#10b981', '#f59e0b'].map((color) => (
                <button
                  key={color}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600',
                    'hover:border-gray-900 dark:hover:border-gray-100 transition-colors'
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Filter by color ${color}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {zones.filters.showSizes && (
          <div>
            <h4 className="font-medium text-sm mb-3 text-gray-700 dark:text-gray-300">Sizes</h4>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  className={cn(
                    'px-3 py-1 border rounded-md text-sm',
                    'border-gray-300 dark:border-gray-600',
                    'hover:border-gray-900 dark:hover:border-gray-100',
                    'bg-white dark:bg-gray-800 transition-colors'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    // Drawer position (mobile overlay)
    if (zones.filters.position === 'drawer') {
      return (
        <>
          {/* Overlay */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Drawer */}
          <div
            className={cn(
              'fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform lg:hidden',
              showFilters ? 'translate-x-0' : 'translate-x-full'
            )}
          >
            {filterContent}
          </div>
        </>
      );
    }

    // Left sidebar or top position
    const wrapperClasses = zones.filters.position === 'top' 
      ? cn(getCardClasses(settings), 'mb-6')
      : 'space-y-4';

    return (
      <div className={wrapperClasses}>
        {zones.filters.collapsible ? (
          <details open className="group">
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex items-center justify-between">
              <span>Filters</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-4">{filterContent}</div>
          </details>
        ) : (
          filterContent
        )}
      </div>
    );
  };

  // Render sorting and view controls
  const renderToolbar = () => {
    return (
      <div className={cn(
        'flex flex-wrap items-center justify-between gap-4 mb-6',
        spacingToTailwind(settings.spacing, 'padding'),
        getCardClasses(settings)
      )}>
        {/* Results count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1}–{Math.min(endIndex, products.length)} of {products.length} products
        </div>

        <div className="flex items-center gap-4">
          {/* Filter toggle (mobile) */}
          {zones.filters.position === 'drawer' && (
            <button
              onClick={() => setShowFilters(true)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md lg:hidden',
                'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          )}

          {/* Sort dropdown */}
          {zones.sorting.showSortBy && (
            <select
              value={currentSort}
              onChange={(e) => setCurrentSort(e.target.value as any)}
              className={cn(
                'px-4 py-2 border rounded-md text-sm',
                'bg-white dark:bg-gray-800',
                'border-gray-300 dark:border-gray-600',
                'focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
            >
              {zones.sorting.availableOptions.map((option) => (
                <option key={option} value={option}>
                  {option === 'newest' && 'Newest'}
                  {option === 'price-asc' && 'Price: Low to High'}
                  {option === 'price-desc' && 'Price: High to Low'}
                  {option === 'popular' && 'Most Popular'}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  };

  // Render product grid
  const renderProducts = () => {
    return (
      <div className={cn(
        'grid',
        gridColumnsToTailwind(zones.products.gridColumns),
        spacingToTailwind(settings.spacing, 'gap')
      )}>
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className={cn(
              getHoverEffectClasses(settings.hoverEffects.enabled ? settings.hoverEffects.type : 'none')
            )}
          >
            <ProductPreview product={product} region={collection.metadata?.region as any} />
          </div>
        ))}
      </div>
    );
  };

  // Render pagination
  const renderPagination = () => {
    if (zones.pagination.type === 'infinite') {
      return (
        <div className="text-center mt-8">
          <button className={getButtonClasses(settings, 'primary')}>
            Load More
          </button>
        </div>
      );
    }

    if (zones.pagination.type === 'load-more') {
      return (
        <div className="text-center mt-8">
          <button className={getButtonClasses(settings, 'primary')}>
            Show More Products
          </button>
        </div>
      );
    }

    // Numbers pagination
    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={cn(
            'px-4 py-2 rounded-md font-medium transition-colors',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          )}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={cn(
              'w-10 h-10 rounded-md font-medium transition-colors',
              currentPage === i + 1
                ? cn(colorToTailwind(settings.colors.primary, 'bg'), 'text-white')
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={cn(
            'px-4 py-2 rounded-md font-medium transition-colors',
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          )}
        >
          Next
        </button>
      </div>
    );
  };

  // Main layout
  const filterPosition = zones.filters.position;
  const hasLeftFilters = filterPosition === 'left' && showFilters;

  return (
    <div className={cn('py-12', spacingToTailwind(settings.spacing, 'padding'))}>
      <div className="content-container">
        {/* Header */}
        {renderHeader()}

        {/* Filters (drawer) */}
        {filterPosition === 'drawer' && renderFilters()}

        {/* Main content */}
        <div className={cn(
          hasLeftFilters ? 'grid grid-cols-1 lg:grid-cols-[280px_1fr]' : 'block',
          spacingToTailwind(settings.spacing, 'gap')
        )}>
          {/* Left filters */}
          {hasLeftFilters && (
            <div className="hidden lg:block">
              {renderFilters()}
            </div>
          )}

          {/* Products area */}
          <div>
            {/* Top filters */}
            {filterPosition === 'top' && renderFilters()}

            {/* Toolbar */}
            {renderToolbar()}

            {/* Products grid */}
            {renderProducts()}

            {/* Pagination */}
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Default collection template
 */
function getDefaultCollectionTemplate(): CollectionTemplate {
  return {
    id: 'default',
    templateName: 'Default Collection',
    zones: {
      header: {
        showTitle: true,
        showDescription: true,
        showBanner: false,
        showBreadcrumbs: true,
      },
      filters: {
        position: 'left',
        showPriceRange: true,
        showCategories: true,
        showBrands: false,
        showColors: true,
        showSizes: true,
        collapsible: true,
      },
      products: {
        gridColumns: 3,
        showQuickView: false,
        showAddToCart: true,
        showWishlist: false,
        showCompare: false,
        imageAspectRatio: '1:1',
      },
      sorting: {
        showSortBy: true,
        defaultSort: 'newest',
        availableOptions: ['newest', 'price-asc', 'price-desc', 'popular'],
      },
      pagination: {
        type: 'numbers',
        itemsPerPage: 12,
      },
    },
    settings: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#10b981',
      },
      spacing: 'normal',
      borderRadius: 'medium',
      hoverEffects: {
        enabled: true,
        type: 'lift',
      },
    },
  };
}
