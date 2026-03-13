import { ComponentConfig } from "@measured/puck";
import React from "react";
import { FeaturedProductsClient } from './FeaturedProductsClient';

export interface FeaturedProductsProps {
  // Content
  sectionTitle: string;
  sectionSubtitle: string;
  showTitle: boolean;
  
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
  paginationStyle: "dots" | "fraction" | "progressbar";
  
  // Product Selection
  productSource: "featured" | "bestsellers" | "new" | "category" | "manual";
  categoryId: string;
  productIds: string;
  
  // Styling
  backgroundColor: string;
  textColor: string;
  cardStyle: "minimal" | "bordered" | "shadow";
  showPrice: boolean;
  showAddToCart: boolean;
  buttonText: string;
}

export const FeaturedProducts: ComponentConfig<FeaturedProductsProps> = {
  label: "Featured Products",
  
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
      label: "Show Pagination",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    paginationStyle: {
      type: "select",
      label: "Pagination Style",
      options: [
        { label: "Dots", value: "dots" },
        { label: "Fraction (1/10)", value: "fraction" },
        { label: "Progress Bar", value: "progressbar" },
      ],
    },
    
    // Product Selection
    productSource: {
      type: "select",
      label: "Product Source",
      options: [
        { label: "Featured Products", value: "featured" },
        { label: "Best Sellers", value: "bestsellers" },
        { label: "New Arrivals", value: "new" },
        { label: "From Category", value: "category" },
        { label: "Manual Selection", value: "manual" },
      ],
    },
    categoryId: {
      type: "text",
      label: "Category ID (for category source)",
    },
    productIds: {
      type: "textarea",
      label: "Product IDs (comma-separated, for manual)",
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
      label: "Show Add to Cart Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
  },
  
  defaultProps: {
    sectionTitle: "Featured Products",
    sectionSubtitle: "Check out our most popular items",
    showTitle: true,
    displayMode: "carousel",
    productsPerRow: 4,
    maxProducts: 12,
    slidesPerView: 4,
    slidesPerViewTablet: 3,
    slidesPerViewMobile: 1,
    spaceBetween: 24,
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    navigation: true,
    pagination: true,
    paginationStyle: "dots",
    productSource: "featured",
    categoryId: "",
    productIds: "",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    cardStyle: "shadow",
    showPrice: true,
    showAddToCart: true,
    buttonText: "Add to Cart",
  },
  
  render: (props) => {
    // Use client component for actual product fetching on storefront
    return <FeaturedProductsClient {...props} />;
  },
};

export default FeaturedProducts;
