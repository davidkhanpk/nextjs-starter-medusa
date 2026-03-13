'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import CartTotals from "@modules/common/components/cart-totals";
import { usePuckContext } from "@/components/puck/PuckContextProvider";

export interface OrderTotalsProps {
  title: string;
  showTitle: boolean;
  showSubtotal: boolean;
  showShipping: boolean;
  showTax: boolean;
  showDiscount: boolean;
}

export const OrderTotals: ComponentConfig<OrderTotalsProps> = {
  label: "Order Totals",

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
    showSubtotal: {
      type: "radio",
      label: "Show Subtotal",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showShipping: {
      type: "radio",
      label: "Show Shipping",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showTax: {
      type: "radio",
      label: "Show Tax",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showDiscount: {
      type: "radio",
      label: "Show Discount",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Order Total",
    showTitle: true,
    showSubtotal: true,
    showShipping: true,
    showTax: true,
    showDiscount: true,
  },

  render: ({ title, showTitle }) => {
    console.log('[OrderTotals] Component rendering', { title, showTitle });
    const { context } = usePuckContext();
    console.log('[OrderTotals] Context:', { hasContext: !!context, hasCart: !!context?.cart });
    const cart = context?.cart;

    if (!cart) {
      console.warn('[OrderTotals] Cart data not available');
      return (
        <div className="text-gray-500 p-4 border border-gray-200 rounded">
          Cart data not available
        </div>
      );
    }

    console.log('[OrderTotals] Rendering CartTotals component');
    return (
      <div>
        {showTitle && (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}
        <CartTotals totals={cart} />
      </div>
    );
  },
};
