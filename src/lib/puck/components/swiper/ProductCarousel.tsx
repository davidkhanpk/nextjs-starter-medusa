import { ComponentConfig } from "@measured/puck";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip } from 'swiper/modules';
import { HttpTypes } from "@medusajs/types";
import { listProducts } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import Link from "@/components/common/SafeLink";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-flip';

export interface ProductCarouselProps {
  // External products (provided by parent component like RelatedProducts)
  products?: HttpTypes.StoreProduct[];
  
  // If products not provided, use these options to fetch
  // Content
  sectionTitle: string;
  showTitle: boolean;
  
  // Product Selection
  productSource: "manual" | "collection" | "category" | "featured" | "bestsellers";
  productIds: string;
  collectionId: string;
  categoryId: string;
  maxProducts: number;
  
  // Carousel Configuration
  slidesPerView: number;
  slidesPerViewTablet: number;
  slidesPerViewMobile: number;
  spaceBetween: number;
  
  // Effects
  effect: "slide" | "fade" | "cube" | "coverflow" | "flip";
  speed: number;
  
  // Navigation
  navigation: boolean;
  navigationColor: string;
  
  // Pagination
  pagination: boolean;
  paginationType: "bullets" | "fraction" | "progressbar";
  paginationColor: string;
  
  // Autoplay
  autoplay: boolean;
  autoplayDelay: number;
  pauseOnHover: boolean;
  
  // Behavior
  loop: boolean;
  centeredSlides: boolean;
  freeMode: boolean;
  
  // Product Display
  showProductImage: boolean;
  showProductTitle: boolean;
  showProductPrice: boolean;
  showAddToCart: boolean;
  imageAspectRatio: "square" | "portrait" | "landscape";
  
  // Styling
  backgroundColor: string;
  cardBackground: string;
  cardBorderRadius: "none" | "sm" | "md" | "lg" | "xl";
  cardShadow: boolean;
}

export const ProductCarousel: ComponentConfig<ProductCarouselProps> = {
  label: "Product Carousel (Swiper)",
  
  fields: {
    // Section
    sectionTitle: {
      type: "text",
      label: "Section Title",
    },
    showTitle: {
      type: "radio",
      label: "Show Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Product Selection
    productSource: {
      type: "select",
      label: "Product Source",
      options: [
        { label: "Manual Selection", value: "manual" },
        { label: "From Collection", value: "collection" },
        { label: "From Category", value: "category" },
        { label: "Featured Products", value: "featured" },
        { label: "Best Sellers", value: "bestsellers" },
      ],
    },
    productIds: {
      type: "textarea",
      label: "Product IDs (comma-separated)",
    },
    collectionId: {
      type: "text",
      label: "Collection ID (optional on product pages)",
    },
    categoryId: {
      type: "text",
      label: "Category ID (optional on product pages)",
    },
    maxProducts: {
      type: "number",
      label: "Maximum Products",
      min: 1,
      max: 50,
    },
    
    // Carousel Configuration
    slidesPerView: {
      type: "number",
      label: "Slides Per View (Desktop)",
      min: 1,
      max: 8,
    },
    slidesPerViewTablet: {
      type: "number",
      label: "Slides Per View (Tablet)",
      min: 1,
      max: 6,
    },
    slidesPerViewMobile: {
      type: "number",
      label: "Slides Per View (Mobile)",
      min: 1,
      max: 3,
    },
    spaceBetween: {
      type: "number",
      label: "Space Between Slides (px)",
      min: 0,
      max: 100,
    },
    
    // Effects
    effect: {
      type: "select",
      label: "Transition Effect",
      options: [
        { label: "Slide", value: "slide" },
        { label: "Fade", value: "fade" },
        { label: "Cube", value: "cube" },
        { label: "Coverflow", value: "coverflow" },
        { label: "Flip", value: "flip" },
      ],
    },
    speed: {
      type: "number",
      label: "Transition Speed (ms)",
      min: 100,
      max: 2000,
    },
    
    // Navigation
    navigation: {
      type: "radio",
      label: "Show Navigation Arrows",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    navigationColor: {
      type: "text",
      label: "Navigation Color (hex)",
    },
    
    // Pagination
    pagination: {
      type: "radio",
      label: "Show Pagination",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    paginationType: {
      type: "select",
      label: "Pagination Type",
      options: [
        { label: "Bullets", value: "bullets" },
        { label: "Fraction (1/10)", value: "fraction" },
        { label: "Progress Bar", value: "progressbar" },
      ],
    },
    paginationColor: {
      type: "text",
      label: "Pagination Color (hex)",
    },
    
    // Autoplay
    autoplay: {
      type: "radio",
      label: "Autoplay",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    autoplayDelay: {
      type: "number",
      label: "Autoplay Delay (ms)",
      min: 1000,
      max: 10000,
    },
    pauseOnHover: {
      type: "radio",
      label: "Pause on Hover",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Behavior
    loop: {
      type: "radio",
      label: "Loop",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    centeredSlides: {
      type: "radio",
      label: "Center Slides",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    freeMode: {
      type: "radio",
      label: "Free Mode (continuous sliding)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    
    // Product Display
    showProductImage: {
      type: "radio",
      label: "Show Product Image",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showProductTitle: {
      type: "radio",
      label: "Show Product Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showProductPrice: {
      type: "radio",
      label: "Show Product Price",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showAddToCart: {
      type: "radio",
      label: "Show Add to Cart",
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
    
    // Styling
    backgroundColor: {
      type: "text",
      label: "Background Color (hex)",
    },
    cardBackground: {
      type: "text",
      label: "Card Background (hex)",
    },
    cardBorderRadius: {
      type: "select",
      label: "Card Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    cardShadow: {
      type: "radio",
      label: "Card Shadow",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },
  
  defaultProps: {
    sectionTitle: "Popular Products",
    showTitle: true,
    productSource: "featured",
    productIds: "",
    collectionId: "",
    categoryId: "",
    maxProducts: 12,
    slidesPerView: 4,
    slidesPerViewTablet: 3,
    slidesPerViewMobile: 1,
    spaceBetween: 24,
    effect: "slide",
    speed: 600,
    navigation: true,
    navigationColor: "#000000",
    pagination: true,
    paginationType: "bullets",
    paginationColor: "#3b82f6",
    autoplay: false,
    autoplayDelay: 3000,
    pauseOnHover: true,
    loop: true,
    centeredSlides: false,
    freeMode: false,
    showProductImage: true,
    showProductTitle: true,
    showProductPrice: true,
    showAddToCart: true,
    imageAspectRatio: "square",
    backgroundColor: "#ffffff",
    cardBackground: "#ffffff",
    cardBorderRadius: "lg",
    cardShadow: true,
  },
  
  render: async (props) => {
    const { puck } = props;
    let displayProducts: HttpTypes.StoreProduct[] = [];

    // PRIORITY 1: Use products passed from parent component (e.g., RelatedProducts)
    if (props.products && props.products.length > 0) {
      displayProducts = props.products;
    }
    // PRIORITY 2: Fetch products if standalone mode
    else if (puck?.context?.countryCode) {
      const countryCode = puck.context.countryCode as string;
      
      // Get current product from context (if on product page)
      const currentProduct = puck?.context?.product as HttpTypes.StoreProduct | undefined;
      
      try {
        const region = await getRegion(countryCode);
        if (region) {
          const queryParams: any = {
            region_id: region.id,
            limit: props.maxProducts,
            fields: "*variants.calculated_price",
          };

          // Fetch based on product source
          if (props.productSource === "manual" && props.productIds) {
            // Manual selection: get specific products by IDs
            const ids = props.productIds.split(',').map(id => id.trim()).filter(Boolean);
            if (ids.length > 0) {
              queryParams.id = ids;
            }
          } else if (props.productSource === "collection") {
            // Use provided collectionId OR current product's collection
            const collectionId = props.collectionId || currentProduct?.collection_id;
            if (collectionId) {
              queryParams.collection_id = [collectionId];
              
              // If using current product's collection, exclude current product
              if (!props.collectionId && currentProduct) {
                // We'll filter it out after fetching
              }
            }
          } else if (props.productSource === "category") {
            // Use provided categoryId OR current product's first category
            const categoryId = props.categoryId || currentProduct?.categories?.[0]?.id;
            if (categoryId) {
              queryParams.category_id = [categoryId];
              
              // If using current product's category, exclude current product
              if (!props.categoryId && currentProduct) {
                // We'll filter it out after fetching
              }
            }
          } else if (props.productSource === "featured") {
            // Fetch featured products (products with metadata.featured = true)
            queryParams.metadata = { featured: true };
          } else if (props.productSource === "bestsellers") {
            // Fetch bestsellers - could use sales count or metadata
            // For now, just fetch products sorted by sales or popularity
            // You'd implement this based on your Medusa setup
          }

          const { products } = await listProducts({
            queryParams,
            countryCode,
          });
          
          // Filter out current product if we're using its collection/category
          if (currentProduct && (
            (props.productSource === "collection" && !props.collectionId) ||
            (props.productSource === "category" && !props.categoryId)
          )) {
            displayProducts = products?.filter(p => p.id !== currentProduct.id) || [];
          } else {
            displayProducts = products || [];
          }
        }
      } catch (error) {
        console.error("Failed to fetch products for carousel:", error);
        displayProducts = [];
      }
    }

    // If no products, don't render anything
    if (!displayProducts || displayProducts.length === 0) {
      return null;
    }

    // Helper to get product price
    const getProductPrice = (product: HttpTypes.StoreProduct) => {
      const variant = product.variants?.[0];
      if (!variant) return null;
      
      const price = variant.calculated_price?.calculated_amount || 0;
      const compareAtPrice = variant.calculated_price?.original_amount;
      const isOnSale = compareAtPrice && compareAtPrice > price;
      
      return { price, compareAtPrice, isOnSale };
    };

    // Helper to format price
    const formatPrice = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount / 100);
    };
    
    const aspectRatioClasses = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
    };
    
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };
    
    return (
      <div className="product-carousel-section py-8" style={{ backgroundColor: props.backgroundColor }}>
        <div className="container mx-auto px-4">
          {props.showTitle && (
            <h2 className="text-3xl font-bold mb-6">{props.sectionTitle}</h2>
          )}
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip]}
            slidesPerView={props.slidesPerViewMobile}
            spaceBetween={props.spaceBetween}
            speed={props.speed}
            effect={props.effect}
            navigation={props.navigation}
            pagination={
              props.pagination
                ? {
                    type: props.paginationType,
                    clickable: true,
                  }
                : false
            }
            autoplay={
              props.autoplay
                ? {
                    delay: props.autoplayDelay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: props.pauseOnHover,
                  }
                : false
            }
            loop={props.loop}
            centeredSlides={props.centeredSlides}
            freeMode={props.freeMode}
            breakpoints={{
              640: {
                slidesPerView: props.slidesPerViewTablet,
              },
              1024: {
                slidesPerView: props.slidesPerView,
              },
            }}
            className="product-carousel"
          >
            {displayProducts.map((product) => {
              const priceInfo = getProductPrice(product);
              const image = product.thumbnail || product.images?.[0]?.url || "/placeholder.png";
              
              return (
                <SwiperSlide key={product.id}>
                  <Link href={`/products/${product.handle}`} className="block">
                    <div
                      className={`product-card p-4 ${radiusClasses[props.cardBorderRadius]} ${props.cardShadow ? "shadow-lg" : ""} hover:shadow-xl transition-shadow`}
                      style={{ backgroundColor: props.cardBackground }}
                    >
                      {props.showProductImage && (
                        <div className={`${aspectRatioClasses[props.imageAspectRatio]} overflow-hidden ${radiusClasses[props.cardBorderRadius]} mb-3 relative`}>
                          <img
                            src={image}
                            alt={product.title || "Product"}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                          {priceInfo?.isOnSale && (
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                              Sale
                            </span>
                          )}
                        </div>
                      )}
                      
                      {props.showProductTitle && (
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                      )}
                      
                      {props.showProductPrice && priceInfo && (
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-xl font-bold">
                            {formatPrice(priceInfo.price)}
                          </p>
                          {priceInfo.isOnSale && priceInfo.compareAtPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatPrice(priceInfo.compareAtPrice)}
                            </p>
                          )}
                        </div>
                      )}
                      
                      {props.showAddToCart && (
                        <button 
                          className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic would go here
                            console.log("Add to cart:", product.id);
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        
        <style jsx>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: ${props.navigationColor} !important;
          }
          .swiper-pagination-bullet-active {
            background-color: ${props.paginationColor} !important;
          }
          .swiper-pagination-progressbar-fill {
            background-color: ${props.paginationColor} !important;
          }
        `}</style>
      </div>
    );
  },
};

export default ProductCarousel;
