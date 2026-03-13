/**
 * Enhanced Menu Types for Storefront
 * Includes enriched data from Medusa categories/collections
 */

import { ProductCategory, ProductCollection } from "@medusajs/medusa"

// Base MenuItem from API
export interface MenuItem {
  id: string
  label: string
  url?: string
  type: 'category' | 'collection' | 'page' | 'custom'
  entityId?: string
  position: number
  parentId?: string | null
  children?: MenuItem[]
  isVisible: boolean
  openInNewTab: boolean
  megaMenu?: MegaMenuConfig
}

export interface MegaMenuConfig {
  enabled: boolean
  columns?: number // 1-3 columns
  showImage?: boolean
  imageUrl?: string
  subcategoryLimit?: number // Max subcategories to show
  showDescriptions?: boolean
  showSubcategories?: boolean
}

// Enriched MenuItem with Medusa data
export interface EnrichedMenuItem extends MenuItem {
  enrichedData?: {
    category?: {
      id: string
      name: string
      handle: string
      description?: string
      metadata?: Record<string, any>
      subcategories: Array<{
        id: string
        name: string
        handle: string
        description?: string
      }>
    }
    collection?: {
      id: string
      title: string
      handle: string
      metadata?: Record<string, any>
    }
    resolvedUrl: string // Final URL to navigate to
  }
  children?: EnrichedMenuItem[]
}

export interface Menu {
  id: string
  storeId: string
  name: string
  handle: string
  items: MenuItem[]
  settings?: MenuSettings
  isDefault: boolean
}

export interface MenuSettings {
  layout?: 'horizontal' | 'stacked'
  mobileBreakpoint?: 'sm' | 'md' | 'lg'
  showIcons?: boolean
  hoverEffect?: 'underline' | 'background' | 'color' | 'none'
  dropdownStyle?: 'default' | 'mega' | 'sidebar'
}

export interface EnrichedMenu extends Omit<Menu, 'items'> {
  items: EnrichedMenuItem[]
}
