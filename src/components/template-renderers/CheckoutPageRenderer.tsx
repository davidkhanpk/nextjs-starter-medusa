'use client'

import React, { useState } from 'react';
import { CheckoutTemplate } from '@lib/template/types';
import { HttpTypes } from "@medusajs/types"
import { 
  cn, 
  getButtonClasses, 
  getCardClasses, 
  spacingToTailwind,
  colorToTailwind,
  borderRadiusToTailwind
} from '@lib/template/tailwind-mapper';
import CheckoutForm from '@modules/checkout/templates/checkout-form';
import CheckoutSummary from '@modules/checkout/templates/checkout-summary';
import PaymentWrapper from '@modules/checkout/components/payment-wrapper';
import Link from 'next/link';
import { ShieldCheck, Lock, CreditCard, Truck, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CheckoutPageRendererProps {
  template: CheckoutTemplate | null;
  cart: HttpTypes.StoreCart;
  customer: HttpTypes.StoreCustomer | null;
}

/**
 * Checkout Page Renderer
 * Supports both single-page and multi-step checkout flows
 */
export function CheckoutPageRenderer({ template, cart, customer }: CheckoutPageRendererProps) {
  const config = template || getDefaultCheckoutTemplate();
  const { zones, settings } = config;

  // Multi-step state
  const [currentStep, setCurrentStep] = useState(0);
  const steps = zones.layout.steps || [];
  const isMultiStep = zones.layout.type === 'multi-step' && steps.length > 0;

  // Progress indicator style
  const progressStyle = settings.progressIndicator?.style || 'steps';
  const progressPosition = settings.progressIndicator?.position || 'top';

  // Render progress indicator
  const renderProgressIndicator = () => {
    if (!isMultiStep || progressPosition === 'none') return null;

    if (progressStyle === 'bar') {
      return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full transition-all duration-300',
              colorToTailwind(settings.colors.primary, 'bg')
            )}
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      );
    }

    if (progressStyle === 'dots') {
      return (
        <div className="flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                index === currentStep 
                  ? colorToTailwind(settings.colors.primary, 'bg')
                  : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          ))}
        </div>
      );
    }

    // Steps style (default)
    return (
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                index <= currentStep
                  ? cn(colorToTailwind(settings.colors.primary, 'bg'), 'text-white')
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}>
                {index < currentStep ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="hidden md:block">
                <div className={cn(
                  'text-sm font-medium',
                  index <= currentStep 
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                )}>
                  {step.title}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5 mx-4',
                index < currentStep 
                  ? colorToTailwind(settings.colors.primary, 'bg')
                  : 'bg-gray-200 dark:bg-gray-700'
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Security badges
  const renderSecurityBadges = () => {
    if (!zones.paymentInfo.showSecurityBadges) return null;

    return (
      <div className={cn(
        'flex items-center justify-center gap-6 flex-wrap',
        spacingToTailwind(settings.spacing, 'padding')
      )}>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Lock className="w-4 h-4" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <CreditCard className="w-4 h-4" />
          <span>Safe Payment</span>
        </div>
      </div>
    );
  };

  // Single-page layout
  if (!isMultiStep) {
    return (
      <div className={cn('py-12', spacingToTailwind(settings.spacing, 'padding'))}>
        <div className="content-container">
          {/* Security badges at top */}
          <div className="mb-8">
            {renderSecurityBadges()}
          </div>

          {/* Main checkout grid */}
          <div className={cn(
            'grid grid-cols-1 lg:grid-cols-[1fr_416px]',
            spacingToTailwind(settings.spacing, 'gap')
          )}>
            {/* Checkout form */}
            <div>
              <Link
                href="/cart"
                className={cn(
                  'inline-flex items-center gap-2 text-sm mb-6',
                  colorToTailwind(settings.colors.primary, 'text'),
                  'hover:underline'
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to cart
              </Link>

              <div className={getCardClasses(settings)}>
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Checkout
                </h1>
                
                <PaymentWrapper cart={cart}>
                  <CheckoutForm cart={cart} customer={customer} />
                </PaymentWrapper>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className={getCardClasses(settings)}>
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Order Summary
                </h2>
                <CheckoutSummary cart={cart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Multi-step layout
  return (
    <div className={cn('py-12', spacingToTailwind(settings.spacing, 'padding'))}>
      <div className="content-container max-w-4xl mx-auto">
        {/* Progress indicator */}
        {progressPosition === 'top' && (
          <div className="mb-8">
            {renderProgressIndicator()}
          </div>
        )}

        {/* Security badges */}
        <div className="mb-8">
          {renderSecurityBadges()}
        </div>

        {/* Step content */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Side progress (for left position) */}
          {progressPosition === 'left' && (
            <div className="hidden lg:block">
              <div className="sticky top-24">
                {renderProgressIndicator()}
              </div>
            </div>
          )}

          {/* Main content */}
          <div>
            <Link
              href="/cart"
              className={cn(
                'inline-flex items-center gap-2 text-sm mb-6',
                colorToTailwind(settings.colors.primary, 'text'),
                'hover:underline'
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to cart
            </Link>

            <div className={getCardClasses(settings)}>
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                {steps[currentStep]?.title || 'Checkout'}
              </h2>

              {/* Step-specific content - In production, you'd conditionally render different forms */}
              <PaymentWrapper cart={cart}>
                <CheckoutForm cart={cart} customer={customer} />
              </PaymentWrapper>

              {/* Step navigation */}
              <div className={cn(
                'flex justify-between pt-6 mt-6 border-t',
                'border-gray-200 dark:border-gray-700'
              )}>
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={cn(
                    'px-6 py-2 rounded-md font-medium transition-colors',
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  )}
                >
                  Previous
                </button>

                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className={getButtonClasses(settings, 'primary')}
                >
                  {currentStep === steps.length - 1 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </div>

            {/* Order summary below on mobile, sticky sidebar on desktop */}
            <div className="mt-8 lg:hidden">
              <div className={getCardClasses(settings)}>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Order Summary
                </h3>
                <CheckoutSummary cart={cart} />
              </div>
            </div>
          </div>

          {/* Desktop order summary */}
          <div className="hidden lg:block lg:col-start-2 lg:row-start-1">
            <div className="sticky top-24">
              <div className={getCardClasses(settings)}>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Order Summary
                </h3>
                <CheckoutSummary cart={cart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Default checkout template configuration
 */
function getDefaultCheckoutTemplate(): CheckoutTemplate {
  return {
    id: 'default',
    templateName: 'Default Checkout',
    zones: {
      layout: {
        type: 'single-page',
        steps: [
          { id: 'shipping', title: 'Shipping', icon: 'truck' },
          { id: 'payment', title: 'Payment', icon: 'credit-card' },
          { id: 'review', title: 'Review', icon: 'check-circle' }
        ],
      },
      shippingInfo: {
        showAddressAutocomplete: true,
        showSaveAddressCheckbox: true,
        requiredFields: ['address', 'city', 'postal_code', 'country'],
      },
      paymentInfo: {
        acceptedMethods: ['card', 'paypal'],
        showSavedCards: true,
        showSecurityBadges: true,
      },
      orderReview: {
        showProductImages: true,
        showEditLinks: true,
        showOrderSummary: true,
      },
    },
    settings: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#10b981',
      },
      spacing: 'normal',
      borderRadius: 'medium',
      progressIndicator: {
        style: 'steps',
        position: 'top',
      },
    },
  };
}
