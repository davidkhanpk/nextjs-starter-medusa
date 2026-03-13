'use client'

/**
 * Mobile Menu Component
 * Drawer-style menu with accordion items for mobile devices
 */

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { EnrichedMenuItem } from '@/lib/menu/types'
import { Theme } from '@/lib/theme/api'
import { MobileMenuItem } from './MobileMenuItem'

interface MobileMenuProps {
  items: EnrichedMenuItem[]
  theme: Theme
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ items, theme, isOpen, onClose }: MobileMenuProps) {
  // Get theme tokens with fallbacks
  const tokens = theme.globalSettings?.colors?.tokens || {}
  const mobileTokens = tokens.mobileMenu || {}
  const typography = theme.globalSettings?.typography || {}
  const spacing = theme.globalSettings?.spacing?.mobileMenu || {}

  // Filter visible top-level items
  const visibleItems = items.filter(item => item.isVisible && !item.parentId)

  // Mobile menu styling
  const menuStyle: React.CSSProperties = {
    backgroundColor: mobileTokens.background || '#ffffff',
    color: mobileTokens.text || '#111827',
    height: '100%',
    width: '100%',
    maxWidth: '400px',
    padding: spacing.padding || '16px',
    display: 'flex',
    flexDirection: 'column'
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${mobileTokens.border || '#e5e7eb'}`
  }

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize?.navigationMobile || '16px',
    fontWeight: 600,
    color: mobileTokens.text || '#111827'
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        {/* Drawer */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div style={menuStyle}>
                    {/* Header */}
                    <div style={headerStyle}>
                      <Dialog.Title style={titleStyle}>
                        Menu
                      </Dialog.Title>
                      <button
                        type="button"
                        onClick={onClose}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '8px',
                          color: mobileTokens.text || '#111827'
                        }}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Menu Items */}
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                      {visibleItems.map(item => (
                        <MobileMenuItem
                          key={item.id}
                          item={item}
                          theme={theme}
                          onLinkClick={onClose}
                        />
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
