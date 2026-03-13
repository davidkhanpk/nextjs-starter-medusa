'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import Link from "@/components/common/SafeLink";

export interface LogoProps {
  imageUrl: string;
  altText: string;
  linkTo: string;
  maxWidth: string;
  maxHeight: string;
  showText: boolean;
  text?: string;
  textPosition: "right" | "below";
  textSize: "sm" | "base" | "lg" | "xl";
  textColor: string;
  textWeight: "normal" | "medium" | "semibold" | "bold";
}

export const Logo: ComponentConfig<LogoProps> = {
  label: "Logo",
  
  fields: {
    altText: {
      type: "text",
      label: "Alt Text",
    },
    linkTo: {
      type: "text",
      label: "Link To",
    },
    maxWidth: {
      type: "text",
      label: "Max Width (e.g., 150px)",
    },
    maxHeight: {
      type: "text",
      label: "Max Height (e.g., 60px)",
    },
    showText: {
      type: "radio",
      label: "Show Store Name",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    text: {
      type: "text",
      label: "Store Name",
    },
    textPosition: {
      type: "select",
      label: "Text Position",
      options: [
        { label: "Right of Logo", value: "right" },
        { label: "Below Logo", value: "below" },
      ],
    },
    textSize: {
      type: "select",
      label: "Text Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    textWeight: {
      type: "select",
      label: "Text Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semibold", value: "semibold" },
        { label: "Bold", value: "bold" },
      ],
    },
  },

  defaultProps: {
    imageUrl: "",
    altText: "Store Logo",
    linkTo: "/",
    maxWidth: "150px",
    maxHeight: "60px",
    showText: true,
    text: "My Store",
    textPosition: "right",
    textSize: "xl",
    textColor: "#000000",
    textWeight: "bold",
  },

  render: ({
    imageUrl,
    altText,
    linkTo,
    maxWidth,
    maxHeight,
    showText,
    text,
    textPosition,
    textSize,
    textColor,
    textWeight,
  }) => {
    const textSizeClasses = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    const fontWeightMap = {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    };

    const hasImage = imageUrl && imageUrl.trim() !== '' && imageUrl !== '/logo.svg';

    return (
      <Link 
        href={linkTo}
        className={`flex items-center gap-3 ${textPosition === 'below' ? 'flex-col' : 'flex-row'}`}
      >
        {hasImage ? (
          <div
            style={{
              maxWidth,
              maxHeight,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={imageUrl}
              alt={altText}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        ) : null}
        {(showText || !hasImage) && text && (
          <span 
            className={`${textSizeClasses[textSize]}`}
            style={{ 
              color: textColor,
              fontWeight: fontWeightMap[textWeight],
            }}
          >
            {text}
          </span>
        )}
      </Link>
    );
  },
};
