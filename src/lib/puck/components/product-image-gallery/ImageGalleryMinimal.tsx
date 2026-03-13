"use client"

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useProduct } from "@lib/hooks/useProduct";

export interface ImageGalleryMinimalProps {
  containerWidth: "full" | "large" | "medium" | "small" | "custom";
  customWidth?: number;
  maxHeight?: number;
  mobileHeight?: number;
  aspectRatio: "square" | "portrait" | "landscape" | "wide";
  showNavigation: boolean;
  showPagination: boolean;
  navigationStyle: "minimal" | "pill" | "hidden";
  paginationStyle: "dots" | "line" | "fraction";
  loop: boolean;
  autoHeight: boolean;
  spacing: number;
  imageFit: "cover" | "contain";
  backgroundColor: string;
}

export const ImageGalleryMinimal: ComponentConfig<ImageGalleryMinimalProps> = {
  label: "Minimal Gallery",

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
    aspectRatio: {
      type: "select",
      label: "Aspect Ratio",
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
    showNavigation: {
      type: "radio",
      label: "Navigation Arrows",
      options: [
        { label: "Show", value: true },
        { label: "Hide", value: false },
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
    showPagination: {
      type: "radio",
      label: "Pagination",
      options: [
        { label: "Show", value: true },
        { label: "Hide", value: false },
      ],
    },
    paginationStyle: {
      type: "select",
      label: "Pagination Style",
      options: [
        { label: "Dots", value: "dots" },
        { label: "Progress Line", value: "line" },
        { label: "Fraction (1/5)", value: "fraction" },
      ],
    },
    loop: {
      type: "radio",
      label: "Loop",
      options: [
        { label: "Enable", value: true },
        { label: "Disable", value: false },
      ],
    },
    autoHeight: {
      type: "radio",
      label: "Auto Height",
      options: [
        { label: "Enable", value: true },
        { label: "Disable", value: false },
      ],
    },
    spacing: {
      type: "number",
      label: "Spacing Between Slides (px)",
      min: 0,
      max: 50,
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
    aspectRatio: "landscape",
    imageFit: "contain",
    showNavigation: true,
    navigationStyle: "minimal",
    showPagination: true,
    paginationStyle: "dots",
    loop: true,
    autoHeight: false,
    spacing: 20,
    backgroundColor: "#fafafa",
  },

  render: (props) => {
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

    const navCSS = (() => {
      if (!props.showNavigation || props.navigationStyle === "hidden") return "display: none;";
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

    const paginationConfig = (() => {
      if (!props.showPagination) return false;
      if (props.paginationStyle === "fraction") return { type: "fraction" as const };
      return { clickable: true };
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
        className="min-gallery-wrap group w-full"
        style={{ maxWidth: containerWidth, margin: "0 auto" }}
      >
        <style>{`
          .min-gallery-wrap {
            height: ${mobileHeight};
            max-height: ${mobileHeight};
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .min-gallery-wrap {
              height: ${desktopHeight};
              max-height: ${desktopHeight};
            }
          }

          .min-gallery-wrap .min-swiper {
            height: 100% !important;
          }
          .min-gallery-wrap .min-swiper .swiper-wrapper {
            height: 100% !important;
          }
          .min-gallery-wrap .min-swiper .swiper-slide {
            height: 100% !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
          }

          /* Navigation */
          .min-gallery-wrap .swiper-button-next,
          .min-gallery-wrap .swiper-button-prev {
            ${navCSS}
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0;
            z-index: 20;
            pointer-events: auto;
          }
          .min-gallery-wrap:hover .swiper-button-next,
          .min-gallery-wrap:hover .swiper-button-prev {
            opacity: 1;
          }
          .min-gallery-wrap .swiper-button-next:hover,
          .min-gallery-wrap .swiper-button-prev:hover {
            transform: scale(1.06);
          }
          .min-gallery-wrap .swiper-button-next::after,
          .min-gallery-wrap .swiper-button-prev::after {
            display: none;
          }

          /* Pagination dots */
          .min-gallery-wrap .swiper-pagination-bullet {
            background: #1a1a1a;
            opacity: 0.2;
            width: 7px;
            height: 7px;
            transition: opacity 0.2s, width 0.2s;
            border-radius: 4px;
          }
          .min-gallery-wrap .swiper-pagination-bullet-active {
            opacity: 1;
            ${props.paginationStyle === "line" ? "width: 24px;" : ""}
          }

          /* Fraction pagination */
          .min-gallery-wrap .swiper-pagination-fraction {
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
          className="min-swiper rounded-lg"
          modules={[Navigation, Pagination, Keyboard]}
          spaceBetween={props.spacing}
          slidesPerView={1}
          navigation={{
            nextEl: ".min-gallery-wrap .min-next",
            prevEl: ".min-gallery-wrap .min-prev",
            addIcons: false,
          }}
          pagination={paginationConfig}
          keyboard={{ enabled: true }}
          loop={props.loop && images.length > 1}
          autoHeight={props.autoHeight}
          style={{ height: "100%", backgroundColor: props.backgroundColor }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.url}
                alt={image.alt}
                className={`max-w-full max-h-full object-${props.imageFit}`}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom SVG nav buttons */}
        {props.showNavigation && props.navigationStyle !== "hidden" && images.length > 1 && (
          <>
            <button className="min-prev swiper-button-prev" aria-label="Previous image">
              <ChevronSVG direction="left" />
            </button>
            <button className="min-next swiper-button-next" aria-label="Next image">
              <ChevronSVG direction="right" />
            </button>
          </>
        )}
      </div>
    );
  },
};
