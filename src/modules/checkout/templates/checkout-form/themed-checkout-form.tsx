'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import { ProductTemplate } from "@lib/template"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { useMemo } from "react"

interface ThemedCheckoutFormProps {
  cart: HttpTypes.StoreCart
  customer: HttpTypes.StoreCustomer | null
  shippingMethods: any
  paymentMethods: any
  template?: ProductTemplate | null
}

// Component mapping for checkout sections
const SECTION_COMPONENTS = {
  'customer-info': null, // Handled within Addresses
  'shipping-address': Addresses,
  'billing-address': null, // Handled within Addresses
  'shipping-method': Shipping,
  'payment-method': Payment,
  'review': Review,
}

const ThemedCheckoutForm: React.FC<ThemedCheckoutFormProps> = ({
  cart,
  customer,
  shippingMethods,
  paymentMethods,
  template,
}) => {
  const { theme, loading } = useTheme()

  // Parse template configuration
  const checkoutConfig = useMemo(() => {
    if (!template?.zones) {
      return null
    }

    // Template zones contain the checkout configuration
    return template.zones as any
  }, [template])

  // Get section order and visibility
  const sections = useMemo(() => {
    if (!checkoutConfig?.sections) {
      // Default section order
      return [
        { key: 'shipping-address', component: Addresses, visible: true },
        { key: 'shipping-method', component: Shipping, visible: true },
        { key: 'payment-method', component: Payment, visible: true },
        { key: 'review', component: Review, visible: true },
      ]
    }

    const { order, visibility } = checkoutConfig.sections
    
    return order
      .filter((sectionKey: string) => {
        // Check visibility
        const visibilityKey = sectionKey.replace(/-/g, '')
          .replace(/info/g, 'Info')
          .replace(/address/g, 'Address')
          .replace(/method/g, 'Method')
        visibilityKey.charAt(0).toLowerCase() + visibilityKey.slice(1)
        
        return visibility?.[visibilityKey] !== false
      })
      .map((sectionKey: string) => {
        let Component = null
        
        // Map section keys to components
        if (sectionKey === 'shipping-address' || sectionKey === 'customer-info' || sectionKey === 'billing-address') {
          Component = Addresses
        } else if (sectionKey === 'shipping-method') {
          Component = Shipping
        } else if (sectionKey === 'payment-method') {
          Component = Payment
        } else if (sectionKey === 'review') {
          Component = Review
        }

        return {
          key: sectionKey,
          component: Component,
          visible: true,
        }
      })
      .filter((section: any) => section.component !== null)
      // Remove duplicate Addresses components (customer-info, shipping, billing all use same component)
      .filter((section: any, index: number, self: any[]) => {
        if (section.component === Addresses) {
          return self.findIndex((s: any) => s.component === Addresses) === index
        }
        return true
      })
  }, [checkoutConfig])

  // Get styling configuration
  const styling = useMemo(() => {
    if (!checkoutConfig?.styling) {
      return null
    }
    return checkoutConfig.styling
  }, [checkoutConfig])

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

  // Get spacing value
  const getSpacing = (spacing?: string) => {
    if (!spacing) return theme.layout.spacing.lg
    
    const spacingMap: Record<string, string> = {
      compact: theme.layout.spacing.md,
      normal: theme.layout.spacing.lg,
      relaxed: theme.layout.spacing.xl,
    }
    
    return spacingMap[spacing] || theme.layout.spacing.lg
  }

  const containerSpacing = getSpacing(styling?.spacing)
  const backgroundColor = styling?.colors?.background || theme.colors.background
  const sectionBackground = styling?.colors?.sectionBackground || theme.colors.surface
  const borderColor = styling?.colors?.border || theme.colors.border

  return (
    <div 
      className="w-full grid grid-cols-1"
      style={{
        backgroundColor,
        gap: containerSpacing,
      }}
    >
      {sections.map(({ key, component: Component }) => {
        if (!Component) return null

        return (
          <div
            key={key}
            style={{
              backgroundColor: sectionBackground,
              borderRadius: theme.layout.borderRadius.md,
              padding: containerSpacing,
              border: `1px solid ${borderColor}`,
            }}
          >
            {Component === Addresses && (
              <Addresses cart={cart} customer={customer} />
            )}
            {Component === Shipping && (
              <Shipping cart={cart} availableShippingMethods={shippingMethods} />
            )}
            {Component === Payment && (
              <Payment cart={cart} availablePaymentMethods={paymentMethods} />
            )}
            {Component === Review && (
              <Review cart={cart} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ThemedCheckoutForm
