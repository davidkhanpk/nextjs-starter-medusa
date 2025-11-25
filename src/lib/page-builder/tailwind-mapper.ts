/**
 * Tailwind CSS Class Mapping System
 * 
 * Maps semantic configuration values to actual Tailwind CSS classes.
 * This allows us to store human-readable values in the database
 * and translate them to Tailwind classes at render time.
 */

export interface TailwindMappings {
  spacing: Record<string, string>;
  colors: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  borderRadius: Record<string, string>;
  borderWidth: Record<string, string>;
  shadow: Record<string, string>;
  width: Record<string, string>;
  height: Record<string, string>;
  gap: Record<string, string>;
  textAlign: Record<string, string>;
  justifyContent: Record<string, string>;
  alignItems: Record<string, string>;
  gridCols: Record<string, string>;
  aspectRatio: Record<string, string>;
}

/**
 * Complete mapping of semantic values to Tailwind classes
 */
export const TAILWIND_MAPPINGS: TailwindMappings = {
  // Spacing (padding, margin)
  spacing: {
    none: '0',
    xs: '1',      // 0.25rem / 4px
    sm: '2',      // 0.5rem / 8px
    md: '4',      // 1rem / 16px
    lg: '6',      // 1.5rem / 24px
    xl: '8',      // 2rem / 32px
    '2xl': '12',  // 3rem / 48px
    '3xl': '16',  // 4rem / 64px
    '4xl': '24',  // 6rem / 96px
  },

  // Colors
  colors: {
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent',
    background: 'background',
    text: 'text',
    muted: 'muted',
    border: 'border',
    white: 'white',
    black: 'black',
    gray: 'gray-500',
    'gray-light': 'gray-300',
    'gray-dark': 'gray-700',
    transparent: 'transparent',
  },

  // Font sizes
  fontSize: {
    xs: 'text-xs',       // 0.75rem / 12px
    sm: 'text-sm',       // 0.875rem / 14px
    base: 'text-base',   // 1rem / 16px
    lg: 'text-lg',       // 1.125rem / 18px
    xl: 'text-xl',       // 1.25rem / 20px
    '2xl': 'text-2xl',   // 1.5rem / 24px
    '3xl': 'text-3xl',   // 1.875rem / 30px
    '4xl': 'text-4xl',   // 2.25rem / 36px
    '5xl': 'text-5xl',   // 3rem / 48px
    '6xl': 'text-6xl',   // 3.75rem / 60px
  },

  // Font weights
  fontWeight: {
    thin: 'font-thin',         // 100
    light: 'font-light',       // 300
    normal: 'font-normal',     // 400
    medium: 'font-medium',     // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',         // 700
    extrabold: 'font-extrabold', // 800
  },

  // Border radius
  borderRadius: {
    none: 'rounded-none',
    sm: 'rounded-sm',     // 0.125rem / 2px
    md: 'rounded',        // 0.25rem / 4px
    lg: 'rounded-lg',     // 0.5rem / 8px
    xl: 'rounded-xl',     // 0.75rem / 12px
    '2xl': 'rounded-2xl', // 1rem / 16px
    '3xl': 'rounded-3xl', // 1.5rem / 24px
    full: 'rounded-full', // 9999px
  },

  // Border width
  borderWidth: {
    none: 'border-0',
    thin: 'border',       // 1px
    medium: 'border-2',   // 2px
    thick: 'border-4',    // 4px
  },

  // Shadows
  shadow: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner',
  },

  // Width
  width: {
    auto: 'w-auto',
    full: 'w-full',
    screen: 'w-screen',
    min: 'w-min',
    max: 'w-max',
    fit: 'w-fit',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '2/3': 'w-2/3',
    '1/4': 'w-1/4',
    '3/4': 'w-3/4',
  },

  // Height
  height: {
    auto: 'h-auto',
    full: 'h-full',
    screen: 'h-screen',
    min: 'h-min',
    max: 'h-max',
    fit: 'h-fit',
  },

  // Gap (for flexbox/grid)
  gap: {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12',
  },

  // Text alignment
  textAlign: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  },

  // Justify content
  justifyContent: {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  },

  // Align items
  alignItems: {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  },

  // Grid columns
  gridCols: {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
    '5': 'grid-cols-5',
    '6': 'grid-cols-6',
    '12': 'grid-cols-12',
  },

  // Aspect ratio
  aspectRatio: {
    square: 'aspect-square',    // 1:1
    video: 'aspect-video',      // 16:9
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
  },
};

/**
 * Interface for style configuration from database
 */
export interface StyleConfig {
  padding?: string;
  paddingX?: string;
  paddingY?: string;
  margin?: string;
  marginX?: string;
  marginY?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  borderWidth?: string;
  shadow?: string;
  width?: string;
  height?: string;
  gap?: string;
  textAlign?: string;
  justifyContent?: string;
  alignItems?: string;
  gridCols?: string;
  aspectRatio?: string;
  customClasses?: string; // Allow custom Tailwind classes
}

/**
 * Build Tailwind CSS classes from semantic configuration
 * 
 * @param config - Style configuration object with semantic values
 * @returns String of space-separated Tailwind CSS classes
 */
export function buildTailwindClasses(config: StyleConfig): string {
  const classes: string[] = [];

  // Padding
  if (config.padding) {
    const value = TAILWIND_MAPPINGS.spacing[config.padding];
    if (value) classes.push(`p-${value}`);
  }
  if (config.paddingX) {
    const value = TAILWIND_MAPPINGS.spacing[config.paddingX];
    if (value) classes.push(`px-${value}`);
  }
  if (config.paddingY) {
    const value = TAILWIND_MAPPINGS.spacing[config.paddingY];
    if (value) classes.push(`py-${value}`);
  }

  // Margin
  if (config.margin) {
    const value = TAILWIND_MAPPINGS.spacing[config.margin];
    if (value) classes.push(`m-${value}`);
  }
  if (config.marginX) {
    const value = TAILWIND_MAPPINGS.spacing[config.marginX];
    if (value) classes.push(`mx-${value}`);
  }
  if (config.marginY) {
    const value = TAILWIND_MAPPINGS.spacing[config.marginY];
    if (value) classes.push(`my-${value}`);
  }

  // Background color
  if (config.backgroundColor) {
    const color = TAILWIND_MAPPINGS.colors[config.backgroundColor];
    if (color) classes.push(`bg-${color}`);
  }

  // Text color
  if (config.textColor) {
    const color = TAILWIND_MAPPINGS.colors[config.textColor];
    if (color) classes.push(`text-${color}`);
  }

  // Border color
  if (config.borderColor) {
    const color = TAILWIND_MAPPINGS.colors[config.borderColor];
    if (color) classes.push(`border-${color}`);
  }

  // Font size
  if (config.fontSize) {
    const fontSize = TAILWIND_MAPPINGS.fontSize[config.fontSize];
    if (fontSize) classes.push(fontSize);
  }

  // Font weight
  if (config.fontWeight) {
    const fontWeight = TAILWIND_MAPPINGS.fontWeight[config.fontWeight];
    if (fontWeight) classes.push(fontWeight);
  }

  // Border radius
  if (config.borderRadius) {
    const radius = TAILWIND_MAPPINGS.borderRadius[config.borderRadius];
    if (radius) classes.push(radius);
  }

  // Border width
  if (config.borderWidth) {
    const width = TAILWIND_MAPPINGS.borderWidth[config.borderWidth];
    if (width) classes.push(width);
  }

  // Shadow
  if (config.shadow) {
    const shadow = TAILWIND_MAPPINGS.shadow[config.shadow];
    if (shadow) classes.push(shadow);
  }

  // Width
  if (config.width) {
    const width = TAILWIND_MAPPINGS.width[config.width];
    if (width) classes.push(width);
  }

  // Height
  if (config.height) {
    const height = TAILWIND_MAPPINGS.height[config.height];
    if (height) classes.push(height);
  }

  // Gap
  if (config.gap) {
    const gap = TAILWIND_MAPPINGS.gap[config.gap];
    if (gap) classes.push(gap);
  }

  // Text align
  if (config.textAlign) {
    const align = TAILWIND_MAPPINGS.textAlign[config.textAlign];
    if (align) classes.push(align);
  }

  // Justify content
  if (config.justifyContent) {
    const justify = TAILWIND_MAPPINGS.justifyContent[config.justifyContent];
    if (justify) classes.push(justify);
  }

  // Align items
  if (config.alignItems) {
    const align = TAILWIND_MAPPINGS.alignItems[config.alignItems];
    if (align) classes.push(align);
  }

  // Grid columns
  if (config.gridCols) {
    const cols = TAILWIND_MAPPINGS.gridCols[config.gridCols];
    if (cols) classes.push(cols);
  }

  // Aspect ratio
  if (config.aspectRatio) {
    const ratio = TAILWIND_MAPPINGS.aspectRatio[config.aspectRatio];
    if (ratio) classes.push(ratio);
  }

  // Custom classes (for advanced users or edge cases)
  if (config.customClasses) {
    classes.push(config.customClasses);
  }

  return classes.join(' ');
}

/**
 * Build responsive Tailwind classes with breakpoint prefixes
 * 
 * @param config - Object with breakpoint keys (base, sm, md, lg, xl)
 * @returns String of responsive Tailwind classes
 */
export function buildResponsiveClasses(config: {
  base?: StyleConfig;
  sm?: StyleConfig;
  md?: StyleConfig;
  lg?: StyleConfig;
  xl?: StyleConfig;
  '2xl'?: StyleConfig;
}): string {
  const classes: string[] = [];

  // Base (mobile-first)
  if (config.base) {
    classes.push(buildTailwindClasses(config.base));
  }

  // Responsive breakpoints
  const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
  for (const breakpoint of breakpoints) {
    if (config[breakpoint]) {
      const breakpointClasses = buildTailwindClasses(config[breakpoint]);
      const prefixed = breakpointClasses
        .split(' ')
        .map(cls => `${breakpoint}:${cls}`)
        .join(' ');
      classes.push(prefixed);
    }
  }

  return classes.join(' ');
}

/**
 * Example usage:
 * 
 * const config = {
 *   padding: 'md',
 *   backgroundColor: 'primary',
 *   textColor: 'white',
 *   fontSize: 'lg',
 *   borderRadius: 'lg',
 * };
 * 
 * const classes = buildTailwindClasses(config);
 * // Result: "p-4 bg-primary text-white text-lg rounded-lg"
 * 
 * const responsiveConfig = {
 *   base: { fontSize: 'sm', padding: 'sm' },
 *   md: { fontSize: 'lg', padding: 'md' },
 *   lg: { fontSize: 'xl', padding: 'lg' },
 * };
 * 
 * const responsiveClasses = buildResponsiveClasses(responsiveConfig);
 * // Result: "text-sm p-2 md:text-lg md:p-4 lg:text-xl lg:p-6"
 */
