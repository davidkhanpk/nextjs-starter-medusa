"use client"

import { ComponentConfig } from "@measured/puck";
import { useCategory } from "@lib/hooks/useCategory";
import { Tag, Package, Calendar } from "lucide-react";

export interface CategoryMetadataProps {
  showHandle?: boolean;
  showProductCount?: boolean;
  showUpdatedDate?: boolean;
  layout?: "horizontal" | "vertical";
  fontSize?: string;
  textColor?: string;
  iconColor?: string;
  spacing?: string;
  className?: string;
}

export const CategoryMetadata: ComponentConfig<CategoryMetadataProps> = {
  label: "Category Metadata",

  fields: {
    showHandle: {
      type: "radio",
      label: "Show Category Handle",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showProductCount: {
      type: "radio",
      label: "Show Product Count",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showUpdatedDate: {
      type: "radio",
      label: "Show Last Updated Date",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    layout: {
      type: "radio",
      label: "Layout",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
    },
    fontSize: {
      type: "text",
      label: "Font Size (e.g., 0.875rem, 14px)",
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    iconColor: {
      type: "text",
      label: "Icon Color",
    },
    spacing: {
      type: "text",
      label: "Item Spacing (e.g., 1rem, 16px)",
    },
    className: {
      type: "text",
      label: "Custom CSS Classes",
    },
  },

  defaultProps: {
    showHandle: false,
    showProductCount: true,
    showUpdatedDate: false,
    layout: "horizontal",
    fontSize: "0.875rem",
    textColor: "#666666",
    iconColor: "#999999",
    spacing: "1rem",
    className: "",
  },

  render: ({ showHandle, showProductCount, showUpdatedDate, layout, fontSize, textColor, iconColor, spacing, className }) => {
    const { category } = useCategory()
    
    if (!category) {
      return null;
    }

    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: layout === "vertical" ? "column" : "row",
      gap: spacing,
      alignItems: layout === "vertical" ? "flex-start" : "center",
      flexWrap: "wrap",
    };

    const itemStyle: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize,
      color: textColor,
    };

    const metadataItems = [];

    if (showHandle) {
      metadataItems.push(
        <div key="handle" style={itemStyle}>
          <Tag style={{ color: iconColor }} size={16} />
          <span>
            Handle: <span style={{ fontWeight: 500 }}>{category.handle}</span>
          </span>
        </div>
      );
    }

    if (showProductCount) {
      const productCount = category.product_count || 0;
      metadataItems.push(
        <div key="count" style={itemStyle}>
          <Package style={{ color: iconColor }} size={16} />
          <span>
            <span style={{ fontWeight: 500 }}>{productCount}</span> Product{productCount !== 1 ? "s" : ""}
          </span>
        </div>
      );
    }

    if (showUpdatedDate && category.updated_at) {
      const date = new Date(category.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      metadataItems.push(
        <div key="updated" style={itemStyle}>
          <Calendar style={{ color: iconColor }} size={16} />
          <span>
            Updated: <span style={{ fontWeight: 500 }}>{date}</span>
          </span>
        </div>
      );
    }

    if (metadataItems.length === 0) {
      return null;
    }

    return (
      <div className={className} style={containerStyle}>
        {metadataItems}
      </div>
    );
  },
};
