export type SectionType =
  | 'hero'
  | 'category-products'
  | 'categories-grid'
  | 'collections'
  | 'banner'
  | 'testimonials'
  | 'newsletter'
  | 'custom-html'
  | 'row'
  | 'grid'

export type ContentType = 'category-products' | 'banner' | 'custom-html'

export type ContainerWidth = 'full-width' | 'container' | 'narrow'

export type GapSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export type AlignItems = 'start' | 'center' | 'end' | 'stretch'

export interface ColumnConfig {
  id: string
  contentType: ContentType
  categoryId?: string
  categoryHandle?: string
  limit?: number
  displayColumns?: number
  showTitle?: boolean
  showSubtitle?: boolean
  imageUrl?: string
  customContent?: string
}

export interface HomepageSection {
  id: string
  type: SectionType
  enabled: boolean
  order: number
  title?: string
  subtitle?: string
  imageUrl?: string
  content?: string
  ctaText?: string
  ctaUrl?: string
  categoryHandle?: string
  limit?: number
  layoutStructure?: ContainerWidth
  columns?: number
  gridColumns?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  columnConfig?: ColumnConfig[]
  gap?: GapSize
  alignItems?: AlignItems
  gridAutoFlow?: 'row' | 'column' | 'dense'
}
