'use client'

import { HomepageSection } from '../../types'

interface CategoryProductsSectionProps {
  section: HomepageSection
}

export function CategoryProductsSection({ section }: CategoryProductsSectionProps) {
  // In a real implementation, this would fetch products from Medusa
  // using the categoryHandle from section.categoryHandle
  
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Products would be rendered here using Medusa SDK */}
        <div className="text-sm text-gray-500">
          Products from category will appear here
        </div>
      </div>
    </section>
  )
}
