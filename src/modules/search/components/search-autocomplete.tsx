'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@lib/utils'
import { animationVariants, transitions } from '@lib/design-system'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface SearchResult {
  id: string
  type: 'product' | 'category' | 'collection'
  title: string
  description?: string
  thumbnail?: string
  price?: number
  currency?: string
  url: string
}

interface SearchAutocompleteProps {
  placeholder?: string
  onSearch?: (query: string) => void
  suggestions?: SearchResult[]
  recentSearches?: string[]
  trendingSearches?: string[]
  isLoading?: boolean
  className?: string
}

export default function SearchAutocomplete({
  placeholder = 'Search products, categories...',
  onSearch,
  suggestions = [],
  recentSearches = [],
  trendingSearches = [],
  isLoading = false,
  className,
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch?.(searchQuery)
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length > 0 || recentSearches.length > 0 || trendingSearches.length > 0)
    onSearch?.(value)
  }

  const clearSearch = () => {
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const showDropdown = isOpen && (query.length > 0 || recentSearches.length > 0 || trendingSearches.length > 0)

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      {/* Search Input */}
      <motion.div
        animate={{
          boxShadow: isFocused
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
        transition={transitions.fast}
        className={cn(
          'relative flex items-center bg-white rounded-full border-2 transition-colors duration-200',
          isFocused ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
        )}
      >
        <Search className="absolute left-4 w-5 h-5 text-gray-400" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true)
            setIsOpen(true)
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-3 pl-12 pr-12 bg-transparent outline-none text-gray-900 placeholder-gray-400"
        />

        {query && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearSearch}
            className="absolute right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </motion.button>
        )}

        {isLoading && (
          <div className="absolute right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full"
            />
          </div>
        )}
      </motion.div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transitions.spring}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[600px] overflow-y-auto z-50"
          >
            {/* Search Results */}
            {query && suggestions.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
                  Search Results
                </h3>
                <div className="space-y-1">
                  {suggestions.map((result, index) => (
                    <LocalizedClientLink key={result.id} href={result.url}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4, backgroundColor: '#f9fafb' }}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        {/* Thumbnail */}
                        {result.thumbnail && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={result.thumbnail}
                              alt={result.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {result.title}
                            </h4>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                              {result.type}
                            </span>
                          </div>
                          {result.description && (
                            <p className="text-sm text-gray-500 truncate">
                              {result.description}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        {result.price && result.currency && (
                          <div className="text-sm font-bold text-gray-900 flex-shrink-0">
                            {formatPrice(result.price, result.currency)}
                          </div>
                        )}

                        {/* Arrow */}
                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </motion.div>
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query && !isLoading && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try searching with different keywords
                </p>
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Recent Searches
                    </h3>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4, backgroundColor: '#f9fafb' }}
                      onClick={() => handleSearch(search)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-left"
                    >
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700">{search}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            {!query && trendingSearches.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3 px-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Trending Now
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSearch(search)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                    >
                      🔥 {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
