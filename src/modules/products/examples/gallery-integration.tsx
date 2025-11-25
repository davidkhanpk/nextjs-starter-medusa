/**
 * Example: How to integrate Product Gallery with Template Configuration
 * 
 * This file shows how to fetch template configuration from the backend
 * and render the dynamic product gallery on the storefront.
 */

import { ProductGallery } from '@/modules/products/components/image-gallery/dynamic-gallery'
import { mapGalleryConfig, getDefaultGalleryConfig } from '@/lib/config/product-gallery-config'
import { HttpTypes } from '@medusajs/types'

// Example 1: Fetch template configuration from Shopikool API
async function fetchProductTemplateConfig(storeId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SHOPIKOOL_API}/public/stores/${storeId}/templates/product`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch template config:', error)
    return null
  }
}

// Example 2: Extract gallery section from template zones
function getGallerySectionFromTemplate(templateConfig: any) {
  // Look for gallery section in HERO or ABOVE_PRODUCT zones
  const zones = templateConfig?.zones || {}
  
  for (const zone of Object.values(zones)) {
    const sections = (zone as any)?.sections || []
    const gallerySection = sections.find((s: any) => s.type === 'product-gallery' && s.enabled)
    
    if (gallerySection) {
      return gallerySection
    }
  }
  
  return null
}

// Example 3: Product Page Component
export async function ProductPage({ 
  product,
  storeId 
}: { 
  product: HttpTypes.StoreProduct
  storeId: string 
}) {
  // Fetch template configuration
  const templateConfig = await fetchProductTemplateConfig(storeId)
  
  // Get gallery section from template
  const gallerySection = getGallerySectionFromTemplate(templateConfig)
  
  // Map to storefront config (or use defaults)
  const galleryConfig = gallerySection 
    ? mapGalleryConfig(gallerySection)
    : getDefaultGalleryConfig()

  return (
    <div className="product-page">
      {/* Dynamic Product Gallery */}
      <ProductGallery 
        images={product.images || []} 
        config={galleryConfig}
      />
      
      {/* Other product sections will be rendered based on template config */}
      {/* ... */}
    </div>
  )
}

// Example 4: Static rendering with cached config
export async function StaticProductPage({ product }: { product: HttpTypes.StoreProduct }) {
  // For static sites, you might want to cache the config at build time
  const galleryConfig = {
    style: 'slider' as const,
    thumbnailPosition: 'bottom' as const,
    thumbnailSize: 'md' as const,
    zoom: true,
    zoomType: 'hover' as const,
    zoomLevel: 2,
    autoplay: false,
    autoplayDelay: 3000,
    transition: 'slide' as const,
    loop: true,
    navigation: true,
    pagination: true,
    aspectRatio: '4:3' as const,
    objectFit: 'cover' as const,
    fullscreen: true,
    lazyLoad: true,
  }

  return (
    <ProductGallery 
      images={product.images || []} 
      config={galleryConfig}
    />
  )
}

// Example 5: Client-side configuration (for live preview)
'use client'

import { useState, useEffect } from 'react'

export function DynamicProductGallery({ 
  product,
  storeId 
}: { 
  product: HttpTypes.StoreProduct
  storeId: string 
}) {
  const [config, setConfig] = useState(getDefaultGalleryConfig())

  useEffect(() => {
    // Fetch configuration on client side
    fetch(`/api/stores/${storeId}/templates/product`)
      .then(res => res.json())
      .then(data => {
        const gallerySection = getGallerySectionFromTemplate(data)
        if (gallerySection) {
          setConfig(mapGalleryConfig(gallerySection))
        }
      })
      .catch(console.error)
  }, [storeId])

  return (
    <ProductGallery 
      images={product.images || []} 
      config={config}
    />
  )
}

// Example 6: Testing different gallery styles
export function GalleryStylePreview({ product }: { product: HttpTypes.StoreProduct }) {
  const styles = ['slider', 'grid', 'stacked', 'filmstrip', 'thumbnail-left', 'thumbnail-bottom'] as const

  return (
    <div className="space-y-12">
      {styles.map(style => (
        <div key={style}>
          <h3 className="text-xl font-bold mb-4 capitalize">{style} Style</h3>
          <ProductGallery 
            images={product.images || []} 
            config={{
              ...getDefaultGalleryConfig(),
              style,
            }}
          />
        </div>
      ))}
    </div>
  )
}
