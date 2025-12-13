"use client"

import { useEffect } from "react"
import { usePixelTracking } from "@lib/pixel/usePixelTracking"
import { HttpTypes } from "@medusajs/types"

interface OrderPixelTrackerProps {
  order: HttpTypes.StoreOrder
}

export default function OrderPixelTracker({ order }: OrderPixelTrackerProps) {
  const { trackPurchase } = usePixelTracking()

  useEffect(() => {
    // Track purchase when order confirmation loads
    const orderTotal = order.total || 0
    const currency = order.currency_code?.toUpperCase() || "USD"
    const contentIds = order.items?.map(item => item.product_id || item.variant_id) || []

    trackPurchase({
      value: orderTotal / 100, // Convert from cents
      currency,
      contentIds
    })
  }, []) // Only track once

  return null
}
