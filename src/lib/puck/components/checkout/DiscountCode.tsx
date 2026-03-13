'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import DiscountCodeComponent from "@modules/checkout/components/discount-code";
import { usePuckContext } from "@/components/puck/PuckContextProvider";

export interface DiscountCodeProps {
  title: string;
  showTitle: boolean;
  placeholder: string;
  buttonText: string;
}

export const DiscountCode: ComponentConfig<DiscountCodeProps> = {
  label: "Discount Code Input",

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
    placeholder: {
      type: "text",
      label: "Input Placeholder",
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
  },

  defaultProps: {
    title: "Discount Code",
    showTitle: false,
    placeholder: "Enter discount code",
    buttonText: "Apply",
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
        {/* @ts-ignore - Medusa type compatibility */}
        <DiscountCodeComponent cart={cart} />
      </div>
    );
  },
};
