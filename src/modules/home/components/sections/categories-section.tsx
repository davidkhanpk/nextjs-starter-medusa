'use client'

import React from 'react'
import Link from '@/components/common/SafeLink'
import Image from 'next/image'
import { CategoriesSection as CategoriesSectionType } from '@lib/page-builder/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ArrowRight } from 'lucide-react'

interface Category {
  id: string
  name: string
  handle: string
  description?: string
  thumbnail?: string
  product_count?: number
}

interface CategoriesSectionProps {
  section: CategoriesSectionType
  categories: Category[]
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  section,
  categories,
}) => {
  if (!section.enabled || categories.length === 0) return null

  const { title, subtitle, layout, columns, showProductCount, showImages, imageShape } = section

  const getImageShapeClass = () => {
    switch (imageShape) {
      case 'circle':
        return 'rounded-full'
      case 'rounded':
        return 'rounded-lg'
      case 'square':
      default:
        return 'rounded-none'
    }
  }

  const CategoryCard = ({ category }: { category: Category }) => (
    <Link
      href={`/categories/${category.handle}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      {showImages && category.thumbnail && (
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.thumbnail}
            alt={category.name}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-300 ${getImageShapeClass()}`}
          />
        </div>
      )}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        {showProductCount && category.product_count !== undefined && (
          <p className="text-sm text-gray-500 mt-1">
            {category.product_count} {category.product_count === 1 ? 'product' : 'products'}
          </p>
        )}
        <div className="flex items-center justify-center gap-1 mt-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium">Shop now</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Categories */}
        {layout === 'carousel' ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: columns },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : layout === 'list' ? (
          <div className="space-y-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.handle}`}
                className="group flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                {showImages && category.thumbnail && (
                  <div className={`relative w-20 h-20 flex-shrink-0 overflow-hidden ${getImageShapeClass()}`}>
                    <Image
                      src={category.thumbnail}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {category.description}
                    </p>
                  )}
                  {showProductCount && category.product_count !== undefined && (
                    <p className="text-sm text-gray-500 mt-1">
                      {category.product_count} products
                    </p>
                  )}
                </div>
                <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
            }}
          >
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
