"use client"

import { usePuck } from "@measured/puck"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { usePuckContext } from "@/components/puck/PuckContextProvider"

export interface CategoryContext {
  category: HttpTypes.StoreProductCategory
  countryCode: string
  sortBy?: SortOptions
  page?: number
  theme?: any
  productCardTemplate?: any
}

/**
 * Hook to access category context from Puck
 * Use this in category page components to get category data
 */
export function useCategory() {
  // Try to use Puck context (in editor)
  try {
    const { appState } = usePuck()
    const context = appState.data?.context as CategoryContext | undefined
    
    return {
      category: context?.category,
      countryCode: context?.countryCode,
      sortBy: context?.sortBy,
      page: context?.page,
      theme: context?.theme,
      productCardTemplate: context?.productCardTemplate,
    }
  } catch {
    // Fallback to our custom context (on storefront)
    const { context } = usePuckContext()
    const categoryContext = context as CategoryContext | undefined
    
    return {
      category: categoryContext?.category,
      countryCode: categoryContext?.countryCode,
      sortBy: categoryContext?.sortBy,
      page: categoryContext?.page,
      theme: categoryContext?.theme,
      productCardTemplate: categoryContext?.productCardTemplate,
    }
  }
}
