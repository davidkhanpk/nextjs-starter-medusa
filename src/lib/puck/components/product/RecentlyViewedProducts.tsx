import { ComponentConfig } from "@measured/puck";
import { HttpTypes } from "@medusajs/types";
import { listProducts } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import { ProductCarousel } from "../swiper/ProductCarousel";

export interface RecentlyViewedProductsProps {
  title: string;
  showTitle: boolean;
  maxProducts: number;
  displayStyle: "grid" | "carousel";
  containerPadding: "none" | "sm" | "md" | "lg";
}

export const RecentlyViewedProducts: ComponentConfig<RecentlyViewedProductsProps> = {
  label: "Recently Viewed Products",

  fields: {
    showTitle: {
      type: "radio",
      label: "Show Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    title: {
      type: "text",
      label: "Title",
    },
    displayStyle: {
      type: "select",
      label: "Display Style",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
      ],
    },
    maxProducts: {
      type: "number",
      label: "Maximum Products to Show",
    },
    containerPadding: {
      type: "select",
      label: "Container Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  },

  defaultProps: {
    title: "Recently Viewed",
    showTitle: true,
    maxProducts: 8,
    displayStyle: "carousel",
    containerPadding: "md",
  },

  render: async ({
    title,
    showTitle,
    maxProducts,
    displayStyle,
    containerPadding,
    puck,
  }) => {
    const countryCode = puck?.context?.countryCode as string | undefined;

    if (!countryCode) {
      return null;
    }

    try {
      // Get recently viewed product IDs from cookies/session/local storage
      // For now, we'll get them from Puck context if available
      const recentlyViewedIds = puck?.context?.recentlyViewedIds as string[] | undefined;

      if (!recentlyViewedIds || recentlyViewedIds.length === 0) {
        return null; // No recently viewed products
      }

      const region = await getRegion(countryCode);
      if (!region) {
        return null;
      }

      // Fetch recently viewed products
      const queryParams: any = {
        region_id: region.id,
        id: recentlyViewedIds.slice(0, maxProducts), // Limit to maxProducts
        fields: "*variants.calculated_price",
      };

      const { products } = await listProducts({
        queryParams,
        countryCode,
      });

      if (!products || products.length === 0) {
        return null;
      }

      // Sort products to match the order of recentlyViewedIds
      const sortedProducts = recentlyViewedIds
        .map(id => products.find(p => p.id === id))
        .filter((p): p is HttpTypes.StoreProduct => p !== undefined);

      // IF CAROUSEL MODE: Use ProductCarousel component
      if (displayStyle === "carousel") {
        return (
          <ProductCarousel
            products={sortedProducts}
            sectionTitle={title}
            showTitle={showTitle}
            slidesPerView={4}
            slidesPerViewTablet={3}
            slidesPerViewMobile={1}
            spaceBetween={24}
            navigation={true}
            pagination={true}
            autoplay={false}
            loop={false} // Don't loop for recently viewed
            showProductImage={true}
            showProductTitle={true}
            showProductPrice={true}
            showAddToCart={true}
            backgroundColor="#ffffff"
            cardBackground="#ffffff"
            cardBorderRadius="lg"
            cardShadow={true}
            // Other carousel defaults
            effect="slide"
            speed={300}
            navigationColor="#000000"
            paginationType="bullets"
            paginationColor="#3b82f6"
            autoplayDelay={3000}
            pauseOnHover={true}
            centeredSlides={false}
            freeMode={false}
            imageAspectRatio="square"
            // Standalone mode props (not used since we provide products)
            productSource="manual"
            productIds=""
            collectionId=""
            categoryId=""
            maxProducts={maxProducts}
            // Pass puck context so ProductCarousel has access to product context
            puck={puck}
          />
        );
      }

      // GRID MODE: Simple grid layout
      const paddingClasses = {
        none: "",
        sm: "px-4 py-6",
        md: "px-6 py-12",
        lg: "px-8 py-16",
      };

      const getProductPrice = (product: HttpTypes.StoreProduct) => {
        const variant = product.variants?.[0];
        if (!variant) return null;
        
        const price = variant.calculated_price?.calculated_amount || 0;
        const compareAtPrice = variant.calculated_price?.original_amount;
        const isOnSale = compareAtPrice && compareAtPrice > price;
        
        return { price, compareAtPrice, isOnSale };
      };

      const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount / 100);
      };

      return (
        <div className={`w-full ${paddingClasses[containerPadding]}`}>
          <div className="max-w-7xl mx-auto">
            {showTitle && (
              <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                {title}
              </h2>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => {
                const priceInfo = getProductPrice(product);
                const image = product.thumbnail || product.images?.[0]?.url || "/placeholder.png";

                return (
                  <a
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={product.title || "Product"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {priceInfo?.isOnSale && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          Sale
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      {priceInfo && (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">
                            {formatPrice(priceInfo.price)}
                          </span>
                          {priceInfo.isOnSale && priceInfo.compareAtPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(priceInfo.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error fetching recently viewed products:", error);
      return null;
    }
  },
};
