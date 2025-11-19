'use client'

import { HomepageSection } from '../../types'
import Link from 'next/link'

interface HeroSectionProps {
  section: HomepageSection
}

export function HeroSection({ section }: HeroSectionProps) {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden rounded-lg my-8">
      {section.imageUrl && (
        <div className="absolute inset-0">
          <img
            src={section.imageUrl}
            alt={section.title || 'Hero'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
      )}

      <div className="relative z-10 text-center text-white px-4 max-w-3xl">
        {section.title && (
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {section.title}
          </h1>
        )}
        {section.subtitle && (
          <p className="text-xl md:text-2xl mb-8">{section.subtitle}</p>
        )}
        {section.ctaText && section.ctaUrl && (
          <Link
            href={section.ctaUrl}
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {section.ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
