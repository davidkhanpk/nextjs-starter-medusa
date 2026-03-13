'use client';

import { ComponentConfig } from "@measured/puck";
import { Home, Plus, Edit2, Trash2, MapPin, Check } from "lucide-react";
import { useState } from "react";
import { useCustomer } from "@lib/hooks/useCustomer";
import { HttpTypes } from "@medusajs/types";

type Address = HttpTypes.StoreCustomerAddress;

export interface AddressBookProps {
  // Layout
  layout: "grid" | "list";
  showAddButton: boolean;
  maxAddresses: number;
  
  // Styling
  borderRadius: string;
  shadow: boolean;
  
  // Text
  addButtonText: string;
  editButtonText: string;
  deleteButtonText: string;
  setDefaultText: string;
  defaultBadgeText: string;
  emptyStateText: string;
}

export const AddressBook: ComponentConfig<AddressBookProps> = {
  label: "Address Book",

  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Grid", value: "grid" },
        { label: "List", value: "list" },
      ],
    },
    showAddButton: {
      type: "radio",
      label: "Show Add Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    maxAddresses: {
      type: "number",
      label: "Max Addresses",
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
    addButtonText: {
      type: "text",
      label: "Add Button Text",
    },
    editButtonText: {
      type: "text",
      label: "Edit Button Text",
    },
    deleteButtonText: {
      type: "text",
      label: "Delete Button Text",
    },
    setDefaultText: {
      type: "text",
      label: "Set Default Text",
    },
    defaultBadgeText: {
      type: "text",
      label: "Default Badge Text",
    },
    emptyStateText: {
      type: "text",
      label: "Empty State Text",
    },
  },

  defaultProps: {
    layout: "grid",
    showAddButton: true,
    maxAddresses: 10,
    borderRadius: "0.5rem",
    shadow: true,
    addButtonText: "Add New Address",
    editButtonText: "Edit",
    deleteButtonText: "Delete",
    setDefaultText: "Set as Default",
    defaultBadgeText: "Default",
    emptyStateText: "No addresses saved",
  },

  render: ({
    layout,
    showAddButton,
    maxAddresses,
    borderRadius,
    shadow,
    addButtonText,
    editButtonText,
    deleteButtonText,
    setDefaultText,
    defaultBadgeText,
    emptyStateText,
  }) => {
    const { addresses, isLoading, deleteAddress, updateAddress } = useCustomer();
    const [showAddForm, setShowAddForm] = useState(false);

    const handleSetDefault = async (id: string) => {
      // Update address to set as default
      await updateAddress(id, {
        metadata: { isDefault: true },
      } as any);
    };

    const handleDelete = async (id: string) => {
      const result = await deleteAddress(id);
      if (!result.success) {
        alert(result.error || "Failed to delete address");
      }
    };

    const renderAddress = (address: Address) => (
      <div
        key={address.id}
        className={`bg-white p-6 relative ${shadow ? "shadow-md" : "border border-gray-200"}`}
        style={{ borderRadius }}
      >
        {(address.metadata as any)?.isDefault && (
          <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            <Check className="w-3 h-3 inline mr-1" />
            {defaultBadgeText}
          </span>
        )}

        <div className="mb-4">
          <MapPin className="w-5 h-5 text-gray-400 mb-2" />
          <h3 className="font-semibold text-gray-900">
            {address.first_name} {address.last_name}
          </h3>
          {address.company && (
            <p className="text-sm text-gray-600">{address.company}</p>
          )}
        </div>

        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p>{address.address_1}</p>
          {address.address_2 && <p>{address.address_2}</p>}
          <p>
            {address.city}, {address.province} {address.postal_code}
          </p>
          <p>{address.country_code}</p>
          {address.phone && <p>{address.phone}</p>}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
            <Edit2 className="w-4 h-4 inline mr-1" />
            {editButtonText}
          </button>
          {!address.metadata?.isDefault && (
            <>
              <button
                onClick={() => handleSetDefault(address.id)}
                className="flex-1 text-sm text-gray-600 hover:text-gray-700 font-medium"
              >
                {setDefaultText}
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="flex-1 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                <Trash2 className="w-4 h-4 inline mr-1" />
                {deleteButtonText}
              </button>
            </>
          )}
        </div>
      </div>
    );

    const layoutClasses = {
      grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      list: "space-y-4",
    };

    return (
      <div className="address-book p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Address Book</h2>
          {showAddButton && addresses.length < maxAddresses && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {addButtonText}
            </button>
          )}
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{emptyStateText}</p>
            {showAddButton && (
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                {addButtonText}
              </button>
            )}
          </div>
        ) : (
          <div className={layoutClasses[layout]}>
            {addresses.map(renderAddress)}
          </div>
        )}

        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Add New Address</h3>
              <p className="text-gray-600 mb-4">
                Address form would go here. Integrate with Medusa customer addresses API.
              </p>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};
