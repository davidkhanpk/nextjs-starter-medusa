'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Grid, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@lib/utils'
import { animationVariants, transitions } from '@lib/design-system'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface FeaturedProduct {
  id: string
  title: string
  thumbnail?: string
  price: number
  currency: string
  badge?: string
}

interface SubCategory {
  name: string
  href: string
  description?: string
}

interface MegaMenuCategory {
  name: string
  href: string
  icon?: React.ReactNode
  subcategories?: SubCategory[]
  featured?: FeaturedProduct[]
  image?: string
}

interface MegaMenuProps {
  categories: MegaMenuCategory[]
  onCategoryClick?: (category: string) => void
}

export default function MegaMenu({ categories, onCategoryClick }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const handleMouseEnter = (categoryName: string) => {
    setHoveredCategory(categoryName)
    setActiveCategory(categoryName)
  }

  const handleMouseLeave = () => {
    setHoveredCategory(null)
    // Delay closing to prevent flickering
    setTimeout(() => {
      if (!hoveredCategory) {
        setActiveCategory(null)
      }
    }, 100)
  }

  const activeMenu = categories.find(cat => cat.name === activeCategory)

  return (
    <div className="relative">
      {/* Main Navigation Bar */}
      <nav className="flex items-center gap-1">
        {categories.map((category) => (
          <div
            key={category.name}
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryClick?.(category.name)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200',
                activeCategory === category.name
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {category.icon}
              <span>{category.name}</span>
              {category.subcategories && (
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    activeCategory === category.name && 'rotate-180'
                  )}
                />
              )}
            </motion.button>
          </div>
        ))}
      </nav>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {activeCategory && activeMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitions.fast}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 top-[80px]"
              onMouseEnter={() => setActiveCategory(null)}
            />

            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={transitions.spring}
              onMouseEnter={() => setHoveredCategory(activeCategory)}
              onMouseLeave={handleMouseLeave}
              className="absolute left-0 right-0 top-full mt-2 z-50"
            >
              <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-12 gap-8 p-8">
                    {/* Subcategories Section */}
                    {activeMenu.subcategories && activeMenu.subcategories.length > 0 && (
                      <div className="col-span-12 md:col-span-5">
                        <div className="flex items-center gap-2 mb-6">
                          <Grid className="w-5 h-5 text-gray-500" />
                          <h3 className="text-lg font-bold text-gray-900">
                            Shop by Category
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activeMenu.subcategories.map((subcategory, index) => (
                            <LocalizedClientLink
                              key={subcategory.name}
                              href={subcategory.href}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ x: 4 }}
                                className="group p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                              >
                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {subcategory.name}
                                </h4>
                                {subcategory.description && (
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {subcategory.description}
                                  </p>
                                )}
                              </motion.div>
                            </LocalizedClientLink>
                          ))}
                        </div>

                        {/* View All Link */}
                        <LocalizedClientLink href={activeMenu.href}>
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="mt-6 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                          >
                            <span>View All {activeMenu.name}</span>
                            <ChevronDown className="w-4 h-4 -rotate-90" />
                          </motion.div>
                        </LocalizedClientLink>
                      </div>
                    )}

                    {/* Featured Products Section */}
                    {activeMenu.featured && activeMenu.featured.length > 0 && (
                      <div className="col-span-12 md:col-span-4">
                        <div className="flex items-center gap-2 mb-6">
                          <Sparkles className="w-5 h-5 text-yellow-500" />
                          <h3 className="text-lg font-bold text-gray-900">
                            Featured Products
                          </h3>
                        </div>

                        <div className="space-y-4">
                          {activeMenu.featured.map((product, index) => (
                            <LocalizedClientLink
                              key={product.id}
                              href={`/products/${product.id}`}
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="group flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                              >
                                {/* Product Image */}
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  {product.thumbnail ? (
                                    <Image
                                      src={product.thumbnail}
                                      alt={product.title}
                                      fill
                                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                      📦
                                    </div>
                                  )}
                                  {product.badge && (
                                    <div className="absolute top-1 right-1 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                                      {product.badge}
                                    </div>
                                  )}
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                                    {product.title}
                                  </h4>
                                  <p className="text-sm font-bold text-gray-900 mt-1">
                                    {new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: product.currency,
                                    }).format(product.price / 100)}
                                  </p>
                                </div>
                              </motion.div>
                            </LocalizedClientLink>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Promotional Banner */}
                    {activeMenu.image && (
                      <div className="col-span-12 md:col-span-3">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="relative h-full min-h-[300px] rounded-xl overflow-hidden group cursor-pointer"
                        >
                          <div className="absolute inset-0">
                            <Image
                              src={activeMenu.image}
                              alt={activeMenu.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h4 className="text-xl font-bold mb-2">
                              New {activeMenu.name}
                            </h4>
                            <p className="text-sm text-white/90 mb-4">
                              Explore our latest collection
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm"
                            >
                              Shop Now
                            </motion.button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
