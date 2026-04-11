import { Metadata } from "next"
import { notFound } from "next/navigation"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { fetchTemplate } from "@lib/template/api"
import PuckRenderer from "@/components/puck/PuckRenderer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()
  
  // Fetch shipping and payment methods for checkout
  const availableShippingMethods = await listCartShippingMethods(cart.id)
  const availablePaymentMethods = cart.region 
    ? await listCartPaymentMethods(cart.region.id) 
    : []
  
  // Fetch CHECKOUT_PAGE template from Shopikool backend
  console.log('[Checkout Page] Fetching CHECKOUT_PAGE template...')
  console.log('[Checkout Page] Store ID:', process.env.STORE_ID)
  console.log('[Checkout Page] API URL:', process.env.LAUNCHSTORE_API_URL)
  
  const checkoutTemplate = await fetchTemplate('CHECKOUT_PAGE').catch((error) => {
    console.error('[Checkout Page] Failed to fetch CHECKOUT_PAGE template:', error)
    console.error('[Checkout Page] Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })
    return null
  })

  console.log('[Checkout Page] Checkout template fetched:', checkoutTemplate ? 'SUCCESS' : 'FAILED')
  console.log('[Checkout Page] Full template response:', JSON.stringify(checkoutTemplate, null, 2))
  
  if (checkoutTemplate) {
    console.log('[Checkout Page] Template ID:', checkoutTemplate.id)
    console.log('[Checkout Page] Template Name:', checkoutTemplate.templateName)
    console.log('[Checkout Page] Template Type:', checkoutTemplate.templateType)
    console.log('[Checkout Page] Is Default:', checkoutTemplate.isDefault)
    console.log('[Checkout Page] Status:', checkoutTemplate.status)
    console.log('[Checkout Page] Has puckData:', !!checkoutTemplate.puckData)
    
    if (checkoutTemplate.puckData) {
      console.log('[Checkout Page] PuckData keys:', Object.keys(checkoutTemplate.puckData))
      console.log('[Checkout Page] PuckData.content length:', checkoutTemplate.puckData.content?.length || 0)
      console.log('[Checkout Page] PuckData.zones keys:', Object.keys(checkoutTemplate.puckData.zones || {}))
      console.log('[Checkout Page] PuckData.root:', checkoutTemplate.puckData.root)
    }
  }

  // Use Puck template if available
  if (checkoutTemplate && checkoutTemplate.puckData) {
    console.log('[Checkout Page] Rendering with Puck template')
    console.log('[Checkout Page] Template data:', JSON.stringify(checkoutTemplate.puckData, null, 2))
    
    return (
      <PuckRenderer 
        data={{
          ...checkoutTemplate.puckData,
          context: {
            ...(checkoutTemplate.puckData.context || {}),
            cart,
            customer,
            availableShippingMethods,
            availablePaymentMethods,
          }
        }}
      />
    )
  }

  console.log('[Checkout Page] Falling back to default checkout layout')

  // Fallback to default two-column checkout layout (matching original Medusa)
  const CheckoutForm = (await import('@modules/checkout/templates/checkout-form')).default
  const CheckoutSummary = (await import('@modules/checkout/templates/checkout-summary')).default
  
  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <PaymentWrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart} />
    </div>
  )
}
