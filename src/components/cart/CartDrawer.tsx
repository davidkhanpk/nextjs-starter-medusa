'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  ShoppingBagIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import SafeLink from '@/components/common/SafeLink';
import { useCart } from '@lib/hooks/useCart';
import { convertToLocale } from '@lib/util/money';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, isLoading, updateQuantity, removeItem } = useCart();

  const items = cart?.items ?? [];
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart?.subtotal ?? 0;
  const currencyCode = cart?.currency_code ?? 'usd';

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(lineId, newQuantity);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemove = async (lineId: string) => {
    try {
      await removeItem(lineId);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Drawer panel — slides from right */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                      <Dialog.Title className="text-lg font-semibold text-gray-900">
                        Shopping Cart
                        {totalItems > 0 && (
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                          </span>
                        )}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto">
                      {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
                        </div>
                      ) : items.length === 0 ? (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                          <ShoppingBagIcon className="h-16 w-16 text-gray-300 mb-4" />
                          <p className="text-base font-medium text-gray-900 mb-1">
                            Your cart is empty
                          </p>
                          <p className="text-sm text-gray-500 mb-6">
                            Browse products and add items to get started.
                          </p>
                          <SafeLink
                            href="/store"
                            onClick={onClose}
                            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                          >
                            Continue Shopping
                          </SafeLink>
                        </div>
                      ) : (
                        /* Item list */
                        <ul className="divide-y divide-gray-100">
                          {items
                            .sort((a, b) =>
                              (a.created_at ?? '') > (b.created_at ?? '') ? -1 : 1
                            )
                            .map((item) => (
                              <li key={item.id} className="px-5 py-4">
                                <div className="flex gap-4">
                                  {/* Thumbnail */}
                                  <SafeLink
                                    href={`/products/${item.product_handle}`}
                                    onClick={onClose}
                                    className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100"
                                  >
                                    {item.thumbnail ? (
                                      <Image
                                        src={item.thumbnail}
                                        alt={item.title ?? 'Product'}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ShoppingBagIcon className="h-8 w-8" />
                                      </div>
                                    )}
                                  </SafeLink>

                                  {/* Details */}
                                  <div className="flex-1 min-w-0">
                                    <SafeLink
                                      href={`/products/${item.product_handle}`}
                                      onClick={onClose}
                                      className="text-sm font-medium text-gray-900 hover:text-gray-700 truncate block"
                                    >
                                      {item.title}
                                    </SafeLink>
                                    {item.variant?.title &&
                                      item.variant.title !== 'Default variant' && (
                                        <p className="text-xs text-gray-500 mt-0.5">
                                          {item.variant.title}
                                        </p>
                                      )}

                                    {/* Price */}
                                    <p className="text-sm font-medium text-gray-900 mt-1">
                                      {convertToLocale({
                                        amount: item.subtotal ?? item.unit_price * item.quantity,
                                        currency_code: currencyCode,
                                      })}
                                    </p>

                                    {/* Quantity controls + Remove */}
                                    <div className="flex items-center justify-between mt-2">
                                      <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button
                                          onClick={() =>
                                            handleUpdateQuantity(item.id, item.quantity - 1)
                                          }
                                          disabled={item.quantity <= 1}
                                          className="p-1.5 text-gray-500 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                                          aria-label="Decrease quantity"
                                        >
                                          <MinusIcon className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="px-3 text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleUpdateQuantity(item.id, item.quantity + 1)
                                          }
                                          className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                                          aria-label="Increase quantity"
                                        >
                                          <PlusIcon className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                      <button
                                        onClick={() => handleRemove(item.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                        aria-label="Remove item"
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer — subtotal + action buttons */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-5 py-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Subtotal{' '}
                            <span className="text-gray-400">(excl. taxes)</span>
                          </span>
                          <span className="text-base font-semibold text-gray-900">
                            {convertToLocale({
                              amount: subtotal,
                              currency_code: currencyCode,
                            })}
                          </span>
                        </div>
                        <SafeLink
                          href="/cart"
                          onClick={onClose}
                          className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          View Cart
                        </SafeLink>
                        <SafeLink
                          href="/checkout"
                          onClick={onClose}
                          className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                          Checkout
                        </SafeLink>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
