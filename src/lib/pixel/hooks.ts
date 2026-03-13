'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: any) => void;
  }
}

interface UsePixelTrackingOptions {
  storeId: string;
  enabled?: boolean;
}

export function usePixelTracking({ storeId, enabled = true }: UsePixelTrackingOptions) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract UTM parameters from URL
  const getUTMParams = useCallback(() => {
    if (typeof window === 'undefined') return {};
    
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_content: params.get('utm_content') || undefined,
      utm_term: params.get('utm_term') || undefined,
      fbclid: params.get('fbclid') || undefined,
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.fbq) {
      return;
    }

    // Track PageView on route change
    window.fbq('track', 'PageView');
  }, [pathname, searchParams, enabled]);

  // Track custom events
  const trackEvent = useCallback((eventName: string, params?: any) => {
    if (!enabled || typeof window === 'undefined' || !window.fbq) {
      console.warn('Facebook Pixel not initialized');
      return;
    }

    try {
      // Include UTM parameters in event data
      const utmParams = getUTMParams();
      const enrichedParams = { ...params, ...utmParams };
      
      window.fbq('track', eventName, enrichedParams);
      
      // Also send to backend for server-side tracking
      sendServerEvent(storeId, eventName, enrichedParams);
    } catch (error) {
      console.error('Error tracking Facebook Pixel event:', error);
    }
  }, [storeId, enabled, getUTMParams]);

  return { trackEvent };
}

// Send event to backend for server-side Conversions API
async function sendServerEvent(storeId: string, eventName: string, params: any) {
  try {
    await fetch(`${process.env.SHOPIKOOL_API_URL}/marketing/facebook-pixel/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storeId,
        eventType: eventName,
        eventData: params,
        source: 'client',
        sourceUrl: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error('Error sending server-side pixel event:', error);
  }
}

// Specialized hooks for common events

export function useProductView(storeId: string) {
  const { trackEvent } = usePixelTracking({ storeId });

  const trackProductView = useCallback((product: {
    id: string;
    title: string;
    price?: number;
    currency?: string;
  }) => {
    trackEvent('ViewContent', {
      content_ids: [product.id],
      content_type: 'product',
      content_name: product.title,
      value: product.price,
      currency: product.currency || 'USD',
    });
  }, [trackEvent]);

  return { trackProductView };
}

export function useAddToCart(storeId: string) {
  const { trackEvent } = usePixelTracking({ storeId });

  const trackAddToCart = useCallback((item: {
    variantId: string;
    productTitle: string;
    quantity: number;
    price: number;
    currency?: string;
  }) => {
    trackEvent('AddToCart', {
      content_ids: [item.variantId],
      content_type: 'product',
      content_name: item.productTitle,
      value: item.price * item.quantity,
      currency: item.currency || 'USD',
      num_items: item.quantity,
    });
  }, [trackEvent]);

  return { trackAddToCart };
}

export function useInitiateCheckout(storeId: string) {
  const { trackEvent } = usePixelTracking({ storeId });

  const trackInitiateCheckout = useCallback((cart: {
    items: Array<{ variant_id: string }>;
    total: number;
    currency_code: string;
  }) => {
    trackEvent('InitiateCheckout', {
      content_ids: cart.items.map(item => item.variant_id),
      num_items: cart.items.length,
      value: cart.total / 100, // Convert from cents
      currency: cart.currency_code.toUpperCase(),
    });
  }, [trackEvent]);

  return { trackInitiateCheckout };
}

export function usePurchase(storeId: string) {
  const { trackEvent } = usePixelTracking({ storeId });

  const trackPurchase = useCallback((order: {
    id: string;
    items: Array<{ variant_id: string }>;
    total: number;
    currency_code: string;
  }) => {
    trackEvent('Purchase', {
      content_ids: order.items.map(item => item.variant_id),
      content_type: 'product',
      value: order.total / 100, // Convert from cents
      currency: order.currency_code.toUpperCase(),
      num_items: order.items.length,
    });
  }, [trackEvent]);

  return { trackPurchase };
}

export function useSearch(storeId: string) {
  const { trackEvent } = usePixelTracking({ storeId });

  const trackSearch = useCallback((searchQuery: string) => {
    trackEvent('Search', {
      search_string: searchQuery,
      content_category: 'products',
    });
  }, [trackEvent]);

  return { trackSearch };
}
