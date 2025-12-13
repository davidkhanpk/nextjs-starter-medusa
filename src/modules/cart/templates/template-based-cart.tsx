import React from 'react';
import { fetchTemplate } from '@lib/template/api';
import { CartTemplate as CartTemplateType } from '@lib/template/types';
import { CartPageRenderer } from '@/components/template-renderers/CartPageRenderer';
import { HttpTypes } from "@medusajs/types"

interface TemplateBasedCartProps {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}

/**
 * Template-Based Cart Page
 * Fetches and renders cart using template configuration from Shopikool Platform
 */
export default async function TemplateBasedCart({ cart, customer }: TemplateBasedCartProps) {
  // Fetch cart template from platform
  const template = await fetchTemplate('cart') as CartTemplateType | null;
  
  // If no template, use default (renderer has fallback)
  if (!template) {
    console.warn('[Cart] No template found, using default');
  }

  return (
    <CartPageRenderer 
      template={template} 
      cart={cart} 
      customer={customer}
    />
  );
}
