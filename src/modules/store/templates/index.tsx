import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { TemplateResponse } from "@lib/template/types"
import { OptionGroup, OptionFilters } from "@lib/util/product-options"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  productCardTemplate,
  optionGroups,
  optionFilters,
  filteredProductIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  productCardTemplate?: TemplateResponse | null
  optionGroups?: OptionGroup[]
  optionFilters?: OptionFilters
  filteredProductIds?: string[]
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList
        sortBy={sort}
        optionGroups={optionGroups}
        optionFilters={optionFilters}
      />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
        </div>

        {filteredProductIds !== undefined && filteredProductIds.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-xl font-medium mb-2">No products match your filters</div>
            <p className="text-base text-gray-500">Try removing some filters</p>
          </div>
        ) : (
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              productCardTemplate={productCardTemplate}
              productsIds={filteredProductIds}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default StoreTemplate
