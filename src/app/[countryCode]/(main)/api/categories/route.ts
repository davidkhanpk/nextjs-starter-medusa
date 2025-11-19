import { NextResponse } from 'next/server'
import { sdk } from '@lib/config'
import { getCacheOptions } from '@lib/data/cookies'

export async function GET() {
  try {
    const next = {
      ...(await getCacheOptions('products')),
    }

    // Fetch categories from Medusa
    const response = await sdk.client.fetch<{
      product_categories: any[]
      count: number
    }>(`/store/product-categories`, {
      method: 'GET',
      query: {
        fields: '+product_count',
        limit: 100,
      },
      next,
      cache: 'force-cache',
    })

    return NextResponse.json({
      product_categories: response.product_categories,
      count: response.count,
    })
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories', product_categories: [], count: 0 },
      { status: 500 }
    )
  }
}
