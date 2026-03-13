"use client"

import { ComponentConfig } from "@measured/puck";
import { useCategory } from "@lib/hooks/useCategory";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { HttpTypes } from "@medusajs/types";
import { ProductCard } from "@lib/puck/components/product-card/ProductCardRenderer";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { sortProducts } from "@lib/util/sort-products";

export interface CategoryProductsGridProps {
  columns: 2 | 3 | 4 | 5 | 6;
  gap: "sm" | "md" | "lg" | "xl";
  showTitle: boolean;
  title: string;
  titleAlignment: "left" | "center" | "right";
  gridLocation: "left" | "center" | "right";
  productsPerPage: number;
  showSortFilter: boolean;
  sortPosition: "top-left" | "top-center" | "top-right";
  showPagination: boolean;
  paginationPosition: "bottom-left" | "bottom-center" | "bottom-right";
  showProductsPerPageDropdown: boolean;
  productsPerPageOptions: string;
}

export const CategoryProductsGrid: ComponentConfig<CategoryProductsGridProps> = {
  label: "Category Products Grid",

  fields: {
    showTitle: {
      type: "radio",
      label: "Show Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    title: {
      type: "text",
      label: "Title",
    },
    titleAlignment: {
      type: "radio",
      label: "Title Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    columns: {
      type: "select",
      label: "Columns",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
        { label: "5 Columns", value: 5 },
        { label: "6 Columns", value: 6 },
      ],
    },
    gap: {
      type: "select",
      label: "Gap Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "X-Large", value: "xl" },
      ],
    },
    gridLocation: {
      type: "radio",
      label: "Grid Location",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    productsPerPage: {
      type: "number",
      label: "Products Per Page (Default)",
      min: 4,
      max: 100,
    },
    showSortFilter: {
      type: "radio",
      label: "Show Sort/Filter",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    sortPosition: {
      type: "select",
      label: "Sort Position",
      options: [
        { label: "Top Left", value: "top-left" },
        { label: "Top Center", value: "top-center" },
        { label: "Top Right", value: "top-right" },
      ],
    },
    showPagination: {
      type: "radio",
      label: "Show Pagination",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    paginationPosition: {
      type: "select",
      label: "Pagination Position",
      options: [
        { label: "Bottom Left", value: "bottom-left" },
        { label: "Bottom Center", value: "bottom-center" },
        { label: "Bottom Right", value: "bottom-right" },
      ],
    },
    showProductsPerPageDropdown: {
      type: "radio",
      label: "Show Products Per Page Selector",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    productsPerPageOptions: {
      type: "text",
      label: "Products Per Page Options (comma-separated)",
    },
  },

  defaultProps: {
    columns: 4,
    gap: "md",
    showTitle: false,
    title: "Products",
    titleAlignment: "left",
    gridLocation: "center",
    productsPerPage: 12,
    showSortFilter: true,
    sortPosition: "top-right",
    showPagination: true,
    paginationPosition: "bottom-center",
    showProductsPerPageDropdown: false,
    productsPerPageOptions: "12,24,36,48",
  },

  render: (props) => {
    const { 
      columns, gap, showTitle, title, titleAlignment, gridLocation, 
      productsPerPage: defaultProductsPerPage, showSortFilter, sortPosition, 
      showPagination, paginationPosition, showProductsPerPageDropdown, 
      productsPerPageOptions 
    } = props;
    
    const { category, countryCode, productCardTemplate } = useCategory();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    // Get URL params (Medusa pattern: uses URL search params)
    const urlPage = searchParams.get("page");
    const urlSortBy = searchParams.get("sortBy") as SortOptions;
    const urlLimit = searchParams.get("limit");
    
    const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);
    const [region, setRegion] = useState<HttpTypes.StoreRegion | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(parseInt(urlPage || "1"));
    const [sortBy, setSortBy] = useState<SortOptions>(urlSortBy || 'created_at');
    const [productsPerPage, setProductsPerPage] = useState(
      parseInt(urlLimit || defaultProductsPerPage.toString())
    );
    const [totalProducts, setTotalProducts] = useState(0);
    
    // Update URL params (Medusa uses router.push with search params)
    const updateURLParams = (updates: { page?: number; sortBy?: SortOptions; limit?: number }) => {
      const params = new URLSearchParams(searchParams);
      
      if (updates.page !== undefined) {
        params.set("page", updates.page.toString());
      }
      if (updates.sortBy) {
        params.set("sortBy", updates.sortBy);
      }
      if (updates.limit !== undefined) {
        params.set("limit", updates.limit.toString());
      }
      
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };
    
    // Sync state with URL params
    useEffect(() => {
      if (urlPage) setCurrentPage(parseInt(urlPage));
      if (urlSortBy) setSortBy(urlSortBy);
      if (urlLimit) setProductsPerPage(parseInt(urlLimit));
    }, [urlPage, urlSortBy, urlLimit]);
    
    // Fetch products (Medusa API pattern)
    useEffect(() => {
      async function fetchProducts() {
        if (!category) return;
        
        setLoading(true);
        
        try {
          // Fetch via storefront API route (server-side proxy to Medusa)
          const params = new URLSearchParams({
            limit: '100',
            offset: '0',
          });
          if (category.id) {
            params.set('category_id', category.id);
          }
          if (sortBy === 'created_at') {
            params.set('order', '-created_at');
          }

          const res = await fetch(`/api/products?${params}`);
          const data = await res.json();
          setRegion(null);

          console.log('[CategoryProductsGrid] Fetching products for category:', category.id);

          try {
            const response = data;
            console.log('[CategoryProductsGrid] API Response:', {
              productCount: response?.products?.length,
              totalCount: response?.count
            });

            let allProducts = response?.products || [];
            const totalCount = response?.count || 0;

            // Sort products client-side (required for price sorting)
            if (sortBy && ['price_asc', 'price_desc', 'created_at'].includes(sortBy)) {
              allProducts = sortProducts(allProducts, sortBy);
            }

            // Paginate after sorting
            const offset = (currentPage - 1) * productsPerPage;
            const paginatedProducts = allProducts.slice(offset, offset + productsPerPage);

            setProducts(paginatedProducts);
            setTotalProducts(totalCount);
          } catch (apiError) {
            console.error('[CategoryProductsGrid] API Error:', apiError);
            
            // Fallback: Use products from category object if API filter doesn't work
            if (category.products && Array.isArray(category.products)) {
              console.log('[CategoryProductsGrid] Falling back to category.products');
              let allProducts = category.products;
              
              // Sort client-side
              if (sortBy && ['price_asc', 'price_desc', 'created_at'].includes(sortBy)) {
                allProducts = sortProducts(allProducts, sortBy);
              }
              
              // Paginate
              const offset = (currentPage - 1) * productsPerPage;
              const paginatedProducts = allProducts.slice(offset, offset + productsPerPage);
              
              setProducts(paginatedProducts);
              setTotalProducts(allProducts.length);
            } else {
              setProducts([]);
              setTotalProducts(0);
            }
          }
        } catch (error) {
          console.error('Error fetching category products:', error);
        } finally {
          setLoading(false);
        }
      }

      fetchProducts();
    }, [category, countryCode, currentPage, sortBy, productsPerPage]);

    if (!category) {
      return <div className="text-gray-400 italic py-8">Category products will appear here</div>;
    }

    const gapClasses = { sm: "gap-4", md: "gap-6", lg: "gap-8", xl: "gap-10" };
    const titleAlignmentClasses = { left: "text-left", center: "text-center", right: "text-right" };
    const gridLocationClasses = { left: "mr-auto", center: "mx-auto", right: "ml-auto" };
    const sortPositionClasses = { "top-left": "justify-start", "top-center": "justify-center", "top-right": "justify-end" };
    const paginationPositionClasses = { "bottom-left": "justify-start", "bottom-center": "justify-center", "bottom-right": "justify-end" };
    
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const perPageOptions = productsPerPageOptions.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    
    // Sort/Filter Controls
    const SortFilterControls = () => (
      <div className={`flex ${sortPositionClasses[sortPosition]} flex-wrap items-center gap-4 mb-6`}>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => {
              const newSort = e.target.value as SortOptions;
              setSortBy(newSort);
              setCurrentPage(1);
              updateURLParams({ sortBy: newSort, page: 1 });
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="created_at">Latest Arrivals</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>
        
        {showProductsPerPageDropdown && perPageOptions.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 font-medium">Show:</label>
            <select
              value={productsPerPage}
              onChange={(e) => {
                const newLimit = parseInt(e.target.value);
                setProductsPerPage(newLimit);
                setCurrentPage(1);
                updateURLParams({ limit: newLimit, page: 1 });
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {perPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          {((currentPage - 1) * productsPerPage) + 1}–{Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts}
        </div>
      </div>
    );
    
    // Pagination Controls (Medusa pattern)
    const PaginationControls = () => {
      if (!showPagination || totalPages <= 1) return null;
      
      const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        updateURLParams({ page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      
      const renderPageNumbers = () => {
        const pages = [];
        
        if (totalPages <= 7) {
          for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
          if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, null, totalPages);
          } else if (currentPage >= totalPages - 3) {
            pages.push(1, null, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
          } else {
            pages.push(1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages);
          }
        }
        
        return pages.map((page, idx) => {
          if (page === null) return <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>;
          
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                currentPage === page ? 'bg-blue-600 text-white cursor-default' : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          );
        });
      };
      
      return (
        <div className={`flex ${paginationPositionClasses[paginationPosition]} items-center gap-2 mt-8`}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">{renderPageNumbers()}</div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      );
    };

    if (loading) {
      return (
        <div className={`w-full ${gridLocationClasses[gridLocation]}`}>
          {showTitle && <h2 className={`text-2xl font-bold mb-6 ${titleAlignmentClasses[titleAlignment]}`}>{title}</h2>}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }} className={gapClasses[gap]}>
            {[...Array(productsPerPage)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
            ))}
          </div>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className={`w-full ${gridLocationClasses[gridLocation]}`}>
          {showTitle && <h2 className={`text-2xl font-bold mb-6 ${titleAlignmentClasses[titleAlignment]}`}>{title}</h2>}
          <div className="text-center py-12 text-gray-500">No products found in this category.</div>
        </div>
      );
    }

    return (
      <div className={`w-full ${gridLocationClasses[gridLocation]}`}>
        {showTitle && <h2 className={`text-2xl font-bold mb-6 ${titleAlignmentClasses[titleAlignment]}`}>{title}</h2>}
        {showSortFilter && <SortFilterControls />}
        <div 
          style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }} 
          className={`${gapClasses[gap]} w-full`}
        >
          {products.map((product) => {
            // Use product card template if available, otherwise show fallback
            if (productCardTemplate?.puckData?.root?.props) {
              console.log('[CategoryProductsGrid] Rendering product with template:', product.id);
              
              // Transform Puck props to ProductCardTemplate format
              const templateProps = productCardTemplate.puckData.root.props;
              const transformedTemplate = {
                id: productCardTemplate.id || "product-card",
                name: productCardTemplate.templateName || "Product Card",
                type: "PRODUCT_CARD",
                layout: templateProps.layout || 'vertical',
                imageGallery: {
                  enabled: true,
                  showSwiper: templateProps.enableSwiper ?? true,
                  aspectRatio: templateProps.aspectRatio || 'square',
                  borderRadius: templateProps.borderRadius || 'md',
                  shadow: templateProps.showShadow ?? false,
                  hoverZoom: templateProps.hoverZoom ?? false,
                },
                title: {
                  show: templateProps.showTitle ?? true,
                  textSize: templateProps.titleSize || 'text-lg',
                  fontWeight: templateProps.titleWeight || 'semibold',
                  textAlign: templateProps.titleAlign || 'left',
                },
                price: {
                  show: templateProps.showPrice ?? true,
                  textSize: templateProps.priceSize || 'text-base',
                  priceColor: templateProps.priceColor || '#000000',
                  showCompareAt: templateProps.showCompareAtPrice ?? true,
                  showSavingsBadge: templateProps.showSavingsBadge ?? true,
                },
                badges: {
                  enabled: templateProps.showBadges ?? true,
                  showSale: templateProps.showSaleBadge ?? true,
                  showNew: templateProps.showNewBadge ?? false,
                  showLowStock: templateProps.showLowStockBadge ?? true,
                  position: templateProps.badgePosition || 'top-left',
                },
                addToCart: {
                  show: templateProps.showAddToCart ?? true,
                  buttonText: templateProps.addToCartText || 'Add to Cart',
                  buttonStyle: templateProps.buttonStyle || 'filled',
                  buttonSize: templateProps.buttonSize || 'md',
                  showIcon: templateProps.showCartIcon ?? true,
                },
                styling: {
                  cardRadius: templateProps.cardRadius || 'md',
                  cardBorder: templateProps.cardBorder || 'none',
                  cardShadow: templateProps.cardShadow ?? false,
                  cardBackground: templateProps.cardBackground || '#ffffff',
                  accentColor: templateProps.accentColor || '#000000',
                  fontFamily: templateProps.fontFamily || 'inherit',
                },
              };
              
              return (
                <div key={product.id} className="w-full max-w-full min-w-0 overflow-hidden">
                  <ProductCard 
                    product={product} 
                    region={region}
                    template={transformedTemplate}
                    countryCode={countryCode}
                  />
                </div>
              );
            }
            
            // Fallback: No template available
            console.warn('[CategoryProductsGrid] No product card template available for product:', product.id);
            return (
              <div key={product.id} className="border rounded-lg p-4 w-full max-w-full min-w-0">
                <div className="text-center text-gray-500">
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-sm">Product card template not configured</p>
                </div>
              </div>
            );
          })}
        </div>
        <PaginationControls />
      </div>
    );
  },
};
