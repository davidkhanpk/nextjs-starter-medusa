'use client';

import { ComponentConfig } from "@measured/puck";
import { Download, Package, MessageCircle, RefreshCw } from "lucide-react";
import { useOrder } from "@lib/hooks/useOrder";
import { usePuck } from "@measured/puck";
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export interface OrderActionsProps {
  showDownloadInvoice: boolean;
  showTrackShipment: boolean;
  showContactSupport: boolean;
  showReorder: boolean;
  showReturnRequest: boolean;
  layout: "buttons" | "cards" | "list";
  buttonStyle: "filled" | "outlined" | "text";
}

export const OrderActions: ComponentConfig<OrderActionsProps> = {
  label: "Order Actions",

  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Buttons", value: "buttons" },
        { label: "Cards", value: "cards" },
        { label: "List", value: "list" },
      ],
    },
    buttonStyle: {
      type: "select",
      label: "Button Style",
      options: [
        { label: "Filled", value: "filled" },
        { label: "Outlined", value: "outlined" },
        { label: "Text", value: "text" },
      ],
    },
    showDownloadInvoice: {
      type: "radio",
      label: "Show Download Invoice",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showTrackShipment: {
      type: "radio",
      label: "Show Track Shipment",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showContactSupport: {
      type: "radio",
      label: "Show Contact Support",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showReorder: {
      type: "radio",
      label: "Show Reorder",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showReturnRequest: {
      type: "radio",
      label: "Show Return Request",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    showDownloadInvoice: true,
    showTrackShipment: true,
    showContactSupport: true,
    showReorder: true,
    showReturnRequest: false,
    layout: "buttons",
    buttonStyle: "outlined",
  },

  render: (props) => {
    const { appState } = usePuck();
    const orderId = (appState.data as any)?.context?.orderId as string | undefined;
    const { order, isLoading } = useOrder(orderId);

    if (isLoading) {
      return (
        <div className="flex flex-wrap gap-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded" />
          ))}
        </div>
      );
    }

    if (!order) {
      return <div />;
    }
    const actions = [
      {
        id: "invoice",
        label: "Download Invoice",
        description: "Get a PDF copy of your invoice",
        icon: Download,
        show: props.showDownloadInvoice,
        onClick: () => console.log("Download invoice"),
      },
      {
        id: "track",
        label: "Track Shipment",
        description: "Follow your package in real-time",
        icon: Package,
        show: props.showTrackShipment,
        onClick: () => console.log("Track shipment"),
      },
      {
        id: "support",
        label: "Contact Support",
        description: "Get help with your order",
        icon: MessageCircle,
        show: props.showContactSupport,
        onClick: () => console.log("Contact support"),
      },
      {
        id: "reorder",
        label: "Reorder Items",
        description: "Buy these items again",
        icon: RefreshCw,
        show: props.showReorder,
        onClick: () => console.log("Reorder"),
      },
      {
        id: "return",
        label: "Request Return",
        description: "Start a return or refund request",
        icon: RefreshCw,
        show: props.showReturnRequest,
        onClick: () => console.log("Return request"),
      },
    ].filter((action) => action.show);

    const getButtonClasses = () => {
      const base = "px-4 py-2 rounded font-medium transition-colors flex items-center gap-2";
      
      if (props.buttonStyle === "filled") {
        return `${base} bg-black text-white hover:bg-gray-800`;
      }
      if (props.buttonStyle === "outlined") {
        return `${base} border border-gray-300 text-gray-700 hover:bg-gray-50`;
      }
      return `${base} text-blue-600 hover:text-blue-700 hover:underline`;
    };

    if (props.layout === "cards") {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <action.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{action.label}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (props.layout === "list") {
      return (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <action.icon className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{action.label}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      );
    }

    // Buttons layout
    return (
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <button key={action.id} onClick={action.onClick} className={getButtonClasses()}>
            <action.icon className="w-5 h-5" />
            {action.label}
          </button>
        ))}
      </div>
    );
  },
};
