'use client'

import { ComponentConfig } from '@measured/puck'
import React from 'react'
import Link from '@/components/common/SafeLink'

export interface PromotionalBannerGridProps {
  title?: string
  subtitle?: string
  layout: '2-column' | '3-column' | '1-2-split' | '2-1-split'
  spacing: 'none' | 'sm' | 'md' | 'lg'
  banners: Array<{
    id: string
    title: string
    subtitle: string
    imageUrl: string
    ctaText: string
    ctaLink: string
    overlayOpacity: number
    textColor: string
    textPosition: 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  }>
  borderRadius: 'none' | 'sm' | 'md' | 'lg'
  hoverEffect: 'zoom' | 'overlay' | 'lift' | 'none'
  minHeight: string
}

const PromotionalBannerGridRender: React.FC<PromotionalBannerGridProps> = ({
  title,
  subtitle,
  layout,
  spacing,
  banners,
  borderRadius,
  hoverEffect,
  minHeight,
}) => {
  const spacingClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  }

  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  }

  const positionClasses = {
    'top-left': 'items-start justify-start text-left',
    'top-center': 'items-start justify-center text-center',
    'top-right': 'items-start justify-end text-right',
    'center': 'items-center justify-center text-center',
    'bottom-left': 'items-end justify-start text-left',
    'bottom-center': 'items-end justify-center text-center',
    'bottom-right': 'items-end justify-end text-right',
  }

  const hoverEffectClasses = {
    zoom: 'group-hover:scale-110',
    overlay: '',
    lift: 'group-hover:-translate-y-2',
    none: '',
  }

  const getGridClasses = () => {
    switch (layout) {
      case '3-column':
        return 'grid-cols-1 md:grid-cols-3'
      case '1-2-split':
        return 'grid-cols-1 md:grid-cols-3'
      case '2-1-split':
        return 'grid-cols-1 md:grid-cols-3'
      case '2-column':
      default:
        return 'grid-cols-1 md:grid-cols-2'
    }
  }

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
            {subtitle && <p className="text-base text-gray-600">{subtitle}</p>}
          </div>
        )}

        {/* Banner Grid */}
        <div className={`grid ${getGridClasses()} ${spacingClasses[spacing] || 'gap-4'}`}>
          {(banners || []).map((banner, index) => {
            const isLarge = (layout === '1-2-split' && index === 0) || (layout === '2-1-split' && index === 2)
            const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1'
            const rowSpan = layout === '1-2-split' && index === 0 ? 'md:row-span-2' : layout === '2-1-split' && index === 2 ? 'md:row-span-2' : ''
            const bannerId = banner.id || `banner-${index}`
            const overlayOpacity = typeof banner.overlayOpacity === 'number' ? banner.overlayOpacity : 40
            const textColor = banner.textColor || '#ffffff'
            const textPosition = banner.textPosition || 'bottom-left'

            return (
              <Link
                key={bannerId}
                href={banner.ctaLink || '#'}
                className={`group relative overflow-hidden ${borderRadiusClasses[borderRadius] || 'rounded-none'} ${colSpan} ${rowSpan} ${hoverEffect === 'lift' ? 'transition-transform duration-300' : ''}`}
                style={{ minHeight }}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${hoverEffectClasses[hoverEffect] || ''}`}
                  style={{
                    backgroundImage: `url(${banner.imageUrl})`,
                  }}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    hoverEffect === 'overlay' ? 'group-hover:opacity-60' : ''
                  }`}
                  style={{ opacity: overlayOpacity / 100 }}
                />

                {/* Content */}
                <div className={`relative h-full flex flex-col p-6 md:p-8 ${positionClasses[textPosition] || positionClasses['bottom-left']}`}>
                  <div>
                    <h3
                      className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
                      style={{ color: textColor }}
                    >
                      {banner.title}
                    </h3>
                    <p
                      className="text-base md:text-lg mb-4"
                      style={{ color: textColor }}
                    >
                      {banner.subtitle}
                    </p>
                    <button
                      className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors inline-block"
                    >
                      {banner.ctaText}
                    </button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const PromotionalBannerGrid: ComponentConfig<PromotionalBannerGridProps> = {
  label: 'Promotional Banner Grid',

  fields: {
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'text', label: 'Subtitle' },
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: '2 Column', value: '2-column' },
        { label: '3 Column', value: '3-column' },
        { label: '1-2 Split', value: '1-2-split' },
        { label: '2-1 Split', value: '2-1-split' },
      ],
    },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    banners: {
      type: 'array',
      label: 'Banners',
      arrayFields: {
        title: { type: 'text', label: 'Title' },
        subtitle: { type: 'text', label: 'Subtitle' },
        imageUrl: { type: 'text', label: 'Image URL' },
        ctaText: { type: 'text', label: 'CTA Text' },
        ctaLink: { type: 'text', label: 'CTA Link' },
        overlayOpacity: { type: 'number', label: 'Overlay Opacity', min: 0, max: 100 },
        textColor: { type: 'text', label: 'Text Color' },
        textPosition: {
          type: 'select',
          label: 'Text Position',
          options: [
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Center', value: 'top-center' },
            { label: 'Center', value: 'center' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Center', value: 'bottom-center' },
          ],
        },
      },
    } as any,
    borderRadius: {
      type: 'select',
      label: 'Border Radius',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    hoverEffect: {
      type: 'select',
      label: 'Hover Effect',
      options: [
        { label: 'Zoom', value: 'zoom' },
        { label: 'Overlay', value: 'overlay' },
        { label: 'Lift', value: 'lift' },
        { label: 'None', value: 'none' },
      ],
    },
    minHeight: { type: 'text', label: 'Min Height (e.g. 300px)' },
  },

  defaultProps: {
    title: '',
    subtitle: '',
    layout: '2-column',
    spacing: 'md',
    banners: [
      {
        id: '1',
        title: 'New Collection',
        subtitle: 'Shop the latest styles',
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
        ctaText: 'Shop Now',
        ctaLink: '/store',
        overlayOpacity: 40,
        textColor: '#ffffff',
        textPosition: 'bottom-left',
      },
      {
        id: '2',
        title: 'Best Sellers',
        subtitle: 'Top-rated products',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        ctaText: 'Explore',
        ctaLink: '/store',
        overlayOpacity: 40,
        textColor: '#ffffff',
        textPosition: 'bottom-left',
      },
    ],
    borderRadius: 'md',
    hoverEffect: 'zoom',
    minHeight: '300px',
  },

  render: (props) => <PromotionalBannerGridRender {...props} />,
}

export default PromotionalBannerGrid
