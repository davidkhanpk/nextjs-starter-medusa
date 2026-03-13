import React from 'react';
import { ComponentConfig } from '@measured/puck';
import { CategoryProductsClient } from './CategoryProductsClient';

export interface CategoryProductsProps {
  // Content
  sectionTitle: string;
  sectionSubtitle: string;
  showTitle: boolean;
  
  // Category Selection
  categoryId: string;
  categoryName: string;
  
  // Display Mode
  displayMode: "grid" | "carousel";
  
  // Grid Settings
  productsPerRow: number;
  maxProducts: number;
  
  // Carousel Settings (Swiper)
  slidesPerView: number;
  slidesPerViewTablet: number;
  slidesPerViewMobile: number;
  spaceBetween: number;
  autoplay: boolean;
  autoplayDelay: number;
  loop: boolean;
  navigation: boolean;
  pagination: boolean;
  
  // Product Display
  imageAspectRatio: "square" | "portrait" | "landscape";
  showPrice: boolean;
  showAddToCart: boolean;
  showRating: boolean;
  showBadges: boolean;
  
  // CTA
  showViewAllButton: boolean;
  viewAllButtonText: string;
  
  // Styling
  backgroundColor: string;
  textColor: string;
  cardStyle: "minimal" | "bordered" | "shadow";
  borderRadius: "none" | "small" | "medium" | "large";
  buttonColor: string;
  buttonTextColor: string;
  buttonRadius: "medium" | "small" | "large" | "none";
}

export const CategoryProducts: ComponentConfig<CategoryProductsProps> = {
  fields: {
    // Content
    sectionTitle: {
      type: "text",
      label: "Section Title",
    },
    sectionSubtitle: {
      type: "textarea",
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
    
    // Category Selection
    categoryId: {
      type: "text",
      label: "Category ID",
    },
    categoryName: {
      type: "text",
      label: "Category Name (for display)",
    },
    
    // Display Mode
    displayMode: {
      type: "select",
      label: "Display Mode",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel (Swiper)", value: "carousel" },
      ],
    },
    
    // Grid Settings
    productsPerRow: {
      type: "number",
      label: "Products Per Row (Grid)",
      min: 2,
      max: 6,
    },
    maxProducts: {
      type: "number",
      label: "Maximum Products",
      min: 1,
      max: 50,
    },
    
    // Carousel Settings
    slidesPerView: {
      type: "number",
      label: "Slides Per View (Desktop)",
      min: 1,
      max: 6,
    },
    slidesPerViewTablet: {
      type: "number",
      label: "Slides Per View (Tablet)",
      min: 1,
      max: 4,
    },
    slidesPerViewMobile: {
      type: "number",
      label: "Slides Per View (Mobile)",
      min: 1,
      max: 2,
    },
    spaceBetween: {
      type: "number",
      label: "Space Between Slides (px)",
      min: 0,
      max: 100,
    },
    autoplay: {
      type: "radio",
      label: "Auto-play Carousel",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    autoplayDelay: {
      type: "number",
      label: "Auto-play Delay (ms)",
      min: 1000,
      max: 10000,
    },
    loop: {
      type: "radio",
      label: "Loop Carousel",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    navigation: {
      type: "radio",
      label: "Show Navigation Arrows",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    pagination: {
      type: "radio",
      label: "Show Pagination Dots",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Product Display
    imageAspectRatio: {
      type: "select",
      label: "Image Aspect Ratio",
      options: [
        { label: "Square (1:1)", value: "square" },
        { label: "Portrait (3:4)", value: "portrait" },
        { label: "Landscape (4:3)", value: "landscape" },
      ],
    },
    showPrice: {
      type: "radio",
      label: "Show Price",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showAddToCart: {
      type: "radio",
      label: "Show Add to Cart",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showRating: {
      type: "radio",
      label: "Show Rating",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showBadges: {
      type: "radio",
      label: "Show Badges (New/Sale)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // CTA
    showViewAllButton: {
      type: "radio",
      label: "Show View All Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    viewAllButtonText: {
      type: "text",
      label: "View All Button Text",
    },
    
    // Styling
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    cardStyle: {
      type: "select",
      label: "Card Style",
      options: [
        { label: "Minimal", value: "minimal" },
        { label: "Bordered", value: "bordered" },
        { label: "Shadow", value: "shadow" },
      ],
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    buttonColor: {
      type: "text",
      label: "Button Color",
    },
    buttonTextColor: {
      type: "text",
      label: "Button Text Color",
    },
    buttonRadius: {
      type: "select",
      label: "Button Radius",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "None", value: "none" },
      ],
    },
  },
  
  defaultProps: {
    sectionTitle: "Shop by Category",
    sectionSubtitle: "Discover our curated collection",
    showTitle: true,
    categoryId: "",
    categoryName: "",
    displayMode: "grid",
    productsPerRow: 4,
    maxProducts: 12,
    slidesPerView: 4,
    slidesPerViewTablet: 3,
    slidesPerViewMobile: 1,
    spaceBetween: 20,
    autoplay: false,
    autoplayDelay: 3000,
    loop: false,
    navigation: true,
    pagination: true,
    imageAspectRatio: "square",
    showPrice: true,
    showAddToCart: true,
    showRating: false,
    showBadges: true,
    showViewAllButton: true,
    viewAllButtonText: "View All Products",
    backgroundColor: "#f9fafb",
    textColor: "#111827",
    cardStyle: "shadow",
    borderRadius: "medium",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    buttonRadius: "medium",
  },
  
  render: (props) => {
    // Use client component for actual product fetching on storefront
    return <CategoryProductsClient {...props} />;
  },
};
