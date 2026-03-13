'use client';

import React, { useState, useEffect } from "react";
import { ComponentConfig } from "@measured/puck";
import { usePuckContext } from "@/components/puck/PuckContextProvider";
import { RadioGroup } from "@headlessui/react";
import { paymentInfoMap } from "@lib/constants";
import { initiatePaymentSession } from "@lib/data/cart";
import { CreditCard } from "@medusajs/icons";
import { Container, clx } from "@medusajs/ui";
import PaymentContainer from "@modules/checkout/components/payment-container";
import MedusaRadio from "@modules/common/components/radio";
import ErrorMessage from "@modules/checkout/components/error-message";

export interface PaymentMethodProps {
  title: string;
  showTitle: boolean;
  showSecurityBadge: boolean;
}

export const PaymentMethod: ComponentConfig<PaymentMethodProps> = {
  label: "Payment Method Selector",

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
    showSecurityBadge: {
      type: "radio",
      label: "Show Security Badge",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Payment",
    showTitle: true,
    showSecurityBadge: true,
  },

  render: () => {
    console.log('[PaymentMethod] Component rendering');
    const { context } = usePuckContext();
    console.log('[PaymentMethod] Context:', { hasContext: !!context, hasCart: !!context?.cart, methodsCount: context?.availablePaymentMethods?.length || 0 });
    const cart = context?.cart;
    const availablePaymentMethods = context?.availablePaymentMethods || [];

    const activeSession = cart?.payment_collection?.payment_sessions?.find(
      (paymentSession: any) => paymentSession.status === "pending"
    );

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
      activeSession?.provider_id ?? ""
    );

    if (!cart) {
      console.warn('[PaymentMethod] Cart data not available');
      return (
        <div className="text-gray-500 p-4 border border-gray-200 rounded">
          Cart data not available
        </div>
      );
    }

    const setPaymentMethod = async (method: string) => {
      setError(null);
      setIsLoading(true);
      try {
        setSelectedPaymentMethod(method);
        await initiatePaymentSession(cart, { provider_id: method });
      } catch (err: any) {
        setError(err.message || "Failed to set payment method");
      } finally {
        setIsLoading(false);
      }
    };

    console.log('[PaymentMethod] Rendering payment form');
    return (
      <div className="bg-white">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Payment</h2>

          {availablePaymentMethods && availablePaymentMethods.length > 0 ? (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                <div className="flex flex-col gap-y-2">
                  {availablePaymentMethods.map((paymentMethod: any) => {
                    return (
                      <PaymentContainer
                        paymentProviderId={paymentMethod.id}
                        key={paymentMethod.id}
                        paymentInfoMap={paymentInfoMap}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    );
                  })}
                </div>
              </RadioGroup>
              <ErrorMessage error={error} data-testid="payment-method-error-message" />
            </>
          ) : (
            <div className="text-gray-500 p-4 border border-gray-200 rounded">
              No payment methods available
            </div>
          )}
        </div>
      </div>
    );
  },
};
