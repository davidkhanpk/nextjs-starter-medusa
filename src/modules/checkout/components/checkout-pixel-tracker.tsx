"use client"

import { useEffect } from "react"
import { usePixelTracking } from "@lib/pixel/usePixelTracking"
import { HttpTypes } from "@medusajs/types"

interface CheckoutPixelTrackerProps {
  cart: HttpTypes.StoreCart
  region: HttpTypes.StoreRegion
}

export default function CheckoutPixelTracker({ cart, region }: CheckoutPixelTrackerProps) {
  const { trackInitiateCheckout } = usePixelTracking()

  useEffect(() => {
    // Track checkout initiation when component mounts
    const cartTotal = cart.total || 0
    const currency = region.currency_code?.toUpperCase() || "USD"
    const contentIds = cart.items?.map(item => item.product_id || item.variant_id) || []
    const numItems = cart.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0

    trackInitiateCheckout({
      value: cartTotal / 100, // Convert from cents
      currency,
      contentIds,
      numItems
    })
  }, []) // Only track once

  return null
}
