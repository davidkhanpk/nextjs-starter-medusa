import { retrieveCart } from "@lib/data/cart"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cart = await retrieveCart()
    
    return NextResponse.json({ cart })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart', cart: null },
      { status: 500 }
    )
  }
}
