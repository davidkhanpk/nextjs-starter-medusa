import { ComponentConfig } from "@measured/puck";
import React from "react";
import { ProductCard as ProductCardRenderer } from "../product-card/ProductCardRenderer";
import { retrieveProduct } from "@lib/data/products";

// ProductCardTemplate type is defined inline in ProductCard.tsx
interface ProductCardTemplate {
  id: string;
  name: string;
  type?: string;
  layout: 'vertical' | 'horizontal' | 'compact' | 'spacious';
  imageGallery: {
    enabled: boolean;
    showSwiper: boolean;
    aspectRatio: string;
    borderRadius: string;
    shadow: boolean;
    hoverZoom: boolean;
  };
  title: {
    show: boolean;
    textSize: string;
    fontWeight: string;
    textAlign: string;
  };
  price: {
    show: boolean;
    textSize: string;
    priceColor: string;
    showCompareAt: boolean;
    showSavingsBadge: boolean;
  };
  badges: {
    enabled: boolean;
    showSale: boolean;
    showNew: boolean;
    showLowStock: boolean;
    position: string;
  };
  addToCart: {
    show: boolean;
    buttonText: string;
    buttonStyle: string;
    buttonSize: string;
    showIcon: boolean;
  };
  styling: {
    cardRadius: string;
    cardBorder: string;
    cardShadow: boolean;
    cardBackground: string;
    accentColor: string;
    fontFamily: string;
  };
}

export interface ProductCardProps {
  // Layout
  layout: "vertical" | "horizontal" | "compact" | "spacious";
  
  // Image Gallery
  enableSwiper: boolean;
  aspectRatio: "square" | "portrait" | "landscape";
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
  showShadow: boolean;
  hoverZoom: boolean;
  
  // Title
  showTitle: boolean;
  titleSize: "sm" | "base" | "lg" | "xl" | "2xl";
  titleWeight: "normal" | "medium" | "semibold" | "bold";
  titleAlign: "left" | "center" | "right";
  
  // Price
  showPrice: boolean;
  priceSize: "sm" | "base" | "lg" | "xl";
  priceColor: string;
  showCompareAtPrice: boolean;
  showSavingsBadge: boolean;
  
  // Badges
  showBadges: boolean;
  showSaleBadge: boolean;
  showNewBadge: boolean;
  showLowStockBadge: boolean;
  badgePosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  
  // Add to Cart
  showAddToCart: boolean;
  buttonText: string;
  buttonStyle: "filled" | "outline" | "ghost";
  buttonSize: "sm" | "md" | "lg";
  showCartIcon: boolean;
  
  // Styling
  cardRadius: "none" | "sm" | "md" | "lg" | "xl";
  cardBorder: "none" | "sm" | "md" | "lg";
  cardShadow: boolean;
  cardBackground: string;
  accentColor: string;
  fontFamily: string;
  
  // Product Data (will be populated from external data)
  productId?: string;
}

export const ProductCard: ComponentConfig<ProductCardProps> = {
  label: "Product Card",
  
  resolveData: async (data, { changed }) => {
    // Only fetch if productId has changed or is set
    if (!data.props.productId) {
      return { props: data.props };
    }

    try {
      // Fetch real product from Medusa using SDK
      const product = await retrieveProduct(data.props.productId);
      
      if (!product) {
        console.error('Product not found:', data.props.productId);
        return { props: data.props };
      }

      // Return the fetched product data
      return {
        props: data.props,
        readOnly: {
          product: product,
        },
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return { props: data.props };
    }
  },
  
  fields: {
    // Layout Section
    layout: {
      type: "select",
      label: "Card Layout",
      options: [
        { label: "Vertical", value: "vertical" },
        { label: "Horizontal", value: "horizontal" },
        { label: "Compact", value: "compact" },
        { label: "Spacious", value: "spacious" },
      ],
    },
    
    // Image Gallery Section
    enableSwiper: {
      type: "radio",
      label: "Image Gallery Type",
      options: [
        { label: "Single Image", value: false },
        { label: "Image Carousel (Swiper)", value: true },
      ],
    },
    aspectRatio: {
      type: "select",
      label: "Image Aspect Ratio",
      options: [
        { label: "Square (1:1)", value: "square" },
        { label: "Portrait (3:4)", value: "portrait" },
        { label: "Landscape (16:9)", value: "landscape" },
      ],
    },
    borderRadius: {
      type: "select",
      label: "Image Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Full", value: "full" },
      ],
    },
    showShadow: {
      type: "radio",
      label: "Image Shadow",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    hoverZoom: {
      type: "radio",
      label: "Hover Zoom Effect",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Title Section
    showTitle: {
      type: "radio",
      label: "Show Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    titleSize: {
      type: "select",
      label: "Title Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
        { label: "XLarge", value: "xl" },
        { label: "2XLarge", value: "2xl" },
      ],
    },
    titleWeight: {
      type: "select",
      label: "Title Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semibold", value: "semibold" },
        { label: "Bold", value: "bold" },
      ],
    },
    titleAlign: {
      type: "select",
      label: "Title Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    
    // Price Section
    showPrice: {
      type: "radio",
      label: "Show Price",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    priceSize: {
      type: "select",
      label: "Price Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
        { label: "XLarge", value: "xl" },
      ],
    },
    priceColor: {
      type: "text",
      label: "Price Color (hex)",
    },
    showCompareAtPrice: {
      type: "radio",
      label: "Show Compare At Price",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showSavingsBadge: {
      type: "radio",
      label: "Show Savings Badge",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Badges Section
    showBadges: {
      type: "radio",
      label: "Enable Badges",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showSaleBadge: {
      type: "radio",
      label: "Show Sale Badge",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showNewBadge: {
      type: "radio",
      label: "Show New Badge",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showLowStockBadge: {
      type: "radio",
      label: "Show Low Stock Badge",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    badgePosition: {
      type: "select",
      label: "Badge Position",
      options: [
        { label: "Top Left", value: "top-left" },
        { label: "Top Right", value: "top-right" },
        { label: "Bottom Left", value: "bottom-left" },
        { label: "Bottom Right", value: "bottom-right" },
      ],
    },
    
    // Add to Cart Section
    showAddToCart: {
      type: "radio",
      label: "Show Add to Cart",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    buttonStyle: {
      type: "select",
      label: "Button Style",
      options: [
        { label: "Filled", value: "filled" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
      ],
    },
    buttonSize: {
      type: "select",
      label: "Button Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    showCartIcon: {
      type: "radio",
      label: "Show Cart Icon",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Styling Section
    cardRadius: {
      type: "select",
      label: "Card Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "XLarge", value: "xl" },
      ],
    },
    cardBorder: {
      type: "select",
      label: "Card Border",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    cardShadow: {
      type: "radio",
      label: "Card Shadow",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    cardBackground: {
      type: "text",
      label: "Card Background (hex)",
    },
    accentColor: {
      type: "text",
      label: "Accent Color (hex)",
    },
    fontFamily: {
      type: "text",
      label: "Font Family",
    },
    
    // Product Data
    productId: {
      type: "text",
      label: "Product ID (optional - for testing)",
    },
  },
  
  defaultProps: {
    layout: "vertical",
    enableSwiper: true,
    aspectRatio: "square",
    borderRadius: "md",
    showShadow: true,
    hoverZoom: true,
    showTitle: true,
    titleSize: "lg",
    titleWeight: "semibold",
    titleAlign: "left",
    showPrice: true,
    priceSize: "lg",
    priceColor: "#000000",
    showCompareAtPrice: true,
    showSavingsBadge: true,
    showBadges: true,
    showSaleBadge: true,
    showNewBadge: true,
    showLowStockBadge: true,
    badgePosition: "top-right",
    showAddToCart: true,
    buttonText: "Add to Cart",
    buttonStyle: "filled",
    buttonSize: "md",
    showCartIcon: true,
    cardRadius: "lg",
    cardBorder: "sm",
    cardShadow: true,
    cardBackground: "#ffffff",
    accentColor: "#000000",
    fontFamily: "inherit",
  },
  
  render: ({ puck, ...props }) => {
    // Convert Puck props to ProductCardTemplate format
    const template: ProductCardTemplate = {
      id: "puck-product-card",
      name: "Puck Product Card",
      type: "PRODUCT_PAGE",
      layout: props.layout,
      imageGallery: {
        enabled: true,
        showSwiper: props.enableSwiper,
        aspectRatio: props.aspectRatio,
        borderRadius: props.borderRadius,
        shadow: props.showShadow,
        hoverZoom: props.hoverZoom,
      },
      title: {
        show: props.showTitle,
        textSize: props.titleSize,
        fontWeight: props.titleWeight,
        textAlign: props.titleAlign,
      },
      price: {
        show: props.showPrice,
        textSize: props.priceSize,
        priceColor: props.priceColor,
        showCompareAt: props.showCompareAtPrice,
        showSavingsBadge: props.showSavingsBadge,
      },
      badges: {
        enabled: props.showBadges,
        showSale: props.showSaleBadge,
        showNew: props.showNewBadge,
        showLowStock: props.showLowStockBadge,
        position: props.badgePosition,
      },
      addToCart: {
        show: props.showAddToCart,
        buttonText: props.buttonText,
        buttonStyle: props.buttonStyle,
        buttonSize: props.buttonSize,
        showIcon: props.showCartIcon,
      },
      styling: {
        cardRadius: props.cardRadius,
        cardBorder: props.cardBorder,
        cardShadow: props.cardShadow,
        cardBackground: props.cardBackground,
        accentColor: props.accentColor,
        fontFamily: props.fontFamily,
      },
    };
    
    // Use real product data from resolveData, or fallback to mock for preview
    const product = puck.readOnly?.product || {
      id: "mock-product",
      title: "Sample Product (Select a Product ID to load real data)",
      variants: [{
        calculated_price: { amount: 9999, currency_code: "USD" },
        original_price: { amount: 12999, currency_code: "USD" },
      }],
      images: [
        { url: "https://via.placeholder.com/400x400?text=Product+Image+1" },
        { url: "https://via.placeholder.com/400x400?text=Product+Image+2" },
      ],
      inventory_quantity: 10,
      created_at: new Date().toISOString(),
    };
    
    return (
      <div className="puck-product-card-wrapper">
        <ProductCardRenderer product={product} template={template} />
      </div>
    );
  },
};

export default ProductCard;
