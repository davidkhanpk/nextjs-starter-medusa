'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { StoreTheme } from './types';
import { defaultTheme } from './types';

interface ThemeContextValue {
  theme: StoreTheme;
  loading: boolean;
  error: string | null;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<StoreTheme>(defaultTheme);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    // Fetch theme configuration from API
    fetch('/api/theme')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load theme');
        return res.json();
      })
      .then((data) => {
        const loadedTheme = data.theme || defaultTheme;
        setTheme(loadedTheme);
        applyTheme(loadedTheme);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load theme:', err);
        setError(err.message);
        // Fall back to default theme
        applyTheme(defaultTheme);
        setLoading(false);
      });
  }, [isHydrated]);

  return (
    <ThemeContext.Provider value={{ theme, loading, error }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

/**
 * Apply theme to document as CSS custom properties
 * Only runs on client-side after hydration
 */
function applyTheme(theme: StoreTheme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Apply colors
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-primary-hover', theme.colors.primaryHover);
  root.style.setProperty('--color-primary-text', theme.colors.primaryText);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-secondary-hover', theme.colors.secondaryHover);
  root.style.setProperty('--color-secondary-text', theme.colors.secondaryText);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-text-primary', theme.colors.textPrimary);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--color-text-muted', theme.colors.textMuted);
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--color-border-hover', theme.colors.borderHover);
  root.style.setProperty('--color-success', theme.colors.success);
  root.style.setProperty('--color-error', theme.colors.error);
  root.style.setProperty('--color-warning', theme.colors.warning);
  root.style.setProperty('--color-info', theme.colors.info);

  // Apply typography
  root.style.setProperty('--font-heading', theme.typography.fontFamily.heading);
  root.style.setProperty('--font-body', theme.typography.fontFamily.body);
  root.style.setProperty('--font-size-xs', theme.typography.fontSize.xs);
  root.style.setProperty('--font-size-sm', theme.typography.fontSize.sm);
  root.style.setProperty('--font-size-base', theme.typography.fontSize.base);
  root.style.setProperty('--font-size-lg', theme.typography.fontSize.lg);
  root.style.setProperty('--font-size-xl', theme.typography.fontSize.xl);
  root.style.setProperty('--font-size-2xl', theme.typography.fontSize['2xl']);
  root.style.setProperty('--font-size-3xl', theme.typography.fontSize['3xl']);
  root.style.setProperty('--font-size-4xl', theme.typography.fontSize['4xl']);
  root.style.setProperty('--font-weight-normal', theme.typography.fontWeight.normal.toString());
  root.style.setProperty('--font-weight-medium', theme.typography.fontWeight.medium.toString());
  root.style.setProperty('--font-weight-semibold', theme.typography.fontWeight.semibold.toString());
  root.style.setProperty('--font-weight-bold', theme.typography.fontWeight.bold.toString());

  // Apply layout
  root.style.setProperty('--container-width', theme.layout.containerWidth);
  root.style.setProperty('--border-radius-sm', theme.layout.borderRadius.sm);
  root.style.setProperty('--border-radius-md', theme.layout.borderRadius.md);
  root.style.setProperty('--border-radius-lg', theme.layout.borderRadius.lg);
  root.style.setProperty('--border-radius-full', theme.layout.borderRadius.full);
  root.style.setProperty('--spacing-xs', theme.layout.spacing.xs);
  root.style.setProperty('--spacing-sm', theme.layout.spacing.sm);
  root.style.setProperty('--spacing-md', theme.layout.spacing.md);
  root.style.setProperty('--spacing-lg', theme.layout.spacing.lg);
  root.style.setProperty('--spacing-xl', theme.layout.spacing.xl);

  // Apply custom CSS if provided (use data attribute to mark it)
  if (theme.advanced?.customCSS) {
    let customStyleEl = document.getElementById('custom-theme-css');
    if (!customStyleEl) {
      customStyleEl = document.createElement('style');
      customStyleEl.id = 'custom-theme-css';
      customStyleEl.setAttribute('data-theme', 'custom');
      document.head.appendChild(customStyleEl);
    }
    customStyleEl.textContent = theme.advanced.customCSS;
  }
}
