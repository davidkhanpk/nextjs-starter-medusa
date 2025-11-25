/**
 * Dynamic Product Template
 * Renders product page based on template configuration from dashboard
 */

import React from 'react'
import { HttpTypes } from '@medusajs/types'
import { ProductTemplate, getZoneSections } from '@lib/template'
import DynamicSectionRenderer from '../components/template-sections/dynamic-section-renderer'

interface DynamicProductTemplateProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images?: HttpTypes.StoreProductImage[]
  template: ProductTemplate | null
}

export default function DynamicProductTemplate({
  product,
  region,
  countryCode,
  images,
  template,
}: DynamicProductTemplateProps) {
  // If no template, use fallback (existing static template)
  if (!template) {
    return <div>No template configured</div>
  }

  // Get sections for each zone
  const heroSections = getZoneSections(template, 'HERO')
  const aboveProductSections = getZoneSections(template, 'ABOVE_PRODUCT')
  const belowProductSections = getZoneSections(template, 'BELOW_PRODUCT')
  const trustSections = getZoneSections(template, 'TRUST_SECTION')
  const relatedSections = getZoneSections(template, 'RELATED_ITEMS')
  const recommendationsSections = getZoneSections(template, 'RECOMMENDATIONS')
  const recentlyViewedSections = getZoneSections(template, 'RECENTLY_VIEWED')

  // Render a zone
  const renderZone = (sections: any[], zoneName: string) => {
    if (!sections.length) return null

    return (
      <div className={`zone-${zoneName.toLowerCase()}`}>
        {sections.map((section) => (
          <DynamicSectionRenderer
            key={section.id}
            section={section}
            product={product}
            region={region}
            countryCode={countryCode}
            images={images}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="dynamic-product-template">
      {/* HERO Zone */}
      {renderZone(heroSections, 'HERO')}

      {/* ABOVE_PRODUCT Zone */}
      <div className="content-container">
        {renderZone(aboveProductSections, 'ABOVE_PRODUCT')}
      </div>

      {/* Main Product Section - Two Column Layout */}
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
          {/* Left Column: Gallery (from BELOW_PRODUCT zone) */}
          <div>
            {renderZone(
              belowProductSections.filter(s => s.type === 'product-gallery'),
              'GALLERY'
            )}
          </div>

          {/* Right Column: Product Info, Variants, Add to Cart */}
          <div className="space-y-6">
            {renderZone(
              belowProductSections.filter(s => 
                s.type !== 'product-gallery' && 
                ['product-info', 'product-variants', 'add-to-cart', 'size-guide', 'shipping-info'].includes(s.type)
              ),
              'PRODUCT_INFO'
            )}
          </div>
        </div>

        {/* Other BELOW_PRODUCT sections (tabs, reviews, etc.) */}
        {renderZone(
          belowProductSections.filter(s => 
            !['product-gallery', 'product-info', 'product-variants', 'add-to-cart', 'size-guide', 'shipping-info'].includes(s.type)
          ),
          'BELOW_PRODUCT_REST'
        )}
      </div>

      {/* TRUST_SECTION Zone */}
      <div className="content-container">
        {renderZone(trustSections, 'TRUST_SECTION')}
      </div>

      {/* RELATED_ITEMS Zone */}
      <div className="content-container">
        {renderZone(relatedSections, 'RELATED_ITEMS')}
      </div>

      {/* RECOMMENDATIONS Zone */}
      <div className="content-container">
        {renderZone(recommendationsSections, 'RECOMMENDATIONS')}
      </div>

      {/* RECENTLY_VIEWED Zone */}
      <div className="content-container">
        {renderZone(recentlyViewedSections, 'RECENTLY_VIEWED')}
      </div>
    </div>
  )
}
