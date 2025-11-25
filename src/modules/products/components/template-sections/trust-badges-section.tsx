import React from 'react'
import { SectionProps } from './dynamic-section-renderer'
import { LockClosedSolid, TruckSolid } from '@medusajs/icons'

export default function TrustBadgesSection({ section }: SectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4 py-6">
      {section.showSecureCheckout !== false && (
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <LockClosedSolid className="w-6 h-6 text-green-600" />
          <span className="font-semibold">Secure Checkout</span>
        </div>
      )}
      {section.showFreeShipping !== false && (
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <TruckSolid className="w-6 h-6 text-blue-600" />
          <span className="font-semibold">Free Shipping</span>
        </div>
      )}
    </div>
  )
}
