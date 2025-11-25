import React from 'react'
import { SectionProps } from './dynamic-section-renderer'

export default function SizeGuideSection({ section }: SectionProps) {
  return (
    <div className="py-4">
      <button className="text-blue-600 underline font-semibold hover:text-blue-700">
        {section.buttonText || 'Size Guide'}
      </button>
    </div>
  )
}
