'use client'

import React from 'react';
import { HttpTypes } from "@medusajs/types"
import PaymentWrapper from '@modules/checkout/components/payment-wrapper';
import Link from '@/components/common/SafeLink';
import { ArrowLeft } from 'lucide-react';

// Import real Medusa checkout components
import Addresses from '@modules/checkout/components/addresses';
import Shipping from '@modules/checkout/components/shipping';
import Payment from '@modules/checkout/components/payment';
import Review from '@modules/checkout/components/review';
import ItemsPreviewTemplate from '@modules/cart/templates/preview';
import DiscountCode from '@modules/checkout/components/discount-code';
import CartTotals from '@modules/common/components/cart-totals';

interface CheckoutPageRendererProps {
  template: any; // Flexible type to support both old and new Puck templates
  cart: HttpTypes.StoreCart;
  customer: HttpTypes.StoreCustomer | null;
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null;
  availablePaymentMethods: any[];
}

/**
 * Checkout Page Renderer
 * Maps Puck template components to real Medusa checkout components
 */
export function CheckoutPageRenderer({ template, cart, customer, availableShippingMethods, availablePaymentMethods }: CheckoutPageRendererProps) {
  
  // If template has content array (Puck components), render modular layout
  if (template?.content && Array.isArray(template.content)) {
    return renderModularCheckout(template, cart, customer, availableShippingMethods, availablePaymentMethods);
  }
  
  // Otherwise, use default layout
  return renderDefaultCheckout(cart, customer, availableShippingMethods, availablePaymentMethods);
}

/**
 * Render modular checkout based on Puck template
 */
function renderModularCheckout(
  template: any,
  cart: HttpTypes.StoreCart,
  customer: HttpTypes.StoreCustomer | null,
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null,
  availablePaymentMethods: any[]
) {
  const components = template.content || [];
  
  return (
    <div className="py-12">
      <div className="content-container">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm mb-6 text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to cart
        </Link>

        <PaymentWrapper cart={cart}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_416px] gap-8">
            {/* Render components based on Puck template */}
            {components.map((comp: any, index: number) => {
              const key = `${comp.type}-${index}`;
              
              switch (comp.type) {
                case 'ShippingAddress':
                  return (
                    <div key={key} className="lg:col-span-1">
                      <Addresses cart={cart} customer={customer} />
                    </div>
                  );
                
                case 'ShippingMethod':
                  return (
                    <div key={key} className="lg:col-span-1">
                      {/* @ts-ignore - Medusa type compatibility */}
                      <Shipping cart={cart} availableShippingMethods={availableShippingMethods} />
                    </div>
                  );
                
                case 'PaymentMethod':
                  return (
                    <div key={key} className="lg:col-span-1">
                      {/* @ts-ignore - Medusa type compatibility */}
                      <Payment cart={cart} availablePaymentMethods={availablePaymentMethods} />
                    </div>
                  );
                
                case 'OrderReview':
                  return (
                    <div key={key} className="lg:col-span-1">
                      <Review cart={cart} />
                    </div>
                  );
                
                case 'CartItemsPreview':
                  return (
                    <div key={key}>
                      <ItemsPreviewTemplate cart={cart} />
                    </div>
                  );
                
                case 'DiscountCode':
                  return (
                    <div key={key}>
                      {/* @ts-ignore - Medusa type compatibility */}
                      <DiscountCode cart={cart as any} />
                    </div>
                  );
                
                case 'OrderTotals':
                  return (
                    <div key={key}>
                      <CartTotals totals={cart} />
                    </div>
                  );
                
                default:
                  return null;
              }
            })}
          </div>
        </PaymentWrapper>
      </div>
    </div>
  );
}

/**
 * Default checkout layout (fallback when no template)
 */
function renderDefaultCheckout(
  cart: HttpTypes.StoreCart,
  customer: HttpTypes.StoreCustomer | null,
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null,
  availablePaymentMethods: any[]
) {
  return (
    <div className="py-12">
      <div className="content-container">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm mb-6 text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to cart
        </Link>

        <PaymentWrapper cart={cart}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_416px] gap-8">
            {/* Left column - Forms */}
            <div className="space-y-6">
              <Addresses cart={cart} customer={customer} />
              {/* @ts-ignore - Medusa type compatibility */}
              <Shipping cart={cart} availableShippingMethods={availableShippingMethods} />
              {/* @ts-ignore - Medusa type compatibility */}
              <Payment cart={cart} availablePaymentMethods={availablePaymentMethods} />
              <Review cart={cart} />
            </div>

            {/* Right column - Summary */}
            <div className="space-y-6">
              <ItemsPreviewTemplate cart={cart} />
              {/* @ts-ignore - Medusa type compatibility */}
              <DiscountCode cart={cart as any} />
              <CartTotals totals={cart} />
            </div>
          </div>
        </PaymentWrapper>
      </div>
    </div>
  );
}