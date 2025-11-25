/**
 * Product Template Configuration Utilities
 * Maps dashboard configuration to storefront component props
 */

// Type definitions (matching dashboard ProductGallerySection)
interface ProductGallerySection {
  id: string
  type: 'product-gallery'
  enabled: boolean
  order: number
  style: 'slider' | 'grid' | 'stacked' | 'filmstrip' | 'thumbnail-left' | 'thumbnail-bottom'
  thumbnailPosition: 'bottom' | 'left' | 'right' | 'hidden'
  thumbnailSize: 'sm' | 'md' | 'lg'
  zoom: boolean
  zoomType: 'hover' | 'click' | 'modal' | 'disabled'
  zoomLevel: number
  autoplay: boolean
  autoplayDelay: number
  transition: 'slide' | 'fade' | 'cube' | 'flip' | 'coverflow'
  loop: boolean
  navigation: boolean
  pagination: boolean
  aspectRatio: '1:1' | '4:3' | '16:9' | '3:4' | 'auto'
  objectFit: 'contain' | 'cover' | 'fill'
  fullscreen: boolean
  lazyLoad: boolean
}

/**
 * Convert ProductGallerySection from dashboard to storefront config
 */
export function mapGalleryConfig(section: ProductGallerySection) {
  return {
    style: section.style,
    thumbnailPosition: section.thumbnailPosition,
    thumbnailSize: section.thumbnailSize,
    zoom: section.zoom,
    zoomType: section.zoomType,
    zoomLevel: section.zoomLevel,
    autoplay: section.autoplay,
    autoplayDelay: section.autoplayDelay,
    transition: section.transition,
    loop: section.loop,
    navigation: section.navigation,
    pagination: section.pagination,
    aspectRatio: section.aspectRatio,
    objectFit: section.objectFit,
    fullscreen: section.fullscreen,
    lazyLoad: section.lazyLoad,
  }
}

/**
 * Get default gallery configuration
 */
export function getDefaultGalleryConfig() {
  return {
    style: 'slider' as const,
    thumbnailPosition: 'bottom' as const,
    thumbnailSize: 'md' as const,
    zoom: true,
    zoomType: 'hover' as const,
    zoomLevel: 2,
    autoplay: false,
    autoplayDelay: 3000,
    transition: 'slide' as const,
    loop: true,
    navigation: true,
    pagination: true,
    aspectRatio: '4:3' as const,
    objectFit: 'cover' as const,
    fullscreen: true,
    lazyLoad: true,
  }
}

/**
 * Validate gallery configuration
 */
export function validateGalleryConfig(config: any): boolean {
  const validStyles = ['slider', 'grid', 'stacked', 'filmstrip', 'thumbnail-left', 'thumbnail-bottom']
  const validZoomTypes = ['hover', 'click', 'modal', 'disabled']
  const validTransitions = ['slide', 'fade', 'cube', 'flip', 'coverflow']

  return (
    validStyles.includes(config.style) &&
    validZoomTypes.includes(config.zoomType) &&
    validTransitions.includes(config.transition) &&
    typeof config.zoom === 'boolean' &&
    typeof config.autoplay === 'boolean' &&
    typeof config.navigation === 'boolean' &&
    typeof config.pagination === 'boolean'
  )
}

/**
 * Merge user config with defaults
 */
export function mergeGalleryConfig(userConfig: Partial<any>) {
  return {
    ...getDefaultGalleryConfig(),
    ...userConfig,
  }
}

/**
 * Generate Swiper CSS classes based on config
 */
export function getGalleryCssClasses(config: any) {
  const classes = ['product-gallery']

  // Add style class
  classes.push(`gallery-${config.style}`)

  // Add thumbnail position class
  if (config.thumbnailPosition && config.thumbnailPosition !== 'hidden') {
    classes.push(`thumbs-${config.thumbnailPosition}`)
  }

  // Add transition effect class
  if (config.transition !== 'slide') {
    classes.push(`effect-${config.transition}`)
  }

  return classes.join(' ')
}

/**
 * Get Swiper configuration object from gallery config
 */
export function getSwiperConfig(config: any) {
  return {
    modules: [],
    navigation: config.navigation,
    pagination: config.pagination ? { clickable: true } : false,
    loop: config.loop,
    effect: config.transition === 'slide' ? undefined : config.transition,
    zoom: config.zoom && config.zoomType !== 'disabled' ? { maxRatio: config.zoomLevel } : false,
    autoplay: config.autoplay
      ? {
          delay: config.autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }
      : false,
    lazy: config.lazyLoad
      ? {
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        }
      : false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: false,
    grabCursor: true,
    speed: 400,
  }
}

/**
 * Get responsive breakpoints for Swiper
 */
export function getSwiperBreakpoints(config: any) {
  // For filmstrip, show more slides on larger screens
  if (config.style === 'filmstrip') {
    return {
      320: { slidesPerView: 1.5, spaceBetween: 10 },
      640: { slidesPerView: 2.5, spaceBetween: 12 },
      768: { slidesPerView: 3.5, spaceBetween: 16 },
      1024: { slidesPerView: 4.5, spaceBetween: 16 },
    }
  }

  // Default single slide per view
  return {
    320: { slidesPerView: 1 },
  }
}

/**
 * Get thumbnail Swiper configuration
 */
export function getThumbnailSwiperConfig(config: any) {
  const isVertical = config.style === 'thumbnail-left'

  return {
    spaceBetween: 10,
    slidesPerView: 'auto' as const,
    direction: isVertical ? ('vertical' as const) : ('horizontal' as const),
    watchSlidesProgress: true,
    freeMode: true,
    breakpoints: isVertical
      ? undefined
      : {
          320: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        },
  }
}

/**
 * Calculate optimal image sizes for different gallery styles
 */
export function getImageSizes(config: any) {
  switch (config.style) {
    case 'slider':
    case 'thumbnail-left':
    case 'thumbnail-bottom':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px'
    
    case 'grid':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px'
    
    case 'stacked':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px'
    
    case 'filmstrip':
      return '(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 400px'
    
    default:
      return '(max-width: 768px) 100vw, 50vw'
  }
}

/**
 * Get aspect ratio Tailwind class
 */
export function getAspectRatioClass(aspectRatio: string) {
  switch (aspectRatio) {
    case '1:1':
      return 'aspect-square'
    case '4:3':
      return 'aspect-[4/3]'
    case '16:9':
      return 'aspect-video'
    case '3:4':
      return 'aspect-[3/4]'
    case 'auto':
      return ''
    default:
      return 'aspect-square'
  }
}

/**
 * Get thumbnail size class
 */
export function getThumbnailSizeClass(size: string) {
  switch (size) {
    case 'sm':
      return 'w-16 h-16'
    case 'lg':
      return 'w-24 h-24'
    case 'md':
    default:
      return 'w-20 h-20'
  }
}

/**
 * Performance optimization: Determine which images to preload
 */
export function getPreloadIndices(config: any, totalImages: number) {
  // Always preload first image
  const indices = [0]

  // For slider, preload next 2 images
  if (config.style === 'slider' || config.style === 'thumbnail-left' || config.style === 'thumbnail-bottom') {
    if (totalImages > 1) indices.push(1)
    if (totalImages > 2) indices.push(2)
  }

  // For grid, preload first 4 images
  if (config.style === 'grid') {
    for (let i = 1; i < Math.min(4, totalImages); i++) {
      indices.push(i)
    }
  }

  return indices
}
