# Facebook Pixel Installation Guide

This guide shows you how to install and use Facebook Pixel tracking in your Medusa storefront.

## 🎯 Overview

The Facebook Pixel is automatically installed via the backend API. The storefront includes:
- **Automatic pixel injection** from backend
- **Product view tracking** on product pages
- **Add to cart tracking** when items are added
- **Purchase tracking** on order confirmation
- **Custom event tracking** via hooks

## 📋 Prerequisites

1. **Facebook Pixel ID configured** in your store's marketing settings (Dashboard → Marketing → Facebook Ads)
2. **Store ID** available via environment variable

## 🚀 Quick Start

### Step 1: Set Environment Variable

Add your store ID to the environment file:

```env
# nextjs-starter-medusa/.env.local
NEXT_PUBLIC_STORE_ID=your-store-id
NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
```

### Step 2: Pixel Auto-Loads

The pixel is automatically loaded in the root layout (`src/app/layout.tsx`):

```tsx
import FacebookPixel from "@lib/pixel/FacebookPixel"

export default function RootLayout({ children }) {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || ""
  
  return (
    <html>
      <body>
        <FacebookPixel storeId={storeId} />
        {children}
      </body>
    </html>
  )
}
```

✅ **That's it!** The pixel is now installed and PageView events are tracking.

## 📊 Automatic Event Tracking

### 1. Product View Tracking

Already implemented in `themed-product-template.tsx`:

```tsx
import PixelTracker from "@modules/products/components/pixel-tracker"

<PixelTracker product={product} region={region} />
```

This automatically tracks `ViewContent` when users view a product.

### 2. Add to Cart Tracking

Already integrated in the `AddToCartButton` component:

```tsx
<AddToCartButton
  variantId={variant.id}
  productId={product.id}
  productName={product.title}
  productPrice={variant.calculated_price}
  currency={region.currency_code.toUpperCase()}
/>
```

Tracks `AddToCart` event automatically on button click.

## 🛠️ Manual Event Tracking

Use the `usePixelTracking` hook for custom events:

```tsx
"use client"

import { usePixelTracking } from "@lib/pixel/usePixelTracking"

export default function MyComponent() {
  const { trackInitiateCheckout, trackPurchase, trackSearch } = usePixelTracking()
  
  // Track checkout initiation
  const handleCheckout = () => {
    trackInitiateCheckout({
      value: 99.99,
      currency: "USD",
      contentIds: ["prod_123", "prod_456"],
      numItems: 2
    })
  }
  
  // Track completed purchase
  const handleOrderComplete = (order) => {
    trackPurchase({
      value: order.total / 100,
      currency: order.currency_code.toUpperCase(),
      contentIds: order.items.map(i => i.product_id)
    })
  }
  
  // Track search
  const handleSearch = (query: string) => {
    trackSearch(query)
  }
  
  return <button onClick={handleCheckout}>Checkout</button>
}
```

## 📦 Available Events

| Event | When to Use | Parameters |
|-------|------------|------------|
| `trackPageView()` | Auto-tracked on every page load | None |
| `trackViewContent()` | Product page views | `value, currency, contentId, contentName, contentCategory` |
| `trackAddToCart()` | Add to cart clicks | `value, currency, contentId, contentName` |
| `trackInitiateCheckout()` | Checkout page load | `value, currency, contentIds[], numItems` |
| `trackPurchase()` | Order confirmation | `value, currency, contentIds[]` |
| `trackSearch()` | Search queries | `searchString` |

## 🎨 Example: Order Confirmation Page

```tsx
"use client"

import { useEffect } from "react"
import { usePixelTracking } from "@lib/pixel/usePixelTracking"

export default function OrderConfirmation({ order }) {
  const { trackPurchase } = usePixelTracking()
  
  useEffect(() => {
    // Track purchase once
    trackPurchase({
      value: order.total / 100, // Convert cents to dollars
      currency: order.currency_code.toUpperCase(),
      contentIds: order.items.map(item => item.product_id)
    })
  }, []) // Empty deps = run once
  
  return (
    <div>
      <h1>Thank you for your order!</h1>
      <p>Order #{order.display_id}</p>
    </div>
  )
}
```

## 🔍 Testing Your Pixel

### Method 1: Facebook Pixel Helper (Chrome Extension)

1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Visit your storefront
3. Click the extension icon to see tracked events

### Method 2: Events Manager

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Select your Pixel
3. Check "Test Events" tab
4. Browse your storefront and watch events appear in real-time

### Method 3: Browser Console

Open DevTools console and check for:
```
✅ Facebook Pixel loaded successfully
```

## 🔒 Privacy & GDPR Compliance

The pixel automatically respects user privacy:

- **No PII tracking** - Only hashed identifiers sent to Facebook
- **Cookie consent** - Consider adding cookie banner for EU users
- **Opt-out support** - Users can disable tracking via browser

## 🐛 Troubleshooting

### Pixel Not Loading?

1. **Check Store ID**: Verify `NEXT_PUBLIC_STORE_ID` is set correctly
2. **Check Backend URL**: Verify `NEXT_PUBLIC_BACKEND_URL` is accessible
3. **Check Console**: Look for errors in browser DevTools console
4. **Check Backend**: Verify pixel configured at `/api/marketing/facebook-pixel/code/{storeId}`

### Events Not Tracking?

1. **Check Pixel Helper**: Use Chrome extension to verify pixel exists
2. **Check Product Data**: Ensure product ID, name, and price are passed
3. **Check Network Tab**: Look for `facebook.com/tr` requests in DevTools
4. **Wait 5 Minutes**: Event processing can be delayed

### Duplicate Events?

The backend service includes **event deduplication** via the Conversions API. Client + server events with same `event_id` are automatically deduplicated by Facebook.

## 📚 Advanced Usage

### Custom Event Parameters

```tsx
const { trackEvent } = usePixelTracking()

// Track custom event
trackEvent("CustomEvent", {
  custom_param1: "value1",
  custom_param2: "value2"
})
```

### Conditional Tracking

```tsx
// Only track for specific conditions
if (user.hasConsented && product.isTracked) {
  trackViewContent({ ... })
}
```

## 🎯 Best Practices

1. ✅ **Track key events**: PageView, ViewContent, AddToCart, Purchase
2. ✅ **Use consistent currency**: Always pass same currency format
3. ✅ **Pass product IDs**: Enables dynamic product ads
4. ✅ **Track search queries**: Improves ad targeting
5. ✅ **Test thoroughly**: Use Pixel Helper before going live
6. ⚠️ **Respect privacy**: Get consent for EU users
7. ⚠️ **Don't over-track**: Only track meaningful events

## 📞 Support

- **Documentation**: See `docs/facebook/FACEBOOK_PIXEL_ARCHITECTURE.md`
- **Dashboard**: Configure pixel in Marketing → Facebook Ads
- **Facebook Help**: https://developers.facebook.com/docs/facebook-pixel

## 🚀 Next Steps

1. ✅ Install pixel (Done by following this guide)
2. Configure custom audiences in Facebook Ads Manager
3. Create dynamic product ads using catalog
4. Set up conversion optimization campaigns
5. Monitor ROAS in Facebook Analytics

---

**Note**: The pixel code is dynamically fetched from your backend API, which includes enhanced security features like PII hashing and server-side conversion tracking via the Conversions API.
