'use client';

import React, { useState, useEffect } from 'react';
import { HttpTypes } from '@medusajs/types';
import ProductPreview from '@modules/products/components/product-preview';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CategoryProductsProps } from './CategoryProducts';

export function CategoryProductsClient(props: CategoryProductsProps) {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);
  const [region, setRegion] = useState<HttpTypes.StoreRegion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!props.categoryId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch via storefront API route (server-side proxy to Medusa)
        const params = new URLSearchParams({
          category_id: props.categoryId,
          limit: String(props.maxProducts || 12),
        });
        const res = await fetch(`/api/products?${params}`);
        const data = await res.json();

        setProducts(data.products || []);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [props.categoryId, props.maxProducts]);

  // Styling classes
  const cardStyleClasses = {
    minimal: 'bg-transparent',
    bordered: 'border border-gray-200 bg-white',
    shadow: 'bg-white shadow-lg',
  };

  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-lg',
    large: 'rounded-xl',
  };

  // Loading state
  if (loading) {
    return (
      <div
        className="category-products-section py-16"
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
          <div className="grid grid-cols-4 gap-6">
            {[...Array(props.maxProducts)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
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
        className="category-products-section py-16"
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

  // No products
  if (products.length === 0) {
    return (
      <div
        className="category-products-section py-16"
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
            <p>No products found in this category.</p>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  if (props.displayMode === 'grid') {
    return (
      <div
        className="category-products-section py-16"
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

          {/* Products Grid */}
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${props.productsPerRow}, minmax(0, 1fr))`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`${cardStyleClasses[props.cardStyle]} ${radiusClasses[props.borderRadius]} overflow-hidden`}
              >
                {region && (
                  <ProductPreview
                    product={product}
                    region={region}
                    isFeatured={false}
                  />
                )}
              </div>
            ))}
          </div>

          {/* View All Button */}
          {props.showViewAllButton && (
            <div className="text-center mt-12">
              <a
                href={`/categories/${props.categoryId}`}
                className="inline-block px-8 py-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: props.buttonColor,
                  color: props.buttonTextColor,
                }}
              >
                {props.viewAllButtonText}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Carousel Layout
  return (
    <div
      className="category-products-section py-16"
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

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={props.spaceBetween}
          slidesPerView={props.slidesPerViewMobile}
          navigation={props.navigation}
          pagination={props.pagination ? { clickable: true } : false}
          autoplay={props.autoplay ? { delay: props.autoplayDelay } : false}
          loop={props.loop}
          breakpoints={{
            640: {
              slidesPerView: props.slidesPerViewMobile,
            },
            768: {
              slidesPerView: props.slidesPerViewTablet,
            },
            1024: {
              slidesPerView: props.slidesPerView,
            },
          }}
          className="product-carousel"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className={`${cardStyleClasses[props.cardStyle]} ${radiusClasses[props.borderRadius]} overflow-hidden`}>
                {region && (
                  <ProductPreview
                    product={product}
                    region={region}
                    isFeatured={false}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Button */}
        {props.showViewAllButton && (
          <div className="text-center mt-12">
            <a
              href={`/categories/${props.categoryId}`}
              className="inline-block px-8 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: props.buttonColor,
                color: props.buttonTextColor,
              }}
            >
              {props.viewAllButtonText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
