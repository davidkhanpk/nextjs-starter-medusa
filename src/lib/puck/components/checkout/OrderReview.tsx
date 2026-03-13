'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import PaymentButton from "@modules/checkout/components/payment-button";
import { usePuckContext } from "@/components/puck/PuckContextProvider";
import { Text } from "@medusajs/ui";

export interface OrderReviewProps {
  title: string;
  showTitle: boolean;
  buttonText: string;
  showTermsCheckbox: boolean;
}

export const OrderReview: ComponentConfig<OrderReviewProps> = {
  label: "Order Review & Submit",

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
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    showTermsCheckbox: {
      type: "radio",
      label: "Show Terms & Conditions Checkbox",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Review Order",
    showTitle: true,
    buttonText: "Place Order",
    showTermsCheckbox: true,
  },

  render: ({ showTitle, buttonText }) => {
    console.log('[OrderReview] Component rendering', { showTitle, buttonText });
    const { context } = usePuckContext();
    console.log('[OrderReview] Context:', { hasContext: !!context, hasCart: !!context?.cart });
    const cart = context?.cart;

    if (!cart) {
      console.warn('[OrderReview] Cart data not available');
      return (
        <div className="text-gray-500 p-4 border border-gray-200 rounded">
          Cart data not available
        </div>
      );
    }

    console.log('[OrderReview] Rendering Review component');
    
    // In Puck context, always show the Place Order button
    // The PaymentButton component handles its own validation and disabled state
    return (
      <div className="bg-white">
        {showTitle && (
          <div className="flex flex-row items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">{buttonText || 'Place Order'}</h2>
          </div>
        )}
        
        <div className="flex items-start gap-x-1 w-full mb-6">
          <div className="w-full">
            <Text className="txt-medium-plus text-ui-fg-base mb-1">
              By clicking the Place Order button, you confirm that you have
              read, understand and accept our Terms of Use, Terms of Sale and
              Returns Policy and acknowledge that you have read Medusa
              Store&apos;s Privacy Policy.
            </Text>
          </div>
        </div>
        <PaymentButton cart={cart} data-testid="submit-order-button" />
      </div>
    );
  },
};
