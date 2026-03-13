/**
 * ThemeInjector Component
 * 
 * Injects theme tokens as CSS custom properties into the document
 * This component handles both SSR and client-side theme injection
 */

'use client';

import { useEffect } from 'react';
import { tokensToCSSVars } from '@/lib/theme/token-utils';
import { getValidatedTokens } from '@/lib/theme/validation';

interface ThemeInjectorProps {
  theme: any;
}

/**
 * Client-side theme injector
 * Converts theme tokens to CSS variables and injects them into document head
 */
export function ThemeInjector({ theme }: ThemeInjectorProps) {
  useEffect(() => {
    if (!theme) {
      console.warn('[ThemeInjector] No theme provided');
      return;
    }

    try {
      // Validate and get tokens
      const tokens = getValidatedTokens(theme);
      
      // Convert tokens to CSS variables
      const cssVars = tokensToCSSVars(tokens);
      
      // Generate CSS string
      const cssString = `:root {\n${Object.entries(cssVars)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n')}\n}`;
      
      // Use the SAME ID as SSR to avoid hydration mismatch
      let styleEl = document.getElementById('theme-tokens-ssr');
      
      if (styleEl) {
        // Update existing SSR style element instead of removing/recreating
        if (styleEl.textContent !== cssString) {
          styleEl.textContent = cssString;
          console.log('[ThemeInjector] Theme tokens updated');
        }
      } else {
        // Create new style element only if SSR one doesn't exist
        styleEl = document.createElement('style');
        styleEl.id = 'theme-tokens-ssr';
        styleEl.textContent = cssString;
        document.head.appendChild(styleEl);
        console.log('[ThemeInjector] Theme tokens injected:', Object.keys(cssVars).length, 'variables');
      }
    } catch (error) {
      console.error('[ThemeInjector] Failed to inject theme:', error);
    }
  }, [theme]);
  
  // This component doesn't render anything
  return null;
}

/**
 * Server-side theme CSS generator
 * Use this to generate theme CSS for SSR in layout
 */
export function generateThemeStyleTag(theme: any): string {
  if (!theme) return '';
  
  try {
    const tokens = getValidatedTokens(theme);
    const cssVars = tokensToCSSVars(tokens);
    
    const cssString = `:root {
${Object.entries(cssVars)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')}
}`;
    
    return cssString;
  } catch (error) {
    console.error('[generateThemeStyleTag] Failed to generate theme CSS:', error);
    return '';
  }
}
