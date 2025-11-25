'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from '@medusajs/icons'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { useTheme } from '@lib/theme/ThemeProvider'
import { HttpTypes } from '@medusajs/types'

export default function CategoryNav() {
  const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        // Use the Medusa backend URL directly
        const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
        const response = await fetch(`${backendUrl}/store/product-categories?limit=100&fields=id,name,handle,parent_category_id,metadata`)
        
        if (response.ok) {
          const data = await response.json()
          const parentCategories = (data.product_categories || []).filter(
            (cat: any) => !cat.parent_category_id
          )
          setCategories(parentCategories)
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  if (isLoading || categories.length === 0) {
    return null
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        style={{ color: theme?.colors?.textPrimary }}
      >
        <span className="font-medium">Categories</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 border rounded-lg shadow-xl z-50 py-2 dark:border-gray-600"
          style={{
            backgroundColor: theme?.colors?.surface || '#ffffff',
            borderColor: theme?.colors?.border || '#e5e7eb',
          }}
        >
          {/* All Categories Link */}
          <LocalizedClientLink
            href="/categories"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b dark:border-gray-700"
          >
            <div 
              className="font-semibold"
              style={{ color: theme?.colors?.textPrimary }}
            >
              All Categories
            </div>
          </LocalizedClientLink>

          {/* Category List */}
          <div className="max-h-96 overflow-y-auto">
            {categories.map((category) => (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span 
                  className="font-medium"
                  style={{ color: theme?.colors?.textPrimary }}
                >
                  {category.name}
                </span>
                {category.metadata?.product_count && (
                  <span 
                    className="text-sm"
                    style={{ color: theme?.colors?.textSecondary }}
                  >
                    ({category.metadata.product_count})
                  </span>
                )}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
