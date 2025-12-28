/**
 * Theme System Types
 *
 * Full theme files that enable complete design replacement
 * across the entire website.
 */

export interface ThemeColors {
  // Primary palette
  primary: string        // Main brand color
  primaryLight: string   // Lighter variant
  primaryDark: string    // Darker variant

  // Secondary palette
  secondary: string      // Secondary brand color
  secondaryLight: string
  secondaryDark: string

  // Accent colors
  accent: string         // Highlight/CTA color
  accentLight: string
  accentDark: string

  // Backgrounds
  background: string     // Main background
  backgroundAlt: string  // Alternative background (cards, sections)
  surface: string        // Surface color (elevated elements)

  // Text colors
  text: string           // Primary text
  textMuted: string      // Secondary/muted text
  textInverted: string   // Text on dark backgrounds

  // Semantic colors
  success: string
  warning: string
  error: string
  info: string

  // Border colors
  border: string
  borderLight: string
}

export interface ThemeFonts {
  // Font families
  heading: string        // Headings (h1-h6)
  body: string           // Body text
  mono?: string          // Code blocks

  // Font sizes (in rem)
  sizes: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
  }

  // Font weights
  weights: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }

  // Line heights
  lineHeights: {
    tight: string
    normal: string
    relaxed: string
  }
}

export interface ThemeSpacing {
  // Spacing scale (in rem)
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
}

export interface ThemeLayout {
  // Header
  headerStyle: 'fixed' | 'sticky' | 'static'
  headerHeight: string
  headerBackground: 'solid' | 'transparent' | 'blur'

  // Footer
  footerStyle: 'minimal' | 'standard' | 'mega'

  // Container
  maxWidth: string
  containerPadding: string

  // Sidebar (for admin or blog layouts)
  sidebarWidth?: string
  sidebarPosition?: 'left' | 'right'
}

export interface ThemeComponents {
  // Button styles
  button: {
    borderRadius: string
    padding: string
    transition: string
  }

  // Card styles
  card: {
    borderRadius: string
    shadow: string
    padding: string
  }

  // Input styles
  input: {
    borderRadius: string
    borderWidth: string
    padding: string
  }

  // Badge/Tag styles
  badge: {
    borderRadius: string
    padding: string
    fontSize: string
  }
}

export interface ThemeEffects {
  // Shadows
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }

  // Border radius
  radius: {
    sm: string
    md: string
    lg: string
    full: string
  }

  // Transitions
  transitions: {
    fast: string
    normal: string
    slow: string
  }

  // Animations
  animations?: {
    fadeIn?: string
    slideUp?: string
    scaleIn?: string
  }
}

export interface ThemeConfig {
  // Theme metadata
  id: string
  name: string
  description: string
  version: string
  author?: string
  preview?: string        // Preview image URL

  // Theme settings
  colors: ThemeColors
  fonts: ThemeFonts
  spacing: ThemeSpacing
  layout: ThemeLayout
  components: ThemeComponents
  effects: ThemeEffects

  // Custom CSS (optional)
  customCSS?: string
}

// Theme preset type for quick theme selection
export type ThemePreset = 'minimal' | 'bold' | 'elegant' | 'wellness' | 'custom'

// Active theme context
export interface ThemeState {
  currentTheme: ThemeConfig
  preset: ThemePreset
  customOverrides?: Partial<ThemeConfig>
}
