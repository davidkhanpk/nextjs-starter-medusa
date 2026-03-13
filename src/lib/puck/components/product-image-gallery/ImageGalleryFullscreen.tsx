"use client"

import React, { useState } from "react";
import { ComponentConfig } from "@measured/puck";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Keyboard, Thumbs, FreeMode, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/zoom";
import { useProduct } from "@lib/hooks/useProduct";

export interface ImageGalleryFullscreenProps {
  containerWidth: "full" | "large" | "medium" | "small" | "custom";
  customWidth?: number;
  maxHeight?: number;
  mobileHeight?: number;
  thumbnailsPerView: number;
  thumbnailPosition: "bottom" | "left" | "right";
  thumbnailShape: "square" | "rounded" | "circle";
  enableZoom: boolean;
  maxZoom: number;
  showImageCounter: boolean;
  autoPlay: boolean;
  autoPlayDelay: number;
  navigationStyle: "minimal" | "pill" | "hidden";
  imageFit: "cover" | "contain";
  backgroundColor: string;
}

export const ImageGalleryFullscreen: ComponentConfig<ImageGalleryFullscreenProps> = {
  label: "Fullscreen Gallery",

  fields: {
    containerWidth: {
      type: "select",
      label: "Container Width",
      options: [
        { label: "Full Width (100%)", value: "full" },
        { label: "Large (1200px)", value: "large" },
        { label: "Medium (800px)", value: "medium" },
        { label: "Small (600px)", value: "small" },
        { label: "Custom", value: "custom" },
      ],
    },
    customWidth: {
      type: "number",
      label: "Custom Width (px)",
      min: 200,
      max: 2000,
    },
    maxHeight: {
      type: "number",
      label: "Max Height (px) - Desktop",
      min: 200,
      max: 1000,
    },
    mobileHeight: {
      type: "number",
      label: "Height (px) - Mobile",
      min: 200,
      max: 800,
    },
    thumbnailsPerView: {
      type: "number",
      label: "Thumbnails Per View",
      min: 3,
      max: 10,
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
    thumbnailShape: {
      type: "select",
      label: "Thumbnail Shape",
      options: [
        { label: "Square", value: "square" },
        { label: "Rounded", value: "rounded" },
        { label: "Circle", value: "circle" },
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
    navigationStyle: {
      type: "select",
      label: "Arrow Style",
      options: [
        { label: "Minimal (circle)", value: "minimal" },
        { label: "Pill (rounded bar)", value: "pill" },
        { label: "Hidden", value: "hidden" },
      ],
    },
    enableZoom: {
      type: "radio",
      label: "Zoom",
      options: [
        { label: "Enable", value: true },
        { label: "Disable", value: false },
      ],
    },
    maxZoom: {
      type: "number",
      label: "Maximum Zoom Level",
      min: 2,
      max: 8,
    },
    showImageCounter: {
      type: "radio",
      label: "Image Counter",
      options: [
        { label: "Show", value: true },
        { label: "Hide", value: false },
      ],
    },
    autoPlay: {
      type: "radio",
      label: "Auto Play",
      options: [
        { label: "Enable", value: true },
        { label: "Disable", value: false },
      ],
    },
    autoPlayDelay: {
      type: "number",
      label: "Auto-Play Delay (ms)",
      min: 1000,
      max: 10000,
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
  },

  defaultProps: {
    containerWidth: "medium",
    customWidth: 800,
    maxHeight: 500,
    mobileHeight: 300,
    thumbnailsPerView: 5,
    thumbnailPosition: "bottom",
    thumbnailShape: "rounded",
    enableZoom: true,
    maxZoom: 4,
    showImageCounter: true,
    autoPlay: false,
    autoPlayDelay: 3000,
    navigationStyle: "minimal",
    imageFit: "contain",
    backgroundColor: "#f5f5f5",
  },

  render: (props) => {
    const { product } = useProduct();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const {
      thumbnailPosition, containerWidth, customWidth, maxHeight,
      mobileHeight, thumbnailsPerView, showImageCounter,
      navigationStyle, imageFit, backgroundColor, thumbnailShape,
      enableZoom, maxZoom,
    } = props;

    const images: Array<{ url: string; alt: string }> = product?.images
      ? product.images.map((img: any, index: number) => ({
          url: img.url,
          alt: `${product.title} - Image ${index + 1}`
        }))
      : [];

    if (images.length === 0) {
      return (
        <div
          className="flex items-center justify-center h-96 rounded-lg"
          style={{ backgroundColor }}
        >
          <p className="text-gray-400 text-sm">No product images available</p>
        </div>
      );
    }

    const layoutClass = thumbnailPosition === "bottom"
      ? "flex-col"
      : thumbnailPosition === "left"
      ? "flex-row-reverse"
      : "flex-row";

    const widthValues = {
      full: "100%",
      large: "1200px",
      medium: "800px",
      small: "600px",
      custom: `${customWidth || 800}px`,
    };
    const containerWidthValue = widthValues[containerWidth];
    const desktopHeight = maxHeight ? `${maxHeight}px` : "500px";
    const mobileHeightValue = mobileHeight ? `${mobileHeight}px` : "300px";
    const thumbRadius = { square: "4px", rounded: "8px", circle: "50%" }[thumbnailShape];
    const isHorizontal = thumbnailPosition === "bottom";

    const navCSS = (() => {
      if (navigationStyle === "hidden") return "display: none;";
      if (navigationStyle === "pill") return `
        width: 36px; height: 56px; border-radius: 18px;
        background: rgba(255,255,255,0.92); backdrop-filter: blur(8px);
        box-shadow: 0 1px 3px rgba(0,0,0,0.08); color: #1a1a1a; border: none;
      `;
      return `
        width: 40px; height: 40px; border-radius: 50%;
        background: rgba(255,255,255,0.85); backdrop-filter: blur(6px);
        box-shadow: 0 1px 4px rgba(0,0,0,0.06); color: #1a1a1a;
        border: 1px solid rgba(0,0,0,0.06);
      `;
    })();

    const ChevronSVG = ({ direction }: { direction: "left" | "right" }) => (
      <svg
        width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      >
        {direction === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 6 15 12 9 18" />}
      </svg>
    );

    return (
      <>
        <style>{`
          .fs-gallery-wrap .fs-main-area {
            height: ${mobileHeightValue};
            max-height: ${mobileHeightValue};
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .fs-gallery-wrap .fs-main-area {
              height: ${desktopHeight};
              max-height: ${desktopHeight};
            }
          }
          .fs-gallery-wrap .fs-swiper {
            height: 100% !important;
          }
          .fs-gallery-wrap .fs-swiper .swiper-wrapper {
            height: 100% !important;
          }
          .fs-gallery-wrap .fs-swiper .swiper-slide {
            height: 100% !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
          }

          /* Navigation */
          .fs-gallery-wrap .swiper-button-next,
          .fs-gallery-wrap .swiper-button-prev {
            ${navCSS}
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0;
            z-index: 20;
            pointer-events: auto;
          }
          .fs-gallery-wrap:hover .swiper-button-next,
          .fs-gallery-wrap:hover .swiper-button-prev {
            opacity: 1;
          }
          .fs-gallery-wrap .swiper-button-next:hover,
          .fs-gallery-wrap .swiper-button-prev:hover {
            transform: scale(1.06);
          }
          .fs-gallery-wrap .swiper-button-next::after,
          .fs-gallery-wrap .swiper-button-prev::after {
            display: none;
          }

          /* Thumbnails */
          .fs-gallery-wrap .fs-thumbs .swiper-slide {
            opacity: 0.45;
            cursor: pointer;
            border-radius: ${thumbRadius};
            overflow: hidden;
            border: 2px solid transparent;
            transition: opacity 0.25s ease, border-color 0.25s ease;
          }
          .fs-gallery-wrap .fs-thumbs .swiper-slide:hover {
            opacity: 0.75;
          }
          .fs-gallery-wrap .fs-thumbs .swiper-slide-thumb-active {
            opacity: 1;
            border-color: #1a1a1a;
          }

          /* Fullscreen overlay */
          .fs-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.96);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fsFadeIn 0.25s ease;
          }
          @keyframes fsFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .fs-overlay .swiper-button-next,
          .fs-overlay .swiper-button-prev {
            width: 48px; height: 48px; border-radius: 50%;
            background: rgba(255,255,255,0.12); backdrop-filter: blur(8px);
            color: #fff; border: 1px solid rgba(255,255,255,0.15);
            transition: background 0.2s, opacity 0.25s;
            opacity: 0.7;
          }
          .fs-overlay .swiper-button-next:hover,
          .fs-overlay .swiper-button-prev:hover {
            background: rgba(255,255,255,0.22);
            opacity: 1;
          }
          .fs-overlay .swiper-button-next::after,
          .fs-overlay .swiper-button-prev::after {
            display: none;
          }
        `}</style>

        {/* Preview Gallery */}
        <div className={`fs-gallery-wrap group w-full flex gap-3 ${layoutClass}`} style={{ maxWidth: containerWidthValue, margin: "0 auto" }}>
          {/* Main Image */}
          <div className="flex-1 relative fs-main-area rounded-lg" style={{ overflow: "hidden", backgroundColor }}>
            {/* Fullscreen button */}
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

            {/* Counter badge */}
            {showImageCounter && (
              <div className="absolute top-3 left-3 z-10 bg-black/55 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full tracking-wide">
                {activeIndex + 1} / {images.length}
              </div>
            )}

            <Swiper
              className="fs-swiper"
              modules={[Navigation, Keyboard, Thumbs, Zoom]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              spaceBetween={10}
              slidesPerView={1}
              navigation={{
                nextEl: ".fs-gallery-wrap .fs-next",
                prevEl: ".fs-gallery-wrap .fs-prev",
                addIcons: false,
              }}
              keyboard={{ enabled: true }}
              zoom={enableZoom ? { maxRatio: maxZoom } : false}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
              style={{ height: "100%" }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className={`max-w-full max-h-full object-${imageFit}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {navigationStyle !== "hidden" && images.length > 1 && (
              <>
                <button className="fs-prev swiper-button-prev" aria-label="Previous image">
                  <ChevronSVG direction="left" />
                </button>
                <button className="fs-next swiper-button-next" aria-label="Next image">
                  <ChevronSVG direction="right" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className={isHorizontal ? "w-full" : "flex-shrink-0"} style={!isHorizontal ? { width: "80px" } : undefined}>
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Thumbs]}
                direction={isHorizontal ? "horizontal" : "vertical"}
                spaceBetween={8}
                slidesPerView={isHorizontal ? Math.min(images.length, thumbnailsPerView) : Math.min(images.length, 4)}
                freeMode
                watchSlidesProgress
                className={`fs-thumbs ${isHorizontal ? "mt-2" : "h-full"}`}
                style={!isHorizontal ? { height: "100%" } : undefined}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="aspect-square w-full object-cover"
                      style={{ borderRadius: thumbRadius }}
                      loading="lazy"
                      draggable={false}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* Fullscreen Overlay */}
        {isFullscreen && (
          <div className="fs-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsFullscreen(false); }}>
            {/* Close button */}
            <button
              className="absolute top-5 right-5 z-[10000] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white hover:bg-white/20 transition-colors"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Counter */}
            {showImageCounter && (
              <div className="absolute top-5 left-5 z-[10000] text-white/70 text-sm font-medium tracking-wide">
                {activeIndex + 1} / {images.length}
              </div>
            )}

            <Swiper
              className="w-full h-full"
              modules={[Navigation, Keyboard, Zoom]}
              navigation={{
                nextEl: ".fs-overlay .fs-ol-next",
                prevEl: ".fs-overlay .fs-ol-prev",
                addIcons: false,
              }}
              keyboard={{ enabled: true }}
              zoom={enableZoom ? { maxRatio: maxZoom } : false}
              initialSlide={activeIndex}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <div className="swiper-zoom-container flex items-center justify-center w-full h-full">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="max-w-[90vw] max-h-[90vh] object-contain"
                      draggable={false}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {images.length > 1 && (
              <>
                <button className="fs-ol-prev swiper-button-prev" aria-label="Previous image">
                  <ChevronSVG direction="left" />
                </button>
                <button className="fs-ol-next swiper-button-next" aria-label="Next image">
                  <ChevronSVG direction="right" />
                </button>
              </>
            )}
          </div>
        )}
      </>
    );
  },
};
