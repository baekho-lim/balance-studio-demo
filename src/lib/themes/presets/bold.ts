/**
 * Bold Theme
 *
 * High contrast, vibrant colors, and strong visual impact.
 * Perfect for restaurants, fitness studios, and modern businesses.
 */

import type { ThemeConfig } from '../types'

export const boldTheme: ThemeConfig = {
  id: 'bold',
  name: 'Bold',
  description: 'High contrast with vibrant colors and strong impact',
  version: '1.0.0',
  author: 'Agency Platform',

  colors: {
    primary: '#ff6b35',
    primaryLight: '#ff8c5a',
    primaryDark: '#e5522b',

    secondary: '#1a1a2e',
    secondaryLight: '#2d2d44',
    secondaryDark: '#0f0f1a',

    accent: '#00d4aa',
    accentLight: '#33debb',
    accentDark: '#00b38f',

    background: '#0f0f1a',
    backgroundAlt: '#1a1a2e',
    surface: '#2d2d44',

    text: '#ffffff',
    textMuted: '#a0a0b0',
    textInverted: '#0f0f1a',

    success: '#00d4aa',
    warning: '#ffbe0b',
    error: '#ff006e',
    info: '#3a86ff',

    border: '#3d3d55',
    borderLight: '#4d4d66',
  },

  fonts: {
    heading: '"Montserrat", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Open Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"Fira Code", monospace',

    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3.5rem',
    },

    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 800,
    },

    lineHeights: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.7',
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2.5rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },

  layout: {
    headerStyle: 'sticky',
    headerHeight: '5rem',
    headerBackground: 'blur',
    footerStyle: 'standard',
    maxWidth: '1400px',
    containerPadding: '2rem',
  },

  components: {
    button: {
      borderRadius: '0.5rem',
      padding: '0.75rem 1.5rem',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    card: {
      borderRadius: '1rem',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      padding: '2rem',
    },
    input: {
      borderRadius: '0.5rem',
      borderWidth: '2px',
      padding: '0.75rem 1rem',
    },
    badge: {
      borderRadius: '0.5rem',
      padding: '0.375rem 0.875rem',
      fontSize: '0.75rem',
    },
  },

  effects: {
    shadows: {
      sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
      md: '0 4px 12px rgba(0, 0, 0, 0.3)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.4)',
      xl: '0 16px 48px rgba(0, 0, 0, 0.5)',
    },
    radius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '1rem',
      full: '9999px',
    },
    transitions: {
      fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      normal: '0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    animations: {
      fadeIn: 'fadeIn 0.3s ease-out',
      slideUp: 'slideUp 0.4s ease-out',
      scaleIn: 'scaleIn 0.2s ease-out',
    },
  },
}
