import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sdk } from '@lib/config'
import { getRegion } from '@lib/data/regions'
import { sortProducts } from '@lib/util/sort-products'
import { fetchTemplate } from '@lib/template/api'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'
import {
  extractOptionGroups,
  filterProductsByOptions,
  parseOptionFilters,
} from '@lib/util/product-options'
import SearchResults from './search-results'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{
    q?: string
    sortBy?: SortOptions
    [key: string]: string | string[] | undefined
  }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q: query } = await searchParams

  return {
    title: query ? `Search results for "${query}"` : 'Search',
    description: query ? `Find products matching "${query}"` : 'Search products',
  }
}

export default async function SearchPage({ params, searchParams }: Props) {
  const [{ countryCode }, rawSearchParams] = await Promise.all([params, searchParams])
  const { q: query, sortBy = 'created_at', ...rawOptionParams } = rawSearchParams

  if (!query) {
    notFound()
  }

  const optionFilters = parseOptionFilters(rawOptionParams)

  const [region, searchData, productCardTemplate] = await Promise.all([
    getRegion(countryCode),
    sdk.store.product.list({
      q: query,
      limit: 100,
      fields: '+variants.calculated_price,+*options,+*options.values',
    } as any).catch(() => ({ products: [], count: 0 })),
    fetchTemplate('PRODUCT_CARD').catch(() => null),
  ])

  const { products: rawProducts } = searchData as { products: any[]; count: number }

  const optionGroups = extractOptionGroups(rawProducts)
  const filteredProducts = filterProductsByOptions(rawProducts, optionFilters)
  const products = sortProducts(filteredProducts, sortBy as SortOptions)

  return (
    <SearchResults
      query={query!}
      products={products}
      count={filteredProducts.length}
      region={region}
      countryCode={countryCode}
      sortBy={sortBy as SortOptions}
      productCardTemplate={productCardTemplate}
      optionGroups={optionGroups}
      optionFilters={optionFilters}
    />
  )
}
