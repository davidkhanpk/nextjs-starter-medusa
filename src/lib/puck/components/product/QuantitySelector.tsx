'use client';

import { ComponentConfig } from "@measured/puck";
import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useProduct } from "@lib/hooks/useProduct";

export interface QuantitySelectorProps {
  showLabel?: boolean;
  labelText?: string;
  minQuantity?: number;
  maxQuantity?: number;
  defaultQuantity?: number;
  size?: "small" | "medium" | "large";
  style?: "default" | "minimal" | "rounded";
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  paddingX?: string;
  paddingY?: string;
}

export const QuantitySelector: ComponentConfig<QuantitySelectorProps> = {
  label: "Quantity Selector",

  fields: {
    showLabel: {
      type: "radio",
      label: "Show Label",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    labelText: {
      type: "text",
      label: "Label Text",
    },
    minQuantity: {
      type: "number",
      label: "Minimum Quantity",
    },
    maxQuantity: {
      type: "number",
      label: "Maximum Quantity",
    },
    defaultQuantity: {
      type: "number",
      label: "Default Quantity",
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Default", value: "default" },
        { label: "Minimal", value: "minimal" },
        { label: "Rounded", value: "rounded" },
      ],
    },
    marginTop: {
      type: "select",
      label: "Margin Top",
      options: [
        { label: "None", value: "mt-0" },
        { label: "Small", value: "mt-2" },
        { label: "Medium", value: "mt-4" },
        { label: "Large", value: "mt-6" },
        { label: "Extra Large", value: "mt-8" },
      ],
    },
    marginBottom: {
      type: "select",
      label: "Margin Bottom",
      options: [
        { label: "None", value: "mb-0" },
        { label: "Small", value: "mb-2" },
        { label: "Medium", value: "mb-4" },
        { label: "Large", value: "mb-6" },
        { label: "Extra Large", value: "mb-8" },
      ],
    },
    marginLeft: {
      type: "select",
      label: "Margin Left",
      options: [
        { label: "None", value: "ml-0" },
        { label: "Small", value: "ml-2" },
        { label: "Medium", value: "ml-4" },
        { label: "Large", value: "ml-6" },
      ],
    },
    marginRight: {
      type: "select",
      label: "Margin Right",
      options: [
        { label: "None", value: "mr-0" },
        { label: "Small", value: "mr-2" },
        { label: "Medium", value: "mr-4" },
        { label: "Large", value: "mr-6" },
      ],
    },
    paddingX: {
      type: "select",
      label: "Padding Horizontal",
      options: [
        { label: "None", value: "px-0" },
        { label: "Small", value: "px-2" },
        { label: "Medium", value: "px-4" },
        { label: "Large", value: "px-6" },
      ],
    },
    paddingY: {
      type: "select",
      label: "Padding Vertical",
      options: [
        { label: "None", value: "py-0" },
        { label: "Small", value: "py-2" },
        { label: "Medium", value: "py-4" },
        { label: "Large", value: "py-6" },
      ],
    },
  },

  defaultProps: {
    showLabel: true,
    labelText: "Quantity",
    minQuantity: 1,
    maxQuantity: 99,
    defaultQuantity: 1,
    size: "medium",
    style: "default",
    marginTop: "mt-4",
    marginBottom: "mb-4",
    marginLeft: "ml-0",
    marginRight: "mr-0",
    paddingX: "px-0",
    paddingY: "py-0",
  },

  render: ({
    showLabel,
    labelText,
    minQuantity = 1,
    maxQuantity = 99,
    defaultQuantity = 1,
    size = "medium",
    style = "default",
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingX,
    paddingY,
  }: QuantitySelectorProps) => {
    const { quantity: contextQuantity, setQuantity: setContextQuantity } = useProduct();
    const [localQuantity, setLocalQuantity] = useState(defaultQuantity);
    
    // Use context quantity if available (on product page), otherwise use local state (in editor)
    const quantity = contextQuantity !== undefined ? contextQuantity : localQuantity;
    const setQuantity = setContextQuantity || setLocalQuantity;

    // Sync default quantity on mount
    useEffect(() => {
      if (defaultQuantity !== quantity) {
        setQuantity(defaultQuantity);
      }
    }, []);

    const increment = () => {
      if (quantity < maxQuantity) {
        setQuantity(quantity + 1);
      }
    };

    const decrement = () => {
      if (quantity > minQuantity) {
        setQuantity(quantity - 1);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value) || minQuantity;
      if (value >= minQuantity && value <= maxQuantity) {
        setQuantity(value);
      }
    };

    const sizeClasses = {
      small: "h-8 text-sm",
      medium: "h-10 text-base",
      large: "h-12 text-lg",
    };

    const buttonSizeClasses = {
      small: "w-8 h-8",
      medium: "w-10 h-10",
      large: "w-12 h-12",
    };

    const iconSizeClasses = {
      small: "w-3 h-3",
      medium: "w-4 h-4",
      large: "w-5 h-5",
    };

    const containerBorderClasses = {
      default: "border border-gray-300 rounded-lg shadow-sm",
      minimal: "border-b border-gray-300",
      rounded: "border border-gray-300 rounded-full shadow-sm",
    };

    return (
      <div className={`quantity-selector ${marginTop || ''} ${marginBottom || ''} ${marginLeft || ''} ${marginRight || ''} ${paddingX || ''} ${paddingY || ''}`}>
        {showLabel && (
          <label className="block text-sm font-medium text-gray-800 mb-2">
            {labelText}
          </label>
        )}
        <div className={`inline-flex items-center ${containerBorderClasses[style] || 'border border-gray-300 rounded-lg shadow-sm'} bg-white overflow-hidden hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-all duration-200`}>
          <button
            type="button"
            onClick={decrement}
            disabled={quantity <= minQuantity}
            className={`
              ${buttonSizeClasses[size] || 'w-10 h-10'}
              flex items-center justify-center
              text-gray-600 hover:text-gray-900 hover:bg-gray-100
              disabled:opacity-30 disabled:cursor-not-allowed
              active:scale-95
              transition-all duration-150
              border-r border-gray-200
            `}
            aria-label="Decrease quantity"
          >
            <Minus className={iconSizeClasses[size] || 'w-4 h-4'} />
          </button>

          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min={minQuantity}
            max={maxQuantity}
            className={`
              ${sizeClasses[size] || 'h-10 text-base'}
              w-16 text-center font-semibold text-gray-900
              border-none focus:outline-none
              appearance-none bg-transparent
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
            `}
            aria-label="Quantity"
          />

          <button
            type="button"
            onClick={increment}
            disabled={quantity >= maxQuantity}
            className={`
              ${buttonSizeClasses[size] || 'w-10 h-10'}
              flex items-center justify-center
              text-gray-600 hover:text-gray-900 hover:bg-gray-100
              disabled:opacity-30 disabled:cursor-not-allowed
              active:scale-95
              transition-all duration-150
              border-l border-gray-200
            `}
            aria-label="Increase quantity"
          >
            <Plus className={iconSizeClasses[size] || 'w-4 h-4'} />
          </button>
        </div>
      </div>
    );
  },
};
