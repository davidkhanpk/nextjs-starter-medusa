'use client'

import { HttpTypes } from "@medusajs/types"
import { TemplateResponse } from "@lib/template/types"
import { ProductCard } from "@lib/puck/components/product-card/ProductCardRenderer"

interface TemplateProductCardProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  productCardTemplate: TemplateResponse
  countryCode?: string
}

/**
 * Renders a product card using the Puck PRODUCT_CARD template from Shopikool.
 * This bridges the gap between the store page (non-Puck layout) and the
 * Puck-based product card template, using the same ProductCardRenderer
 * that CategoryProductsGrid uses.
 */
export default function TemplateProductCard({
  product,
  region,
  productCardTemplate,
  countryCode = 'us',
}: TemplateProductCardProps) {
  const templateProps = productCardTemplate.puckData?.root?.props || {}

  // Transform Puck puckData.root.props → ProductCardTemplate format
  // (identical to CategoryProductsGrid transformation)
  const transformedTemplate = {
    id: productCardTemplate.id || "product-card",
    name: productCardTemplate.templateName || "Product Card",
    type: "PRODUCT_CARD",
    layout: templateProps.layout || 'vertical',
    imageGallery: {
      enabled: true,
      showSwiper: templateProps.enableSwiper ?? true,
      aspectRatio: templateProps.aspectRatio || 'square',
      borderRadius: templateProps.borderRadius || 'md',
      shadow: templateProps.showShadow ?? false,
      hoverZoom: templateProps.hoverZoom ?? false,
    },
    title: {
      show: templateProps.showTitle ?? true,
      textSize: templateProps.titleSize || 'text-lg',
      fontWeight: templateProps.titleWeight || 'semibold',
      textAlign: templateProps.titleAlign || 'left',
    },
    price: {
      show: templateProps.showPrice ?? true,
      textSize: templateProps.priceSize || 'text-base',
      priceColor: templateProps.priceColor || '#000000',
      showCompareAt: templateProps.showCompareAtPrice ?? true,
      showSavingsBadge: templateProps.showSavingsBadge ?? true,
    },
    badges: {
      enabled: templateProps.showBadges ?? true,
      showSale: templateProps.showSaleBadge ?? true,
      showNew: templateProps.showNewBadge ?? false,
      showLowStock: templateProps.showLowStockBadge ?? true,
      position: templateProps.badgePosition || 'top-left',
    },
    addToCart: {
      show: templateProps.showAddToCart ?? true,
      buttonText: templateProps.addToCartText || 'Add to Cart',
      buttonStyle: templateProps.buttonStyle || 'filled',
      buttonSize: templateProps.buttonSize || 'md',
      showIcon: templateProps.showCartIcon ?? true,
    },
    styling: {
      cardRadius: templateProps.cardRadius || 'md',
      cardBorder: templateProps.cardBorder || 'none',
      cardShadow: templateProps.cardShadow ?? false,
      cardBackground: templateProps.cardBackground || '#ffffff',
      accentColor: templateProps.accentColor || '#000000',
      fontFamily: templateProps.fontFamily || 'inherit',
    },
  }

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden">
      <ProductCard
        product={product}
        region={region}
        template={transformedTemplate}
        countryCode={countryCode}
      />
    </div>
  )
}
