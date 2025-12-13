import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import { ProductTemplate } from "@lib/template"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import InteractiveLink from "@modules/common/components/interactive-link"

type DynamicCategoryTemplateProps = {
  category: HttpTypes.StoreProductCategory
  template: ProductTemplate
  sortBy: SortOptions
  page: number
  countryCode: string
}

export default function DynamicCategoryTemplate({
  category,
  template,
  sortBy,
  page,
  countryCode,
}: DynamicCategoryTemplateProps) {
  const zones = template.zones || {}
  const settings = template.settings || {}

  // Extract layout settings
  const layout = zones.layout || {}
  const gridColumns = layout.gridColumns || 4
  const showBreadcrumbs = layout.showBreadcrumbs !== false
  const showDescription = layout.showDescription !== false
  const showChildCategories = layout.showChildCategories !== false

  // Product grid settings
  const productGrid = zones.productGrid || {}
  const productsPerPage = productGrid.itemsPerPage || 12

  // Get parent categories for breadcrumbs
  const parents = [] as HttpTypes.StoreProductCategory[]
  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }
  getParents(category)

  // Grid column classes
  const gridColsMap: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 small:grid-cols-3',
    4: 'grid-cols-2 small:grid-cols-3 medium:grid-cols-4',
    5: 'grid-cols-2 small:grid-cols-3 medium:grid-cols-5',
    6: 'grid-cols-2 small:grid-cols-3 medium:grid-cols-6',
  }
  const gridClass = gridColsMap[gridColumns] || gridColsMap[4]

  return (
    <div className="py-6 content-container" data-testid="category-container">
      <div className="w-full">
        {/* Breadcrumbs */}
        {showBreadcrumbs && parents.length > 0 && (
          <div className="flex flex-row mb-4 text-sm text-ui-fg-subtle gap-2">
            {parents.reverse().map((parent) => (
              <span key={parent.id} className="flex items-center gap-2">
                <LocalizedClientLink
                  className="hover:text-black"
                  href={`/categories/${parent.handle}`}
                >
                  {parent.name}
                </LocalizedClientLink>
                <span>/</span>
              </span>
            ))}
          </div>
        )}

        {/* Category Title */}
        <h1 className="text-2xl-semi mb-4" data-testid="category-page-title">
          {category.name}
        </h1>

        {/* Category Description */}
        {showDescription && category.description && (
          <div className="mb-6 text-base-regular text-ui-fg-subtle">
            <p>{category.description}</p>
          </div>
        )}

        {/* Child Categories */}
        {showChildCategories && category.category_children && category.category_children.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Subcategories</h2>
            <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-4">
              {category.category_children.map((c) => (
                <li key={c.id}>
                  <InteractiveLink 
                    href={`/categories/${c.handle}`}
                    className="block p-4 border border-ui-border-base rounded-lg hover:border-ui-border-interactive transition-colors"
                  >
                    <span className="text-base font-medium">{c.name}</span>
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Products Grid */}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? productsPerPage}
            />
          }
        >
          <PaginatedProducts
            sortBy={sortBy}
            page={page}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
