'use client';

import React, { useState, useEffect } from "react";
import { ComponentConfig } from "@measured/puck";
import { usePuckContext } from "@/components/puck/PuckContextProvider";
import { RadioGroup, Radio } from "@headlessui/react";
import { setShippingMethod } from "@lib/data/cart";
import { calculatePriceForShippingOption } from "@lib/data/fulfillment";
import { convertToLocale } from "@lib/util/money";
import MedusaRadio from "@modules/common/components/radio";
import { Button, clx } from "@medusajs/ui";
import { CheckCircleSolid } from "@medusajs/icons";
import ErrorMessage from "@modules/checkout/components/error-message";

export interface ShippingMethodProps {
  title: string;
  showTitle: boolean;
  showDeliveryEstimate: boolean;
}

export const ShippingMethod: ComponentConfig<ShippingMethodProps> = {
  label: "Shipping Method Selector",

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
    showDeliveryEstimate: {
      type: "radio",
      label: "Show Delivery Estimate",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Shipping Method",
    showTitle: true,
    showDeliveryEstimate: true,
  },

  render: () => {
    const { context } = usePuckContext();
    const cart = context?.cart;
    const availableShippingMethods = context?.availableShippingMethods || [];

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [shippingMethodId, setShippingMethodId] = useState<string | null>(
      cart?.shipping_methods?.at(-1)?.shipping_option_id || null
    );
    const [calculatedPricesMap, setCalculatedPricesMap] = useState<Record<string, number>>({});

    useEffect(() => {
      if (availableShippingMethods?.length) {
        const promises = availableShippingMethods
          .filter((sm: any) => sm.price_type === "calculated")
          .map((sm: any) => calculatePriceForShippingOption(sm.id, cart?.id));

        if (promises.length) {
          Promise.allSettled(promises).then((res) => {
            const pricesMap: Record<string, number> = {};
            res
              .filter((r) => r.status === "fulfilled")
              .forEach((p: any) => (pricesMap[p.value?.id || ""] = p.value?.amount!));
            setCalculatedPricesMap(pricesMap);
          });
        }
      }
    }, [availableShippingMethods, cart?.id]);

    if (!cart) {
      return (
        <div className="text-gray-500 p-4 border border-gray-200 rounded">
          Cart data not available
        </div>
      );
    }

    const handleChange = async (value: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await setShippingMethod({ cartId: cart.id!, shippingMethodId: value });
        setShippingMethodId(value);
      } catch (err: any) {
        setError(err.message || "Failed to set shipping method");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="bg-white">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Delivery</h2>

          {availableShippingMethods && availableShippingMethods.length > 0 ? (
            <>
              <RadioGroup value={shippingMethodId} onChange={handleChange}>
                <div className="flex flex-col gap-y-2">
                  {availableShippingMethods.map((option: any) => {
                    const price =
                      option.price_type === "calculated"
                        ? calculatedPricesMap[option.id]
                        : option.amount;

                    return (
                      <Radio key={option.id} value={option.id} className="group flex cursor-pointer">
                        {({ checked }) => (
                          <div
                            className={clx(
                              "flex w-full items-center justify-between p-4 border rounded-lg",
                              {
                                "border-gray-900": checked,
                                "border-gray-200": !checked,
                              }
                            )}
                          >
                            <div className="flex items-center gap-x-4">
                              <MedusaRadio checked={checked} />
                              <div>
                                <p className="font-medium">{option.name}</p>
                                {option.estimated_delivery && (
                                  <p className="text-sm text-gray-500">
                                    {option.estimated_delivery}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="font-medium">
                              {price !== undefined
                                ? convertToLocale({
                                    amount: price,
                                    currency_code: cart.currency_code,
                                  })
                                : "Calculating..."}
                            </span>
                          </div>
                        )}
                      </Radio>
                    );
                  })}
                </div>
              </RadioGroup>
              <ErrorMessage error={error} data-testid="delivery-option-error-message" />
            </>
          ) : (
            <div className="text-gray-500 p-4 border border-gray-200 rounded">
              No shipping methods available
            </div>
          )}
        </div>
      </div>
    );
  },
};
