'use client'

import React from 'react'
import { PageBuilderProvider } from '@lib/page-builder/context'
import { PageBuilderAdmin } from '@modules/admin/components/page-builder-admin'

export default function PageBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <PageBuilderProvider>
          <PageBuilderAdmin />
        </PageBuilderProvider>
      </div>
    </div>
  )
}
