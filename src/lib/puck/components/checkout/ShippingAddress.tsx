'use client';

import React, { useEffect, useRef, useState } from "react";
import { ComponentConfig } from "@measured/puck";
import { useParams, usePathname } from "next/navigation";
import { usePuckContext } from "@/components/puck/PuckContextProvider";

// Import the actual address form components
import ShippingAddressForm from "@modules/checkout/components/shipping-address";
import BillingAddress from "@modules/checkout/components/billing_address";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { setAddresses } from "@lib/data/cart";
import { useActionState } from "react";
import { useToggleState } from "@medusajs/ui";
import compareAddresses from "@lib/util/compare-addresses";

export interface ShippingAddressProps {
  title: string;
  showTitle: boolean;
  requirePhoneNumber: boolean;
  showCompanyField: boolean;
}

export const ShippingAddress: ComponentConfig<ShippingAddressProps> = {
  label: "Shipping Address Form",

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
    requirePhoneNumber: {
      type: "radio",
      label: "Require Phone Number",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showCompanyField: {
      type: "radio",
      label: "Show Company Field",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Shipping Address",
    showTitle: true,
    requirePhoneNumber: true,
    showCompanyField: false,
  },

  render: () => {
    console.log('[ShippingAddress] Component rendering');
    const { context } = usePuckContext();
    console.log('[ShippingAddress] Context:', { hasContext: !!context, hasCart: !!context?.cart, hasCustomer: !!context?.customer });
    const cart = context?.cart;
    const customer = context?.customer;

    const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
      cart?.shipping_address && cart?.billing_address
        ? compareAddresses(cart?.shipping_address, cart?.billing_address)
        : true
    );

    const [message, formAction] = useActionState(setAddresses, null);
    const formRef = useRef<HTMLFormElement>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Validate form completion
    const validateForm = () => {
      if (!formRef.current) return false;
      
      const formData = new FormData(formRef.current);
      const requiredFields = [
        'shipping_address.first_name',
        'shipping_address.last_name',
        'shipping_address.address_1',
        'shipping_address.postal_code',
        'shipping_address.city',
        'shipping_address.country_code',
        'email'
      ];

      // Check if all required fields have values
      const allFieldsFilled = requiredFields.every(field => {
        const value = formData.get(field);
        return value && String(value).trim() !== '';
      });

      return allFieldsFilled;
    };

    // Auto-submit when form is complete
    useEffect(() => {
      const form = formRef.current;
      if (!form) return;

      const handleFormChange = () => {
        // Clear existing timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        // Set new timer for auto-save after 1 second of inactivity
        debounceTimerRef.current = setTimeout(() => {
          if (validateForm()) {
            console.log('[ShippingAddress] Auto-saving form...');
            setIsSaving(true);
            // Use requestSubmit() for proper React Server Action handling
            form.requestSubmit();
            
            // Reset saving state after a delay
            setTimeout(() => setIsSaving(false), 2000);
          }
        }, 1000);
      };

      // Listen to input changes
      form.addEventListener('input', handleFormChange);
      form.addEventListener('change', handleFormChange);

      return () => {
        form.removeEventListener('input', handleFormChange);
        form.removeEventListener('change', handleFormChange);
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, [cart, sameAsBilling]);

    if (!cart) {
      console.warn('[ShippingAddress] Cart data not available');
      return (
        <div className="text-gray-500 p-4 border border-gray-200 rounded">
          Cart data not available
        </div>
      );
    }

    console.log('[ShippingAddress] Rendering shipping address form');
    
    // In Puck context, always show the form (bypass step-based logic)
    return (
      <div className="bg-white">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
          
          <form ref={formRef} action={formAction}>
            <div className="grid grid-cols-1 gap-y-2">
              <ShippingAddressForm
                customer={customer}
                cart={cart}
                checked={sameAsBilling}
                onChange={toggleSameAsBilling}
              />

              {!sameAsBilling && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                  <BillingAddress
                    cart={cart}
                    countryCode={cart.region?.countries?.[0]?.iso_2 || cart.billing_address?.country_code}
                  />
                </div>
              )}

              {/* Hidden submit button for programmatic submission */}
              <button type="submit" style={{ display: 'none' }} />
              
              {/* Show saving indicator */}
              {isSaving && (
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  },
};
