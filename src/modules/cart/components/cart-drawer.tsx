'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'
import { cn } from '@lib/utils'
import { animationVariants, transitions, designSystem } from '@lib/design-system'
import { useTheme } from '@lib/theme/ThemeProvider'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface CartItem {
  id: string
  title: string
  thumbnail?: string | null
  variant_title?: string
  quantity: number
  unit_price: number
  total: number
  currency_code: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items?: CartItem[]
  subtotal?: number
  shipping?: number
  tax?: number
  total?: number
  currency?: string
  onUpdateQuantity?: (itemId: string, quantity: number) => void
  onRemoveItem?: (itemId: string) => void
  itemCount?: number
}

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  total = 0,
  currency = 'USD',
  onUpdateQuantity,
  onRemoveItem,
  itemCount = 0,
}: CartDrawerProps) {
  const { theme } = useTheme()

  const formatPrice = (amount: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr.toUpperCase(),
    }).format(amount / 100)
  }

  const freeShippingThreshold = 10000 // $100.00 in cents
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100)
  const amountUntilFreeShipping = Math.max(freeShippingThreshold - subtotal, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.fast}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={transitions.spring}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: theme?.colors?.border || '#e5e7eb' }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-bold">
                  Shopping Cart
                  {itemCount > 0 && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                  )}
                </h2>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Free Shipping Progress Bar */}
            {shippingProgress < 100 && subtotal > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-4 bg-blue-50 border-b border-blue-100"
              >
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-blue-900 font-medium">
                    {amountUntilFreeShipping === 0 
                      ? '🎉 You qualify for free shipping!' 
                      : `Add ${formatPrice(amountUntilFreeShipping, currency)} for free shipping`}
                  </span>
                </div>
                <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                </div>
              </motion.div>
            )}

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  variants={animationVariants.fadeIn}
                  initial="initial"
                  animate="animate"
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add items to get started
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    style={{
                      backgroundColor: theme?.colors?.primary || '#3b82f6',
                      color: theme?.colors?.primaryText || '#ffffff',
                    }}
                    className="px-6 py-3 rounded-full font-semibold"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ ...transitions.spring, delay: index * 0.05 }}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        {/* Product Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0">
                          {item.thumbnail ? (
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              📦
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate mb-1">
                            {item.title}
                          </h4>
                          {item.variant_title && (
                            <p className="text-sm text-gray-500 mb-2">
                              {item.variant_title}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>

                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                {formatPrice(item.total, item.currency_code)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-500">
                                  {formatPrice(item.unit_price, item.currency_code)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onRemoveItem?.(item.id)}
                          className="self-start p-2 hover:bg-red-50 rounded-full transition-colors duration-200 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer - Summary & Checkout */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={transitions.spring}
                className="border-t p-6 space-y-4"
                style={{ borderColor: theme?.colors?.border || '#e5e7eb' }}
              >
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal, currency)}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium">{formatPrice(shipping, currency)}</span>
                    </div>
                  )}
                  {tax > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span className="font-medium">{formatPrice(tax, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={transitions.bounce}
                    >
                      {formatPrice(total, currency)}
                    </motion.span>
                  </div>
                </div>

                {/* Checkout Button */}
                <LocalizedClientLink href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      backgroundColor: theme?.colors?.primary || '#3b82f6',
                      color: theme?.colors?.primaryText || '#ffffff',
                    }}
                    className="w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </LocalizedClientLink>

                {/* Continue Shopping */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
