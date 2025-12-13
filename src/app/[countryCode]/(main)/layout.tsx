import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import { fetchTemplateBySubdomain } from "@lib/template/api"
import { HeaderTemplate, FooterTemplate } from "@lib/template/types-advanced"
import { HeaderRenderer } from "@components/template-renderers/HeaderRenderer"
import { FooterRenderer } from "@components/template-renderers/FooterRenderer"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
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
  const headerTemplate = await fetchTemplateBySubdomain<HeaderTemplate>('HEADER').catch(() => null)
  const footerTemplate = await fetchTemplateBySubdomain<FooterTemplate>('FOOTER').catch(() => null)

  // Calculate cart items count
  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0

  return (
    <>
      {/* Header: Use template if available, otherwise fallback to Nav */}
      {headerTemplate ? (
        <HeaderRenderer 
          template={headerTemplate}
          menuItems={[]}
          cartItemsCount={cartItemsCount}
          wishlistCount={0}
        />
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
      {props.children}
      
      {/* Footer: Use template if available, otherwise fallback to Footer */}
      {footerTemplate ? (
        <FooterRenderer template={footerTemplate} />
      ) : (
        <Footer />
      )}
    </>
  )
}
