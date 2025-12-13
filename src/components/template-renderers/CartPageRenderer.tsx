'use client'

import React from 'react';
import { CartTemplate } from '@lib/template/types';
import { HttpTypes } from "@medusajs/types"
import { 
  cn, 
  getButtonClasses, 
  getCardClasses, 
  spacingToTailwind,
  colorToTailwind,
  borderRadiusToTailwind
} from '@lib/template/tailwind-mapper';
import ItemsTemplate from '@modules/cart/templates/items';
import Summary from '@modules/cart/templates/summary';
import EmptyCartMessage from '@modules/cart/components/empty-cart-message';
import SignInPrompt from '@modules/cart/components/sign-in-prompt';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

interface CartPageRendererProps {
  template: CartTemplate | null;
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}

/**
 * Cart Page Renderer
 * Renders cart page based on template configuration
 */
export function CartPageRenderer({ template, cart, customer }: CartPageRendererProps) {
  // Default template if none provided
  const config = template || getDefaultCartTemplate();
  
  const { zones, settings } = config;

  // Empty cart state
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className={cn('py-12', spacingToTailwind(settings.spacing, 'padding'))}>
        <div className="content-container">
          <div className={cn(
            'text-center max-w-md mx-auto',
            getCardClasses(settings)
          )}>
            <div className="mb-6">
              <ShoppingCart className="w-20 h-20 mx-auto text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href={zones.actions.continueShoppingUrl}
              className={cn(
                'inline-flex items-center gap-2',
                getButtonClasses(settings, 'primary')
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              {zones.actions.continueShoppingText}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Two-column layout
  if (zones.layout.type === 'two-column') {
    return (
      <div className={cn('py-12', spacingToTailwind(settings.spacing, 'padding'))}>
        <div className="content-container">
          {zones.layout.showBreadcrumbs && (
            <div className="mb-6">
              <nav className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                  Home
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 dark:text-white">Shopping Cart</span>
              </nav>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>

          <div className={cn(
            'grid grid-cols-1 lg:grid-cols-[1fr_360px]',
            spacingToTailwind(settings.spacing, 'gap')
          )}>
            {/* Cart Items */}
            <div className={zones.layout.itemsPosition === 'left' ? 'order-1' : 'order-2'}>
              <div className={cn(
                'flex flex-col',
                spacingToTailwind(settings.spacing, 'gap')
              )}>
                {!customer && (
                  <div className={cn(
                    getCardClasses(settings),
                    'mb-4'
                  )}>
                    <SignInPrompt />
                  </div>
                )}
                <ItemsTemplate cart={cart} />
                
                {zones.actions.continueShoppingUrl && (
                  <Link
                    href={zones.actions.continueShoppingUrl}
                    className={cn(
                      'inline-flex items-center gap-2 text-sm',
                      colorToTailwind(settings.colors.primary, 'text'),
                      'hover:underline'
                    )}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {zones.actions.continueShoppingText}
                  </Link>
                )}
              </div>
            </div>

            {/* Cart Summary */}
            <div className={zones.layout.itemsPosition === 'left' ? 'order-2' : 'order-1'}>
              <div className="lg:sticky lg:top-24">
                {cart && cart.region && (
                  <div className={getCardClasses(settings)}>
                    <Summary cart={cart as any} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Single-column layout (fallback)
  return (
    <div className={cn('py-12', spacingToTailwind(settings.spacing, 'padding'))}>
      <div className="content-container max-w-4xl mx-auto">
        {zones.layout.showBreadcrumbs && (
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white">Shopping Cart</span>
            </nav>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>

        {!customer && (
          <div className={cn(getCardClasses(settings), 'mb-6')}>
            <SignInPrompt />
          </div>
        )}

        <div className={cn('flex flex-col', spacingToTailwind(settings.spacing, 'gap'))}>
          <ItemsTemplate cart={cart} />
          
          {cart && cart.region && (
            <div className={getCardClasses(settings)}>
              <Summary cart={cart as any} />
            </div>
          )}

          {zones.actions.continueShoppingUrl && (
            <Link
              href={zones.actions.continueShoppingUrl}
              className={cn(
                'inline-flex items-center gap-2 text-sm',
                colorToTailwind(settings.colors.primary, 'text'),
                'hover:underline'
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              {zones.actions.continueShoppingText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Default cart template configuration
 */
function getDefaultCartTemplate(): CartTemplate {
  return {
    id: 'default',
    templateName: 'Default Cart',
    zones: {
      layout: {
        type: 'two-column',
        showBreadcrumbs: true,
        itemsPosition: 'left',
      },
      cartItems: {
        showProductImage: true,
        showProductTitle: true,
        showVariantInfo: true,
        showQuantitySelector: true,
        showRemoveButton: true,
        showPriceBreakdown: true,
      },
      summary: {
        showSubtotal: true,
        showShipping: true,
        showTax: true,
        showDiscount: true,
        showTotal: true,
        position: 'right',
      },
      actions: {
        continueShoppingText: 'Continue Shopping',
        continueShoppingUrl: '/store',
        checkoutButtonText: 'Proceed to Checkout',
        showEmptyCartButton: true,
      },
    },
    settings: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#10b981',
      },
      spacing: 'normal',
      borderRadius: 'medium',
      animations: {
        enabled: true,
        type: 'fade',
      },
    },
  };
}
