'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

interface ThemedCheckoutFormProps {
  cart: HttpTypes.StoreCart
  customer: HttpTypes.StoreCustomer | null
  shippingMethods: any
  paymentMethods: any
}

const ThemedCheckoutForm: React.FC<ThemedCheckoutFormProps> = ({
  cart,
  customer,
  shippingMethods,
  paymentMethods,
}) => {
  const { theme, loading } = useTheme()

  // Show default styling while loading
  if (loading) {
    return (
      <div className="w-full grid grid-cols-1 gap-y-8">
        <Addresses cart={cart} customer={customer} />
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
        <Review cart={cart} />
      </div>
    )
  }

  return (
    <div 
      className="w-full grid grid-cols-1 gap-y-8"
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <div
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.layout.borderRadius.md,
          padding: theme.layout.spacing.lg,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <Addresses cart={cart} customer={customer} />
      </div>

      <div
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.layout.borderRadius.md,
          padding: theme.layout.spacing.lg,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      </div>

      <div
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.layout.borderRadius.md,
          padding: theme.layout.spacing.lg,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <Payment cart={cart} availablePaymentMethods={paymentMethods} />
      </div>

      <div
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.layout.borderRadius.md,
          padding: theme.layout.spacing.lg,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <Review cart={cart} />
      </div>
    </div>
  )
}

export default ThemedCheckoutForm
