import React from 'react'
import { SectionProps } from './dynamic-section-renderer'

export default function CustomHTMLSection({ section }: SectionProps) {
  // In production, sanitize HTML to prevent XSS attacks
  const sanitizedHTML = section.htmlContent || ''

  return (
    <div className="py-6">
      {section.title && (
        <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
      )}
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
      {section.customCss && (
        <style>{section.customCss}</style>
      )}
    </div>
  )
}
