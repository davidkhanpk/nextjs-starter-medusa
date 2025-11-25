import React from 'react'
import { SectionProps } from './dynamic-section-renderer'

export default function ProductTabsSection({ section, product }: SectionProps) {
  const tabs = []
  if (section.showDescription !== false) tabs.push({ id: 'desc', label: 'Description', content: product.description })
  if (section.showSpecifications !== false) tabs.push({ id: 'specs', label: 'Specifications', content: 'Product specifications...' })
  if (section.showShipping !== false) tabs.push({ id: 'ship', label: 'Shipping', content: 'Shipping information...' })
  if (section.showReturns !== false) tabs.push({ id: 'returns', label: 'Returns', content: 'Return policy...' })

  return (
    <div className="border-t border-gray-200 pt-8">
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <button key={tab.id} className="px-6 py-3 border-b-2 border-blue-600 font-medium">
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6 text-gray-700">
        {tabs[0]?.content}
      </div>
    </div>
  )
}
