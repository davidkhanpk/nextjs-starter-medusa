import { HttpTypes } from '@medusajs/types'
import { getProductsList } from '@lib/data/products'

/**
 * Fetch products from a specific category
 */
export async function getCategoryProducts(
  region: HttpTypes.StoreRegion,
  categoryId: string,
  limit: number = 8
): Promise<HttpTypes.StoreProduct[]> {
  try {
    const { products } = await getProductsList({
      queryParams: {
        limit,
        fields: '*variants.calculated_price',
        category_id: [categoryId],
        region_id: region.id,
      },
      countryCode: region.countries[0]?.iso_2 || 'us',
    })

    return products
  } catch (error) {
    console.error('Error fetching category products:', error)
    return []
  }
}

/**
 * Fetch product categories with product counts
 */
export async function getCategories(categoryIds?: string[]) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/product-categories`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['categories'],
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    const data = await response.json()
    let categories = data.product_categories || []

    // Filter by specific category IDs if provided
    if (categoryIds && categoryIds.length > 0) {
      categories = categories.filter((cat: any) => categoryIds.includes(cat.id))
    }

    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Fetch product collections
 */
export async function getCollections(collectionIds?: string[]) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/collections`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['collections'],
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch collections')
    }

    const data = await response.json()
    let collections = data.collections || []

    // Filter by specific collection IDs if provided
    if (collectionIds && collectionIds.length > 0) {
      collections = collections.filter((col: any) => collectionIds.includes(col.id))
    }

    return collections
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}
