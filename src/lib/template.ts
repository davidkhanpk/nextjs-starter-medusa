/**
 * Template System Client
 * Fetches template configurations from Shopikool backend
 */

export interface TemplateSection {
  id: string
  type: string
  enabled: boolean
  order: number
  [key: string]: any // Configuration options
}

export interface ProductTemplate {
  id: string
  storeId: string
  templateType: 'PRODUCT_PAGE' | 'COLLECTION_PAGE' | 'CATEGORY_PAGE' | 'CART_PAGE' | 'CHECKOUT_PAGE' | 'ACCOUNT_PAGE' | 'ORDER_CONFIRMATION_PAGE' | 'HEADER' | 'FOOTER' | 'SIDEBAR'
  templateName: string
  status: 'DRAFT' | 'PUBLISHED'
  isDefault: boolean
  zones: Record<string, any>
  settings?: any
  createdAt: string
  updatedAt: string
}

/**
 * Fetch the default published product template for a store
 */
export async function getDefaultProductTemplate(storeId: string): Promise<ProductTemplate | null> {
  try {
    const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/templates/active/PRODUCT_PAGE`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No active product template found for store ${storeId}`)
        return null
      }
      throw new Error(`Failed to fetch template: ${response.statusText}`)
    }

    const template = await response.json()
    return template
  } catch (error) {
    console.error('Error fetching product template:', error)
    return null
  }
}

/**
 * Fetch the default published category template for a store
 */
export async function getDefaultCategoryTemplate(storeId: string): Promise<ProductTemplate | null> {
  try {
    const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/templates/active/CATEGORY_PAGE`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No active category template found for store ${storeId}`)
        return null
      }
      throw new Error(`Failed to fetch template: ${response.statusText}`)
    }

    const template = await response.json()
    return template
  } catch (error) {
    console.error('Error fetching category template:', error)
    return null
  }
}

/**
 * Fetch the default published collection template for a store
 */
export async function getDefaultCollectionTemplate(storeId: string): Promise<ProductTemplate | null> {
  try {
    const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/templates/active/COLLECTION_PAGE`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No active collection template found for store ${storeId}`)
        return null
      }
      throw new Error(`Failed to fetch template: ${response.statusText}`)
    }

    const template = await response.json()
    return template
  } catch (error) {
    console.error('Error fetching collection template:', error)
    return null
  }
}

/**
 * Fetch the default published checkout template for a store
 */
export async function getDefaultCheckoutTemplate(storeId: string): Promise<ProductTemplate | null> {
  try {
    const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/templates/active/CHECKOUT_PAGE`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No active checkout template found for store ${storeId}`)
        return null
      }
      throw new Error(`Failed to fetch template: ${response.statusText}`)
    }

    const template = await response.json()
    return template
  } catch (error) {
    console.error('Error fetching checkout template:', error)
    return null
  }
}

/**
 * Fetch a specific template by ID
 */
export async function getTemplateById(storeId: string, templateId: string): Promise<ProductTemplate | null> {
  try {
    const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/templates/${templateId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 300,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch template: ${response.statusText}`)
    }

    const template = await response.json()
    return template
  } catch (error) {
    console.error('Error fetching template by ID:', error)
    return null
  }
}

/**
 * Get sections for a specific zone
 */
export function getZoneSections(template: ProductTemplate | null, zoneName: string): any[] {
  if (!template || !template.zones || !template.zones[zoneName]) {
    return []
  }

  const zoneData = template.zones[zoneName]
  
  // If it's an array of sections, filter and sort
  if (Array.isArray(zoneData)) {
    return zoneData
      .filter((section: any) => section.enabled !== false)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
  }
  
  // If it's an object, return it as is
  return [zoneData]
}

/**
 * Check if a zone has any enabled sections
 */
export function hasZoneSections(template: ProductTemplate | null, zoneName: string): boolean {
  return getZoneSections(template, zoneName).length > 0
}

/**
 * Fetch the default product card template for a store
 */
export async function getDefaultProductCardTemplate(storeId: string): Promise<any | null> {
  try {
    const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/templates/product-card/default`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No default product card template found for store ${storeId}`)
        return null
      }
      throw new Error(`Failed to fetch product card template: ${response.statusText}`)
    }

    const data = await response.json()
    return data.template || null
  } catch (error) {
    console.error('Error fetching product card template:', error)
    return null
  }
}

/**
 * Fetch a specific product card template by ID
 */
export async function getProductCardTemplateById(
  storeId: string,
  templateId: string
): Promise<any | null> {
  try {
    const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/templates/${templateId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 3600,
        },
      }
    )

    if (!response.ok) {
      console.warn(`Failed to fetch product card template ${templateId}`)
      return null
    }

    const data = await response.json()
    return data.template || null
  } catch (error) {
    console.error('Error fetching product card template by ID:', error)
    return null
  }
}

/**
 * Fetch all product card templates for a store
 */
export async function getProductCardTemplates(storeId: string): Promise<any[]> {
  try {
    const backendUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000'
    const response = await fetch(
      `${backendUrl}/api/stores/${storeId}/templates/product-card`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 3600,
        },
      }
    )

    if (!response.ok) {
      console.warn(`Failed to fetch product card templates for store ${storeId}`)
      return []
    }

    const data = await response.json()
    return data.templates || []
  } catch (error) {
    console.error('Error fetching product card templates:', error)
    return []
  }
}

