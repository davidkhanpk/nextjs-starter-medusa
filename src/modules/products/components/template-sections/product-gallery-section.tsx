'use client'

/**
 * Product Gallery Section with Swiper.js
 * Supports all configuration options from dashboard
 */

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, Zoom, EffectFade, EffectCube, EffectCoverflow, EffectFlip, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { HttpTypes } from '@medusajs/types'
import { SectionProps } from './dynamic-section-renderer'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-flip'
import 'swiper/css/free-mode'

export default function ProductGallerySection({ section, product, images }: SectionProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const galleryImages = images || product.images || []
  
  if (!galleryImages.length) {
    return null
  }

  // Gallery configuration from dashboard
  const config = {
    galleryStyle: section.galleryStyle || 'standard',
    showThumbnails: section.showThumbnails !== false,
    thumbnailPosition: section.thumbnailPosition || 'bottom',
    thumbnailsPerView: parseInt(section.thumbnailsPerView) || 4,
    thumbnailSpacing: parseInt(section.thumbnailSpacing) || 10,
    enableZoom: section.enableZoom !== false,
    zoomType: section.zoomType || 'hover',
    maxZoom: parseFloat(section.maxZoom) || 2.5,
    showNavigation: section.showNavigation !== false,
    navigationStyle: section.navigationStyle || 'arrows',
    showPagination: section.showPagination !== false,
    paginationStyle: section.paginationStyle || 'dots',
    effect: section.effect || 'slide',
    autoplay: section.autoplay || false,
    autoplayDelay: parseInt(section.autoplayDelay) || 3000,
    loop: section.loop || false,
    speed: parseInt(section.speed) || 300,
  }

  // Build Swiper modules based on config
  const modules = [FreeMode]
  if (config.showNavigation) modules.push(Navigation)
  if (config.showPagination) modules.push(Pagination)
  if (config.showThumbnails) modules.push(Thumbs)
  if (config.enableZoom) modules.push(Zoom)
  if (config.effect === 'fade') modules.push(EffectFade)
  if (config.effect === 'cube') modules.push(EffectCube)
  if (config.effect === 'coverflow') modules.push(EffectCoverflow)
  if (config.effect === 'flip') modules.push(EffectFlip)

  const containerClasses = {
    standard: 'w-full',
    featured: 'w-full max-w-4xl mx-auto',
    grid: 'grid grid-cols-2 gap-4',
    carousel: 'w-full',
  }[config.galleryStyle]

  // Render grid layout
  if (config.galleryStyle === 'grid') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {galleryImages.map((image, index) => (
            <div key={image.id || index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={image.url}
                alt={product.title || `Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render Swiper layout
  return (
    <div className={`product-gallery ${containerClasses}`}>
      {/* Main Gallery */}
      <Swiper
        modules={modules}
        spaceBetween={10}
        navigation={config.showNavigation}
        pagination={config.showPagination ? {
          clickable: true,
          type: config.paginationStyle === 'dots' ? 'bullets' : 'fraction',
        } : false}
        thumbs={config.showThumbnails && thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        zoom={config.enableZoom}
        effect={config.effect}
        loop={config.loop}
        speed={config.speed}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="main-gallery rounded-lg"
      >
        {galleryImages.map((image, index) => (
          <SwiperSlide key={image.id || index}>
            <div className="swiper-zoom-container relative aspect-square bg-gray-100">
              <Image
                src={image.url}
                alt={product.title || `Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      {config.showThumbnails && galleryImages.length > 1 && (
        <div className={`mt-4 ${config.thumbnailPosition === 'left' || config.thumbnailPosition === 'right' ? 'flex' : ''}`}>
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={config.thumbnailSpacing}
            slidesPerView={config.thumbnailsPerView}
            freeMode={true}
            watchSlidesProgress={true}
            className="thumbnail-gallery"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={image.id || index}>
                <div 
                  className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-colors ${
                    activeIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        .main-gallery {
          width: 100%;
          height: auto;
        }
        
        .main-gallery .swiper-slide {
          background: #f3f4f6;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #ffffff;
          background: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }

        .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.7;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #3b82f6;
        }

        .thumbnail-gallery .swiper-slide {
          width: auto;
        }
      `}</style>
    </div>
  )
}
