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
  if (!puckData) return

  const traverseAndInject = (components: any[]) => {
    components.forEach((component) => {
      if (component.type === 'MenuNavigation') {
        component.props = component.props || {}
        component.props.menuData = menuItems
      }

      // Recursively check nested components in props arrays
      if (component.props) {
        Object.keys(component.props).forEach((key) => {
          if (Array.isArray(component.props[key]) && component.props[key].length > 0 && component.props[key][0]?.type) {
            traverseAndInject(component.props[key])
          }
        })
      }
    })
  }

  // Traverse content array
  if (puckData.content && Array.isArray(puckData.content)) {
    traverseAndInject(puckData.content)
  }

  // Traverse zones object
  if (puckData.zones && typeof puckData.zones === 'object') {
    Object.keys(puckData.zones).forEach((zoneKey) => {
      const zoneContent = puckData.zones[zoneKey]
      if (Array.isArray(zoneContent)) {
        traverseAndInject(zoneContent)
      }
    })
  }
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
  const [headerTemplate, footerTemplate] = await Promise.all([
    fetchTemplate('HEADER').catch(() => null),
    fetchTemplate('FOOTER').catch(() => null)
  ])

  // Fetch theme for token resolution
  const theme = await fetchTheme().catch(() => null)

  // Fetch default menu for MenuNavigation components
  const defaultMenu = await fetchMenu('default').catch(() => null)
  
  // Enrich menu with Medusa category/collection data
  let enrichedMenu = null
  if (defaultMenu) {
    enrichedMenu = await enrichMenuWithMedusaData(defaultMenu)
  }

  // Inject menu data into templates for MenuNavigation components
  if (headerTemplate?.puckData && enrichedMenu?.items) {
    injectMenuDataIntoTemplate(headerTemplate.puckData, enrichedMenu.items)
  }
  if (footerTemplate?.puckData && enrichedMenu?.items) {
    injectMenuDataIntoTemplate(footerTemplate.puckData, enrichedMenu.items)
  }

  // Fetch store info (name + logo) and inject into Logo components
  const storeInfo = await fetchStoreInfo().catch(() => null)

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
