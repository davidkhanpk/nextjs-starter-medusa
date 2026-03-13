/**
 * Server-safe theme CSS generator
 * 
 * Extracted from ThemeInjector.tsx so it can be called from server components.
 * ThemeInjector.tsx has 'use client' which makes all its exports client-only.
 */

import { tokensToCSSVars } from './token-utils';
import { getValidatedTokens } from './validation';

/**
 * Generate theme CSS custom properties string for SSR injection.
 * This is a pure function with no React/browser dependencies.
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
