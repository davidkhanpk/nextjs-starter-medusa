'use client';

import { useEffect, useState } from 'react';
import { useInitiateCheckout, usePurchase } from '@/lib/pixel/hooks';
import { useSearchParams } from 'next/navigation';
import { HttpTypes } from '@medusajs/types';

interface CheckoutPixelTrackerProps {
  cart: HttpTypes.StoreCart | null;
  storeId: string;
}

export default function CheckoutPixelTracker({ cart, storeId }: CheckoutPixelTrackerProps) {
  const { trackInitiateCheckout } = useInitiateCheckout(storeId);
  const { trackPurchase } = usePurchase(storeId);
  const searchParams = useSearchParams();
  const [hasTrackedCheckout, setHasTrackedCheckout] = useState(false);
  const [hasTrackedPurchase, setHasTrackedPurchase] = useState(false);

  // Track InitiateCheckout when user lands on checkout page
  useEffect(() => {
    if (cart && cart.items && cart.items.length > 0 && !hasTrackedCheckout) {
      trackInitiateCheckout({
        items: cart.items,
        total: cart.total || 0,
        currency_code: cart.currency_code || 'USD',
      });
      setHasTrackedCheckout(true);
    }
  }, [cart, trackInitiateCheckout, hasTrackedCheckout]);

  // Track Purchase when returning from payment (order_id in URL)
  useEffect(() => {
    const orderId = searchParams.get('order_id');
    
    if (orderId && cart && !hasTrackedPurchase) {
      trackPurchase({
        id: orderId,
        items: cart.items || [],
        total: cart.total || 0,
        currency_code: cart.currency_code || 'USD',
      });
      setHasTrackedPurchase(true);
    }
  }, [searchParams, cart, trackPurchase, hasTrackedPurchase]);

  return null;
}
