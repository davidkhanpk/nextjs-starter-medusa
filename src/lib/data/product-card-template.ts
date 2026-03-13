"use server"

/**
 * @deprecated Use template.ts instead
 * This file is kept for backwards compatibility
 */

import { ProductCardTemplate, DEFAULT_PRODUCT_CARD_TEMPLATE } from '@lib/types/product-card-template';
import { getDefaultProductCardTemplate, getProductCardTemplateById } from '@lib/template';

/**
 * @deprecated Use getDefaultProductCardTemplate from template.ts
 */
export async function getProductCardTemplate(storeId: string): Promise<ProductCardTemplate> {
  const template = await getDefaultProductCardTemplate(storeId);
  return template || DEFAULT_PRODUCT_CARD_TEMPLATE;
}

/**
 * @deprecated Use getProductCardTemplateById from template.ts
 */
export { getProductCardTemplateById };
