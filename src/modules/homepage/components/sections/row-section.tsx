'use client'

import { HomepageSection } from '../../types'
import Link from '@/components/common/SafeLink'

interface RowSectionProps {
  section: HomepageSection
}

export function RowSection({ section }: RowSectionProps) {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const columns = section.columns || 2
  const gap = section.gap || 'md'
  const align = section.alignItems || 'start'

  return (
    <section className="py-12">
      {(section.title || section.subtitle) && (
        <div className="text-center mb-8">
          {section.title && (
            <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
          )}
          {section.subtitle && (
            <p className="text-gray-600">{section.subtitle}</p>
          )}
        </div>
      )}

      <div
        className={`grid grid-cols-1 md:grid-cols-${columns} ${gapClasses[gap]} ${alignClasses[align]}`}
      >
        {Array.from({ length: columns }).map((_, index) => {
          const columnConfig = section.columnConfig?.[index]
          
          if (!columnConfig) return null

          return (
            <div key={columnConfig.id} className="column-content">
              <ColumnContent config={columnConfig} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

interface ColumnContentProps {
  config: any
}

function ColumnContent({ config }: ColumnContentProps) {
  switch (config.contentType) {
    case 'category-products':
      return <CategoryProductsColumn config={config} />
    
    case 'banner':
      return <BannerColumn config={config} />
    
    case 'custom-html':
      return <CustomHtmlColumn config={config} />
    
    default:
      return null
  }
}

function CategoryProductsColumn({ config }: ColumnContentProps) {
  // This would fetch products from Medusa API using categoryHandle
  // For now, showing placeholder
  
  return (
    <div className="space-y-4">
      {config.showTitle && config.categoryHandle && (
        <h3 className="text-xl font-semibold capitalize">
          {config.categoryHandle.replace(/-/g, ' ')}
        </h3>
      )}
      
      <div className={`grid grid-cols-${config.displayColumns || 2} gap-4`}>
        {/* Products would be rendered here */}
        <div className="text-sm text-gray-500">
          Products from category: {config.categoryHandle}
        </div>
      </div>
      
      {config.categoryHandle && (
        <Link
          href={`/categories/${config.categoryHandle}`}
          className="inline-block text-sm font-medium hover:underline"
        >
          View All →
        </Link>
      )}
    </div>
  )
}

function BannerColumn({ config }: ColumnContentProps) {
  if (!config.imageUrl) return null

  return (
    <div className="relative overflow-hidden rounded-lg">
      <img
        src={config.imageUrl}
        alt="Banner"
        className="w-full h-auto object-cover"
      />
    </div>
  )
}

function CustomHtmlColumn({ config }: ColumnContentProps) {
  if (!config.customContent) return null

  return (
    <div
      className="custom-content"
      dangerouslySetInnerHTML={{ __html: config.customContent }}
    />
  )
}
