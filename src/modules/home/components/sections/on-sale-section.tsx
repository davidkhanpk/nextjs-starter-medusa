'use client'

import React from 'react'
import { HttpTypes } from '@medusajs/types'
import { OnSaleSection as OnSaleSectionType } from '@lib/page-builder/types'
import ModernProductPreview from '@modules/products/components/product-preview/modern-product-preview'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Tag } from 'lucide-react'

interface OnSaleSectionProps {
  section: OnSaleSectionType
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

export const OnSaleSection: React.FC<OnSaleSectionProps> = ({
  section,
  products,
  region,
}) => {
  if (!section.enabled || products.length === 0) return null

  const { title, subtitle, layout, columns } = section

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with Sale Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mb-4">
            <Tag className="w-5 h-5" />
            <span className="font-semibold">SALE</span>
          </div>
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

        {/* Products */}
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
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ModernProductPreview
                  product={product}
                  region={region}
                  isFeatured={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(250px, 1fr))`,
            }}
          >
            {products.map((product) => (
              <ModernProductPreview
                key={product.id}
                product={product}
                region={region}
                isFeatured={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
