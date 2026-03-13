/**
 * Unit tests for theme token utilities
 */

import {
  resolveColor,
  resolveColors,
  tokensToCSSVars,
  generateThemeCSS,
  resolveTokenPath,
  isTokenPath,
  getAllTokenPaths,
} from '../token-utils';
import { DEFAULT_THEME_TOKENS } from '../validation';

describe('resolveColor', () => {
  it('should return undefined for undefined input', () => {
    expect(resolveColor(undefined)).toBeUndefined();
  });

  it('should return hex color unchanged', () => {
    expect(resolveColor('#000000')).toBe('#000000');
    expect(resolveColor('#fff')).toBe('#fff');
  });

  it('should return rgb color unchanged', () => {
    expect(resolveColor('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
    expect(resolveColor('rgba(255, 0, 0, 0.5)')).toBe('rgba(255, 0, 0, 0.5)');
  });

  it('should convert token path to CSS variable', () => {
    expect(resolveColor('brand.primary')).toBe('var(--theme-brand-primary)');
    expect(resolveColor('text.secondary')).toBe('var(--theme-text-secondary)');
    expect(resolveColor('ui.background')).toBe('var(--theme-ui-background)');
  });

  it('should handle deeply nested token paths', () => {
    expect(resolveColor('a.b.c.d')).toBe('var(--theme-a-b-c-d)');
  });

  it('should return unknown format unchanged', () => {
    expect(resolveColor('blue')).toBe('blue');
    expect(resolveColor('transparent')).toBe('transparent');
  });
});

describe('resolveColors', () => {
  it('should resolve all color values in object', () => {
    const input = {
      bg: 'brand.primary',
      text: '#ffffff',
      border: 'ui.border',
    };

    const result = resolveColors(input);

    expect(result.bg).toBe('var(--theme-brand-primary)');
    expect(result.text).toBe('#ffffff');
    expect(result.border).toBe('var(--theme-ui-border)');
  });

  it('should handle non-string values', () => {
    const input = {
      color: 'brand.primary',
      size: 16,
      enabled: true,
    };

    const result = resolveColors(input);

    expect(result.color).toBe('var(--theme-brand-primary)');
    expect(result.size).toBe(16);
    expect(result.enabled).toBe(true);
  });

  it('should handle empty object', () => {
    expect(resolveColors({})).toEqual({});
  });
});

describe('tokensToCSSVars', () => {
  it('should convert flat token structure to CSS vars', () => {
    const tokens = {
      primary: '#000000',
      secondary: '#666666',
    };

    const result = tokensToCSSVars(tokens);

    expect(result).toEqual({
      '--theme-primary': '#000000',
      '--theme-secondary': '#666666',
    });
  });

  it('should convert nested token structure to CSS vars', () => {
    const tokens = {
      brand: {
        primary: '#000000',
        secondary: '#666666',
      },
      text: {
        primary: '#1a1a1a',
      },
    };

    const result = tokensToCSSVars(tokens);

    expect(result).toEqual({
      '--theme-brand-primary': '#000000',
      '--theme-brand-secondary': '#666666',
      '--theme-text-primary': '#1a1a1a',
    });
  });

  it('should handle DEFAULT_THEME_TOKENS', () => {
    const result = tokensToCSSVars(DEFAULT_THEME_TOKENS);

    expect(result['--theme-brand-primary']).toBe('#000000');
    expect(result['--theme-text-primary']).toBe('#1a1a1a');
    expect(result['--theme-ui-background']).toBe('#ffffff');
    expect(result['--theme-status-success']).toBe('#10b981');
  });

  it('should ignore non-hex-color values', () => {
    const tokens = {
      color: '#000000',
      notAColor: 'some string',
      nested: {
        color: '#ffffff',
        number: 42,
      },
    };

    const result = tokensToCSSVars(tokens);

    expect(result).toEqual({
      '--theme-color': '#000000',
      '--theme-nested-color': '#ffffff',
    });
  });
});

describe('generateThemeCSS', () => {
  it('should generate valid CSS string', () => {
    const tokens = {
      brand: {
        primary: '#000000',
      },
    };

    const result = generateThemeCSS(tokens);

    expect(result).toContain(':root {');
    expect(result).toContain('--theme-brand-primary: #000000;');
    expect(result).toContain('}');
  });

  it('should generate multi-line CSS with proper formatting', () => {
    const tokens = {
      a: '#111111',
      b: '#222222',
    };

    const result = generateThemeCSS(tokens);

    expect(result.split('\n').length).toBeGreaterThan(2);
    expect(result).toMatch(/--theme-a: #111111;/);
    expect(result).toMatch(/--theme-b: #222222;/);
  });
});

describe('resolveTokenPath', () => {
  const tokens = {
    brand: {
      primary: '#000000',
      secondary: '#666666',
    },
    text: {
      primary: '#1a1a1a',
    },
  };

  it('should resolve simple token path', () => {
    expect(resolveTokenPath('brand.primary', tokens)).toBe('#000000');
    expect(resolveTokenPath('text.primary', tokens)).toBe('#1a1a1a');
  });

  it('should return undefined for missing path', () => {
    expect(resolveTokenPath('brand.tertiary', tokens)).toBeUndefined();
    expect(resolveTokenPath('missing.path', tokens)).toBeUndefined();
  });

  it('should handle undefined inputs', () => {
    expect(resolveTokenPath('', tokens)).toBeUndefined();
    expect(resolveTokenPath('brand.primary', null)).toBeUndefined();
    expect(resolveTokenPath('', null)).toBeUndefined();
  });

  it('should only return string values', () => {
    const mixedTokens = {
      color: '#000000',
      nested: {
        subcolor: '#ffffff',
      },
    };

    expect(resolveTokenPath('color', mixedTokens)).toBe('#000000');
    expect(resolveTokenPath('nested', mixedTokens)).toBeUndefined();
    expect(resolveTokenPath('nested.subcolor', mixedTokens)).toBe('#ffffff');
  });
});

describe('isTokenPath', () => {
  it('should return true for token paths', () => {
    expect(isTokenPath('brand.primary')).toBe(true);
    expect(isTokenPath('text.secondary')).toBe(true);
    expect(isTokenPath('a.b.c')).toBe(true);
  });

  it('should return false for hex colors', () => {
    expect(isTokenPath('#000000')).toBe(false);
    expect(isTokenPath('#fff')).toBe(false);
  });

  it('should return false for rgb colors', () => {
    expect(isTokenPath('rgb(255, 0, 0)')).toBe(false);
    expect(isTokenPath('rgba(255, 0, 0, 0.5)')).toBe(false);
  });

  it('should return false for undefined or empty', () => {
    expect(isTokenPath(undefined)).toBe(false);
    expect(isTokenPath('')).toBe(false);
  });

  it('should return false for named colors', () => {
    expect(isTokenPath('blue')).toBe(false);
    expect(isTokenPath('transparent')).toBe(false);
  });
});

describe('getAllTokenPaths', () => {
  it('should return all token paths from flat structure', () => {
    const tokens = {
      primary: '#000000',
      secondary: '#666666',
    };

    const paths = getAllTokenPaths(tokens);

    expect(paths).toContain('primary');
    expect(paths).toContain('secondary');
    expect(paths.length).toBe(2);
  });

  it('should return all token paths from nested structure', () => {
    const tokens = {
      brand: {
        primary: '#000000',
        secondary: '#666666',
      },
      text: {
        primary: '#1a1a1a',
      },
    };

    const paths = getAllTokenPaths(tokens);

    expect(paths).toContain('brand.primary');
    expect(paths).toContain('brand.secondary');
    expect(paths).toContain('text.primary');
    expect(paths.length).toBe(3);
  });

  it('should handle DEFAULT_THEME_TOKENS', () => {
    const paths = getAllTokenPaths(DEFAULT_THEME_TOKENS);

    expect(paths).toContain('brand.primary');
    expect(paths).toContain('brand.secondary');
    expect(paths).toContain('brand.accent');
    expect(paths).toContain('text.primary');
    expect(paths).toContain('ui.background');
    expect(paths).toContain('status.success');
    expect(paths.length).toBeGreaterThan(10);
  });

  it('should handle empty object', () => {
    expect(getAllTokenPaths({})).toEqual([]);
  });
});
