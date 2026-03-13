"use client"

import { ComponentConfig } from "@measured/puck";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode, Zoom } from 'swiper/modules';
import { useProduct } from "@lib/hooks/useProduct";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

export interface ImageGalleryProps {
  // Container Size
  containerWidth: "full" | "large" | "medium" | "small" | "custom";
  customWidth?: number;
  maxHeight?: number;
  
  // Layout
  layout: "standard" | "thumbnails" | "grid";
  mainImageAspectRatio: "square" | "portrait" | "landscape" | "wide";
  
  // Thumbnails (for thumbnails layout)
  showThumbnails: boolean;
  thumbnailPosition: "bottom" | "right" | "left";
  thumbnailsPerView: number;
  thumbnailSpacing: number;
  
  // Navigation
  showNavigation: boolean;
  navigationColor: string;
  navigationSize: "sm" | "md" | "lg";
  
  // Pagination
  showPagination: boolean;
  paginationType: "bullets" | "fraction";
  paginationColor: string;
  
  // Zoom
  enableZoom: boolean;
  maxZoomScale: number;
  
  // Behavior
  loop: boolean;
  autoHeight: boolean;
  spaceBetween: number;
  
  // Styling
  borderRadius: "none" | "sm" | "md" | "lg" | "xl";
  showBorder: boolean;
  borderColor: string;
  backgroundColor: string;
}

export const ImageGallery: ComponentConfig<ImageGalleryProps> = {
  label: "Image Gallery (Swiper)",
  
  fields: {
    // Container Size
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
      label: "Max Height (px) - Leave empty for auto",
      min: 200,
      max: 1000,
    },
    
    // Layout
    layout: {
      type: "select",
      label: "Gallery Layout",
      options: [
        { label: "Standard (Full Image)", value: "standard" },
        { label: "With Thumbnails", value: "thumbnails" },
        { label: "Grid View", value: "grid" },
      ],
    },
    mainImageAspectRatio: {
      type: "select",
      label: "Main Image Aspect Ratio",
      options: [
        { label: "Square (1:1)", value: "square" },
        { label: "Portrait (3:4)", value: "portrait" },
        { label: "Landscape (4:3)", value: "landscape" },
        { label: "Wide (16:9)", value: "wide" },
      ],
    },
    
    // Thumbnails
    showThumbnails: {
      type: "radio",
      label: "Show Thumbnails",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    thumbnailPosition: {
      type: "select",
      label: "Thumbnail Position",
      options: [
        { label: "Bottom", value: "bottom" },
        { label: "Right", value: "right" },
        { label: "Left", value: "left" },
      ],
    },
    thumbnailsPerView: {
      type: "number",
      label: "Thumbnails Per View",
      min: 3,
      max: 10,
    },
    thumbnailSpacing: {
      type: "number",
      label: "Thumbnail Spacing (px)",
      min: 0,
      max: 32,
    },
    
    // Navigation
    showNavigation: {
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
    navigationSize: {
      type: "select",
      label: "Navigation Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    
    // Pagination
    showPagination: {
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
        { label: "Fraction (1/5)", value: "fraction" },
      ],
    },
    paginationColor: {
      type: "text",
      label: "Pagination Color (hex)",
    },
    
    // Zoom
    enableZoom: {
      type: "radio",
      label: "Enable Zoom (click/pinch)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    maxZoomScale: {
      type: "number",
      label: "Max Zoom Scale",
      min: 2,
      max: 5,
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
    autoHeight: {
      type: "radio",
      label: "Auto Height",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    spaceBetween: {
      type: "number",
      label: "Space Between Images (px)",
      min: 0,
      max: 50,
    },
    
    // Styling
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    showBorder: {
      type: "radio",
      label: "Show Border",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    borderColor: {
      type: "text",
      label: "Border Color (hex)",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color (hex)",
    },
  },
  
  defaultProps: {
    containerWidth: "large",
    customWidth: 800,
    maxHeight: 500,
    layout: "thumbnails",
    mainImageAspectRatio: "landscape",
    showThumbnails: true,
    thumbnailPosition: "bottom",
    thumbnailsPerView: 5,
    thumbnailSpacing: 12,
    showNavigation: true,
    navigationColor: "#000000",
    navigationSize: "md",
    showPagination: false,
    paginationType: "bullets",
    paginationColor: "#3b82f6",
    enableZoom: true,
    maxZoomScale: 3,
    loop: true,
    autoHeight: false,
    spaceBetween: 10,
    borderRadius: "md",
    showBorder: true,
    borderColor: "#e5e5e5",
    backgroundColor: "#f9fafb",
  },
  
  render: (props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const { product } = useProduct();
    
    // Get product images
    const images: Array<{ url: string; alt: string }> = product?.images 
      ? product.images.map((img, index) => ({
          url: img.url,
          alt: `${product.title} - Image ${index + 1}`
        }))
      : [];
    
    console.log('[ImageGallery] Product:', product?.title, 'Images:', images.length);
    
    if (images.length === 0) {
      return (
        <div className="bg-gray-100 flex items-center justify-center aspect-square rounded-lg p-8">
          <p className="text-gray-400">No product images available</p>
        </div>
      );
    }
    
    const aspectRatioClasses = {
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
      wide: "aspect-[16/9]",
    };
    
    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };
    
    const isHorizontalThumbs = props.thumbnailPosition === "bottom";
    const isVerticalThumbs = ["left", "right"].includes(props.thumbnailPosition);
    
    // Calculate container width
    const widthValues = {
      full: "100%",
      large: "1200px",
      medium: "800px",
      small: "600px",
      custom: `${props.customWidth || 800}px`,
    };
    const containerWidth = widthValues[props.containerWidth];
    const containerHeight = props.maxHeight ? `${props.maxHeight}px` : '500px';
    
    return (
      <div
        className="image-gallery p-4"
        style={{ backgroundColor: props.backgroundColor, maxWidth: containerWidth, height: containerHeight, margin: "0 auto", overflow: "hidden" }}
      >
        <div
          className={`gallery-container ${
            isVerticalThumbs ? "flex gap-4" : ""
          } ${props.thumbnailPosition === "right" ? "flex-row-reverse" : ""}`}
          style={{ height: containerHeight, maxHeight: containerHeight, overflow: "hidden" }}
        >
          {/* Thumbnails (Left) */}
          {props.showThumbnails && props.thumbnailPosition === "left" && (
            <div className="w-24">
              <Swiper
                modules={[FreeMode, Thumbs]}
                onSwiper={setThumbsSwiper}
                direction="vertical"
                spaceBetween={props.thumbnailSpacing}
                slidesPerView={props.thumbnailsPerView}
                freeMode={true}
                watchSlidesProgress={true}
                className="thumbnail-swiper h-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url}
                      alt={image.alt || `Thumbnail ${index + 1}`}
                      className={`w-full aspect-square object-cover cursor-pointer opacity-60 hover:opacity-100 transition ${radiusClasses[props.borderRadius]}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          
          {/* Main Gallery */}
          <div className="flex-1" style={{ height: containerHeight, maxHeight: containerHeight, overflow: "hidden" }}>
            <Swiper
              modules={[Navigation, Pagination, Thumbs, Zoom]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              spaceBetween={props.spaceBetween}
              navigation={props.showNavigation}
              pagination={
                props.showPagination
                  ? {
                      type: props.paginationType,
                      clickable: true,
                    }
                  : false
              }
              zoom={props.enableZoom ? { maxRatio: props.maxZoomScale } : false}
              loop={props.loop}
              autoHeight={false}
              className={`main-gallery ${radiusClasses[props.borderRadius]} ${
                props.showBorder ? "border-2" : ""
              }`}
              style={{ borderColor: props.borderColor, height: containerHeight, maxHeight: containerHeight, overflow: 'hidden' }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} style={{ width: '100%', height: containerHeight, maxHeight: containerHeight }}>
                  <img
                    src={image.url}
                    alt={image.alt || `Image ${index + 1}`}
                    className="object-contain"
                    style={{ maxWidth: '100%', maxHeight: containerHeight, width: 'auto', height: 'auto' }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* Thumbnails (Right) */}
          {props.showThumbnails && props.thumbnailPosition === "right" && (
            <div className="w-24">
              <Swiper
                modules={[FreeMode, Thumbs]}
                onSwiper={setThumbsSwiper}
                direction="vertical"
                spaceBetween={props.thumbnailSpacing}
                slidesPerView={props.thumbnailsPerView}
                freeMode={true}
                watchSlidesProgress={true}
                className="thumbnail-swiper h-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url}
                      alt={image.alt || `Thumbnail ${index + 1}`}
                      className={`w-full aspect-square object-cover cursor-pointer opacity-60 hover:opacity-100 transition ${radiusClasses[props.borderRadius]}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
        
        {/* Thumbnails (Bottom) */}
        {props.showThumbnails && props.thumbnailPosition === "bottom" && (
          <div className="mt-4 max-w-4xl mx-auto">
            <Swiper
              modules={[FreeMode, Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={props.thumbnailSpacing}
              slidesPerView={props.thumbnailsPerView}
              freeMode={true}
              watchSlidesProgress={true}
              className="thumbnail-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.url}
                    alt={image.alt || `Thumbnail ${index + 1}`}
                    className={`w-full aspect-square object-cover cursor-pointer opacity-60 hover:opacity-100 transition ${radiusClasses[props.borderRadius]}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        
        <style jsx>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: ${props.navigationColor} !important;
            ${props.navigationSize === "sm" ? "width: 30px; height: 30px;" : ""}
            ${props.navigationSize === "lg" ? "width: 50px; height: 50px;" : ""}
          }
          .swiper-pagination-bullet-active {
            background-color: ${props.paginationColor} !important;
          }
          .thumbnail-swiper .swiper-slide-thumb-active {
            opacity: 1 !important;
            border: 2px solid ${props.paginationColor};
          }
          .main-gallery {
            height: ${containerHeight} !important;
            max-height: ${containerHeight} !important;
            overflow: hidden !important;
          }
          .main-gallery .swiper-wrapper {
            height: ${containerHeight} !important;
            max-height: ${containerHeight} !important;
          }
          .main-gallery .swiper-slide {
            height: ${containerHeight} !important;
            max-height: ${containerHeight} !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            overflow: hidden !important;
          }
        `}</style>
      </div>
    );
  },
};

export default ImageGallery;
