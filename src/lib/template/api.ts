import { TemplateType, TemplateResponse, Template } from './types';

/**
 * Storefront Template API Client
 * Fetches templates from Shopikool Platform backend (public endpoints)
 */

const getPlatformApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_SHOPIKOOL_API_URL || 'http://localhost:3000/api';
};

const getStoreId = (request?: Request): string | null => {
  // Development: Use env variable
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_STORE_ID || null;
  }

  // Production: Extract from subdomain
  if (request) {
    const host = request.headers.get('host') || '';
    return extractSubdomain(host);
  }

  // Client-side: Extract from window.location
  if (typeof window !== 'undefined') {
    return extractSubdomain(window.location.hostname);
  }

  return null;
};

const extractSubdomain = (host: string): string | null => {
  const hostWithoutPort = host.split(':')[0];
  
  if (hostWithoutPort === 'localhost' || hostWithoutPort.startsWith('192.168')) {
    return null;
  }
  
  const parts = hostWithoutPort.split('.');
  
  if (parts.length < 3) {
    return null;
  }
  
  return parts[0];
};

/**
 * Fetch template by store ID (server-side)
 */
export async function fetchTemplateByStoreId(
  storeId: string,
  templateType: TemplateType,
): Promise<Template | null> {
  try {
    const apiUrl = getPlatformApiUrl();
    const url = `${apiUrl}/public/templates/${storeId}/${templateType}`;
    
    console.log('[Template API] Fetching:', url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      next: { 
        revalidate: process.env.NODE_ENV === 'production' ? 300 : 60,
        tags: [`template-${storeId}-${templateType}`]
      },
    });

    if (!response.ok) {
      console.warn(`[Template API] Failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: TemplateResponse = await response.json();
    return data as Template;
  } catch (error) {
    console.error('[Template API] Error:', error);
    return null;
  }
}

/**
 * Fetch template by subdomain (server-side)
 */
export async function fetchTemplateBySubdomain(
  subdomain: string,
  templateType: TemplateType,
): Promise<Template | null> {
  try {
    const apiUrl = getPlatformApiUrl();
    const url = `${apiUrl}/public/templates/subdomain/${subdomain}/${templateType}`;
    
    console.log('[Template API] Fetching by subdomain:', url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      next: { 
        revalidate: process.env.NODE_ENV === 'production' ? 300 : 60,
        tags: [`template-${subdomain}-${templateType}`]
      },
    });

    if (!response.ok) {
      console.warn(`[Template API] Failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: TemplateResponse = await response.json();
    return data as Template;
  } catch (error) {
    console.error('[Template API] Error:', error);
    return null;
  }
}

/**
 * Fetch template with auto-detection (server-side)
 * Automatically detects store from request or environment
 */
export async function fetchTemplate(
  templateType: TemplateType,
  request?: Request,
): Promise<Template | null> {
  const storeId = getStoreId(request);
  
  if (!storeId) {
    console.warn('[Template API] No store ID found');
    return null;
  }

  // If it looks like a subdomain, use subdomain endpoint
  if (!storeId.includes('-') && storeId.length > 5) {
    return fetchTemplateBySubdomain(storeId, templateType);
  }

  // Otherwise use store ID endpoint
  return fetchTemplateByStoreId(storeId, templateType);
}

/**
 * Client-side template fetcher (for dynamic updates)
 */
export async function fetchTemplateClient(
  templateType: TemplateType,
): Promise<Template | null> {
  try {
    // Use local API route that handles auth/subdomain extraction
    const response = await fetch(`/api/templates/${templateType}`);
    
    if (!response.ok) {
      console.warn(`[Template API Client] Failed: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('[Template API Client] Error:', error);
    return null;
  }
}

/**
 * Get subdomain from current hostname (client-side helper)
 */
export function getCurrentSubdomain(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return extractSubdomain(window.location.hostname);
}

/**
 * Get store ID from environment or subdomain
 */
export function getCurrentStoreId(): string | null {
  return getStoreId();
}
