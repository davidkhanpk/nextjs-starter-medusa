/**
 * ⚡ STANDARD Puck Renderer Component
 * 
 * ⚠️ THIS IS THE ONLY PUCK RENDERER - DO NOT CREATE ALTERNATIVES
 * 
 * This is the standardized wrapper for rendering Puck visual editor content.
 * All pages, templates, and components MUST use this renderer.
 * 
 * Features:
 * - ✅ Context providers (PuckContextProvider, ProductVariantProvider)
 * - ✅ Theme support (prevents destructuring errors)
 * - ✅ Validation (shows friendly error if no content)
 * - ✅ Product context extraction
 * 
 * Usage:
 * ```tsx
 * import PuckRenderer from "@/components/puck/PuckRenderer"
 * 
 * <PuckRenderer 
 *   data={{
 *     ...template.puckData,
 *     context: { product, cart, customer }
 *   }}
 *   theme={template.theme || {}}
 * />
 * ```
 * 
 * @see docs/PUCK_RENDERER_STANDARDIZATION.md
 */

'use client'

import { Render } from '@measured/puck'
import { defaultPuckConfig } from '@/lib/puck/config'
import { PuckContextProvider } from './PuckContextProvider'
import { ProductVariantProvider } from '@lib/hooks/useProduct'

interface PuckRendererProps {
  data: any
  className?: string
  theme?: any
}

export default function PuckRenderer({ data, className = '', theme = {} }: PuckRendererProps) {
  console.log('[PuckRenderer] Rendering with data:', {
    hasContent: !!data?.content,
    contentLength: data?.content?.length,
    hasZones: !!data?.zones,
    zonesKeys: data?.zones ? Object.keys(data.zones) : [],
    hasContext: !!data?.context,
    availableComponents: Object.keys(defaultPuckConfig.components || {}),
  });

  if (!data || !data.content) {
    console.warn('[PuckRenderer] No content available in data');
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No content available</p>
          <p className="text-sm">Please configure this page in the dashboard</p>
        </div>
      </div>
    )
  }

  // Extract product from context if available
  const product = data.context?.product

  console.log('[PuckRenderer] Starting render with config:', {
    componentCount: Object.keys(defaultPuckConfig.components || {}).length
  });

  return (
    <PuckContextProvider data={data} theme={theme}>
      <ProductVariantProvider product={product}>
        <div className={className}>
          <Render config={defaultPuckConfig} data={data} />
        </div>
      </ProductVariantProvider>
    </PuckContextProvider>
  )
}
