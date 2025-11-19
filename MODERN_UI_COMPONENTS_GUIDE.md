# Modern UI Components Guide

## 🎨 Overview

Your storefront now has **premium, production-ready components** that rival Nike, Apple, and Shopify stores. All components feature smooth animations, responsive design, and professional polish.

---

## 📦 Components Created

### 1. **Modern Product Card** (`modern-product-card.tsx`)

**Location:** `src/modules/products/components/modern-product-card.tsx`

**Features:**
- ✨ Image zoom on hover (1.1x scale with smooth 600ms animation)
- ❤️ Wishlist heart button with fill animation
- 👁️ Quick view overlay appears on hover
- 🛒 Quick add to cart with icon button
- 🏷️ Animated badges (SALE, NEW, HOT)
- 🎨 Color variant dots preview
- ⭐ Star rating display
- 📱 Mobile-optimized with adaptive buttons
- 🚀 Multiple hover effects (lift, scale, glow)

**Usage:**
```tsx
import ModernProductCard from '@modules/products/components/modern-product-card'

<ModernProductCard
  product={{
    id: '123',
    handle: 'product-slug',
    title: 'Premium T-Shirt',
    thumbnail: '/images/product.jpg',
    price: {
      calculated_amount: 2999, // $29.99 in cents
      currency_code: 'usd'
    },
    variants: [
      { id: '1', title: 'Blue', thumbnail: '/blue.jpg' }
    ]
  }}
  hoverEffect="lift" // 'lift' | 'scale' | 'glow' | 'none'
  showQuickView={true}
  showWishlist={true}
  showAddToCart={true}
  badge={{ text: 'SALE', variant: 'sale' }} // 'sale' | 'new' | 'hot'
  onQuickView={(id) => console.log('Quick view:', id)}
  onAddToCart={(id) => console.log('Add to cart:', id)}
  onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
/>
```

---

### 2. **Modern Product Card Skeleton** (`modern-product-card-skeleton.tsx`)

**Location:** `src/modules/products/components/modern-product-card-skeleton.tsx`

**Features:**
- 💫 Shimmer animation effect
- 🔄 Pulsing opacity animations
- 📐 Exact layout match with product card

**Usage:**
```tsx
import ModernProductCardSkeleton from '@modules/products/components/modern-product-card-skeleton'

{isLoading ? (
  <ModernProductCardSkeleton />
) : (
  <ModernProductCard product={product} />
)}
```

---

### 3. **Modern Hero Component** (`modern-hero.tsx`)

**Location:** `src/modules/home/components/hero/modern-hero.tsx`

**4 Stunning Variants:**

#### **Gradient Variant** (Animated Background)
```tsx
<ModernHero
  variant="gradient"
  title="Welcome to Our Store"
  subtitle="Discover Amazing Products"
  ctaText="Shop Now"
  ctaLink="/store"
  secondaryCtaText="Learn More"
  secondaryCtaLink="/about"
  height="lg" // 'sm' | 'md' | 'lg' | 'full'
  showScrollIndicator={true}
/>
```

#### **Image Variant** (Parallax Background)
```tsx
<ModernHero
  variant="image"
  backgroundImage="/hero-image.jpg"
  title="Summer Collection 2024"
  subtitle="Fresh styles for the season"
  ctaText="Explore Collection"
  ctaLink="/collections/summer"
  height="lg"
/>
```

#### **Video Variant** (Background Video)
```tsx
<ModernHero
  variant="video"
  backgroundVideo="/hero-video.mp4"
  title="Experience Innovation"
  subtitle="Where style meets technology"
  ctaText="Discover More"
  ctaLink="/products"
  height="full"
/>
```

#### **Minimal Variant** (Clean Two-Column)
```tsx
<ModernHero
  variant="minimal"
  title="Premium Quality"
  subtitle="Crafted with precision and care"
  ctaText="Start Shopping"
  ctaLink="/store"
  height="md"
/>
```

---

### 4. **Cart Drawer** (`cart-drawer.tsx`)

**Location:** `src/modules/cart/components/cart-drawer.tsx`

**Features:**
- 🎢 Slide-in animation from right
- 📊 Free shipping progress bar
- ➕➖ Quantity controls with animations
- 🗑️ Remove item with smooth exit animation
- 💰 Real-time price calculations
- 🎯 Empty cart state with CTA
- 📱 Mobile-optimized layout

**Usage:**
```tsx
import CartDrawer from '@modules/cart/components/cart-drawer'
import { useState } from 'react'

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsCartOpen(true)}>
        Cart (3)
      </button>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={[
          {
            id: '1',
            title: 'Premium T-Shirt',
            thumbnail: '/product.jpg',
            variant_title: 'Blue / M',
            quantity: 2,
            unit_price: 2999,
            total: 5998,
            currency_code: 'usd'
          }
        ]}
        subtotal={5998}
        shipping={500}
        tax={600}
        total={7098}
        currency="usd"
        itemCount={2}
        onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
        onRemoveItem={(id) => console.log('Remove:', id)}
      />
    </>
  )
}
```

---

### 5. **Mega Menu Navigation** (`mega-menu.tsx`)

**Location:** `src/modules/layout/components/mega-menu.tsx`

**Features:**
- 📋 Dropdown with fade + slide animation
- 🖼️ Category images with hover effects
- ⭐ Featured products showcase
- 🎯 Promotional banner section
- 🔍 Backdrop blur overlay
- ⌨️ Keyboard accessible

**Usage:**
```tsx
import MegaMenu from '@modules/layout/components/mega-menu'
import { Shirt, Watch, Gem } from 'lucide-react'

<MegaMenu
  categories={[
    {
      name: 'Clothing',
      href: '/categories/clothing',
      icon: <Shirt className="w-5 h-5" />,
      subcategories: [
        { name: 'T-Shirts', href: '/clothing/t-shirts', description: 'Casual and formal' },
        { name: 'Jackets', href: '/clothing/jackets', description: 'Outerwear collection' },
        { name: 'Pants', href: '/clothing/pants', description: 'Jeans and trousers' }
      ],
      featured: [
        {
          id: '1',
          title: 'Premium Cotton Tee',
          thumbnail: '/products/tee.jpg',
          price: 2999,
          currency: 'usd',
          badge: 'NEW'
        }
      ],
      image: '/category-clothing.jpg'
    },
    {
      name: 'Accessories',
      href: '/categories/accessories',
      icon: <Watch className="w-5 h-5" />,
      subcategories: [
        { name: 'Watches', href: '/accessories/watches' },
        { name: 'Bags', href: '/accessories/bags' },
        { name: 'Jewelry', href: '/accessories/jewelry' }
      ]
    }
  ]}
  onCategoryClick={(category) => console.log('Clicked:', category)}
/>
```

---

### 6. **Search Autocomplete** (`search-autocomplete.tsx`)

**Location:** `src/modules/search/components/search-autocomplete.tsx`

**Features:**
- 🔍 Real-time search suggestions
- ⏰ Recent searches history
- 🔥 Trending searches
- 📦 Product, category, and collection results
- 💨 Fast keyboard navigation
- 📱 Mobile-friendly

**Usage:**
```tsx
import SearchAutocomplete from '@modules/search/components/search-autocomplete'

<SearchAutocomplete
  placeholder="Search products, categories..."
  suggestions={[
    {
      id: '1',
      type: 'product',
      title: 'Blue Denim Jacket',
      description: 'Classic style',
      thumbnail: '/jacket.jpg',
      price: 8999,
      currency: 'usd',
      url: '/products/blue-denim-jacket'
    },
    {
      id: '2',
      type: 'category',
      title: 'Jackets',
      description: 'All outerwear',
      url: '/categories/jackets'
    }
  ]}
  recentSearches={['jackets', 'sneakers', 'summer dresses']}
  trendingSearches={['hoodies', 'boots', 'accessories']}
  isLoading={false}
  onSearch={(query) => console.log('Search:', query)}
/>
```

---

### 7. **Filter Drawer** (`filter-drawer.tsx`)

**Location:** `src/modules/store/components/filter-drawer.tsx`

**Features:**
- 🎚️ Multiple filter types (checkbox, radio, range, color)
- 🎨 Color swatches with visual selection
- 💰 Price range slider
- 📊 Result count display
- 🗂️ Collapsible filter groups
- 🧹 Clear all filters

**Usage:**
```tsx
import FilterDrawer from '@modules/store/components/filter-drawer'
import { useState } from 'react'

function StorePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Filters
      </button>

      <FilterDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        filters={[
          {
            id: 'category',
            label: 'Category',
            type: 'checkbox',
            options: [
              { id: 'tshirts', label: 'T-Shirts', count: 45 },
              { id: 'jackets', label: 'Jackets', count: 23 },
              { id: 'pants', label: 'Pants', count: 34 }
            ]
          },
          {
            id: 'size',
            label: 'Size',
            type: 'checkbox',
            options: [
              { id: 'xs', label: 'XS', count: 12 },
              { id: 's', label: 'S', count: 34 },
              { id: 'm', label: 'M', count: 56 },
              { id: 'l', label: 'L', count: 45 },
              { id: 'xl', label: 'XL', count: 23 }
            ]
          },
          {
            id: 'color',
            label: 'Color',
            type: 'color',
            colors: [
              { id: 'black', name: 'Black', hex: '#000000' },
              { id: 'white', name: 'White', hex: '#FFFFFF' },
              { id: 'blue', name: 'Blue', hex: '#3B82F6' },
              { id: 'red', name: 'Red', hex: '#EF4444' }
            ]
          },
          {
            id: 'price',
            label: 'Price Range',
            type: 'range',
            min: 0,
            max: 500
          }
        ]}
        selectedFilters={selectedFilters}
        onFilterChange={(filterId, values) => {
          setSelectedFilters(prev => ({ ...prev, [filterId]: values }))
        }}
        onApply={() => console.log('Apply filters:', selectedFilters)}
        onClear={() => setSelectedFilters({})}
        resultCount={142}
      />
    </>
  )
}
```

---

### 8. **Toast Notification System** (`toast/index.tsx`)

**Location:** `src/modules/common/components/toast/index.tsx`

**Features:**
- ✅ Success, error, info, warning types
- ⏱️ Auto-dismiss with progress bar
- 🎨 Beautiful colored backgrounds
- 🎭 Smooth entrance/exit animations
- 📚 Stackable notifications
- ⌨️ Keyboard accessible

**Setup:**

**1. Wrap your app with ToastProvider:**
```tsx
// app/layout.tsx
import { ToastProvider } from '@modules/common/components/toast'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
```

**2. Use in any component:**
```tsx
'use client'

import { useToast } from '@modules/common/components/toast'

function ProductPage() {
  const toast = useToast()

  const handleAddToCart = () => {
    toast.success('Added to cart!', 'Product has been added to your cart')
  }

  const handleError = () => {
    toast.error('Error', 'Something went wrong. Please try again.')
  }

  const handleInfo = () => {
    toast.info('New feature!', 'Check out our latest collection')
  }

  const handleWarning = () => {
    toast.warning('Low stock', 'Only 3 items left in stock')
  }

  // Or use the generic method
  toast.showToast('success', 'Title', 'Message', 5000) // 5 seconds

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
```

---

### 9. **Product Lightbox Gallery** (`product-lightbox.tsx`)

**Location:** `src/modules/products/components/product-lightbox.tsx`

**Features:**
- 🔍 Zoom in/out with draggable zoomed view
- ⬅️➡️ Arrow key navigation
- 🖼️ Thumbnail strip at bottom
- ⌨️ Full keyboard controls
- 📱 Touch gestures support
- 🎬 Smooth transitions between images

**Usage:**
```tsx
import ProductLightbox from '@modules/products/components/product-lightbox'
import { useState } from 'react'

function ProductGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            onClick={() => {
              setSelectedIndex(index)
              setIsOpen(true)
            }}
            className="cursor-pointer hover:opacity-75"
          />
        ))}
      </div>

      <ProductLightbox
        images={images}
        initialIndex={selectedIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
```

**Keyboard Shortcuts:**
- `←` / `→` - Navigate between images
- `+` / `-` - Zoom in/out
- `ESC` - Close lightbox

---

## 🎨 Design System

All components use your centralized design system:

**Location:** `src/lib/design-system.ts`

```tsx
import { designSystem, animationVariants, transitions } from '@lib/design-system'

// Colors (50-900 shades)
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
transitions.fast // 150ms
transitions.spring // Bouncy animation
```

---

## 🛠️ Utility Functions

**Class Name Utility** (`src/lib/utils.ts`):
```tsx
import { cn } from '@lib/utils'

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  'hover:hover-classes'
)} />
```

---

## 🎯 Integration Example

**Complete Store Page Example:**

```tsx
'use client'

import { useState } from 'react'
import ModernProductCard from '@modules/products/components/modern-product-card'
import ModernProductCardSkeleton from '@modules/products/components/modern-product-card-skeleton'
import FilterDrawer from '@modules/store/components/filter-drawer'
import SearchAutocomplete from '@modules/search/components/search-autocomplete'
import { useToast } from '@modules/common/components/toast'
import { SlidersHorizontal } from 'lucide-react'

export default function StorePage({ products, filters }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleAddToCart = (productId: string) => {
    toast.success('Added to cart!', 'Product has been added successfully')
  }

  const handleQuickView = (productId: string) => {
    // Open quick view modal
    console.log('Quick view:', productId)
  }

  const handleWishlist = (productId: string) => {
    toast.info('Added to wishlist', 'Product saved for later')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search & Filter Bar */}
      <div className="flex gap-4 mb-8">
        <SearchAutocomplete
          placeholder="Search products..."
          onSearch={(query) => console.log('Search:', query)}
        />
        <button
          onClick={() => setIsFilterOpen(true)}
          className="px-6 py-3 bg-white border rounded-full flex items-center gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array(8).fill(0).map((_, i) => (
            <ModernProductCardSkeleton key={i} />
          ))
        ) : (
          products.map((product) => (
            <ModernProductCard
              key={product.id}
              product={product}
              hoverEffect="lift"
              showQuickView
              showWishlist
              showAddToCart
              badge={product.is_new ? { text: 'NEW', variant: 'new' } : undefined}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              onToggleWishlist={handleWishlist}
            />
          ))
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={(id, values) => 
          setSelectedFilters(prev => ({ ...prev, [id]: values }))
        }
        onApply={() => {
          console.log('Apply filters:', selectedFilters)
          setIsFilterOpen(false)
        }}
        onClear={() => setSelectedFilters({})}
        resultCount={products.length}
      />
    </div>
  )
}
```

---

## 🚀 Performance Tips

1. **Lazy Load Components:**
```tsx
const CartDrawer = dynamic(() => import('@modules/cart/components/cart-drawer'))
const ProductLightbox = dynamic(() => import('@modules/products/components/product-lightbox'))
```

2. **Optimize Images:**
- Always use Next.js `Image` component
- Provide proper `sizes` prop
- Use loading="lazy" for below-fold images

3. **Animation Performance:**
- All animations use CSS transforms (hardware-accelerated)
- Framer Motion automatically optimizes animations
- Use `will-change` sparingly

4. **Code Splitting:**
- Components are already modular
- Import only what you need
- Use dynamic imports for heavy components

---

## 📱 Mobile Responsiveness

All components are mobile-first:
- Touch-friendly tap targets (min 44x44px)
- Swipe gestures where appropriate
- Responsive breakpoints: `sm:` `md:` `lg:` `xl:`
- Adaptive layouts for different screen sizes
- Bottom-sheet style drawers on mobile

---

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader friendly
- Color contrast compliant

---

## 🎨 Theme Integration

All components respect your theme system:

```tsx
import { useTheme } from '@lib/theme/ThemeProvider'

function MyComponent() {
  const { theme } = useTheme()

  return (
    <div style={{
      backgroundColor: theme.colors.primary,
      color: theme.colors.primaryText
    }}>
      Content
    </div>
  )
}
```

---

## 📦 What's Next?

Your modern UI foundation is complete! Here's what you can do:

1. **Replace Old Components:**
   - Swap `themed-product-preview.tsx` with `ModernProductCard`
   - Update hero section with `ModernHero`
   - Add cart drawer to header

2. **Enhance Pages:**
   - Product listing pages
   - Product detail pages
   - Homepage
   - Category pages

3. **Add More Features:**
   - Quick view modal
   - Product comparison
   - Wishlist page
   - User reviews
   - Social sharing

4. **Performance:**
   - Image optimization
   - Code splitting
   - Caching strategy
   - SEO optimization

---

## 🐛 Troubleshooting

**Issue:** Animations are janky
- **Fix:** Ensure you're not animating expensive properties (use transform instead of width/height)

**Issue:** Components not showing theme colors
- **Fix:** Make sure `ThemeProvider` wraps your app

**Issue:** TypeScript errors
- **Fix:** Check that all types are properly imported from component files

**Issue:** Framer Motion warnings
- **Fix:** Ensure `'use client'` directive is at the top of the file

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Radix UI Docs](https://www.radix-ui.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**🎉 Your storefront is now modern, competitive, and production-ready!**
