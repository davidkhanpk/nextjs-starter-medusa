/**
 * Category Products Section
 * Displays products from a specific Medusa category
 */

import { CategoryProductsSection as CategoryProductsSectionType } from '@lib/page-builder/types';
import { sdk } from '@lib/config';
import ProductPreview from '@modules/products/components/product-preview';
import { getRegion } from '@lib/data/regions';
import { HttpTypes } from '@medusajs/types';

interface CategoryProductsSectionProps extends CategoryProductsSectionType {}

const COLUMN_CLASSES = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
};

export default async function CategoryProductsSection(props: CategoryProductsSectionProps) {
  const {
    title,
    subtitle,
    categoryId,
    limit,
    columns,
  } = props;

  // Get region (default to US for now)
  const region = await getRegion('us');

  if (!region) {
    return null;
  }

  // Fetch products directly using SDK without cookies
  try {
    const { products } = await sdk.store.product.list({
      region_id: region.id,
      category_id: [categoryId],
      limit: limit || 8,
      fields: '*variants.calculated_price',
    }, {
      next: { revalidate: 300 }
    });

    if (!products || products.length === 0) {
      return null;
    }

    const columnClass = COLUMN_CLASSES[columns];

    return (
      <div className="content-container py-12">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {subtitle && (
              <p className="text-sm uppercase tracking-wide text-muted mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold">
                {title}
              </h2>
            )}
          </div>
        )}

        <div className={`grid ${columnClass} gap-6`}>
          {products.map((product) => (
            <ProductPreview
              key={product.id}
              product={product}
              region={region}
              isFeatured
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products for category:', error);
    return null;
  }
}
