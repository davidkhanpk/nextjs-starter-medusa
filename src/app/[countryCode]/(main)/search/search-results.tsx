'use client'

import { useEffect, useState } from 'react'
import { HttpTypes } from '@medusajs/types'
import ProductPreview from '@modules/products/components/product-preview'
import { useTheme } from '@lib/theme/ThemeProvider'

interface SearchResultsProps {
  query: string
  countryCode: string
}

export default function SearchResults({ query, countryCode }: SearchResultsProps) {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    async function searchProducts() {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/search/products?q=${encodeURIComponent(query)}&countryCode=${countryCode}&limit=50`
        )
        
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
          setCount(data.count || 0)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    searchProducts()
  }, [query, countryCode])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-pulse text-lg" style={{ color: theme?.colors?.textPrimary }}>
            Searching...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Search Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: theme?.colors?.textPrimary }}
        >
          Search Results
        </h1>
        <p 
          className="text-lg"
          style={{ color: theme?.colors?.textSecondary }}
        >
          {count} {count === 1 ? 'result' : 'results'} for "{query}"
        </p>
      </div>

      {/* Results Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductPreview
              key={product.id}
              product={product}
              isFeatured={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div 
            className="text-xl font-medium mb-2"
            style={{ color: theme?.colors?.textPrimary }}
          >
            No products found
          </div>
          <p 
            className="text-base mb-6"
            style={{ color: theme?.colors?.textSecondary }}
          >
            Try different keywords or browse our categories
          </p>
          <a
            href={`/${countryCode}`}
            className="inline-block px-6 py-3 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: theme?.colors?.primary || '#000000',
              color: theme?.colors?.primaryText || '#ffffff',
            }}
          >
            Back to Home
          </a>
        </div>
      )}
    </div>
  )
}
