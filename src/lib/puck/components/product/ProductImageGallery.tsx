"use client"

import React, { useState, useCallback } from "react";
import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, Thumbs, FreeMode, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

export interface ProductImageGalleryProps {
  layout: "carousel" | "grid" | "thumbnails";
  enableZoom: boolean;
  imageRatio: "square" | "portrait" | "landscape" | "wide";
  showImageCount: boolean;
  enableFullscreen: boolean;
  thumbnailPosition: "bottom" | "left" | "right";
  navigationStyle: "minimal" | "pill" | "hidden";
  thumbnailShape: "square" | "rounded" | "circle";
  thumbnailSize: "sm" | "md" | "lg";
  gridColumns: 2 | 3;
  imageFit: "cover" | "contain";
  backgroundColor: string;
  activeIndicator: "border" | "opacity" | "dot";
}

export const ProductImageGallery: ComponentConfig<ProductImageGalleryProps> = {
  label: "Product Image Gallery",

  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Carousel", value: "carousel" },
        { label: "Grid", value: "grid" },
        { label: "With Thumbnails", value: "thumbnails" },
      ],
    },
    imageRatio: {
      type: "select",
      label: "Image Aspect Ratio",
      options: [
        { label: "Square (1:1)", value: "square" },
        { label: "Portrait (3:4)", value: "portrait" },
        { label: "Landscape (4:3)", value: "landscape" },
        { label: "Wide (16:9)", value: "wide" },
      ],
    },
    imageFit: {
      type: "select",
      label: "Image Fit",
      options: [
        { label: "Cover (fill area)", value: "cover" },
        { label: "Contain (full image)", value: "contain" },
      ],
    },
    thumbnailPosition: {
      type: "select",
      label: "Thumbnail Position",
      options: [
        { label: "Bottom", value: "bottom" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
    navigationStyle: {
      type: "select",
      label: "Arrow Style",
      options: [
        { label: "Minimal (thin chevron)", value: "minimal" },
        { label: "Pill (rounded bar)", value: "pill" },
        { label: "Hidden (swipe only)", value: "hidden" },
      ],
    },
    thumbnailShape: {
      type: "select",
      label: "Thumbnail Shape",
      options: [
        { label: "Square", value: "square" },
        { label: "Rounded", value: "rounded" },
        { label: "Circle", value: "circle" },
      ],
    },
    thumbnailSize: {
      type: "select",
      label: "Thumbnail Size",
      options: [
        { label: "Small (56px)", value: "sm" },
        { label: "Medium (72px)", value: "md" },
        { label: "Large (88px)", value: "lg" },
      ],
    },
    activeIndicator: {
      type: "select",
      label: "Active Thumbnail Indicator",
      options: [
        { label: "Border", value: "border" },
        { label: "Opacity", value: "opacity" },
        { label: "Dot", value: "dot" },
      ],
    },
    gridColumns: {
      type: "select",
      label: "Grid Columns",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
      ],
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    enableZoom: {
      type: "radio",
      label: "Enable Zoom",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showImageCount: {
      type: "radio",
      label: "Show Image Count",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    enableFullscreen: {
      type: "radio",
      label: "Enable Fullscreen",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    layout: "carousel",
    imageRatio: "square",
    imageFit: "cover",
    thumbnailPosition: "bottom",
    navigationStyle: "minimal",
    thumbnailShape: "rounded",
    thumbnailSize: "md",
    activeIndicator: "border",
    gridColumns: 2,
    backgroundColor: "#f5f5f5",
    enableZoom: true,
    showImageCount: true,
    enableFullscreen: false,
  },

  render: (props) => {
    const { product } = useProduct();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const {
      layout, enableZoom, imageRatio, imageFit, showImageCount,
      enableFullscreen, thumbnailPosition, navigationStyle,
      thumbnailShape, thumbnailSize, activeIndicator,
      gridColumns, backgroundColor,
    } = props;

    if (!product || !product.images || product.images.length === 0) {
      return (
        <div
          className="flex items-center justify-center aspect-square rounded-lg"
          style={{ backgroundColor }}
        >
          <p className="text-gray-400 text-sm">No images available</p>
        </div>
      );
    }

    const images = product.images;
    const uid = `pig-${product.id?.slice(-6) || 'x'}`;

    const aspectCls = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      wide: "aspect-[16/9]",
    }[imageRatio];

    const thumbSizePx = { sm: 56, md: 72, lg: 88 }[thumbnailSize];
    const thumbRadius = { square: '4px', rounded: '8px', circle: '50%' }[thumbnailShape];

    // SVG chevron icon (thin, modern)
    const ChevronSVG = ({ direction }: { direction: 'left' | 'right' }) => (
      <svg
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      >
        {direction === 'left'
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 6 15 12 9 18" />}
      </svg>
    );

    // Navigation button styles
    const navStyles = (() => {
      if (navigationStyle === 'hidden') return { display: 'none' } as const;
      if (navigationStyle === 'pill') return {
        width: '36px', height: '56px', borderRadius: '18px',
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        color: '#1a1a1a', border: 'none',
      } as const;
      // minimal
      return {
        width: '40px', height: '40px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.06)',
      } as const;
    })();

    // Carousel layout
    if (layout === "carousel") {
      return (
        <div className={`${uid}-gallery group relative`}>
          <style>{`
            .${uid}-gallery .swiper-button-next,
            .${uid}-gallery .swiper-button-prev {
              ${Object.entries(navStyles).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`).join('; ')};
              transition: opacity 0.2s, transform 0.2s;
              opacity: 0;
              z-index: 20;
              pointer-events: auto;
            }
            .${uid}-gallery:hover .swiper-button-next,
            .${uid}-gallery:hover .swiper-button-prev {
              opacity: 1;
            }
            .${uid}-gallery .swiper-button-next:hover,
            .${uid}-gallery .swiper-button-prev:hover {
              transform: scale(1.06);
            }
            .${uid}-gallery .swiper-button-next::after,
            .${uid}-gallery .swiper-button-prev::after {
              display: none;
            }
            .${uid}-gallery .swiper-button-next svg,
            .${uid}-gallery .swiper-button-prev svg {
              pointer-events: none;
            }
            .${uid}-gallery .swiper-pagination-fraction {
              background: rgba(0,0,0,0.55);
              backdrop-filter: blur(4px);
              color: #fff;
              font-size: 12px;
              font-weight: 500;
              letter-spacing: 0.04em;
              padding: 3px 10px;
              border-radius: 12px;
              width: auto;
              left: 50%;
              transform: translateX(-50%);
              bottom: 12px;
            }
          `}</style>
          <Swiper
            modules={[Navigation, Pagination, Zoom]}
            navigation={{
              nextEl: `.${uid}-next`,
              prevEl: `.${uid}-prev`,
              addIcons: false,
            }}
            pagination={showImageCount ? { type: 'fraction' } : false}
            zoom={enableZoom ? { maxRatio: 3 } : false}
            loop={images.length > 1}
            className={`${aspectCls} overflow-hidden rounded-lg`}
            style={{ backgroundColor }}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id || index}>
                <div className={`swiper-zoom-container ${aspectCls}`}>
                  <img
                    src={image.url}
                    alt={`${product.title} - Image ${index + 1}`}
                    className={`w-full h-full object-${imageFit || 'cover'}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom nav buttons with SVG icons */}
          {navigationStyle !== 'hidden' && images.length > 1 && (
            <>
              <button className={`${uid}-prev swiper-button-prev`} aria-label="Previous image">
                <ChevronSVG direction="left" />
              </button>
              <button className={`${uid}-next swiper-button-next`} aria-label="Next image">
                <ChevronSVG direction="right" />
              </button>
            </>
          )}

          {/* Fullscreen button */}
          {enableFullscreen && (
            <button
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm shadow-sm border border-black/[0.04] text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
              onClick={() => setIsFullscreen(true)}
              aria-label="View fullscreen"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          )}
        </div>
      );
    }

    // Thumbnails layout
    if (layout === "thumbnails") {
      const isHorizontal = thumbnailPosition === "bottom";
      const containerCls = thumbnailPosition === "right"
        ? "flex flex-row gap-3"
        : thumbnailPosition === "left"
        ? "flex flex-row-reverse gap-3"
        : "flex flex-col gap-3";

      return (
        <div className={`${uid}-thumb-gallery group ${containerCls}`}>
          <style>{`
            .${uid}-thumb-gallery .swiper-button-next,
            .${uid}-thumb-gallery .swiper-button-prev {
              ${Object.entries(navStyles).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`).join('; ')};
              transition: opacity 0.2s, transform 0.2s;
              opacity: 0;
            }
            .${uid}-thumb-gallery:hover .swiper-button-next,
            .${uid}-thumb-gallery:hover .swiper-button-prev {
              opacity: 1;
            }
            .${uid}-thumb-gallery .swiper-button-next::after,
            .${uid}-thumb-gallery .swiper-button-prev::after {
              display: none;
            }
          `}</style>

          {/* Main image */}
          <div className="flex-1 relative">
            <Swiper
              modules={[Navigation, Thumbs, Zoom]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              zoom={enableZoom ? { maxRatio: 3 } : false}
              navigation={{
                nextEl: `.${uid}-tn`,
                prevEl: `.${uid}-tp`,
                addIcons: false,
              }}
              className={`${aspectCls} overflow-hidden rounded-lg`}
              style={{ backgroundColor }}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id || index}>
                  <div className={`swiper-zoom-container ${aspectCls}`}>
                    <img
                      src={image.url}
                      alt={`${product.title} - Image ${index + 1}`}
                      className={`w-full h-full object-${imageFit}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {navigationStyle !== 'hidden' && images.length > 1 && (
              <>
                <button className={`${uid}-tp swiper-button-prev`} aria-label="Previous">
                  <ChevronSVG direction="left" />
                </button>
                <button className={`${uid}-tn swiper-button-next`} aria-label="Next">
                  <ChevronSVG direction="right" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className={isHorizontal ? 'w-full' : `flex-shrink-0`} style={!isHorizontal ? { width: `${thumbSizePx + 8}px` } : undefined}>
            <Swiper
              modules={[FreeMode, Thumbs]}
              onSwiper={setThumbsSwiper}
              direction={isHorizontal ? 'horizontal' : 'vertical'}
              spaceBetween={8}
              slidesPerView={isHorizontal ? Math.min(images.length, 5) : Math.min(images.length, 4)}
              freeMode
              watchSlidesProgress
              className={isHorizontal ? '' : 'h-full'}
              style={!isHorizontal ? { height: '100%' } : undefined}
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id || index}>
                  <div
                    className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${
                      activeIndicator === 'opacity'
                        ? (index === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70')
                        : activeIndicator === 'border'
                        ? (index === activeIndex
                            ? 'ring-2 ring-black ring-offset-1'
                            : 'ring-1 ring-transparent hover:ring-gray-300')
                        : '' /* dot handled below */
                    }`}
                    style={{
                      width: `${thumbSizePx}px`,
                      height: `${thumbSizePx}px`,
                      borderRadius: thumbRadius,
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                    {/* Dot indicator */}
                    {activeIndicator === 'dot' && index === activeIndex && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black" />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      );
    }

    // Grid layout
    if (layout === "grid") {
      return (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
        >
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className={`${aspectCls} overflow-hidden ${index === 0 && gridColumns === 2 ? 'col-span-2 row-span-2' : ''}`}
              style={{ backgroundColor, borderRadius: '8px' }}
            >
              <img
                src={image.url}
                alt={`${product.title} - Image ${index + 1}`}
                className={`w-full h-full object-${imageFit || 'cover'} transition-transform duration-300 hover:scale-[1.03]`}
                loading={index === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
        </div>
      );
    }

    return null;
  },
};
