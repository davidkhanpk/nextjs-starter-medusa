'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import ModernHero from "./modern-hero"

export default function ModernHeroWrapper() {
  const { theme, loading } = useTheme()

  if (loading) {
    return (
      <div className="h-[75vh] w-full bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  const heroConfig = theme?.homepage?.hero

  // If hero is disabled, don't show it
  if (heroConfig?.enabled === false) {
    return null
  }

  // Determine variant based on theme configuration
  const variant = heroConfig?.layout === 'split' ? 'minimal' : 'gradient'
  const title = theme?.branding?.storeName || 'Welcome to Our Store'
  const subtitle = 'Discover amazing products'
  const ctaText = heroConfig?.ctaButton?.text || 'Shop Now'
  const ctaLink = heroConfig?.ctaButton?.url || '/store'
  const backgroundImage = heroConfig?.backgroundImage

  return (
    <ModernHero
      variant={backgroundImage ? 'image' : variant}
      title={title}
      subtitle={subtitle}
      ctaText={ctaText}
      ctaLink={ctaLink}
      backgroundImage={backgroundImage}
      height="md"
      showScrollIndicator={true}
    />
  )
}

