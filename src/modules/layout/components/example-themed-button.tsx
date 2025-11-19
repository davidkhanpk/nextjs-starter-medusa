/**
 * Example: Themed Button Component
 * 
 * This demonstrates how to use theme-aware Tailwind classes
 * that automatically pick up theme values from the ThemeProvider
 */

import React from 'react';

interface ThemedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function ThemedButton({ children, variant = 'primary', onClick }: ThemedButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3
        font-heading
        text-theme-base
        rounded-theme-md
        transition-colors
        ${
          variant === 'primary'
            ? 'bg-primary hover:bg-primary-hover text-primary-text'
            : 'bg-secondary hover:bg-secondary-hover text-secondary-text'
        }
      `}
    >
      {children}
    </button>
  );
}

/**
 * Example: Themed Product Card
 */
export function ThemedProductCard({ product }: { product: any }) {
  return (
    <div 
      className="
        bg-white dark:bg-gray-800 
        rounded-theme-lg 
        p-theme-md 
        border border-gray-200 dark:border-gray-700
        hover:shadow-lg 
        transition-shadow
      "
    >
      <img 
        src={product.thumbnail} 
        alt={product.title}
        className="w-full aspect-square object-cover rounded-theme-sm mb-theme-sm"
      />
      
      <h3 className="font-heading text-theme-lg text-gray-900 dark:text-white mb-theme-xs">
        {product.title}
      </h3>
      
      <p className="font-body text-theme-sm text-gray-600 dark:text-gray-400 mb-theme-md">
        {product.description}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-theme-xl font-semibold text-primary">
          ${product.price}
        </span>
        
        <ThemedButton variant="primary">
          Add to Cart
        </ThemedButton>
      </div>
    </div>
  );
}

/**
 * How This Works:
 * 
 * 1. ThemeProvider (in layout.tsx) fetches theme from API
 * 2. ThemeProvider sets CSS variables on :root:
 *    --color-primary: #3b82f6
 *    --font-heading: 'Inter'
 *    --border-radius-md: 8px
 *    etc.
 * 
 * 3. Tailwind config (tailwind.config.js) maps these to classes:
 *    bg-primary → var(--color-primary)
 *    font-heading → var(--font-heading)
 *    rounded-theme-md → var(--border-radius-md)
 * 
 * 4. Components use Tailwind classes normally:
 *    className="bg-primary rounded-theme-md"
 * 
 * 5. Result: Components automatically use theme colors/fonts/spacing!
 */
