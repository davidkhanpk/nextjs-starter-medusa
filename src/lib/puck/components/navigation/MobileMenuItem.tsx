'use client'

/**
 * Mobile Menu Item Component
 * Individual menu item with accordion for subcategories
 */

import Link from '@/components/common/SafeLink'
import { ChevronRight } from 'lucide-react'
import { EnrichedMenuItem } from '@/lib/menu/types'
import { Theme } from '@/lib/theme/api'
import { Accordion } from '@/lib/design-system/primitives/Accordion'

interface MobileMenuItemProps {
  item: EnrichedMenuItem
  theme: Theme
  onLinkClick: () => void
  depth?: number
}

export function MobileMenuItem({ 
  item, 
  theme, 
  onLinkClick,
  depth = 0 
}: MobileMenuItemProps) {
  // Get theme tokens
  const tokens = theme.globalSettings?.colors?.tokens || {}
  const mobileTokens = tokens.mobileMenu || {}
  const spacing = theme.globalSettings?.spacing?.mobileMenu || {}

  const hasMegaMenu = item.megaMenu?.enabled && item.enrichedData?.category
  const hasChildren = item.children && item.children.length > 0
  const resolvedUrl = item.enrichedData?.resolvedUrl || item.url || '#'

  // Get subcategories if mega menu is enabled
  const subcategories = hasMegaMenu 
    ? item.enrichedData?.category?.subcategories || []
    : []

  const visibleChildren = item.children?.filter(child => child.isVisible) || []

  // Item styling
  const itemStyle: React.CSSProperties = {
    padding: spacing.itemPadding || '12px 16px',
    color: mobileTokens.text || '#111827',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${mobileTokens.border || '#e5e7eb'}`,
    marginLeft: `${depth * 16}px`
  }

  const linkStyle: React.CSSProperties = {
    ...itemStyle,
    width: '100%'
  }

  const accordionButtonStyle: React.CSSProperties = {
    ...itemStyle,
    width: '100%',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left' as const
  }

  const subItemStyle: React.CSSProperties = {
    padding: '8px 16px 8px 32px',
    color: mobileTokens.text || '#6b7280',
    fontSize: '13px',
    textDecoration: 'none',
    display: 'block',
    borderBottom: `1px solid ${mobileTokens.border || '#e5e7eb'}`
  }

  // Simple link (no children, no mega menu)
  if (!hasMegaMenu && !hasChildren) {
    return (
      <Link
        href={resolvedUrl}
        target={item.openInNewTab ? '_blank' : undefined}
        rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
        style={linkStyle}
        onClick={onLinkClick}
      >
        {item.label}
      </Link>
    )
  }

  // Item with mega menu (show subcategories)
  if (hasMegaMenu && subcategories.length > 0) {
    return (
      <Accordion
        title={
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {item.label}
            <ChevronRight className="w-5 h-5" />
          </span>
        }
        className="mobile-menu-accordion"
        buttonClassName="mobile-menu-accordion-button"
        panelClassName="mobile-menu-accordion-panel"
        style={{
          button: accordionButtonStyle,
          panel: {
            backgroundColor: mobileTokens.accordionBackground || '#f9fafb'
          }
        }}
        icon={{
          open: <ChevronRight className="w-5 h-5 rotate-90 transition-transform" />,
          closed: <ChevronRight className="w-5 h-5 transition-transform" />
        }}
      >
        {/* Link to main category */}
        <Link
          href={resolvedUrl}
          style={{
            ...subItemStyle,
            fontWeight: 600,
            color: mobileTokens.text || '#111827'
          }}
          onClick={onLinkClick}
        >
          View All {item.label}
        </Link>

        {/* Subcategories */}
        {subcategories.slice(0, item.megaMenu?.subcategoryLimit || 12).map(subcategory => (
          <Link
            key={subcategory.id}
            href={`/categories/${subcategory.handle}`}
            style={subItemStyle}
            onClick={onLinkClick}
          >
            {subcategory.name}
          </Link>
        ))}
      </Accordion>
    )
  }

  // Item with children (not mega menu)
  if (hasChildren && visibleChildren.length > 0) {
    return (
      <Accordion
        title={
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {item.label}
            <ChevronRight className="w-5 h-5" />
          </span>
        }
        className="mobile-menu-accordion"
        buttonClassName="mobile-menu-accordion-button"
        panelClassName="mobile-menu-accordion-panel"
        style={{
          button: accordionButtonStyle,
          panel: {
            backgroundColor: mobileTokens.accordionBackground || '#f9fafb'
          }
        }}
        icon={{
          open: <ChevronRight className="w-5 h-5 rotate-90 transition-transform" />,
          closed: <ChevronRight className="w-5 h-5 transition-transform" />
        }}
      >
        {visibleChildren.map(child => (
          <MobileMenuItem
            key={child.id}
            item={child}
            theme={theme}
            onLinkClick={onLinkClick}
            depth={depth + 1}
          />
        ))}
      </Accordion>
    )
  }

  // Fallback
  return (
    <Link
      href={resolvedUrl}
      target={item.openInNewTab ? '_blank' : undefined}
      rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
      style={linkStyle}
      onClick={onLinkClick}
    >
      {item.label}
    </Link>
  )
}
