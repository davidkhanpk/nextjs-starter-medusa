/**
 * Collections Section
 * Displays featured collections in various layouts
 */

'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/common/SafeLink'
import { HomepageSection } from '../../types'
import { HttpTypes } from '@medusajs/types'

interface CollectionsSectionProps {
  section: HomepageSection
}

export function CollectionsSection({ section }: CollectionsSectionProps) {
  const [collections, setCollections] = useState<HttpTypes.StoreCollection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/collections?limit=${section.limit || 4}`
      )
      
      if (response.ok) {
        const data = await response.json()
        setCollections(data.collections || [])
      }
    } catch (error) {
      console.error('Error fetching collections:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: section.limit || 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg mb-4" />
              <div className="bg-gray-200 h-6 w-3/4 rounded mb-2" />
              <div className="bg-gray-200 h-4 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (collections.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p>No collections found</p>
      </div>
    )
  }

  const gridColumns = section.columns || 4
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
  }[gridColumns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  return (
    <section className="py-12">
      {/* Section Header */}
      {(section.title || section.subtitle) && (
        <div className="text-center mb-8">
          {section.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <p className="text-gray-600 text-lg">
              {section.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Collections Grid */}
      <div className={`grid ${gridClass} gap-6`}>
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="group relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg transition-all duration-300"
          >
            {/* Collection Image */}
            <div className="aspect-[4/5] relative overflow-hidden">
              {collection.metadata?.image_url ? (
                <img
                  src={collection.metadata.image_url as string}
                  alt={collection.title || 'Collection'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-4xl text-gray-400">
                    {collection.title?.[0] || 'C'}
                  </span>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>

            {/* Collection Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                {collection.title}
              </h3>
              {typeof collection.metadata?.product_count === 'number' && (
                <p className="text-sm text-gray-600">
                  {collection.metadata.product_count} products
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      {section.ctaText && section.ctaUrl && (
        <div className="text-center mt-8">
          <Link
            href={section.ctaUrl}
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {section.ctaText}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  )
}
