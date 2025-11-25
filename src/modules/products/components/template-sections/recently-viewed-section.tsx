import React from 'react'
import { SectionProps } from './dynamic-section-renderer'

export default function RecentlyViewedSection({ section }: SectionProps) {
  return (
    <div className="py-12">
      <h3 className="text-2xl font-bold mb-6">{section.title || 'Recently Viewed'}</h3>
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-gray-100 aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  )
}
