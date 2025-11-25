'use client'

import React from 'react'
import { SectionProps } from './dynamic-section-renderer'
import { getProductPrice } from '@lib/util/get-product-price'

export default function StickyBarSection({ section, product, region }: SectionProps) {
  const position = section.position || 'top'
  const { cheapestPrice } = getProductPrice({ product, region })

  return (
    <div 
      className={`fixed ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 bg-white shadow-lg z-40 py-4 px-6`}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <span className="font-semibold">{product.title}</span>
      {section.showPrice !== false && cheapestPrice && (
        <span className="text-xl font-bold">{cheapestPrice.calculated_price}</span>
      )}
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  )
}
