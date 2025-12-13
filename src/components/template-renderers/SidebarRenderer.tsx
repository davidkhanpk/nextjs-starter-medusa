'use client'

import React, { useState } from 'react';
import { SidebarTemplate } from '@lib/template/types-advanced';
import { cn } from '@lib/template/tailwind-mapper';
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

interface SidebarRendererProps {
  template: SidebarTemplate | null;
  onClose?: () => void;
  isMobile?: boolean;
}

/**
 * Sidebar Renderer
 * Renders customizable sidebars with filters, quick links, and promotional content
 */
export function SidebarRenderer({ template, onClose, isMobile = false }: SidebarRendererProps) {
  const config = template || getDefaultSidebarTemplate();
  const { zones, settings } = config;

  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'price']);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Filter data (would come from API in production)
  const filterData = {
    categories: [
      { id: 'clothing', label: 'Clothing', count: 245 },
      { id: 'accessories', label: 'Accessories', count: 89 },
      { id: 'shoes', label: 'Shoes', count: 156 },
      { id: 'bags', label: 'Bags', count: 67 },
    ],
    brands: [
      { id: 'nike', label: 'Nike', count: 78 },
      { id: 'adidas', label: 'Adidas', count: 65 },
      { id: 'puma', label: 'Puma', count: 43 },
      { id: 'reebok', label: 'Reebok', count: 32 },
    ],
    colors: [
      { id: 'black', label: 'Black', hex: '#000000', count: 120 },
      { id: 'white', label: 'White', hex: '#FFFFFF', count: 98 },
      { id: 'blue', label: 'Blue', hex: '#3B82F6', count: 76 },
      { id: 'red', label: 'Red', hex: '#EF4444', count: 54 },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  };

  const quickLinks = [
    { label: 'New Arrivals', href: '/collections/new', badge: 'New' },
    { label: 'Best Sellers', href: '/collections/best', badge: '🔥' },
    { label: 'Sale Items', href: '/collections/sale', badge: '-50%' },
    { label: 'Gift Cards', href: '/gift-cards' },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleFilter = (type: 'categories' | 'brands' | 'colors' | 'sizes', value: string) => {
    const setters = {
      categories: setSelectedCategories,
      brands: setSelectedBrands,
      colors: setSelectedColors,
      sizes: setSelectedSizes,
    };
    const getters = {
      categories: selectedCategories,
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
    };

    const current = getters[type];
    const setter = setters[type];

    setter(
      current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
    );
  };

  // Render header
  const renderHeader = () => {
    if (!zones.header?.enabled) return null;

    return (
      <div 
        className={cn(
          'flex items-center justify-between p-4',
          zones.header.sticky && 'sticky top-0 z-10',
          'border-b'
        )}
        style={{
          backgroundColor: zones.header.backgroundColor,
          borderColor: settings.colors.border,
        }}
      >
        <div className="flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          <h2 className="text-lg font-semibold">{zones.header.title || 'Filters'}</h2>
        </div>
        {zones.header.showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close filters"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  };

  // Render filter section
  const renderFilterSection = (section: any) => {
    const isExpanded = expandedSections.includes(section.id);
    const isAccordion = zones.filters?.style === 'accordion';

    const renderSectionContent = () => {
      switch (section.type) {
        case 'categories':
          return (
            <div className="space-y-2">
              {filterData.categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleFilter('categories', cat.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="flex-1 text-sm">{cat.label}</span>
                  <span className="text-xs opacity-60">({cat.count})</span>
                </label>
              ))}
            </div>
          );

        case 'price':
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-20 px-2 py-1 text-sm border rounded"
                  placeholder="Min"
                />
                <span className="text-sm opacity-60">to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-20 px-2 py-1 text-sm border rounded"
                  placeholder="Max"
                />
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          );

        case 'brands':
          return (
            <div className="space-y-2">
              {filterData.brands.map(brand => (
                <label key={brand.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => toggleFilter('brands', brand.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="flex-1 text-sm">{brand.label}</span>
                  <span className="text-xs opacity-60">({brand.count})</span>
                </label>
              ))}
            </div>
          );

        case 'colors':
          return (
            <div className="flex flex-wrap gap-2">
              {filterData.colors.map(color => (
                <button
                  key={color.id}
                  onClick={() => toggleFilter('colors', color.id)}
                  className={cn(
                    'w-10 h-10 rounded-full border-2 transition-all',
                    selectedColors.includes(color.id) ? 'border-black scale-110' : 'border-gray-300'
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={`${color.label} (${color.count})`}
                />
              ))}
            </div>
          );

        case 'sizes':
          return (
            <div className="flex flex-wrap gap-2">
              {filterData.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleFilter('sizes', size)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded border transition-all',
                    selectedSizes.includes(size)
                      ? 'bg-black text-white border-black'
                      : 'bg-white dark:bg-gray-800 border-gray-300 hover:border-black'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div key={section.id} className="border-b" style={{ borderColor: settings.colors.border }}>
        <button
          onClick={() => isAccordion && toggleSection(section.id)}
          className={cn(
            'w-full flex items-center justify-between p-4 text-left font-medium',
            isAccordion && 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
          )}
          disabled={!isAccordion}
        >
          <span>{section.title}</span>
          {isAccordion && (
            isExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
        {(!isAccordion || isExpanded) && (
          <div className="px-4 pb-4">
            {renderSectionContent()}
          </div>
        )}
      </div>
    );
  };

  // Render filters
  const renderFilters = () => {
    if (!zones.filters?.enabled) return null;

    return (
      <div className="overflow-y-auto">
        {zones.filters.sections?.map(section => renderFilterSection(section))}
      </div>
    );
  };

  // Render quick links
  const renderQuickLinks = () => {
    if (!zones.quickLinks?.enabled) return null;

    return (
      <div className="p-4 border-t" style={{ borderColor: settings.colors.border }}>
        <h3 className="font-semibold mb-3">{zones.quickLinks.title || 'Quick Links'}</h3>
        <div className="space-y-2">
          {quickLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <span className="text-sm">{link.label}</span>
              {link.badge && (
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    );
  };

  // Render promotion
  const renderPromotion = () => {
    if (!zones.promotion?.enabled) return null;

    return (
      <div 
        className="m-4 p-4 rounded-lg"
        style={{
          backgroundColor: zones.promotion.backgroundColor,
          color: zones.promotion.textColor,
          borderRadius: settings.borderRadius === 'none' ? '0' : 
                       settings.borderRadius === 'sm' ? '0.25rem' : 
                       settings.borderRadius === 'md' ? '0.5rem' : '0.75rem',
        }}
      >
        {zones.promotion.imageUrl && (
          <img
            src={zones.promotion.imageUrl}
            alt={zones.promotion.title || 'Promotion'}
            className="w-full h-32 object-cover rounded mb-3"
          />
        )}
        <h3 className="font-bold mb-2">{zones.promotion.title}</h3>
        <p className="text-sm mb-3 opacity-80">{zones.promotion.description}</p>
        {zones.promotion.linkText && zones.promotion.linkUrl && (
          <a
            href={zones.promotion.linkUrl}
            className="inline-block px-4 py-2 bg-white text-black rounded font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {zones.promotion.linkText}
          </a>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <>
      {renderHeader()}
      {renderFilters()}
      {renderQuickLinks()}
      {renderPromotion()}
    </>
  );

  // Mobile: render as drawer
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />

        {/* Drawer */}
        <div
          className={cn(
            'fixed top-0 h-full w-80 shadow-xl z-50 overflow-hidden flex flex-col',
            zones.filters?.position === 'right' ? 'right-0' : 'left-0'
          )}
          style={{ backgroundColor: settings.colors.background }}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  // Desktop: render as regular sidebar
  return (
    <aside
      className={cn(
        'w-64 flex-shrink-0 overflow-hidden flex flex-col',
        zones.filters?.sticky && 'sticky top-20'
      )}
      style={{ 
        backgroundColor: settings.colors.background,
        maxHeight: zones.filters?.sticky ? 'calc(100vh - 5rem)' : undefined,
      }}
    >
      {sidebarContent}
    </aside>
  );
}

/**
 * Default sidebar template
 */
function getDefaultSidebarTemplate(): SidebarTemplate {
  return {
    id: 'default',
    templateName: 'Default Sidebar',
    category: 'minimal',
    zones: {
      header: {
        enabled: true,
        title: 'Filters',
        showCloseButton: true,
        backgroundColor: '#ffffff',
        sticky: true,
      },
      filters: {
        enabled: true,
        style: 'accordion',
        position: 'left',
        sticky: true,
        collapsible: true,
        sections: [
          { id: 'categories', title: 'Categories', type: 'categories', expanded: true },
          { id: 'price', title: 'Price Range', type: 'price', expanded: true },
          { id: 'brands', title: 'Brands', type: 'brands', expanded: false },
          { id: 'colors', title: 'Colors', type: 'colors', expanded: false },
          { id: 'sizes', title: 'Sizes', type: 'sizes', expanded: false },
        ],
      },
      quickLinks: {
        enabled: true,
        title: 'Quick Links',
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
      borderRadius: 'md',
      breakpoint: 'md',
    },
  };
}
