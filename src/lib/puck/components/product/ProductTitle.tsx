"use client"

import React from "react"
import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";

export interface ProductTitleProps {
  tag: "h1" | "h2" | "h3" | "h4";
  fontSize: "default" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color: "default" | "black" | "gray" | "primary" | "white";
  alignment: "left" | "center" | "right";
  fontWeight: "normal" | "medium" | "semibold" | "bold";
  // Spacing properties
  marginTop: string;
  marginBottom: string;
  paddingX: string;
  paddingY: string;
}

export const ProductTitle: ComponentConfig<ProductTitleProps> = {
  label: "Product Title",

  fields: {
    tag: {
      type: "select",
      label: "HTML Tag",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
      ],
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Theme Default", value: "default" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "X-Large", value: "xl" },
        { label: "2X-Large", value: "2xl" },
        { label: "3X-Large", value: "3xl" },
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
        { label: "White", value: "white" },
      ],
    },
    alignment: {
      type: "radio",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
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
    tag: "h1",
    fontSize: "2xl",
    color: "black",
    alignment: "left",
    fontWeight: "bold",
    marginTop: "mt-0",
    marginBottom: "mb-4",
    paddingX: "px-0",
    paddingY: "py-0",
  },

  render: (props) => {
    const { tag = "h1", fontSize = "2xl", color = "black", alignment = "left", fontWeight = "bold", marginTop = 'mt-0', marginBottom = 'mb-4', paddingX = 'px-0', paddingY = 'py-0' } = props;
    const { product, theme } = useProduct()
    
    const sizeClasses = {
      default: theme?.typography?.heading?.fontSize || "text-3xl",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    };

    const colorClasses = {
      default: theme?.colors?.text || "text-gray-900",
      black: "text-black",
      gray: "text-gray-700",
      primary: theme?.colors?.primary ? `text-[${theme.colors.primary}]` : "text-blue-600",
      white: "text-white",
    };

    const alignmentClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    // Show visual preview even in editor
    if (!product) {
      const className = `
        ${sizeClasses[fontSize] || 'text-2xl'} 
        ${colorClasses[color] || 'text-black'} 
        ${alignmentClasses[alignment] || 'text-left'} 
        ${weightClasses[fontWeight] || 'font-bold'}
        ${marginTop || ''} ${marginBottom || ''}
        ${paddingX || ''} ${paddingY || ''}
        text-gray-400 italic
      `;
      const style = {
        fontFamily: theme?.typography?.heading?.fontFamily,
      };

      return React.createElement(
        tag,
        { className, style },
        "Product Title Will Appear Here"
      );
    }

    const className = `
      ${sizeClasses[fontSize] || 'text-2xl'} 
      ${colorClasses[color] || 'text-black'} 
      ${alignmentClasses[alignment] || 'text-left'} 
      ${weightClasses[fontWeight] || 'font-bold'}
      ${marginTop || ''} ${marginBottom || ''}
      ${paddingX || ''} ${paddingY || ''}
    `;
    const style = {
      fontFamily: theme?.typography?.heading?.fontFamily,
    };

    // Use React.createElement to avoid JSX dynamic tag issues
    return React.createElement(
      tag,
      { className, style },
      product.title
    );
  },
};
