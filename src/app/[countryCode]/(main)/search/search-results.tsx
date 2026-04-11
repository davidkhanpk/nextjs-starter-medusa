import { HttpTypes } from '@medusajs/types'
import ProductPreview from '@modules/products/components/product-preview'
import RefinementList from '@modules/store/components/refinement-list'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'
import { TemplateResponse } from '@lib/template/types'
import { OptionGroup, OptionFilters } from '@lib/util/product-options'

interface SearchResultsProps {
  query: string
  products: HttpTypes.StoreProduct[]
  count: number
  region: HttpTypes.StoreRegion | null
  countryCode: string
  sortBy: SortOptions
  productCardTemplate?: TemplateResponse | null
  optionGroups?: OptionGroup[]
  optionFilters?: OptionFilters
}

export default async function SearchResults({
  query,
  products,
  count,
  region,
  countryCode,
  sortBy,
  productCardTemplate,
  optionGroups,
  optionFilters,
}: SearchResultsProps) {
  if (!region) {
    return (
      <div className="content-container py-6 text-center text-gray-500">
        Region not available. Please try again.
      </div>
    )
  }

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="search-container"
    >
      {/* Sort + filter sidebar */}
      <RefinementList
        sortBy={sortBy}
        optionGroups={optionGroups}
        optionFilters={optionFilters}
      />

      {/* Results */}
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl-semi">
            {count} {count === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
          </h1>
        </div>

        {products.length > 0 ? (
          <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
            {products.map((product) => (
              <li key={product.id}>
                <ProductPreview
                  product={product}
                  region={region}
                  countryCode={countryCode}
                  productCardTemplate={productCardTemplate}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-16">
            <div className="text-xl font-medium mb-2">No products found</div>
            <p className="text-base mb-6 text-gray-500">
              Try different keywords or remove some filters
            </p>
            <a
              href={`/${countryCode}`}
              className="inline-block px-6 py-3 rounded-lg bg-black text-white font-medium transition-colors hover:bg-gray-800"
            >
              Back to Home
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

