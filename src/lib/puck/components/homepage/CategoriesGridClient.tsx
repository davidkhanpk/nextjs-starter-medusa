'use client';

import React, { useState, useEffect } from 'react';
import { HttpTypes } from '@medusajs/types';
import { CategoriesGridProps } from './CategoriesGrid';

export function CategoriesGridClient(props: CategoriesGridProps) {
  const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);

      try {
        // Fetch via storefront API route (server-side proxy to Medusa)
        const countryCode = window.location.pathname.split('/')[1] || 'us';
        const res = await fetch(`/${countryCode}/api/categories`);
        const data = await res.json();
        let fetchedCategories: HttpTypes.StoreProductCategory[] = data.product_categories || [];

        if (props.categorySource === 'manual' && props.categoryIds) {
          // Parse manual category IDs
          const ids = props.categoryIds.split(',').map(id => id.trim()).filter(Boolean);
          if (ids.length > 0) {
            fetchedCategories = fetchedCategories.filter(cat => ids.includes(cat.id));
          }
        } else if (props.categorySource === 'featured') {
          // Filter featured categories
          fetchedCategories = fetchedCategories.filter(
            cat => (cat.metadata as any)?.is_featured === true
          );
        }

        setCategories(fetchedCategories);
      } catch (err: any) {
        console.error('Error fetching categories:', err);
        setError(err.message || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [props.categorySource, props.categoryIds]);

  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
  };

  const radiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const hoverEffectClasses = {
    none: '',
    scale: 'hover:scale-105',
    shadow: 'hover:shadow-xl',
    lift: 'hover:-translate-y-2',
  };

  const cardStyleClasses = {
    minimal: 'bg-transparent',
    bordered: 'bg-white border-2 border-gray-200',
    shadow: 'bg-white shadow-lg',
    overlay: 'relative overflow-hidden',
  };

  // Loading state
  if (loading) {
    return (
      <div
        className="categories-grid-section py-16"
        style={{ backgroundColor: props.backgroundColor }}
      >
        <div className="container mx-auto px-4">
          {props.showTitle && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2" style={{ color: props.textColor }}>
                {props.sectionTitle}
              </h2>
              {props.sectionSubtitle && (
                <p className="text-lg opacity-80" style={{ color: props.textColor }}>
                  {props.sectionSubtitle}
                </p>
              )}
            </div>
          )}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
              gap: `${props.gap}px`,
            }}
          >
            {[...Array(props.columns * 2)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="categories-grid-section py-16"
        style={{ backgroundColor: props.backgroundColor }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No categories
  if (categories.length === 0) {
    return (
      <div
        className="categories-grid-section py-16"
        style={{ backgroundColor: props.backgroundColor }}
      >
        <div className="container mx-auto px-4">
          {props.showTitle && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2" style={{ color: props.textColor }}>
                {props.sectionTitle}
              </h2>
            </div>
          )}
          <div className="text-center" style={{ color: props.textColor }}>
            <p>No categories found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="categories-grid-section py-16"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {props.showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2" style={{ color: props.textColor }}>
              {props.sectionTitle}
            </h2>
            {props.sectionSubtitle && (
              <p className="text-lg opacity-80" style={{ color: props.textColor }}>
                {props.sectionSubtitle}
              </p>
            )}
          </div>
        )}

        {/* Categories Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
            gap: `${props.gap}px`,
          }}
        >
          {categories.map((category) => {
            // Get category image from metadata or use placeholder
            const categoryImage =
              (category.metadata as any)?.image ||
              `https://via.placeholder.com/400x400?text=${encodeURIComponent(category.name)}`;

            // Get product count
            const productCount = category.products?.length || 0;

            return (
              <a
                key={category.id}
                href={`/categories/${category.handle}`}
                className={`category-card ${cardStyleClasses[props.cardStyle]} ${radiusClasses[props.borderRadius]} ${hoverEffectClasses[props.hoverEffect]} transition-all duration-300 overflow-hidden group cursor-pointer`}
              >
                {/* Category Image */}
                {props.showCategoryImage && (
                  <div
                    className={`${aspectRatioClasses[props.imageAspectRatio]} overflow-hidden`}
                  >
                    <img
                      src={categoryImage}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {props.cardStyle === 'overlay' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    )}
                  </div>
                )}

                {/* Category Info */}
                <div
                  className={`p-4 ${
                    props.cardStyle === 'overlay'
                      ? 'absolute bottom-0 left-0 right-0 text-white'
                      : ''
                  }`}
                >
                  {props.showCategoryName && (
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{
                        color:
                          props.cardStyle === 'overlay' ? '#ffffff' : props.textColor,
                      }}
                    >
                      {category.name}
                    </h3>
                  )}
                  {props.showProductCount && (
                    <p
                      className="text-sm opacity-80"
                      style={{
                        color:
                          props.cardStyle === 'overlay' ? '#ffffff' : props.textColor,
                      }}
                    >
                      {productCount} products
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
