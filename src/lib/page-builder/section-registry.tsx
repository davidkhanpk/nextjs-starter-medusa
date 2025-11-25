/**
 * Section Registry
 * 
 * Maps section types to their React components and provides
 * rendering utilities for the dynamic page builder system.
 */

import dynamic from 'next/dynamic';
import { PageSection } from './types';
import { buildTailwindClasses } from './tailwind-mapper';

// Lazy load section components for better performance
const Hero = dynamic(() => import('@modules/page-builder/sections/hero'));
const CategoryProducts = dynamic(() => import('@modules/page-builder/sections/category-products'));
const CategoriesGrid = dynamic(() => import('@modules/page-builder/sections/categories-grid'));
const Collections = dynamic(() => import('@modules/page-builder/sections/collections'));
const Banner = dynamic(() => import('@modules/page-builder/sections/banner'));
const Testimonials = dynamic(() => import('@modules/page-builder/sections/testimonials'));
const Newsletter = dynamic(() => import('@modules/page-builder/sections/newsletter'));
const CustomHTML = dynamic(() => import('@modules/page-builder/sections/custom-html'));

/**
 * Registry of all available section components
 */
export const SECTION_REGISTRY = {
  'hero': Hero,
  'category-products': CategoryProducts,
  'categories-grid': CategoriesGrid,
  'collections': Collections,
  'banner': Banner,
  'testimonials': Testimonials,
  'newsletter': Newsletter,
  'custom-html': CustomHTML,
} as const;

/**
 * Get the React component for a section type
 */
export function getSectionComponent(type: PageSection['type']) {
  const Component = SECTION_REGISTRY[type];
  
  if (!Component) {
    console.warn(`Section component not found for type: ${type}`);
    return null;
  }
  
  return Component;
}

/**
 * Check if a section type is registered
 */
export function isSectionRegistered(type: string): type is keyof typeof SECTION_REGISTRY {
  return type in SECTION_REGISTRY;
}

/**
 * Get all registered section types
 */
export function getRegisteredSectionTypes(): string[] {
  return Object.keys(SECTION_REGISTRY);
}

/**
 * Section metadata for UI display
 */
export interface SectionMetadata {
  type: string;
  name: string;
  description: string;
  icon: string;
  category: 'content' | 'product' | 'marketing' | 'custom';
  thumbnail?: string;
}

/**
 * Metadata for each section type (for dashboard UI)
 */
export const SECTION_METADATA: Record<string, SectionMetadata> = {
  'hero': {
    type: 'hero',
    name: 'Hero Section',
    description: 'Large banner with text and call-to-action buttons',
    icon: '🎯',
    category: 'content',
  },
  'category-products': {
    type: 'category-products',
    name: 'Category Products',
    description: 'Display products from a specific category',
    icon: '🏷️',
    category: 'product',
  },
  'categories-grid': {
    type: 'categories-grid',
    name: 'Categories Grid',
    description: 'Grid or carousel of category cards',
    icon: '📦',
    category: 'product',
  },
  'collections': {
    type: 'collections',
    name: 'Collections',
    description: 'Showcase product collections',
    icon: '📚',
    category: 'product',
  },
  'banner': {
    type: 'banner',
    name: 'Banner',
    description: 'Image banner with optional link',
    icon: '🖼️',
    category: 'content',
  },
  'testimonials': {
    type: 'testimonials',
    name: 'Testimonials',
    description: 'Customer reviews and testimonials',
    icon: '⭐',
    category: 'marketing',
  },
  'newsletter': {
    type: 'newsletter',
    name: 'Newsletter',
    description: 'Email subscription form',
    icon: '📧',
    category: 'marketing',
  },
  'custom-html': {
    type: 'custom-html',
    name: 'Custom HTML',
    description: 'Custom HTML, CSS, and JavaScript',
    icon: '💻',
    category: 'custom',
  },
};

/**
 * Get section metadata by type
 */
export function getSectionMetadata(type: string): SectionMetadata | null {
  return SECTION_METADATA[type] || null;
}

/**
 * Get sections grouped by category
 */
export function getSectionsByCategory() {
  const categories: Record<string, SectionMetadata[]> = {
    content: [],
    product: [],
    marketing: [],
    custom: [],
  };

  Object.values(SECTION_METADATA).forEach(metadata => {
    categories[metadata.category].push(metadata);
  });

  return categories;
}
