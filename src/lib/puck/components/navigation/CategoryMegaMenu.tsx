'use client'

/**
 * Category Mega Menu Component
 * Displays category with subcategories in a grid layout
 */

import { EnrichedMenuItem } from '@/lib/menu/types'
import { Theme } from '@/lib/theme/api'
import Link from '@/components/common/SafeLink'

interface CategoryMegaMenuProps {
  item: EnrichedMenuItem
  theme: Theme
  onLinkClick?: () => void
}

export function CategoryMegaMenu({ item, theme, onLinkClick }: CategoryMegaMenuProps) {
  const megaMenu = item.megaMenu
  const categoryData = item.enrichedData?.category

  if (!megaMenu?.enabled || !categoryData) {
    return null
  }

  // Helper function to get display label with fallback to category/collection name
  const getDisplayLabel = (menuItem: EnrichedMenuItem): string => {
    if (menuItem.label && menuItem.label.trim() !== '') {
      return menuItem.label;
    }
    if (menuItem.type === 'category' && menuItem.enrichedData?.category?.name) {
      return menuItem.enrichedData.category.name;
    }
    if (menuItem.type === 'collection' && menuItem.enrichedData?.collection?.title) {
      return menuItem.enrichedData.collection.title;
    }
    return menuItem.label || 'Untitled';
  };

  // Get theme tokens with fallbacks
  const tokens = theme.globalSettings?.colors?.tokens || {}
  const megaMenuTokens = tokens.megaMenu || {}
  const typography = theme.globalSettings?.typography || {}
  const spacing = theme.globalSettings?.spacing?.megaMenu || {}
  const effects = theme.globalSettings?.effects || {}

  // Styling from theme
  const containerStyle: React.CSSProperties = {
    backgroundColor: megaMenuTokens.background || '#ffffff',
    borderRadius: effects.borderRadius?.megaMenu || '8px',
    boxShadow: effects.shadow?.megaMenu || '0 10px 40px rgba(0, 0, 0, 0.15)',
    padding: spacing.padding || '24px',
    minWidth: '600px',
    maxWidth: '900px'
  }

  const headingStyle: React.CSSProperties = {
    color: megaMenuTokens.sectionHeading || '#111827',
    fontSize: typography.fontSize?.megaMenuHeading || '14px',
    fontWeight: typography.fontWeight?.megaMenuHeading || 600,
    marginBottom: '12px'
  }

  const linkStyle: React.CSSProperties = {
    color: megaMenuTokens.linkText || '#6b7280',
    fontSize: typography.fontSize?.megaMenuLink || '13px',
    fontWeight: typography.fontWeight?.megaMenuLink || 400,
    textDecoration: 'none',
    display: 'block',
    padding: '6px 0',
    transition: 'color 150ms ease'
  }

  const linkHoverColor = megaMenuTokens.linkHover || '#3b82f6'

  // Calculate columns
  const columns = megaMenu.columns || 3
  const subcategoryLimit = megaMenu.subcategoryLimit || 12
  const showDescriptions = megaMenu.showDescriptions !== false
  const showSubcategories = megaMenu.showSubcategories !== false

  // Get subcategories to display
  const subcategories = categoryData.subcategories.slice(0, subcategoryLimit)

  return (
    <div style={containerStyle} className="mega-menu">
      {/* Banner Image */}
      {megaMenu.showImage && megaMenu.imageUrl && (
        <div style={{ marginBottom: '20px' }}>
          <img 
            src={megaMenu.imageUrl} 
            alt={item.label}
            style={{ 
              width: '100%', 
              height: 'auto',
              borderRadius: effects.borderRadius?.megaMenu || '8px'
            }}
          />
        </div>
      )}

      {/* Main Category Link */}
      <div style={{ marginBottom: '16px' }}>
        <Link 
          href={categoryData.handle ? `/categories/${categoryData.handle}` : '#'}
          style={{
            ...headingStyle,
            fontSize: '16px',
            fontWeight: 700
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = linkHoverColor
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = megaMenuTokens.sectionHeading || '#111827'
          }}
          onClick={onLinkClick}
        >
          View All {getDisplayLabel(item)}
        </Link>
      </div>

      {/* Subcategories Grid */}
      {showSubcategories && subcategories.length > 0 && (
        <>
          <h3 style={headingStyle}>Categories</h3>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: spacing.columnGap || '32px'
            }}
          >
            {subcategories.map((subcategory) => (
              <div key={subcategory.id}>
                <Link
                  href={`/categories/${subcategory.handle}`}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = linkHoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = megaMenuTokens.linkText || '#6b7280'
                  }}
                  onClick={onLinkClick}
                >
                  {subcategory.name}
                </Link>
                {showDescriptions && subcategory.description && (
                  <p style={{
                    fontSize: '11px',
                    color: '#9ca3af',
                    marginTop: '2px',
                    lineHeight: '1.4'
                  }}>
                    {subcategory.description.substring(0, 60)}
                    {subcategory.description.length > 60 ? '...' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
