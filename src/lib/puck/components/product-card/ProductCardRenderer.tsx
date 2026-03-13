'use client';

import React, { useState } from 'react';
import Link from '@/components/common/SafeLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ShoppingCart, Check } from 'lucide-react';
import { addToCart } from '@lib/data/cart';
import { getProductPrice } from '@lib/util/get-product-price';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Product Card Template Type (matches dashboard configuration)
interface ProductCardTemplate {
  id: string;
  name: string;
  type?: string;
  layout: 'vertical' | 'horizontal' | 'compact' | 'spacious';
  imageGallery: {
    enabled: boolean;
    showSwiper: boolean;
    aspectRatio: string;
    borderRadius: string;
    shadow: boolean;
    hoverZoom: boolean;
  };
  title: {
    show: boolean;
    textSize: string;
    fontWeight: string;
    textAlign: string;
  };
  price: {
    show: boolean;
    textSize: string;
    priceColor: string;
    showCompareAt: boolean;
    showSavingsBadge: boolean;
  };
  badges?: {
    enabled: boolean;
    showSale: boolean;
    showNew: boolean;
    showLowStock: boolean;
    position: string;
  };
  addToCart: {
    show: boolean;
    buttonText: string;
    buttonStyle: string;
    buttonSize: string;
    showIcon: boolean;
  };
  styling: {
    cardRadius: string;
    cardBorder: string;
    cardShadow: boolean;
    cardBackground: string;
    accentColor: string;
    fontFamily: string;
  };
}

interface ProductCardProps {
  product: any; // Can be Medusa product or mock product
  template: ProductCardTemplate;
  region?: any;
  countryCode?: string;
}

export function ProductCard({ product, region, template, countryCode = 'us' }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Get product price using Medusa's price utility
  const { cheapestPrice } = getProductPrice({ product });
  const priceAmount = cheapestPrice?.calculated_price_number;
  const compareAtAmount = cheapestPrice?.original_price_number;
  const currencyCode = cheapestPrice?.currency_code || region?.currency_code || 'usd';
  const priceFormatted = cheapestPrice?.calculated_price;
  const compareAtFormatted = cheapestPrice?.original_price;
  
  // Get product images
  const images = product.images || [];
  const thumbnail = product.thumbnail || images[0]?.url || 'https://via.placeholder.com/400';

  // Check if product has multiple variants
  const hasMultipleVariants = (product.variants?.length ?? 0) > 1;
  
  // Get first variant
  const variant = product.variants?.[0];
  
  // Check if single variant is in stock
  const singleVariantInStock = variant && (
    !variant.manage_inventory || 
    variant.allow_backorder || 
    (variant.inventory_quantity || 0) > 0
  );

  // Handle quick add to cart (for single-variant products)
  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!variant?.id || isAdding || hasMultipleVariants) return;

    setIsAdding(true);

    try {
      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode: countryCode,
      });

      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  // Layout classes
  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row',
    compact: 'flex flex-col space-y-2',
    spacious: 'flex flex-col space-y-4',
  };

  const radiusClasses: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const aspectRatioClasses: Record<string, string> = {
    'square': 'aspect-square',
    '1:1': 'aspect-square',
    'portrait': 'aspect-[3/4]',
    '4:5': 'aspect-[4/5]',
    '3:4': 'aspect-[3/4]',
    'landscape': 'aspect-video',
    '16:9': 'aspect-video',
    'auto': '',
  };

  const textSizeClasses: Record<string, string> = {
    sm: 'text-sm',
    base: 'text-base',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const fontWeightClasses: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const buttonSizeClasses: Record<string, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonStyleClasses: Record<string, string> = {
    filled: 'bg-black text-white hover:bg-gray-800',
    outline: 'border-2 border-black text-black hover:bg-black hover:text-white',
    ghost: 'text-black hover:bg-gray-100',
  };

  // Render badges
  const renderBadges = () => {
    if (!template.badges || !template.badges.enabled) return null;
    const badges = [];

    if (template.badges.showSale && compareAtAmount && priceAmount && compareAtAmount > priceAmount) {
      badges.push(
        <span key="sale" className="badge bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
          {cheapestPrice.percentage_diff}
        </span>
      );
    }

    if (template.badges.showNew && (product.metadata?.is_new || product.is_new)) {
      badges.push(
        <span key="new" className="badge bg-blue-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
          New
        </span>
      );
    }

    if (template.badges.showLowStock && variant?.inventory_quantity && variant.inventory_quantity < 10) {
      badges.push(
        <span key="low-stock" className="badge bg-orange-500 text-white px-2 py-1 text-xs font-semibold">
          Low Stock
        </span>
      );
    }

    if (badges.length === 0) return null;

    const positionClasses = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
    };

    const badgeStyle = {
      pill: 'rounded-full',
      rounded: 'rounded-md',
      square: 'rounded-none',
    };

    return (
      <div className={`absolute ${positionClasses[template.badges.position]} flex flex-col gap-1 z-10`}>
        {badges.slice(0, template.badges.maxCount).map(badge => (
          <div key={badge.key} className={badgeStyle[template.badges.style]}>
            {badge}
          </div>
        ))}
      </div>
    );
  };

  // Render image gallery
  const renderImageGallery = () => {
    if (!template.imageGallery.enabled) return null;

    const imageClasses = `
      w-full h-full object-cover
      ${radiusClasses[template.imageGallery.borderRadius]}
      ${template.imageGallery.shadow ? 'shadow-lg' : ''}
      ${template.imageGallery.hoverZoom ? 'transition-transform duration-300 group-hover:scale-110' : ''}
    `;

    if (template.imageGallery.showSwiper && images.length > 1) {
      return (
        <div className={`relative w-full ${aspectRatioClasses[template.imageGallery.aspectRatio]} overflow-hidden`}>
          {renderBadges()}
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx} className="w-full h-full">
                <div className="w-full h-full relative">
                  <img
                    src={img.url}
                    alt={product.title || 'Product image'}
                    className={imageClasses}
                    style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
    }

    return (
      <div className={`relative w-full ${aspectRatioClasses[template.imageGallery.aspectRatio]} overflow-hidden`}>
        {renderBadges()}
        <div className="w-full h-full relative">
          <img
            src={thumbnail}
            alt={product.title || 'Product'}
            className={imageClasses}
            style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    );
  };

  // Render title
  const renderTitle = () => {
    if (!template.title.show) return null;

    const titleContent = (
      <h3
        className={`
          ${textSizeClasses[template.title.textSize]}
          ${fontWeightClasses[template.title.fontWeight]}
          ${template.title.textAlign === 'center' ? 'text-center' : 'text-left'}
          ${template.title.lineClamp ? `line-clamp-${template.title.lineClamp}` : ''}
        `}
      >
        {product.title}
      </h3>
    );

    if (template.title.clickable) {
      return (
        <Link href={`/${countryCode}/products/${product.handle}`} className="hover:underline">
          {titleContent}
        </Link>
      );
    }

    return titleContent;
  };

  // Render price
  const renderPrice = () => {
    if (!template.price.show || !priceFormatted) return null;

    const hasDiscount = compareAtAmount && compareAtAmount > priceAmount;

    return (
      <div className={`${template.price.align === 'center' ? 'text-center' : 'text-left'}`}>
        <span
          className={`${textSizeClasses[template.price.textSize]} font-bold`}
          style={{ color: template.price.priceColor }}
        >
          {priceFormatted}
        </span>
        {template.price.showCompareAt && hasDiscount && compareAtFormatted && (
          <span className="ml-2 text-sm text-gray-500 line-through">
            {compareAtFormatted}
          </span>
        )}
        {template.price.showSavingsBadge && hasDiscount && (
          <span className="ml-2 text-sm text-green-600 font-semibold">
            Save {cheapestPrice.percentage_diff}
          </span>
        )}
      </div>
    );
  };

  // Render add to cart button
  const renderAddToCart = () => {
    if (!template.addToCart.show) return null;

    // For multi-variant products, show "View Options" button that links to product page
    if (hasMultipleVariants) {
      return (
        <Link
          href={`/${countryCode}/products/${product.handle}`}
          className={`
            ${buttonSizeClasses[template.addToCart.buttonSize]}
            ${buttonStyleClasses[template.addToCart.buttonStyle]}
            ${radiusClasses[template.styling.cardRadius]}
            transition-colors duration-200
            w-full
            text-center inline-block
          `}
        >
          View Options
        </Link>
      );
    }

    // For single-variant products, show quick add button
    const isDisabled = !singleVariantInStock || isAdding;
    
    return (
      <button
        onClick={handleQuickAdd}
        disabled={isDisabled}
        className={`
          ${buttonSizeClasses[template.addToCart.buttonSize]}
          ${justAdded ? 'bg-green-600 text-white border-green-600' : buttonStyleClasses[template.addToCart.buttonStyle]}
          ${radiusClasses[template.styling.cardRadius]}
          transition-all duration-200
          w-full
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        `}
      >
        {template.addToCart.showIcon && (
          justAdded ? (
            <Check className="w-4 h-4" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )
        )}
        {isAdding 
          ? 'Adding...' 
          : justAdded 
          ? 'Added!' 
          : !singleVariantInStock 
          ? 'Out of Stock' 
          : template.addToCart.buttonText}
      </button>
    );
  };

  // Render meta info
  const renderMeta = () => {
    if (!template.meta) return null;
    
    const metaItems = [];

    if (template.meta.showSKU && product.variants?.[0]?.sku) {
      metaItems.push(<span key="sku" className="text-xs text-gray-500">SKU: {product.variants[0].sku}</span>);
    }

    if (template.meta.showType && product.type) {
      metaItems.push(<span key="type" className="text-xs text-gray-500">{product.type.value}</span>);
    }

    if (metaItems.length === 0) return null;

    return <div className="flex gap-2 flex-wrap">{metaItems}</div>;
  };

  // Main card styling
  const cardStyle = {
    backgroundColor: template.styling.cardBackground,
    borderColor: template.styling.cardBorderColor,
  };

  const borderClasses = {
    none: 'border-0',
    light: 'border',
    bold: 'border-2',
  };

  const hoverEffectClasses = {
    scale: 'hover:scale-105',
    shadow: 'hover:shadow-xl',
    border: 'hover:border-gray-400',
    none: '',
  };

  const spacingClasses = {
    compact: 'p-2',
    normal: 'p-4',
    relaxed: 'p-6',
  };

  return (
    <div
      className={`
        product-card group
        w-full max-w-full
        ${layoutClasses[template.layout]}
        ${radiusClasses[template.styling.cardRadius]}
        ${borderClasses[template.styling.cardBorder]}
        ${template.styling.cardShadow ? 'shadow-md' : ''}
        ${hoverEffectClasses[template.styling.hoverEffect || 'none']}
        ${spacingClasses[template.styling.cardSpacing]}
        transition-all duration-${template.styling.transition === 'fast' ? '150' : template.styling.transition === 'slow' ? '500' : '300'}
        overflow-hidden
      `}
      style={{ ...cardStyle, maxWidth: '100%' }}
    >
      {renderImageGallery()}
      <div className="flex flex-col gap-2 mt-3">
        {renderTitle()}
        {renderPrice()}
        {renderMeta()}
        {renderAddToCart()}
      </div>
    </div>
  );
}
