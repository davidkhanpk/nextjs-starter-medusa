import { retrieveCollection } from "@lib/data/collections"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await retrieveCollection(params.id)
    
    return NextResponse.json({ collection })
  } catch (error) {
    console.error('Error fetching collection:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collection', collection: null },
      { status: 500 }
    )
  }
}
