'use client';

import { ComponentConfig } from "@measured/puck";
import { Check, Clock, Package, Truck } from "lucide-react";
import { useOrder } from "@lib/hooks/useOrder";
import { usePuck } from "@measured/puck";

export interface OrderTimelineProps {
  showIcons: boolean;
  showTimestamps: boolean;
  showTrackingNumber: boolean;
  orientation: "vertical" | "horizontal";
  style: "default" | "minimal" | "detailed";
}

export const OrderTimeline: ComponentConfig<OrderTimelineProps> = {
  label: "Order Timeline",

  fields: {
    orientation: {
      type: "select",
      label: "Orientation",
      options: [
        { label: "Vertical", value: "vertical" },
        { label: "Horizontal", value: "horizontal" },
      ],
    },
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Default", value: "default" },
        { label: "Minimal", value: "minimal" },
        { label: "Detailed", value: "detailed" },
      ],
    },
    showIcons: {
      type: "radio",
      label: "Show Icons",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showTimestamps: {
      type: "radio",
      label: "Show Timestamps",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showTrackingNumber: {
      type: "radio",
      label: "Show Tracking Number",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    showIcons: true,
    showTimestamps: true,
    showTrackingNumber: true,
    orientation: "vertical",
    style: "default",
  },

  render: (props) => {
    const { appState } = usePuck();
    const orderId = (appState.data as any)?.context?.orderId as string | undefined;
    const { order, isLoading } = useOrder(orderId);

    if (isLoading) {
      return (
        <div className="max-w-2xl mx-auto animate-pulse">
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
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

    // Map Medusa order statuses to timeline steps
    // Medusa fulfillment_status: canceled | not_fulfilled | partially_fulfilled | fulfilled | partially_shipped | shipped | partially_delivered | delivered
    // Medusa payment_status: canceled | not_paid | awaiting | authorized | partially_authorized | captured | partially_captured | partially_refunded | refunded | requires_action
    
    const getTimelineSteps = () => {
      const fulfillmentStatus = order.fulfillment_status || 'not_fulfilled';
      const paymentStatus = order.payment_status || 'not_paid';
      
      // Determine which steps are completed based on status
      const steps = [
        {
          id: "placed",
          title: "Order Placed",
          description: paymentStatus === 'captured' || paymentStatus === 'authorized' 
            ? "Your order has been confirmed and paid" 
            : "Your order has been placed",
          timestamp: order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : "",
          completed: true,
          icon: Check,
        },
        {
          id: "processing",
          title: "Processing",
          description: "We're preparing your order",
          timestamp: order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : "",
          completed: ['fulfilled', 'partially_fulfilled', 'shipped', 'partially_shipped', 'delivered', 'partially_delivered'].includes(fulfillmentStatus),
          icon: Clock,
        },
        {
          id: "shipped",
          title: "Shipped",
          description: "Your order is on its way",
          timestamp: order.fulfillments?.[0]?.shipped_at 
            ? new Date(order.fulfillments[0].shipped_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric'
              })
            : fulfillmentStatus === 'shipped' || fulfillmentStatus === 'partially_shipped' || fulfillmentStatus === 'delivered' || fulfillmentStatus === 'partially_delivered'
            ? "Recently shipped"
            : "Pending",
          completed: ['shipped', 'partially_shipped', 'delivered', 'partially_delivered'].includes(fulfillmentStatus),
          icon: Truck,
        },
        {
          id: "delivered",
          title: "Delivered",
          description: fulfillmentStatus === 'delivered' || fulfillmentStatus === 'partially_delivered'
            ? "Your order has been delivered"
            : "Estimated delivery",
          timestamp: order.fulfillments?.[0]?.delivered_at
            ? new Date(order.fulfillments[0].delivered_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric'
              })
            : "Pending",
          completed: fulfillmentStatus === 'delivered',
          icon: Package,
        },
      ];

      // If order is canceled, mark all as incomplete except placed
      if (fulfillmentStatus === 'canceled') {
        steps.forEach((step, index) => {
          if (index > 0) {
            step.completed = false;
            step.description = "Order canceled";
          }
        });
      }

      return steps;
    };

    const steps = getTimelineSteps();
    
    // Try to get tracking number from fulfillment metadata
    // Store API doesn't expose tracking labels directly
    const trackingNumber = (order.fulfillments?.[0]?.metadata as any)?.tracking_number || null;
    const currentStepIndex = steps.findIndex((step) => !step.completed);

    if (props.orientation === "horizontal") {
      return (
        <div className="w-full">
          {props.showTrackingNumber && trackingNumber && (
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600">
                Tracking Number: <strong className="text-gray-900">{trackingNumber}</strong>
              </p>
            </div>
          )}
          
          <div className="flex items-start justify-between relative">
            {/* Progress line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative z-10">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  {props.showIcons && (
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : index === currentStepIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                  )}

                  {/* Title */}
                  <p
                    className={`font-medium mb-1 ${
                      step.completed || index === currentStepIndex ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>

                  {/* Description */}
                  {props.style !== "minimal" && (
                    <p className="text-xs text-gray-600 mb-1">{step.description}</p>
                  )}

                  {/* Timestamp */}
                  {props.showTimestamps && (
                    <p className="text-xs text-gray-500">{step.timestamp}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Vertical orientation
    return (
      <div className="max-w-2xl mx-auto">
        {props.showTrackingNumber && trackingNumber && (
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Tracking Number: 
              <strong className="text-gray-900 ml-2">{trackingNumber}</strong>
              <button 
                onClick={() => navigator.clipboard.writeText(trackingNumber)}
                className="ml-2 text-blue-600 hover:underline text-xs"
              >
                Copy
              </button>
            </p>
          </div>
        )}

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
            <div
              className="w-full bg-green-500 transition-all"
              style={{ height: `${(currentStepIndex / steps.length) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-4 relative">
                {/* Icon */}
                {props.showIcons && (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : index === currentStepIndex
                        ? "bg-blue-500 text-white animate-pulse"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`font-semibold ${
                        step.completed || index === currentStepIndex ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h4>
                    {step.completed && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Completed
                      </span>
                    )}
                    {index === currentStepIndex && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        In Progress
                      </span>
                    )}
                  </div>

                  {props.style !== "minimal" && (
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  )}

                  {props.showTimestamps && (
                    <p className="text-xs text-gray-500">{step.timestamp}</p>
                  )}

                  {/* Detailed info */}
                  {props.style === "detailed" && step.completed && (
                    <div className="mt-3 bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                      <p>✓ Status updated successfully</p>
                      {step.id === "shipped" && (
                        <p className="mt-1">📦 Package handed to carrier</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
