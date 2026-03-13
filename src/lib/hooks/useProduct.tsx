"use client"

import { usePuck } from "@measured/puck"
import { HttpTypes } from "@medusajs/types"
import { usePuckContext } from "@/components/puck/PuckContextProvider"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface ProductContext {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  theme?: any
}

// Context for variant selection (client-side only)
interface VariantSelectionContext {
  selectedVariant: HttpTypes.StoreProductVariant | null
  setSelectedVariant: (variant: HttpTypes.StoreProductVariant | null) => void
  selectedOptions: Record<string, string>
  setSelectedOptions: (options: Record<string, string>) => void
  quantity: number
  setQuantity: (quantity: number) => void
}

const VariantSelectionContext = createContext<VariantSelectionContext | undefined>(undefined)

// Provider component
export function ProductVariantProvider({ children, product }: { children: ReactNode, product?: HttpTypes.StoreProduct }) {
  const [selectedVariant, setSelectedVariant] = useState<HttpTypes.StoreProductVariant | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState<number>(1)

  // Auto-select first variant if only one exists
  useEffect(() => {
    if (product?.variants && product.variants.length === 1) {
      setSelectedVariant(product.variants[0])
      
      // Build options map
      const options: Record<string, string> = {}
      product.variants[0].options?.forEach((opt) => {
        if (opt.option_id && opt.value) {
          options[opt.option_id] = opt.value
        }
      })
      setSelectedOptions(options)
    }
  }, [product])

  return (
    <VariantSelectionContext.Provider value={{ selectedVariant, setSelectedVariant, selectedOptions, setSelectedOptions, quantity, setQuantity }}>
      {children}
    </VariantSelectionContext.Provider>
  )
}

// Hook to access variant selection
function useVariantSelection() {
  const context = useContext(VariantSelectionContext)
  if (!context) {
    // Return empty state if not in provider (e.g., in Puck editor)
    return {
      selectedVariant: null,
      setSelectedVariant: () => {},
      selectedOptions: {},
      setSelectedOptions: () => {},
      quantity: 1,
      setQuantity: () => {},
    }
  }
  return context
}

/**
 * Hook to access product context from Puck
 * Use this in product page components to get product data
 */
export function useProduct() {
  const variantSelection = useVariantSelection()
  
  // Try to use Puck context (in editor)
  try {
    const { appState } = usePuck()
    const context = appState.data?.context as ProductContext | undefined

    return {
      product: context?.product,
      region: context?.region,
      countryCode: context?.countryCode,
      theme: context?.theme,
      ...variantSelection,
    }
  } catch {
    // Fallback to our custom context (on storefront)
    const { context } = usePuckContext()
    const productContext = context as ProductContext | undefined
    
    return {
      product: productContext?.product,
      region: productContext?.region,
      countryCode: productContext?.countryCode,
      theme: productContext?.theme,
      ...variantSelection,
    }
  }
}
