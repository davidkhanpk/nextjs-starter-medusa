'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { addToCart } from '@lib/data/cart'
import { useTheme } from '@lib/theme/ThemeProvider'
import { ShoppingCart } from '@medusajs/icons'

interface AddToCartButtonProps {
  variantId: string
  quantity?: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

export default function AddToCartButton({
  variantId,
  quantity = 1,
  className = '',
  size = 'md',
  children,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const params = useParams()
  const countryCode = (params?.countryCode as string) || 'us'
  const { theme } = useTheme()

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const handleAddToCart = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      await addToCart({
        variantId,
        quantity,
        countryCode,
      })
      
      setIsAdded(true)
      
      // Reset "added" state after 2 seconds
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      alert('Failed to add item to cart. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const buttonText = isLoading ? 'Adding...' : isAdded ? 'Added!' : children || 'Add to Cart'
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium 
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]} ${className}
      `}
      style={{
        backgroundColor: isAdded 
          ? (theme?.colors?.success || '#10b981')
          : (theme?.colors?.primary || '#000000'),
        color: theme?.colors?.primaryText || '#ffffff',
      }}
    >
      {!isAdded && <ShoppingCart className="w-5 h-5" />}
      {isAdded && (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
      <span>{buttonText}</span>
    </button>
  )
}
