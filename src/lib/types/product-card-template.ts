import { HttpTypes } from '@medusajs/types';

export interface ProductCardTemplate {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  layout: 'vertical' | 'horizontal' | 'compact' | 'spacious';
  imageGallery: {
    enabled: boolean;
    useThumbnail: boolean;
    showSwiper: boolean;
    aspectRatio: '1:1' | '4:5' | '3:4' | '16:9' | 'auto';
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    shadow: boolean;
    hoverZoom: boolean;
  };
  title: {
    show: boolean;
    clickable: boolean;
    textSize: 'sm' | 'md' | 'lg';
    fontWeight: 'normal' | 'medium' | 'bold';
    textAlign: 'left' | 'center';
    lineClamp?: number;
  };
  price: {
    show: boolean;
    showCompareAt: boolean;
    showSavingsBadge: boolean;
    textSize: 'sm' | 'md' | 'lg';
    priceColor: string;
    align: 'left' | 'center';
  };
  addToCart: {
    show: boolean;
    buttonText: string;
    buttonSize: 'sm' | 'md' | 'lg';
    buttonStyle: 'filled' | 'outline' | 'ghost';
    showIcon: boolean;
    showQuantity: boolean;
    showQuickAdd: boolean;
  };
  badges: {
    showSale: boolean;
    showNew: boolean;
    showLowStock: boolean;
    showCollection: boolean;
    showCustomBadges: boolean;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    style: 'pill' | 'rounded' | 'square';
    maxCount: number;
  };
  variants: {
    show: boolean;
    showSwatches: boolean;
    swatchSize: 'sm' | 'md' | 'lg';
    swatchShape: 'circle' | 'square' | 'rounded';
    showOutOfStock: boolean;
    disableOutOfStock: boolean;
  };
  meta: {
    showSKU: boolean;
    showType: boolean;
    showMaterial: boolean;
    showTags: boolean;
    showRating: boolean;
    showWishlist: boolean;
    showCompare: boolean;
  };
  quickView: {
    enabled: boolean;
    trigger: 'hover' | 'button';
    modalSize: 'sm' | 'md' | 'lg';
    showVariants: boolean;
    showAddToCart: boolean;
  };
  styling: {
    cardBorder: 'none' | 'light' | 'bold';
    cardBorderColor?: string;
    cardShadow: boolean;
    cardElevation?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;
    cardBackground: string;
    cardSpacing: 'compact' | 'normal' | 'relaxed';
    cardRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
    accentColor?: string;
    fontFamily?: string;
    hoverEffect?: 'scale' | 'shadow' | 'border' | 'none';
    animation?: 'fade-in' | 'slide-up' | 'zoom-in' | 'none';
    transition?: 'fast' | 'normal' | 'slow';
  };
}

// Default minimal product card template
export const DEFAULT_PRODUCT_CARD_TEMPLATE: ProductCardTemplate = {
  id: 'default',
  name: 'Default Product Card',
  enabled: true,
  layout: 'vertical',
  imageGallery: {
    enabled: true,
    useThumbnail: true,
    showSwiper: false,
    aspectRatio: '1:1',
    borderRadius: 'md',
    shadow: false,
    hoverZoom: true,
  },
  title: {
    show: true,
    clickable: true,
    textSize: 'md',
    fontWeight: 'medium',
    textAlign: 'left',
    lineClamp: 2,
  },
  price: {
    show: true,
    showCompareAt: true,
    showSavingsBadge: false,
    textSize: 'md',
    priceColor: '#000000',
    align: 'left',
  },
  addToCart: {
    show: true,
    buttonText: 'Add to Cart',
    buttonSize: 'md',
    buttonStyle: 'filled',
    showIcon: true,
    showQuantity: false,
    showQuickAdd: false,
  },
  badges: {
    showSale: true,
    showNew: false,
    showLowStock: false,
    showCollection: false,
    showCustomBadges: false,
    position: 'top-right',
    style: 'pill',
    maxCount: 2,
  },
  variants: {
    show: false,
    showSwatches: false,
    swatchSize: 'md',
    swatchShape: 'circle',
    showOutOfStock: false,
    disableOutOfStock: false,
  },
  meta: {
    showSKU: false,
    showType: false,
    showMaterial: false,
    showTags: false,
    showRating: false,
    showWishlist: false,
    showCompare: false,
  },
  quickView: {
    enabled: false,
    trigger: 'button',
    modalSize: 'md',
    showVariants: false,
    showAddToCart: false,
  },
  styling: {
    cardBorder: 'light',
    cardShadow: true,
    cardBackground: '#ffffff',
    cardSpacing: 'normal',
    cardRadius: 'md',
    hoverEffect: 'scale',
    animation: 'none',
    transition: 'normal',
  },
};
