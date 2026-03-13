"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { addToCart as addToCartAction } from "@lib/data/cart"

/**
 * Client-side cart hook for Puck components
 * Fetches cart data from server actions
 */
export function useCart() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/cart')
      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }
      
      const data = await response.json()
      setCart(data.cart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart')
      setCart(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const addItem = async ({
    variantId,
    quantity,
    countryCode,
  }: {
    variantId: string
    quantity: number
    countryCode: string
  }) => {
    try {
      setIsLoading(true)
      await addToCartAction({ variantId, quantity, countryCode })
      await fetchCart() // Refresh cart after adding
    } catch (err) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (lineId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/line-items/${lineId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      
      if (!response.ok) throw new Error('Failed to update item')
      
      await fetchCart() // Refresh cart
    } catch (err) {
      throw err
    }
  }

  const removeItem = async (lineId: string) => {
    try {
      const response = await fetch(`/api/cart/line-items/${lineId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to remove item')
      
      await fetchCart() // Refresh cart
    } catch (err) {
      throw err
    }
  }

  const applyDiscount = async (code: string) => {
    try {
      const response = await fetch('/api/cart/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes: [code] }),
      })
      
      if (!response.ok) throw new Error('Failed to apply discount')
      
      await fetchCart() // Refresh cart
    } catch (err) {
      throw err
    }
  }

  return {
    cart,
    isLoading,
    error,
    addItem,
    updateQuantity,
    removeItem,
    applyDiscount,
    refreshCart: fetchCart,
  }
}
