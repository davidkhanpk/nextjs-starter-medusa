'use client';

import { useEffect } from 'react';
import { useProductView } from '@/lib/pixel/hooks';
import { HttpTypes } from '@medusajs/types';

interface ProductPixelTrackerProps {
  product: HttpTypes.StoreProduct;
  storeId: string;
}

export default function ProductPixelTracker({ product, storeId }: ProductPixelTrackerProps) {
  const { trackProductView } = useProductView(storeId);

  useEffect(() => {
    if (product && product.id) {
      // Get the lowest price from variants
      const lowestPrice = product.variants?.reduce((min, variant) => {
        const price = variant.calculated_price?.calculated_amount;
        return price && price < min ? price : min;
      }, Infinity);

      trackProductView({
        id: product.id,
        title: product.title || '',
        price: lowestPrice !== Infinity ? lowestPrice / 100 : undefined, // Convert from cents
        currency: product.variants?.[0]?.calculated_price?.currency_code?.toUpperCase(),
      });
    }
  }, [product, trackProductView]);

  return null; // This is a tracker component, no UI
}
