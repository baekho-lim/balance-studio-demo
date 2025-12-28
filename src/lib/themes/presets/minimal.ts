/**
 * Minimal Theme
 *
 * Clean, whitespace-focused design with subtle colors.
 * Perfect for artists, photographers, and portfolios.
 */

import type { ThemeConfig } from '../types'

export const minimalTheme: ThemeConfig = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Clean and elegant with generous whitespace',
  version: '1.0.0',
  author: 'Agency Platform',

  colors: {
    primary: '#1a1a1a',
    primaryLight: '#333333',
    primaryDark: '#000000',

    secondary: '#f5f5f5',
    secondaryLight: '#ffffff',
    secondaryDark: '#e5e5e5',

    accent: '#0066cc',
    accentLight: '#3399ff',
    accentDark: '#004499',

    background: '#ffffff',
    backgroundAlt: '#fafafa',
    surface: '#ffffff',

    text: '#1a1a1a',
    textMuted: '#666666',
    textInverted: '#ffffff',

    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    border: '#e5e5e5',
    borderLight: '#f0f0f0',
  },

  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',

    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },

    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  layout: {
    headerStyle: 'fixed',
    headerHeight: '4rem',
    headerBackground: 'solid',
    footerStyle: 'minimal',
    maxWidth: '1280px',
    containerPadding: '1.5rem',
  },

  components: {
    button: {
      borderRadius: '0.375rem',
      padding: '0.5rem 1rem',
      transition: 'all 0.15s ease',
    },
    card: {
      borderRadius: '0.5rem',
      shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
    },
    input: {
      borderRadius: '0.375rem',
      borderWidth: '1px',
      padding: '0.5rem 0.75rem',
    },
    badge: {
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
    },
  },

  effects: {
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
    },
    radius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },
    transitions: {
      fast: '0.1s ease',
      normal: '0.2s ease',
      slow: '0.3s ease',
    },
  },
}
