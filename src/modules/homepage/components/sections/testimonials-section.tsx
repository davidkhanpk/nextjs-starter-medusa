/**
 * Testimonials Section
 * Displays customer reviews and testimonials
 */

'use client'

import { HomepageSection } from '../../types'
import { useState } from 'react'

interface Testimonial {
  id: string
  name: string
  role?: string
  content: string
  rating: number
  avatar?: string
  date?: string
}

interface TestimonialsSectionProps {
  section: HomepageSection
}

export function TestimonialsSection({ section }: TestimonialsSectionProps) {
  // Parse testimonials from section content or use defaults
  const [testimonials] = useState<Testimonial[]>(() => {
    if (section.content) {
      try {
        return JSON.parse(section.content)
      } catch {
        return getDefaultTestimonials()
      }
    }
    return getDefaultTestimonials()
  })

  const columns = section.columns || 3
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {(section.title || section.subtitle) && (
          <div className="text-center mb-12">
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

        {/* Testimonials Grid */}
        <div className={`grid ${gridClass} gap-8`}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold text-lg">
                      {testimonial.name[0]}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  )}
                  {testimonial.date && (
                    <p className="text-xs text-gray-500 mt-1">
                      {testimonial.date}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {section.ctaText && section.ctaUrl && (
          <div className="text-center mt-12">
            <a
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
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

// Default testimonials if none provided
function getDefaultTestimonials(): Testimonial[] {
  return [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      content:
        'Amazing quality and fast shipping! The products exceeded my expectations. Will definitely shop here again.',
      rating: 5,
      date: '2 weeks ago',
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Happy Customer',
      content:
        'Great customer service and high-quality products. The team was very helpful with my questions.',
      rating: 5,
      date: '1 month ago',
    },
    {
      id: '3',
      name: 'Emma Davis',
      role: 'Regular Shopper',
      content:
        'Love the variety and quality! The checkout process was smooth and delivery was quick.',
      rating: 5,
      date: '3 weeks ago',
    },
  ]
}
