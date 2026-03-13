/**
 * React Hooks for Theme Token Resolution
 * 
 * Hooks for easily using theme tokens in React components
 */

'use client';

import { useCallback, useMemo } from 'react';
import { resolveColor, resolveColors, isTokenPath } from './token-utils';

/**
 * Hook for resolving color values in components
 * Returns a memoized function that resolves token paths to CSS variables
 * 
 * @returns Function to resolve color values
 * 
 * @example
 * function MyComponent({ color }) {
 *   const resolveThemeColor = useThemeColor();
 *   const resolvedColor = resolveThemeColor(color);
 *   return <div style={{ color: resolvedColor }}>Text</div>;
 * }
 */
export function useThemeColor() {
  return useCallback((colorValue: string | undefined) => {
    return resolveColor(colorValue);
  }, []);
}

/**
 * Hook for resolving multiple color values at once
 * 
 * @param colors - Object with color properties
 * @returns Object with resolved colors
 * 
 * @example
 * function MyComponent({ bg, text, border }) {
 *   const colors = useResolvedColors({ bg, text, border });
 *   return <div style={colors}>Content</div>;
 * }
 */
export function useResolvedColors<T extends Record<string, any>>(colors: T): T {
  return useMemo(() => resolveColors(colors), [colors]);
}

/**
 * Hook to check if a value is a token path
 * 
 * @param value - String to check
 * @returns True if it's a token path
 * 
 * @example
 * const isToken = useIsTokenPath(props.color);
 */
export function useIsTokenPath(value: string | undefined): boolean {
  return useMemo(() => isTokenPath(value), [value]);
}

/**
 * Hook for building style objects with resolved colors
 * 
 * @param styleProps - Style properties that may contain token paths
 * @returns Resolved style object
 * 
 * @example
 * const style = useResolvedStyle({
 *   color: "text.primary",
 *   backgroundColor: "ui.surface",
 *   borderColor: "#ccc"
 * });
 */
export function useResolvedStyle(
  styleProps: Record<string, any>
): Record<string, any> {
  return useMemo(() => {
    const resolved: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(styleProps)) {
      // Resolve color-related properties
      if (
        typeof value === 'string' &&
        (key.toLowerCase().includes('color') || key.toLowerCase().includes('background'))
      ) {
        resolved[key] = resolveColor(value);
      } else {
        resolved[key] = value;
      }
    }
    
    return resolved;
  }, [styleProps]);
}
