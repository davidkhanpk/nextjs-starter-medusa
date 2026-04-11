import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { HttpTypes } from "@medusajs/types"
import { fetchTemplate } from "@lib/template/api"
import { fetchStoreInfo } from "@lib/store/api"

// Force dynamic rendering — this page uses cookies() and searchParams
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

export async function generateStaticParams() {
  // Return empty — pages render on-demand via SSR.
  // Multi-tenant image has no Medusa backend at Docker build time.
  return []
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images
  }

  const variant = product.variants!.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images?.length) {
    return product.images
  }

  const imageIdsMap = new Map(variant.images.map((i) => [i.id, true]))
  return product.images!.filter((i) => imageIdsMap.has(i.id))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const params = await props.params
    const { handle } = params
    const region = await getRegion(params.countryCode)

    if (!region) {
      notFound()
    }

    const [product, storeInfo] = await Promise.all([
      listProducts({
        countryCode: params.countryCode,
        queryParams: { handle },
      }).then(({ response }) => response.products[0]),
      fetchStoreInfo().catch(() => null),
    ])

    if (!product) {
      notFound()
    }

    const storeName = storeInfo?.name || 'Store'
    const productDescription = product.description || product.title

    return {
      title: product.title,
      description: productDescription,
      openGraph: {
        title: `${product.title} | ${storeName}`,
        description: productDescription,
        images: product.thumbnail ? [product.thumbnail] : [],
      },
    }
  } catch (error: any) {
    // Re-throw notFound errors
    if (error?.digest === 'NEXT_NOT_FOUND') {
      throw error
    }
    console.error('[Product Page] generateMetadata error:', error)
    return {
      title: 'Product | Store',
    }
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  const images = getImagesForVariant(pricedProduct, selectedVariantId)

  // Load product template using fetchTemplate (Puck-based)
  console.log('[Product Page] Fetching PRODUCT_PAGE template...')
  const template = await fetchTemplate('PRODUCT_PAGE').catch((error) => {
    console.error('[Product Page] Failed to fetch PRODUCT_PAGE template:', error)
    return null
  })

  console.log('[Product Page] Product template fetched:', template ? 'SUCCESS' : 'FAILED')
  
  if (template) {
    console.log('[Product Page] Template ID:', template.id)
    console.log('[Product Page] Template Name:', template.templateName)
    console.log('[Product Page] Has puckData:', !!template.puckData)
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
      images={images}
      template={template}
    />
  )
}
