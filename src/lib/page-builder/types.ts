/**
 * Simplified Page Builder System
 * Uses Medusa categories for all product sections
 */

export type SectionType = 
  | 'hero'
  | 'category-products'
  | 'categories-grid'
  | 'collections'
  | 'banner'
  | 'testimonials'
  | 'newsletter'
  | 'custom-html'

export interface BaseSection {
  id: string
  type: SectionType
  enabled: boolean
  order: number
  title?: string
  subtitle?: string
}

export interface HeroSection extends BaseSection {
  type: 'hero'
  variant: 'gradient' | 'image' | 'video' | 'minimal'
  height: 'sm' | 'md' | 'lg' | 'full'
  backgroundImage?: string
  backgroundVideo?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  overlayOpacity?: number
  textAlign: 'left' | 'center' | 'right'
  showScrollIndicator: boolean
}

export interface CategoryProductsSection extends BaseSection {
  type: 'category-products'
  categoryId: string
  categoryHandle?: string
  limit: number
  layout: 'grid' | 'carousel'
  columns: 2 | 3 | 4 | 5
  showQuickView: boolean
  showWishlist: boolean
  showBadge: boolean
}

export interface CategoriesGridSection extends BaseSection {
  type: 'categories-grid'
  categoryIds?: string[]
  layout: 'grid' | 'carousel' | 'list'
  columns: 2 | 3 | 4 | 6
  showProductCount: boolean
  showImages: boolean
  imageShape: 'square' | 'circle' | 'rounded'
}

export interface CollectionsSection extends BaseSection {
  type: 'collections'
  collectionIds?: string[]
  layout: 'grid' | 'carousel' | 'featured'
  columns: 2 | 3 | 4
  showProductCount: boolean
  showImages: boolean
}

export interface BannerSection extends BaseSection {
  type: 'banner'
  image: string
  mobileImage?: string
  link?: string
  altText: string
  height: 'sm' | 'md' | 'lg' | 'auto'
  fullWidth: boolean
}

export interface TestimonialsSection extends BaseSection {
  type: 'testimonials'
  layout: 'grid' | 'carousel' | 'masonry'
  columns: 1 | 2 | 3
  items: Array<{
    id: string
    name: string
    rating: number
    text: string
    image?: string
    role?: string
  }>
}

export interface NewsletterSection extends BaseSection {
  type: 'newsletter'
  layout: 'inline' | 'popup' | 'banner'
  backgroundColor?: string
  showImage: boolean
  image?: string
  privacyText?: string
}

export interface CustomHtmlSection extends BaseSection {
  type: 'custom-html'
  html: string
  css?: string
}

export type PageSection = 
  | HeroSection
  | CategoryProductsSection
  | CategoriesGridSection
  | CollectionsSection
  | BannerSection
  | TestimonialsSection
  | NewsletterSection
  | CustomHtmlSection

export interface PageLayout {
  id: string
  name: string
  sections: PageSection[]
  createdAt: string
  updatedAt: string
}

export interface PageBuilderConfig {
  currentLayout: string
  layouts: PageLayout[]
  defaultLayout: string
}

// Default section configurations for quick setup
export const DEFAULT_SECTION_CONFIGS: Record<SectionType, Partial<PageSection>> = {
  'hero': {
    type: 'hero',
    enabled: true,
    variant: 'gradient',
    height: 'md',
    textAlign: 'center',
    showScrollIndicator: true,
  },
  'category-products': {
    type: 'category-products',
    enabled: true,
    categoryId: '',
    limit: 8,
    layout: 'grid',
    columns: 4,
    showQuickView: true,
    showWishlist: true,
    showBadge: true,
  },
  'categories-grid': {
    type: 'categories-grid',
    enabled: true,
    layout: 'grid',
    columns: 4,
    showProductCount: true,
    showImages: true,
    imageShape: 'rounded',
  },
  'collections': {
    type: 'collections',
    enabled: true,
    layout: 'grid',
    columns: 3,
    showProductCount: true,
    showImages: true,
  },
  'banner': {
    type: 'banner',
    enabled: true,
    image: '',
    altText: '',
    height: 'md',
    fullWidth: true,
  },
  'testimonials': {
    type: 'testimonials',
    enabled: true,
    layout: 'carousel',
    columns: 3,
    items: [],
  },
  'newsletter': {
    type: 'newsletter',
    enabled: true,
    layout: 'banner',
    showImage: true,
  },
  'custom-html': {
    type: 'custom-html',
    enabled: true,
    html: '',
  },
}
