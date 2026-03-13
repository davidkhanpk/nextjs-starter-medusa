import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { lineId: string } }
) {
  try {
    const { quantity } = await request.json()
    await updateLineItem({ lineId: params.lineId, quantity })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating line item:', error)
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { lineId: string } }
) {
  try {
    await deleteLineItem(params.lineId)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting line item:', error)
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}
