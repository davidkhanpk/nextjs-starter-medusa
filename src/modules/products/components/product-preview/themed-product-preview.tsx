'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import { Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AddToCartButton from "@modules/products/components/add-to-cart-button"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

interface ThemedProductPreviewProps {
  product: HttpTypes.StoreProduct
  cheapestPrice: any
  isFeatured?: boolean
}

export default function ThemedProductPreview({ 
  product, 
  cheapestPrice, 
  isFeatured 
}: ThemedProductPreviewProps) {
  const { theme, loading } = useTheme()

  // Show default styling while loading
  if (loading) {
    return (
      <LocalizedClientLink href={`/products/${product.handle}`} className="group">
        <div data-testid="product-wrapper">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          <div className="flex txt-compact-medium mt-4 justify-between">
            <Text className="text-ui-fg-subtle" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    )
  }

  const cardConfig = theme.components.productCard
  const hoverEffect = cardConfig.hoverEffect || 'shadow'

  // Determine hover classes based on theme config
  const getHoverClasses = () => {
    switch (hoverEffect) {
      case 'scale':
        return 'group-hover:scale-105'
      case 'lift':
        return 'group-hover:-translate-y-1'
      case 'border':
        return 'group-hover:border-opacity-100'
      case 'shadow':
      default:
        return 'group-hover:shadow-lg'
    }
  }

  return (
    <LocalizedClientLink 
      href={`/products/${product.handle}`} 
      className="group block"
    >
      <div 
        data-testid="product-wrapper"
        className="h-full flex flex-col"
      >
        {/* Product Image */}
        <div 
          className={`relative overflow-hidden transition-all duration-300 ${getHoverClasses()}`}
          style={{
            borderRadius: cardConfig.borderRadius || theme.layout.borderRadius.md || '0.5rem',
            boxShadow: cardConfig.showShadow ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none',
            border: cardConfig.showBorder ? `1px solid ${theme.colors.border}` : 'none',
          }}
        >
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="rounded-none"
          />
          
          {/* Quick view overlay (optional) */}
          {cardConfig.showQuickView && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              <button 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 text-sm font-medium rounded-md"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.primaryText,
                }}
                onClick={(e) => {
                  e.preventDefault()
                  // TODO: Implement quick view modal
                  console.log('Quick view:', product.handle)
                }}
              >
                Quick View
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col mt-4 gap-2 flex-grow">
          <div className="flex justify-between items-start gap-2">
            <Text 
              className="text-sm font-medium line-clamp-2"
              data-testid="product-title"
              style={{
                color: theme.colors.textPrimary,
              }}
            >
              {product.title}
            </Text>
            {cheapestPrice && (
              <div className="flex items-center gap-x-2 flex-shrink-0">
                <PreviewPrice price={cheapestPrice} />
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          {cardConfig.showAddToCart && product.variants && product.variants.length > 0 && (
            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <AddToCartButton
                variantId={product.variants[0].id}
                quantity={1}
                size="sm"
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
