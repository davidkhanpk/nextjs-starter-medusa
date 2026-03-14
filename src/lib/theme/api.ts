/**
 * Theme API - Server-side theme fetching utilities
 * Fetches theme data with tokens for server-side rendering
 */

/**
 * Get API URL from environment
 */
function getPlatformApiUrl(): string {
  return process.env.SHOPIKOOL_API_URL || 'http://localhost:3000/api';
}

/**
 * Get Store ID from environment
 */
function getStoreId(): string | null {
  // In production, use STORE_ID
  // In development, can use a development store ID
  const storeId = process.env.STORE_ID;
  
  if (!storeId) {
    return null;
  }
  
  return storeId;
}

export interface Theme {
  id: string;
  storeId: string;
  name: string;
  globalSettings: {
    branding?: {
      storeName: string;
      logo?: string | null;
      favicon?: string | null;
    };
    colors?: {
      tokens: Record<string, any>;
    };
    typography?: {
      fontFamily?: Record<string, string>;
      fontSize?: Record<string, string>;
      fontWeight?: Record<string, number>;
    };
    layout?: {
      containerWidth?: string;
      borderRadius?: Record<string, string>;
      spacing?: Record<string, string>;
    };
  };
  components?: Record<string, any>;
}

/**
 * Fetch theme for a store
 */
export async function fetchTheme(): Promise<Theme | null> {
  const storeId = getStoreId();
  
  if (!storeId) {
    return null;
  }

  try {
    const apiUrl = getPlatformApiUrl();
    const url = `${apiUrl}/public/stores/id/${storeId}/theme`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      next: { 
        revalidate: process.env.NODE_ENV === 'production' ? 3600 : 60, // 1 hour in prod, 1 min in dev
        tags: [`theme-${storeId}`]
      },
    });

    if (!response.ok) {
      console.warn(`[Theme API] Failed to fetch theme: ${response.status}`);
      return null;
    }

    const data: Theme = await response.json();
    return data;
  } catch (error) {
    console.error('[Theme API] Error fetching theme:', error);
    return null;
  }
}
