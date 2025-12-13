'use client'

import React, { useState, useEffect } from 'react';
import { OrderConfirmationTemplate } from '@lib/template/types';
import { HttpTypes } from "@medusajs/types"
import { 
  cn, 
  getButtonClasses, 
  getCardClasses, 
  spacingToTailwind,
  colorToTailwind,
  borderRadiusToTailwind
} from '@lib/template/tailwind-mapper';
import Link from 'next/link';
import { CheckCircle2, Package, Truck, MapPin, CreditCard, Printer, Home, User } from 'lucide-react';

interface OrderConfirmationRendererProps {
  template: OrderConfirmationTemplate | null;
  order: HttpTypes.StoreOrder;
}

/**
 * Order Confirmation Renderer
 * Renders order success page with optional confetti and animations
 */
export function OrderConfirmationRenderer({ template, order }: OrderConfirmationRendererProps) {
  const config = template || getDefaultOrderConfirmationTemplate();
  const { zones, settings } = config;

  const [showConfetti, setShowConfetti] = useState(false);
  const [checkAnimation, setCheckAnimation] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    if (settings.animations.showCheckAnimation) {
      setTimeout(() => setCheckAnimation(true), 300);
    }
    if (settings.animations.showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [settings.animations]);

  // Format date
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate estimated delivery (7-10 days from now)
  const getEstimatedDelivery = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    return formatDate(deliveryDate);
  };

  // Success header
  const renderHeader = () => {
    return (
      <div className={cn(
        'text-center',
        spacingToTailwind(settings.spacing, 'padding'),
        getCardClasses(settings)
      )}>
        {/* Success icon with animation */}
        <div className="flex justify-center mb-6">
          <div className={cn(
            'relative w-24 h-24 rounded-full flex items-center justify-center',
            colorToTailwind(settings.colors.success, 'bg'),
            'transition-all duration-500',
            checkAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          )}>
            {zones.header.showSuccessIcon && (
              <CheckCircle2 className="w-12 h-12 text-white" />
            )}
          </div>
        </div>

        {/* Success message */}
        <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          {zones.header.successMessage}
        </h1>

        {/* Order number */}
        {zones.header.showOrderNumber && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Order #{order.display_id || order.id}
          </p>
        )}

        {/* Estimated delivery */}
        {zones.header.showEstimatedDelivery && (
          <div className={cn(
            'inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full',
            'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
          )}>
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">
              Estimated delivery: {getEstimatedDelivery()}
            </span>
          </div>
        )}

        {/* Confirmation email note */}
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          We've sent a confirmation email to <strong>{order.email}</strong>
        </p>
      </div>
    );
  };

  // Order details section
  const renderOrderDetails = () => {
    return (
      <div className={getCardClasses(settings)}>
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Details
        </h2>

        {/* Products */}
        {zones.orderDetails.showProductImages && (
          <div className={cn('space-y-4 mb-6', spacingToTailwind(settings.spacing, 'gap'))}>
            {order.items?.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-4">
                {zones.orderDetails.showProductImages && item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={cn(
                      'w-16 h-16 object-cover',
                      borderRadiusToTailwind(settings.borderRadius)
                    )}
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.variant && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.variant.title}
                    </p>
                  )}
                </div>
                {zones.orderDetails.showProductQuantity && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Qty: {item.quantity}
                  </div>
                )}
                {zones.orderDetails.showProductPrice && (
                  <div className="font-medium text-gray-900 dark:text-white">
                    ${((item.unit_price || 0) / 100).toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Order summary */}
        <div className={cn(
          'pt-6 border-t space-y-2',
          'border-gray-200 dark:border-gray-700'
        )}>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="text-gray-900 dark:text-white">
              ${((order.subtotal || 0) / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="text-gray-900 dark:text-white">
              ${((order.shipping_total || 0) / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Tax</span>
            <span className="text-gray-900 dark:text-white">
              ${((order.tax_total || 0) / 100).toFixed(2)}
            </span>
          </div>
          <div className={cn(
            'flex justify-between text-lg font-bold pt-2 border-t',
            'border-gray-200 dark:border-gray-700'
          )}>
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className={colorToTailwind(settings.colors.primary, 'text')}>
              ${((order.total || 0) / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Shipping & billing info
  const renderAddresses = () => {
    const shippingAddress = order.shipping_address;
    const billingAddress = order.billing_address;

    return (
      <div className={cn(
        'grid grid-cols-1 md:grid-cols-2',
        spacingToTailwind(settings.spacing, 'gap')
      )}>
        {/* Shipping address */}
        {zones.orderDetails.showShippingAddress && shippingAddress && (
          <div className={getCardClasses(settings)}>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Shipping Address
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>{shippingAddress.first_name} {shippingAddress.last_name}</p>
              <p>{shippingAddress.address_1}</p>
              {shippingAddress.address_2 && <p>{shippingAddress.address_2}</p>}
              <p>{shippingAddress.city}, {shippingAddress.province} {shippingAddress.postal_code}</p>
              <p>{shippingAddress.country_code?.toUpperCase()}</p>
            </div>
          </div>
        )}

        {/* Billing address */}
        {zones.orderDetails.showBillingAddress && billingAddress && (
          <div className={getCardClasses(settings)}>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Billing Address
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>{billingAddress.first_name} {billingAddress.last_name}</p>
              <p>{billingAddress.address_1}</p>
              {billingAddress.address_2 && <p>{billingAddress.address_2}</p>}
              <p>{billingAddress.city}, {billingAddress.province} {billingAddress.postal_code}</p>
              <p>{billingAddress.country_code?.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Next steps / Actions
  const renderNextSteps = () => {
    return (
      <div className={cn(
        'flex flex-wrap gap-4 justify-center',
        spacingToTailwind(settings.spacing, 'padding')
      )}>
        {zones.nextSteps.showTrackingLink && (
          <button className={getButtonClasses(settings, 'primary')}>
            <Truck className="w-4 h-4" />
            Track Order
          </button>
        )}

        {zones.nextSteps.showPrintButton && (
          <button
            onClick={() => window.print()}
            className={cn(
              getButtonClasses(settings, 'secondary'),
              'flex items-center gap-2'
            )}
          >
            <Printer className="w-4 h-4" />
            Print Receipt
          </button>
        )}

        {zones.nextSteps.showContinueShoppingButton && (
          <Link
            href="/store"
            className={cn(
              getButtonClasses(settings, 'secondary'),
              'flex items-center gap-2'
            )}
          >
            <Home className="w-4 h-4" />
            Continue Shopping
          </Link>
        )}

        {zones.nextSteps.showAccountLink && (
          <Link
            href="/account/orders"
            className={cn(
              'flex items-center gap-2 text-sm',
              colorToTailwind(settings.colors.primary, 'text'),
              'hover:underline'
            )}
          >
            <User className="w-4 h-4" />
            View in My Orders
          </Link>
        )}
      </div>
    );
  };

  // Confetti effect
  const renderConfetti = () => {
    if (!showConfetti) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {renderConfetti()}
      
      <div className={cn('py-12', spacingToTailwind(settings.spacing, 'padding'))}>
        <div className="content-container max-w-4xl mx-auto">
          <div className={cn('space-y-8', spacingToTailwind(settings.spacing, 'gap'))}>
            {/* Header */}
            {renderHeader()}

            {/* Order details */}
            {renderOrderDetails()}

            {/* Addresses */}
            {renderAddresses()}

            {/* Next steps */}
            {renderNextSteps()}
          </div>
        </div>
      </div>

      {/* Confetti animation styles */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </>
  );
}

/**
 * Default order confirmation template
 */
function getDefaultOrderConfirmationTemplate(): OrderConfirmationTemplate {
  return {
    id: 'default',
    templateName: 'Default Order Confirmation',
    zones: {
      header: {
        showSuccessIcon: true,
        successMessage: 'Thank you for your order!',
        showOrderNumber: true,
        showEstimatedDelivery: true,
      },
      orderDetails: {
        showProductImages: true,
        showProductQuantity: true,
        showProductPrice: true,
        showShippingAddress: true,
        showBillingAddress: true,
        showPaymentMethod: false,
      },
      nextSteps: {
        showTrackingLink: false,
        showPrintButton: true,
        showContinueShoppingButton: true,
        showAccountLink: true,
      },
    },
    settings: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#10b981',
        success: '#10b981',
      },
      spacing: 'normal',
      borderRadius: 'medium',
      animations: {
        showConfetti: true,
        showCheckAnimation: true,
      },
    },
  };
}
