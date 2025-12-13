import { NextResponse } from 'next/server';
import { fetchTemplate } from '@lib/template/api';
import { TemplateType } from '@lib/template/types';

/**
 * GET /api/templates/[templateType]
 * 
 * Local API route for fetching templates
 * Handles subdomain extraction and forwards to platform API
 */
export async function GET(
  request: Request,
  { params }: { params: { templateType: TemplateType } }
) {
  try {
    const { templateType } = params;
    
    console.log('[Template Route] Fetching template:', templateType);

    const template = await fetchTemplate(templateType, request);
    
    if (!template) {
      console.warn('[Template Route] No template found, using default');
      return NextResponse.json(getDefaultTemplate(templateType));
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('[Template Route] Error:', error);
    return NextResponse.json(
      getDefaultTemplate(params.templateType),
      { status: 200 } // Return default instead of error
    );
  }
}

/**
 * Fallback default templates
 */
function getDefaultTemplate(templateType: TemplateType) {
  const defaults = {
    cart: {
      id: 'default-cart',
      templateName: 'Default Cart',
      zones: {
        layout: {
          type: 'two-column',
          showBreadcrumbs: true,
          itemsPosition: 'left',
        },
        cartItems: {
          showProductImage: true,
          showProductTitle: true,
          showVariantInfo: true,
          showQuantitySelector: true,
          showRemoveButton: true,
          showPriceBreakdown: true,
        },
        summary: {
          showSubtotal: true,
          showShipping: true,
          showTax: true,
          showDiscount: true,
          showTotal: true,
          position: 'right',
        },
        actions: {
          continueShoppingText: 'Continue Shopping',
          continueShoppingUrl: '/products',
          checkoutButtonText: 'Proceed to Checkout',
          showEmptyCartButton: true,
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
        animations: {
          enabled: true,
          type: 'fade',
        },
      },
    },
    checkout: {
      id: 'default-checkout',
      templateName: 'Default Checkout',
      zones: {
        layout: {
          type: 'single-page',
          steps: [],
        },
        shippingInfo: {
          showAddressAutocomplete: true,
          showSaveAddressCheckbox: true,
          requiredFields: ['address', 'city', 'postal_code'],
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
    },
    'order-confirmation': {
      id: 'default-order-confirmation',
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
          showPaymentMethod: true,
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
    },
    collection: {
      id: 'default-collection',
      templateName: 'Default Collection',
      zones: {
        header: {
          showTitle: true,
          showDescription: true,
          showBanner: false,
          showBreadcrumbs: true,
        },
        filters: {
          position: 'left',
          showPriceRange: true,
          showCategories: true,
          showBrands: false,
          showColors: true,
          showSizes: true,
          collapsible: true,
        },
        products: {
          gridColumns: 3,
          showQuickView: false,
          showAddToCart: true,
          showWishlist: false,
          showCompare: false,
          imageAspectRatio: '1:1',
        },
        sorting: {
          showSortBy: true,
          defaultSort: 'newest',
          availableOptions: ['newest', 'price-asc', 'price-desc', 'popular'],
        },
        pagination: {
          type: 'numbers',
          itemsPerPage: 12,
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
        hoverEffects: {
          enabled: true,
          type: 'lift',
        },
      },
    },
  };

  return defaults[templateType] || defaults.cart;
}
