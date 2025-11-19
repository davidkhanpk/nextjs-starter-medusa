import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'
import { HttpTypes } from '@medusajs/types'
import { getAuthHeaders, getCacheOptions } from '@lib/data/cookies'
import { getRegion } from '@lib/data/regions'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const countryCode = searchParams.get('countryCode') || 'us'
  const limit = parseInt(searchParams.get('limit') || '10')

  if (!query) {
    return NextResponse.json({ products: [], count: 0 })
  }

  try {
    // Get region for country code
    const region = await getRegion(countryCode)
    
    if (!region) {
      return NextResponse.json({ products: [], count: 0 })
    }

    const headers = {
      ...(await getAuthHeaders()),
    }

    const next = {
      ...(await getCacheOptions('products')),
    }

    // Search products using Medusa SDK
    const response = await sdk.client.fetch<{
      products: HttpTypes.StoreProduct[]
      count: number
    }>(`/store/products`, {
      method: 'GET',
      query: {
        q: query,
        limit,
        region_id: region.id,
        fields: '*variants.calculated_price,+variants.inventory_quantity',
      },
      headers,
      next,
      cache: 'no-store', // Don't cache search results
    })

    return NextResponse.json({
      products: response.products,
      count: response.count,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search products', products: [], count: 0 },
      { status: 500 }
    )
  }
}
