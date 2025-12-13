# Facebook Pixel - Quick Implementation Checklist

## ✅ Installation Complete

Your Medusa storefront now has Facebook Pixel fully integrated! Here's what's been set up:

### 1. Core Pixel Components ✅

- **`FacebookPixel.tsx`** - Dynamically loads pixel from backend
- **`usePixelTracking.ts`** - React hook for all event tracking
- **Root Layout** - Pixel auto-loads on every page

### 2. Automatic Event Tracking ✅

| Page Type | Component | Event Tracked |
|-----------|-----------|---------------|
| **All Pages** | `FacebookPixel` | `PageView` |
| **Product Pages** | `PixelTracker` | `ViewContent` |
| **Add to Cart** | `AddToCartButton` | `AddToCart` |
| **Checkout Page** | `CheckoutPixelTracker` | `InitiateCheckout` |
| **Order Confirmation** | `OrderPixelTracker` | `Purchase` |

### 3. Helper Components Created ✅

```
src/lib/pixel/
  ├── FacebookPixel.tsx           # Auto-loads pixel
  └── usePixelTracking.ts         # Event tracking hook

src/modules/products/components/
  └── pixel-tracker.tsx           # Product view tracking

src/modules/checkout/components/
  └── checkout-pixel-tracker.tsx  # Checkout tracking

src/modules/order/components/
  └── order-pixel-tracker.tsx     # Purchase tracking
```

## 🎯 Quick Usage Guide

### Setup (One-Time)

1. **Add environment variable** to `.env.local`:
   ```env
   NEXT_PUBLIC_STORE_ID=your-store-id
   NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
   ```

2. **Configure pixel** in Dashboard:
   - Go to Marketing → Facebook Ads
   - Enter your Facebook Pixel ID
   - Save settings

### Usage in Components

#### Track Product Views (Already Done)
```tsx
import PixelTracker from "@modules/products/components/pixel-tracker"

<PixelTracker product={product} region={region} />
```

#### Track Add to Cart (Already Done)
```tsx
import AddToCartButton from "@modules/products/components/add-to-cart-button"

<AddToCartButton
  variantId={variant.id}
  productId={product.id}
  productName={product.title}
  productPrice={variant.calculated_price}
  currency={region.currency_code.toUpperCase()}
/>
```

#### Track Checkout (Add This)
```tsx
import CheckoutPixelTracker from "@modules/checkout/components/checkout-pixel-tracker"

// In your checkout page:
<CheckoutPixelTracker cart={cart} region={region} />
```

#### Track Purchase (Add This)
```tsx
import OrderPixelTracker from "@modules/order/components/order-pixel-tracker"

// In your order confirmation page:
<OrderPixelTracker order={order} />
```

#### Track Custom Events
```tsx
import { usePixelTracking } from "@lib/pixel/usePixelTracking"

const { trackSearch } = usePixelTracking()

// Track search
const handleSearch = (query: string) => {
  trackSearch(query)
}
```

## 🔍 Testing Checklist

- [ ] Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) extension
- [ ] Visit homepage → Check for `PageView` event
- [ ] Visit product page → Check for `ViewContent` event
- [ ] Click "Add to Cart" → Check for `AddToCart` event
- [ ] Go to checkout → Check for `InitiateCheckout` event
- [ ] Complete purchase → Check for `Purchase` event
- [ ] Check browser console for "✅ Facebook Pixel loaded successfully"

## 📊 Integration Points

### Current Status

| Feature | Status | File Location |
|---------|--------|---------------|
| Pixel Injection | ✅ Done | `src/app/layout.tsx` |
| Product View Tracking | ✅ Done | `themed-product-template.tsx` |
| Add to Cart Tracking | ✅ Done | `add-to-cart-button/index.tsx` |
| Checkout Tracking | ⚠️ Component Ready | Need to add to checkout page |
| Purchase Tracking | ⚠️ Component Ready | Need to add to order page |

### TODO: Add to Your Pages

1. **Checkout Page**: Import and add `<CheckoutPixelTracker />`
2. **Order Confirmation**: Import and add `<OrderPixelTracker />`

Example for checkout page:
```tsx
import CheckoutPixelTracker from "@modules/checkout/components/checkout-pixel-tracker"

export default function CheckoutPage({ cart, region }) {
  return (
    <>
      <CheckoutPixelTracker cart={cart} region={region} />
      {/* Your checkout form */}
    </>
  )
}
```

Example for order confirmation:
```tsx
import OrderPixelTracker from "@modules/order/components/order-pixel-tracker"

export default function OrderConfirmationPage({ order }) {
  return (
    <>
      <OrderPixelTracker order={order} />
      {/* Your order details */}
    </>
  )
}
```

## 🎓 Next Steps

1. ✅ **Pixel is installed** - Ready to use!
2. ⏳ **Add to checkout/order pages** - Follow TODO above
3. ⏳ **Test all events** - Use Pixel Helper
4. ⏳ **Create custom audiences** - In Facebook Ads Manager
5. ⏳ **Set up conversion campaigns** - Optimize for purchases

## 📚 Documentation

- **Full Guide**: `FACEBOOK_PIXEL_SETUP.md`
- **Architecture**: `docs/facebook/FACEBOOK_PIXEL_ARCHITECTURE.md`
- **Facebook Docs**: https://developers.facebook.com/docs/facebook-pixel

---

**Ready to use!** The pixel will automatically start tracking as soon as you set the environment variables and configure your Pixel ID in the dashboard.
