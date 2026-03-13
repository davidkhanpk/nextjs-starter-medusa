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
  return process.env.SHOPIKOOL_API_URL || 'http://localhost:3000/api';
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
    
    console.log('[Menu API] Fetching menu:', url);

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
    
    console.log('[Menu API] Fetching default menu:', url);
    console.log('[Menu API] Store ID:', storeId);

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

    console.log('[Menu API] Response status:', response.status);

    if (!response.ok) {
      console.warn(`[Menu API] Failed to fetch default menu: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.warn('[Menu API] Error response:', errorText);
      return null;
    }

    const data: Menu = await response.json();
    console.log('[Menu API] Menu data received:', {
      id: data.id,
      name: data.name,
      handle: data.handle,
      itemsCount: data.items?.length || 0,
      isDefault: data.isDefault
    });
    console.log('[Menu API] Menu items:', JSON.stringify(data.items, null, 2));
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
  
  console.log('[Menu API] fetchMenu called with handle:', menuHandle);
  console.log('[Menu API] Store ID from env:', storeId);
  
  if (!storeId) {
    console.error('[Menu API] Store ID not found in environment variables');
    console.error('[Menu API] Available env vars:', Object.keys(process.env).filter(k => k.includes('STORE')));
    return null;
  }

  let menu: Menu | null = null;

  // If menuHandle is provided and not 'default', try to fetch that specific menu
  if (menuHandle && menuHandle !== 'default') {
    console.log('[Menu API] Attempting to fetch menu by handle:', menuHandle);
    menu = await fetchMenuByHandle(storeId, menuHandle);
  }

  // If no menu found or menuHandle is 'default', fetch the default menu
  if (!menu) {
    console.log('[Menu API] Fetching default menu');
    menu = await fetchDefaultMenu(storeId);
  }

  if (menu) {
    console.log('[Menu API] Final menu returned:', {
      id: menu.id,
      name: menu.name,
      handle: menu.handle,
      itemsCount: menu.items?.length || 0
    });
  } else {
    console.error('[Menu API] No menu found');
  }

  return menu;
}
