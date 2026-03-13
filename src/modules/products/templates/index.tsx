import React from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ThemedProductTemplate from "./themed-product-template"
import DynamicProductTemplate from "./dynamic-product-template"
import PuckRenderer from "@/components/puck/PuckRenderer"

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

  // Use Puck template if puckData is available (all templates are now Puck-based)
  if (template && template.puckData) {
    console.log('[ProductTemplate] Rendering with Puck template')
    console.log('[ProductTemplate] Template ID:', template.id)
    console.log('[ProductTemplate] Template Name:', template.templateName)
    console.log('[ProductTemplate] Product has images:', product.images?.length || 0)
    console.log('[ProductTemplate] Images prop:', images?.length || 0)
    
    // Ensure product has images - use images prop if product.images is empty
    const productWithImages = {
      ...product,
      images: product.images && product.images.length > 0 ? product.images : images || []
    }
    
    return (
      <PuckRenderer
        data={{
          ...template.puckData,
          context: {
            product: productWithImages,
            region,
            countryCode,
          }
        }}
      />
    )
  }

  console.log('[ProductTemplate] No Puck template, falling back to themed template')
  
  // Use dynamic zone-based template if available (legacy)
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
