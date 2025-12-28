/**
 * Elegant Theme
 *
 * Sophisticated design with serif fonts and muted earth tones.
 * Perfect for luxury brands, art galleries, and fine dining.
 * This is the current LimHyejung.com style as a theme.
 */

import type { ThemeConfig } from '../types'

export const elegantTheme: ThemeConfig = {
  id: 'elegant',
  name: 'Elegant',
  description: 'Sophisticated with serif fonts and earthy tones',
  version: '1.0.0',
  author: 'Agency Platform',

  colors: {
    primary: '#8B9D7E',        // sage green
    primaryLight: '#A8B89E',
    primaryDark: '#6E8062',

    secondary: '#FFF9F0',      // cream
    secondaryLight: '#FFFFFF',
    secondaryDark: '#F5EDE0',

    accent: '#B8C5A8',         // light sage
    accentLight: '#C8D4BB',
    accentDark: '#9AB08A',

    background: '#FFFFFF',
    backgroundAlt: '#FFF9F0',
    surface: '#FFFFFF',

    text: '#2D3B2D',           // dark sage
    textMuted: '#6B7B6B',      // muted sage
    textInverted: '#FFFFFF',

    success: '#7CB342',
    warning: '#D4A574',
    error: '#C75B5B',
    info: '#6B8E9B',

    border: '#E8E0D5',
    borderLight: '#F0EBE3',
  },

  fonts: {
    heading: '"Playfair Display", Georgia, serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", monospace',

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
      tight: '1.3',
      normal: '1.6',
      relaxed: '1.8',
    },
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '5rem',
  },

  layout: {
    headerStyle: 'fixed',
    headerHeight: '4.5rem',
    headerBackground: 'blur',
    footerStyle: 'standard',
    maxWidth: '1200px',
    containerPadding: '1.5rem',
  },

  components: {
    button: {
      borderRadius: '0.25rem',
      padding: '0.625rem 1.25rem',
      transition: 'all 0.2s ease',
    },
    card: {
      borderRadius: '0.375rem',
      shadow: '0 2px 8px rgba(45, 59, 45, 0.08)',
      padding: '1.5rem',
    },
    input: {
      borderRadius: '0.25rem',
      borderWidth: '1px',
      padding: '0.625rem 0.875rem',
    },
    badge: {
      borderRadius: '0.25rem',
      padding: '0.25rem 0.625rem',
      fontSize: '0.75rem',
    },
  },

  effects: {
    shadows: {
      sm: '0 1px 2px rgba(45, 59, 45, 0.04)',
      md: '0 2px 8px rgba(45, 59, 45, 0.08)',
      lg: '0 4px 16px rgba(45, 59, 45, 0.12)',
      xl: '0 8px 32px rgba(45, 59, 45, 0.16)',
    },
    radius: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.375rem',
      full: '9999px',
    },
    transitions: {
      fast: '0.15s ease',
      normal: '0.25s ease',
      slow: '0.35s ease',
    },
    animations: {
      fadeIn: 'fadeIn 0.4s ease-out',
      slideUp: 'slideUp 0.5s ease-out',
    },
  },
}
