import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import ThemedProductTemplate from "./themed-product-template"
import DynamicProductTemplate from "./dynamic-product-template"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images?: HttpTypes.StoreProductImage[]
  template?: any
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
  template,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Use dynamic template if available
  if (template && template.zones) {
    return (
      <DynamicProductTemplate
        product={product}
        region={region}
        countryCode={countryCode}
        images={images}
        template={template}
      />
    )
  }

  // Fallback to themed template
  return (
    <ThemedProductTemplate
      product={product}
      region={region}
      countryCode={countryCode}
      template={template}
    />
  )
}

export default ProductTemplate
