'use client';

import { ComponentConfig } from "@measured/puck";
import { useCollectionProducts } from "@lib/hooks/useCollectionProducts";
import Image from "next/image";
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export interface CollectionHeaderProps {
  showTitle: boolean;
  showDescription: boolean;
  showBanner: boolean;
  showProductCount: boolean;
  titleSize: "2xl" | "3xl" | "4xl";
  alignment: "left" | "center" | "right";
  bannerHeight: "sm" | "md" | "lg";
}

export const CollectionHeader: ComponentConfig<CollectionHeaderProps> = {
  label: "Collection Header",

  fields: {
    showTitle: {
      type: "radio",
      label: "Show Collection Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showDescription: {
      type: "radio",
      label: "Show Description",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showBanner: {
      type: "radio",
      label: "Show Banner Image",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showProductCount: {
      type: "radio",
      label: "Show Product Count",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    titleSize: {
      type: "select",
      label: "Title Size",
      options: [
        { label: "2XL", value: "2xl" },
        { label: "3XL", value: "3xl" },
        { label: "4XL", value: "4xl" },
      ],
    },
    alignment: {
      type: "select",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    bannerHeight: {
      type: "select",
      label: "Banner Height",
      options: [
        { label: "Small (200px)", value: "sm" },
        { label: "Medium (300px)", value: "md" },
        { label: "Large (400px)", value: "lg" },
      ],
    },
  },

  defaultProps: {
    showTitle: true,
    showDescription: true,
    showBanner: true,
    showProductCount: true,
    titleSize: "3xl",
    alignment: "center",
    bannerHeight: "md",
  },

  render: ({
    showTitle,
    showDescription,
    showBanner,
    showProductCount,
    titleSize,
    alignment,
    bannerHeight,
  }: CollectionHeaderProps) => {
    const { collection, count, isLoading } = useCollectionProducts();

    if (isLoading) {
      return (
        <div className="mb-8 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      );
    }

    // Fallback if no collection data
    const collectionTitle = collection?.title || "Products";
    const collectionDescription = collection?.metadata?.description as string || "";
    const collectionBanner = collection?.metadata?.banner_image as string || "";
    const productCount = count || 0;

    const titleSizeClasses = {
      "2xl": "text-2xl md:text-3xl",
      "3xl": "text-3xl md:text-4xl",
      "4xl": "text-4xl md:text-5xl",
    };

    const alignmentClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const bannerHeightClasses = {
      sm: "h-48",
      md: "h-64",
      lg: "h-80",
    };

    return (
      <div className="mb-8">
        {/* Banner Image */}
        {showBanner && collectionBanner && (
          <div className={`relative ${bannerHeightClasses[bannerHeight]} mb-6 rounded-lg overflow-hidden`}>
            <Image
              src={collectionBanner}
              alt={collectionTitle}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Overlay Text */}
            <div className={`absolute inset-0 flex flex-col justify-end p-8 ${alignmentClasses[alignment]}`}>
              {showTitle && (
                <h1 className={`${titleSizeClasses[titleSize]} font-bold text-white mb-2`}>
                  {collectionTitle}
                </h1>
              )}
              {showProductCount && (
                <p className="text-white/90">
                  {productCount} products
                </p>
              )}
            </div>
          </div>
        )}

        {/* Text Content (without banner) */}
        {!showBanner && (
          <div className={alignmentClasses[alignment]}>
            {showTitle && (
              <h1 className={`${titleSizeClasses[titleSize]} font-bold text-gray-900 mb-4`}>
                {collectionTitle}
              </h1>
            )}
            {showDescription && collectionDescription && (
              <p className="text-gray-600 max-w-3xl mx-auto mb-4">
                {collectionDescription}
              </p>
            )}
            {showProductCount && (
              <p className="text-gray-500 text-sm">
                {productCount} products available
              </p>
            )}
          </div>
        )}

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mt-4">
          <a href="/" className="hover:text-gray-900">Home</a>
          <ChevronRightIcon className="w-4 h-4" />
          <a href="/collections" className="hover:text-gray-900">Collections</a>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{collectionTitle}</span>
        </nav>
      </div>
    );
  },
};
