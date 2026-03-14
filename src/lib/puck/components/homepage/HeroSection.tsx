import { ComponentConfig } from "@measured/puck";
import React from "react";

export interface HeroSectionProps {
  // Content
  title: string;
  subtitle: string;
  description: string;
  
  // CTA Buttons
  showPrimaryButton: boolean;
  primaryButtonText: string;
  primaryButtonLink: string;
  showSecondaryButton: boolean;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  
  // Image
  showImage: boolean;
  imageUrl: string;
  imagePosition: "left" | "right" | "background";
  imageAlt: string;
  
  // Layout
  height: "sm" | "md" | "lg" | "xl" | "full";
  contentAlignment: "left" | "center" | "right";
  verticalAlignment: "top" | "center" | "bottom";
  textColor: string;
  overlayOpacity: number;
  
  // Styling
  backgroundColor: string;
  backgroundGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
}

export const HeroSection: ComponentConfig<HeroSectionProps> = {
  label: "Hero Section",
  
  fields: {
    // Content
    title: {
      type: "text",
      label: "Title",
    },
    subtitle: {
      type: "text",
      label: "Subtitle",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    
    // Primary Button
    showPrimaryButton: {
      type: "radio",
      label: "Show Primary Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    primaryButtonText: {
      type: "text",
      label: "Primary Button Text",
    },
    primaryButtonLink: {
      type: "text",
      label: "Primary Button Link",
    },
    
    // Secondary Button
    showSecondaryButton: {
      type: "radio",
      label: "Show Secondary Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    secondaryButtonText: {
      type: "text",
      label: "Secondary Button Text",
    },
    secondaryButtonLink: {
      type: "text",
      label: "Secondary Button Link",
    },
    
    // Image
    showImage: {
      type: "radio",
      label: "Show Image",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    imageUrl: {
      type: "text",
      label: "Image URL",
    },
    imagePosition: {
      type: "select",
      label: "Image Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
        { label: "Background", value: "background" },
      ],
    },
    imageAlt: {
      type: "text",
      label: "Image Alt Text",
    },
    
    // Layout
    height: {
      type: "select",
      label: "Hero Height",
      options: [
        { label: "Small (400px)", value: "sm" },
        { label: "Medium (500px)", value: "md" },
        { label: "Large (600px)", value: "lg" },
        { label: "Extra Large (700px)", value: "xl" },
        { label: "Full Screen", value: "full" },
      ],
    },
    contentAlignment: {
      type: "select",
      label: "Horizontal Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    verticalAlignment: {
      type: "select",
      label: "Vertical Alignment",
      options: [
        { label: "Top", value: "top" },
        { label: "Center", value: "center" },
        { label: "Bottom", value: "bottom" },
      ],
    },
    textColor: {
      type: "text",
      label: "Text Color (hex)",
    },
    overlayOpacity: {
      type: "number",
      label: "Overlay Opacity (0-100)",
      min: 0,
      max: 100,
    },
    
    // Styling
    backgroundColor: {
      type: "text",
      label: "Background Color (hex)",
    },
    backgroundGradient: {
      type: "radio",
      label: "Use Gradient Background",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    gradientFrom: {
      type: "text",
      label: "Gradient From (hex)",
    },
    gradientTo: {
      type: "text",
      label: "Gradient To (hex)",
    },
  },
  
  defaultProps: {
    title: "Welcome to Our Store",
    subtitle: "Discover Amazing Products",
    description: "Shop the latest trends and exclusive deals on premium products.",
    showPrimaryButton: true,
    primaryButtonText: "Shop Now",
    primaryButtonLink: "/products",
    showSecondaryButton: true,
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
    showImage: true,
    imageUrl: "https://via.placeholder.com/1200x600?text=Hero+Image",
    imagePosition: "right",
    imageAlt: "Hero Image",
    height: "lg",
    contentAlignment: "left",
    verticalAlignment: "center",
    textColor: "#ffffff",
    overlayOpacity: 40,
    backgroundColor: "#000000",
    backgroundGradient: true,
    gradientFrom: "#667eea",
    gradientTo: "#764ba2",
  },
  
  render: (props) => {
    const heightClasses = {
      sm: "h-[400px]",
      md: "h-[500px]",
      lg: "h-[600px]",
      xl: "h-[700px]",
      full: "h-screen",
    };
    
    const textAlignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };
    
    const isBackground = props.imagePosition === "background";
    const verticalMap = { top: "justify-start", center: "justify-center", bottom: "justify-end" };
    const horizontalItemsMap = { left: "items-start", center: "items-center", right: "items-end" };
    const verticalItemsMap = { top: "items-start", center: "items-center", bottom: "items-end" };
    
    // For flex-col (background): justify = vertical, items = horizontal
    // For flex-row (left/right image): items = vertical alignment
    const flexAlignment = isBackground
      ? `${verticalMap[props.verticalAlignment || 'center']} ${horizontalItemsMap[props.contentAlignment]}`
      : `${verticalItemsMap[props.verticalAlignment || 'center']}`;
    
    const contentJustify = verticalMap[props.verticalAlignment || 'center'];
    
    const contentItemsAlign = {
      left: "items-start",
      center: "items-center",
      right: "items-end",
    };
    
    const buttonJustify = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    };
    
    const backgroundStyle = props.backgroundGradient
      ? {
          background: `linear-gradient(135deg, ${props.gradientFrom}, ${props.gradientTo})`,
        }
      : {
          backgroundColor: props.backgroundColor,
        };
    
    return (
      <div
        className={`hero-section relative ${heightClasses[props.height] || 'h-[500px]'} overflow-hidden`}
        style={backgroundStyle}
      >
        {/* Background Image */}
        {props.showImage && props.imagePosition === "background" && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${props.imageUrl})` }}
            />
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: props.overlayOpacity / 100 }}
            />
          </>
        )}
        
        <div className="container mx-auto h-full px-4 relative z-10">
          <div
            className={`h-full flex ${
              props.imagePosition === "left"
                ? "flex-row-reverse"
                : props.imagePosition === "right"
                ? "flex-row"
                : "flex-col"
            } gap-8 ${textAlignClasses[props.contentAlignment] || 'text-center'} ${flexAlignment}`}
          >
            {/* Content Column */}
            <div className={`flex flex-col ${contentJustify} ${contentItemsAlign[props.contentAlignment]} ${props.imagePosition !== "background" ? "w-1/2" : "w-full"}`}>
              {props.subtitle && (
                <p
                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                  style={{ color: props.textColor, opacity: 0.8 }}
                >
                  {props.subtitle}
                </p>
              )}
              
              <h1
                className="text-5xl font-bold mb-4"
                style={{ color: props.textColor }}
              >
                {props.title}
              </h1>
              
              {props.description && (
                <p
                  className={`text-xl mb-8 max-w-2xl ${props.contentAlignment === 'center' ? 'mx-auto' : props.contentAlignment === 'right' ? 'ml-auto' : ''}`}
                  style={{ color: props.textColor, opacity: 0.9 }}
                >
                  {props.description}
                </p>
              )}
              
              {/* CTA Buttons */}
              <div className={`flex gap-4 ${buttonJustify[props.contentAlignment]}`}>
                {props.showPrimaryButton && (
                  <a
                    href={props.primaryButtonLink}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition"
                  >
                    {props.primaryButtonText}
                  </a>
                )}
                
                {props.showSecondaryButton && (
                  <a
                    href={props.secondaryButtonLink}
                    className="px-8 py-3 border-2 font-semibold rounded-lg hover:bg-white/10 transition"
                    style={{ 
                      borderColor: props.textColor,
                      color: props.textColor,
                    }}
                  >
                    {props.secondaryButtonText}
                  </a>
                )}
              </div>
            </div>
            
            {/* Image Column */}
            {props.showImage && props.imagePosition !== "background" && (
              <div className="w-1/2 flex items-center justify-center">
                <img
                  src={props.imageUrl}
                  alt={props.imageAlt}
                  className="max-w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export default HeroSection;
