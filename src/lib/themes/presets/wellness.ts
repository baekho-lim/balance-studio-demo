/**
 * Wellness Theme
 *
 * Calm, professional design with soft colors and clean lines.
 * Perfect for pilates studios, yoga centers, spas, and wellness businesses.
 */

import type { ThemeConfig } from '../types'

export const wellnessTheme: ThemeConfig = {
  id: 'wellness',
  name: 'Wellness',
  description: 'Calm and professional for fitness & wellness businesses',
  version: '1.0.0',
  author: 'Agency Platform',

  colors: {
    primary: '#6366f1',        // Indigo/purple
    primaryLight: '#818cf8',
    primaryDark: '#4f46e5',

    secondary: '#f8fafc',      // Light slate
    secondaryLight: '#ffffff',
    secondaryDark: '#f1f5f9',

    accent: '#ec4899',         // Pink for CTAs
    accentLight: '#f472b6',
    accentDark: '#db2777',

    background: '#ffffff',
    backgroundAlt: '#f8fafc',
    surface: '#ffffff',

    text: '#1e293b',           // Slate 800
    textMuted: '#64748b',      // Slate 500
    textInverted: '#ffffff',

    success: '#10b981',        // Emerald
    warning: '#f59e0b',        // Amber
    error: '#ef4444',          // Red
    info: '#6366f1',           // Indigo

    border: '#e2e8f0',         // Slate 200
    borderLight: '#f1f5f9',    // Slate 100
  },

  fonts: {
    heading: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", monospace',

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
    '3xl': '5rem',
  },

  layout: {
    headerStyle: 'sticky',
    headerHeight: '4.5rem',
    headerBackground: 'blur',
    footerStyle: 'standard',
    maxWidth: '1280px',
    containerPadding: '1.5rem',
  },

  components: {
    button: {
      borderRadius: '0.75rem',
      padding: '0.75rem 1.5rem',
      transition: 'all 0.2s ease',
    },
    card: {
      borderRadius: '1rem',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: '1.5rem',
    },
    input: {
      borderRadius: '0.5rem',
      borderWidth: '1px',
      padding: '0.75rem 1rem',
    },
    badge: {
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
    },
  },

  effects: {
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
      md: '0 4px 12px rgba(0, 0, 0, 0.05)',
      lg: '0 8px 24px rgba(0, 0, 0, 0.08)',
      xl: '0 16px 48px rgba(0, 0, 0, 0.12)',
    },
    radius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '1rem',
      full: '9999px',
    },
    transitions: {
      fast: '0.15s ease',
      normal: '0.25s ease',
      slow: '0.35s ease',
    },
    animations: {
      fadeIn: 'fadeIn 0.3s ease-out',
      slideUp: 'slideUp 0.4s ease-out',
      scaleIn: 'scaleIn 0.2s ease-out',
    },
  },
}
