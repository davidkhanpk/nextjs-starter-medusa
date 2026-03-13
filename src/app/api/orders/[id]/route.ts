import { retrieveOrder } from "@lib/data/orders"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await retrieveOrder(params.id)
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found', order: null },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order', order: null },
      { status: 500 }
    )
  }
}
