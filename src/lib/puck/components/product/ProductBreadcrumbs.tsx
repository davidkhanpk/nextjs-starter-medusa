'use client';

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { Home, ChevronRight } from "lucide-react";
import Link from "@/components/common/SafeLink";

export interface ProductBreadcrumbsProps {
  showHomeIcon?: boolean;
  separator?: "arrow" | "slash" | "dot";
  textTransform?: "none" | "uppercase" | "capitalize";
}

export const ProductBreadcrumbs: ComponentConfig<ProductBreadcrumbsProps> = {
  label: "Product Breadcrumbs",

  fields: {
    showHomeIcon: {
      type: "radio",
      label: "Show Home Icon",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    separator: {
      type: "select",
      label: "Separator",
      options: [
        { label: "Arrow", value: "arrow" },
        { label: "Slash", value: "slash" },
        { label: "Dot", value: "dot" },
      ],
    },
    textTransform: {
      type: "select",
      label: "Text Transform",
      options: [
        { label: "None", value: "none" },
        { label: "Uppercase", value: "uppercase" },
        { label: "Capitalize", value: "capitalize" },
      ],
    },
  },

  defaultProps: {
    showHomeIcon: true,
    separator: "arrow",
    textTransform: "none",
  },

  render: ({
    showHomeIcon,
    separator = "arrow",
    textTransform = "none",
  }: ProductBreadcrumbsProps) => {
    const { product } = useProduct();

    if (!product) {
      return null;
    }

    // Build breadcrumb path
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/store" },
    ];

    // Add collection if available
    if (product.collection) {
      breadcrumbs.push({
        label: product.collection.title,
        href: `/collections/${product.collection.handle}`,
      });
    }

    // Add categories if available
    if (product.categories && product.categories.length > 0) {
      product.categories.forEach((category: any) => {
        breadcrumbs.push({
          label: category.name,
          href: `/categories/${category.handle}`,
        });
      });
    }

    // Add current product
    breadcrumbs.push({
      label: product.title,
      href: "#",
    });

    const getSeparator = () => {
      if (separator === "arrow") {
        return <ChevronRight className="w-4 h-4 text-gray-400" />;
      }
      if (separator === "slash") {
        return <span className="text-gray-400">/</span>;
      }
      if (separator === "dot") {
        return <span className="text-gray-400">•</span>;
      }
    };

    const textClasses = {
      none: "",
      uppercase: "uppercase",
      capitalize: "capitalize",
    };

    return (
      <nav className="product-breadcrumbs mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {breadcrumbs.map((crumb, index) => {
            const isFirst = index === 0;
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {!isFirst && (
                  <span className="flex items-center">{getSeparator()}</span>
                )}

                {isLast ? (
                  <span
                    className={`text-gray-900 font-medium ${textClasses[textTransform] || ''}`}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={`text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 ${textClasses[textTransform] || ''}`}
                  >
                    {isFirst && showHomeIcon && (
                      <Home className="w-4 h-4" />
                    )}
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
};
