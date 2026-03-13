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
  console.log('[Template API] Getting store ID...');
  console.log('[Template API] NODE_ENV:', process.env.NODE_ENV);
  
  // Always check STORE_ID env var first (set per-container in K8s)
  if (process.env.STORE_ID) {
    console.log('[Template API] Using STORE_ID from env:', process.env.STORE_ID);
    return process.env.STORE_ID;
  }

  // Fallback: Extract from request headers (subdomain)
  if (request) {
    const host = request.headers.get('host') || '';
    console.log('[Template API] Extracting from request host:', host);
    const subdomain = extractSubdomain(host);
    console.log('[Template API] Extracted subdomain:', subdomain);
    return subdomain;
  }

  // Fallback: Client-side extract from window.location
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    console.log('[Template API] Extracting from window.location.hostname:', hostname);
    const subdomain = extractSubdomain(hostname);
    console.log('[Template API] Extracted subdomain:', subdomain);
    return subdomain;
  }

  console.log('[Template API] Could not determine store ID');
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
    
    console.log('[Template API] ===== FETCH TEMPLATE START =====');
    console.log('[Template API] Store ID:', storeId);
    console.log('[Template API] Template Type:', templateType);
    console.log('[Template API] API URL:', apiUrl);
    console.log('[Template API] Full URL:', url);
    console.log('[Template API] Environment:', process.env.NODE_ENV);

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

    console.log('[Template API] Response status:', response.status);
    console.log('[Template API] Response statusText:', response.statusText);
    console.log('[Template API] Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Template API] Error response body:', errorText);
      console.warn(`[Template API] Failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: TemplateResponse = await response.json();
    console.log('[Template API] Response data keys:', Object.keys(data));
    console.log('[Template API] Has puckData:', !!data.puckData);
    console.log('[Template API] Template status:', data.status);
    console.log('[Template API] Is default:', data.isDefault);
    console.log('[Template API] ===== FETCH TEMPLATE END =====');
    
    return data;
  } catch (error) {
    console.error('[Template API] ===== FETCH TEMPLATE ERROR =====');
    console.error('[Template API] Error:', error);
    console.error('[Template API] Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('[Template API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
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
  console.log('[Template API] ===== FETCHING TEMPLATE =====');
  console.log('[Template API] Template type requested:', templateType);
  
  const storeId = getStoreId(request);
  
  if (!storeId) {
    console.warn('[Template API] ❌ No store ID found - cannot fetch template');
    console.warn('[Template API] STORE_ID env var:', process.env.STORE_ID);
    console.warn('[Template API] NODE_ENV:', process.env.NODE_ENV);
    return null;
  }

  console.log('[Template API] ✅ Store ID found:', storeId);
  console.log('[Template API] Calling fetchTemplateByStoreId...');
  
  // Always use store ID endpoint (subdomain logic removed)
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
