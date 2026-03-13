'use client';

import { ComponentConfig } from "@measured/puck";
import { Check } from "lucide-react";
import { useOrder } from "@lib/hooks/useOrder";
import { usePuck } from "@measured/puck";

export interface OrderConfirmationProps {
  showCheckmark: boolean;
  titleText: string;
  messageText: string;
  showOrderNumber: boolean;
  showEmailConfirmation: boolean;
  showContinueShopping: boolean;
  style: "success" | "minimal" | "detailed";
}

export const OrderConfirmation: ComponentConfig<OrderConfirmationProps> = {
  label: "Order Confirmation",

  fields: {
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Success (Large checkmark)", value: "success" },
        { label: "Minimal", value: "minimal" },
        { label: "Detailed", value: "detailed" },
      ],
    },
    titleText: {
      type: "text",
      label: "Title Text",
    },
    messageText: {
      type: "textarea",
      label: "Message Text",
    },
    showCheckmark: {
      type: "radio",
      label: "Show Checkmark Icon",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showOrderNumber: {
      type: "radio",
      label: "Show Order Number",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showEmailConfirmation: {
      type: "radio",
      label: "Show Email Confirmation Message",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showContinueShopping: {
      type: "radio",
      label: "Show Continue Shopping Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    showCheckmark: true,
    titleText: "Order Confirmed!",
    messageText: "Thank you for your order. We've received your order and will begin processing it right away.",
    showOrderNumber: true,
    showEmailConfirmation: true,
    showContinueShopping: true,
    style: "success",
  },

  render: (props) => {
    const { appState } = usePuck();
    const orderId = (appState.data as any)?.context?.orderId as string | undefined;
    const { order, isLoading } = useOrder(orderId);

    if (isLoading) {
      return (
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="animate-pulse">
            <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-6" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
          </div>
        </div>
      );
    }

    if (!order) {
      return (
        <div className="max-w-2xl mx-auto text-center py-12">
          <p className="text-gray-500">Order not found</p>
        </div>
      );
    }

    if (props.style === "success") {
      return (
        <div className="max-w-2xl mx-auto text-center py-12">
          {props.showCheckmark && (
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-green-600" />
              </div>
            </div>
          )}

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{props.titleText}</h1>
          
          {props.showOrderNumber && (
            <p className="text-lg text-gray-600 mb-2">
              Order Number: <strong className="text-gray-900">#{order.display_id}</strong>
            </p>
          )}

          <p className="text-gray-600 mb-6 max-w-lg mx-auto">{props.messageText}</p>

          {props.showEmailConfirmation && order.email && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                📧 A confirmation email has been sent to <strong>{order.email}</strong>
              </p>
            </div>
          )}

          {props.showContinueShopping && (
            <div className="flex gap-4 justify-center">
              <a
                href="/account/orders"
                className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
              >
                View Order Details
              </a>
              <a
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Continue Shopping
              </a>
            </div>
          )}
        </div>
      );
    }

    if (props.style === "minimal") {
      return (
        <div className="max-w-lg mx-auto text-center py-8">
          {props.showCheckmark && <Check className="w-10 h-10 mx-auto text-green-600 mb-4" />}
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{props.titleText}</h2>
          {props.showOrderNumber && (
            <p className="text-gray-600 mb-4">Order #{order.display_id}</p>
          )}
          <p className="text-gray-600 mb-6">{props.messageText}</p>
          {props.showContinueShopping && (
            <a href="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </a>
          )}
        </div>
      );
    }

    // Detailed style
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
          <div className="flex items-start">
            {props.showCheckmark && (
              <div className="flex-shrink-0">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            )}
            <div className="ml-3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{props.titleText}</h2>
              {props.showOrderNumber && (
                <p className="text-gray-700 mb-1">
                  Order Number: <strong>#{order.display_id}</strong>
                </p>
              )}
              <p className="text-gray-600">{props.messageText}</p>
            </div>
          </div>
        </div>

        {props.showEmailConfirmation && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Confirmation email sent to {order.email}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>We'll process your order within 24 hours</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>You'll receive a shipping notification when your order ships</span>
              </li>
            </ul>
          </div>
        )}

        {props.showContinueShopping && (
          <div className="flex gap-4">
            <a
              href="/account/orders"
              className="flex-1 px-6 py-3 bg-black text-white text-center rounded hover:bg-gray-800"
            >
              Track Your Order
            </a>
            <a
              href="/"
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 text-center rounded hover:bg-gray-50"
            >
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    );
  },
};
