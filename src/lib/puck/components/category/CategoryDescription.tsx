"use client"

import { ComponentConfig } from "@measured/puck";
import { useCategory } from "@lib/hooks/useCategory";

export interface CategoryDescriptionProps {
  fontSize?: string;
  textColor?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: string;
  maxWidth?: string;
  className?: string;
  marginBottom?: string;
}

export const CategoryDescription: ComponentConfig<CategoryDescriptionProps> = {
  label: "Category Description",

  fields: {
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "X-Large", value: "xl" },
      ],
    },
    color: {
      type: "select",
      label: "Color",
      options: [
        { label: "Theme Default", value: "default" },
        { label: "Black", value: "black" },
        { label: "Gray", value: "gray" },
        { label: "Muted", value: "muted" },
        { label: "White", value: "white" },
      ],
    },
    alignment: {
      type: "radio",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
      ],
    },
    lineHeight: {
      type: "select",
      label: "Line Height",
      options: [
        { label: "Tight", value: "tight" },
        { label: "Normal", value: "normal" },
        { label: "Relaxed", value: "relaxed" },
        { label: "Loose", value: "loose" },
      ],
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "X-Large", value: "xl" },
        { label: "2X-Large", value: "2xl" },
        { label: "Full", value: "full" },
      ],
    },
  },

  defaultProps: {
    fontSize: "base",
    color: "gray",
    alignment: "left",
    lineHeight: "relaxed",
    maxWidth: "full",
  },

  render: ({ fontSize, textColor, textAlign, lineHeight, maxWidth, className, marginBottom }) => {
    const { category, theme } = useCategory()
    
    if (!category || !category.description) {
      return null;
    }

    const alignmentClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    };

    const classes = [
      alignmentClasses[textAlign || "left"],
      className
    ].filter(Boolean).join(" ");

    return (
      <div
        className={classes}
        style={{
          fontSize: fontSize || "1rem",
          color: textColor || "#666666",
          lineHeight: lineHeight || "1.6",
          maxWidth: maxWidth || "100%",
          marginBottom: marginBottom || "2rem",
          fontFamily: theme?.typography?.body?.fontFamily,
        }}
      >
        <p>{category.description}</p>
      </div>
    );
  },
};
