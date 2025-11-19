'use client'

import { HomepageSection } from '../../types'
import Link from 'next/link'

interface BannerSectionProps {
  section: HomepageSection
}

export function BannerSection({ section }: BannerSectionProps) {
  if (!section.imageUrl) return null

  return (
    <section className="py-8">
      <Link
        href={section.ctaUrl || '#'}
        className="block relative overflow-hidden rounded-lg hover:opacity-95 transition-opacity"
      >
        <img
          src={section.imageUrl}
          alt={section.title || 'Banner'}
          className="w-full h-auto"
        />
        {(section.title || section.subtitle) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-30 p-8">
            {section.title && (
              <h2 className="text-4xl font-bold mb-2">{section.title}</h2>
            )}
            {section.subtitle && (
              <p className="text-xl">{section.subtitle}</p>
            )}
          </div>
        )}
      </Link>
    </section>
  )
}
