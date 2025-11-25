import { useState, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, Zoom, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { HttpTypes } from '@medusajs/types'
import { X, ZoomIn, Maximize2 } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-cube'
import 'swiper/css/effect-flip'
import 'swiper/css/effect-coverflow'

interface ProductGalleryConfig {
  style: 'slider' | 'grid' | 'stacked' | 'filmstrip' | 'thumbnail-left' | 'thumbnail-bottom'
  thumbnailPosition?: 'bottom' | 'left' | 'right' | 'hidden'
  thumbnailSize?: 'sm' | 'md' | 'lg'
  zoom?: boolean
  zoomType?: 'hover' | 'click' | 'modal' | 'disabled'
  zoomLevel?: number
  autoplay?: boolean
  autoplayDelay?: number
  transition?: 'slide' | 'fade' | 'cube' | 'flip' | 'coverflow'
  loop?: boolean
  navigation?: boolean
  pagination?: boolean
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:4' | 'auto'
  objectFit?: 'contain' | 'cover' | 'fill'
  fullscreen?: boolean
  lazyLoad?: boolean
}

interface ProductGalleryProps {
  images: HttpTypes.StoreProductImage[]
  config: ProductGalleryConfig
}

export function ProductGallery({ images, config }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (config.aspectRatio) {
      case '1:1':
        return 'aspect-square'
      case '4:3':
        return 'aspect-[4/3]'
      case '16:9':
        return 'aspect-video'
      case '3:4':
        return 'aspect-[3/4]'
      default:
        return ''
    }
  }

  // Get thumbnail size class
  const getThumbnailSizeClass = () => {
    switch (config.thumbnailSize) {
      case 'sm':
        return 'w-16 h-16'
      case 'lg':
        return 'w-24 h-24'
      default:
        return 'w-20 h-20'
    }
  }

  // Get Swiper modules based on config
  const getSwiperModules = () => {
    const modules = [Thumbs]

    if (config.navigation) modules.push(Navigation)
    if (config.pagination) modules.push(Pagination)
    if (config.zoom && config.zoomType !== 'disabled') modules.push(Zoom)
    if (config.autoplay) modules.push(Autoplay)

    // Add effect modules
    switch (config.transition) {
      case 'fade':
        modules.push(EffectFade)
        break
      case 'cube':
        modules.push(EffectCube)
        break
      case 'flip':
        modules.push(EffectFlip)
        break
      case 'coverflow':
        modules.push(EffectCoverflow)
        break
    }

    return modules
  }

  // Render Slider Style
  if (config.style === 'slider' || config.style === 'thumbnail-left' || config.style === 'thumbnail-bottom') {
    const showThumbs = config.thumbnailPosition !== 'hidden'
    const isVerticalThumbs = config.style === 'thumbnail-left'

    return (
      <div className={`product-gallery-slider ${isVerticalThumbs ? 'flex gap-4' : ''}`}>
        {/* Thumbnails (Left) */}
        {showThumbs && isVerticalThumbs && (
          <div className="flex-shrink-0">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView="auto"
              direction="vertical"
              watchSlidesProgress={true}
              className="h-full"
              style={{ maxHeight: '500px' }}
              modules={[Thumbs]}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id} className={getThumbnailSizeClass()}>
                  <div className="w-full h-full cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg overflow-hidden transition-all">
                    <Image
                      src={image.url || ''}
                      alt={`Thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Main Slider */}
        <div className="flex-1">
          <Swiper
            modules={getSwiperModules()}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            navigation={config.navigation}
            pagination={config.pagination ? { clickable: true } : false}
            loop={config.loop}
            effect={config.transition === 'slide' ? undefined : config.transition}
            zoom={config.zoom && config.zoomType !== 'disabled' ? { maxRatio: config.zoomLevel || 2 } : false}
            autoplay={
              config.autoplay
                ? {
                    delay: config.autoplayDelay || 3000,
                    disableOnInteraction: false,
                  }
                : false
            }
            onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
            className={`w-full ${getAspectRatioClass()} rounded-lg overflow-hidden`}
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id}>
                <div className="swiper-zoom-container relative w-full h-full bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={image.url || ''}
                    alt={`Product image ${index + 1}`}
                    fill
                    className={`object-${config.objectFit || 'cover'}`}
                    priority={index <= 2}
                    loading={config.lazyLoad && index > 2 ? 'lazy' : 'eager'}
                  />
                  {config.fullscreen && (
                    <button
                      onClick={() => setFullscreenOpen(true)}
                      className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="View fullscreen"
                    >
                      <Maximize2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumbnails (Bottom) */}
        {showThumbs && !isVerticalThumbs && (
          <div className="mt-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView="auto"
              watchSlidesProgress={true}
              className="w-full"
              modules={[Thumbs]}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id} className={getThumbnailSizeClass()}>
                  <div className="w-full h-full cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg overflow-hidden transition-all">
                    <Image
                      src={image.url || ''}
                      alt={`Thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    )
  }

  // Render Grid Style
  if (config.style === 'grid') {
    return (
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative ${getAspectRatioClass()} rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 ${
              index === 0 ? 'col-span-2' : ''
            }`}
          >
            <Image
              src={image.url || ''}
              alt={`Product image ${index + 1}`}
              fill
              className={`object-${config.objectFit || 'cover'} cursor-pointer hover:scale-105 transition-transform duration-300`}
              priority={index <= 2}
              onClick={() => {
                setCurrentImageIndex(index)
                if (config.fullscreen) setFullscreenOpen(true)
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  // Render Stacked Style
  if (config.style === 'stacked') {
    return (
      <div className="flex flex-col gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative ${getAspectRatioClass()} w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800`}
          >
            <Image
              src={image.url || ''}
              alt={`Product image ${index + 1}`}
              fill
              className={`object-${config.objectFit || 'cover'}`}
              priority={index <= 2}
              loading={config.lazyLoad && index > 2 ? 'lazy' : 'eager'}
            />
          </div>
        ))}
      </div>
    )
  }

  // Render Filmstrip Style
  if (config.style === 'filmstrip') {
    return (
      <Swiper
        modules={[Navigation]}
        navigation={config.navigation}
        slidesPerView="auto"
        spaceBetween={16}
        className="w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} className="!w-auto">
            <div className={`relative ${getAspectRatioClass()} h-96 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800`}>
              <Image
                src={image.url || ''}
                alt={`Product image ${index + 1}`}
                fill
                className={`object-${config.objectFit || 'cover'}`}
                priority={index <= 2}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }

  // Fullscreen Modal
  if (fullscreenOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <button
          onClick={() => setFullscreenOpen(false)}
          className="absolute top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close fullscreen"
        >
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Zoom]}
          navigation
          pagination={{ clickable: true }}
          zoom={{ maxRatio: config.zoomLevel || 3 }}
          initialSlide={currentImageIndex}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                <Image
                  src={image.url || ''}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }

  return null
}
