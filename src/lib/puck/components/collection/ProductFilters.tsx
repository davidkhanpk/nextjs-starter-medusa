'use client';

import { ComponentConfig } from "@measured/puck";
import { useState, useMemo, useEffect } from "react";
import { useCollectionProducts } from "@lib/hooks/useCollectionProducts";
import { ChevronDownIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

export interface ProductFiltersProps {
  showPriceFilter: boolean;
  showCategoryFilter: boolean;
  showBrandFilter: boolean;
  showColorFilter: boolean;
  showSizeFilter: boolean;
  showRatingFilter: boolean;
  layout: "sidebar" | "top" | "drawer";
  defaultExpanded: boolean;
}

export const ProductFilters: ComponentConfig<ProductFiltersProps> = {
  label: "Product Filters",

  fields: {
    layout: {
      type: "select",
      label: "Filter Layout",
      options: [
        { label: "Sidebar", value: "sidebar" },
        { label: "Top Bar", value: "top" },
        { label: "Drawer (Mobile)", value: "drawer" },
      ],
    },
    showPriceFilter: {
      type: "radio",
      label: "Show Price Filter",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showCategoryFilter: {
      type: "radio",
      label: "Show Category Filter",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showBrandFilter: {
      type: "radio",
      label: "Show Brand Filter",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showColorFilter: {
      type: "radio",
      label: "Show Color Filter",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showSizeFilter: {
      type: "radio",
      label: "Show Size Filter",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showRatingFilter: {
      type: "radio",
      label: "Show Rating Filter",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    defaultExpanded: {
      type: "radio",
      label: "Default Expanded",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    showPriceFilter: true,
    showCategoryFilter: true,
    showBrandFilter: true,
    showColorFilter: true,
    showSizeFilter: true,
    showRatingFilter: true,
    layout: "sidebar",
    defaultExpanded: true,
  },

  render: (props) => {
    const { products, filters, updateFilters, clearFilters, isLoading } = useCollectionProducts();
    
    const [priceRange, setPriceRange] = useState([filters.price_gte || 0, filters.price_lte || 1000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.category_id || []);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(0);

    // Extract unique filter options from real products
    const { categories, brands, colors, sizes } = useMemo(() => {
      const categorySet = new Set<string>();
      const brandSet = new Set<string>();
      const colorSet = new Set<{ name: string; hex: string }>();
      const sizeSet = new Set<string>();

      products.forEach((product) => {
        // Extract categories
        if (product.categories) {
          product.categories.forEach((cat: any) => {
            if (cat.name) categorySet.add(cat.name);
          });
        }

        // Extract brands from metadata
        if (product.metadata?.brand) {
          brandSet.add(String(product.metadata.brand));
        }

        // Extract colors and sizes from variants
        product.variants?.forEach((variant: any) => {
          // Get color from variant options
          const colorOption = variant.options?.find((opt: any) => 
            opt.option?.title?.toLowerCase() === 'color'
          );
          if (colorOption?.value) {
            // Try to get color hex from metadata, fallback to basic colors
            const colorName = colorOption.value;
            const colorHex = getColorHex(colorName);
            colorSet.add({ name: colorName, hex: colorHex });
          }

          // Get size from variant options
          const sizeOption = variant.options?.find((opt: any) => 
            opt.option?.title?.toLowerCase() === 'size'
          );
          if (sizeOption?.value) {
            sizeSet.add(sizeOption.value);
          }
        });
      });

      return {
        categories: Array.from(categorySet).sort(),
        brands: Array.from(brandSet).sort(),
        colors: Array.from(colorSet),
        sizes: Array.from(sizeSet).sort((a, b) => {
          // Sort sizes in logical order
          const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'];
          return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
        }),
      };
    }, [products]);

    // Helper function to get color hex values
    const getColorHex = (colorName: string): string => {
      const colorMap: Record<string, string> = {
        black: '#000000',
        white: '#FFFFFF',
        red: '#EF4444',
        blue: '#3B82F6',
        green: '#10B981',
        yellow: '#F59E0B',
        purple: '#A855F7',
        pink: '#EC4899',
        gray: '#6B7280',
        grey: '#6B7280',
        orange: '#F97316',
        brown: '#92400E',
        navy: '#1E3A8A',
        beige: '#D4C5B9',
      };
      return colorMap[colorName.toLowerCase()] || '#9CA3AF';
    };

    // Apply filters when selections change
    useEffect(() => {
      const newFilters: any = {};
      
      if (priceRange[0] > 0) newFilters.price_gte = priceRange[0];
      if (priceRange[1] < 1000) newFilters.price_lte = priceRange[1];
      if (selectedCategories.length > 0) newFilters.category_id = selectedCategories;
      
      updateFilters(newFilters);
    }, [priceRange, selectedCategories]);

    const handleClearAll = () => {
      setPriceRange([0, 1000]);
      setSelectedCategories([]);
      setSelectedBrands([]);
      setSelectedColors([]);
      setSelectedSizes([]);
      setMinRating(0);
      clearFilters();
    };

    const FilterSection = ({ title, children, show }: any) => {
      const [isExpanded, setIsExpanded] = useState(props.defaultExpanded);
      
      if (!show) return null;

      return (
        <div className="border-b border-gray-200 py-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">{title}</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          {isExpanded && <div className="mt-4">{children}</div>}
        </div>
      );
    };

    const filterContent = (
      <div className="space-y-0">
        {/* Price Filter */}
        <FilterSection title="Price" show={props.showPriceFilter}>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        {/* Category Filter */}
        <FilterSection title="Category" show={props.showCategoryFilter}>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brand Filter */}
        <FilterSection title="Brand" show={props.showBrandFilter}>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedBrands([...selectedBrands, brand]);
                    } else {
                      setSelectedBrands(selectedBrands.filter(b => b !== brand));
                    }
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Color Filter */}
        <FilterSection title="Color" show={props.showColorFilter}>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  if (selectedColors.includes(color.name)) {
                    setSelectedColors(selectedColors.filter(c => c !== color.name));
                  } else {
                    setSelectedColors([...selectedColors, color.name]);
                  }
                }}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColors.includes(color.name) ? 'border-black' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </FilterSection>

        {/* Size Filter */}
        <FilterSection title="Size" show={props.showSizeFilter}>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  if (selectedSizes.includes(size)) {
                    setSelectedSizes(selectedSizes.filter(s => s !== size));
                  } else {
                    setSelectedSizes([...selectedSizes, size]);
                  }
                }}
                className={`px-3 py-1 border rounded ${
                  selectedSizes.includes(size)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Rating" show={props.showRatingFilter}>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`flex items-center w-full text-left py-1 ${
                  minRating === rating ? 'text-black font-medium' : 'text-gray-600'
                }`}
              >
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm">& Up</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Clear Filters */}
        <div className="pt-4">
          <button
            onClick={handleClearAll}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    );

    if (props.layout === "sidebar") {
      return (
        <div className="w-64 flex-shrink-0 pr-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          {filterContent}
        </div>
      );
    }

    if (props.layout === "top") {
      return (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filterContent}
          </div>
        </div>
      );
    }

    // Drawer layout (mobile)
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          Filters
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              {filterContent}
            </div>
          </div>
        )}
      </>
    );
  },
};
