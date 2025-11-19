// Storefront Theme Types

export interface StoreTheme {
  branding: ThemeBranding;
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  components: ThemeComponents;
  homepage: ThemeHomepage;
  productPage: ThemeProductPage;
  cart: ThemeCart;
  checkout: ThemeCheckout;
  advanced?: ThemeAdvanced;
}

export interface ThemeBranding {
  storeName: string;
  logo: string | null;
  favicon: string | null;
  tagline?: string;
}

export interface ThemeColors {
  // Primary
  primary: string;
  primaryHover: string;
  primaryText: string;
  
  // Secondary
  secondary: string;
  secondaryHover: string;
  secondaryText: string;
  
  // Background
  background: string;
  surface: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Border
  border: string;
  borderHover: string;
  
  // State
  success: string;
  error: string;
  warning: string;
  info: string;
}

export interface ThemeTypography {
  fontFamily: {
    heading: string;
    body: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface ThemeLayout {
  containerWidth: string;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface ThemeComponents {
  navbar: {
    height: string;
    backgroundColor: string;
    textColor: string;
    sticky: boolean;
    showSearchBar: boolean;
    showCategoryMenu: boolean;
  };
  button: {
    primaryStyle: 'solid' | 'outline' | 'ghost';
    secondaryStyle: 'solid' | 'outline' | 'ghost';
    borderRadius: string;
    paddingX: string;
    paddingY: string;
  };
  productCard: {
    borderRadius: string;
    showBorder: boolean;
    showShadow: boolean;
    hoverEffect: 'scale' | 'shadow' | 'border' | 'none';
    imageAspectRatio: 'square' | 'portrait' | 'landscape';
    showQuickView: boolean;
    showAddToCart: boolean;
  };
  footer: {
    backgroundColor: string;
    textColor: string;
    showSocialLinks: boolean;
    showNewsletter: boolean;
    layout: 'simple' | 'detailed' | 'minimal';
  };
}

export interface ThemeHomepage {
  hero: {
    enabled: boolean;
    layout: 'full-width' | 'centered' | 'split';
    height: string;
    backgroundImage?: string;
    backgroundColor?: string;
    overlayOpacity?: number;
    ctaButton: {
      text: string;
      url: string;
      style: 'primary' | 'secondary';
    };
  };
  featuredProducts: {
    enabled: boolean;
    title: string;
    collectionId?: string;
    limit: number;
  };
  categories: {
    enabled: boolean;
    title: string;
    layout: 'grid' | 'carousel';
    showImages: boolean;
  };
  testimonials?: {
    enabled: boolean;
    title: string;
    items: Array<{
      name: string;
      rating: number;
      text: string;
      image?: string;
    }>;
  };
  newsletter: {
    enabled: boolean;
    title: string;
    subtitle: string;
    placement: 'homepage' | 'footer' | 'both';
  };
}

export interface ThemeProductPage {
  layout: 'standard' | 'split' | 'gallery';
  showBreadcrumbs: boolean;
  showSku: boolean;
  showStock: boolean;
  showShipping: boolean;
  showReviews: boolean;
  relatedProducts: {
    enabled: boolean;
    title: string;
    limit: number;
  };
}

export interface ThemeCart {
  style: 'drawer' | 'page' | 'dropdown';
  showMiniCart: boolean;
  showProductImages: boolean;
  showContinueShopping: boolean;
}

export interface ThemeCheckout {
  layout: 'single-page' | 'multi-step';
  showOrderSummary: boolean;
  showSecurityBadges: boolean;
  showProgressIndicator: boolean;
}

export interface ThemeAdvanced {
  customCSS?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  customScripts?: {
    head?: string;
    body?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

// Default theme configuration
export const defaultTheme: StoreTheme = {
  branding: {
    storeName: 'My Store',
    logo: null,
    favicon: null,
  },
  colors: {
    primary: '#000000',
    primaryHover: '#1a1a1a',
    primaryText: '#ffffff',
    secondary: '#666666',
    secondaryHover: '#808080',
    secondaryText: '#ffffff',
    background: '#ffffff',
    surface: '#f9fafb',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    border: '#e5e7eb',
    borderHover: '#d1d5db',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  typography: {
    fontFamily: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  layout: {
    containerWidth: '1440px',
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
      full: '9999px',
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },
  },
  components: {
    navbar: {
      height: '72px',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      sticky: true,
      showSearchBar: true,
      showCategoryMenu: true,
    },
    button: {
      primaryStyle: 'solid',
      secondaryStyle: 'outline',
      borderRadius: '4px',
      paddingX: '1.5rem',
      paddingY: '0.75rem',
    },
    productCard: {
      borderRadius: '8px',
      showBorder: false,
      showShadow: true,
      hoverEffect: 'scale',
      imageAspectRatio: 'square',
      showQuickView: true,
      showAddToCart: true,
    },
    footer: {
      backgroundColor: '#111827',
      textColor: '#ffffff',
      showSocialLinks: true,
      showNewsletter: true,
      layout: 'detailed',
    },
  },
  homepage: {
    hero: {
      enabled: true,
      layout: 'full-width',
      height: '600px',
      overlayOpacity: 0.3,
      ctaButton: {
        text: 'Shop Now',
        url: '/products',
        style: 'primary',
      },
    },
    featuredProducts: {
      enabled: true,
      title: 'Featured Products',
      limit: 8,
    },
    categories: {
      enabled: true,
      title: 'Shop by Category',
      layout: 'grid',
      showImages: true,
    },
    newsletter: {
      enabled: true,
      title: 'Stay Updated',
      subtitle: 'Subscribe to get special offers and updates',
      placement: 'footer',
    },
  },
  productPage: {
    layout: 'standard',
    showBreadcrumbs: true,
    showSku: true,
    showStock: true,
    showShipping: true,
    showReviews: false,
    relatedProducts: {
      enabled: true,
      title: 'You May Also Like',
      limit: 4,
    },
  },
  cart: {
    style: 'drawer',
    showMiniCart: true,
    showProductImages: true,
    showContinueShopping: true,
  },
  checkout: {
    layout: 'single-page',
    showOrderSummary: true,
    showSecurityBadges: true,
    showProgressIndicator: false,
  },
  advanced: {},
};
