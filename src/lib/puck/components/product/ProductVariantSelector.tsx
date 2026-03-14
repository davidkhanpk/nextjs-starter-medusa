"use client"

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { useState, useEffect } from "react";
import { HttpTypes } from "@medusajs/types";

export interface ProductVariantSelectorProps {
  selectorStyle: "dropdown" | "buttons" | "color-swatches";
  showLabels: boolean;
  showStock: boolean;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  paddingX?: string;
  paddingY?: string;
}

export const ProductVariantSelector: ComponentConfig<ProductVariantSelectorProps> = {
  label: "Product Variant Selector",

  fields: {
    selectorStyle: {
      type: "select",
      label: "Selector Style",
      options: [
        { label: "Dropdown", value: "dropdown" },
        { label: "Buttons", value: "buttons" },
        { label: "Color Swatches", value: "color-swatches" },
      ],
    },
    showLabels: {
      type: "radio",
      label: "Show Option Labels",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: "false" },
      ],
    },
    showStock: {
      type: "radio",
      label: "Show Stock Status",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
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
    selectorStyle: "buttons",
    showLabels: true,
    showStock: true,
    marginTop: "mt-4",
    marginBottom: "mb-4",
    marginLeft: "ml-0",
    marginRight: "mr-0",
    paddingX: "px-0",
    paddingY: "py-0",
  },

  render: ({ selectorStyle, showLabels, showStock, marginTop, marginBottom, marginLeft, marginRight, paddingX, paddingY }) => {
    const { product, selectedOptions, setSelectedOptions, setSelectedVariant, selectedVariant } = useProduct()

    if (!product || !product.variants || product.variants.length === 0) {
      return <div className="text-gray-400 italic">No variants available</div>;
    }

    // If product has only one variant and no options, don't show selector
    if (product.variants.length === 1 && (!product.options || product.options.length === 0)) {
      return <div />;
    }

    // Extract all unique options
    const options = product.options || []

    // Initialize selected options on mount
    useEffect(() => {
      if (options.length > 0 && Object.keys(selectedOptions).length === 0) {
        const initialOptions: Record<string, string> = {}
        options.forEach((option) => {
          if (option.values && option.values.length > 0) {
            initialOptions[option.id] = option.values[0].value
          }
        })
        setSelectedOptions(initialOptions)
      }
    }, [options, selectedOptions, setSelectedOptions])

    // Find matching variant when options change
    useEffect(() => {
      console.log('[ProductVariantSelector] Options changed:', selectedOptions);
      console.log('[ProductVariantSelector] Required options count:', options.length);
      
      if (Object.keys(selectedOptions).length === options.length) {
        console.log('[ProductVariantSelector] All options selected, finding variant...');
        const matchingVariant = product.variants?.find((variant) => {
          const matches = variant.options?.every((variantOption) => {
            const optionId = variantOption.option_id;
            const value = variantOption.value;
            const selected = selectedOptions[optionId];
            console.log(`[ProductVariantSelector] Checking ${optionId}: ${selected} === ${value}?`, selected === value);
            return optionId && value && selected === value;
          });
          if (matches) {
            console.log('[ProductVariantSelector] ✓ Found matching variant:', variant.id);
          }
          return matches;
        });
        
        if (!matchingVariant) {
          console.log('[ProductVariantSelector] ✗ No matching variant found');
        }
        
        setSelectedVariant(matchingVariant || null);
      }
    }, [selectedOptions, product.variants, options, setSelectedVariant])

    const handleOptionChange = (optionId: string, value: string) => {
      console.log('[ProductVariantSelector] Option changed:', optionId, '=', value);
      const newOptions = {
        ...selectedOptions,
        [optionId]: value,
      };
      console.log('[ProductVariantSelector] New options:', newOptions);
      setSelectedOptions(newOptions);
    }

    const renderOption = (option: any) => {
      const selectedValue = selectedOptions[option.id]

      if (selectorStyle === "dropdown") {
        return (
          <div key={option.id} className="mb-4">
            {showLabels && (
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {option.title}
              </label>
            )}
            <select
              value={selectedValue || ""}
              onChange={(e) => handleOptionChange(option.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {option.values?.map((value: any) => (
                <option key={value.id} value={value.value}>
                  {value.value}
                </option>
              ))}
            </select>
          </div>
        )
      }

      if (selectorStyle === "buttons") {
        return (
          <div key={option.id} className="mb-4">
            {showLabels && (
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {option.title}
              </label>
            )}
            <div className="flex flex-wrap gap-2">
              {option.values?.map((value: any) => {
                const isSelected = selectedValue === value.value
                return (
                  <button
                    key={value.id}
                    onClick={() => handleOptionChange(option.id, value.value)}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {value.value}
                  </button>
                )
              })}
            </div>
          </div>
        )
      }

      if (selectorStyle === "color-swatches") {
        return (
          <div key={option.id} className="mb-4">
            {showLabels && (
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {option.title}
              </label>
            )}
            <div className="flex flex-wrap gap-2">
              {option.values?.map((value: any) => {
                const isSelected = selectedValue === value.id
                const colorValue = value.metadata?.color || value.value.toLowerCase()
                
                return (
                  <button
                    key={value.id}
                    onClick={() => handleOptionChange(option.id, value.id)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: colorValue }}
                    title={value.value}
                  />
                )
              })}
            </div>
          </div>
        )
      }

      return null
    }

    return (
      <div className={`space-y-4 ${marginTop || ''} ${marginBottom || ''} ${marginLeft || ''} ${marginRight || ''} ${paddingX || ''} ${paddingY || ''}`}>
        {options.map((option) => renderOption(option))}
        
        {showStock && selectedVariant && (
          <div className="mt-4 text-sm">
            {selectedVariant.inventory_quantity && selectedVariant.inventory_quantity > 0 ? (
              <span className="text-green-600">
                ✓ In stock ({selectedVariant.inventory_quantity} available)
              </span>
            ) : (
              <span className="text-red-600">✗ Out of stock</span>
            )}
          </div>
        )}
      </div>
    );
  },
};
