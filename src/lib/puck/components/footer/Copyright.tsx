'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";

export interface CopyrightProps {
  text: string;
  showYear: boolean;
  alignment: "left" | "center" | "right";
  fontSize: "xs" | "sm" | "base";
  textColor: string;
  showDivider: boolean;
  dividerColor: string;
  paddingTop: string;
  paddingBottom: string;
}

export const Copyright: ComponentConfig<CopyrightProps> = {
  label: "Copyright",
  
  fields: {
    text: {
      type: "textarea",
      label: "Copyright Text",
    },
    showYear: {
      type: "radio",
      label: "Show Current Year",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    alignment: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Extra Small", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
      ],
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    showDivider: {
      type: "radio",
      label: "Show Top Divider",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    dividerColor: {
      type: "text",
      label: "Divider Color",
    },
    paddingTop: {
      type: "text",
      label: "Padding Top (e.g., 1rem)",
    },
    paddingBottom: {
      type: "text",
      label: "Padding Bottom (e.g., 1rem)",
    },
  },

  defaultProps: {
    text: "All rights reserved.",
    showYear: true,
    alignment: "center",
    fontSize: "sm",
    textColor: "#6b7280",
    showDivider: true,
    dividerColor: "#e5e7eb",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
  },

  render: ({
    text,
    showYear,
    alignment,
    fontSize,
    textColor,
    showDivider,
    dividerColor,
    paddingTop,
    paddingBottom,
  }) => {
    const currentYear = new Date().getFullYear();
    
    const alignmentClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    const fontSizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
    };

    return (
      <div 
        className="w-full"
        style={{
          paddingTop,
          paddingBottom,
          borderTop: showDivider ? `1px solid ${dividerColor}` : 'none',
        }}
      >
        <div className="container mx-auto px-4">
          <p 
            className={`${alignmentClasses[alignment]} ${fontSizeClasses[fontSize]}`}
            style={{ color: textColor }}
          >
            {showYear && `© ${currentYear} `}
            {text}
          </p>
        </div>
      </div>
    );
  },
};
