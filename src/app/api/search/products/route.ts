import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@lib/config'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const limit = parseInt(searchParams.get('limit') || '10')

  if (!query) {
    return NextResponse.json({ products: [] })
  }

  try {
    // Use Medusa SDK directly
    const { products, count } = await sdk.store.product.list({
      q: query,
      limit,
      fields: '+variants.calculated_price',
    })
    
    return NextResponse.json({ 
      products: products || [],
      count: count || 0
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search products', products: [] },
      { status: 500 }
    )
  }
}
