'use client';

import { ComponentConfig } from "@measured/puck";
import { useCollectionProducts } from "@lib/hooks/useCollectionProducts";
import { getProductPrice } from "@lib/util/get-product-price";
import Image from "next/image";
import Link from "@/components/common/SafeLink";
import { Heart, Eye } from "lucide-react";

export interface ProductGridProps {
  layout: "grid" | "list";
  columns: 2 | 3 | 4;
  showQuickView: boolean;
  showWishlist: boolean;
  showCompare: boolean;
  imageAspectRatio: "square" | "portrait" | "landscape";
  showBadges: boolean;
  gap: "sm" | "md" | "lg";
}

export const ProductGrid: ComponentConfig<ProductGridProps> = {
  label: "Product Grid",

  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Grid", value: "grid" },
        { label: "List", value: "list" },
      ],
    },
    columns: {
      type: "select",
      label: "Grid Columns",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
      ],
    },
    showQuickView: {
      type: "radio",
      label: "Show Quick View Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showWishlist: {
      type: "radio",
      label: "Show Wishlist Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showCompare: {
      type: "radio",
      label: "Show Compare Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    imageAspectRatio: {
      type: "select",
      label: "Image Aspect Ratio",
      options: [
        { label: "Square (1:1)", value: "square" },
        { label: "Portrait (3:4)", value: "portrait" },
        { label: "Landscape (4:3)", value: "landscape" },
      ],
    },
    showBadges: {
      type: "radio",
      label: "Show Badges (Sale)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    gap: {
      type: "select",
      label: "Item Spacing",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  },

  defaultProps: {
    layout: "grid",
    columns: 3,
    showQuickView: true,
    showWishlist: true,
    showCompare: false,
    imageAspectRatio: "square",
    showBadges: true,
    gap: "md",
  },

  render: ({
    layout,
    columns,
    showQuickView,
    showWishlist,
    showCompare,
    imageAspectRatio,
    showBadges,
    gap,
  }: ProductGridProps) => {
    const { products, isLoading, error } = useCollectionProducts();

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-red-600">Error loading products: {error.message}</div>;
    }

    if (!products || products.length === 0) {
      return <div className="text-gray-400 italic">No products found</div>;
    }

    const gapClasses = {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    };

    const aspectRatioClasses = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
    };

    // Grid Layout
    if (layout === "grid") {
      const columnClasses = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      };

      return (
        <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}>
          {products.map((product) => {
            const { cheapestPrice } = getProductPrice({ product });
            const priceData = cheapestPrice;
            const isOnSale = priceData?.price_type === "sale";

            return (
              <div key={product.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <Link href={`/products/${product.handle}`}>
                    <div className={`relative ${aspectRatioClasses[imageAspectRatio]} bg-gray-100`}>
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title || "Product"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Badges */}
                  {showBadges && isOnSale && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-red-500 text-white">
                        Sale
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {showWishlist && (
                      <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                        <Heart className="w-5 h-5" />
                      </button>
                    )}
                    {showCompare && (
                      <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                        <Eye className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Quick View */}
                  {showQuickView && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-full px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-100">
                        Quick View
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/products/${product.handle}`} className="block">
                    <h3 className="font-medium text-gray-900 hover:text-gray-700 truncate">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="mt-2 flex items-center gap-2">
                    {priceData && (
                      <>
                        <span className="text-lg font-semibold text-gray-900">
                          {priceData.calculated_price}
                        </span>
                        {isOnSale && priceData.original_price && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              {priceData.original_price}
                            </span>
                            {priceData.percentage_diff && (
                              <span className="text-xs text-red-600 font-medium">
                                {priceData.percentage_diff}
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // List Layout
    return (
      <div className="space-y-4">
        {products.map((product) => {
          const { cheapestPrice } = getProductPrice({ product });
          const priceData = cheapestPrice;
          const isOnSale = priceData?.price_type === "sale";

          return (
            <div key={product.id} className="group flex gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="relative flex-shrink-0">
                <Link href={`/products/${product.handle}`}>
                  <div className="relative w-32 h-32 bg-gray-100 rounded">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title || "Product"}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </Link>
                {showBadges && isOnSale && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-red-500 text-white">
                      Sale
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Link href={`/products/${product.handle}`}>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-gray-700">
                    {product.title}
                  </h3>
                </Link>

                <div className="mt-2 flex items-center gap-2">
                  {priceData && (
                    <>
                      <span className="text-xl font-semibold text-gray-900">
                        {priceData.calculated_price}
                      </span>
                      {isOnSale && priceData.original_price && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            {priceData.original_price}
                          </span>
                          {priceData.percentage_diff && (
                            <span className="text-xs text-red-600 font-medium">
                              {priceData.percentage_diff}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                {showQuickView && (
                  <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800">
                    Quick View
                  </button>
                )}
                {showWishlist && (
                  <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                    <Heart className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
