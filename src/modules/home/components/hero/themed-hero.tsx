'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import { Button, Heading } from "@medusajs/ui"
import { ArrowRight } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ThemedHero = () => {
  const { theme, loading } = useTheme()

  // Show default styling while loading
  if (loading) {
    return (
      <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
          <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base font-normal">
            Loading...
          </Heading>
        </div>
      </div>
    )
  }

  const heroConfig = theme.homepage?.hero

  // If hero is disabled in theme, don't show it
  if (heroConfig?.enabled === false) {
    return null
  }

  const heroStyle = heroConfig?.style || 'centered'
  const title = heroConfig?.title || theme.branding.storeName || 'Welcome to Our Store'
  const subtitle = heroConfig?.subtitle || 'Discover amazing products'
  const ctaText = heroConfig?.ctaText || 'Shop Now'
  const ctaLink = heroConfig?.ctaLink || '/store'
  const backgroundImage = heroConfig?.backgroundImage
  const overlayOpacity = heroConfig?.overlayOpacity || 0.5

  // Centered Hero Style
  if (heroStyle === 'centered') {
    return (
      <div 
        className="h-[75vh] w-full border-b relative overflow-hidden"
        style={{
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.border,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        {backgroundImage && (
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: theme.colors.primary,
              opacity: overlayOpacity,
            }}
          />
        )}

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
          <span className="flex flex-col gap-2">
            <Heading
              level="h1"
              className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold"
              style={{
                color: backgroundImage ? '#ffffff' : theme.colors.primaryText,
              }}
            >
              {title}
            </Heading>
            <Heading
              level="h2"
              className="text-xl md:text-2xl leading-relaxed font-normal"
              style={{
                color: backgroundImage ? 'rgba(255, 255, 255, 0.9)' : theme.colors.primaryText,
              }}
            >
              {subtitle}
            </Heading>
          </span>

          <LocalizedClientLink href={ctaLink}>
            <Button 
              variant="secondary"
              style={{
                backgroundColor: theme.colors.secondary,
                color: theme.colors.secondaryText,
                borderRadius: theme.layout.borderRadius.md,
                paddingLeft: theme.layout.spacing.md,
                paddingRight: theme.layout.spacing.md,
                paddingTop: theme.layout.spacing.sm,
                paddingBottom: theme.layout.spacing.sm,
              }}
            >
              {ctaText}
              <ArrowRight />
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  // Split Hero Style (Image on left, text on right)
  if (heroStyle === 'split') {
    return (
      <div 
        className="min-h-[75vh] w-full border-b grid grid-cols-1 md:grid-cols-2"
        style={{
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        }}
      >
        {/* Left: Image */}
        <div 
          className="relative h-[50vh] md:h-auto"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Right: Content */}
        <div 
          className="flex flex-col justify-center items-start p-8 md:p-16 gap-6"
          style={{
            backgroundColor: theme.colors.surface,
          }}
        >
          <span className="flex flex-col gap-4">
            <Heading
              level="h1"
              className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold"
              style={{
                color: theme.colors.textPrimary,
              }}
            >
              {title}
            </Heading>
            <Heading
              level="h2"
              className="text-lg md:text-xl leading-relaxed font-normal"
              style={{
                color: theme.colors.textSecondary,
              }}
            >
              {subtitle}
            </Heading>
          </span>

          <LocalizedClientLink href={ctaLink}>
            <Button 
              variant="primary"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.primaryText,
                borderRadius: theme.layout.borderRadius.md,
                paddingLeft: theme.layout.spacing.md,
                paddingRight: theme.layout.spacing.md,
                paddingTop: theme.layout.spacing.sm,
                paddingBottom: theme.layout.spacing.sm,
              }}
            >
              {ctaText}
              <ArrowRight />
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  // Default: Centered
  return (
    <div 
      className="h-[75vh] w-full border-b relative"
      style={{
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.border,
      }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span className="flex flex-col gap-2">
          <Heading
            level="h1"
            className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold"
            style={{
              color: theme.colors.primaryText,
            }}
          >
            {title}
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl leading-relaxed font-normal"
            style={{
              color: theme.colors.primaryText,
              opacity: 0.9,
            }}
          >
            {subtitle}
          </Heading>
        </span>

        <LocalizedClientLink href={ctaLink}>
          <Button 
            variant="secondary"
            style={{
              backgroundColor: theme.colors.secondary,
              color: theme.colors.secondaryText,
              borderRadius: theme.layout.borderRadius.md,
              paddingLeft: theme.layout.spacing.md,
              paddingRight: theme.layout.spacing.md,
              paddingTop: theme.layout.spacing.sm,
              paddingBottom: theme.layout.spacing.sm,
            }}
          >
            {ctaText}
            <ArrowRight />
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default ThemedHero
