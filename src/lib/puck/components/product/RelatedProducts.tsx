import { ComponentConfig } from "@measured/puck";
import { HttpTypes } from "@medusajs/types";
import { listProducts } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import Link from "@/components/common/SafeLink";
import { ProductCarousel } from "../swiper/ProductCarousel";
import { ProductCard } from "../product-card/ProductCardRenderer";
import { getProductCardTemplateById } from "@lib/template";

export interface RelatedProductsProps {
  title: string;
  tagline: string;
  productsToShow: number;
  relatedBy: "collection" | "tags" | "category";
  displayStyle: "grid" | "carousel"; // NEW: Choose display style
  productCardTemplateId: string; // ID of PRODUCT_CARD template to use
  gridColumns: 2 | 3 | 4 | 5;
  showTitle: boolean;
  showTagline: boolean;
  containerPadding: "none" | "sm" | "md" | "lg";
}

export const RelatedProducts: ComponentConfig<RelatedProductsProps> = {
  label: "Related Products",

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
    showTagline: {
      type: "radio",
      label: "Show Tagline",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    tagline: {
      type: "textarea",
      label: "Tagline",
    },
    relatedBy: {
      type: "select",
      label: "Show Products Related By",
      options: [
        { label: "Same Collection", value: "collection" },
        { label: "Similar Tags", value: "tags" },
        { label: "Same Category", value: "category" },
      ],
    },
    displayStyle: {
      type: "select",
      label: "Display Style",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
      ],
    },
    productsToShow: {
      type: "number",
      label: "Number of Products",
    },
    productCardTemplateId: {
      type: "text",
      label: "Product Card Template ID (optional - uses default if empty)",
    },
    gridColumns: {
      type: "select",
      label: "Grid Columns",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
        { label: "5 Columns", value: 5 },
      ],
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
    title: "You Might Also Like",
    tagline: "Check out these related products",
    showTitle: true,
    showTagline: true,
    productsToShow: 8,
    relatedBy: "collection",
    displayStyle: "grid",
    productCardTemplateId: "",
    gridColumns: 4,
    containerPadding: "md",
  },

  render: async ({
    title,
    tagline,
    showTitle,
    showTagline,
    productsToShow,
    relatedBy,
    displayStyle,
    gridColumns,
    containerPadding,
    productCardTemplateId,
    puck,
  }) => {
    // Get product and region from Puck context
    const currentProduct = puck?.context?.product as HttpTypes.StoreProduct | undefined;
    const countryCode = puck?.context?.countryCode as string | undefined;
    const storeId = puck?.context?.storeId as string | undefined;

    if (!currentProduct || !countryCode) {
      return null; // No product context available
    }

    try {
      const region = await getRegion(countryCode);
      if (!region) {
        return null;
      }

      // Build query parameters based on relation type
      const queryParams: any = {
        region_id: region.id,
        limit: productsToShow + 1, // Fetch one extra to exclude current product
        fields: "*variants.calculated_price",
      };

      // Add relation-specific filters
      if (relatedBy === "collection" && currentProduct.collection_id) {
        queryParams.collection_id = [currentProduct.collection_id];
      } else if (relatedBy === "tags" && currentProduct.tags && currentProduct.tags.length > 0) {
        queryParams.tag_id = currentProduct.tags.map((tag) => tag.id);
      } else if (relatedBy === "category" && currentProduct.categories && currentProduct.categories.length > 0) {
        queryParams.category_id = [currentProduct.categories[0].id];
      }

      // Fetch related products
      const { products: allProducts } = await listProducts({
        queryParams,
        countryCode,
      });

      // Filter out current product and limit to requested number
      const relatedProducts = allProducts
        .filter((p) => p.id !== currentProduct.id)
        .slice(0, productsToShow);

      // If no related products found, don't show the section
      if (!relatedProducts || relatedProducts.length === 0) {
        return null;
      }

      // IF CAROUSEL MODE: Use ProductCarousel component with fetched products
      if (displayStyle === "carousel") {
        return (
          <ProductCarousel
            products={relatedProducts}
            sectionTitle={title}
            showTitle={showTitle}
            slidesPerView={4}
            slidesPerViewTablet={3}
            slidesPerViewMobile={1}
            spaceBetween={24}
            navigation={true}
            pagination={true}
            autoplay={false}
            loop={true}
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
            maxProducts={productsToShow}
            // Pass puck context so ProductCarousel has access to current product
            puck={puck}
          />
        );
      }

      // GRID MODE: Original grid layout
      const paddingClasses = {
        none: "",
        sm: "px-4 py-6",
        md: "px-6 py-12",
        lg: "px-8 py-16",
      };

      const gridColsClasses = {
        2: "grid-cols-2",
        3: "grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      };

      return (
        <div className={`w-full ${paddingClasses[containerPadding] || 'px-6 py-12'}`}>
          <div className="max-w-7xl mx-auto">
            {/* Title and Tagline */}
            <div className="flex flex-col items-center text-center mb-12">
              {showTitle && (
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  {title}
                </h2>
              )}
              {showTagline && (
                <p className="text-lg text-gray-600 max-w-2xl">
                  {tagline}
                </p>
              )}
            </div>

            {/* Related Products Grid */}
            <div className={`grid ${gridColsClasses[gridColumns] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-6`}>
              {await Promise.all(relatedProducts.map(async (product) => {
                // Fetch template if templateId provided
                let template = null;
                if (productCardTemplateId && storeId) {
                  template = await getProductCardTemplateById(storeId, productCardTemplateId);
                }

                // Transform template to ProductCardTemplate format
                if (template?.puckData?.root?.props) {
                  const templateProps = template.puckData.root.props;
                  const transformedTemplate = {
                    id: template.id || "product-card",
                    name: template.templateName || "Product Card",
                    type: "PRODUCT_CARD",
                    layout: templateProps.layout || 'vertical',
                    imageGallery: {
                      enabled: true,
                      showSwiper: templateProps.enableSwiper ?? false,
                      aspectRatio: templateProps.aspectRatio || 'square',
                      borderRadius: templateProps.borderRadius || 'md',
                      shadow: templateProps.showShadow ?? false,
                      hoverZoom: templateProps.hoverZoom ?? false,
                    },
                    title: {
                      show: templateProps.showTitle ?? true,
                      textSize: templateProps.titleSize || 'lg',
                      fontWeight: templateProps.titleWeight || 'semibold',
                      textAlign: templateProps.titleAlign || 'left',
                    },
                    price: {
                      show: templateProps.showPrice ?? true,
                      textSize: templateProps.priceSize || 'base',
                      priceColor: templateProps.priceColor || '#000000',
                      showCompareAt: templateProps.showCompareAtPrice ?? true,
                      showSavingsBadge: templateProps.showSavingsBadge ?? true,
                    },
                    badges: {
                      enabled: templateProps.showBadges ?? true,
                      showSale: templateProps.showSaleBadge ?? true,
                      showNew: templateProps.showNewBadge ?? false,
                      showLowStock: templateProps.showLowStockBadge ?? false,
                      position: templateProps.badgePosition || 'top-left',
                    },
                    addToCart: {
                      show: templateProps.showAddToCart ?? true, // Default to true
                      buttonText: templateProps.buttonText || 'Add to Cart',
                      buttonStyle: templateProps.buttonStyle || 'filled',
                      buttonSize: templateProps.buttonSize || 'md',
                      showIcon: templateProps.showCartIcon ?? true,
                    },
                    styling: {
                      cardRadius: templateProps.cardRadius || 'md',
                      cardBorder: templateProps.cardBorder || 'none',
                      cardShadow: templateProps.cardShadow ?? false,
                      cardBackground: templateProps.cardBackground || '#ffffff',
                      accentColor: templateProps.accentColor || '#000000',
                      fontFamily: templateProps.fontFamily || 'inherit',
                    },
                  };

                  const region = await getRegion(puck?.context?.countryCode as string || 'us');

                  return (
                    <div key={product.id} className="w-full max-w-full min-w-0 overflow-hidden">
                      <ProductCard 
                        product={product} 
                        region={region}
                        template={transformedTemplate}
                        countryCode={puck?.context?.countryCode as string || 'us'}
                      />
                    </div>
                  );
                }

                // Fallback: Simple product card without template
                return (
                  <Link key={product.id} href={`/products/${product.handle}`} className="block">
                    <div className="border rounded-lg p-4 hover:shadow-lg transition">
                      {product.thumbnail && (
                        <img src={product.thumbnail} alt={product.title} className="w-full aspect-square object-cover rounded mb-3" />
                      )}
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                      <p className="text-gray-600">View Product</p>
                    </div>
                  </Link>
                );
              }))}
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error fetching related products:", error);
      return null;
    }
  },
};
