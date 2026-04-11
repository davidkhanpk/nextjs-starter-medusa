import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { fetchTemplate } from "@lib/template/api"
import { listProducts } from "@lib/data/products"
import {
  extractOptionGroups,
  filterProductsByOptions,
  parseOptionFilters,
  OptionGroup,
  OptionFilters,
} from "@lib/util/product-options"

// Force dynamic rendering — this page uses searchParams and cookies()
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    [key: string]: string | string[] | undefined
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page, ...rawOptionParams } = searchParams

  const optionFilters = parseOptionFilters(rawOptionParams)

  // Fetch all products to build option groups for the filter sidebar
  const [productCardTemplate, allProductsResult] = await Promise.all([
    fetchTemplate('PRODUCT_CARD').catch(() => null),
    listProducts({
      queryParams: {
        limit: 100,
        fields: '+*options,+*options.values',
      } as any,
      countryCode: params.countryCode,
    }).catch(() => ({ response: { products: [], count: 0 }, nextPage: null })),
  ])

  const allProducts = allProductsResult.response.products
  const optionGroups: OptionGroup[] = extractOptionGroups(allProducts)

  const hasFilters = Object.values(optionFilters).some((v) => v.length > 0)
  const filteredProductIds: string[] | undefined = hasFilters
    ? filterProductsByOptions(allProducts, optionFilters).map((p) => p.id!)
    : undefined

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      productCardTemplate={productCardTemplate}
      optionGroups={optionGroups}
      optionFilters={optionFilters}
      filteredProductIds={filteredProductIds}
    />
  )
}
