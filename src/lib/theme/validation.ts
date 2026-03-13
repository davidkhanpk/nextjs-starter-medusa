/**
 * Theme Token Validation Utilities
 * 
 * Validates theme token structure and ensures all required tokens exist
 */

export interface TokenStructure {
  brand: {
    primary: string;
    secondary: string;
    accent: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  ui: {
    background: string;
    surface: string;
    border: string;
    overlay: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  tokens: Partial<TokenStructure>;
}

/**
 * Default theme tokens used as fallback
 */
export const DEFAULT_THEME_TOKENS: TokenStructure = {
  brand: {
    primary: '#000000',
    secondary: '#666666',
    accent: '#ff6b6b',
  },
  text: {
    primary: '#1a1a1a',
    secondary: '#4a4a4a',
    muted: '#8a8a8a',
    inverse: '#ffffff',
  },
  ui: {
    background: '#ffffff',
    surface: '#f5f5f5',
    border: '#e0e0e0',
    overlay: '#000000',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

/**
 * Validates if a string is a valid hex color
 */
function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validates theme token structure
 * @param theme - Theme object from API
 * @returns Validation result with errors and warnings
 */
export function validateTokens(theme: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check if theme exists
  if (!theme) {
    errors.push('Theme object is undefined or null');
    return {
      valid: false,
      errors,
      warnings,
      tokens: DEFAULT_THEME_TOKENS,
    };
  }

  // Get tokens from theme structure
  const tokens = theme?.globalSettings?.colors?.tokens;
  
  if (!tokens) {
    errors.push('Theme tokens not found in globalSettings.colors.tokens');
    return {
      valid: false,
      errors,
      warnings,
      tokens: DEFAULT_THEME_TOKENS,
    };
  }

  // Validate required categories
  const requiredCategories = ['brand', 'text', 'ui', 'status'] as const;
  const missingCategories: string[] = [];
  
  for (const category of requiredCategories) {
    if (!tokens[category] || typeof tokens[category] !== 'object') {
      missingCategories.push(category);
      errors.push(`Missing required token category: ${category}`);
    }
  }

  // If categories are missing, use defaults
  if (missingCategories.length > 0) {
    return {
      valid: false,
      errors,
      warnings,
      tokens: DEFAULT_THEME_TOKENS,
    };
  }

  // Validate individual tokens in each category
  const requiredTokens = {
    brand: ['primary', 'secondary', 'accent'],
    text: ['primary', 'secondary', 'muted', 'inverse'],
    ui: ['background', 'surface', 'border', 'overlay'],
    status: ['success', 'warning', 'error', 'info'],
  };

  for (const [category, tokenNames] of Object.entries(requiredTokens)) {
    for (const tokenName of tokenNames) {
      const tokenValue = tokens[category]?.[tokenName];
      
      if (!tokenValue) {
        warnings.push(`Missing token: ${category}.${tokenName}`);
        continue;
      }

      if (typeof tokenValue !== 'string') {
        warnings.push(`Token ${category}.${tokenName} is not a string: ${typeof tokenValue}`);
        continue;
      }

      if (!isValidHexColor(tokenValue)) {
        warnings.push(`Token ${category}.${tokenName} has invalid hex color: ${tokenValue}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    tokens: tokens as TokenStructure,
  };
}

/**
 * Gets validated tokens, falling back to defaults if validation fails
 * @param theme - Theme object from API
 * @returns Valid token structure
 */
export function getValidatedTokens(theme: any): TokenStructure {
  const result = validateTokens(theme);
  
  if (result.errors.length > 0) {
    console.error('[Theme] Validation errors:', result.errors);
  }
  
  if (result.warnings.length > 0) {
    console.warn('[Theme] Validation warnings:', result.warnings);
  }
  
  // Return validated tokens or defaults
  return result.valid ? (result.tokens as TokenStructure) : DEFAULT_THEME_TOKENS;
}
