"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { HttpTypes } from "@medusajs/types"
import { addToCart as addToCartAction } from "@lib/data/cart"

/**
 * Custom event name used to sync cart state across all useCart() instances.
 * When any instance mutates the cart, it dispatches this event so every
 * other instance (CartDrawer, CartButton, etc.) refetches automatically.
 */
const CART_UPDATED_EVENT = "cart-updated"

function dispatchCartUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT))
  }
}

/**
 * Client-side cart hook for Puck components.
 * All instances share updates via a browser CustomEvent so that
 * adding an item in AddToCart immediately reflects in CartDrawer / CartButton.
 */
export function useCart() {
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Guard to avoid re-entrant fetches from the same instance
  const fetchingRef = useRef(false)

  const fetchCart = useCallback(async () => {
    // Prevent duplicate concurrent fetches within this instance
    if (fetchingRef.current) return
    fetchingRef.current = true

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
      fetchingRef.current = false
    }
  }, [])

  // Fetch on mount + listen for cross-component cart-updated events
  useEffect(() => {
    fetchCart()

    const handleCartUpdate = () => {
      fetchCart()
    }

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate)
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate)
    }
  }, [fetchCart])

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
      await fetchCart() // Refresh this instance
      dispatchCartUpdate() // Notify all other instances
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

      await fetchCart()
      dispatchCartUpdate()
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

      await fetchCart()
      dispatchCartUpdate()
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

      await fetchCart()
      dispatchCartUpdate()
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
