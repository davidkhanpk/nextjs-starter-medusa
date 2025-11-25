/**
 * Testimonials Section
 */

'use client';

import { TestimonialsSection as TestimonialsSectionType } from '@lib/page-builder/types';
import Image from 'next/image';

interface TestimonialsSectionProps extends TestimonialsSectionType {}

const COLUMN_CLASSES = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

export default function TestimonialsSection(props: TestimonialsSectionProps) {
  const {
    title,
    subtitle,
    layout,
    columns,
    items,
  } = props;

  const columnClass = layout === 'grid' ? COLUMN_CLASSES[columns] : 'grid-cols-1';

  return (
    <div className="content-container py-12">
      {/* Section Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {subtitle && (
            <p className="text-sm uppercase tracking-wide text-muted mb-2">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Testimonials Grid */}
      <div className={`grid ${columnClass} gap-8`}>
        {items.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            {/* Rating */}
            {testimonial.rating > 0 && (
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}

            {/* Testimonial Text */}
            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

            {/* Author Info */}
            <div className="flex items-center gap-3">
              {testimonial.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                {testimonial.role && (
                  <p className="text-sm text-muted">{testimonial.role}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
