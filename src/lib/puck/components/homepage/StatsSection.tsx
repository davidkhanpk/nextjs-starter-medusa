'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface StatsSectionProps {
  title?: string
  subtitle?: string
  columns: 2 | 3 | 4
  alignment: 'left' | 'center' | 'right'
  stats: Array<{
    id: string
    number: string
    label: string
    description?: string
    icon: string
    iconColor: string
  }>
  countUpAnimation: boolean
  animationDuration: number
  backgroundColor: string
  textColor: string
  numberColor: string
  spacing: 'compact' | 'normal' | 'spacious'
  showDividers: boolean
  borderRadius: 'none' | 'sm' | 'md' | 'lg'
}

const getIconEmoji = (icon: string) => {
  const icons: Record<string, string> = {
    people: '👥',
    star: '⭐',
    trophy: '🏆',
    briefcase: '💼',
    globe: '🌍',
    package: '📦',
    target: '🎯',
    diamond: '💎',
    rocket: '🚀',
    check: '✓',
  }
  return icons[icon] || '📊'
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  title,
  subtitle,
  columns,
  alignment,
  stats,
  countUpAnimation,
  animationDuration,
  backgroundColor,
  textColor,
  numberColor,
  spacing,
  showDividers,
  borderRadius,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!countUpAnimation) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [countUpAnimation, hasAnimated])

  const spacingClasses = {
    compact: 'py-6 px-4',
    normal: 'py-12 px-6',
    spacious: 'py-20 px-8',
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
      ref={sectionRef}
      style={{ backgroundColor }}
      className={`w-full ${spacingClasses[spacing]} ${borderRadiusClasses[borderRadius]}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className={`mb-12 ${alignmentClasses[alignment]}`}>
            {title && (
              <h2 className="text-3xl font-bold mb-2" style={{ color: textColor }}>
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

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8 relative`}>
          {stats.map((stat, index) => (
            <div key={stat.id} className="relative">
              <div className={`${alignmentClasses[alignment]} p-6`}>
                {/* Icon */}
                <div className="text-4xl mb-4" style={{ color: stat.iconColor }}>
                  {getIconEmoji(stat.icon)}
                </div>

                {/* Number */}
                <div
                  className={`text-4xl md:text-5xl font-bold mb-2 ${
                    countUpAnimation && hasAnimated ? 'animate-fade-in' : ''
                  }`}
                  style={{ color: numberColor }}
                >
                  {stat.number}
                </div>

                {/* Label */}
                <div className="text-lg font-semibold mb-1" style={{ color: textColor }}>
                  {stat.label}
                </div>

                {/* Description */}
                {stat.description && (
                  <div className="text-sm opacity-75" style={{ color: textColor }}>
                    {stat.description}
                  </div>
                )}
              </div>

              {/* Divider */}
              {showDividers && index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/4 h-1/2 w-px bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsSection
