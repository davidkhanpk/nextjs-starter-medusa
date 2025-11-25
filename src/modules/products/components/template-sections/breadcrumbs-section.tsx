import React from 'react'
import { SectionProps } from './dynamic-section-renderer'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

export default function BreadcrumbsSection({ section, product }: SectionProps) {
  const separator = section.separator || '>'
  
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 py-4">
      {section.showHomeLink !== false && (
        <>
          <LocalizedClientLink href="/" className="hover:text-gray-900">
            Home
          </LocalizedClientLink>
          <span>{separator}</span>
        </>
      )}
      <LocalizedClientLink href="/products" className="hover:text-gray-900">
        Products
      </LocalizedClientLink>
      {product.collection && (
        <>
          <span>{separator}</span>
          <LocalizedClientLink 
            href={`/collections/${product.collection.handle}`}
            className="hover:text-gray-900"
          >
            {product.collection.title}
          </LocalizedClientLink>
        </>
      )}
      <span>{separator}</span>
      <span className="text-gray-900 font-medium">{product.title}</span>
    </nav>
  )
}
