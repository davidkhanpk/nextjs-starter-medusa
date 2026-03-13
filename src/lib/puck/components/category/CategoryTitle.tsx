"use client"

import { ComponentConfig } from "@measured/puck";
import { useCategory } from "@lib/hooks/useCategory";

export interface CategoryTitleProps {
  tag?: "h1" | "h2" | "h3" | "h4";
  fontSize?: string;
  textColor?: string;
  textAlign?: "left" | "center" | "right";
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
  marginBottom?: string;
}

export const CategoryTitle: ComponentConfig<CategoryTitleProps> = {
  label: "Category Title",

  fields: {
    tag: {
      type: "select",
      label: "HTML Tag",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
      ],
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Theme Default", value: "default" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "X-Large", value: "xl" },
        { label: "2X-Large", value: "2xl" },
        { label: "3X-Large", value: "3xl" },
      ],
    },
    color: {
      type: "select",
      label: "Color",
      options: [
        { label: "Theme Default", value: "default" },
        { label: "Black", value: "black" },
        { label: "Gray", value: "gray" },
        { label: "Primary", value: "primary" },
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
      ],
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semibold", value: "semibold" },
        { label: "Bold", value: "bold" },
      ],
    },
  },

  defaultProps: {
    tag: "h1",
    fontSize: "2xl",
    color: "black",
    alignment: "left",
    fontWeight: "bold",
  },

  render: ({ tag, fontSize, textColor, textAlign, fontWeight, className, marginBottom }) => {
    const { category, theme } = useCategory()
    
    if (!category) {
      return <div className="text-gray-400 italic">Category title will appear here</div>;
    }

    const Tag = tag || "h1";

    const alignmentClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const classes = [
      alignmentClasses[textAlign || "left"],
      weightClasses[fontWeight || "bold"],
      className
    ].filter(Boolean).join(" ");

    return (
      <Tag
        className={classes}
        style={{
          fontSize: fontSize || "2.25rem",
          color: textColor || "#000000",
          marginBottom: marginBottom || "1rem",
          fontFamily: theme?.typography?.heading?.fontFamily,
        }}
      >
        {category.name}
      </Tag>
    );
  },
};
