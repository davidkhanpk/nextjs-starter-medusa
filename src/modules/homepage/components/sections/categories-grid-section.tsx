'use client'

import { HomepageSection } from '../../types'
import Link from 'next/link'

interface CategoriesGridSectionProps {
  section: HomepageSection
}

export function CategoriesGridSection({ section }: CategoriesGridSectionProps) {
  // In a real implementation, this would fetch categories from Medusa
  
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
        {/* Categories would be rendered here */}
        <div className="text-sm text-gray-500">
          Categories will appear here
        </div>
      </div>
    </section>
  )
}
