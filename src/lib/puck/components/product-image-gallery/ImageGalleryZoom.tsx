"use client"

import React, { useState } from "react";
import { ComponentConfig } from "@measured/puck";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Zoom, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { useProduct } from "@lib/hooks/useProduct";

export interface ImageGalleryZoomProps {
  containerWidth: "full" | "large" | "medium" | "small" | "custom";
  customWidth?: number;
  maxHeight?: number;
  mobileHeight?: number;
  maxZoom: number;
  minZoom: number;
  showThumbnails: boolean;
  thumbnailsPerView: number;
  thumbnailShape: "square" | "rounded" | "circle";
  aspectRatio: "square" | "portrait" | "landscape";
  enableDoubleClickZoom: boolean;
  spacing: number;
  navigationStyle: "minimal" | "pill" | "hidden";
  imageFit: "cover" | "contain";
  backgroundColor: string;
}

export const ImageGalleryZoom: ComponentConfig<ImageGalleryZoomProps> = {
  label: "Zoom Gallery",

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
    maxZoom: {
      type: "number",
      label: "Maximum Zoom Level",
      min: 2,
      max: 10,
    },
    minZoom: {
      type: "number",
      label: "Minimum Zoom Level",
      min: 1,
      max: 3,
    },
    showThumbnails: {
      type: "radio",
      label: "Thumbnails",
      options: [
        { label: "Show", value: true },
        { label: "Hide", value: false },
      ],
    },
    thumbnailsPerView: {
      type: "number",
      label: "Thumbnails Per View",
      min: 3,
      max: 8,
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
    aspectRatio: {
      type: "select",
      label: "Aspect Ratio",
      options: [
        { label: "Square (1:1)", value: "square" },
        { label: "Portrait (3:4)", value: "portrait" },
        { label: "Landscape (4:3)", value: "landscape" },
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
    enableDoubleClickZoom: {
      type: "radio",
      label: "Double-Click Zoom",
      options: [
        { label: "Enable", value: true },
        { label: "Disable", value: false },
      ],
    },
    spacing: {
      type: "number",
      label: "Spacing Between Slides (px)",
      min: 0,
      max: 30,
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
    maxZoom: 4,
    minZoom: 1,
    showThumbnails: true,
    thumbnailsPerView: 4,
    thumbnailShape: "rounded",
    aspectRatio: "landscape",
    imageFit: "contain",
    navigationStyle: "minimal",
    enableDoubleClickZoom: true,
    spacing: 10,
    backgroundColor: "#f5f5f5",
  },

  render: (props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { product } = useProduct();

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
          style={{ backgroundColor: props.backgroundColor }}
        >
          <p className="text-gray-400 text-sm">No product images available</p>
        </div>
      );
    }

    const widthValues = {
      full: "100%",
      large: "1200px",
      medium: "800px",
      small: "600px",
      custom: `${props.customWidth || 800}px`,
    };
    const containerWidth = widthValues[props.containerWidth];
    const desktopHeight = props.maxHeight ? `${props.maxHeight}px` : "500px";
    const mobileHeight = props.mobileHeight ? `${props.mobileHeight}px` : "300px";
    const thumbRadius = { square: "4px", rounded: "8px", circle: "50%" }[props.thumbnailShape];

    const navCSS = (() => {
      if (props.navigationStyle === "hidden") return "display: none;";
      if (props.navigationStyle === "pill") return `
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
      <div
        className="zoom-gallery-wrap group w-full"
        style={{ maxWidth: containerWidth, margin: "0 auto" }}
      >
        <style>{`
          .zoom-gallery-wrap .zoom-main-area {
            height: ${mobileHeight};
            max-height: ${mobileHeight};
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .zoom-gallery-wrap .zoom-main-area {
              height: ${desktopHeight};
              max-height: ${desktopHeight};
            }
          }
          .zoom-gallery-wrap .zoom-swiper {
            height: 100% !important;
            overflow: hidden !important;
          }
          .zoom-gallery-wrap .zoom-swiper .swiper-wrapper {
            height: 100% !important;
          }
          .zoom-gallery-wrap .zoom-swiper .swiper-slide {
            cursor: zoom-in;
            height: 100% !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            overflow: hidden !important;
          }
          .zoom-gallery-wrap .zoom-swiper .swiper-slide-zoomed {
            cursor: zoom-out;
          }

          .zoom-gallery-wrap .swiper-button-next,
          .zoom-gallery-wrap .swiper-button-prev {
            ${navCSS}
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0;
            z-index: 20;
            pointer-events: auto;
          }
          .zoom-gallery-wrap:hover .swiper-button-next,
          .zoom-gallery-wrap:hover .swiper-button-prev {
            opacity: 1;
          }
          .zoom-gallery-wrap .swiper-button-next:hover,
          .zoom-gallery-wrap .swiper-button-prev:hover {
            transform: scale(1.06);
          }
          .zoom-gallery-wrap .swiper-button-next::after,
          .zoom-gallery-wrap .swiper-button-prev::after {
            display: none;
          }

          .zoom-gallery-wrap .swiper-pagination-bullet {
            background: #1a1a1a;
            opacity: 0.2;
            width: 7px;
            height: 7px;
            transition: opacity 0.2s, transform 0.2s;
          }
          .zoom-gallery-wrap .swiper-pagination-bullet-active {
            opacity: 1;
            transform: scale(1.2);
          }

          .zoom-gallery-wrap .zoom-thumbs .swiper-slide {
            opacity: 0.45;
            cursor: pointer;
            border-radius: ${thumbRadius};
            overflow: hidden;
            border: 2px solid transparent;
            transition: opacity 0.25s ease, border-color 0.25s ease;
          }
          .zoom-gallery-wrap .zoom-thumbs .swiper-slide:hover {
            opacity: 0.75;
          }
          .zoom-gallery-wrap .zoom-thumbs .swiper-slide-thumb-active {
            opacity: 1;
            border-color: #1a1a1a;
          }
        `}</style>

        {/* Main Gallery */}
        <div
          className="relative zoom-main-area rounded-lg"
          style={{ overflow: "hidden", backgroundColor: props.backgroundColor }}
        >
          <Swiper
            className="zoom-swiper"
            modules={[Navigation, Pagination, Zoom, Thumbs]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            spaceBetween={props.spacing}
            slidesPerView={1}
            navigation={{
              nextEl: ".zoom-gallery-wrap .zoom-next",
              prevEl: ".zoom-gallery-wrap .zoom-prev",
              addIcons: false,
            }}
            pagination={{ clickable: true }}
            zoom={{
              maxRatio: props.maxZoom,
              minRatio: props.minZoom,
              toggle: props.enableDoubleClickZoom,
            }}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} style={{ height: "100%", maxHeight: "100%" }}>
                <div
                  className="swiper-zoom-container"
                  style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className={`object-${props.imageFit}`}
                    style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                    loading={index === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {props.navigationStyle !== "hidden" && images.length > 1 && (
            <>
              <button className="zoom-prev swiper-button-prev" aria-label="Previous image">
                <ChevronSVG direction="left" />
              </button>
              <button className="zoom-next swiper-button-next" aria-label="Next image">
                <ChevronSVG direction="right" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {props.showThumbnails && images.length > 1 && (
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={8}
            slidesPerView={props.thumbnailsPerView}
            freeMode
            watchSlidesProgress
            className="zoom-thumbs mt-3"
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
        )}
      </div>
    );
  },
};
