'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@lib/utils'
import { animationVariants, transitions } from '@lib/design-system'
import { useTheme } from '@lib/theme/ThemeProvider'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterGroup {
  id: string
  label: string
  type: 'checkbox' | 'radio' | 'range' | 'color'
  options?: FilterOption[]
  min?: number
  max?: number
  colors?: Array<{ id: string; name: string; hex: string }>
}

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (filterId: string, values: string[]) => void
  onApply: () => void
  onClear: () => void
  resultCount?: number
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  selectedFilters,
  onFilterChange,
  onApply,
  onClear,
  resultCount,
}: FilterDrawerProps) {
  const { theme } = useTheme()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    filters.map(f => f.id)
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const isSelected = (filterId: string, optionId: string) => {
    return selectedFilters[filterId]?.includes(optionId) || false
  }

  const handleOptionToggle = (filterId: string, optionId: string, type: string) => {
    const current = selectedFilters[filterId] || []
    
    if (type === 'radio') {
      onFilterChange(filterId, [optionId])
    } else {
      const newValues = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId]
      onFilterChange(filterId, newValues)
    }
  }

  const activeFilterCount = Object.values(selectedFilters).flat().length

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.fast}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={transitions.spring}
            className="fixed left-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: theme?.colors?.border || '#e5e7eb' }}
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-6 h-6" />
                <h2 className="text-xl font-bold">
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </h2>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Filters List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {filters.map((filterGroup, groupIndex) => (
                  <motion.div
                    key={filterGroup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.05 }}
                    className="border-b border-gray-200 pb-6 last:border-0"
                  >
                    {/* Group Header */}
                    <button
                      onClick={() => toggleGroup(filterGroup.id)}
                      className="w-full flex items-center justify-between mb-4 group"
                    >
                      <h3 className="text-base font-semibold text-gray-900">
                        {filterGroup.label}
                      </h3>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-gray-500 transition-transform duration-200',
                          expandedGroups.includes(filterGroup.id) && 'rotate-180'
                        )}
                      />
                    </button>

                    {/* Group Options */}
                    <AnimatePresence>
                      {expandedGroups.includes(filterGroup.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={transitions.fast}
                          className="space-y-2 overflow-hidden"
                        >
                          {/* Checkbox/Radio Options */}
                          {(filterGroup.type === 'checkbox' || filterGroup.type === 'radio') &&
                            filterGroup.options?.map((option, optionIndex) => (
                              <motion.label
                                key={option.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: optionIndex * 0.03 }}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                              >
                                <div className="relative flex items-center">
                                  <input
                                    type={filterGroup.type}
                                    checked={isSelected(filterGroup.id, option.id)}
                                    onChange={() =>
                                      handleOptionToggle(filterGroup.id, option.id, filterGroup.type)
                                    }
                                    className="sr-only"
                                  />
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={cn(
                                      'w-5 h-5 border-2 rounded flex items-center justify-center transition-colors duration-200',
                                      filterGroup.type === 'radio' && 'rounded-full',
                                      isSelected(filterGroup.id, option.id)
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'bg-white border-gray-300 group-hover:border-gray-400'
                                    )}
                                  >
                                    {isSelected(filterGroup.id, option.id) && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={transitions.bounce}
                                      >
                                        <Check className="w-3 h-3 text-white" />
                                      </motion.div>
                                    )}
                                  </motion.div>
                                </div>

                                <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900">
                                  {option.label}
                                </span>

                                {option.count !== undefined && (
                                  <span className="text-xs text-gray-500">
                                    ({option.count})
                                  </span>
                                )}
                              </motion.label>
                            ))}

                          {/* Color Options */}
                          {filterGroup.type === 'color' && filterGroup.colors && (
                            <div className="flex flex-wrap gap-3">
                              {filterGroup.colors.map((color, colorIndex) => (
                                <motion.button
                                  key={color.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: colorIndex * 0.03 }}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    handleOptionToggle(filterGroup.id, color.id, 'checkbox')
                                  }
                                  className={cn(
                                    'relative w-10 h-10 rounded-full border-2 transition-all duration-200',
                                    isSelected(filterGroup.id, color.id)
                                      ? 'border-gray-900 shadow-lg'
                                      : 'border-gray-300 hover:border-gray-400'
                                  )}
                                  style={{ backgroundColor: color.hex }}
                                  title={color.name}
                                >
                                  {isSelected(filterGroup.id, color.id) && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={transitions.bounce}
                                      className="absolute inset-0 flex items-center justify-center"
                                    >
                                      <Check className="w-5 h-5 text-white drop-shadow-md" />
                                    </motion.div>
                                  )}
                                </motion.button>
                              ))}
                            </div>
                          )}

                          {/* Price Range */}
                          {filterGroup.type === 'range' && (
                            <div className="space-y-4 pt-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  ${priceRange[0]}
                                </span>
                                <span className="text-gray-600">
                                  ${priceRange[1]}
                                </span>
                              </div>
                              <input
                                type="range"
                                min={filterGroup.min || 0}
                                max={filterGroup.max || 1000}
                                value={priceRange[1]}
                                onChange={(e) =>
                                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                                }
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                              />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer - Actions */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={transitions.spring}
              className="border-t p-6 space-y-3"
              style={{ borderColor: theme?.colors?.border || '#e5e7eb' }}
            >
              {/* Result Count */}
              {resultCount !== undefined && (
                <p className="text-sm text-center text-gray-600">
                  {resultCount} {resultCount === 1 ? 'product' : 'products'} found
                </p>
              )}

              {/* Apply Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onApply()
                  onClose()
                }}
                style={{
                  backgroundColor: theme?.colors?.primary || '#3b82f6',
                  color: theme?.colors?.primaryText || '#ffffff',
                }}
                className="w-full py-4 rounded-full font-bold text-base shadow-lg"
              >
                Apply Filters
              </motion.button>

              {/* Clear Button */}
              {activeFilterCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClear}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
