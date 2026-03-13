import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { TemplateResponse } from "@lib/template/types"
import ModernProductPreview from "./modern-product-preview"
import TemplateProductCard from "./template-product-card"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  countryCode,
  productCardTemplate,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  countryCode?: string
  productCardTemplate?: TemplateResponse | null
}) {
  // Use Puck product card template when available (same renderer as CategoryProductsGrid)
  if (productCardTemplate?.puckData?.root?.props) {
    return (
      <TemplateProductCard
        product={product}
        region={region}
        productCardTemplate={productCardTemplate}
        countryCode={countryCode}
      />
    )
  }

  // Fallback to ModernProductPreview (hardcoded card)
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <ModernProductPreview
      product={product}
      cheapestPrice={cheapestPrice ?? undefined}
      isFeatured={isFeatured}
      region={region}
    />
  )
}
