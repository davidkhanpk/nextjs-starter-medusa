import { NextRequest, NextResponse } from 'next/server'
import { PageLayout } from '@lib/page-builder/types'
import { getDefaultLayout } from '@lib/page-builder/api'

/**
 * GET /api/page-builder/layouts
 * Fetch page layout for a store
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('storeId') || 'default'

    // TODO: Fetch from database when available
    // For now, try to get from a JSON file or return default
    
    // In production, you would:
    // 1. Query your database for the store's layout
    // 2. Check cache (Redis) first
    // 3. Return default if not found

    const defaultLayout = getDefaultLayout()

    return NextResponse.json({
      currentLayout: defaultLayout,
      storeId,
    })
  } catch (error) {
    console.error('Error fetching page layout:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page layout' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/page-builder/layouts
 * Save page layout for a store
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { storeId, layout } = body as {
      storeId: string
      layout: PageLayout
    }

    if (!storeId || !layout) {
      return NextResponse.json(
        { error: 'Missing storeId or layout' },
        { status: 400 }
      )
    }

    // TODO: Save to database when available
    // For now, this is a placeholder that would:
    // 1. Validate the layout structure
    // 2. Save to database with storeId as key
    // 3. Invalidate cache
    // 4. Return success response

    console.log(`Saving layout for store ${storeId}:`, layout)

    return NextResponse.json({
      success: true,
      storeId,
      layoutId: layout.id,
    })
  } catch (error) {
    console.error('Error saving page layout:', error)
    return NextResponse.json(
      { error: 'Failed to save page layout' },
      { status: 500 }
    )
  }
}
