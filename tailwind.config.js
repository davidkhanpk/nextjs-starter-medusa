const path = require("path")

module.exports = {
  important: true, // Make Tailwind utilities !important to override other CSS
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  // Comprehensive safelist for commonly used utilities (especially from Puck/dynamic content)
  safelist: [
    // Text sizes
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/ },
    // Font weights
    { pattern: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/ },
    // Margins
    { pattern: /^m[trblxy]?-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64|72|80|96)$/ },
    // Padding  
    { pattern: /^p[trblxy]?-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64|72|80|96)$/ },
    // Width/Height
    { pattern: /^(w|h)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64|72|80|96|auto|full|screen|min|max|fit)$/ },
    // Flexbox
    { pattern: /^(flex|inline-flex|flex-row|flex-col|flex-wrap|flex-nowrap|items-|justify-|gap-)/ },
    // Grid
    { pattern: /^(grid|grid-cols-|grid-rows-|col-span-|row-span-)/ },
    // Colors (bg, text, border)
    { pattern: /^(bg|text|border)-(white|black|gray|red|yellow|green|blue|indigo|purple|pink)(-50|-100|-200|-300|-400|-500|-600|-700|-800|-900)?$/ },
    // Rounded corners
    { pattern: /^rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/ },
    // Shadows
    { pattern: /^shadow(-sm|-md|-lg|-xl|-2xl|-inner|-none)?$/ },
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        // ===== NEW THEME TOKEN SYSTEM =====
        // Brand colors (from theme.globalSettings.colors.tokens.brand)
        'brand-primary': 'var(--theme-brand-primary)',
        'brand-secondary': 'var(--theme-brand-secondary)',
        'brand-accent': 'var(--theme-brand-accent)',
        'brand-muted': 'var(--theme-brand-muted)',
        
        // Text colors (from theme.globalSettings.colors.tokens.text)
        'text-heading': 'var(--theme-text-heading)',
        'text-body': 'var(--theme-text-body)',
        'text-muted': 'var(--theme-text-muted)',
        'text-link': 'var(--theme-text-link)',
        'text-link-hover': 'var(--theme-text-linkHover)',
        'text-inverse': 'var(--theme-text-inverse)',
        
        // UI colors (from theme.globalSettings.colors.tokens.ui)
        'ui-border': 'var(--theme-ui-border)',
        'ui-border-hover': 'var(--theme-ui-borderHover)',
        'ui-background': 'var(--theme-ui-background)',
        'ui-surface': 'var(--theme-ui-surface)',
        'ui-overlay': 'var(--theme-ui-overlay)',
        
        // Status colors (from theme.globalSettings.colors.tokens.status)
        'status-success': 'var(--theme-status-success)',
        'status-error': 'var(--theme-status-error)',
        'status-warning': 'var(--theme-status-warning)',
        'status-info': 'var(--theme-status-info)',
        
        // ===== LEGACY THEME SYSTEM (kept for backward compatibility) =====
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-text': 'var(--color-primary-text)',
        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'secondary-text': 'var(--color-secondary-text)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
        
        // Medusa grey scale (keep for Medusa UI components)
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
        // Theme-aware border radius
        'theme-sm': 'var(--border-radius-sm)',
        'theme-md': 'var(--border-radius-md)',
        'theme-lg': 'var(--border-radius-lg)',
        'theme-full': 'var(--border-radius-full)',
      },
      spacing: {
        // Theme-aware spacing
        'theme-xs': 'var(--spacing-xs)',
        'theme-sm': 'var(--spacing-sm)',
        'theme-md': 'var(--spacing-md)',
        'theme-lg': 'var(--spacing-lg)',
        'theme-xl': 'var(--spacing-xl)',
      },
      maxWidth: {
        "8xl": "100rem",
        "container": "var(--container-width)", // Theme-aware container
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
        // Theme-aware font sizes
        'theme-xs': 'var(--font-size-xs)',
        'theme-sm': 'var(--font-size-sm)',
        'theme-base': 'var(--font-size-base)',
        'theme-lg': 'var(--font-size-lg)',
        'theme-xl': 'var(--font-size-xl)',
        'theme-2xl': 'var(--font-size-2xl)',
        'theme-3xl': 'var(--font-size-3xl)',
        'theme-4xl': 'var(--font-size-4xl)',
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
        // Theme-aware fonts
        'heading': 'var(--font-heading)',
        'body': 'var(--font-body)',
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
