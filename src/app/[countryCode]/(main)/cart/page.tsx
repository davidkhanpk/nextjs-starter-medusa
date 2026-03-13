import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { fetchTemplate } from "@lib/template/api"
import CartTemplate from "@modules/cart/templates"
import PuckRenderer from "@/components/puck/PuckRenderer"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    console.error(error)
    return notFound()
  })

  const customer = await retrieveCustomer()
  
  // Fetch CART_PAGE template from Shopikool backend
  console.log('[Cart Page] Fetching CART_PAGE template...')
  const cartTemplate = await fetchTemplate('CART_PAGE').catch((error) => {
    console.error('[Cart Page] Failed to fetch CART_PAGE template:', error)
    return null
  })

  console.log('[Cart Page] Cart template fetched:', cartTemplate ? 'SUCCESS' : 'FAILED')
  
  if (cartTemplate) {
    console.log('[Cart Page] Template ID:', cartTemplate.id)
    console.log('[Cart Page] Template Name:', cartTemplate.templateName)
    console.log('[Cart Page] Has puckData:', !!cartTemplate.puckData)
  }

  // Use Puck template if available
  if (cartTemplate && cartTemplate.puckData) {
    console.log('[Cart Page] Rendering with Puck template')
    console.log('[Cart Page] Template data:', JSON.stringify(cartTemplate.puckData, null, 2))
    
    return (
      <PuckRenderer 
        data={{
          ...cartTemplate.puckData,
          context: {
            ...(cartTemplate.puckData.context || {}),
            cart,
            customer,
          }
        }}
      />
    )
  }

  console.log('[Cart Page] Falling back to original Medusa template')

  // Fallback to original Medusa template
  return <CartTemplate cart={cart} customer={customer} />
}
