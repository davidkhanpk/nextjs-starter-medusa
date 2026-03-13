'use client';

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";
import { Check, ChevronRight, Loader2 } from "lucide-react";

export interface CheckoutFormProps {
  showStepIndicators: boolean;
  enableGuestCheckout: boolean;
  requirePhoneNumber: boolean;
  showSaveAddressCheckbox: boolean;
  defaultCountry: string;
  showOrderNotes: boolean;
}

export const CheckoutForm: ComponentConfig<CheckoutFormProps> = {
  label: "Checkout Form",

  fields: {
    showStepIndicators: {
      type: "radio",
      label: "Show Step Indicators",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    enableGuestCheckout: {
      type: "radio",
      label: "Enable Guest Checkout",
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
    showSaveAddressCheckbox: {
      type: "radio",
      label: "Show 'Save Address' Checkbox",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    defaultCountry: {
      type: "select",
      label: "Default Country",
      options: [
        { label: "United States", value: "US" },
        { label: "Canada", value: "CA" },
        { label: "United Kingdom", value: "GB" },
        { label: "Australia", value: "AU" },
      ],
    },
    showOrderNotes: {
      type: "radio",
      label: "Show Order Notes Field",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    showStepIndicators: true,
    enableGuestCheckout: true,
    requirePhoneNumber: false,
    showSaveAddressCheckbox: true,
    defaultCountry: "US",
    showOrderNotes: true,
  },

  render: ({
    showStepIndicators,
    enableGuestCheckout,
    requirePhoneNumber,
    showSaveAddressCheckbox,
    defaultCountry,
    showOrderNotes,
  }: CheckoutFormProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [sameAsBilling, setSameAsBilling] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock form state
    const [formData, setFormData] = useState({
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: defaultCountry,
      phone: "",
      billingFirstName: "",
      billingLastName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
      billingCountry: defaultCountry,
      shippingMethod: "",
      paymentMethod: "",
      orderNotes: "",
    });

    const steps = [
      { number: 1, label: "Contact & Shipping", status: currentStep > 1 ? "completed" : currentStep === 1 ? "current" : "upcoming" },
      { number: 2, label: "Delivery Method", status: currentStep > 2 ? "completed" : currentStep === 2 ? "current" : "upcoming" },
      { number: 3, label: "Payment", status: currentStep === 3 ? "current" : "upcoming" },
    ];

    const handleFieldChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNextStep = () => {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePrevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing(true);

      // Simulate API call
      setTimeout(() => {
        alert("Order placed successfully! (Demo)");
        setIsProcessing(false);
      }, 2000);
    };

    // Shipping methods mock data
    const shippingMethods = [
      { id: "standard", name: "Standard Shipping", price: 995, estimate: "5-7 business days" },
      { id: "express", name: "Express Shipping", price: 1995, estimate: "2-3 business days" },
      { id: "overnight", name: "Overnight Shipping", price: 3995, estimate: "Next business day" },
    ];

    // Payment methods mock data
    const paymentMethods = [
      { id: "card", name: "Credit/Debit Card", icon: "💳" },
      { id: "paypal", name: "PayPal", icon: "🅿️" },
      { id: "apple", name: "Apple Pay", icon: "🍎" },
    ];

    const formatPrice = (price: number) => {
      return `$${(price / 100).toFixed(2)}`;
    };

    return (
      <div className="max-w-3xl mx-auto">
        {/* Step Indicators */}
        {showStepIndicators && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step.status === "completed"
                          ? "bg-green-500 text-white"
                          : step.status === "current"
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.status === "completed" ? <Check className="w-5 h-5" /> : step.number}
                    </div>
                    <span className="text-xs mt-2 text-center text-gray-600">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step.status === "completed" ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Contact & Shipping */}
          {currentStep === 1 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact & Shipping Information</h2>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleFieldChange("firstName", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleFieldChange("lastName", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleFieldChange("city", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleFieldChange("state", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleFieldChange("zipCode", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              {requirePhoneNumber && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number {requirePhoneNumber && "*"}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required={requirePhoneNumber}
                  />
                </div>
              )}

              {/* Same as Billing Checkbox */}
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                    className="mr-2 h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">Billing address same as shipping</span>
                </label>
              </div>

              {/* Order Notes */}
              {showOrderNotes && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    value={formData.orderNotes}
                    onChange={(e) => handleFieldChange("orderNotes", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    rows={3}
                    placeholder="Any special instructions for your order?"
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 flex items-center gap-2"
                >
                  Continue to Delivery
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Delivery Method */}
          {currentStep === 2 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Delivery Method</h2>

              <div className="space-y-3 mb-6">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-colors ${
                      formData.shippingMethod === method.id
                        ? "border-black bg-gray-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={formData.shippingMethod === method.id}
                        onChange={(e) => handleFieldChange("shippingMethod", e.target.value)}
                        className="mr-4"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.estimate}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">{formatPrice(method.price)}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!formData.shippingMethod}
                  className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>

              {/* Payment Method Selection */}
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border rounded cursor-pointer transition-colors ${
                      formData.paymentMethod === method.id
                        ? "border-black bg-gray-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={(e) => handleFieldChange("paymentMethod", e.target.value)}
                      className="mr-4"
                    />
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-medium text-gray-900">{method.name}</span>
                  </label>
                ))}
              </div>

              {/* Card Details (shown when card is selected) */}
              {formData.paymentMethod === "card" && (
                <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!formData.paymentMethod || isProcessing}
                  className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Order"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  },
};
