'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MagnifyingGlass, XMark } from '@medusajs/icons'
import { HttpTypes } from '@medusajs/types'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { useTheme } from '@lib/theme/ThemeProvider'

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<HttpTypes.StoreProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const params = useParams()
  const countryCode = params?.countryCode as string || 'us'
  const { theme } = useTheme()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search function
  const searchProducts = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/search/products?q=${encodeURIComponent(searchQuery)}&countryCode=${countryCode}&limit=5`
        )
        
        if (response.ok) {
          const data = await response.json()
          setResults(data.products || [])
        }
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [countryCode]
  )

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        searchProducts(query)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, searchProducts])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recent-searches', JSON.stringify(updated))
      
      // Navigate to search results page
      router.push(`/${countryCode}/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
      
      if (onSearch) {
        onSearch(query)
      }
    }
  }

  const handleRecentSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    router.push(`/${countryCode}/search?q=${encodeURIComponent(searchQuery)}`)
    setIsOpen(false)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recent-searches')
  }

  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount / 100)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <MagnifyingGlass className="absolute left-3 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            style={{
              borderColor: theme?.colors?.border || '#e5e7eb',
              backgroundColor: theme?.colors?.surface || '#ffffff',
              color: theme?.colors?.textPrimary || '#111827',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setResults([])
                inputRef.current?.focus()
              }}
              className="absolute right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <XMark className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50 dark:border-gray-600"
          style={{
            backgroundColor: theme?.colors?.surface || '#ffffff',
            borderColor: theme?.colors?.border || '#e5e7eb',
          }}
        >
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <div className="animate-pulse">Searching...</div>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && query && results.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Products
              </div>
              {results.map((product) => {
                const variant = product.variants?.[0]
                const price = variant?.calculated_price
                
                return (
                  <LocalizedClientLink
                    key={product.id}
                    href={`/products/${product.handle}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {product.thumbnail && (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div 
                        className="font-medium truncate"
                        style={{ color: theme?.colors?.textPrimary || '#111827' }}
                      >
                        {product.title}
                      </div>
                      {price && (
                        <div 
                          className="text-sm"
                          style={{ color: theme?.colors?.textSecondary || '#6b7280' }}
                        >
                          {formatPrice(price.calculated_amount, price.currency_code)}
                        </div>
                      )}
                    </div>
                  </LocalizedClientLink>
                )
              })}
              
              {/* View All Results Link */}
              <div className="px-4 py-3 border-t dark:border-gray-700">
                <button
                  onClick={handleSubmit}
                  className="w-full text-center py-2 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: theme?.colors?.primary || '#000000',
                    color: theme?.colors?.primaryText || '#ffffff',
                  }}
                >
                  View all results for "{query}"
                </button>
              </div>
            </div>
          )}

          {/* No Results */}
          {!isLoading && query && results.length === 0 && (
            <div className="p-6 text-center">
              <div className="text-gray-500 dark:text-gray-400 mb-2">
                No products found for "{query}"
              </div>
              <div className="text-sm text-gray-400 dark:text-gray-500">
                Try different keywords
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Recent Searches
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(search)}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <MagnifyingGlass className="w-4 h-4 text-gray-400" />
                  <span style={{ color: theme?.colors?.textPrimary || '#111827' }}>
                    {search}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!query && recentSearches.length === 0 && (
            <div className="p-6 text-center text-gray-400 dark:text-gray-500 text-sm">
              Start typing to search products
            </div>
          )}
        </div>
      )}
    </div>
  )
}
