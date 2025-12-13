import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind Transformation Utilities
 * Converts template configuration values to actual Tailwind CSS classes
 */

// Color mappings (converts hex/named colors to Tailwind classes)
const COLOR_TO_TAILWIND: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  // Blues
  '#3b82f6': { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', hover: 'hover:bg-blue-600' },
  '#2563eb': { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600', hover: 'hover:bg-blue-700' },
  '#1d4ed8': { bg: 'bg-blue-700', text: 'text-blue-700', border: 'border-blue-700', hover: 'hover:bg-blue-800' },
  
  // Greens
  '#10b981': { bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500', hover: 'hover:bg-emerald-600' },
  '#059669': { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600', hover: 'hover:bg-emerald-700' },
  
  // Purples
  '#8b5cf6': { bg: 'bg-violet-500', text: 'text-violet-500', border: 'border-violet-500', hover: 'hover:bg-violet-600' },
  '#7c3aed': { bg: 'bg-violet-600', text: 'text-violet-600', border: 'border-violet-600', hover: 'hover:bg-violet-700' },
  
  // Reds
  '#ef4444': { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', hover: 'hover:bg-red-600' },
  '#dc2626': { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600', hover: 'hover:bg-red-700' },
  
  // Oranges
  '#f97316': { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500', hover: 'hover:bg-orange-600' },
  '#ea580c': { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-600', hover: 'hover:bg-orange-700' },
  
  // Grays
  '#6b7280': { bg: 'bg-gray-500', text: 'text-gray-500', border: 'border-gray-500', hover: 'hover:bg-gray-600' },
  '#4b5563': { bg: 'bg-gray-600', text: 'text-gray-600', border: 'border-gray-600', hover: 'hover:bg-gray-700' },
  
  // Blacks
  '#000000': { bg: 'bg-black', text: 'text-black', border: 'border-black', hover: 'hover:bg-gray-900' },
  '#111827': { bg: 'bg-gray-900', text: 'text-gray-900', border: 'border-gray-900', hover: 'hover:bg-gray-800' },
};

// Spacing mappings
const SPACING_TO_TAILWIND: Record<string, { gap: string; padding: string; margin: string }> = {
  compact: { gap: 'gap-2', padding: 'p-3', margin: 'm-2' },
  normal: { gap: 'gap-4', padding: 'p-4', margin: 'm-4' },
  relaxed: { gap: 'gap-6', padding: 'p-6', margin: 'm-6' },
};

// Border radius mappings
const BORDER_RADIUS_TO_TAILWIND: Record<string, string> = {
  none: 'rounded-none',
  small: 'rounded-sm',
  medium: 'rounded-md',
  large: 'rounded-lg',
};

// Animation mappings
const ANIMATION_TO_TAILWIND: Record<string, string> = {
  fade: 'transition-opacity duration-300',
  slide: 'transition-transform duration-300',
  none: '',
};

/**
 * Convert hex color to Tailwind class
 */
export function colorToTailwind(color: string, type: 'bg' | 'text' | 'border' | 'hover' = 'bg'): string {
  const mapping = COLOR_TO_TAILWIND[color.toLowerCase()];
  if (mapping) {
    return mapping[type];
  }
  
  // Fallback: use inline style (though not recommended)
  console.warn(`[Tailwind Mapper] No Tailwind mapping for color: ${color}`);
  return '';
}

/**
 * Convert spacing config to Tailwind classes
 */
export function spacingToTailwind(spacing: 'compact' | 'normal' | 'relaxed', type: 'gap' | 'padding' | 'margin' = 'gap'): string {
  const mapping = SPACING_TO_TAILWIND[spacing];
  return mapping ? mapping[type] : SPACING_TO_TAILWIND.normal[type];
}

/**
 * Convert border radius to Tailwind class
 */
export function borderRadiusToTailwind(radius: 'none' | 'small' | 'medium' | 'large'): string {
  return BORDER_RADIUS_TO_TAILWIND[radius] || BORDER_RADIUS_TO_TAILWIND.medium;
}

/**
 * Convert animation type to Tailwind classes
 */
export function animationToTailwind(animation: 'fade' | 'slide' | 'none'): string {
  return ANIMATION_TO_TAILWIND[animation] || '';
}

/**
 * Get grid column classes based on column count
 */
export function gridColumnsToTailwind(columns: number): string {
  const mapping: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  return mapping[columns] || mapping[3];
}

/**
 * Get aspect ratio classes
 */
export function aspectRatioToTailwind(ratio: '1:1' | '4:3' | '16:9'): string {
  const mapping: Record<string, string> = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
  };
  
  return mapping[ratio] || mapping['1:1'];
}

/**
 * Get button classes based on template settings
 */
export function getButtonClasses(settings: {
  colors?: { primary?: string; secondary?: string };
  spacing?: 'compact' | 'normal' | 'relaxed';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
}, variant: 'primary' | 'secondary' = 'primary'): string {
  const color = variant === 'primary' ? settings.colors?.primary : settings.colors?.secondary;
  const bgClass = color ? colorToTailwind(color, 'bg') : 'bg-blue-600';
  const hoverClass = color ? colorToTailwind(color, 'hover') : 'hover:bg-blue-700';
  const paddingClass = settings.spacing ? spacingToTailwind(settings.spacing, 'padding') : 'p-4';
  const radiusClass = settings.borderRadius ? borderRadiusToTailwind(settings.borderRadius) : 'rounded-md';
  
  return cn(
    bgClass,
    hoverClass,
    paddingClass,
    radiusClass,
    'text-white font-semibold transition-colors'
  );
}

/**
 * Get card classes based on template settings
 */
export function getCardClasses(settings: {
  spacing?: 'compact' | 'normal' | 'relaxed';
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
}): string {
  const paddingClass = settings.spacing ? spacingToTailwind(settings.spacing, 'padding') : 'p-4';
  const radiusClass = settings.borderRadius ? borderRadiusToTailwind(settings.borderRadius) : 'rounded-lg';
  
  return cn(
    paddingClass,
    radiusClass,
    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
  );
}

/**
 * Get container classes based on template settings
 */
export function getContainerClasses(settings: {
  spacing?: 'compact' | 'normal' | 'relaxed';
}): string {
  const gapClass = settings.spacing ? spacingToTailwind(settings.spacing, 'gap') : 'gap-4';
  
  return cn('container mx-auto px-4', gapClass);
}

/**
 * Merge Tailwind classes (handles conflicts)
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Get inline styles for custom colors (fallback when no Tailwind mapping)
 */
export function getInlineColorStyles(color: string): React.CSSProperties {
  if (!COLOR_TO_TAILWIND[color.toLowerCase()]) {
    return {
      backgroundColor: color,
    };
  }
  return {};
}

/**
 * Convert template settings to CSS variables (for advanced customization)
 */
export function settingsToCSSVariables(settings: {
  colors?: { primary?: string; secondary?: string; accent?: string };
}): Record<string, string> {
  const vars: Record<string, string> = {};
  
  if (settings.colors?.primary) {
    vars['--color-primary'] = settings.colors.primary;
  }
  if (settings.colors?.secondary) {
    vars['--color-secondary'] = settings.colors.secondary;
  }
  if (settings.colors?.accent) {
    vars['--color-accent'] = settings.colors.accent;
  }
  
  return vars;
}

/**
 * Get hover effect classes
 */
export function getHoverEffectClasses(effect: 'lift' | 'zoom' | 'fade' | 'none'): string {
  const effects: Record<string, string> = {
    lift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200',
    zoom: 'hover:scale-105 transition-transform duration-200',
    fade: 'hover:opacity-80 transition-opacity duration-200',
    none: '',
  };
  
  return effects[effect] || '';
}

/**
 * Get responsive layout classes
 */
export function getResponsiveLayoutClasses(layout: 'single-column' | 'two-column' | 'multi-column'): string {
  const layouts: Record<string, string> = {
    'single-column': 'grid grid-cols-1',
    'two-column': 'grid grid-cols-1 lg:grid-cols-2 gap-8',
    'multi-column': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  };
  
  return layouts[layout] || layouts['single-column'];
}
