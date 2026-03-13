'use client';

import { useTheme } from '@lib/theme/ThemeProvider';

/**
 * Theme Test Banner
 * 
 * Displays at the top of the homepage to verify theme integration
 * Shows:
 * - Theme values being used
 * - CSS variables working
 * - Tailwind utility classes working
 * 
 * Remove this component after testing is complete
 */
export default function ThemeTestBanner() {
  const { theme, loading, error } = useTheme();

  if (loading) {
    return (
      <div className="bg-gray-100 p-4 text-center">
        <p className="text-sm text-gray-600">Loading theme...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 text-center border-b border-red-200">
        <p className="text-sm text-red-600">Theme Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
      <div className="max-w-container mx-auto">
        <h1 className="font-heading text-theme-4xl font-bold mb-4">
          🎨 Theme System Active!
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Colors Test */}
          <div className="bg-white/10 backdrop-blur rounded-theme-lg p-theme-md">
            <h3 className="font-heading text-theme-xl font-semibold mb-3">Colors</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-theme-sm" title={theme.colors.primary}></div>
                <span>Primary: {theme.colors.primary}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-secondary rounded-theme-sm" title={theme.colors.secondary}></div>
                <span>Secondary: {theme.colors.secondary}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-success rounded-theme-sm" title={theme.colors.success}></div>
                <span>Success: {theme.colors.success}</span>
              </div>
            </div>
          </div>

          {/* Typography Test */}
          <div className="bg-white/10 backdrop-blur rounded-theme-lg p-theme-md">
            <h3 className="font-heading text-theme-xl font-semibold mb-3">Typography</h3>
            <div className="space-y-2 text-sm">
              <p className="font-heading">Heading Font: {theme.typography.fontFamily.heading}</p>
              <p className="font-body">Body Font: {theme.typography.fontFamily.body}</p>
              <div className="flex gap-2">
                <span className="text-theme-xs">XS</span>
                <span className="text-theme-sm">SM</span>
                <span className="text-theme-base">Base</span>
                <span className="text-theme-lg">LG</span>
              </div>
            </div>
          </div>

          {/* Layout Test */}
          <div className="bg-white/10 backdrop-blur rounded-theme-lg p-theme-md">
            <h3 className="font-heading text-theme-xl font-semibold mb-3">Layout</h3>
            <div className="space-y-2 text-sm">
              <p>Container: {theme.layout.containerWidth}</p>
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 bg-white/20 rounded-theme-sm"></div>
                <div className="w-8 h-8 bg-white/20 rounded-theme-md"></div>
                <div className="w-8 h-8 bg-white/20 rounded-theme-lg"></div>
                <div className="w-8 h-8 bg-white/20 rounded-theme-full"></div>
              </div>
              <p className="text-xs">Border radius: sm, md, lg, full</p>
            </div>
          </div>
        </div>

        {/* Component Buttons Test */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary hover:bg-primary-hover text-primary-text px-6 py-3 rounded-theme-md font-heading font-semibold transition-colors">
            Primary Button (Tailwind)
          </button>
          
          <button className="bg-secondary hover:bg-secondary-hover text-secondary-text px-6 py-3 rounded-theme-md font-heading font-semibold transition-colors">
            Secondary Button (Tailwind)
          </button>
          
          <button className="border-2 border-white hover:bg-white hover:text-purple-600 text-white px-6 py-3 rounded-theme-lg font-heading font-semibold transition-all">
            Outline Button
          </button>

          <button 
            className="text-white hover:bg-white/10 px-theme-md py-theme-sm rounded-theme-full transition-colors"
            style={{
              backgroundColor: 'var(--color-success)',
            }}
          >
            CSS Variable Button
          </button>
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-theme-md border-2 border-white/20">
          <p className="text-sm">
            ✅ <strong>Theme is loaded from Shopikool Platform!</strong> Changes made in the dashboard will reflect here after page reload.
          </p>
          <p className="text-xs mt-2 opacity-75">
            Store: {theme.branding.storeName} | Container Width: {theme.layout.containerWidth} | Border Radius: {theme.layout.borderRadius.md}
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm opacity-75">
            🛠️ Remove this component after testing (src/modules/home/components/theme-test-banner.tsx)
          </p>
        </div>
      </div>
    </div>
  );
}
