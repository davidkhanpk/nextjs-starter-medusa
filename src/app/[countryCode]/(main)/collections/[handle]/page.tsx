import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { fetchTemplate } from "@lib/template/api"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import PuckRenderer from "@/components/puck/PuckRenderer"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ handle: string; countryCode: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
  }>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  // Return empty — pages render on-demand via SSR.
  // Multi-tenant image has no Medusa backend at Docker build time.
  return []
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: collection.title,
    description: `${collection.title} collection`,
  } as Metadata

  return metadata
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection
  )

  if (!collection) {
    notFound()
  }

  // Fetch COLLECTION_PAGE template from Shopikool backend
  console.log('[Collection Page] Fetching COLLECTION_PAGE template...')
  const collectionTemplate = await fetchTemplate('COLLECTION_PAGE').catch((error) => {
    console.error('[Collection Page] Failed to fetch COLLECTION_PAGE template:', error)
    return null
  })

  console.log('[Collection Page] Collection template fetched:', collectionTemplate ? 'SUCCESS' : 'FAILED')
  
  if (collectionTemplate) {
    console.log('[Collection Page] Template ID:', collectionTemplate.id)
    console.log('[Collection Page] Template Name:', collectionTemplate.templateName)
    console.log('[Collection Page] Has puckData:', !!collectionTemplate.puckData)
  }

  // Use Puck template if available
  if (collectionTemplate && collectionTemplate.puckData) {
    console.log('[Collection Page] Rendering with Puck template')
    console.log('[Collection Page] Template data:', JSON.stringify(collectionTemplate.puckData, null, 2))
    
    return (
      <PuckRenderer 
        data={{
          ...collectionTemplate.puckData,
          context: {
            ...(collectionTemplate.puckData.context || {}),
            collection,
            countryCode: params.countryCode,
            sortBy: sortBy || 'created_at',
            page: page ? parseInt(page) : 1,
          }
        }}
      />
    )
  }

  console.log('[Collection Page] Falling back to original template')

  // Fallback to original template
  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  )
}
