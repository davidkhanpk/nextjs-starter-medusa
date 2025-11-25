'use client'

/**
 * Product Variants Section
 * Displays color and size variant selectors
 */

import React from 'react'
import { Label } from '@medusajs/ui'
import { SectionProps } from './dynamic-section-renderer'
import { useParams, useSearchParams } from 'next/navigation'

export default function ProductVariantsSection({ section, product }: SectionProps) {
  const searchParams = useSearchParams()
  const params = useParams()
  const countryCode = params.countryCode as string

  const config = {
    sizeDisplay: section.sizeDisplay || 'dropdown',
    colorDisplay: section.colorDisplay || 'swatches',
    showOutOfStock: section.showOutOfStock !== false,
  }

  // Get unique option values
  const options = product.options || []

  if (!options.length) {
    return null
  }

  const getColorValue = (value: string): string => {
    const colorMap: Record<string, string> = {
      'white': '#ffffff',
      'black': '#000000',
      'red': '#ef4444',
      'blue': '#3b82f6',
      'green': '#10b981',
      'yellow': '#f59e0b',
      'pink': '#ec4899',
      'purple': '#a855f7',
      'gray': '#6b7280',
      'grey': '#6b7280',
    }
    
    const normalizedValue = value.toLowerCase()
    return colorMap[normalizedValue] || normalizedValue
  }

  return (
    <div className="space-y-6">
      {options.map((option) => {
        const isColorOption = option.title.toLowerCase().includes('color')
        const isSizeOption = option.title.toLowerCase().includes('size')
        
        return (
          <div key={option.id}>
            <Label className="text-sm font-medium mb-2 block">
              {option.title}
            </Label>

            {/* Color Swatches */}
            {isColorOption && config.colorDisplay === 'swatches' && (
              <div className="flex flex-wrap gap-2">
                {option.values?.map((value) => (
                  <button
                    key={value.id}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-colors"
                    style={{ background: getColorValue(value.value) }}
                    title={value.value}
                    aria-label={value.value}
                  />
                ))}
              </div>
            )}

            {/* Color Dropdown */}
            {isColorOption && config.colorDisplay === 'dropdown' && (
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                {option.values?.map((value) => (
                  <option key={value.id} value={value.value}>
                    {value.value}
                  </option>
                ))}
              </select>
            )}

            {/* Size Buttons */}
            {isSizeOption && config.sizeDisplay === 'buttons' && (
              <div className="flex flex-wrap gap-2">
                {option.values?.map((value) => (
                  <button
                    key={value.id}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
                  >
                    {value.value}
                  </button>
                ))}
              </div>
            )}

            {/* Size Dropdown */}
            {isSizeOption && config.sizeDisplay === 'dropdown' && (
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                {option.values?.map((value) => (
                  <option key={value.id} value={value.value}>
                    {value.value}
                  </option>
                ))}
              </select>
            )}

            {/* Default: Dropdown */}
            {!isColorOption && !isSizeOption && (
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                {option.values?.map((value) => (
                  <option key={value.id} value={value.value}>
                    {value.value}
                  </option>
                ))}
              </select>
            )}
          </div>
        )
      })}
    </div>
  )
}
