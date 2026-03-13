/**
 * Shopikool Page Builder API
 * Fetches pages created with the Puck visual editor
 */

import { PageLayout } from './types'

export interface PageData {
  id: string
  pageType: string
  pageName: string
  slug: string
  status: string
  puckData: any
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
}

/**
 * Fetch the default homepage
 */
export async function getDefaultHomepage(): Promise<PageData | null> {
  const BACKEND_URL = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000/api'
  const STORE_ID = process.env.STORE_ID
 
  if (!STORE_ID) {
    console.error('STORE_ID environment variable is not set')
    return null
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/stores/${STORE_ID}/pages/default/HOMEPAGE`,
      {
        next: {
          tags: ['homepage'],
          revalidate: 300, // Cache for 5 minutes
        },
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch homepage:', response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return null
  }
}

/**
 * Fetch a page by slug (for custom pages)
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  const BACKEND_URL = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000/api'
  const STORE_ID = process.env.STORE_ID

  if (!STORE_ID) {
    console.error('STORE_ID environment variable is not set')
    return null
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/stores/${STORE_ID}/pages/slug/${slug}`,
      {
        next: {
          tags: ['page', `page-${slug}`],
          revalidate: 300, // Cache for 5 minutes
        },
      }
    )

    if (!response.ok) {
      console.error(`Failed to fetch page ${slug}:`, response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error)
    return null
  }
}

/**
 * Get all published pages (for navigation/sitemap)
 */
export async function getAllPublishedPages(): Promise<PageData[]> {
  const BACKEND_URL = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000/api'
  const STORE_ID = process.env.STORE_ID

  if (!STORE_ID) {
    console.error('STORE_ID environment variable is not set')
    return []
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/stores/${STORE_ID}/pages?status=PUBLISHED`,
      {
        next: {
          tags: ['pages'],
          revalidate: 600, // Cache for 10 minutes
        },
      }
    )

    if (!response.ok) {
      console.error('Failed to fetch pages:', response.statusText)
      return []
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

/**
 * Get default page layout
 * Returns a default layout structure for new stores
 */
export function getDefaultLayout(): PageLayout {
  return {
    id: 'default',
    name: 'Default Layout',
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

