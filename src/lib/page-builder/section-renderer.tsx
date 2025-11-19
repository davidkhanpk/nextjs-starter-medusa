import React from 'react'
import { HttpTypes } from '@medusajs/types'
import { PageSection } from '@lib/page-builder/types'
import {
  getCategoryProducts,
  getCategories,
  getCollections,
} from '@lib/page-builder/data-fetchers'
import ModernHeroWrapper from '@modules/home/components/hero/modern-hero-wrapper'
import { CategoryProductsSection } from '@modules/home/components/sections/new-arrivals-section'
import { CategoriesSection } from '@modules/home/components/sections/categories-section'

interface DynamicSectionRendererProps {
  section: PageSection
  region: HttpTypes.StoreRegion
  collections: HttpTypes.StoreCollection[]
}

export async function DynamicSectionRenderer({
  section,
  region,
  collections,
}: DynamicSectionRendererProps) {
  // Don't render disabled sections
  if (!section.enabled) {
    return null
  }

  switch (section.type) {
    case 'hero':
      return <ModernHeroWrapper />

    case 'category-products': {
      // Fetch products from the assigned category
      if (!section.categoryId) {
        console.warn('Category products section missing categoryId:', section.id)
        return null
      }
      
      const products = await getCategoryProducts(
        region,
        section.categoryId,
        section.limit
      )
      
      return (
        <CategoryProductsSection
          section={section}
          products={products}
          region={region}
        />
      )
    }

    case 'categories-grid': {
      const categories = await getCategories(section.categoryIds)
      return (
        <CategoriesSection
          section={section}
          categories={categories}
        />
      )
    }

    case 'collections': {
      // TODO: Implement collections section
      return null
    }

    case 'banner': {
      // TODO: Implement banner section
      return null
    }

    case 'testimonials': {
      // TODO: Implement testimonials section
      return null
    }

    case 'newsletter': {
      // TODO: Implement newsletter section
      return null
    }

    case 'custom-html': {
      // TODO: Implement custom HTML section
      return null
    }

    default:
      return null
  }
}
