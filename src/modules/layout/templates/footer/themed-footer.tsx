'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import NewsletterForm from "@modules/layout/components/newsletter-form"
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
  const layout = footerConfig.layout || 'detailed'

  // Minimal Layout: Copyright only
  if (layout === 'minimal') {
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
          <div className="flex w-full py-8 justify-between items-center opacity-60">
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

  // Simple Layout: Logo + Quick Links + Copyright
  if (layout === 'simple') {
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
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between py-12">
            {/* Store Name/Logo */}
            <div className="flex-1">
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

            {/* Quick Links */}
            <div className="flex gap-8">
              {/* Categories */}
              {productCategories && productCategories?.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <span 
                    className="txt-small-plus font-medium"
                    style={{
                      color: footerConfig.textColor || theme.colors.textPrimary,
                    }}
                  >
                    Shop
                  </span>
                  <ul className="grid grid-cols-1 gap-2 txt-small opacity-80">
                    {productCategories?.slice(0, 4).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:opacity-100 transition-opacity"
                          href={`/categories/${c.handle}`}
                          style={{
                            color: footerConfig.textColor || theme.colors.textSecondary,
                          }}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social Links */}
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

          {/* Copyright */}
          <div className="flex w-full pb-8 justify-between items-center opacity-60 border-t pt-8">
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

  // Detailed Layout: Full footer with all sections (default)
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

        {/* Newsletter Section */}
        {footerConfig.showNewsletter && (
          <div className="border-t py-12" style={{ borderColor: theme.colors.border }}>
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <Text 
                className="txt-large font-semibold"
                style={{ color: footerConfig.textColor || theme.colors.textPrimary }}
              >
                Subscribe to our newsletter
              </Text>
              <Text 
                className="txt-small"
                style={{ color: footerConfig.textColor || theme.colors.textSecondary }}
              >
                Get the latest updates on new products and upcoming sales
              </Text>
              <div className="flex justify-center pt-4">
                <NewsletterForm />
              </div>
            </div>
          </div>
        )}

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
