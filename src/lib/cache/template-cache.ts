/**
 * Template Caching Strategy for Storefront
 * 
 * Implements Incremental Static Regeneration (ISR) and on-demand revalidation
 * for template data fetching
 */

import { unstable_cache } from 'next/cache';

/**
 * Cache configuration
 */
export const TEMPLATE_CACHE_CONFIG = {
  // Revalidate templates every 5 minutes
  revalidate: 300, // 5 minutes in seconds
  
  // Cache tags for on-demand revalidation
  tags: {
    template: (templateId: string) => `template-${templateId}`,
    templateType: (storeId: string, templateType: string) => 
      `template-${storeId}-${templateType}`,
    allTemplates: (storeId: string) => `templates-${storeId}`,
  },
};

/**
 * Cached template fetcher with ISR
 * 
 * @param fetchFn - Function that fetches the template
 * @param cacheKey - Unique cache key
 * @param tags - Cache tags for revalidation
 * @returns Cached or fresh template data
 */
export function cachedTemplateFetch<T>(
  fetchFn: () => Promise<T>,
  cacheKey: string,
  tags: string[]
) {
  return unstable_cache(
    fetchFn,
    [cacheKey],
    {
      revalidate: TEMPLATE_CACHE_CONFIG.revalidate,
      tags,
    }
  )();
}

/**
 * Cache template by ID
 */
export async function getCachedTemplate(
  templateId: string,
  fetchFn: () => Promise<any>
) {
  const tags = [TEMPLATE_CACHE_CONFIG.tags.template(templateId)];
  
  return cachedTemplateFetch(
    fetchFn,
    `template-${templateId}`,
    tags
  );
}

/**
 * Cache template by type (e.g., PRODUCT_PAGE)
 */
export async function getCachedTemplateByType(
  storeId: string,
  templateType: string,
  fetchFn: () => Promise<any>
) {
  const tags = [
    TEMPLATE_CACHE_CONFIG.tags.templateType(storeId, templateType),
    TEMPLATE_CACHE_CONFIG.tags.allTemplates(storeId),
  ];
  
  return cachedTemplateFetch(
    fetchFn,
    `template-${storeId}-${templateType}`,
    tags
  );
}

/**
 * Revalidate template cache
 * Call this after publishing/updating a template
 * 
 * Usage (from API route):
 * ```ts
 * import { revalidateTag } from 'next/cache';
 * import { TEMPLATE_CACHE_CONFIG } from '@lib/cache/template-cache';
 * 
 * // After publishing template
 * revalidateTag(TEMPLATE_CACHE_CONFIG.tags.template(templateId));
 * revalidateTag(TEMPLATE_CACHE_CONFIG.tags.templateType(storeId, templateType));
 * ```
 */
export function getRevalidationTags(
  storeId: string,
  templateId: string,
  templateType: string
) {
  return [
    TEMPLATE_CACHE_CONFIG.tags.template(templateId),
    TEMPLATE_CACHE_CONFIG.tags.templateType(storeId, templateType),
    TEMPLATE_CACHE_CONFIG.tags.allTemplates(storeId),
  ];
}

/**
 * Client-side cache buster
 * Adds cache-busting parameter to force fresh fetch
 */
export function getCacheBustingUrl(url: string): string {
  const timestamp = Date.now();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_t=${timestamp}`;
}

/**
 * Get cache headers for API responses
 */
export function getTemplateCacheHeaders() {
  return {
    'Cache-Control': `public, s-maxage=${TEMPLATE_CACHE_CONFIG.revalidate}, stale-while-revalidate=${TEMPLATE_CACHE_CONFIG.revalidate * 2}`,
    'CDN-Cache-Control': `public, s-maxage=${TEMPLATE_CACHE_CONFIG.revalidate}`,
    'Vercel-CDN-Cache-Control': `public, s-maxage=${TEMPLATE_CACHE_CONFIG.revalidate}`,
  };
}

/**
 * Template fetch with fallback and error handling
 */
export async function fetchTemplateWithFallback<T>(
  primaryFetch: () => Promise<T>,
  fallbackFetch: () => Promise<T>,
  options: {
    cacheKey: string;
    tags: string[];
    timeout?: number;
  }
): Promise<T> {
  const { cacheKey, tags, timeout = 5000 } = options;

  try {
    // Try fetching from cache or primary source
    const result = await Promise.race([
      cachedTemplateFetch(primaryFetch, cacheKey, tags),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Template fetch timeout')), timeout)
      ),
    ]);

    return result;
  } catch (error) {
    console.warn('Primary template fetch failed, using fallback:', error);
    
    try {
      // Try fallback (e.g., default template)
      return await fallbackFetch();
    } catch (fallbackError) {
      console.error('Fallback template fetch also failed:', fallbackError);
      throw new Error('Failed to fetch template');
    }
  }
}

/**
 * Preload templates for critical pages
 * Call this in layout or during build
 */
export async function preloadCriticalTemplates(
  storeId: string,
  templateTypes: string[],
  fetchFn: (type: string) => Promise<any>
) {
  const promises = templateTypes.map((type) =>
    getCachedTemplateByType(storeId, type, () => fetchFn(type))
      .catch((error) => {
        console.warn(`Failed to preload template ${type}:`, error);
        return null;
      })
  );

  return Promise.all(promises);
}
