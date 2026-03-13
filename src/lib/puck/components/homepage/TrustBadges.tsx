'use client'

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
  }
  return icons[icon] || '✓'
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
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
      className={`w-full ${spacingClasses[spacing]} ${showBorder ? 'border-t border-b border-gray-200' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className={`mb-8 ${alignmentClasses[alignment]}`}>
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
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex ${
                layout === 'stacked' ? 'flex-row items-center' : 'flex-col items-center'
              } ${alignmentClasses[alignment]} ${borderRadiusClasses[borderRadius]} p-4 transition-transform hover:scale-105`}
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

export default TrustBadges
