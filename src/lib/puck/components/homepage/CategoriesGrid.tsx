import { ComponentConfig } from "@measured/puck";
import React from "react";
import { CategoriesGridClient } from './CategoriesGridClient';

export interface CategoriesGridProps {
  // Content
  sectionTitle: string;
  sectionSubtitle: string;
  showTitle: boolean;
  
  // Layout
  columns: number;
  columnsTablet: number;
  columnsMobile: number;
  gap: number;
  
  // Category Display
  showCategoryImage: boolean;
  showCategoryName: boolean;
  showProductCount: boolean;
  imageAspectRatio: "square" | "portrait" | "landscape" | "wide";
  
  // Styling
  backgroundColor: string;
  textColor: string;
  cardStyle: "minimal" | "bordered" | "shadow" | "overlay";
  borderRadius: "none" | "sm" | "md" | "lg" | "xl";
  hoverEffect: "none" | "scale" | "shadow" | "lift";
  
  // Category Selection (manual for now, will integrate with Medusa API)
  categorySource: "all" | "featured" | "manual";
  categoryIds: string;
}

export const CategoriesGrid: ComponentConfig<CategoriesGridProps> = {
  label: "Categories Grid",
  
  fields: {
    // Section Header
    sectionTitle: {
      type: "text",
      label: "Section Title",
    },
    sectionSubtitle: {
      type: "text",
      label: "Section Subtitle",
    },
    showTitle: {
      type: "radio",
      label: "Show Section Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Layout
    columns: {
      type: "number",
      label: "Columns (Desktop)",
      min: 2,
      max: 6,
    },
    columnsTablet: {
      type: "number",
      label: "Columns (Tablet)",
      min: 2,
      max: 4,
    },
    columnsMobile: {
      type: "number",
      label: "Columns (Mobile)",
      min: 1,
      max: 2,
    },
    gap: {
      type: "number",
      label: "Gap Between Items (px)",
      min: 0,
      max: 64,
    },
    
    // Display Options
    showCategoryImage: {
      type: "radio",
      label: "Show Category Image",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showCategoryName: {
      type: "radio",
      label: "Show Category Name",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showProductCount: {
      type: "radio",
      label: "Show Product Count",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    imageAspectRatio: {
      type: "select",
      label: "Image Aspect Ratio",
      options: [
        { label: "Square (1:1)", value: "square" },
        { label: "Portrait (3:4)", value: "portrait" },
        { label: "Landscape (4:3)", value: "landscape" },
        { label: "Wide (16:9)", value: "wide" },
      ],
    },
    
    // Styling
    backgroundColor: {
      type: "text",
      label: "Background Color (hex)",
    },
    textColor: {
      type: "text",
      label: "Text Color (hex)",
    },
    cardStyle: {
      type: "select",
      label: "Card Style",
      options: [
        { label: "Minimal", value: "minimal" },
        { label: "Bordered", value: "bordered" },
        { label: "Shadow", value: "shadow" },
        { label: "Image Overlay", value: "overlay" },
      ],
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    hoverEffect: {
      type: "select",
      label: "Hover Effect",
      options: [
        { label: "None", value: "none" },
        { label: "Scale Up", value: "scale" },
        { label: "Shadow", value: "shadow" },
        { label: "Lift", value: "lift" },
      ],
    },
    
    // Category Selection
    categorySource: {
      type: "select",
      label: "Category Source",
      options: [
        { label: "All Categories", value: "all" },
        { label: "Featured Categories", value: "featured" },
        { label: "Manual Selection", value: "manual" },
      ],
    },
    categoryIds: {
      type: "textarea",
      label: "Category IDs (comma-separated, for manual)",
    },
  },
  
  defaultProps: {
    sectionTitle: "Shop by Category",
    sectionSubtitle: "Browse our popular categories",
    showTitle: true,
    columns: 4,
    columnsTablet: 3,
    columnsMobile: 2,
    gap: 24,
    showCategoryImage: true,
    showCategoryName: true,
    showProductCount: true,
    imageAspectRatio: "square",
    backgroundColor: "#f9fafb",
    textColor: "#000000",
    cardStyle: "shadow",
    borderRadius: "lg",
    hoverEffect: "scale",
    categorySource: "all",
    categoryIds: "",
  },
  
  render: (props) => {
    // Use client component for actual category fetching on storefront
    return <CategoriesGridClient {...props} />;
  },
};

export default CategoriesGrid;
