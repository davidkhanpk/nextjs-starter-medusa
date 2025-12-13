import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { CollectionPageRenderer } from "@components/template-renderers/CollectionPageRenderer"
import { fetchTemplateBySubdomain } from "@lib/template/api"
import { CollectionTemplate as CollectionTemplateType } from "@lib/template/types"
import { getProductsByCollectionId } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { ProductTemplate } from "@lib/template"

export default async function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  template,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
  template?: ProductTemplate | null
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Use provided template or fetch from subdomain
  const finalTemplate = template || await fetchTemplateBySubdomain<CollectionTemplateType>('COLLECTION_PAGE').catch(() => null)

  // Use template renderer if available
  if (finalTemplate) {
    const products = await getProductsByCollectionId({
      collectionId: collection.id,
      countryCode,
      page: pageNumber,
      sortBy: sort,
    }).catch(() => [])

    return (
      <CollectionPageRenderer
        template={finalTemplate}
        collection={collection}
        products={products}
      />
    )
  }

  // Fallback to original layout
  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>{collection.title}</h1>
        </div>
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
