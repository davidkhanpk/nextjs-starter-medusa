/**
 * Collections Section
 */

import { CollectionsSection as CollectionsSectionType } from '@lib/page-builder/types';
import { sdk } from '@lib/config';
import Image from 'next/image';
import Link from 'next/link';

interface CollectionsSectionProps extends CollectionsSectionType {}

const COLUMN_CLASSES = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

export default async function CollectionsSection(props: CollectionsSectionProps) {
  const {
    title,
    subtitle,
    collectionIds,
    layout,
    columns,
    showProductCount,
    showImages,
  } = props;

  // Fetch collections directly using SDK
  const { collections } = await sdk.store.collection.list({
    limit: 100,
    fields: 'id,title,handle,metadata',
  }, {
    next: { revalidate: 3600 }
  });
  
  // Filter by specified IDs if provided
  const filteredCollections = collectionIds && collectionIds.length > 0
    ? collections.filter((col: any) => collectionIds.includes(col.id))
    : collections;

  const columnClass = COLUMN_CLASSES[columns];

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

      {/* Collections Grid */}
      <div className={`grid ${columnClass} gap-6`}>
        {filteredCollections.map((collection: any) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="group"
          >
            <div className="relative overflow-hidden">
              {/* Collection Image */}
              {showImages && collection.metadata?.image && (
                <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-gray-100 rounded-lg">
                  <Image
                    src={collection.metadata.image as string}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              )}

              {/* Collection Info */}
              <div className="text-center">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {collection.title}
                </h3>
                {showProductCount && collection.metadata?.product_count && (
                  <p className="text-sm text-muted mt-1">
                    {collection.metadata.product_count} products
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
