import { TemplateType, TemplateResponse, Template } from './types';
import { getCachedTemplateByType, TEMPLATE_CACHE_CONFIG } from '@lib/cache/template-cache';

/**
 * Storefront Template API Client
 * Fetches templates from Shopikool Platform backend (public endpoints)
 * Uses ISR caching for optimal performance
 */

const getPlatformApiUrl = (): string => {
  return process.env.SHOPIKOOL_API_URL || 'http://localhost:3000/api';
};

const getStoreId = (request?: Request): string | null => {
  // Always check STORE_ID env var first (set per-container in K8s)
  if (process.env.STORE_ID) {
    return process.env.STORE_ID;
  }

  // Fallback: Extract from request headers (subdomain)
  if (request) {
    const host = request.headers.get('host') || '';
    return extractSubdomain(host);
  }

  // Fallback: Client-side extract from window.location
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
): Promise<TemplateResponse | null> {
  try {
    const apiUrl = getPlatformApiUrl();
    const url = `${apiUrl}/public/templates/${storeId}/${templateType}`;

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
      console.warn(`[Template API] Failed to fetch ${templateType}: ${response.status}`);
      return null;
    }

    const data: TemplateResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`[Template API] Error fetching ${templateType}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Fetch template by subdomain (server-side)
 */
export async function fetchTemplateBySubdomain(
  subdomain: string,
  templateType: TemplateType,
): Promise<TemplateResponse | null> {
  try {
    const apiUrl = getPlatformApiUrl();
    const url = `${apiUrl}/public/templates/subdomain/${subdomain}/${templateType}`;
    


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
    return data;
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
): Promise<TemplateResponse | null> {
  const storeId = getStoreId(request);
  
  if (!storeId) {
    console.warn('[Template API] No store ID found');
    return null;
  }

  return fetchTemplateByStoreId(storeId, templateType);
}

/**
 * Client-side template fetcher (for dynamic updates)
 */
export async function fetchTemplateClient(
  templateType: TemplateType,
): Promise<TemplateResponse | null> {
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
