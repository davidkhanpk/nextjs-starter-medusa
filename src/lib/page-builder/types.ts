/**
 * Simplified Page Builder System
 * Uses Medusa categories for all product sections
 */

export type SectionType = 
  | 'hero'
  | 'category-products'  // Unified: show products from any category
  | 'categories-grid'     // Show category cards
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
  categoryId: string           // Medusa category ID
  categoryHandle?: string      // For display/fallback
  limit: number
  layout: 'grid' | 'carousel'
  columns: 2 | 3 | 4 | 5
  showQuickView: boolean
  showWishlist: boolean
  showBadge: boolean           // Show "NEW" or "SALE" badge if in category tags
}

export interface CategoriesGridSection extends BaseSection {
  type: 'categories-grid'
  categoryIds?: string[]       // If empty, show all root categories
  layout: 'grid' | 'carousel' | 'list'
  columns: 2 | 3 | 4 | 6
  showProductCount: boolean
  showImages: boolean
  imageShape: 'square' | 'circle' | 'rounded'
}

export interface CollectionsSection extends BaseSection {
  type: 'collections'
  collectionIds?: string[]     // If empty, show all
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

// Default section configurations
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

export interface FeaturedProductsSection extends BaseSection {
  type: 'featured-products'
  collectionId?: string
  productIds?: string[]
  limit: number
  layout: 'grid' | 'carousel' | 'masonry'
  columns: 2 | 3 | 4 | 5
  showQuickView: boolean
  showWishlist: boolean
}

export interface NewArrivalsSection extends BaseSection {
  type: 'new-arrivals'
  daysThreshold: number // Products added within last X days
  limit: number
  layout: 'grid' | 'carousel'
  columns: 2 | 3 | 4 | 5
  sortBy: 'created_at' | 'updated_at'
}

export interface OnSaleSection extends BaseSection {
  type: 'on-sale'
  limit: number
  layout: 'grid' | 'carousel'
  columns: 2 | 3 | 4 | 5
  showDiscount: boolean
  showOriginalPrice: boolean
  minDiscountPercent?: number // Only show items with X% or more discount
}

export interface CategoriesSection extends BaseSection {
  type: 'categories'
  categoryIds?: string[] // If empty, show all
  layout: 'grid' | 'carousel' | 'list'
  columns: 2 | 3 | 4 | 6
  showProductCount: boolean
  showImages: boolean
  imageShape: 'square' | 'circle' | 'rounded'
}

export interface CollectionsSection extends BaseSection {
  type: 'collections'
  collectionIds?: string[] // If empty, show all
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

export interface InstagramFeedSection extends BaseSection {
  type: 'instagram-feed'
  username?: string
  accessToken?: string
  limit: number
  columns: 3 | 4 | 5 | 6
  showCaptions: boolean
}

export interface BrandsSection extends BaseSection {
  type: 'brands'
  brandIds?: string[]
  layout: 'grid' | 'carousel'
  columns: 3 | 4 | 5 | 6
  showLogos: boolean
}

export interface BlogPostsSection extends BaseSection {
  type: 'blog-posts'
  limit: number
  layout: 'grid' | 'list' | 'carousel'
  columns: 2 | 3 | 4
  showExcerpt: boolean
  showAuthor: boolean
  showDate: boolean
}

export interface CustomHtmlSection extends BaseSection {
  type: 'custom-html'
  html: string
  css?: string
  js?: string
}

export interface VideoSection extends BaseSection {
  type: 'video'
  videoUrl: string
  thumbnail?: string
  autoplay: boolean
  loop: boolean
  muted: boolean
  aspectRatio: '16:9' | '4:3' | '1:1' | '21:9'
}

export interface CountdownTimerSection extends BaseSection {
  type: 'countdown-timer'
  targetDate: string // ISO date string
  layout: 'inline' | 'banner' | 'fullwidth'
  showLabels: boolean
  collectionId?: string // Optional: link to sale collection
  ctaText?: string
  ctaLink?: string
}

export type PageSection = 
  | HeroSection
  | FeaturedProductsSection
  | NewArrivalsSection
  | OnSaleSection
  | CategoriesSection
  | CollectionsSection
  | BannerSection
  | TestimonialsSection
  | NewsletterSection
  | InstagramFeedSection
  | BrandsSection
  | BlogPostsSection
  | CustomHtmlSection
  | VideoSection
  | CountdownTimerSection

export interface PageLayout {
  id: string
  name: string
  sections: PageSection[]
  createdAt: string
  updatedAt: string
}

export interface PageBuilderConfig {
  currentLayout: string // Layout ID
  layouts: PageLayout[]
  defaultLayout: string // Fallback layout ID
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
  'featured-products': {
    type: 'featured-products',
    enabled: true,
    limit: 8,
    layout: 'grid',
    columns: 4,
    showQuickView: true,
    showWishlist: true,
  },
  'new-arrivals': {
    type: 'new-arrivals',
    enabled: true,
    daysThreshold: 30,
    limit: 8,
    layout: 'carousel',
    columns: 4,
    sortBy: 'created_at',
  },
  'on-sale': {
    type: 'on-sale',
    enabled: true,
    limit: 8,
    layout: 'grid',
    columns: 4,
    showDiscount: true,
    showOriginalPrice: true,
  },
  'categories': {
    type: 'categories',
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
  'instagram-feed': {
    type: 'instagram-feed',
    enabled: true,
    limit: 6,
    columns: 6,
    showCaptions: false,
  },
  'brands': {
    type: 'brands',
    enabled: true,
    layout: 'carousel',
    columns: 6,
    showLogos: true,
  },
  'blog-posts': {
    type: 'blog-posts',
    enabled: true,
    limit: 3,
    layout: 'grid',
    columns: 3,
    showExcerpt: true,
    showAuthor: true,
    showDate: true,
  },
  'custom-html': {
    type: 'custom-html',
    enabled: true,
    html: '',
  },
  'video': {
    type: 'video',
    enabled: true,
    videoUrl: '',
    autoplay: false,
    loop: false,
    muted: false,
    aspectRatio: '16:9',
  },
  'countdown-timer': {
    type: 'countdown-timer',
    enabled: true,
    targetDate: '',
    layout: 'banner',
    showLabels: true,
  },
}
