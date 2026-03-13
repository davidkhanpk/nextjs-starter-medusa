/**
 * Shopikool Store Info API
 * Fetches basic store info (name, logo) from the platform backend
 */

export interface StoreInfo {
  id: string
  name: string
  logo: string | null
}

/**
 * Fetch basic store info (name, logo URL)
 */
export async function fetchStoreInfo(): Promise<StoreInfo | null> {
  const BACKEND_URL = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000/api'
  const STORE_ID = process.env.STORE_ID

  if (!STORE_ID) {
    console.error('[StoreInfo] STORE_ID environment variable is not set')
    return null
  }

  try {
    const response = await fetch(`${BACKEND_URL}/public/stores/id/${STORE_ID}/info`, {
      next: {
        tags: ['store-info'],
        revalidate: 60, // Cache for 1 minute
      },
    })

    if (!response.ok) {
      console.error(`[StoreInfo] Failed to fetch: ${response.status} ${response.statusText}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('[StoreInfo] Error fetching store info:', error)
    return null
  }
}
