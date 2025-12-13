'use client';

import { useEffect } from 'react';
import { useAddToCart } from '@/lib/pixel/hooks';

interface CartPixelTrackerProps {
  storeId: string;
  lastAddedItem?: {
    variant_id: string;
    title: string;
    quantity: number;
    unit_price: number;
    currency_code: string;
  } | null;
}

export default function CartPixelTracker({ storeId, lastAddedItem }: CartPixelTrackerProps) {
  const { trackAddToCart } = useAddToCart(storeId);

  useEffect(() => {
    if (lastAddedItem) {
      trackAddToCart({
        variantId: lastAddedItem.variant_id,
        productTitle: lastAddedItem.title,
        quantity: lastAddedItem.quantity,
        price: lastAddedItem.unit_price / 100, // Convert from cents
        currency: lastAddedItem.currency_code?.toUpperCase(),
      });
    }
  }, [lastAddedItem, trackAddToCart]);

  return null;
}
