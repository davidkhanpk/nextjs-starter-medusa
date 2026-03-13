/**
 * Theme Token Resolution Utilities
 * 
 * Utilities for resolving semantic token paths to CSS variables
 */

import { TokenStructure } from './validation';

/**
 * Resolves a color value to CSS
 * Handles both token paths (e.g., "brand.primary") and hex colors (e.g., "#000000")
 * 
 * @param colorValue - Token path like "brand.primary" or hex color like "#000000"
 * @returns CSS color value (CSS variable or hex color)
 * 
 * @example
 * resolveColor("brand.primary") // "var(--theme-brand-primary)"
 * resolveColor("#ff0000") // "#ff0000"
 * resolveColor(undefined) // undefined
 */
export function resolveColor(colorValue: string | undefined): string | undefined {
  if (!colorValue) return undefined;
  
  // If it's a hex color (starts with #), return as-is
  if (colorValue.startsWith('#')) {
    return colorValue;
  }
  
  // If it's an rgb/rgba color, return as-is
  if (colorValue.startsWith('rgb')) {
    return colorValue;
  }
  
  // If it contains a dot, treat it as a token path
  if (colorValue.includes('.')) {
    // Convert "brand.primary" to "var(--theme-brand-primary)"
    const cssVarName = colorValue.replace(/\./g, '-');
    return `var(--theme-${cssVarName})`;
  }
  
  // Unknown format, return as-is
  return colorValue;
}

/**
 * Resolves multiple color values in an object
 * Useful for resolving all colors in component props at once
 * 
 * @param obj - Object with color properties
 * @returns Object with resolved color values
 * 
 * @example
 * resolveColors({ bg: "brand.primary", text: "#fff" })
 * // { bg: "var(--theme-brand-primary)", text: "#fff" }
 */
export function resolveColors<T extends Record<string, any>>(obj: T): T {
  const resolved = { ...obj } as any;
  
  for (const [key, value] of Object.entries(resolved)) {
    if (typeof value === 'string') {
      resolved[key] = resolveColor(value);
    }
  }
  
  return resolved;
}

/**
 * Converts theme tokens to CSS custom properties
 * @param tokens - Token structure from theme
 * @returns Object mapping CSS variable names to color values
 * 
 * @example
 * tokensToCSSVars(tokens)
 * // { "--theme-brand-primary": "#000000", ... }
 */
export function tokensToCSSVars(tokens: TokenStructure | any): Record<string, string> {
  const cssVars: Record<string, string> = {};
  
  function traverse(obj: any, prefix: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'string' && value.startsWith('#')) {
        // It's a color value, add as CSS variable
        cssVars[`--theme-${varName}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        // It's a nested object, traverse deeper
        traverse(value, varName);
      }
    }
  }
  
  traverse(tokens);
  return cssVars;
}

/**
 * Generates CSS string from tokens
 * @param tokens - Token structure
 * @returns CSS string for style injection
 * 
 * @example
 * generateThemeCSS(tokens)
 * // ":root { --theme-brand-primary: #000000; ... }"
 */
export function generateThemeCSS(tokens: TokenStructure | any): string {
  const cssVars = tokensToCSSVars(tokens);
  
  const cssEntries = Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  
  return `:root {\n${cssEntries}\n}`;
}

/**
 * Resolves a token path to its actual color value from token structure
 * This is primarily for server-side or debugging purposes
 * 
 * @param path - Token path like "brand.primary"
 * @param tokens - Token structure
 * @returns Hex color value or undefined
 * 
 * @example
 * resolveTokenPath("brand.primary", tokens) // "#000000"
 */
export function resolveTokenPath(path: string, tokens: any): string | undefined {
  if (!path || !tokens) return undefined;
  
  const parts = path.split('.');
  let current = tokens;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      return undefined;
    }
    current = current[part];
  }
  
  return typeof current === 'string' ? current : undefined;
}

/**
 * Checks if a value is a token path
 * @param value - String to check
 * @returns True if it's a token path
 */
export function isTokenPath(value: string | undefined): boolean {
  if (!value) return false;
  return value.includes('.') && !value.startsWith('#') && !value.startsWith('rgb');
}

/**
 * Gets all available token paths from token structure
 * Useful for debugging or building token pickers
 * 
 * @param tokens - Token structure
 * @returns Array of token paths
 * 
 * @example
 * getAllTokenPaths(tokens)
 * // ["brand.primary", "brand.secondary", "text.primary", ...]
 */
export function getAllTokenPaths(tokens: any): string[] {
  const paths: string[] = [];
  
  function traverse(obj: any, prefix: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        paths.push(path);
      } else if (typeof value === 'object' && value !== null) {
        traverse(value, path);
      }
    }
  }
  
  traverse(tokens);
  return paths;
}
