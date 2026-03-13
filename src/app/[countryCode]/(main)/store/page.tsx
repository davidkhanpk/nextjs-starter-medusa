import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { fetchTemplate } from "@lib/template/api"

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
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams

  // Fetch PRODUCT_CARD template from Shopikool backend
  const productCardTemplate = await fetchTemplate('PRODUCT_CARD').catch(() => null)

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      productCardTemplate={productCardTemplate}
    />
  )
}
