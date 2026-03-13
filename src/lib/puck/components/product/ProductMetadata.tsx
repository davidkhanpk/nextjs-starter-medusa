'use client';

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { Package, Ruler, Weight, Globe } from "lucide-react";

export interface ProductMetadataProps {
  showTitle?: boolean;
  titleText?: string;
  showSku?: boolean;
  showWeight?: boolean;
  showDimensions?: boolean;
  showOrigin?: boolean;
  layout?: "list" | "grid" | "table";
}

export const ProductMetadata: ComponentConfig<ProductMetadataProps> = {
  label: "Product Metadata",

  fields: {
    showTitle: {
      type: "radio",
      label: "Show Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    titleText: {
      type: "text",
      label: "Title Text",
    },
    showSku: {
      type: "radio",
      label: "Show SKU",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showWeight: {
      type: "radio",
      label: "Show Weight",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showDimensions: {
      type: "radio",
      label: "Show Dimensions",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showOrigin: {
      type: "radio",
      label: "Show Origin Country",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "List", value: "list" },
        { label: "Grid", value: "grid" },
        { label: "Table", value: "table" },
      ],
    },
  },

  defaultProps: {
    showTitle: true,
    titleText: "Product Details",
    showSku: true,
    showWeight: true,
    showDimensions: true,
    showOrigin: true,
    layout: "list",
  },

  render: ({
    showTitle,
    titleText,
    showSku,
    showWeight,
    showDimensions,
    showOrigin,
    layout = "list",
  }: ProductMetadataProps) => {
    const { product } = useProduct();

    if (!product) {
      return null;
    }

    // Get the first variant's data for SKU
    const firstVariant = product.variants?.[0];
    const sku = firstVariant?.sku || "N/A";
    const weight = product.weight || firstVariant?.weight || null;
    const length = product.length || firstVariant?.length || null;
    const width = product.width || firstVariant?.width || null;
    const height = product.height || firstVariant?.height || null;
    const originCountry = (product.origin_country as string) || (product.metadata?.origin_country as string) || null;

    // Prepare metadata items
    const metadataItems = [];

    if (showSku && sku) {
      metadataItems.push({
        icon: <Package className="w-5 h-5 text-gray-500" />,
        label: "SKU",
        value: sku,
      });
    }

    if (showWeight && weight) {
      metadataItems.push({
        icon: <Weight className="w-5 h-5 text-gray-500" />,
        label: "Weight",
        value: `${weight} g`,
      });
    }

    if (showDimensions && (length || width || height)) {
      const dimensions = [length, width, height]
        .filter(Boolean)
        .map((d) => `${d} cm`)
        .join(" × ");
      metadataItems.push({
        icon: <Ruler className="w-5 h-5 text-gray-500" />,
        label: "Dimensions",
        value: dimensions,
      });
    }

    if (showOrigin && originCountry) {
      metadataItems.push({
        icon: <Globe className="w-5 h-5 text-gray-500" />,
        label: "Origin",
        value: originCountry,
      });
    }

    if (metadataItems.length === 0) {
      return null;
    }

    // List layout
    if (layout === "list") {
      return (
        <div className="product-metadata">
          {showTitle && (
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{titleText}</h3>
          )}
          <div className="space-y-3">
            {metadataItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                {item.icon}
                <div className="flex-1">
                  <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                  <dd className="text-sm text-gray-900 mt-1">{item.value}</dd>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Grid layout
    if (layout === "grid") {
      return (
        <div className="product-metadata">
          {showTitle && (
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{titleText}</h3>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metadataItems.map((item, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-center mb-2">{item.icon}</div>
                <dt className="text-xs font-medium text-gray-500 mb-1">{item.label}</dt>
                <dd className="text-sm text-gray-900 font-medium">{item.value}</dd>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Table layout
    return (
      <div className="product-metadata">
        {showTitle && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{titleText}</h3>
        )}
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <tbody className="divide-y divide-gray-200">
            {metadataItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-gray-500">{item.label}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
