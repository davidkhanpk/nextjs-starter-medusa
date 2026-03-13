"use client"

import { ComponentConfig } from "@measured/puck";
import { useCategory } from "@lib/hooks/useCategory";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export interface CategoryBreadcrumbsProps {
  separator?: string;
  showHome?: boolean;
  homeText?: string;
  fontSize?: string;
  textColor?: string;
  activeColor?: string;
  hoverColor?: string;
  marginBottom?: string;
  className?: string;
}

export const CategoryBreadcrumbs: ComponentConfig<CategoryBreadcrumbsProps> = {
  label: "Category Breadcrumbs",

  fields: {
    separator: {
      type: "text",
      label: "Separator",
    },
    showHome: {
      type: "radio",
      label: "Show Home Link",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    homeText: {
      type: "text",
      label: "Home Link Text",
    },
    fontSize: {
      type: "text",
      label: "Font Size (e.g., 0.875rem, 14px)",
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    activeColor: {
      type: "text",
      label: "Active/Current Color",
    },
    hoverColor: {
      type: "text",
      label: "Hover Color",
    },
    marginBottom: {
      type: "text",
      label: "Margin Bottom (e.g., 1rem, 16px)",
    },
    className: {
      type: "text",
      label: "Custom CSS Classes",
    },
  },

  defaultProps: {
    separator: "/",
    showHome: true,
    homeText: "Home",
    fontSize: "0.875rem",
    textColor: "#666666",
    activeColor: "#000000",
    hoverColor: "#333333",
    marginBottom: "1.5rem",
    className: "",
  },

  render: ({ separator, showHome, homeText, fontSize, textColor, activeColor, hoverColor, marginBottom, className }) => {
    const { category, countryCode } = useCategory()
    
    if (!category) {
      return null;
    }

    const baseStyle: React.CSSProperties = {
      fontSize,
      color: textColor,
      marginBottom,
    };

    // Build breadcrumb trail from parent categories
    const breadcrumbs = [];
    let currentCategory = category;
    
    while (currentCategory.parent_category) {
      breadcrumbs.unshift(currentCategory.parent_category);
      currentCategory = currentCategory.parent_category;
    }

    return (
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center gap-2 ${className}`}
        style={baseStyle}
      >
        {showHome && (
          <>
            <LocalizedClientLink 
              href="/" 
              style={{ color: textColor }}
              className="hover:opacity-80 transition-opacity"
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor || textColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor || "#666666"}
            >
              {homeText}
            </LocalizedClientLink>
            <span>{separator}</span>
          </>
        )}
        
        {breadcrumbs.map((parent) => (
          <span key={parent.id} className="flex items-center gap-2">
            <LocalizedClientLink 
              href={`/${countryCode}/categories/${parent.handle}`}
              style={{ color: textColor }}
              className="hover:opacity-80 transition-opacity"
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor || textColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor || "#666666"}
            >
              {parent.name}
            </LocalizedClientLink>
            <span>{separator}</span>
          </span>
        ))}
        
        <span style={{ color: activeColor }} aria-current="page">
          {category.name}
        </span>
      </nav>
    );
  },
};
