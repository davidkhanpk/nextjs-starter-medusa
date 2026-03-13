/**
 * Template Type Definitions for Storefront
 * These mirror the backend types but are optimized for frontend consumption
 */

export type TemplateType = 
  | 'PRODUCT_PAGE'
  | 'PRODUCT_CARD'
  | 'COLLECTION_PAGE'
  | 'CATEGORY_PAGE'
  | 'CART_PAGE'
  | 'CHECKOUT_PAGE'
  | 'ACCOUNT_PAGE'
  | 'ORDER_CONFIRMATION_PAGE'
  | 'HOMEPAGE'
  | 'HEADER'
  | 'FOOTER'
  | 'SIDEBAR';

export * from './types-advanced';

export interface CartTemplate {
  id: string;
  templateName: string;
  zones: {
    layout: {
      type: 'single-column' | 'two-column';
      showBreadcrumbs: boolean;
      itemsPosition: 'left' | 'right';
    };
    cartItems: {
      showProductImage: boolean;
      showProductTitle: boolean;
      showVariantInfo: boolean;
      showQuantitySelector: boolean;
      showRemoveButton: boolean;
      showPriceBreakdown: boolean;
    };
    summary: {
      showSubtotal: boolean;
      showShipping: boolean;
      showTax: boolean;
      showDiscount: boolean;
      showTotal: boolean;
      position: 'right' | 'bottom';
    };
    actions: {
      continueShoppingText: string;
      continueShoppingUrl: string;
      checkoutButtonText: string;
      showEmptyCartButton: boolean;
    };
  };
  settings: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    spacing: 'compact' | 'normal' | 'relaxed';
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    animations: {
      enabled: boolean;
      type: 'fade' | 'slide' | 'none';
    };
  };
}

export interface CheckoutTemplate {
  id: string;
  templateName: string;
  zones: {
    layout: {
      type: 'single-page' | 'multi-step';
      steps: Array<{
        id: string;
        title: string;
        icon?: string;
      }>;
    };
    shippingInfo: {
      showAddressAutocomplete: boolean;
      showSaveAddressCheckbox: boolean;
      requiredFields: string[];
    };
    paymentInfo: {
      acceptedMethods: string[];
      showSavedCards: boolean;
      showSecurityBadges: boolean;
    };
    orderReview: {
      showProductImages: boolean;
      showEditLinks: boolean;
      showOrderSummary: boolean;
    };
  };
  settings: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    spacing: 'compact' | 'normal' | 'relaxed';
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    progressIndicator: {
      style: 'steps' | 'bar' | 'dots';
      position: 'top' | 'left' | 'none';
    };
  };
}

export interface OrderConfirmationTemplate {
  id: string;
  templateName: string;
  zones: {
    header: {
      showSuccessIcon: boolean;
      successMessage: string;
      showOrderNumber: boolean;
      showEstimatedDelivery: boolean;
    };
    orderDetails: {
      showProductImages: boolean;
      showProductQuantity: boolean;
      showProductPrice: boolean;
      showShippingAddress: boolean;
      showBillingAddress: boolean;
      showPaymentMethod: boolean;
    };
    nextSteps: {
      showTrackingLink: boolean;
      showPrintButton: boolean;
      showContinueShoppingButton: boolean;
      showAccountLink: boolean;
    };
  };
  settings: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      success: string;
    };
    spacing: 'compact' | 'normal' | 'relaxed';
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    animations: {
      showConfetti: boolean;
      showCheckAnimation: boolean;
    };
  };
}

export interface CollectionTemplate {
  id: string;
  templateName: string;
  zones: {
    header: {
      showTitle: boolean;
      showDescription: boolean;
      showBanner: boolean;
      showBreadcrumbs: boolean;
    };
    filters: {
      position: 'left' | 'top' | 'drawer';
      showPriceRange: boolean;
      showCategories: boolean;
      showBrands: boolean;
      showColors: boolean;
      showSizes: boolean;
      collapsible: boolean;
    };
    products: {
      gridColumns: 2 | 3 | 4;
      showQuickView: boolean;
      showAddToCart: boolean;
      showWishlist: boolean;
      showCompare: boolean;
      imageAspectRatio: '1:1' | '4:3' | '16:9';
    };
    sorting: {
      showSortBy: boolean;
      defaultSort: 'newest' | 'price-asc' | 'price-desc' | 'popular';
      availableOptions: string[];
    };
    pagination: {
      type: 'numbers' | 'load-more' | 'infinite';
      itemsPerPage: number;
    };
  };
  settings: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    spacing: 'compact' | 'normal' | 'relaxed';
    borderRadius: 'none' | 'small' | 'medium' | 'large';
    hoverEffects: {
      enabled: boolean;
      type: 'lift' | 'zoom' | 'fade';
    };
  };
}

export type Template = CartTemplate | CheckoutTemplate | OrderConfirmationTemplate | CollectionTemplate;

export interface TemplateResponse {
  id: string;
  templateType: string;
  templateName: string;
  zones: any;
  settings: any;
  status: string;
  isDefault: boolean;
  isPredefined?: boolean;
  puckData?: {
    content: any[];
    root: any;
    zones?: Record<string, any[]>;
    context?: Record<string, any>;
  };
  theme?: {
    globalSettings?: Record<string, any>;
  };
}
