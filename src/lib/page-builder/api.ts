import { PageLayout } from './types'

/**
 * Get page layout for a store
 */
export async function getPageLayout(storeId?: string): Promise<PageLayout | null> {
  try {
    // Get store ID from environment variable
    const actualStoreId = storeId || process.env.STORE_ID || 'default'
    
    // Fetch from Shopikool API
    const shopikoolUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    
    const response = await fetch(
      `${shopikoolUrl}/api/stores/${actualStoreId}/homepage-layout`,
      {
        next: {
          tags: ['page-layout'],
          revalidate: 300, // Cache for 5 minutes
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      return {
        id: actualStoreId,
        name: 'Store Homepage',
        sections: data.sections || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }

    // Fallback to default layout
    return getDefaultLayout()
  } catch (error) {
    console.error('Error fetching page layout:', error)
    return getDefaultLayout()
  }
}

/**
 * Get default homepage layout
 */
export function getDefaultLayout(): PageLayout {
  return {
    id: 'default',
    name: 'Default Homepage Layout',
    sections: [
      {
        id: 'hero_1',
        type: 'hero',
        enabled: true,
        order: 0,
        title: 'Welcome to Our Store',
        subtitle: 'Discover amazing products',
        variant: 'gradient',
        height: 'md',
        ctaText: 'Shop Now',
        ctaLink: '/store',
        textAlign: 'center',
        showScrollIndicator: true,
      },
      {
        id: 'categories_1',
        type: 'categories-grid',
        enabled: true,
        order: 1,
        title: 'Shop by Category',
        subtitle: 'Browse our product categories',
        layout: 'grid',
        columns: 4,
        showProductCount: true,
        showImages: true,
        imageShape: 'rounded',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Save page layout
 */
export async function savePageLayout(
  storeId: string,
  layout: PageLayout
): Promise<boolean> {
  try {
    const response = await fetch('/api/page-builder/layouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storeId,
        layout,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('Error saving page layout:', error)
    return false
  }
}
