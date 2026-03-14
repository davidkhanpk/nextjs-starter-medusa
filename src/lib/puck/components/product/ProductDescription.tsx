"use client"

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";

export interface ProductDescriptionProps {
  fontSize: "sm" | "base" | "lg";
  color: "default" | "gray" | "black";
  lineHeight: "tight" | "normal" | "relaxed";
  maxWidth: "full" | "prose" | "narrow";
  // Spacing properties
  marginTop: string;
  marginBottom: string;
  paddingX: string;
  paddingY: string;
}

export const ProductDescription: ComponentConfig<ProductDescriptionProps> = {
  label: "Product Description",

  fields: {
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
      ],
    },
    color: {
      type: "select",
      label: "Text Color",
      options: [
        { label: "Default", value: "default" },
        { label: "Gray", value: "gray" },
        { label: "Black", value: "black" },
      ],
    },
    lineHeight: {
      type: "select",
      label: "Line Height",
      options: [
        { label: "Tight", value: "tight" },
        { label: "Normal", value: "normal" },
        { label: "Relaxed", value: "relaxed" },
      ],
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Full Width", value: "full" },
        { label: "Prose (readable)", value: "prose" },
        { label: "Narrow", value: "narrow" },
      ],
    },
    marginTop: {
      type: "select",
      label: "Margin Top",
      options: [
        { label: "None", value: "mt-0" },
        { label: "Small (0.5rem)", value: "mt-2" },
        { label: "Medium (1rem)", value: "mt-4" },
        { label: "Large (1.5rem)", value: "mt-6" },
        { label: "X-Large (2rem)", value: "mt-8" },
      ],
    },
    marginBottom: {
      type: "select",
      label: "Margin Bottom",
      options: [
        { label: "None", value: "mb-0" },
        { label: "Small (0.5rem)", value: "mb-2" },
        { label: "Medium (1rem)", value: "mb-4" },
        { label: "Large (1.5rem)", value: "mb-6" },
        { label: "X-Large (2rem)", value: "mb-8" },
      ],
    },
    paddingX: {
      type: "select",
      label: "Horizontal Padding",
      options: [
        { label: "None", value: "px-0" },
        { label: "Small", value: "px-2" },
        { label: "Medium", value: "px-4" },
        { label: "Large", value: "px-6" },
      ],
    },
    paddingY: {
      type: "select",
      label: "Vertical Padding",
      options: [
        { label: "None", value: "py-0" },
        { label: "Small", value: "py-2" },
        { label: "Medium", value: "py-4" },
        { label: "Large", value: "py-6" },
      ],
    },
  },

  defaultProps: {
    fontSize: "base",
    color: "gray",
    lineHeight: "normal",
    maxWidth: "prose",
    marginTop: "mt-4",
    marginBottom: "mb-4",
    paddingX: "px-0",
    paddingY: "py-0",
  },

  render: (props) => {
    const { fontSize = 'base', color = 'gray', lineHeight = 'normal', maxWidth = 'prose', marginTop = 'mt-4', marginBottom = 'mb-4', paddingX = 'px-0', paddingY = 'py-0' } = props;
    const { product } = useProduct();

    const sizeClasses = {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    };

    const colorClasses = {
      default: "text-gray-900",
      gray: "text-gray-700",
      black: "text-black",
    };

    const lineHeightClasses = {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    };

    const maxWidthClasses = {
      full: "max-w-full",
      prose: "max-w-prose",
      narrow: "max-w-2xl",
    };

    // Show visual preview even in editor
    if (!product || !product.description) {
      return (
        <div className={`${marginTop || ''} ${marginBottom || ''} ${paddingX || ''} ${paddingY || ''}`}>
          <div className={`text-gray-400 italic ${sizeClasses[fontSize] || 'text-base'} ${lineHeightClasses[lineHeight] || 'leading-normal'} ${maxWidthClasses[maxWidth] || 'max-w-prose'}`}>
            <p>Product description will appear here. This could be a detailed explanation of the product features, materials, sizing information, and care instructions.</p>
            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`
          ${sizeClasses[fontSize] || 'text-base'} 
          ${colorClasses[color] || 'text-gray-700'} 
          ${lineHeightClasses[lineHeight] || 'leading-normal'} 
          ${maxWidthClasses[maxWidth] || 'max-w-prose'} 
          ${marginTop || ''} ${marginBottom || ''} 
          ${paddingX || ''} ${paddingY || ''}
          prose prose-gray
        `}
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    );
  },
};
