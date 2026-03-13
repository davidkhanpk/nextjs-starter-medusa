'use client';

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { Check, AlertCircle, XCircle, Clock } from "lucide-react";

export interface StockIndicatorProps {
  showIcon?: boolean;
  showText?: boolean;
  showQuantity?: boolean;
  lowStockThreshold?: number;
  style?: "default" | "badge" | "minimal";
}

export const StockIndicator: ComponentConfig<StockIndicatorProps> = {
  label: "Stock Indicator",

  fields: {
    showIcon: {
      type: "radio",
      label: "Show Icon",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showText: {
      type: "radio",
      label: "Show Text",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showQuantity: {
      type: "radio",
      label: "Show Quantity Available",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    lowStockThreshold: {
      type: "number",
      label: "Low Stock Threshold",
    },
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Default", value: "default" },
        { label: "Badge", value: "badge" },
        { label: "Minimal", value: "minimal" },
      ],
    },
  },

  defaultProps: {
    showIcon: true,
    showText: true,
    showQuantity: true,
    lowStockThreshold: 10,
    style: "default",
  },

  render: ({
    showIcon,
    showText,
    showQuantity,
    lowStockThreshold = 10,
    style = "default",
  }: StockIndicatorProps) => {
    const { product } = useProduct();

    if (!product) {
      return null;
    }

    // Calculate total inventory across all variants
    const totalInventory = product.variants?.reduce((total: number, variant: any) => {
      return total + (variant.inventory_quantity || 0);
    }, 0) || 0;

    // Determine stock status
    let stockStatus: "in-stock" | "low-stock" | "out-of-stock" | "pre-order";
    let statusText: string;
    let statusIcon: React.ReactNode;
    let statusColor: string;

    if (totalInventory === 0) {
      stockStatus = "out-of-stock";
      statusText = "Out of Stock";
      statusIcon = <XCircle className="w-5 h-5" />;
      statusColor = "text-red-600 bg-red-50 border-red-200";
    } else if (totalInventory <= lowStockThreshold) {
      stockStatus = "low-stock";
      statusText = "Low Stock";
      statusIcon = <AlertCircle className="w-5 h-5" />;
      statusColor = "text-orange-600 bg-orange-50 border-orange-200";
    } else {
      stockStatus = "in-stock";
      statusText = "In Stock";
      statusIcon = <Check className="w-5 h-5" />;
      statusColor = "text-green-600 bg-green-50 border-green-200";
    }

    // Check if product is pre-order
    const isPreOrder = product.metadata?.is_pre_order === true;
    if (isPreOrder) {
      stockStatus = "pre-order";
      statusText = "Pre-Order";
      statusIcon = <Clock className="w-5 h-5" />;
      statusColor = "text-blue-600 bg-blue-50 border-blue-200";
    }

    // Default style
    if (style === "default") {
      return (
        <div className={`stock-indicator flex items-center gap-2 ${statusColor} p-3 rounded-lg border`}>
          {showIcon && <span className="flex-shrink-0">{statusIcon}</span>}
          <div className="flex-1">
            {showText && (
              <span className="font-medium text-sm">{statusText}</span>
            )}
            {showQuantity && totalInventory > 0 && !isPreOrder && (
              <span className="text-xs ml-2">
                ({totalInventory} available)
              </span>
            )}
          </div>
        </div>
      );
    }

    // Badge style
    if (style === "badge") {
      return (
        <span className={`stock-indicator inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {showIcon && <span className="flex-shrink-0">{statusIcon}</span>}
          {showText && <span>{statusText}</span>}
          {showQuantity && totalInventory > 0 && !isPreOrder && (
            <span>• {totalInventory}</span>
          )}
        </span>
      );
    }

    // Minimal style
    return (
      <div className={`stock-indicator flex items-center gap-2 text-sm ${statusColor.split(' ')[0]}`}>
        {showIcon && <span className="flex-shrink-0">{statusIcon}</span>}
        {showText && <span className="font-medium">{statusText}</span>}
        {showQuantity && totalInventory > 0 && !isPreOrder && (
          <span className="text-xs opacity-75">
            ({totalInventory} available)
          </span>
        )}
      </div>
    );
  },
};
