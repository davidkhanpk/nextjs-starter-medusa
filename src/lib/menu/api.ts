/**
 * Menu API Client for Storefront
 * Server-side only - fetches menus from Shopikool Platform
 */

export interface MenuItem {
  id: string;
  label: string;
  url?: string;
  type: 'category' | 'collection' | 'page' | 'custom';
  entityId?: string;
  position: number;
  parentId?: string | null;
  children?: MenuItem[];
  isVisible: boolean;
  openInNewTab: boolean;
  megaMenu?: {
    enabled: boolean;
    columns: number;
    showImage: boolean;
    imageUrl?: string;
    featuredItems?: {
      id: string;
      label: string;
      url: string;
      imageUrl?: string;
    }[];
  };
}

export interface Menu {
  id: string;
  storeId: string;
  name: string;
  handle: string;
  items: MenuItem[];
  settings?: {
    layout?: string;
    mobileBreakpoint?: string;
    showIcons?: boolean;
    hoverEffect?: string;
    dropdownStyle?: string;
  };
  isDefault: boolean;
}

const getPlatformApiUrl = (): string => {
  return process.env.LAUNCHSTORE_API_URL || 'http://localhost:3000/api';
};

const getStoreId = (): string | null => {
  // Development: Use env variable
  if (process.env.NODE_ENV === 'development') {
    return process.env.STORE_ID || null;
  }

  // Production: Use env variable (injected by Kubernetes)
  return process.env.STORE_ID || null;
};

/**
 * Fetch menu by store ID and handle
 */
export async function fetchMenuByHandle(
  storeId: string,
  handle: string
): Promise<Menu | null> {
  try {
    const apiUrl = getPlatformApiUrl();
    const url = `${apiUrl}/public/menus/${storeId}/${handle}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      next: { 
        revalidate: process.env.NODE_ENV === 'production' ? 300 : 60,
        tags: [`menu-${storeId}-${handle}`]
      },
    });

    if (!response.ok) {
      console.warn(`[Menu API] Failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: Menu = await response.json();
    return data;
  } catch (error) {
    console.error('[Menu API] Error:', error);
    return null;
  }
}

/**
 * Fetch default menu for a store
 */
export async function fetchDefaultMenu(
  storeId: string
): Promise<Menu | null> {
  try {
    const apiUrl = getPlatformApiUrl();
    const url = `${apiUrl}/public/menus/${storeId}/default`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      next: { 
        revalidate: process.env.NODE_ENV === 'production' ? 300 : 60,
        tags: [`menu-${storeId}-default`]
      },
    });

    if (!response.ok) {
      console.warn(`[Menu API] Failed to fetch default menu: ${response.status}`);
      return null;
    }

    const data: Menu = await response.json();
    return data;
  } catch (error) {
    console.error('[Menu API] Error fetching default menu:', error);
    return null;
  }
}

/**
 * Fetch menu - tries specific handle first, falls back to default
 * Server-side only
 */
export async function fetchMenu(
  menuHandle?: string
): Promise<Menu | null> {
  const storeId = getStoreId();
  
  if (!storeId) {
    console.error('[Menu API] Store ID not found in environment variables');
    return null;
  }

  let menu: Menu | null = null;

  // If menuHandle is provided and not 'default', try to fetch that specific menu
  if (menuHandle && menuHandle !== 'default') {
    menu = await fetchMenuByHandle(storeId, menuHandle);
  }

  // If no menu found or menuHandle is 'default', fetch the default menu
  if (!menu) {
    menu = await fetchDefaultMenu(storeId);
  }

  return menu;
}
