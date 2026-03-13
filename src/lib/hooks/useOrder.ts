"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"

/**
 * Client-side order hook for Puck components
 */
export function useOrder(orderId?: string) {
  const [order, setOrder] = useState<HttpTypes.StoreOrder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrder = async () => {
    if (!orderId) {
      setIsLoading(false)
      return
    }
    
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/orders/${orderId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch order')
      }
      
      const data = await response.json()
      setOrder(data.order)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order')
      setOrder(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  return {
    order,
    isLoading,
    error,
    refreshOrder: fetchOrder,
  }
}
