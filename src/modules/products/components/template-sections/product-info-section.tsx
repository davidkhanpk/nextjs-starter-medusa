/**
 * Product Info Section
 * Displays product title, price, description, SKU
 */

import React from 'react'
import { Heading, Text } from '@medusajs/ui'
import { getProductPrice } from '@lib/util/get-product-price'
import { SectionProps } from './dynamic-section-renderer'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

export default function ProductInfoSection({ section, product, region }: SectionProps) {
  const config = {
    layout: section.layout || 'stacked',
    showTitle: section.showTitle !== false,
    showPrice: section.showPrice !== false,
    showDescription: section.showDescription !== false,
    showSku: section.showSku || false,
  }

  const { cheapestPrice } = getProductPrice({ product, region })

  return (
    <div className="flex flex-col gap-y-4">
      {/* Collection Link */}
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="text-sm text-ui-fg-muted hover:text-ui-fg-subtle"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}

      {/* Title */}
      {config.showTitle && (
        <Heading
          level="h1"
          className="text-3xl font-bold text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>
      )}

      {/* Price */}
      {config.showPrice && cheapestPrice && (
        <div className="flex items-center gap-x-2">
          <Text className="text-2xl font-semibold text-ui-fg-base">
            {cheapestPrice.calculated_price}
          </Text>
          {cheapestPrice.price_type === 'sale' && cheapestPrice.original_price && (
            <Text className="text-lg text-ui-fg-muted line-through">
              {cheapestPrice.original_price}
            </Text>
          )}
        </div>
      )}

      {/* Description */}
      {config.showDescription && product.description && (
        <Text className="text-base text-ui-fg-subtle whitespace-pre-line">
          {product.description}
        </Text>
      )}

      {/* SKU */}
      {config.showSku && (
        <Text className="text-sm text-ui-fg-muted">
          SKU: {product.variants?.[0]?.sku || product.id}
        </Text>
      )}
    </div>
  )
}
