'use client'

import { useEffect, useState } from 'react'
import { HomepageSection } from '../types'
import { HeroSection } from './sections/hero-section'
import { RowSection } from './sections/row-section'
import { GridSection } from './sections/grid-section'
import { CategoryProductsSection } from './sections/category-products-section'
import { CategoriesGridSection } from './sections/categories-grid-section'
import { BannerSection } from './sections/banner-section'
import { NewsletterSection } from './sections/newsletter-section'
import { CustomHtmlSection } from './sections/custom-html-section'
import { CollectionsSection } from './sections/collections-section'
import { TestimonialsSection } from './sections/testimonials-section'

interface DynamicHomepageProps {
  storeId: string
}

export function DynamicHomepage({ storeId }: DynamicHomepageProps) {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHomepageLayout()
  }, [storeId])

  const fetchHomepageLayout = async () => {
    try {
      setLoading(true)
      // Fetch from public API endpoint (no authentication required)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/stores/id/${storeId}/homepage-layout`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch homepage layout')
      }

      const data = await response.json()
      
      // Filter enabled sections and sort by order
      const enabledSections = (data.sections || [])
        .filter((s: HomepageSection) => s.enabled)
        .sort((a: HomepageSection, b: HomepageSection) => a.order - b.order)
      
      setSections(enabledSections)
    } catch (err) {
      console.error('Error fetching homepage layout:', err)
      setError('Failed to load homepage')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (sections.length === 0) {
    // Return default homepage if no sections configured
    return <DefaultHomepage />
  }

  return (
    <div className="dynamic-homepage">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  )
}

interface SectionRendererProps {
  section: HomepageSection
}

function SectionRenderer({ section }: SectionRendererProps) {
  // Get container class based on layout structure
  const getContainerClass = () => {
    switch (section.layoutStructure) {
      case 'full-width':
        return 'w-full'
      case 'narrow':
        return 'container max-w-4xl mx-auto px-4'
      case 'container':
      default:
        return 'container max-w-7xl mx-auto px-4'
    }
  }

  const containerClass = getContainerClass()

  // Render appropriate section component
  switch (section.type) {
    case 'hero':
      return (
        <div className={containerClass}>
          <HeroSection section={section} />
        </div>
      )

    case 'row':
      return (
        <div className={containerClass}>
          <RowSection section={section} />
        </div>
      )

    case 'grid':
      return (
        <div className={containerClass}>
          <GridSection section={section} />
        </div>
      )

    case 'category-products':
      return (
        <div className={containerClass}>
          <CategoryProductsSection section={section} />
        </div>
      )

    case 'categories-grid':
      return (
        <div className={containerClass}>
          <CategoriesGridSection section={section} />
        </div>
      )

    case 'banner':
      return (
        <div className={containerClass}>
          <BannerSection section={section} />
        </div>
      )

    case 'newsletter':
      return (
        <div className={containerClass}>
          <NewsletterSection section={section} />
        </div>
      )

    case 'custom-html':
      return (
        <div className={containerClass}>
          <CustomHtmlSection section={section} />
        </div>
      )

    case 'collections':
      return (
        <div className={containerClass}>
          <CollectionsSection section={section} />
        </div>
      )

    case 'testimonials':
      return (
        <div className={containerClass}>
          <TestimonialsSection section={section} />
        </div>
      )

    default:
      return null
  }
}

// Default homepage fallback when no layout configured
function DefaultHomepage() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your store homepage is being configured. Check back soon!
          </p>
        </div>
      </div>
    </div>
  )
}
