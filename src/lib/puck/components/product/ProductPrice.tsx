"use client"

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { getProductPrice } from "@lib/util/get-product-price";

export interface ProductPriceProps {
  fontSize: "sm" | "md" | "lg" | "xl" | "2xl";
  color: "default" | "black" | "gray" | "primary";
  showComparePrice: boolean;
  layout: "horizontal" | "vertical";
  fontWeight: "normal" | "medium" | "semibold" | "bold";
  showSavingsPercentage: boolean;
}

export const ProductPrice: ComponentConfig<ProductPriceProps> = {
  label: "Product Price",

  fields: {
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "X-Large", value: "xl" },
        { label: "2X-Large", value: "2xl" },
      ],
    },
    color: {
      type: "select",
      label: "Color",
      options: [
        { label: "Theme Default", value: "default" },
        { label: "Black", value: "black" },
        { label: "Gray", value: "gray" },
        { label: "Primary", value: "primary" },
      ],
    },
    showComparePrice: {
      type: "radio",
      label: "Show Compare Price",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    layout: {
      type: "radio",
      label: "Layout",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semibold", value: "semibold" },
        { label: "Bold", value: "bold" },
      ],
    },
    showSavingsPercentage: {
      type: "radio",
      label: "Show Savings Percentage",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    fontSize: "xl",
    color: "black",
    showComparePrice: true,
    layout: "horizontal",
    fontWeight: "semibold",
    showSavingsPercentage: true,
  },

  render: ({ fontSize, color, showComparePrice, layout, fontWeight, showSavingsPercentage }) => {
    const { product, region } = useProduct()

    if (!product || !product.variants || product.variants.length === 0) {
      return <div className="text-gray-400 italic">Product price will appear here</div>;
    }

    // Get price for cheapest variant (or selected variant if available)
    const { cheapestPrice, variantPrice } = getProductPrice({ product })
    const priceData = variantPrice || cheapestPrice
    
    if (!priceData) {
      return <div className="text-gray-400 italic">Price not available</div>;
    }

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    };

    const colorClasses = {
      default: "text-gray-900",
      black: "text-black",
      gray: "text-gray-700",
      primary: "text-blue-600",
    };

    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const layoutClasses = layout === "horizontal" ? "flex items-center gap-3" : "flex flex-col gap-1";

    // Check if on sale
    const isOnSale = priceData.price_type === "sale" && priceData.percentage_diff

    return (
      <div className={layoutClasses}>
        <span className={`${sizeClasses[fontSize] || 'text-xl'} ${colorClasses[color] || 'text-black'} ${weightClasses[fontWeight] || 'font-semibold'}`}>
          {priceData.calculated_price}
        </span>
        
        {showComparePrice && isOnSale && priceData.original_price && (
          <span className="text-gray-500 line-through text-sm">
            {priceData.original_price}
          </span>
        )}
        
        {isOnSale && showSavingsPercentage && priceData.percentage_diff && (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
            Save {priceData.percentage_diff}
          </span>
        )}
      </div>
    );
  },
};
