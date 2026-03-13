'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import ItemsPreviewTemplate from "@modules/cart/templates/preview";
import { usePuckContext } from "@/components/puck/PuckContextProvider";

export interface CartItemsPreviewProps {
  title: string;
  showTitle: boolean;
  imageSize: "sm" | "md" | "lg";
  showQuantity: boolean;
}

export const CartItemsPreview: ComponentConfig<CartItemsPreviewProps> = {
  label: "Cart Items Preview",

  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    showTitle: {
      type: "radio",
      label: "Show Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    imageSize: {
      type: "select",
      label: "Image Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    showQuantity: {
      type: "radio",
      label: "Show Quantity",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Order Items",
    showTitle: true,
    imageSize: "md",
    showQuantity: true,
  },

  render: ({ title, showTitle }) => {
    const { context } = usePuckContext();
    const cart = context?.cart;

    if (!cart) {
      return (
        <div className="text-gray-500 p-4 border border-gray-200 rounded">
          Cart data not available
        </div>
      );
    }

    return (
      <div>
        {showTitle && (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}
        <ItemsPreviewTemplate cart={cart} />
      </div>
    );
  },
};
