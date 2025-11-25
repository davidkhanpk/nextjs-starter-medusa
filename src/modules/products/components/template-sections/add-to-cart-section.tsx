'use client'

/**
 * Add to Cart Section
 * Add to cart button with quantity selector and wishlist
 */

import React, { useState } from 'react'
import { Button } from '@medusajs/ui'
import { SectionProps } from './dynamic-section-renderer'
import { Heart } from '@medusajs/icons'

export default function AddToCartSection({ section, product }: SectionProps) {
  const [quantity, setQuantity] = useState(1)

  const config = {
    buttonSize: section.buttonSize || 'md',
    showQuantity: section.showQuantity !== false,
    showWishlist: section.showWishlist || false,
  }

  const buttonSizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    full: 'w-full px-6 py-3 text-base',
  }[config.buttonSize]

  const handleAddToCart = async () => {
    // Add to cart logic here
    console.log('Add to cart:', product.id, quantity)
  }

  const handleAddToWishlist = () => {
    // Add to wishlist logic here
    console.log('Add to wishlist:', product.id)
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      {config.showQuantity && (
        <div>
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border-x border-gray-300 py-2"
              min="1"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${buttonSizeClasses}`}
      >
        Add to Cart
      </button>

      {/* Wishlist Button */}
      {config.showWishlist && (
        <button
          onClick={handleAddToWishlist}
          className="w-full px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          Add to Wishlist
        </button>
      )}
    </div>
  )
}
