'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { StoreCollection, StoreProductCategory } from "@medusajs/types"

interface ThemedFooterProps {
  collections: StoreCollection[]
  productCategories: StoreProductCategory[]
}

export default function ThemedFooter({ collections, productCategories }: ThemedFooterProps) {
  const { theme, loading } = useTheme()

  // While theme is loading, show default styling
  if (loading) {
    return (
      <footer className="border-t border-ui-border-base w-full">
        <div className="content-container flex flex-col w-full">
          <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
            <div>Loading...</div>
          </div>
        </div>
      </footer>
    )
  }

  const footerConfig = theme.components.footer

  return (
    <footer 
      className="w-full border-t"
      style={{
        backgroundColor: footerConfig.backgroundColor || theme.colors.surface || '#ffffff',
        color: footerConfig.textColor || theme.colors.textPrimary || '#111827',
        borderTopColor: theme.colors.border || '#e5e7eb',
      }}
    >
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          {/* Store Name/Logo Section */}
          <div>
            {theme.branding.logo ? (
              <LocalizedClientLink href="/">
                <img 
                  src={theme.branding.logo} 
                  alt={theme.branding.storeName || 'Store Logo'} 
                  className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </LocalizedClientLink>
            ) : (
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:opacity-80 uppercase transition-opacity"
                style={{
                  color: footerConfig.textColor || theme.colors.textPrimary,
                }}
              >
                {theme.branding.storeName || 'Medusa Store'}
              </LocalizedClientLink>
            )}
          </div>

          {/* Footer Links Grid */}
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {/* Categories Section */}
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span 
                  className="txt-small-plus font-medium"
                  style={{
                    color: footerConfig.textColor || theme.colors.textPrimary,
                  }}
                >
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 txt-small opacity-80"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:opacity-100 transition-opacity",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                          style={{
                            color: footerConfig.textColor || theme.colors.textSecondary,
                          }}
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:opacity-100 transition-opacity"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                    style={{
                                      color: footerConfig.textColor || theme.colors.textSecondary,
                                    }}
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections Section */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span 
                  className="txt-small-plus font-medium"
                  style={{
                    color: footerConfig.textColor || theme.colors.textPrimary,
                  }}
                >
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 txt-small opacity-80",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:opacity-100 transition-opacity"
                        href={`/collections/${c.handle}`}
                        style={{
                          color: footerConfig.textColor || theme.colors.textSecondary,
                        }}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Links Section - Show/Hide based on theme config */}
            {footerConfig.showSocialLinks && (
              <div className="flex flex-col gap-y-2">
                <span 
                  className="txt-small-plus font-medium"
                  style={{
                    color: footerConfig.textColor || theme.colors.textPrimary,
                  }}
                >
                  Connect
                </span>
                <ul className="grid grid-cols-1 gap-y-2 txt-small opacity-80">
                  {/* TODO: Add social media links from theme config */}
                  <li>
                    <a
                      href="https://github.com/medusajs"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:opacity-100 transition-opacity"
                      style={{
                        color: footerConfig.textColor || theme.colors.textSecondary,
                      }}
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://docs.medusajs.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:opacity-100 transition-opacity"
                      style={{
                        color: footerConfig.textColor || theme.colors.textSecondary,
                      }}
                    >
                      Documentation
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex w-full mb-16 justify-between opacity-60">
          <Text 
            className="txt-compact-small"
            style={{
              color: footerConfig.textColor || theme.colors.textMuted,
            }}
          >
            © {new Date().getFullYear()} {theme.branding.storeName || 'Medusa Store'}. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
