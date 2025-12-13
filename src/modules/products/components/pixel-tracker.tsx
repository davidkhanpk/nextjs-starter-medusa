"use client"

import { useEffect } from "react"
import { usePixelTracking } from "@lib/pixel/usePixelTracking"
import { HttpTypes } from "@medusajs/types"

interface PixelTrackerProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

export default function PixelTracker({ product, region }: PixelTrackerProps) {
  const { trackViewContent } = usePixelTracking()

  useEffect(() => {
    // Track product view when component mounts
    const productPrice = product.variants?.[0]?.calculated_price || 0
    const currency = region.currency_code?.toUpperCase() || "USD"

    trackViewContent({
      value: productPrice / 100, // Convert from cents
      currency,
      contentId: product.id,
      contentName: product.title,
      contentCategory: product.collection?.title || undefined
    })
  }, [product.id]) // Only track once per product

  return null
}
