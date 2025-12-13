import React from 'react';
import { fetchTemplate } from '@lib/template/api';
import { CollectionTemplate as CollectionTemplateType } from '@lib/template/types';
import { CollectionPageRenderer } from '@/components/template-renderers/CollectionPageRenderer';
import { HttpTypes } from "@medusajs/types"

interface TemplateBasedCollectionProps {
  collection: HttpTypes.StoreCollection;
  products: HttpTypes.StoreProduct[];
}

/**
 * Template-Based Collection Page
 * Fetches and renders collection using template configuration from Shopikool Platform
 */
export default async function TemplateBasedCollection({ collection, products }: TemplateBasedCollectionProps) {
  // Fetch collection template from platform
  const template = await fetchTemplate('collection') as CollectionTemplateType | null;
  
  // If no template, use default (renderer has fallback)
  if (!template) {
    console.warn('[Collection] No template found, using default');
  }

  return (
    <CollectionPageRenderer 
      template={template} 
      collection={collection}
      products={products}
    />
  );
}
