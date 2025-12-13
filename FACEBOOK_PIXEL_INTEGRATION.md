# Facebook Pixel - Storefront Integration Guide

## 📦 Installation Complete

The following components have been created for the Medusa Next.js storefront:

### Core Components

1. **`FacebookPixel`** - Base pixel initialization component
   - Location: `src/lib/pixel/facebook-pixel.tsx`
   - Auto-fetches pixel config from backend
   - Injects pixel code via Next.js Script component
   - Tracks PageView automatically

2. **Tracking Hooks** - Custom React hooks for event tracking
   - Location: `src/lib/pixel/hooks.ts`
   - Hooks: `usePixelTracking`, `useProductView`, `useAddToCart`, `useInitiateCheckout`, `usePurchase`, `useSearch`
   - Handles both client-side (fbq) and server-side (Conversions API) tracking

3. **Tracker Components** - Drop-in tracking components
   - `ProductPixelTracker` - Tracks product views
   - `CartPixelTracker` - Tracks add to cart events
   - `CheckoutPixelTracker` - Tracks checkout initiation and purchases

---

## 🔧 Integration Steps

### Step 1: Add Pixel to Root Layout

**File**: `src/app/[countryCode]/(main)/layout.tsx`

```tsx
import FacebookPixel from '@/lib/pixel/facebook-pixel'

export default async function PageLayout(props: { children: React.ReactNode }) {
  // Get store ID from your store context/config
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'your-store-id'
  
  return (
    <>
      <FacebookPixel storeId={storeId} />
      {/* Rest of your layout */}
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}
```

---

### Step 2: Track Product Views

**File**: `src/app/[countryCode]/(main)/products/[handle]/page.tsx`

```tsx
import ProductPixelTracker from '@modules/products/components/product-pixel-tracker'

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  
  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'your-store-id'

  return (
    <>
      <ProductPixelTracker product={product} storeId={storeId} />
      <ProductTemplate product={product} region={region} />
    </>
  )
}
```

---

### Step 3: Track Add to Cart

**File**: `src/modules/products/components/product-actions/index.tsx`

Add tracking after successful add to cart:

```tsx
import { useAddToCart } from '@/lib/pixel/hooks'

export default function ProductActions({ product, region }: ProductActionsProps) {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'your-store-id'
  const { trackAddToCart } = useAddToCart(storeId)
  
  const handleAddToCart = async () => {
    const variant = /* get selected variant */
    
    await addToCart({
      variantId: variant.id,
      quantity,
      countryCode,
    })
    
    // Track the event
    trackAddToCart({
      variantId: variant.id,
      productTitle: product.title,
      quantity,
      price: variant.calculated_price?.calculated_amount || 0,
      currency: variant.calculated_price?.currency_code,
    })
  }

  return (
    // Your existing UI
  )
}
```

---

### Step 4: Track Checkout

**File**: `src/app/[countryCode]/(checkout)/checkout/page.tsx`

```tsx
import CheckoutPixelTracker from '@modules/checkout/components/checkout-pixel-tracker'

export default async function Checkout() {
  const cart = await retrieveCart()
  const customer = await retrieveCustomer()
  const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'your-store-id'

  return (
    <>
      <CheckoutPixelTracker cart={cart} storeId={storeId} />
      <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
        <PaymentWrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </PaymentWrapper>
        <CheckoutSummary cart={cart} />
      </div>
    </>
  )
}
```

---

### Step 5: Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_STORE_ID=your-store-id-here
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

---

## 🎯 Event Tracking Summary

| Event | Trigger | Auto-Tracked via Medusa Backend | Client-Side Component |
|-------|---------|--------------------------------|----------------------|
| **PageView** | Every page load | ❌ No | ✅ Yes (FacebookPixel component) |
| **ViewContent** | Product page view | ❌ No | ✅ Yes (ProductPixelTracker) |
| **AddToCart** | Item added to cart | ✅ Yes (cart.item_added subscriber) | ✅ Yes (useAddToCart hook) |
| **InitiateCheckout** | Checkout page load | ✅ Yes (cart.updated subscriber) | ✅ Yes (CheckoutPixelTracker) |
| **Purchase** | Order completed | ✅ Yes (order.placed subscriber) | ✅ Yes (CheckoutPixelTracker) |
| **CompleteRegistration** | Account created | ✅ Yes (customer.created subscriber) | ❌ No (backend only) |

**Note**: Events tracked both client-side and server-side provide the best data quality and deduplication handling via the backend.

---

## 🔍 Testing

1. **Check Pixel Installation**:
   - Open browser DevTools → Network tab
   - Filter by "facebook"
   - Should see requests to `connect.facebook.net` and `facebook.com/tr`

2. **Facebook Events Manager**:
   - Go to https://business.facebook.com/events_manager
   - Select your pixel
   - Check "Test Events" tool
   - Perform actions on your storefront
   - Events should appear in real-time

3. **Backend Logs**:
   - Check `PixelEvent` table in database
   - Check backend console for Conversions API responses
   - Use testing tool in dashboard (FacebookPixelTestingTool)

---

## 🎨 Advanced Customization

### Custom Events

```tsx
import { usePixelTracking } from '@/lib/pixel/hooks'

function MyComponent() {
  const { trackEvent } = usePixelTracking({ storeId: 'xxx' })
  
  const handleCustomAction = () => {
    trackEvent('CustomEvent', {
      custom_param: 'value',
      // ... your data
    })
  }
}
```

### Conditional Tracking

```tsx
<FacebookPixel 
  storeId={storeId}
  enabled={!isDevelopment} // Disable in dev
/>
```

---

## 📝 Notes

- **Client-side tracking** provides immediate feedback but can be blocked by ad blockers
- **Server-side tracking** (via Medusa subscribers) is reliable and ad-blocker proof
- Both methods use the same `eventId` for Facebook's automatic deduplication
- PII (email, phone, address) is automatically hashed (SHA-256) before sending
- All events are logged to `PixelEvent` table for analytics and debugging

---

## 🚀 Next Steps

1. ✅ Install components (Done)
2. ⏳ Add to layouts and pages (Follow steps above)
3. ⏳ Test with Facebook Events Manager
4. ⏳ Monitor analytics in dashboard
5. ⏳ Review backend logs for errors
