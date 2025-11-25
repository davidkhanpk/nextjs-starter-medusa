import React, { Suspense } from 'react'
import { SectionProps } from './dynamic-section-renderer'
import RelatedProducts from '@modules/products/components/related-products'

export default function RelatedProductsSection({ section, product, region, countryCode }: SectionProps) {
  return (
    <div className="py-12">
      <Suspense fallback={<div>Loading...</div>}>
        <RelatedProducts product={product} region={region} countryCode={countryCode} />
      </Suspense>
    </div>
  )
}
