import React from 'react'
import { SectionProps } from './dynamic-section-renderer'

export default function ReviewsSection({ section, product }: SectionProps) {
  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-2xl font-bold mb-4">{section.title || 'Customer Reviews'}</h3>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center">
          <span className="text-yellow-400 text-2xl">★★★★★</span>
          <span className="ml-2 font-semibold">4.8</span>
        </div>
        <span className="text-gray-600">(127 reviews)</span>
      </div>
      {section.showSubmissionForm !== false && (
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Write a Review
        </button>
      )}
    </div>
  )
}
