import React from 'react';
import { fetchTemplate } from '@lib/template/api';
import { OrderConfirmationTemplate as OrderConfirmationTemplateType } from '@lib/template/types';
import { OrderConfirmationRenderer } from '@/components/template-renderers/OrderConfirmationRenderer';
import { HttpTypes } from "@medusajs/types"

interface TemplateBasedOrderConfirmationProps {
  order: HttpTypes.StoreOrder;
}

/**
 * Template-Based Order Confirmation Page
 * Fetches and renders order confirmation using template configuration from Shopikool Platform
 */
export default async function TemplateBasedOrderConfirmation({ order }: TemplateBasedOrderConfirmationProps) {
  // Fetch order confirmation template from platform
  const template = await fetchTemplate('order-confirmation') as OrderConfirmationTemplateType | null;
  
  // If no template, use default (renderer has fallback)
  if (!template) {
    console.warn('[Order Confirmation] No template found, using default');
  }

  return (
    <OrderConfirmationRenderer 
      template={template} 
      order={order}
    />
  );
}
