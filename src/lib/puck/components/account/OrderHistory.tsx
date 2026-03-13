'use client';

import { ComponentConfig } from "@measured/puck";
import { Package, ChevronRight, Search, Eye } from "lucide-react";
import { useState } from "react";
import Link from "@/components/common/SafeLink";
import { useCustomer } from "@lib/hooks/useCustomer";
import { HttpTypes } from "@medusajs/types";

type Order = HttpTypes.StoreOrder;

export interface OrderHistoryProps {
  // Layout
  layout: "list" | "grid" | "timeline";
  
  // Filtering
  showSearch: boolean;
  showFilters: boolean;
  defaultStatus: "all" | "pending" | "completed" | "cancelled";
  
  // Display Options
  showImages: boolean;
  showItemCount: boolean;
  ordersPerPage: number;
  
  // Styling
  borderRadius: string;
  shadow: boolean;
  
  // Text
  emptyStateText: string;
  viewDetailsText: string;
}

export const OrderHistory: ComponentConfig<OrderHistoryProps> = {
  label: "Order History",

  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "List", value: "list" },
        { label: "Grid", value: "grid" },
        { label: "Timeline", value: "timeline" },
      ],
    },
    showSearch: {
      type: "radio",
      label: "Show Search",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showFilters: {
      type: "radio",
      label: "Show Filters",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    defaultStatus: {
      type: "select",
      label: "Default Status Filter",
      options: [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    showImages: {
      type: "radio",
      label: "Show Product Images",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showItemCount: {
      type: "radio",
      label: "Show Item Count",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    ordersPerPage: {
      type: "number",
      label: "Orders Per Page",
    },
    borderRadius: {
      type: "text",
      label: "Border Radius",
    },
    shadow: {
      type: "radio",
      label: "Show Shadow",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    emptyStateText: {
      type: "text",
      label: "Empty State Text",
    },
    viewDetailsText: {
      type: "text",
      label: "View Details Text",
    },
  },

  defaultProps: {
    layout: "list",
    showSearch: true,
    showFilters: true,
    defaultStatus: "all",
    showImages: true,
    showItemCount: true,
    ordersPerPage: 10,
    borderRadius: "0.5rem",
    shadow: true,
    emptyStateText: "No orders found",
    viewDetailsText: "View Details",
  },

  render: ({
    layout,
    showSearch,
    showFilters,
    defaultStatus,
    showImages,
    showItemCount,
    ordersPerPage,
    borderRadius,
    shadow,
    emptyStateText,
    viewDetailsText,
  }) => {
    const { orders, isLoading } = useCustomer();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState(defaultStatus);

    // Filter orders based on search and status
    const filteredOrders = orders.filter((order) => {
      const matchesSearch = searchQuery === "" || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.display_id?.toString().includes(searchQuery);
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
      switch (status) {
        case "completed":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    const formatPrice = (amount: number, currency: string) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
      }).format(amount / 100);
    };

    const renderOrder = (order: Order) => (
      <div
        key={order.id}
        className={`bg-white p-6 ${shadow ? "shadow-md" : "border border-gray-200"}`}
        style={{ borderRadius }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-gray-900">
                Order #{order.display_id}
              </h3>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(order.total, order.currency_code)}
            </p>
            {showItemCount && order.items && (
              <p className="text-sm text-gray-500">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {showImages && order.items && order.items.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {order.items.slice(0, 4).map((item) => (
              <img
                key={item.id}
                src={item.thumbnail || "https://via.placeholder.com/80"}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
            {order.items.length > 4 && (
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-600">
                +{order.items.length - 4}
              </div>
            )}
          </div>
        )}

        <Link
          href={`/account/orders/${order.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <Eye className="w-4 h-4 mr-2" />
          {viewDetailsText}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    );

    const layoutClasses = {
      list: "space-y-4",
      grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      timeline: "space-y-6",
    };

    return (
      <div className="order-history p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

        {/* Search and Filters */}
        {(showSearch || showFilters) && (
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {showSearch && (
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}
            {showFilters && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{emptyStateText}</p>
          </div>
        ) : (
          <div className={layoutClasses[layout]}>
            {filteredOrders.map(renderOrder)}
          </div>
        )}
      </div>
    );
  },
};
