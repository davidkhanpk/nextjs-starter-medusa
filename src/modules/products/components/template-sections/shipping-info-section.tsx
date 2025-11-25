import React from 'react'
import { SectionProps } from './dynamic-section-renderer'

export default function ShippingInfoSection({ section }: SectionProps) {
  return (
    <div className="border-t border-gray-200 py-6">
      <h4 className="font-semibold mb-3">{section.title || 'Shipping Information'}</h4>
      <div className="space-y-2 text-sm text-gray-600">
        {section.showEstimate !== false && (
          <p>Estimated delivery: 3-5 business days</p>
        )}
        {section.showCost !== false && (
          <p>Shipping cost calculated at checkout</p>
        )}
        {section.showTrackingInfo && (
          <p>Tracking information provided after shipment</p>
        )}
        {section.showReturnsPolicy && (
          <p>30-day return policy</p>
        )}
      </div>
    </div>
  )
}
