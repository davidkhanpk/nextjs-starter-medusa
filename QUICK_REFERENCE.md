# 🚀 Quick Reference Card

## Component Import Paths

```tsx
// Products
import ModernProductCard from '@modules/products/components/modern-product-card'
import ModernProductCardSkeleton from '@modules/products/components/modern-product-card-skeleton'
import ProductLightbox from '@modules/products/components/product-lightbox'

// Layout
import ModernHero from '@modules/home/components/hero/modern-hero'
import MegaMenu from '@modules/layout/components/mega-menu'

// Shopping
import CartDrawer from '@modules/cart/components/cart-drawer'
import FilterDrawer from '@modules/store/components/filter-drawer'

// Search
import SearchAutocomplete from '@modules/search/components/search-autocomplete'

// Common
import { useToast, ToastProvider } from '@modules/common/components/toast'

// Design System
import { designSystem, animationVariants, transitions } from '@lib/design-system'
import { cn } from '@lib/utils'
```

---

## Essential Props

### ModernProductCard
```tsx
<ModernProductCard
  product={product}              // Required
  hoverEffect="lift"             // 'lift' | 'scale' | 'glow' | 'none'
  showQuickView={true}           
  showWishlist={true}
  showAddToCart={true}
  badge={{ text: 'SALE', variant: 'sale' }}
  onQuickView={(id) => {}}
  onAddToCart={(id) => {}}
  onToggleWishlist={(id) => {}}
/>
```

### ModernHero
```tsx
<ModernHero
  variant="gradient"             // 'gradient' | 'image' | 'video' | 'minimal'
  title="Your Title"
  subtitle="Your Subtitle"
  ctaText="Shop Now"
  ctaLink="/store"
  height="lg"                    // 'sm' | 'md' | 'lg' | 'full'
  showScrollIndicator={true}
/>
```

### CartDrawer
```tsx
<CartDrawer
  isOpen={isOpen}                // Required
  onClose={() => {}}             // Required
  items={cartItems}
  subtotal={5000}
  total={6000}
  currency="usd"
  itemCount={3}
  onUpdateQuantity={(id, qty) => {}}
  onRemoveItem={(id) => {}}
/>
```

### Toast
```tsx
const toast = useToast()

toast.success('Title', 'Message')
toast.error('Title', 'Message')
toast.info('Title', 'Message')
toast.warning('Title', 'Message')
```

---

## Design Tokens

```tsx
// Colors
designSystem.colors.primary[500]
designSystem.colors.secondary[600]
designSystem.colors.neutral[100]

// Shadows
designSystem.shadows.md
designSystem.shadows.glow

// Animations
animationVariants.fadeIn
animationVariants.slideUp
animationVariants.scale

// Transitions
transitions.fast      // 150ms
transitions.spring    // Bouncy
```

---

## Common Patterns

### Loading State
```tsx
{isLoading ? (
  <ModernProductCardSkeleton />
) : (
  <ModernProductCard product={product} />
)}
```

### Grid Layout
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map(product => (
    <ModernProductCard key={product.id} product={product} />
  ))}
</div>
```

### Conditional Badge
```tsx
badge={
  product.on_sale 
    ? { text: 'SALE', variant: 'sale' }
    : product.is_new
    ? { text: 'NEW', variant: 'new' }
    : undefined
}
```

---

## File Locations

```
nextjs-starter-medusa/
├── src/
│   ├── lib/
│   │   ├── design-system.ts          ← Design tokens
│   │   └── utils.ts                  ← cn() utility
│   ├── modules/
│   │   ├── products/components/
│   │   │   ├── modern-product-card.tsx
│   │   │   ├── modern-product-card-skeleton.tsx
│   │   │   └── product-lightbox.tsx
│   │   ├── home/components/hero/
│   │   │   └── modern-hero.tsx
│   │   ├── cart/components/
│   │   │   └── cart-drawer.tsx
│   │   ├── layout/components/
│   │   │   └── mega-menu.tsx
│   │   ├── search/components/
│   │   │   └── search-autocomplete.tsx
│   │   ├── store/components/
│   │   │   └── filter-drawer.tsx
│   │   └── common/components/toast/
│   │       └── index.tsx
│   └── app/examples/
│       └── modern-store-example.tsx  ← Working example
├── MODERN_UI_COMPONENTS_GUIDE.md     ← Full documentation
├── MODERN_UI_COMPLETE.md             ← Summary
└── QUICK_REFERENCE.md                ← This file
```

---

## Setup Checklist

- [ ] Install dependencies (already done ✅)
- [ ] Add ToastProvider to layout.tsx
- [ ] Import components where needed
- [ ] Replace old components with modern ones
- [ ] Test on mobile devices
- [ ] Optimize images
- [ ] Deploy!

---

## Performance Tips

1. Use dynamic imports for heavy components
2. Always provide proper image `sizes` prop
3. Implement skeleton loading states
4. Lazy load below-fold content
5. Code split by route

---

## Accessibility Checklist

- [x] Keyboard navigation works
- [x] Focus visible on all interactive elements
- [x] ARIA labels present
- [x] Color contrast sufficient
- [x] Screen reader tested
- [x] Touch targets 44x44px minimum

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+

---

## Need Help?

1. Check `MODERN_UI_COMPONENTS_GUIDE.md`
2. See `modern-store-example.tsx` for working code
3. Review component prop types
4. Check browser console for errors

---

**Save this file for quick reference while building! 🎯**
