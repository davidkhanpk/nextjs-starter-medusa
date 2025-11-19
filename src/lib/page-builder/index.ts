/**
 * Page Builder System - Main Export
 * 
 * A flexible, drag-and-drop page builder for customizing store homepages
 * with dynamic sections like New Arrivals, Sales, Categories, and more.
 */

// Types
export * from './types'

// Context and Hooks
export { PageBuilderProvider, usePageBuilder } from './context'

// API Functions
export { getPageLayout, getDefaultLayout, savePageLayout } from './api'

// Data Fetchers
export {
  getNewArrivals,
  getOnSaleProducts,
  getFeaturedProducts,
  getCategories,
  getCollections,
} from './data-fetchers'

// Components
export { DynamicSectionRenderer } from './section-renderer'
