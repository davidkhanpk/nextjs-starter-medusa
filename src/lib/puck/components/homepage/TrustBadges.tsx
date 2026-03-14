'use client'

import { ComponentConfig } from '@measured/puck'
import React from 'react'

export interface TrustBadgesProps {
  title?: string
  subtitle?: string
  layout: 'horizontal' | 'grid' | 'stacked'
  columns: 2 | 3 | 4 | 5
  alignment: 'left' | 'center' | 'right'
  badges: Array<{
    id: string
    icon: string
    title: string
    description: string
    iconColor: string
  }>
  backgroundColor: string
  textColor: string
  spacing: 'compact' | 'normal' | 'spacious'
  showBorder: boolean
  borderRadius: 'none' | 'sm' | 'md' | 'lg'
}

const getIconEmoji = (icon: string) => {
  const icons: Record<string, string> = {
    truck: '🚚',
    lock: '🔒',
    return: '↩️',
    star: '⭐',
    card: '💳',
    package: '📦',
    check: '✓',
    chat: '💬',
    globe: '🌍',
    lightning: '⚡',
    shield: '🛡️',
    refresh: '🔄',
    support: '🎧',
  }
  return icons[icon] || '✓'
}

const TrustBadgesRender: React.FC<TrustBadgesProps> = ({
  title,
  subtitle,
  layout,
  columns,
  alignment,
  badges,
  backgroundColor,
  textColor,
  spacing,
  showBorder,
  borderRadius,
}) => {
  const spacingClasses = {
    compact: 'py-4 px-4',
    normal: 'py-8 px-6',
    spacious: 'py-12 px-8',
  }

  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div
      style={{ backgroundColor }}
      className={`w-full ${spacingClasses[spacing] || 'py-8 px-6'} ${showBorder ? 'border-t border-b border-gray-200' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className={`mb-8 ${alignmentClasses[alignment] || 'text-center'}`}>
            {title && (
              <h2 className="text-2xl font-bold mb-2" style={{ color: textColor }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base opacity-75" style={{ color: textColor }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Badges Grid */}
        <div
          className={`grid gap-6 ${
            layout === 'horizontal'
              ? `grid-cols-1 md:grid-cols-${columns}`
              : layout === 'grid'
              ? `grid-cols-2 md:grid-cols-${columns}`
              : 'grid-cols-1 max-w-md mx-auto'
          }`}
        >
          {(badges || []).map((badge) => (
            <div
              key={badge.id}
              className={`flex ${
                layout === 'stacked' ? 'flex-row items-center' : 'flex-col items-center'
              } ${alignmentClasses[alignment] || 'text-center'} ${borderRadiusClasses[borderRadius] || 'rounded-none'} p-4 transition-transform hover:scale-105`}
            >
              <div
                className={`text-4xl ${layout === 'stacked' ? 'mr-4' : 'mb-3'}`}
                style={{ color: badge.iconColor }}
              >
                {getIconEmoji(badge.icon)}
              </div>
              <div className={layout === 'stacked' ? 'flex-1' : ''}>
                <h3 className="font-semibold text-base mb-1" style={{ color: textColor }}>
                  {badge.title}
                </h3>
                <p className="text-sm opacity-75" style={{ color: textColor }}>
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const TrustBadges: ComponentConfig<TrustBadgesProps> = {
  label: 'Trust Badges',

  fields: {
    title: { type: 'text', label: 'Title' },
    subtitle: { type: 'text', label: 'Subtitle' },
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Grid', value: 'grid' },
        { label: 'Stacked', value: 'stacked' },
      ],
    },
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
      ],
    },
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    badges: {
      type: 'array',
      label: 'Badges',
      arrayFields: {
        icon: { type: 'text', label: 'Icon' },
        title: { type: 'text', label: 'Title' },
        description: { type: 'text', label: 'Description' },
        iconColor: { type: 'text', label: 'Icon Color' },
      },
    } as any,
    backgroundColor: { type: 'text', label: 'Background Color' },
    textColor: { type: 'text', label: 'Text Color' },
    spacing: {
      type: 'select',
      label: 'Spacing',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Spacious', value: 'spacious' },
      ],
    },
    showBorder: {
      type: 'radio',
      label: 'Show Border',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
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
  },

  defaultProps: {
    title: 'Why Shop With Us',
    subtitle: '',
    layout: 'horizontal',
    columns: 4,
    alignment: 'center',
    badges: [
      { id: '1', icon: 'truck', title: 'Free Shipping', description: 'On orders over $50', iconColor: '#3b82f6' },
      { id: '2', icon: 'shield', title: 'Secure Checkout', description: '100% secure payment', iconColor: '#3b82f6' },
      { id: '3', icon: 'refresh', title: 'Easy Returns', description: '30-day return policy', iconColor: '#3b82f6' },
      { id: '4', icon: 'support', title: '24/7 Support', description: 'Here when you need us', iconColor: '#3b82f6' },
    ],
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    spacing: 'normal',
    showBorder: true,
    borderRadius: 'none',
  },

  render: (props) => <TrustBadgesRender {...props} />,
}

export default TrustBadges
