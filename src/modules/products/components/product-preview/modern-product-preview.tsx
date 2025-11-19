'use client'

import { HttpTypes } from "@medusajs/types"
import ModernProductCard from "../modern-product-card"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ModernProductPreviewProps {
  product: HttpTypes.StoreProduct
  cheapestPrice?: {
    calculated_price_number: number
    currency_code: string
  }
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}

export default function ModernProductPreview({
  product,
  cheapestPrice,
  isFeatured,
  region,
}: ModernProductPreviewProps) {
  const router = useRouter()
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Get the first image or fallback
  const thumbnail = product.thumbnail || product.images?.[0]?.url || null

  // Convert Medusa product to ModernProductCard format
  const modernProduct = {
    id: product.id || '',
    handle: product.handle || '',
    title: product.title || '',
    thumbnail: thumbnail,
    images: product.images?.map(img => ({ url: img.url })) || [],
    price: cheapestPrice ? {
      calculated_amount: Math.round(cheapestPrice.calculated_price_number * 100), // Convert to cents
      currency_code: cheapestPrice.currency_code,
    } : undefined,
    variants: product.variants?.map(variant => ({
      id: variant.id || '',
      title: variant.title || '',
      thumbnail: variant.thumbnail || thumbnail,
    })) || [],
  }

  // Determine badge
  const badge = product.tags?.find(tag => 
    ['new', 'sale', 'hot'].includes(tag.value?.toLowerCase() || '')
  )

  const handleQuickView = (productId: string) => {
    // TODO: Implement quick view modal
    console.log('Quick view:', productId)
  }

  const handleAddToCart = async (productId: string) => {
    // Get the first available variant
    const variant = product.variants?.[0]
    if (!variant?.id) {
      console.error('No variant available')
      return
    }

    try {
      // TODO: Integrate with your cart system
      console.log('Add to cart:', productId, variant.id)
      
      // Show success toast
      if (typeof window !== 'undefined') {
        // You can add toast notification here once ToastProvider is set up
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  const handleToggleWishlist = (productId: string) => {
    setIsWishlisted(!isWishlisted)
    // TODO: Persist wishlist state to backend or localStorage
    console.log('Toggle wishlist:', productId, !isWishlisted)
  }

  return (
    <ModernProductCard
      product={modernProduct}
      hoverEffect="lift"
      showQuickView={true}
      showWishlist={true}
      showAddToCart={true}
      showBadge={!!badge}
      badge={badge ? {
        text: badge.value?.toUpperCase() || 'NEW',
        variant: (badge.value?.toLowerCase() as 'sale' | 'new' | 'hot') || 'new'
      } : undefined}
      onQuickView={handleQuickView}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
    />
  )
}
