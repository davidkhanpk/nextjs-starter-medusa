import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import ModernProductPreview from "./modern-product-preview"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <ModernProductPreview
      product={product}
      cheapestPrice={cheapestPrice}
      isFeatured={isFeatured}
      region={region}
    />
  )
}
