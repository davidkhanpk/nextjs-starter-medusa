'use client';

import { ComponentConfig } from "@measured/puck";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCustomer } from "@lib/hooks/useCustomer";

export interface AccountProfileProps {
  // Layout
  layout: "single-column" | "two-column" | "card-grid";
  showAvatar: boolean;
  showPersonalInfo: boolean;
  showContactInfo: boolean;
  
  // Styling
  borderRadius: string;
  shadow: boolean;
  
  // Edit Mode
  allowEditing: boolean;
  editButtonText: string;
  saveButtonText: string;
  cancelButtonText: string;
}

export const AccountProfile: ComponentConfig<AccountProfileProps> = {
  label: "Account Profile",

  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Single Column", value: "single-column" },
        { label: "Two Column", value: "two-column" },
        { label: "Card Grid", value: "card-grid" },
      ],
    },
    showAvatar: {
      type: "radio",
      label: "Show Avatar",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showPersonalInfo: {
      type: "radio",
      label: "Show Personal Info",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showContactInfo: {
      type: "radio",
      label: "Show Contact Info",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
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
    allowEditing: {
      type: "radio",
      label: "Allow Editing",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    editButtonText: {
      type: "text",
      label: "Edit Button Text",
    },
    saveButtonText: {
      type: "text",
      label: "Save Button Text",
    },
    cancelButtonText: {
      type: "text",
      label: "Cancel Button Text",
    },
  },

  defaultProps: {
    layout: "two-column",
    showAvatar: true,
    showPersonalInfo: true,
    showContactInfo: true,
    borderRadius: "0.5rem",
    shadow: true,
    allowEditing: true,
    editButtonText: "Edit Profile",
    saveButtonText: "Save Changes",
    cancelButtonText: "Cancel",
  },

  render: ({
    layout,
    showAvatar,
    showPersonalInfo,
    showContactInfo,
    borderRadius,
    shadow,
    allowEditing,
    editButtonText,
    saveButtonText,
    cancelButtonText,
  }) => {
    const { customer, isLoading, updateCustomer } = useCustomer();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthday: "",
    });

    // Update form data when customer data loads
    useEffect(() => {
      if (customer) {
        setFormData({
          firstName: customer.first_name || "",
          lastName: customer.last_name || "",
          email: customer.email || "",
          phone: customer.phone || "",
          birthday: customer.metadata?.birthday as string || "",
        });
      }
    }, [customer]);

    const handleSave = async () => {
      setIsSaving(true);
      const result = await updateCustomer({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        metadata: {
          ...customer?.metadata,
          birthday: formData.birthday,
        },
      });
      setIsSaving(false);
      
      if (result.success) {
        setIsEditing(false);
      } else {
        alert(result.error || "Failed to update profile");
      }
    };

    const handleCancel = () => {
      setIsEditing(false);
    };

    const renderAvatar = () => {
      if (!showAvatar) return null;

      return (
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {formData.firstName[0]}
              {formData.lastName[0]}
            </div>
            {allowEditing && (
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-sm text-gray-500">Member since Jan 2024</p>
          </div>
        </div>
      );
    };

    const renderPersonalInfo = () => {
      if (!showPersonalInfo) return null;

      return (
        <div
          className={`bg-white p-6 ${shadow ? "shadow-md" : ""}`}
          style={{ borderRadius }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
            {allowEditing && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {editButtonText}
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-2" />
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{formData.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-2" />
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{formData.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-2" />
                Birthday
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">
                  {new Date(formData.birthday).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                <Save className="w-4 h-4 inline mr-2" />
                {saveButtonText}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                <X className="w-4 h-4 inline mr-2" />
                {cancelButtonText}
              </button>
            </div>
          )}
        </div>
      );
    };

    const renderContactInfo = () => {
      if (!showContactInfo) return null;

      return (
        <div
          className={`bg-white p-6 ${shadow ? "shadow-md" : ""}`}
          style={{ borderRadius }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <p className="text-gray-900">{formData.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{formData.phone}</p>
              )}
            </div>
          </div>
        </div>
      );
    };

    const layoutClasses = {
      "single-column": "max-w-2xl mx-auto space-y-6",
      "two-column": "grid grid-cols-1 md:grid-cols-2 gap-6",
      "card-grid": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    };

    return (
      <div className="account-profile p-6">
        {renderAvatar()}
        <div className={layoutClasses[layout]}>
          {renderPersonalInfo()}
          {renderContactInfo()}
        </div>
      </div>
    );
  },
};
