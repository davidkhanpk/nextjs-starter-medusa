'use client'

/**
 * EXAMPLE INTEGRATION
 * 
 * This file demonstrates how to use all the modern UI components together
 * in a real store page. Copy and adapt this code for your actual pages.
 */

import { useState } from 'react'
import { SlidersHorizontal, ShoppingCart } from 'lucide-react'

// Import modern components
import ModernProductCard from '@modules/products/components/modern-product-card'
import ModernProductCardSkeleton from '@modules/products/components/modern-product-card-skeleton'
import ModernHero from '@modules/home/components/hero/modern-hero'
import CartDrawer from '@modules/cart/components/cart-drawer'
import FilterDrawer from '@modules/store/components/filter-drawer'
import SearchAutocomplete from '@modules/search/components/search-autocomplete'
import ProductLightbox from '@modules/products/components/product-lightbox'
import { useToast } from '@modules/common/components/toast'
import MegaMenu from '@modules/layout/components/mega-menu'

// Example data structures
const mockProducts = [
  {
    id: '1',
    handle: 'premium-cotton-tee',
    title: 'Premium Cotton T-Shirt',
    thumbnail: 'https://via.placeholder.com/400',
    price: { calculated_amount: 2999, currency_code: 'usd' },
    variants: [
      { id: 'v1', title: 'Blue / M', thumbnail: 'https://via.placeholder.com/100' },
      { id: 'v2', title: 'Red / M', thumbnail: 'https://via.placeholder.com/100' }
    ]
  },
  {
    id: '2',
    handle: 'classic-denim-jacket',
    title: 'Classic Denim Jacket',
    thumbnail: 'https://via.placeholder.com/400',
    price: { calculated_amount: 8999, currency_code: 'usd' },
    variants: []
  },
  // Add more products as needed
]

const mockCartItems = [
  {
    id: '1',
    title: 'Premium Cotton T-Shirt',
    thumbnail: 'https://via.placeholder.com/100',
    variant_title: 'Blue / M',
    quantity: 2,
    unit_price: 2999,
    total: 5998,
    currency_code: 'usd'
  }
]

const mockFilters = [
  {
    id: 'category',
    label: 'Category',
    type: 'checkbox' as const,
    options: [
      { id: 'tshirts', label: 'T-Shirts', count: 45 },
      { id: 'jackets', label: 'Jackets', count: 23 },
      { id: 'pants', label: 'Pants', count: 34 }
    ]
  },
  {
    id: 'size',
    label: 'Size',
    type: 'radio' as const,
    options: [
      { id: 's', label: 'Small' },
      { id: 'm', label: 'Medium' },
      { id: 'l', label: 'Large' },
      { id: 'xl', label: 'X-Large' }
    ]
  },
  {
    id: 'color',
    label: 'Color',
    type: 'color' as const,
    colors: [
      { id: 'black', name: 'Black', hex: '#000000' },
      { id: 'white', name: 'White', hex: '#FFFFFF' },
      { id: 'blue', name: 'Blue', hex: '#3B82F6' },
      { id: 'red', name: 'Red', hex: '#EF4444' },
      { id: 'green', name: 'Green', hex: '#10B981' }
    ]
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'range' as const,
    min: 0,
    max: 500
  }
]

const mockCategories = [
  {
    name: 'Clothing',
    href: '/categories/clothing',
    subcategories: [
      { name: 'T-Shirts', href: '/clothing/t-shirts', description: 'Casual and formal styles' },
      { name: 'Jackets', href: '/clothing/jackets', description: 'Premium outerwear' },
      { name: 'Pants', href: '/clothing/pants', description: 'Jeans and trousers' },
      { name: 'Shorts', href: '/clothing/shorts', description: 'Summer essentials' }
    ],
    featured: [
      {
        id: '1',
        title: 'Premium Cotton Tee',
        thumbnail: 'https://via.placeholder.com/100',
        price: 2999,
        currency: 'usd',
        badge: 'NEW'
      }
    ],
    image: 'https://via.placeholder.com/400x600'
  }
]

/**
 * Example Store Page Component
 * Integrates: Hero, Search, Filters, Products, Cart, Toast
 */
export default function ModernStoreExample() {
  const toast = useToast()
  
  // State management
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(1)

  // Handlers
  const handleAddToCart = (productId: string) => {
    toast.success('Added to cart!', 'Product has been added to your cart')
    setCartItemCount(prev => prev + 1)
  }

  const handleQuickView = (productId: string) => {
    toast.info('Quick View', `Opening product ${productId}`)
    // Implement quick view modal here
  }

  const handleWishlist = (productId: string) => {
    toast.success('Added to wishlist', 'Product saved for later')
  }

  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    // Implement search logic
  }

  const handleFilterApply = () => {
    console.log('Applying filters:', selectedFilters)
    toast.info('Filters applied', `Showing filtered results`)
    setIsFilterOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================================
          HEADER WITH MEGA MENU, SEARCH, AND CART
          ============================================ */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="text-2xl font-bold">STORE</div>

            {/* Mega Menu Navigation */}
            <div className="hidden lg:block flex-1 max-w-2xl">
              <MegaMenu
                categories={mockCategories}
                onCategoryClick={(cat) => console.log('Category:', cat)}
              />
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <SearchAutocomplete
                placeholder="Search..."
                onSearch={handleSearch}
                recentSearches={['jackets', 'sneakers']}
                trendingSearches={['hoodies', 'boots']}
              />
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <ModernHero
        variant="gradient"
        title="Summer Collection 2024"
        subtitle="Discover the latest trends in fashion"
        ctaText="Shop Now"
        ctaLink="/store"
        secondaryCtaText="Learn More"
        secondaryCtaLink="/about"
        height="md"
        showScrollIndicator={true}
      />

      {/* ============================================
          PRODUCTS SECTION
          ============================================ */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600">Handpicked items just for you</p>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-gray-300 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filters</span>
            {Object.values(selectedFilters).flat().length > 0 && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {Object.values(selectedFilters).flat().length}
              </span>
            )}
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(8).fill(0).map((_, i) => (
              <ModernProductCardSkeleton key={i} />
            ))
          ) : (
            // Actual products
            mockProducts.map((product, index) => (
              <ModernProductCard
                key={product.id}
                product={product}
                hoverEffect="lift"
                showQuickView={true}
                showWishlist={true}
                showAddToCart={true}
                badge={
                  index === 0 
                    ? { text: 'NEW', variant: 'new' }
                    : index === 1
                    ? { text: 'SALE', variant: 'sale' }
                    : undefined
                }
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                onToggleWishlist={handleWishlist}
              />
            ))
          )}
        </div>
      </section>

      {/* ============================================
          CART DRAWER
          ============================================ */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={mockCartItems}
        subtotal={5998}
        shipping={500}
        tax={600}
        total={7098}
        currency="usd"
        itemCount={cartItemCount}
        onUpdateQuantity={(id, qty) => {
          console.log('Update quantity:', id, qty)
          toast.info('Cart updated', 'Quantity changed')
        }}
        onRemoveItem={(id) => {
          console.log('Remove item:', id)
          toast.success('Removed', 'Item removed from cart')
          setCartItemCount(prev => Math.max(0, prev - 1))
        }}
      />

      {/* ============================================
          FILTER DRAWER
          ============================================ */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={mockFilters}
        selectedFilters={selectedFilters}
        onFilterChange={(filterId, values) => {
          setSelectedFilters(prev => ({
            ...prev,
            [filterId]: values
          }))
        }}
        onApply={handleFilterApply}
        onClear={() => {
          setSelectedFilters({})
          toast.info('Filters cleared', 'Showing all products')
        }}
        resultCount={mockProducts.length}
      />

      {/* ============================================
          FOOTER (Optional)
          ============================================ */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Your Store. Built with modern UI components.
          </p>
        </div>
      </footer>
    </div>
  )
}

/**
 * USAGE INSTRUCTIONS:
 * 
 * 1. Copy this file to your pages directory
 * 2. Wrap your app with ToastProvider in layout.tsx:
 *    
 *    import { ToastProvider } from '@modules/common/components/toast'
 *    
 *    export default function RootLayout({ children }) {
 *      return (
 *        <html>
 *          <body>
 *            <ToastProvider>
 *              {children}
 *            </ToastProvider>
 *          </body>
 *        </html>
 *      )
 *    }
 * 
 * 3. Replace mock data with real data from your Medusa backend
 * 4. Implement actual cart/wishlist/filter logic
 * 5. Customize styles and layouts to match your brand
 * 
 * All components are production-ready and fully responsive!
 */
