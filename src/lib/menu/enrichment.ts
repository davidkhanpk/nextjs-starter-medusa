/**
 * Menu Enrichment Logic
 * Fetches Medusa category/collection data and enriches menu items
 */

import { MenuItem, EnrichedMenuItem, Menu, EnrichedMenu } from './types'
import { listCategories } from '@lib/data/categories'
import { listCollections } from '@lib/data/collections'
import { HttpTypes } from "@medusajs/types"

/**
 * Enrich a single menu item with Medusa data
 */
async function enrichMenuItem(
  item: MenuItem,
  categories: HttpTypes.StoreProductCategory[],
  collections: HttpTypes.StoreCollection[]
): Promise<EnrichedMenuItem> {
  const enrichedItem: EnrichedMenuItem = { ...item }

  try {
    if (item.type === 'category' && item.entityId) {
      // Find category by ID
      const category = categories.find(cat => cat.id === item.entityId)
      
      if (category) {
        // Get subcategories (category_children)
        const subcategories = (category.category_children || []).map(sub => ({
          id: sub.id,
          name: sub.name,
          handle: sub.handle,
          description: sub.description || undefined
        }))

        enrichedItem.enrichedData = {
          category: {
            id: category.id,
            name: category.name,
            handle: category.handle,
            description: category.description || undefined,
            metadata: category.metadata || undefined,
            subcategories
          },
          resolvedUrl: `/categories/${category.handle}`
        }
      }
    } else if (item.type === 'collection' && item.entityId) {
      // Find collection by ID
      const collection = collections.find(col => col.id === item.entityId)
      
      if (collection) {
        enrichedItem.enrichedData = {
          collection: {
            id: collection.id,
            title: collection.title,
            handle: collection.handle,
            metadata: collection.metadata || undefined
          },
          resolvedUrl: `/collections/${collection.handle}`
        }
      }
    } else if (item.type === 'custom' && item.url) {
      enrichedItem.enrichedData = {
        resolvedUrl: item.url
      }
    } else if (item.type === 'page' && item.entityId) {
      // For pages, use the entityId as slug
      enrichedItem.enrichedData = {
        resolvedUrl: `/pages/${item.entityId}`
      }
    }
  } catch (error) {
    console.error(`[Menu Enrichment] Error enriching item ${item.id}:`, error)
  }

  // Recursively enrich children
  if (item.children && item.children.length > 0) {
    enrichedItem.children = await Promise.all(
      item.children.map(child => enrichMenuItem(child, categories, collections))
    )
  }

  return enrichedItem
}

/**
 * Enrich entire menu with Medusa data
 * Fetches categories and collections, then enriches all menu items
 */
export async function enrichMenuWithMedusaData(menu: Menu): Promise<EnrichedMenu> {
  try {
    console.log('[Menu Enrichment] Starting enrichment for menu:', menu.handle)

    // Fetch all categories and collections in parallel
    const [categoriesResponse, collectionsResponse] = await Promise.all([
      listCategories({ limit: 100 }), // Fetch more categories for mega menus
      listCollections()
    ])

    const categories = categoriesResponse?.product_categories || []
    const collections = collectionsResponse?.collections || []

    console.log('[Menu Enrichment] Fetched:', {
      categories: categories.length,
      collections: collections.length
    })

    // Enrich all menu items
    const enrichedItems = await Promise.all(
      menu.items.map(item => enrichMenuItem(item, categories, collections))
    )

    const enrichedMenu: EnrichedMenu = {
      ...menu,
      items: enrichedItems
    }

    console.log('[Menu Enrichment] Enrichment complete')
    return enrichedMenu

  } catch (error) {
    console.error('[Menu Enrichment] Error enriching menu:', error)
    // Return menu as-is if enrichment fails
    return { ...menu, items: menu.items as EnrichedMenuItem[] }
  }
}

/**
 * Filter visible menu items
 */
export function filterVisibleItems(items: EnrichedMenuItem[]): EnrichedMenuItem[] {
  return items
    .filter(item => item.isVisible)
    .map(item => ({
      ...item,
      children: item.children ? filterVisibleItems(item.children) : undefined
    }))
}

/**
 * Get top-level menu items only
 */
export function getTopLevelItems(items: EnrichedMenuItem[]): EnrichedMenuItem[] {
  return items.filter(item => !item.parentId)
}
