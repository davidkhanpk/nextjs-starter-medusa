import { listProducts } from "@lib/data/products"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    const queryParams: any = {
      limit: parseInt(searchParams.get('limit') || '12'),
      offset: parseInt(searchParams.get('offset') || '0'),
    }
    
    // Collection filter
    if (searchParams.get('collection_id')) {
      queryParams.collection_id = [searchParams.get('collection_id')]
    }
    
    // Category filter
    if (searchParams.get('category_id')) {
      queryParams.category_id = searchParams.get('category_id')?.split(',')
    }
    
    // Price filters
    if (searchParams.get('price[gte]')) {
      queryParams['price[gte]'] = searchParams.get('price[gte]')
    }
    if (searchParams.get('price[lte]')) {
      queryParams['price[lte]'] = searchParams.get('price[lte]')
    }
    
    // Sorting
    const order = searchParams.get('order')
    if (order) {
      queryParams.order = order
    }
    
    // Get country code from cookies or default to US
    const countryCode = request.cookies.get('countryCode')?.value || 'us'
    
    const result = await listProducts({
      pageParam: 1,
      queryParams,
      countryCode,
    })
    
    return NextResponse.json({
      products: result.response.products,
      count: result.response.count,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', products: [], count: 0 },
      { status: 500 }
    )
  }
}
