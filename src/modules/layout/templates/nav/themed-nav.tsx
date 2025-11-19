'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchBar from "@modules/layout/components/search-bar"
import CategoryNav from "@modules/layout/components/category-nav"
import { StoreRegion } from "@medusajs/types"
import { ReactNode } from "react"

interface ThemedNavProps {
  children: ReactNode
  regions: StoreRegion[]
}

export default function ThemedNav({ children, regions }: ThemedNavProps) {
  const { theme, loading } = useTheme()

  // While theme is loading, show default styling
  if (loading) {
    return (
      <div className="sticky top-0 inset-x-0 z-50 group">
        <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                Loading...
              </LocalizedClientLink>
            </div>
            {children}
          </nav>
        </header>
      </div>
    )
  }

  const navConfig = theme.components.navbar
  const sticky = navConfig.sticky !== false // Default to true if not specified

  return (
    <div 
      className={`${sticky ? 'sticky top-0' : ''} inset-x-0 z-50 group`}
      style={{
        // Apply theme height to wrapper
        height: navConfig.height || '64px'
      }}
    >
      <header 
        className="relative mx-auto border-b duration-200"
        style={{
          backgroundColor: navConfig.backgroundColor || '#ffffff',
          height: navConfig.height || '64px',
          borderColor: theme.colors.border || '#e5e7eb',
        }}
      >
        <nav 
          className="content-container txt-xsmall-plus flex items-center justify-between w-full h-full text-small-regular"
          style={{
            color: navConfig.textColor || theme.colors.textPrimary || '#111827',
          }}
        >
          {/* Left section - passed as children prop (SideMenu) */}
          <div className="flex-1 basis-0 h-full flex items-center">
            {children && Array.isArray(children) ? children[0] : null}
          </div>

          {/* Center section - Logo/Store Name */}
          <div className="flex items-center h-full gap-x-6">
            {/* Logo */}
            {theme.branding.logo ? (
              <LocalizedClientLink href="/" data-testid="nav-store-link">
                <img 
                  src={theme.branding.logo} 
                  alt={theme.branding.storeName || 'Store Logo'} 
                  className="h-8 w-auto object-contain"
                />
              </LocalizedClientLink>
            ) : (
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:opacity-80 uppercase transition-opacity"
                data-testid="nav-store-link"
                style={{
                  color: navConfig.textColor || theme.colors.textPrimary,
                }}
              >
                {theme.branding.storeName || 'Medusa Store'}
              </LocalizedClientLink>
            )}

            {/* Category Menu */}
            {navConfig.showCategoryMenu && (
              <div className="hidden medium:flex items-center">
                <CategoryNav />
              </div>
            )}
          </div>

          {/* Right section - Account & Cart (passed as children) */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* Search Bar */}
            {navConfig.showSearchBar && (
              <div className="hidden medium:block min-w-[300px]">
                <SearchBar />
              </div>
            )}
            
            {/* Account & Cart Links */}
            {children && Array.isArray(children) ? children[1] : children}
          </div>
        </nav>
      </header>
    </div>
  )
}
