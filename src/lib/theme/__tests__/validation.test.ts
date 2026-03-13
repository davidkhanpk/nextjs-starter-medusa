/**
 * Unit tests for theme token validation
 */

import {
  validateTokens,
  getValidatedTokens,
  DEFAULT_THEME_TOKENS,
  TokenStructure,
} from '../validation';

describe('validateTokens', () => {
  it('should validate complete and correct theme', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: DEFAULT_THEME_TOKENS,
        },
      },
    };

    const result = validateTokens(theme);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.tokens).toEqual(DEFAULT_THEME_TOKENS);
  });

  it('should return errors for undefined theme', () => {
    const result = validateTokens(undefined);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Theme object is undefined or null');
    expect(result.tokens).toEqual(DEFAULT_THEME_TOKENS);
  });

  it('should return errors for missing tokens', () => {
    const theme = {
      globalSettings: {
        colors: {},
      },
    };

    const result = validateTokens(theme);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Theme tokens not found in globalSettings.colors.tokens');
  });

  it('should return errors for missing categories', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: {
            brand: {
              primary: '#000000',
            },
            // Missing text, ui, status
          },
        },
      },
    };

    const result = validateTokens(theme);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing required token category: text');
    expect(result.errors).toContain('Missing required token category: ui');
    expect(result.errors).toContain('Missing required token category: status');
  });

  it('should return warnings for missing individual tokens', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: {
            brand: {
              primary: '#000000',
              // Missing secondary, accent
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
          },
        },
      },
    };

    const result = validateTokens(theme);

    expect(result.valid).toBe(true); // Still valid, just warnings
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toContain('Missing token: brand.secondary');
    expect(result.warnings).toContain('Missing token: brand.accent');
  });

  it('should return warnings for invalid hex colors', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: {
            brand: {
              primary: 'not-a-color',
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
          },
        },
      },
    };

    const result = validateTokens(theme);

    expect(result.valid).toBe(true);
    expect(result.warnings).toContain('Token brand.primary has invalid hex color: not-a-color');
  });

  it('should handle token values that are not strings', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: {
            brand: {
              primary: 123, // Not a string
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
          },
        },
      },
    };

    const result = validateTokens(theme);

    expect(result.warnings).toContain('Token brand.primary is not a string: number');
  });

  it('should accept 3-character hex colors', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: {
            brand: {
              primary: '#000',
              secondary: '#fff',
              accent: '#f00',
            },
            text: {
              primary: '#1a1',
              secondary: '#4a4',
              muted: '#8a8',
              inverse: '#fff',
            },
            ui: {
              background: '#fff',
              surface: '#eee',
              border: '#ccc',
              overlay: '#000',
            },
            status: {
              success: '#0f0',
              warning: '#ff0',
              error: '#f00',
              info: '#00f',
            },
          },
        },
      },
    };

    const result = validateTokens(theme);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('getValidatedTokens', () => {
  // Spy on console methods
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should return validated tokens for valid theme', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: DEFAULT_THEME_TOKENS,
        },
      },
    };

    const result = getValidatedTokens(theme);

    expect(result).toEqual(DEFAULT_THEME_TOKENS);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should return defaults and log errors for invalid theme', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: {
            brand: {
              primary: '#000000',
            },
            // Missing required categories
          },
        },
      },
    };

    const result = getValidatedTokens(theme);

    expect(result).toEqual(DEFAULT_THEME_TOKENS);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should log warnings for incomplete theme', () => {
    const theme = {
      globalSettings: {
        colors: {
          tokens: {
            brand: {
              primary: '#000000',
              // Missing secondary, accent
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
          },
        },
      },
    };

    const result = getValidatedTokens(theme);

    expect(consoleWarnSpy).toHaveBeenCalled();
    // Should still return the provided tokens despite warnings
    expect(result.brand.primary).toBe('#000000');
  });

  it('should return defaults for undefined theme', () => {
    const result = getValidatedTokens(undefined);

    expect(result).toEqual(DEFAULT_THEME_TOKENS);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

describe('DEFAULT_THEME_TOKENS', () => {
  it('should have all required categories', () => {
    expect(DEFAULT_THEME_TOKENS.brand).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.text).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.ui).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.status).toBeDefined();
  });

  it('should have all brand tokens', () => {
    expect(DEFAULT_THEME_TOKENS.brand.primary).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.brand.secondary).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.brand.accent).toBeDefined();
  });

  it('should have all text tokens', () => {
    expect(DEFAULT_THEME_TOKENS.text.primary).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.text.secondary).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.text.muted).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.text.inverse).toBeDefined();
  });

  it('should have all ui tokens', () => {
    expect(DEFAULT_THEME_TOKENS.ui.background).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.ui.surface).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.ui.border).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.ui.overlay).toBeDefined();
  });

  it('should have all status tokens', () => {
    expect(DEFAULT_THEME_TOKENS.status.success).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.status.warning).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.status.error).toBeDefined();
    expect(DEFAULT_THEME_TOKENS.status.info).toBeDefined();
  });

  it('should have valid hex colors', () => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    Object.values(DEFAULT_THEME_TOKENS.brand).forEach((color) => {
      expect(color).toMatch(hexColorRegex);
    });

    Object.values(DEFAULT_THEME_TOKENS.text).forEach((color) => {
      expect(color).toMatch(hexColorRegex);
    });

    Object.values(DEFAULT_THEME_TOKENS.ui).forEach((color) => {
      expect(color).toMatch(hexColorRegex);
    });

    Object.values(DEFAULT_THEME_TOKENS.status).forEach((color) => {
      expect(color).toMatch(hexColorRegex);
    });
  });
});
