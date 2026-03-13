'use client';

import { ComponentConfig } from "@measured/puck";
import { useOrder } from "@lib/hooks/useOrder";
import { usePuck } from "@measured/puck";

export interface OrderDetailsProps {
  showItemImages: boolean;
  showItemQuantity: boolean;
  showItemPrice: boolean;
  showShippingAddress: boolean;
  showBillingAddress: boolean;
  showPaymentMethod: boolean;
  showShippingMethod: boolean;
  showPricingBreakdown: boolean;
  compactView: boolean;
}

export const OrderDetails: ComponentConfig<OrderDetailsProps> = {
  label: "Order Details",

  fields: {
    compactView: {
      type: "radio",
      label: "Compact View",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showItemImages: {
      type: "radio",
      label: "Show Item Images",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showItemQuantity: {
      type: "radio",
      label: "Show Item Quantity",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showItemPrice: {
      type: "radio",
      label: "Show Item Prices",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showShippingAddress: {
      type: "radio",
      label: "Show Shipping Address",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showBillingAddress: {
      type: "radio",
      label: "Show Billing Address",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showPaymentMethod: {
      type: "radio",
      label: "Show Payment Method",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showShippingMethod: {
      type: "radio",
      label: "Show Shipping Method",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showPricingBreakdown: {
      type: "radio",
      label: "Show Pricing Breakdown",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    showItemImages: true,
    showItemQuantity: true,
    showItemPrice: true,
    showShippingAddress: true,
    showBillingAddress: true,
    showPaymentMethod: true,
    showShippingMethod: true,
    showPricingBreakdown: true,
    compactView: false,
  },

  render: (props) => {
    const { appState } = usePuck();
    const orderId = (appState.data as any)?.context?.orderId as string | undefined;
    const { order, isLoading } = useOrder(orderId);

    if (isLoading) {
      return (
        <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-32 bg-gray-200 rounded-lg" />
            <div className="h-32 bg-gray-200 rounded-lg" />
          </div>
        </div>
      );
    }

    if (!order) {
      return (
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-gray-500">Order not found</p>
        </div>
      );
    }

    const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items && order.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                {props.showItemImages && item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={`${props.compactView ? 'w-16 h-16' : 'w-20 h-20'} object-cover rounded flex-shrink-0`}
                  />
                )}
                <div className="flex-1">
                  <h4 className={`${props.compactView ? 'text-sm' : 'text-base'} font-medium text-gray-900`}>
                    {item.title}
                  </h4>
                  {item.variant_title && (
                    <p className={`${props.compactView ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>
                      {item.variant_title}
                    </p>
                  )}
                  {props.showItemQuantity && (
                    <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                  )}
                </div>
                {props.showItemPrice && (
                  <div className="text-right">
                    <p className={`${props.compactView ? 'text-sm' : 'text-base'} font-medium text-gray-900`}>
                      {formatPrice(item.total)}
                    </p>
                    {item.quantity > 1 && !props.compactView && (
                      <p className="text-xs text-gray-500 mt-1">
                        {formatPrice(item.unit_price)} each
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Addresses & Payment */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          {props.showShippingAddress && order.shipping_address && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
              <div className={`${props.compactView ? 'text-sm' : 'text-base'} text-gray-600 space-y-1`}>
                <p>{order.shipping_address?.first_name} {order.shipping_address?.last_name}</p>
                <p>{order.shipping_address?.address_1}</p>
                <p>
                  {order.shipping_address?.city}, {order.shipping_address?.province} {order.shipping_address?.postal_code}
                </p>
                <p>{String(order.shipping_address?.country_code || '')}</p>
              </div>
            </div>
          )}

          {/* Billing Address */}
          {props.showBillingAddress && order.billing_address && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Billing Address</h3>
              <div className={`${props.compactView ? 'text-sm' : 'text-base'} text-gray-600 space-y-1`}>
                <p>{order.billing_address?.first_name} {order.billing_address?.last_name}</p>
                <p>{order.billing_address?.address_1}</p>
                <p>
                  {order.billing_address?.city}, {order.billing_address?.province} {order.billing_address?.postal_code}
                </p>
                <p>{String(order.billing_address?.country_code || '')}</p>
              </div>
            </div>
          )}

          {/* Payment Method */}
          {props.showPaymentMethod && order.payment_collections && order.payment_collections.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
              <div className={`${props.compactView ? 'text-sm' : 'text-base'} text-gray-600`}>
                <p>Payment Provider: {order.payment_collections?.[0]?.payment_providers?.[0]?.id || 'N/A'}</p>
                <p className="text-xs text-gray-500 mt-1">Status: {order.payment_collections?.[0]?.status}</p>
              </div>
            </div>
          )}

          {/* Shipping Method */}
          {props.showShippingMethod && order.shipping_methods && order.shipping_methods.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Shipping Method</h3>
              <div className={`${props.compactView ? 'text-sm' : 'text-base'} text-gray-600`}>
                <p>{order.shipping_methods?.[0]?.shipping_option_id || 'Standard Shipping'}</p>
                <p className="text-sm text-gray-500 mt-1">{formatPrice(order.shipping_methods?.[0]?.amount || 0)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Breakdown */}
        {props.showPricingBreakdown && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{formatPrice(order.shipping_total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatPrice(order.tax_total)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
};
