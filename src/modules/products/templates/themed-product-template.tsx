'use client'

import React, { Suspense } from "react"
import { useTheme } from "@lib/theme/ThemeProvider"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ThemedProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ThemedProductTemplate: React.FC<ThemedProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  const { theme, loading } = useTheme()

  // Show default layout while loading
  if (loading) {
    return (
      <>
        <div
          className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
          data-testid="product-container"
        >
          <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
            <ProductInfo product={product} />
            <ProductTabs product={product} />
          </div>
          <div className="block w-full relative">
            <ImageGallery images={product?.images || []} />
          </div>
          <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>
      </>
    )
  }

  const productPageConfig = theme.components.productPage
  const layout = productPageConfig?.layout || 'standard'

  // Layout: Standard (side-by-side)
  if (layout === 'standard') {
    return (
      <>
        <div
          className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
          data-testid="product-container"
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          {/* Left: Product Info */}
          <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
            <ProductInfo product={product} />
            <ProductTabs product={product} />
          </div>

          {/* Center: Image Gallery */}
          <div className="block w-full relative">
            <ImageGallery images={product?.images || []} />
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </div>

        {/* Related Products */}
        {productPageConfig?.relatedProducts?.enabled && (
          <div
            className="content-container my-16 small:my-32"
            data-testid="related-products-container"
            style={{
              backgroundColor: theme.colors.background,
            }}
          >
            <Suspense fallback={<SkeletonRelatedProducts />}>
              <RelatedProducts product={product} countryCode={countryCode} />
            </Suspense>
          </div>
        )}
      </>
    )
  }

  // Layout: Centered (image top, info bottom)
  if (layout === 'centered') {
    return (
      <>
        <div
          className="content-container flex flex-col items-center py-6 relative max-w-4xl mx-auto"
          data-testid="product-container"
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          {/* Image Gallery */}
          <div className="w-full mb-8">
            <ImageGallery images={product?.images || []} />
          </div>

          {/* Product Info & Actions */}
          <div className="w-full flex flex-col gap-y-8">
            <ProductInfo product={product} />
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <ProductTabs product={product} />
          </div>
        </div>

        {/* Related Products */}
        {productPageConfig?.relatedProducts?.enabled && (
          <div
            className="content-container my-16 small:my-32"
            data-testid="related-products-container"
          >
            <Suspense fallback={<SkeletonRelatedProducts />}>
              <RelatedProducts product={product} countryCode={countryCode} />
            </Suspense>
          </div>
        )}
      </>
    )
  }

  // Default: Standard layout
  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="block w-full relative">
          <ImageGallery images={product?.images || []} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      {/* Related Products */}
      {productPageConfig?.relatedProducts?.enabled && (
        <div
          className="content-container my-16 small:my-32"
          data-testid="related-products-container"
        >
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      )}
    </>
  )
}

export default ThemedProductTemplate
