/**
 * Dynamic Section Renderer
 * Renders product template sections based on configuration from dashboard
 */

import React from 'react'
import { HttpTypes } from '@medusajs/types'
import { TemplateSection } from '@lib/template'

// Import all section components
import ProductGallerySection from './product-gallery-section'
import ProductInfoSection from './product-info-section'
import ProductVariantsSection from './product-variants-section'
import AddToCartSection from './add-to-cart-section'
import ReviewsSection from './reviews-section'
import ProductTabsSection from './product-tabs-section'
import RelatedProductsSection from './related-products-section'
import RecentlyViewedSection from './recently-viewed-section'
import TrustBadgesSection from './trust-badges-section'
import BreadcrumbsSection from './breadcrumbs-section'
import StickyBarSection from './sticky-bar-section'
import EyeCatcherSection from './eye-catcher-section'
import SizeGuideSection from './size-guide-section'
import ShippingInfoSection from './shipping-info-section'
import CustomHTMLSection from './custom-html-section'

export interface SectionProps {
  section: TemplateSection
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images?: HttpTypes.StoreProductImage[]
}

const SECTION_COMPONENTS: Record<string, React.ComponentType<SectionProps>> = {
  'product-gallery': ProductGallerySection,
  'product-info': ProductInfoSection,
  'product-variants': ProductVariantsSection,
  'add-to-cart': AddToCartSection,
  'reviews': ReviewsSection,
  'product-tabs': ProductTabsSection,
  'related-products': RelatedProductsSection,
  'recently-viewed': RecentlyViewedSection,
  'trust-badges': TrustBadgesSection,
  'breadcrumbs': BreadcrumbsSection,
  'sticky-bar': StickyBarSection,
  'eye-catcher': EyeCatcherSection,
  'size-guide': SizeGuideSection,
  'shipping-info': ShippingInfoSection,
  'custom-html': CustomHTMLSection,
}

interface DynamicSectionRendererProps {
  section: TemplateSection
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images?: HttpTypes.StoreProductImage[]
}

export default function DynamicSectionRenderer({
  section,
  product,
  region,
  countryCode,
  images,
}: DynamicSectionRendererProps) {
  const SectionComponent = SECTION_COMPONENTS[section.type]

  if (!SectionComponent) {
    console.warn(`Unknown section type: ${section.type}`)
    return null
  }

  return (
    <div key={section.id} data-section-type={section.type} data-section-id={section.id}>
      <SectionComponent
        section={section}
        product={product}
        region={region}
        countryCode={countryCode}
        images={images}
      />
    </div>
  )
}
