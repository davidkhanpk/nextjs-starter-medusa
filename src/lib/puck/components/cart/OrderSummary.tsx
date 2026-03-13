'use client';

import { ComponentConfig } from "@measured/puck";
import { LockClosedIcon } from '@heroicons/react/24/outline';

export interface OrderSummaryProps {
  position: "sidebar" | "inline";
  showItemImages: boolean;
  showItemQuantity: boolean;
  showItemPrice: boolean;
  showSubtotal: boolean;
  showShipping: boolean;
  showTax: boolean;
  showDiscount: boolean;
  showTotal: boolean;
  compactView: boolean;
}

export const OrderSummary: ComponentConfig<OrderSummaryProps> = {
  label: "Order Summary",

  fields: {
    position: {
      type: "select",
      label: "Position",
      options: [
        { label: "Sidebar (Sticky)", value: "sidebar" },
        { label: "Inline", value: "inline" },
      ],
    },
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
    showTotal: {
      type: "radio",
      label: "Show Total",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    position: "sidebar",
    showItemImages: true,
    showItemQuantity: true,
    showItemPrice: true,
    showSubtotal: true,
    showShipping: true,
    showTax: true,
    showDiscount: true,
    showTotal: true,
    compactView: false,
  },

  render: ({
    position,
    showItemImages,
    showItemQuantity,
    showItemPrice,
    showSubtotal,
    showShipping,
    showTax,
    showDiscount,
    showTotal,
    compactView,
  }: OrderSummaryProps) => {
    // Mock order data - will be replaced with real data from Medusa
    const orderItems = [
      {
        id: "1",
        title: "Sample Product",
        variant: "Medium / Black",
        thumbnail: "https://via.placeholder.com/80",
        quantity: 2,
        unit_price: 2999,
        total: 5998,
      },
      {
        id: "2",
        title: "Another Product",
        variant: "Large / White",
        thumbnail: "https://via.placeholder.com/80",
        quantity: 1,
        unit_price: 4999,
        total: 4999,
      },
    ];

    const subtotal = 10997;
    const shipping = 995;
    const tax = Math.round(subtotal * 0.08);
    const discount = 1099;
    const total = subtotal + shipping + tax - discount;

    const formatPrice = (price: number) => {
      return `$${(price / 100).toFixed(2)}`;
    };

    const containerClass = position === "sidebar"
      ? "sticky top-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
      : "border border-gray-200 rounded-lg p-6 bg-white";

    return (
      <div className={containerClass}>
        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200">
          Order Summary
        </h3>

        {/* Items List */}
        <div className={`${compactView ? 'space-y-2' : 'space-y-4'} mb-6`}>
          {orderItems.map((item) => (
            <div 
              key={item.id} 
              className={`flex gap-3 ${!compactView && 'pb-4 border-b border-gray-100'}`}
            >
              {showItemImages && (
                <div className="relative flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={`${compactView ? 'w-12 h-12' : 'w-16 h-16'} object-cover rounded`}
                  />
                  {showItemQuantity && (
                    <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </div>
                  )}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4 className={`${compactView ? 'text-sm' : 'text-base'} font-medium text-gray-900 truncate`}>
                  {item.title}
                </h4>
                <p className={`${compactView ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>
                  {item.variant}
                </p>
                {showItemQuantity && !showItemImages && (
                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {item.quantity}
                  </p>
                )}
              </div>

              {showItemPrice && (
                <div className="text-right flex-shrink-0">
                  <p className={`${compactView ? 'text-sm' : 'text-base'} font-medium text-gray-900`}>
                    {formatPrice(item.total)}
                  </p>
                  {item.quantity > 1 && !compactView && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatPrice(item.unit_price)} each
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-3 mb-6">
          {showSubtotal && (
            <div className="flex justify-between text-gray-700">
              <span className={compactView ? 'text-sm' : ''}>Subtotal</span>
              <span className={compactView ? 'text-sm' : ''}>{formatPrice(subtotal)}</span>
            </div>
          )}

          {showShipping && (
            <div className="flex justify-between text-gray-700">
              <span className={compactView ? 'text-sm' : ''}>Shipping</span>
              <span className={compactView ? 'text-sm' : ''}>{formatPrice(shipping)}</span>
            </div>
          )}

          {showTax && (
            <div className="flex justify-between text-gray-700">
              <span className={compactView ? 'text-sm' : ''}>Tax</span>
              <span className={compactView ? 'text-sm' : ''}>{formatPrice(tax)}</span>
            </div>
          )}

          {showDiscount && discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span className={compactView ? 'text-sm' : ''}>Discount</span>
              <span className={compactView ? 'text-sm' : ''}>-{formatPrice(discount)}</span>
            </div>
          )}
        </div>

        {/* Total */}
        {showTotal && (
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className={`${compactView ? 'text-base' : 'text-lg'} font-semibold text-gray-900`}>
                Total
              </span>
              <span className={`${compactView ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
                {formatPrice(total)}
              </span>
            </div>
          </div>
        )}

        {/* Security Badge */}
        {!compactView && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <LockClosedIcon className="w-5 h-5" />
              <span>Secure and encrypted payment</span>
            </div>
          </div>
        )}
      </div>
    );
  },
};
