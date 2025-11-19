'use client'

import { HomepageSection } from '../../types'

interface GridSectionProps {
  section: HomepageSection
}

export function GridSection({ section }: GridSectionProps) {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  const gap = section.gap || 'md'
  const gridCols = section.gridColumns || 3

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
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols} ${gapClasses[gap]}`}
      >
        {section.columnConfig?.map((columnConfig) => (
          <div key={columnConfig.id} className="grid-item">
            {/* Grid item content based on columnConfig.contentType */}
            <div className="border rounded-lg p-4">
              {columnConfig.contentType === 'category-products' && (
                <div>Category: {columnConfig.categoryHandle}</div>
              )}
              {columnConfig.contentType === 'banner' && columnConfig.imageUrl && (
                <img
                  src={columnConfig.imageUrl}
                  alt="Banner"
                  className="w-full h-auto rounded"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
