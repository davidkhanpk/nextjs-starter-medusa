/**
 * Theme Mapper
 * 
 * Maps Platform Theme table structure to Storefront theme format
 */

import { StoreTheme, defaultTheme } from './types';

/**
 * Platform Theme structure (from Shopikool backend)
 */
interface PlatformTheme {
  id: string;
  storeId: string;
  globalSettings: {
    branding?: {
      storeName?: string;
      logo?: string;
      favicon?: string;
      tagline?: string;
    };
    colors?: Record<string, any>;
    typography?: Record<string, any>;
    layout?: Record<string, any>;
  };
  components: {
    navbar?: Record<string, any>;
    footer?: Record<string, any>;
    productCard?: Record<string, any>;
    button?: Record<string, any>;
    homepage?: Record<string, any>;
    productPage?: Record<string, any>;
    cart?: Record<string, any>;
    checkout?: Record<string, any>;
  };
  customCSS?: string | null;
  version: number;
}

/**
 * Deep merge objects
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];
    
    if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
      result[key] = deepMerge(
        targetValue && typeof targetValue === 'object' ? targetValue : {},
        sourceValue
      ) as T[Extract<keyof T, string>];
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[Extract<keyof T, string>];
    }
  }
  
  return result;
}

/**
 * Map Platform Theme to Storefront Theme
 */
export function mapPlatformThemeToStorefront(platformTheme: PlatformTheme): StoreTheme {
  const { globalSettings } = platformTheme;

  // Start with default theme and deep merge platform settings
  const storefrontTheme: StoreTheme = {
    branding: deepMerge(defaultTheme.branding, globalSettings?.branding || {}),
    colors: deepMerge(defaultTheme.colors, globalSettings?.colors || {}),
    typography: deepMerge(defaultTheme.typography, globalSettings?.typography || {}),
    layout: deepMerge(defaultTheme.layout, globalSettings?.layout || {}),
    // Use default components - no longer stored in database
    components: defaultTheme.components,
    homepage: defaultTheme.homepage,
    productPage: defaultTheme.productPage,
    cart: defaultTheme.cart,
    checkout: defaultTheme.checkout,
    advanced: {
      customCSS: platformTheme.customCSS || undefined,
    },
  };

  return storefrontTheme;
}
