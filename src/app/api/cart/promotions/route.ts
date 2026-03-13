import { applyPromotions } from "@lib/data/cart"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { codes } = await request.json()
    
    if (!Array.isArray(codes)) {
      return NextResponse.json(
        { error: 'Codes must be an array' },
        { status: 400 }
      )
    }
    
    await applyPromotions(codes)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error applying promotions:', error)
    return NextResponse.json(
      { error: 'Failed to apply discount' },
      { status: 500 }
    )
  }
}
