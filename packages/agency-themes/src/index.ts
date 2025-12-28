// @agency/themes - Theme system
// This package provides theming functionality for the agency platform

import type { ThemeConfig, ThemePresetId } from '@agency/core'

export const THEMES_VERSION = '0.1.0'

// Default theme configuration
export const defaultTheme: ThemeConfig = {
  id: 'default',
  name: 'Default',
  description: 'Clean, minimal default theme',

  colors: {
    primary: '#8B9D7E',
    primaryLight: '#A3B396',
    primaryDark: '#6B7D5E',
    secondary: '#6B7280',
    secondaryLight: '#9CA3AF',
    secondaryDark: '#4B5563',
    accent: '#B8C5A8',
    background: '#FFFFFF',
    backgroundAlt: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#1F2937',
    textMuted: '#6B7280',
    textInverse: '#FFFFFF',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  },

  typography: {
    fontFamily: {
      heading: 'Playfair Display, serif',
      body: 'Inter, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  layout: {
    headerStyle: 'fixed',
    headerHeight: '5rem',
    footerStyle: 'standard',
    maxWidth: '1280px',
    containerPadding: '1.5rem',
    sectionSpacing: '4rem'
  },

  components: {
    button: {
      style: 'rounded',
      sizes: {
        sm: { height: '2rem', padding: '0.5rem 1rem', fontSize: '0.875rem' },
        md: { height: '2.5rem', padding: '0.625rem 1.25rem', fontSize: '1rem' },
        lg: { height: '3rem', padding: '0.75rem 1.5rem', fontSize: '1.125rem' }
      }
    },
    card: {
      style: 'bordered',
      padding: '1.5rem',
      borderRadius: '0.5rem'
    },
    input: {
      style: 'outlined',
      height: '2.5rem',
      borderRadius: '0.375rem'
    },
    badge: {
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem'
    }
  },

  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    transitions: {
      default: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      colors: 'color, background-color, border-color 150ms ease',
      transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 'opacity 300ms ease'
    }
  }
}

// Deep partial type for theme overrides
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Theme override input type - allows partial nested objects
export type ThemeOverrides = DeepPartial<ThemeConfig> & { id: string; name: string }

// Theme presets map - each preset has required id and name
export const themePresets: Record<ThemePresetId, ThemeOverrides> = {
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and minimalistic design'
  },
  bold: {
    id: 'bold',
    name: 'Bold',
    description: 'Strong colors and impactful design'
  },
  elegant: {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated and refined aesthetic'
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary and sleek design'
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless and traditional style'
  }
}

/**
 * Create a theme by extending the default theme
 * Uses deep merge to allow partial overrides at any level
 */
export function createTheme(overrides: ThemeOverrides): ThemeConfig {
  // Simple shallow merge for each section - defaultTheme provides all required fields
  return {
    id: overrides.id,
    name: overrides.name,
    description: overrides.description ?? defaultTheme.description,
    version: overrides.version ?? defaultTheme.version,
    author: overrides.author ?? defaultTheme.author,
    colors: { ...defaultTheme.colors, ...(overrides.colors as Partial<typeof defaultTheme.colors>) },
    typography: {
      fontFamily: { ...defaultTheme.typography.fontFamily, ...overrides.typography?.fontFamily },
      fontSize: { ...defaultTheme.typography.fontSize, ...overrides.typography?.fontSize } as typeof defaultTheme.typography.fontSize,
      fontWeight: { ...defaultTheme.typography.fontWeight, ...overrides.typography?.fontWeight },
      lineHeight: { ...defaultTheme.typography.lineHeight, ...overrides.typography?.lineHeight },
      letterSpacing: overrides.typography?.letterSpacing
        ? { ...defaultTheme.typography.letterSpacing, ...overrides.typography.letterSpacing }
        : defaultTheme.typography.letterSpacing
    },
    spacing: { ...defaultTheme.spacing, ...(overrides.spacing as Partial<typeof defaultTheme.spacing>) } as typeof defaultTheme.spacing,
    borderRadius: { ...defaultTheme.borderRadius, ...(overrides.borderRadius as Partial<typeof defaultTheme.borderRadius>) },
    shadows: { ...defaultTheme.shadows, ...(overrides.shadows as Partial<typeof defaultTheme.shadows>) },
    breakpoints: { ...defaultTheme.breakpoints, ...(overrides.breakpoints as Partial<typeof defaultTheme.breakpoints>) },
    layout: { ...defaultTheme.layout, ...(overrides.layout as Partial<typeof defaultTheme.layout>) },
    components: {
      button: {
        ...defaultTheme.components.button,
        ...overrides.components?.button,
        sizes: {
          ...defaultTheme.components.button.sizes,
          ...(overrides.components?.button?.sizes as Partial<typeof defaultTheme.components.button.sizes>)
        }
      },
      card: { ...defaultTheme.components.card, ...overrides.components?.card },
      input: { ...defaultTheme.components.input, ...overrides.components?.input },
      badge: { ...defaultTheme.components.badge, ...overrides.components?.badge }
    },
    animation: {
      duration: { ...defaultTheme.animation.duration, ...overrides.animation?.duration },
      easing: { ...defaultTheme.animation.easing, ...overrides.animation?.easing },
      transitions: { ...defaultTheme.animation.transitions, ...overrides.animation?.transitions }
    },
    industry: overrides.industry as ThemeConfig['industry']
  }
}

/**
 * Get a theme preset by ID
 */
export function getThemePreset(presetId: ThemePresetId): ThemeConfig {
  const preset = themePresets[presetId]
  return createTheme(preset)
}

// Future exports:
// export * from './presets/minimal'
// export * from './presets/bold'
// export * from './presets/elegant'
// export * from './utils/cssVariables'
// export * from './utils/themeLoader'
