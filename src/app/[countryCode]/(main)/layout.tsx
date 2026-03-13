import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import { fetchTemplate } from "@lib/template/api"
import { fetchMenu } from "@lib/menu/api"
import { fetchTheme } from "@lib/theme/api"
import { fetchStoreInfo } from "@lib/store/api"
import { enrichMenuWithMedusaData } from "@lib/menu/enrichment"
import PuckRenderer from "@/components/puck/PuckRenderer"
import { ThemeInjector } from "@/components/theme/ThemeInjector"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

// Helper function to inject menu data into MenuNavigation components in Puck templates
function injectMenuDataIntoTemplate(puckData: any, menuItems: any[]) {
  if (!puckData) {
    console.log('[Layout] No puckData to inject menu into')
    return
  }

  let injectedCount = 0

  const traverseAndInject = (components: any[], depth = 0) => {
    const indent = '  '.repeat(depth)
    console.log(`${indent}[Layout] traverseAndInject called with ${components.length} components at depth ${depth}`)
    components.forEach((component, index) => {
      console.log(`${indent}[Layout] Component ${index}: type=${component.type}, hasProps=${!!component.props}`)
      
      // If this is a MenuNavigation component, inject menu data
      if (component.type === 'MenuNavigation') {
        console.log(`${indent}[Layout] ✓ Found MenuNavigation!`)
        console.log(`${indent}[Layout] Current props:`, component.props)
        component.props = component.props || {}
        component.props.menuData = menuItems
        injectedCount++
        console.log(`${indent}[Layout] ✓ Injected menu with ${menuItems.length} items`)
      }

      // Recursively check nested components in props arrays
      if (component.props) {
        Object.keys(component.props).forEach((key) => {
          if (Array.isArray(component.props[key]) && component.props[key].length > 0 && component.props[key][0]?.type) {
            console.log(`${indent}[Layout] Traversing nested components in props.${key}...`)
            traverseAndInject(component.props[key], depth + 1)
          }
        })
      }
    })
  }

  // Traverse content array
  if (puckData.content && Array.isArray(puckData.content)) {
    console.log('[Layout] Traversing content array...')
    traverseAndInject(puckData.content, 0)
  }

  // Traverse zones object
  if (puckData.zones && typeof puckData.zones === 'object') {
    console.log('[Layout] Traversing zones object...')
    Object.keys(puckData.zones).forEach((zoneKey) => {
      const zoneContent = puckData.zones[zoneKey]
      if (Array.isArray(zoneContent)) {
        console.log(`[Layout] Traversing zone: ${zoneKey}`)
        traverseAndInject(zoneContent, 0)
      }
    })
  }

  console.log(`[Layout] Total MenuNavigation components found and injected: ${injectedCount}`)
}

// Helper function to inject store logo + name into Logo components in Puck templates
function injectStoreLogoIntoTemplate(puckData: any, storeInfo: { name: string; logo: string | null }) {
  if (!puckData) return

  const traverseAndInject = (components: any[]) => {
    components.forEach((component) => {
      if (component.type === 'Logo') {
        component.props = component.props || {}
        // If the store has a logo URL, set it
        if (storeInfo.logo) {
          component.props.imageUrl = storeInfo.logo
        }
        // Always set the store name as text fallback
        component.props.text = storeInfo.name
        // If no logo image, ensure text is shown
        if (!storeInfo.logo) {
          component.props.showText = true
        }
      }
      // Recurse nested components
      if (component.props) {
        Object.keys(component.props).forEach((key) => {
          if (Array.isArray(component.props[key]) && component.props[key].length > 0 && component.props[key][0]?.type) {
            traverseAndInject(component.props[key])
          }
        })
      }
    })
  }

  if (puckData.content && Array.isArray(puckData.content)) {
    traverseAndInject(puckData.content)
  }
  if (puckData.zones && typeof puckData.zones === 'object') {
    Object.values(puckData.zones).forEach((zoneContent: any) => {
      if (Array.isArray(zoneContent)) {
        traverseAndInject(zoneContent)
      }
    })
  }
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  if (cart) {
    const { shipping_options } = await listCartOptions()

    shippingOptions = shipping_options
  }

  // Fetch header and footer templates
  console.log('[Layout] Fetching HEADER and FOOTER templates...')
  const [headerTemplate, footerTemplate] = await Promise.all([
    fetchTemplate('HEADER').catch((error) => {
      console.error('[Layout] Failed to fetch HEADER template:', error)
      return null
    }),
    fetchTemplate('FOOTER').catch((error) => {
      console.error('[Layout] Failed to fetch FOOTER template:', error)
      return null
    })
  ])

  console.log('[Layout] Header template fetched:', headerTemplate ? 'SUCCESS' : 'FAILED')
  console.log('[Layout] Footer template fetched:', footerTemplate ? 'SUCCESS' : 'FAILED')
  
  // Fetch theme for token resolution
  console.log('[Layout] Fetching theme...')
  const theme = await fetchTheme().catch((error) => {
    console.error('[Layout] Failed to fetch theme:', error)
    return null
  })
  console.log('[Layout] Theme fetched:', theme ? 'SUCCESS' : 'FAILED')
  if (theme) {
    console.log('[Layout] Theme ID:', theme.id)
    console.log('[Layout] Theme name:', theme.name)
    console.log('[Layout] Has tokens:', !!theme.globalSettings?.colors?.tokens)
  }
  
  if (headerTemplate) {
    console.log('[Layout] Header Template ID:', headerTemplate.id)
    console.log('[Layout] Header Template Name:', headerTemplate.templateName)
    console.log('[Layout] Header Has puckData:', !!headerTemplate.puckData)
  }

  if (footerTemplate) {
    console.log('[Layout] Footer Template ID:', footerTemplate.id)
    console.log('[Layout] Footer Template Name:', footerTemplate.templateName)
    console.log('[Layout] Footer Has puckData:', !!footerTemplate.puckData)
  }

  // Fetch default menu for MenuNavigation components (server-side using STORE_ID)
  console.log('[Layout] Fetching default menu...')
  const defaultMenu = await fetchMenu('default').catch((error) => {
    console.error('[Layout] Failed to fetch menu:', error)
    return null
  })
  console.log('[Layout] Menu fetched:', defaultMenu ? 'SUCCESS' : 'FAILED')
  
  // Enrich menu with Medusa category/collection data
  let enrichedMenu = null
  if (defaultMenu) {
    console.log('[Layout] Menu ID:', defaultMenu.id)
    console.log('[Layout] Menu name:', defaultMenu.name)
    console.log('[Layout] Menu handle:', defaultMenu.handle)
    console.log('[Layout] Menu items count:', defaultMenu.items?.length || 0)
    
    console.log('[Layout] Enriching menu with Medusa data...')
    enrichedMenu = await enrichMenuWithMedusaData(defaultMenu)
    console.log('[Layout] Menu enrichment complete')
  } else {
    console.error('[Layout] No menu returned from API')
  }

  // Inject menu data into templates for MenuNavigation components
  if (headerTemplate?.puckData && enrichedMenu?.items) {
    console.log('[Layout] Injecting enriched menu into header template...')
    console.log('[Layout] Header puckData content length:', headerTemplate.puckData.content?.length || 0)
    injectMenuDataIntoTemplate(headerTemplate.puckData, enrichedMenu.items)
  } else {
    console.warn('[Layout] Skipping header injection:', {
      hasHeaderTemplate: !!headerTemplate,
      hasPuckData: !!headerTemplate?.puckData,
      hasMenuItems: !!enrichedMenu?.items
    })
  }
  if (footerTemplate?.puckData && enrichedMenu?.items) {
    console.log('[Layout] Injecting enriched menu into footer template...')
    console.log('[Layout] Footer puckData content length:', footerTemplate.puckData.content?.length || 0)
    injectMenuDataIntoTemplate(footerTemplate.puckData, enrichedMenu.items)
  } else {
    console.warn('[Layout] Skipping footer injection:', {
      hasFooterTemplate: !!footerTemplate,
      hasPuckData: !!footerTemplate?.puckData,
      hasMenuItems: !!enrichedMenu?.items
    })
  }

  // Fetch store info (name + logo) and inject into Logo components
  console.log('[Layout] Fetching store info...')
  const storeInfo = await fetchStoreInfo().catch((error) => {
    console.error('[Layout] Failed to fetch store info:', error)
    return null
  })
  console.log('[Layout] Store info:', storeInfo ? `name=${storeInfo.name}, logo=${storeInfo.logo ? 'YES' : 'NO'}` : 'FAILED')

  if (storeInfo) {
    if (headerTemplate?.puckData) {
      injectStoreLogoIntoTemplate(headerTemplate.puckData, storeInfo)
    }
    if (footerTemplate?.puckData) {
      injectStoreLogoIntoTemplate(footerTemplate.puckData, storeInfo)
    }
  }

  // Calculate cart items count
  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0

  return (
    <>
      {/* Client-side theme token injection */}
      <ThemeInjector theme={theme} />

      {/* Header: Render Puck template header if available */}
      {headerTemplate?.puckData ? (
        <PuckRenderer data={headerTemplate.puckData} />
      ) : (
        <Nav />
      )}

      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      
      {/* Main content area - grows to fill available space */}
      <main className="flex-grow">
        {props.children}
      </main>
      
      {/* Footer: Render Puck template footer if available - sticks to bottom */}
      <footer className="mt-auto">
        {footerTemplate?.puckData ? (
          <PuckRenderer data={footerTemplate.puckData} />
        ) : (
          <Footer />
        )}
      </footer>
    </>
  )
}
