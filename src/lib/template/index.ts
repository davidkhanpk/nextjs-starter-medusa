/**
 * Template System
 * Handles both Product templates and Page templates (Cart, Checkout, etc.)
 */

// API clients
export * from './api';
export * from './types';
export * from './tailwind-mapper';

// Product template API (legacy)
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'

export interface ProductTemplate {
  id: string
  templateType: string
  templateName: string
  status: string
  isDefault: boolean
  zones: Record<string, any[]>
  settings: any
}

export async function getDefaultProductTemplate(storeId: string): Promise<ProductTemplate | null> {
  try {
    const response = await fetch(
      `${API_URL}/stores/${storeId}/templates/default/PRODUCT_PAGE`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.log('No default product template found')
        return null
      }
      throw new Error(`Failed to fetch template: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching product template:', error)
    return null
  }
}

