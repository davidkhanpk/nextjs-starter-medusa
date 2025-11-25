/**
 * Categories Grid Section
 * Displays category cards in grid or carousel layout
 */

import { CategoriesGridSection as CategoriesGridSectionType } from '@lib/page-builder/types';
import { sdk } from '@lib/config';
import Image from 'next/image';
import Link from 'next/link';

interface CategoriesGridSectionProps extends CategoriesGridSectionType {}

const COLUMN_CLASSES = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
};

const IMAGE_SHAPE_CLASSES = {
  square: 'rounded-none',
  circle: 'rounded-full',
  rounded: 'rounded-lg',
};

export default async function CategoriesGridSection(props: CategoriesGridSectionProps) {
  const {
    title,
    subtitle,
    categoryIds,
    layout,
    columns,
    showProductCount,
    showImages,
    imageShape,
  } = props;

  // Fetch categories directly using SDK
  const { product_categories } = await sdk.client.fetch<{
    product_categories: any[]
  }>("/store/product-categories", {
    query: {
      fields: "id,name,handle,parent_category_id,metadata",
      limit: 100,
    },
    cache: "force-cache",
    next: { revalidate: 3600 },
  });
  
  // Filter by specified IDs if provided
  const categories = categoryIds && categoryIds.length > 0
    ? product_categories.filter((cat: any) => categoryIds.includes(cat.id))
    : product_categories;

  const columnClass = COLUMN_CLASSES[columns];
  const shapeClass = IMAGE_SHAPE_CLASSES[imageShape];

  return (
    <div className="content-container py-12">
      {/* Section Header */}
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

      {/* Categories Grid */}
      <div className={`grid ${columnClass} gap-6`}>
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/categories/${category.handle}`}
            className="group"
          >
            <div className="relative overflow-hidden">
              {/* Category Image */}
              {showImages && category.metadata?.image && (
                <div className={`relative aspect-square mb-4 overflow-hidden bg-gray-100 ${shapeClass}`}>
                  <Image
                    src={category.metadata.image as string}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              )}

              {/* Category Info */}
              <div className="text-center">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                {showProductCount && category.metadata?.product_count && (
                  <p className="text-sm text-muted mt-1">
                    {String(category.metadata.product_count)} products
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
