import React from 'react';
import { fetchTemplate } from '@lib/template/api';
import { CheckoutTemplate as CheckoutTemplateType } from '@lib/template/types';
import { CheckoutPageRenderer } from '@/components/template-renderers/CheckoutPageRenderer';
import { HttpTypes } from "@medusajs/types"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"

interface TemplateBasedCheckoutProps {
  cart: HttpTypes.StoreCart;
  customer: HttpTypes.StoreCustomer | null;
}

/**
 * Template-Based Checkout Page
 * Fetches and renders checkout using template configuration from Shopikool Platform
 */
export default async function TemplateBasedCheckout({ cart, customer }: TemplateBasedCheckoutProps) {
  // Fetch checkout template from platform
  const template = await fetchTemplate('checkout') as CheckoutTemplateType | null;
  
  // If no template, use default (renderer has fallback)
  if (!template) {
    console.warn('[Checkout] No template found, using default');
  }

  // Fetch shipping and payment methods for checkout
  const availableShippingMethods = await listCartShippingMethods(cart.id);
  const availablePaymentMethods = cart.region 
    ? await listCartPaymentMethods(cart.region.id) 
    : [];

  return (
    <CheckoutPageRenderer 
      template={template} 
      cart={cart} 
      customer={customer}
      availableShippingMethods={availableShippingMethods}
      availablePaymentMethods={availablePaymentMethods || []}
    />
  );
}
