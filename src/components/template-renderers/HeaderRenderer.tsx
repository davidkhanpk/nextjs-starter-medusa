'use client'

import React, { useState } from 'react';
import { HeaderTemplate } from '@lib/template/types-advanced';
import Link from '@/components/common/SafeLink';
import { 
  cn, 
  colorToTailwind, 
  spacingToTailwind,
  borderRadiusToTailwind 
} from '@lib/template/tailwind-mapper';
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  HeartIcon, 
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface HeaderRendererProps {
  template: HeaderTemplate | null;
  menuItems?: MenuItem[];
  cartItemsCount?: number;
  wishlistCount?: number;
}

interface MenuItem {
  id: string;
  label: string;
  url?: string;
  children?: MenuItem[];
  isVisible?: boolean;
  openInNewTab?: boolean;
}

/**
 * Header Renderer
 * Renders customizable headers with logo, navigation, search, and actions
 */
export function HeaderRenderer({ template, menuItems, cartItemsCount = 0, wishlistCount = 0 }: HeaderRendererProps) {
  const config = template || getDefaultHeaderTemplate();
  const { zones, settings } = config;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Use provided menu items or fallback to defaults
  const navItems = menuItems?.filter(item => item.isVisible !== false) || [
    { id: '1', label: 'New Arrivals', url: '/collections/new' },
    { id: '2', label: 'Shop', url: '/store' },
    { id: '3', label: 'Collections', url: '/collections' },
    { id: '4', label: 'Sale', url: '/collections/sale' },
  ];

  // Render top bar
  const renderTopBar = () => {
    if (!zones.topBar?.enabled) return null;

    return (
      <div 
        className="text-sm"
        style={{
          backgroundColor: zones.topBar.backgroundColor,
          color: zones.topBar.textColor,
          height: zones.topBar.height,
        }}
      >
        <div className={cn(
          'flex items-center justify-between h-full px-4',
          settings.maxWidth === 'container' && 'content-container',
          settings.maxWidth === 'narrow' && 'max-w-5xl mx-auto'
        )}>
          <span>{zones.topBar.content?.left}</span>
          <span>{zones.topBar.content?.center}</span>
          <span>{zones.topBar.content?.right}</span>
        </div>
      </div>
    );
  };

  // Render logo
  const renderLogo = () => {
    return (
      <Link 
        href="/" 
        className="flex items-center"
        style={{
          maxWidth: zones.mainHeader.logo.maxWidth,
          maxHeight: zones.mainHeader.logo.maxHeight,
        }}
      >
        <span className="text-2xl font-bold" style={{ color: zones.mainHeader.textColor }}>
          STORE
        </span>
      </Link>
    );
  };

  // Render navigation
  const renderNavigation = () => {
    const { navigation } = zones.mainHeader;

    return (
      <nav className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => item.children && item.children.length > 0 && setActiveDropdown(item.id)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href={item.url || '#'}
              target={item.openInNewTab ? '_blank' : undefined}
              rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
              className={cn(
                'transition-all flex items-center gap-1',
                navigation.hoverEffect === 'underline' && 'hover:underline',
                navigation.hoverEffect === 'background' && 'hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded',
                navigation.hoverEffect === 'color' && 'hover:opacity-70'
              )}
              style={{
                color: zones.mainHeader.textColor,
                fontSize: navigation.fontSize === 'sm' ? '0.875rem' : navigation.fontSize === 'base' ? '1rem' : '1.125rem',
                fontWeight: navigation.fontWeight === 'normal' ? 400 : navigation.fontWeight === 'medium' ? 500 : 600,
              }}
            >
              {item.label}
              {item.children && item.children.length > 0 && (
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              )}
            </Link>

            {/* Dropdown Menu */}
            {item.children && item.children.length > 0 && activeDropdown === item.id && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                {item.children.filter(child => child.isVisible !== false).map((child) => (
                  <Link
                    key={child.id}
                    href={child.url || '#'}
                    target={child.openInNewTab ? '_blank' : undefined}
                    rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    style={{ color: zones.mainHeader.textColor }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  };

  // Render actions
  const renderActions = () => {
    const { actions } = zones.mainHeader;
    const iconSizeClass = actions.iconSize === 'sm' ? 'w-5 h-5' : actions.iconSize === 'md' ? 'w-6 h-6' : 'w-7 h-7';

    return (
      <div className="hidden lg:flex items-center gap-4">
        {actions.items.includes('search') && (
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className={iconSizeClass} style={{ color: zones.mainHeader.textColor }} />
          </button>
        )}
        
        {actions.items.includes('account') && (
          <Link 
            href="/account" 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Account"
          >
            <UserIcon className={iconSizeClass} style={{ color: zones.mainHeader.textColor }} />
            {actions.showLabels && <span className="ml-2 text-sm">Account</span>}
          </Link>
        )}

        {actions.items.includes('wishlist') && (
          <Link 
            href="/wishlist" 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
            aria-label="Wishlist"
          >
            <HeartIcon className={iconSizeClass} style={{ color: zones.mainHeader.textColor }} />
            {wishlistCount > 0 && actions.cartBadge && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
        )}

        {actions.items.includes('cart') && (
          <Link 
            href="/cart" 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCartIcon className={iconSizeClass} style={{ color: zones.mainHeader.textColor }} />
            {cartItemsCount > 0 && actions.cartBadge && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
            {actions.showLabels && <span className="ml-2 text-sm">Cart</span>}
          </Link>
        )}
      </div>
    );
  };

  // Render mobile menu button
  const renderMobileMenuButton = () => {
    return (
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6" style={{ color: zones.mainHeader.textColor }} />
        ) : (
          <Bars3Icon className="w-6 h-6" style={{ color: zones.mainHeader.textColor }} />
        )}
      </button>
    );
  };

  // Render mobile menu
  const renderMobileMenu = () => {
    if (!mobileMenuOpen) return null;

    const { mobileMenu } = zones;

    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            'fixed top-0 h-full w-80 shadow-xl z-50 transform transition-transform lg:hidden overflow-y-auto',
            mobileMenu.position === 'left' ? 'left-0' : 'right-0'
          )}
          style={{ backgroundColor: mobileMenu.backgroundColor }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Search */}
            {mobileMenu.showSearch && (
              <div className="mb-6">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  <Link
                    href={item.url || '#'}
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-base font-medium block"
                    onClick={() => !item.children?.length && setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Submenu items */}
                  {item.children && item.children.length > 0 && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.filter(child => child.isVisible !== false).map((child) => (
                        <Link
                          key={child.id}
                          href={child.url || '#'}
                          target={child.openInNewTab ? '_blank' : undefined}
                          rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="mt-8 pt-8 border-t flex flex-col gap-2">
              <Link href="/account" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center gap-3">
                <UserIcon className="w-5 h-5" />
                Account
              </Link>
              <Link href="/wishlist" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center gap-3">
                <HeartIcon className="w-5 h-5" />
                Wishlist ({wishlistCount})
              </Link>
              <Link href="/cart" className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center gap-3">
                <ShoppingCartIcon className="w-5 h-5" />
                Cart ({cartItemsCount})
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Main header layout
  const getHeaderLayout = () => {
    const { layout } = zones.mainHeader;

    switch (layout) {
      case 'center':
        return (
          <div className="flex flex-col items-center gap-6 py-4">
            {renderLogo()}
            {renderNavigation()}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {renderActions()}
            </div>
          </div>
        );
      
      case 'split':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              {renderLogo()}
              {renderNavigation()}
            </div>
            {renderActions()}
          </div>
        );

      case 'stacked':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              {renderLogo()}
              {renderActions()}
            </div>
            <div className="flex justify-center">
              {renderNavigation()}
            </div>
          </div>
        );

      default: // 'left-center-right'
        return (
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              {renderMobileMenuButton()}
              {renderLogo()}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              {renderNavigation()}
            </div>
            {renderActions()}
          </div>
        );
    }
  };

  return (
    <header
      className={cn(
        'w-full',
        zones.mainHeader.sticky && 'sticky top-0 z-40',
        zones.mainHeader.shadow && 'shadow-md',
        settings.transparency && 'bg-opacity-90 backdrop-blur-md',
        settings.blur && 'backdrop-blur-lg'
      )}
      style={{
        backgroundColor: zones.mainHeader.backgroundColor,
      }}
    >
      {renderTopBar()}
      
      <div 
        style={{ height: zones.mainHeader.height }}
        className="flex items-center"
      >
        <div className={cn(
          'w-full px-4',
          settings.maxWidth === 'container' && 'content-container',
          settings.maxWidth === 'narrow' && 'max-w-5xl mx-auto'
        )}>
          {getHeaderLayout()}
        </div>
      </div>

      {renderMobileMenu()}
    </header>
  );
}

/**
 * Default header template
 */
function getDefaultHeaderTemplate(): HeaderTemplate {
  return {
    id: 'default',
    templateName: 'Default Header',
    category: 'minimal',
    zones: {
      mainHeader: {
        layout: 'left-center-right',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        height: '80px',
        sticky: true,
        shadow: true,
        logo: {
          position: 'left',
          maxWidth: '150px',
          maxHeight: '50px',
        },
        navigation: {
          position: 'center',
          style: 'horizontal',
          alignment: 'center',
          spacing: 'normal',
          fontSize: 'sm',
          fontWeight: 'medium',
          hoverEffect: 'underline',
          activeIndicator: true,
        },
        actions: {
          position: 'right',
          items: ['search', 'account', 'cart'],
          iconSize: 'md',
          showLabels: false,
          cartBadge: true,
        },
      },
      mobileMenu: {
        style: 'drawer',
        position: 'left',
        backgroundColor: '#ffffff',
        showSearch: true,
        showCategories: true,
      },
    },
    settings: {
      colors: {
        primary: '#000000',
        secondary: '#6b7280',
        accent: '#3b82f6',
        background: '#ffffff',
        text: '#000000',
        border: '#e5e7eb',
      },
      spacing: 'normal',
      borderRadius: 'none',
      breakpoint: 'md',
      maxWidth: 'container',
      transparency: false,
      blur: false,
    },
  };
}
