import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"

import ThemedFooter from "./themed-footer"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <ThemedFooter 
      collections={collections}
      productCategories={productCategories}
    />
  )
}
