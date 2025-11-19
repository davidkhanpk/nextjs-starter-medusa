'use client'

import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@lib/utils'
import { animationVariants, transitions } from '@lib/design-system'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface ModernProductCardProps {
  product: {
    id: string
    handle: string
    title: string
    thumbnail?: string | null
    images?: Array<{ url: string }>
    price?: {
      calculated_amount: number
      currency_code: string
    }
    variants?: Array<{
      id: string
      title: string
      thumbnail?: string
    }>
  }
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'none'
  showQuickView?: boolean
  showWishlist?: boolean
  showAddToCart?: boolean
  showBadge?: boolean
  badge?: {
    text: string
    variant: 'sale' | 'new' | 'hot'
  }
  onQuickView?: (productId: string) => void
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
}

export default function ModernProductCard({
  product,
  hoverEffect = 'lift',
  showQuickView = true,
  showWishlist = true,
  showAddToCart = true,
  showBadge = false,
  badge,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
}: ModernProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    onToggleWishlist?.(product.id)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product.id)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.(product.id)
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const getBadgeStyles = () => {
    switch (badge?.variant) {
      case 'sale':
        return 'bg-red-500 text-white'
      case 'new':
        return 'bg-blue-500 text-white'
      case 'hot':
        return 'bg-orange-500 text-white'
      default:
        return 'bg-gray-800 text-white'
    }
  }

  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'lift':
        return { y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }
      case 'scale':
        return { scale: 1.03 }
      case 'glow':
        return { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }
      default:
        return {}
    }
  }

  const images = product.images || []
  const mainImage = currentImage < images.length ? images[currentImage].url : product.thumbnail

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants.fadeIn}
      whileHover={getHoverAnimation()}
      transition={transitions.spring}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <LocalizedClientLink href={`/products/${product.handle}`} className="block">
        <div className={cn(
          'relative overflow-hidden rounded-2xl bg-gray-50',
          'transition-all duration-300',
          'border border-gray-200',
        )}>
          {/* Badge */}
          {showBadge && badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={transitions.bounce}
              className={cn(
                'absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase',
                'backdrop-blur-sm',
                getBadgeStyles()
              )}
            >
              {badge.text}
            </motion.div>
          )}

          {/* Wishlist Button */}
          {showWishlist && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className={cn(
                'absolute top-3 right-3 z-10 p-2 rounded-full',
                'bg-white/90 backdrop-blur-sm shadow-md',
                'hover:bg-white transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              )}
            >
              <Heart
                className={cn(
                  'w-5 h-5 transition-colors duration-200',
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                )}
              />
            </motion.button>
          )}

          {/* Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {mainImage ? (
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-4xl">📦</span>
              </div>
            )}

            {/* Variant Color Dots (on hover) */}
            {product.variants && product.variants.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={transitions.fast}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
              >
                {product.variants.slice(0, 4).map((variant, idx) => (
                  <button
                    key={variant.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImage(idx)
                    }}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-all duration-200',
                      currentImage === idx ? 'border-white scale-110' : 'border-gray-300',
                      'bg-white/80 backdrop-blur-sm hover:scale-110'
                    )}
                    style={{
                      backgroundImage: variant.thumbnail ? `url(${variant.thumbnail})` : 'none',
                      backgroundSize: 'cover',
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Quick Action Buttons Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={transitions.fast}
              className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center gap-3"
            >
              {/* Quick View */}
              {showQuickView && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleQuickView}
                  className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Eye className="w-5 h-5 text-gray-800" />
                </motion.button>
              )}

              {/* Add to Cart */}
              {showAddToCart && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4 bg-white">
            {/* Product Title */}
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
              {product.title}
            </h3>

            {/* Rating (Mock - replace with real data) */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-3 h-3',
                    i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  )}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">(127)</span>
            </div>

            {/* Price */}
            {product.price && (
              <div className="flex items-center justify-between">
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={transitions.fast}
                  className="text-lg font-bold text-gray-900"
                >
                  {formatPrice(product.price.calculated_amount, product.price.currency_code)}
                </motion.span>

                {/* Add to Cart Text Button (Mobile) */}
                {showAddToCart && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="md:hidden px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </LocalizedClientLink>
    </motion.div>
  )
}
