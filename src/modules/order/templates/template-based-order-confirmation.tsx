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
  console.log('[Order Confirmation] Fetching ORDER_CONFIRMATION_PAGE template...');
  const template = await fetchTemplate('ORDER_CONFIRMATION_PAGE').catch((error) => {
    console.error('[Order Confirmation] Failed to fetch template:', error);
    return null;
  }) as OrderConfirmationTemplateType | null;
  
  // If no template, use default (renderer has fallback)
  if (!template) {
    console.warn('[Order Confirmation] No template found, using default');
  } else {
    console.log('[Order Confirmation] Template loaded:', {
      id: template.id,
      name: template.templateName,
      hasZones: !!template.zones,
      hasSettings: !!template.settings,
    });
  }

  return (
    <OrderConfirmationRenderer 
      template={template} 
      order={order}
    />
  );
}
