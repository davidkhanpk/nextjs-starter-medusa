'use client'

import { useTheme } from "@lib/theme/ThemeProvider"
import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

interface ThemedCartTemplateProps {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}

const ThemedCartTemplate: React.FC<ThemedCartTemplateProps> = ({
  cart,
  customer,
}) => {
  const { theme, loading } = useTheme()

  // Show default styling while loading
  if (loading) {
    return (
      <div className="py-12">
        <div className="content-container" data-testid="cart-container">
          {cart?.items?.length ? (
            <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
              <div className="flex flex-col bg-white py-6 gap-y-6">
                {!customer && (
                  <>
                    <SignInPrompt />
                    <Divider />
                  </>
                )}
                <ItemsTemplate cart={cart} />
              </div>
              <div className="relative">
                <div className="flex flex-col gap-y-8 sticky top-12">
                  {cart && cart.region && (
                    <>
                      <div className="bg-white py-6">
                        <Summary cart={cart as any} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <EmptyCartMessage />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div 
      className="py-12"
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
            {/* Cart Items */}
            <div 
              className="flex flex-col py-6 gap-y-6"
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.layout.borderRadius.md,
              }}
            >
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>

            {/* Cart Summary */}
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <>
                    <div 
                      className="py-6"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderRadius: theme.layout.borderRadius.md,
                      }}
                    >
                      <Summary cart={cart as any} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default ThemedCartTemplate
