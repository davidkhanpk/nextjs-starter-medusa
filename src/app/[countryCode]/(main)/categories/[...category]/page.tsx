import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { fetchTemplate } from "@lib/template/api"
import PuckRenderer from "@/components/puck/PuckRenderer"
import CategoryTemplate from "@modules/categories/templates"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  // Return empty — pages render on-demand via SSR.
  // Multi-tenant image has no Medusa backend at Docker build time.
  return []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    const description = productCategory.description || `${productCategory.name} category`

    return {
      title: productCategory.name,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  console.log('[Category Page] Fetching CATEGORY_PAGE template...')
  
  // Fetch CATEGORY_PAGE template from Shopikool backend
  const categoryTemplate = await fetchTemplate('CATEGORY_PAGE').catch((error) => {
    console.error('[Category Page] Failed to fetch CATEGORY_PAGE template:', error)
    return null
  })

  console.log('[Category Page] Category template fetched:', categoryTemplate ? 'SUCCESS' : 'FAILED')
  
  if (categoryTemplate) {
    console.log('[Category Page] Template ID:', categoryTemplate.id)
    console.log('[Category Page] Template Name:', categoryTemplate.templateName)
    console.log('[Category Page] Has puckData:', !!categoryTemplate.puckData)
  }

  // Fetch PRODUCT_CARD template separately
  console.log('[Category Page] Fetching PRODUCT_CARD template...')
  const productCardTemplate = await fetchTemplate('PRODUCT_CARD').catch((error) => {
    console.error('[Category Page] Failed to fetch PRODUCT_CARD template:', error)
    return null
  })

  console.log('[Category Page] Product card template fetched:', productCardTemplate ? 'SUCCESS' : 'FAILED')
  
  if (productCardTemplate) {
    console.log('[Category Page] Product Card Template ID:', productCardTemplate.id)
    console.log('[Category Page] Product Card Template Name:', productCardTemplate.templateName)
    console.log('[Category Page] Product Card puckData:', JSON.stringify(productCardTemplate.puckData, null, 2))
  }

  // Use Puck template if available
  if (categoryTemplate && categoryTemplate.puckData) {
    console.log('[Category Page] Rendering with Puck template')
    console.log('[Category Page] Template data:', JSON.stringify(categoryTemplate.puckData, null, 2))
    
    return (
      <PuckRenderer 
        data={{
          ...categoryTemplate.puckData,
          context: {
            ...(categoryTemplate.puckData.context || {}),
            category: productCategory,
            countryCode: params.countryCode,
            sortBy: sortBy || 'created_at',
            page: page ? parseInt(page) : 1,
            productCardTemplate: productCardTemplate || null,
          }
        }}
      />
    )
  }

  console.log('[Category Page] Falling back to old Medusa template')
  
  // Fallback to old Medusa template
  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      template={null}
    />
  )
}
