import { Config } from "@measured/puck";

// Import layout components
import { Container } from "./components/layout/Container";
import { Section } from "./components/layout/Section";
import { Columns } from "./components/layout/Columns";
import { FlexRow } from "./components/layout/FlexRow";
import { FlexColumn } from "./components/layout/FlexColumn";

// Import content components
import { Heading } from "./components/content/Heading";
import { Text } from "./components/content/Text";
import { Button } from "./components/content/Button";
import { Image } from "./components/content/Image";
import { Video } from "./components/content/Video";

// Import product components
import { ProductCard } from "./components/product/ProductCard";
import { ProductTitle } from "./components/product/ProductTitle";
import { ProductPrice } from "./components/product/ProductPrice";
import { AddToCart } from "./components/product/AddToCart";
import { RelatedProducts } from "./components/product/RelatedProducts";
import { RecentlyViewedProducts } from "./components/product/RecentlyViewedProducts";
import { ProductVariantSelector } from "./components/product/ProductVariantSelector";
import { ProductImageGallery } from "./components/product/ProductImageGallery";
import { ProductDescription } from "./components/product/ProductDescription";
import { ProductAccordion } from "./components/product/ProductAccordion";
import { QuantitySelector } from "./components/product/QuantitySelector";
import { ProductBreadcrumbs } from "./components/product/ProductBreadcrumbs";
import { ProductMetadata } from "./components/product/ProductMetadata";
import { StockIndicator } from "./components/product/StockIndicator";
import { WishlistButton } from "./components/product/WishlistButton";
import { ProductReviews } from "./components/product/ProductReviews";

// Import homepage components
import { HeroSection } from "./components/homepage/HeroSection";
import { FeaturedProducts } from "./components/homepage/FeaturedProducts";
import { CategoriesGrid } from "./components/homepage/CategoriesGrid";
import { CategoryProducts } from "./components/homepage/CategoryProducts";
import { Testimonials } from "./components/homepage/Testimonials";
import { Newsletter } from "./components/homepage/Newsletter";
import { CustomHTML } from "./components/homepage/CustomHTML";
import { TrustBadges } from "./components/homepage/TrustBadges";
import { PromotionalBannerGrid } from "./components/homepage/PromotionalBannerGrid";
import { CountdownTimer } from "./components/homepage/CountdownTimer";
import { StatsSection } from "./components/homepage/StatsSection";

// Import swiper components
import { ProductCarousel } from "./components/swiper/ProductCarousel";
import { TestimonialCarousel } from "./components/swiper/TestimonialCarousel";
import { LogoCarousel } from "./components/swiper/LogoCarousel";
import { ContentSlider } from "./components/swiper/ContentSlider";

// Import product image gallery components
import { ImageGallery } from "./components/swiper/ImageGallery";
import { ImageGalleryMinimal } from "./components/product-image-gallery/ImageGalleryMinimal";
import { ImageGalleryZoom } from "./components/product-image-gallery/ImageGalleryZoom";
import { ImageGalleryFullscreen } from "./components/product-image-gallery/ImageGalleryFullscreen";

// Import cart components
import { CartItems } from "./components/cart/CartItems";
import { CartSummary } from "./components/cart/CartSummary";
import { EmptyCart } from "./components/cart/EmptyCart";
import { SignInPrompt } from "./components/cart/SignInPrompt";
import { CheckoutForm } from "./components/cart/CheckoutForm";
import { OrderSummary } from "./components/cart/OrderSummary";

// Import checkout components
import { ShippingAddress } from "./components/checkout/ShippingAddress";
import { ShippingMethod } from "./components/checkout/ShippingMethod";
import { PaymentMethod } from "./components/checkout/PaymentMethod";
import { OrderReview } from "./components/checkout/OrderReview";
import { CartItemsPreview } from "./components/checkout/CartItemsPreview";
import { DiscountCode } from "./components/checkout/DiscountCode";
import { OrderTotals } from "./components/checkout/OrderTotals";

// Import collection components
import { ProductGrid } from "./components/collection/ProductGrid";
import { ProductFilters } from "./components/collection/ProductFilters";
import { ProductSort } from "./components/collection/ProductSort";
import { Pagination } from "./components/collection/Pagination";
import { CollectionHeader } from "./components/collection/CollectionHeader";
import { CollectionTitle } from "./components/collection/CollectionTitle";
import { CollectionDescription } from "./components/collection/CollectionDescription";
import { CollectionBreadcrumbs } from "./components/collection/CollectionBreadcrumbs";
import { CollectionMetadata } from "./components/collection/CollectionMetadata";

// Import category components
import { CategoryTitle } from "./components/category/CategoryTitle";
import { CategoryDescription } from "./components/category/CategoryDescription";
import { CategoryBreadcrumbs } from "./components/category/CategoryBreadcrumbs";
import { CategoryMetadata } from "./components/category/CategoryMetadata";
import { CategoryProductsGrid } from "./components/category/CategoryProductsGrid";

// Import order components
import { OrderConfirmation } from "./components/order/OrderConfirmation";
import { OrderDetails } from "./components/order/OrderDetails";
import { OrderTimeline } from "./components/order/OrderTimeline";
import { OrderActions } from "./components/order/OrderActions";

// Import account components
import { AccountProfile } from "./components/account/AccountProfile";
import { AddressBook } from "./components/account/AddressBook";
import { OrderHistory } from "./components/account/OrderHistory";

// Import navigation components
import { MenuNavigation } from "./components/navigation/MenuNavigation";
import { Logo } from "./components/navigation/Logo";
import { SearchBar } from "./components/navigation/SearchBar";
import { SearchIcon } from "./components/navigation/SearchIcon";
import { CartButton } from "./components/navigation/CartButton";
import { AccountButton } from "./components/navigation/AccountButton";

// Import footer components
import { Copyright } from "./components/footer/Copyright";
import { SocialIcons } from "./components/footer/SocialIcons";
import { ContactInfo } from "./components/footer/ContactInfo";

// Import generic components
import { Icon } from "./components/generic/Icon";
import { Grid } from "./components/generic/Grid";
import { Card } from "./components/generic/Card";
import { Spacer } from "./components/generic/Spacer";
import { Alert } from "./components/generic/Alert";
import { Badge } from "./components/generic/Badge";
import { Tabs } from "./components/generic/Tabs";
import { Accordion } from "./components/generic/Accordion";

// Component categories
export const COMPONENT_CATEGORIES = {
  LAYOUT: "layout",
  CONTENT: "content",
  PRODUCT: "product",
  CATEGORY: "category",
  HOMEPAGE: "homepage",
  SWIPER: "swiper",
  PRODUCT_IMAGE_GALLERY: "product-image-gallery",
  CART: "cart",
  CHECKOUT: "checkout",
  COLLECTION: "collection",
  ORDER: "order",
  ACCOUNT: "account",
  NAVIGATION: "navigation",
  FOOTER: "footer",
  GENERIC: "generic",
} as const;

// Template type to allowed component categories mapping
export const TEMPLATE_COMPONENT_MAP: Record<string, string[]> = {
  HOMEPAGE: ["layout", "content", "homepage", "swiper", "generic"],
  PRODUCT_PAGE: ["layout", "content", "product", "swiper", "product-image-gallery", "generic"],
  COLLECTION_PAGE: ["layout", "content", "collection", "swiper", "generic"],
  CATEGORY_PAGE: ["layout", "content", "category", "collection", "swiper", "generic"],
  CART_PAGE: ["layout", "content", "cart", "generic"],
  CHECKOUT_PAGE: ["layout", "content", "cart", "checkout", "generic"],
  ORDER_CONFIRMATION_PAGE: ["layout", "content", "order", "generic"],
  ACCOUNT_PAGE: ["layout", "content", "account", "generic"],
  HEADER: ["layout", "navigation", "generic"],
  FOOTER: ["layout", "navigation", "footer", "content", "generic"],
  SIDEBAR: ["layout", "navigation", "footer", "content", "generic"],
  PRODUCT_CARD: ["layout", "product", "generic"],
};

// All available components with their categories
const ALL_COMPONENTS = {
  // Layout components
  Container: { ...Container, category: COMPONENT_CATEGORIES.LAYOUT },
  Section: { ...Section, category: COMPONENT_CATEGORIES.LAYOUT },
  Columns: { ...Columns, category: COMPONENT_CATEGORIES.LAYOUT },
  FlexRow: { ...FlexRow, category: COMPONENT_CATEGORIES.LAYOUT },
  FlexColumn: { ...FlexColumn, category: COMPONENT_CATEGORIES.LAYOUT },
  
  // Content components
  Heading: { ...Heading, category: COMPONENT_CATEGORIES.CONTENT },
  Text: { ...Text, category: COMPONENT_CATEGORIES.CONTENT },
  Button: { ...Button, category: COMPONENT_CATEGORIES.CONTENT },
  Image: { ...Image, category: COMPONENT_CATEGORIES.CONTENT },
  Video: { ...Video, category: COMPONENT_CATEGORIES.CONTENT },
  
  // Product components
  ProductCard: { ...ProductCard, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductTitle: { ...ProductTitle, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductPrice: { ...ProductPrice, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductVariantSelector: { ...ProductVariantSelector, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductImageGallery: { ...ProductImageGallery, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductDescription: { ...ProductDescription, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductAccordion: { ...ProductAccordion, category: COMPONENT_CATEGORIES.PRODUCT },
  AddToCart: { ...AddToCart, category: COMPONENT_CATEGORIES.PRODUCT },
  RelatedProducts: { ...RelatedProducts, category: COMPONENT_CATEGORIES.PRODUCT },
  RecentlyViewedProducts: { ...RecentlyViewedProducts, category: COMPONENT_CATEGORIES.PRODUCT },
  QuantitySelector: { ...QuantitySelector, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductBreadcrumbs: { ...ProductBreadcrumbs, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductMetadata: { ...ProductMetadata, category: COMPONENT_CATEGORIES.PRODUCT },
  StockIndicator: { ...StockIndicator, category: COMPONENT_CATEGORIES.PRODUCT },
  WishlistButton: { ...WishlistButton, category: COMPONENT_CATEGORIES.PRODUCT },
  ProductReviews: { ...ProductReviews, category: COMPONENT_CATEGORIES.PRODUCT },
  
  // Homepage components
  HeroSection: { ...HeroSection, category: COMPONENT_CATEGORIES.HOMEPAGE },
  FeaturedProducts: { ...FeaturedProducts, category: COMPONENT_CATEGORIES.HOMEPAGE },
  CategoriesGrid: { ...CategoriesGrid, category: COMPONENT_CATEGORIES.HOMEPAGE },
  CategoryProducts: { ...CategoryProducts, category: COMPONENT_CATEGORIES.HOMEPAGE },
  Testimonials: { ...Testimonials, category: COMPONENT_CATEGORIES.HOMEPAGE },
  Newsletter: { ...Newsletter, category: COMPONENT_CATEGORIES.HOMEPAGE },
  CustomHTML: { ...CustomHTML, category: COMPONENT_CATEGORIES.CONTENT },
  TrustBadges: { ...TrustBadges, category: COMPONENT_CATEGORIES.HOMEPAGE },
  PromotionalBannerGrid: { ...PromotionalBannerGrid, category: COMPONENT_CATEGORIES.HOMEPAGE },
  CountdownTimer: { ...CountdownTimer, category: COMPONENT_CATEGORIES.HOMEPAGE },
  StatsSection: { ...StatsSection, category: COMPONENT_CATEGORIES.HOMEPAGE },
  
  // Swiper components
  ProductCarousel: { ...ProductCarousel, category: COMPONENT_CATEGORIES.SWIPER },
  TestimonialCarousel: { ...TestimonialCarousel, category: COMPONENT_CATEGORIES.SWIPER },
  LogoCarousel: { ...LogoCarousel, category: COMPONENT_CATEGORIES.SWIPER },
  ContentSlider: { ...ContentSlider, category: COMPONENT_CATEGORIES.SWIPER },
  
  // Product Image Gallery components
  ImageGallery: { ...ImageGallery, category: COMPONENT_CATEGORIES.PRODUCT_IMAGE_GALLERY },
  ImageGalleryMinimal: { ...ImageGalleryMinimal, category: COMPONENT_CATEGORIES.PRODUCT_IMAGE_GALLERY },
  ImageGalleryZoom: { ...ImageGalleryZoom, category: COMPONENT_CATEGORIES.PRODUCT_IMAGE_GALLERY },
  ImageGalleryFullscreen: { ...ImageGalleryFullscreen, category: COMPONENT_CATEGORIES.PRODUCT_IMAGE_GALLERY },
  
  // Cart components
  CartItems: { ...CartItems, category: COMPONENT_CATEGORIES.CART },
  CartSummary: { ...CartSummary, category: COMPONENT_CATEGORIES.CART },
  EmptyCart: { ...EmptyCart, category: COMPONENT_CATEGORIES.CART },
  OrderSummary: { ...OrderSummary, category: COMPONENT_CATEGORIES.CART },
  
  // Checkout components
  CheckoutForm: { ...CheckoutForm, category: COMPONENT_CATEGORIES.CHECKOUT },
  ShippingAddress: { ...ShippingAddress, category: COMPONENT_CATEGORIES.CHECKOUT },
  ShippingMethod: { ...ShippingMethod, category: COMPONENT_CATEGORIES.CHECKOUT },
  PaymentMethod: { ...PaymentMethod, category: COMPONENT_CATEGORIES.CHECKOUT },
  OrderReview: { ...OrderReview, category: COMPONENT_CATEGORIES.CHECKOUT },
  CartItemsPreview: { ...CartItemsPreview, category: COMPONENT_CATEGORIES.CHECKOUT },
  DiscountCode: { ...DiscountCode, category: COMPONENT_CATEGORIES.CHECKOUT },
  OrderTotals: { ...OrderTotals, category: COMPONENT_CATEGORIES.CHECKOUT },
  
  // Collection components
  ProductGrid: { ...ProductGrid, category: COMPONENT_CATEGORIES.COLLECTION },
  ProductFilters: { ...ProductFilters, category: COMPONENT_CATEGORIES.COLLECTION },
  ProductSort: { ...ProductSort, category: COMPONENT_CATEGORIES.COLLECTION },
  Pagination: { ...Pagination, category: COMPONENT_CATEGORIES.COLLECTION },
  CollectionHeader: { ...CollectionHeader, category: COMPONENT_CATEGORIES.COLLECTION },
  CollectionTitle: { ...CollectionTitle, category: COMPONENT_CATEGORIES.COLLECTION },
  CollectionDescription: { ...CollectionDescription, category: COMPONENT_CATEGORIES.COLLECTION },
  CollectionBreadcrumbs: { ...CollectionBreadcrumbs, category: COMPONENT_CATEGORIES.COLLECTION },
  CollectionMetadata: { ...CollectionMetadata, category: COMPONENT_CATEGORIES.COLLECTION },
  
  // Category components
  CategoryTitle: { ...CategoryTitle, category: COMPONENT_CATEGORIES.CATEGORY },
  CategoryDescription: { ...CategoryDescription, category: COMPONENT_CATEGORIES.CATEGORY },
  CategoryBreadcrumbs: { ...CategoryBreadcrumbs, category: COMPONENT_CATEGORIES.CATEGORY },
  CategoryMetadata: { ...CategoryMetadata, category: COMPONENT_CATEGORIES.CATEGORY },
  CategoryProductsGrid: { ...CategoryProductsGrid, category: COMPONENT_CATEGORIES.CATEGORY },
  
  // Order components
  OrderConfirmation: { ...OrderConfirmation, category: COMPONENT_CATEGORIES.ORDER },
  OrderDetails: { ...OrderDetails, category: COMPONENT_CATEGORIES.ORDER },
  OrderTimeline: { ...OrderTimeline, category: COMPONENT_CATEGORIES.ORDER },
  OrderActions: { ...OrderActions, category: COMPONENT_CATEGORIES.ORDER },
  
  // Account components
  AccountProfile: { ...AccountProfile, category: COMPONENT_CATEGORIES.ACCOUNT },
  AddressBook: { ...AddressBook, category: COMPONENT_CATEGORIES.ACCOUNT },
  OrderHistory: { ...OrderHistory, category: COMPONENT_CATEGORIES.ACCOUNT },
  
  // Navigation components
  MenuNavigation: { ...MenuNavigation, category: COMPONENT_CATEGORIES.NAVIGATION },
  Logo: { ...Logo, category: COMPONENT_CATEGORIES.NAVIGATION },
  SearchBar: { ...SearchBar, category: COMPONENT_CATEGORIES.NAVIGATION },
  SearchIcon: { ...SearchIcon, category: COMPONENT_CATEGORIES.NAVIGATION },
  CartButton: { ...CartButton, category: COMPONENT_CATEGORIES.NAVIGATION },
  AccountButton: { ...AccountButton, category: COMPONENT_CATEGORIES.NAVIGATION },
  
  // Footer components
  Copyright: { ...Copyright, category: COMPONENT_CATEGORIES.FOOTER },
  SocialIcons: { ...SocialIcons, category: COMPONENT_CATEGORIES.FOOTER },
  ContactInfo: { ...ContactInfo, category: COMPONENT_CATEGORIES.FOOTER },
  
  // Generic components
  Icon: { ...Icon, category: COMPONENT_CATEGORIES.GENERIC },
  Grid: { ...Grid, category: COMPONENT_CATEGORIES.GENERIC },
  Card: { ...Card, category: COMPONENT_CATEGORIES.GENERIC },
  Spacer: { ...Spacer, category: COMPONENT_CATEGORIES.GENERIC },
  Alert: { ...Alert, category: COMPONENT_CATEGORIES.GENERIC },
  Badge: { ...Badge, category: COMPONENT_CATEGORIES.GENERIC },
  Tabs: { ...Tabs, category: COMPONENT_CATEGORIES.GENERIC },
  Accordion: { ...Accordion, category: COMPONENT_CATEGORIES.GENERIC },
  SignInPrompt: { ...SignInPrompt, category: COMPONENT_CATEGORIES.GENERIC },
};

/**
 * Generate Puck config filtered by template type
 * Only shows components relevant to the current template
 */
export function getPuckConfig(templateType?: string): Config {
  const allowedCategories = templateType 
    ? (TEMPLATE_COMPONENT_MAP[templateType] || ["LAYOUT", "CONTENT"])
    : Object.values(COMPONENT_CATEGORIES);
  
  // Filter components by allowed categories
  const filteredComponents: Record<string, any> = {};
  
  Object.entries(ALL_COMPONENTS).forEach(([name, component]) => {
    if (allowedCategories.includes(component.category)) {
      filteredComponents[name] = component;
    }
  });
  
  return {
    components: filteredComponents,
    categories: {
      layout: {
        title: "Layout",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.LAYOUT
        ),
      },
      content: {
        title: "Content",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.CONTENT
        ),
      },
      product: {
        title: "Product",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.PRODUCT
        ),
      },
      homepage: {
        title: "Homepage",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.HOMEPAGE
        ),
      },
      swiper: {
        title: "Carousels",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.SWIPER
        ),
      },
      productImageGallery: {
        title: "Product Image Gallery",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.PRODUCT_IMAGE_GALLERY
        ),
      },
      cart: {
        title: "Cart & Checkout",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.CART
        ),
      },
      collection: {
        title: "Collection",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.COLLECTION
        ),
      },
      category: {
        title: "Category",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.CATEGORY
        ),
      },
      order: {
        title: "Order & Confirmation",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.ORDER
        ),
      },
      account: {
        title: "Account",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.ACCOUNT
        ),
      },
      navigation: {
        title: "Navigation & Footer",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.NAVIGATION
        ),
      },
      footer: {
        title: "Footer",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.FOOTER
        ),
      },
      generic: {
        title: "Generic Components",
        components: Object.keys(filteredComponents).filter(
          (name) => ALL_COMPONENTS[name as keyof typeof ALL_COMPONENTS].category === COMPONENT_CATEGORIES.GENERIC
        ),
      },
    },
  };
}

/**
 * Storefront Puck config
 * Same components as admin, but used for rendering published pages
 * Extract only the component configs without the category metadata
 */
export const storefrontPuckConfig: Config = {
  components: {
    // Layout
    Container,
    Section,
    Columns,
    FlexRow,
    FlexColumn,
    // Content
    Heading,
    Text,
    Button,
    Image,
    Video,
    // Product
    ProductCard,
    ProductTitle,
    ProductPrice,
    ProductVariantSelector,
    ProductImageGallery,
    ProductDescription,
    ProductAccordion,
    AddToCart,
    RelatedProducts,
    RecentlyViewedProducts,
    QuantitySelector,
    ProductBreadcrumbs,
    ProductMetadata,
    StockIndicator,
    WishlistButton,
    ProductReviews,
    // Homepage
    HeroSection,
    FeaturedProducts,
    CategoriesGrid,
    CategoryProducts,
    Testimonials,
    Newsletter,
    CustomHTML,
    TrustBadges,
    PromotionalBannerGrid,
    CountdownTimer,
    StatsSection,
    // Swiper
    ProductCarousel,
    TestimonialCarousel,
    LogoCarousel,
    ContentSlider,
    // Product Image Gallery
    ImageGallery,
    ImageGalleryMinimal,
    ImageGalleryZoom,
    ImageGalleryFullscreen,
    // Cart
    CartItems,
    CartSummary,
    CheckoutForm,
    OrderSummary,
    // Collection
    ProductGrid,
    ProductFilters,
    ProductSort,
    Pagination,
    CollectionHeader,
    // Category
    CategoryTitle,
    CategoryDescription,
    CategoryBreadcrumbs,
    CategoryMetadata,
    CategoryProductsGrid,
    // Order
    OrderConfirmation,
    OrderDetails,
    OrderTimeline,
    OrderActions,
    // Account
    AccountProfile,
    AddressBook,
    OrderHistory,
    // Navigation
    MenuNavigation,
    Logo,
    SearchBar,
    SearchIcon,
    CartButton,
    AccountButton,
    // Footer
    Copyright,
    SocialIcons,
    ContactInfo,
    // Generic
    Icon,
    Grid,
    Card,
    Spacer,
    Alert,
    Badge,
    Tabs,
    Accordion,
  },
};

// Export default config for general use
export const defaultPuckConfig = getPuckConfig();
