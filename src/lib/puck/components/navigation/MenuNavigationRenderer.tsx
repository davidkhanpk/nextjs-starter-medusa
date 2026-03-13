'use client'

/**
 * Enhanced Menu Navigation Renderer
 * Client component that renders enriched menu with Headless UI dropdowns
 */

import React, { useState } from 'react'
import Link from '@/components/common/SafeLink'
import { Popover } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import { EnrichedMenuItem } from '@/lib/menu/types'
import { Theme } from '@/lib/theme/api'
import { CategoryMegaMenu } from './CategoryMegaMenu'

interface MenuNavigationRendererProps {
  items: EnrichedMenuItem[]
  theme: Theme
  layout?: 'horizontal' | 'vertical'
  alignment?: 'left' | 'center' | 'right'
}

export function MenuNavigationRenderer({
  items,
  theme,
  layout = 'horizontal',
  alignment = 'center'
}: MenuNavigationRendererProps) {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)

  // Get theme tokens with fallbacks
  const tokens = theme.globalSettings?.colors?.tokens || {}
  const navTokens = tokens.navigation || {}
  const typography = theme.globalSettings?.typography || {}
  const spacing = theme.globalSettings?.spacing?.navigation || {}
  const effects = theme.globalSettings?.effects || {}

  // Navigation styling
  const navStyle: React.CSSProperties = {
    backgroundColor: navTokens.background || '#ffffff',
    borderBottom: `1px solid ${navTokens.border || '#e5e7eb'}`,
  }

  const linkStyle: React.CSSProperties = {
    color: navTokens.text || '#111827',
    fontSize: typography.fontSize?.navigation || '14px',
    fontWeight: typography.fontWeight?.navigation || 500,
    fontFamily: typography.fontFamily?.navigation || 'Inter',
    padding: spacing.padding || '12px 16px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: `color ${effects.transition?.duration || '200ms'} ${effects.transition?.easing || 'ease-in-out'}`,
    cursor: 'pointer'
  }

  const linkHoverColor = navTokens.textHover || '#3b82f6'

  // Filter visible top-level items
  const visibleItems = items.filter(item => item.isVisible && !item.parentId)

  const renderMenuItem = (item: EnrichedMenuItem) => {
    const hasMegaMenu = item.megaMenu?.enabled && item.enrichedData?.category
    const hasChildren = item.children && item.children.length > 0
    const resolvedUrl = item.enrichedData?.resolvedUrl || item.url || '#'

    // Simple link (no dropdown)
    if (!hasMegaMenu && !hasChildren) {
      return (
        <Link
          key={item.id}
          href={resolvedUrl}
          target={item.openInNewTab ? '_blank' : undefined}
          rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = linkHoverColor
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = navTokens.text || '#111827'
          }}
        >
          {item.label}
        </Link>
      )
    }

    // Link with mega menu
    return (
      <Popover key={item.id} className="relative">
        {({ open, close }) => (
          <div
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            <Popover.Button
              as="div"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = linkHoverColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = navTokens.text || '#111827'
              }}
            >
              {item.label}
              <ChevronDown className="w-4 h-4" />
            </Popover.Button>

            {hoveredItemId === item.id && (
              <Popover.Panel
                static
                className="absolute z-50 mt-2"
                style={{
                  left: alignment === 'center' ? '50%' : alignment === 'right' ? 'auto' : '0',
                  right: alignment === 'right' ? '0' : 'auto',
                  transform: alignment === 'center' ? 'translateX(-50%)' : 'none'
                }}
              >
                {hasMegaMenu ? (
                  <CategoryMegaMenu
                    item={item}
                    theme={theme}
                    onLinkClick={() => {
                      setHoveredItemId(null)
                      close()
                    }}
                  />
                ) : (
                  <SimpleDropdown
                    item={item}
                    theme={theme}
                    onLinkClick={() => {
                      setHoveredItemId(null)
                      close()
                    }}
                  />
                )}
              </Popover.Panel>
            )}
          </div>
        )}
      </Popover>
    )
  }

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }

  return (
    <nav style={navStyle}>
      <div
        className={`flex ${layout === 'horizontal' ? 'flex-row' : 'flex-col'} ${alignmentClasses[alignment]}`}
        style={{
          gap: spacing.gap || '24px',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        {visibleItems.map(renderMenuItem)}
      </div>
    </nav>
  )
}

// Simple dropdown for non-mega-menu items
function SimpleDropdown({
  item,
  theme,
  onLinkClick
}: {
  item: EnrichedMenuItem
  theme: Theme
  onLinkClick: () => void
}) {
  const tokens = theme.globalSettings?.colors?.tokens || {}
  const megaMenuTokens = tokens.megaMenu || {}
  const effects = theme.globalSettings?.effects || {}

  const dropdownStyle: React.CSSProperties = {
    backgroundColor: megaMenuTokens.background || '#ffffff',
    borderRadius: effects.borderRadius?.megaMenu || '8px',
    boxShadow: effects.shadow?.megaMenu || '0 10px 40px rgba(0, 0, 0, 0.15)',
    padding: '8px',
    minWidth: '200px'
  }

  const linkStyle: React.CSSProperties = {
    color: megaMenuTokens.linkText || '#6b7280',
    fontSize: '14px',
    padding: '8px 12px',
    display: 'block',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 150ms ease'
  }

  const children = item.children?.filter(child => child.isVisible) || []

  return (
    <div style={dropdownStyle}>
      {children.map(child => (
        <Link
          key={child.id}
          href={child.enrichedData?.resolvedUrl || child.url || '#'}
          target={child.openInNewTab ? '_blank' : undefined}
          rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          onClick={onLinkClick}
        >
          {child.label}
        </Link>
      ))}
    </div>
  )
}
