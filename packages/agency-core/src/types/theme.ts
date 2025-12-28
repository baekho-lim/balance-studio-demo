/**
 * Theme System types
 * Full theme file structure for complete design replacement
 */

// Theme identifier
export type ThemeId = string

// Header style variants
export type HeaderStyle = 'fixed' | 'sticky' | 'static' | 'transparent'

// Footer style variants
export type FooterStyle = 'minimal' | 'standard' | 'mega'

// Button style variants
export type ButtonStyle = 'rounded' | 'square' | 'pill'

// Card style variants
export type CardStyle = 'flat' | 'elevated' | 'bordered' | 'glass'

// Input style variants
export type InputStyle = 'outlined' | 'filled' | 'underlined'

// Color palette
export interface ColorPalette {
  primary: string
  primaryLight?: string
  primaryDark?: string
  secondary: string
  secondaryLight?: string
  secondaryDark?: string
  accent: string
  background: string
  backgroundAlt?: string
  surface: string
  text: string
  textMuted: string
  textInverse?: string
  border: string
  success?: string
  warning?: string
  error?: string
  info?: string
}

// Typography settings
export interface Typography {
  fontFamily: {
    heading: string
    body: string
    mono?: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl'?: string
  }
  fontWeight: {
    light?: number
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
  letterSpacing?: {
    tight?: string
    normal?: string
    wide?: string
  }
}

// Spacing scale
export interface SpacingScale {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  8: string
  10: string
  12: string
  16: string
  20: string
  24?: string
}

// Border radius scale
export interface BorderRadius {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  full: string
}

// Shadow scale
export interface Shadows {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
}

// Breakpoints
export interface Breakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

// Layout configuration
export interface LayoutConfig {
  headerStyle: HeaderStyle
  headerHeight: string
  footerStyle: FooterStyle
  sidebarWidth?: string
  sidebarPosition?: 'left' | 'right'
  maxWidth: string
  containerPadding: string
  sectionSpacing: string
}

// Component variants
export interface ComponentVariants {
  button: {
    style: ButtonStyle
    sizes: {
      sm: { height: string; padding: string; fontSize: string }
      md: { height: string; padding: string; fontSize: string }
      lg: { height: string; padding: string; fontSize: string }
    }
  }
  card: {
    style: CardStyle
    padding: string
    borderRadius: string
  }
  input: {
    style: InputStyle
    height: string
    borderRadius: string
  }
  badge: {
    borderRadius: string
    padding: string
  }
}

// Animation settings
export interface AnimationConfig {
  duration: {
    fast: string
    normal: string
    slow: string
  }
  easing: {
    default: string
    in: string
    out: string
    inOut: string
  }
  transitions: {
    default: string
    colors: string
    transform: string
    opacity: string
  }
}

// Theme configuration
export interface ThemeConfig {
  id: ThemeId
  name: string
  description?: string
  version?: string
  author?: string

  // Design tokens
  colors: ColorPalette
  typography: Typography
  spacing: SpacingScale
  borderRadius: BorderRadius
  shadows: Shadows
  breakpoints: Breakpoints

  // Layout
  layout: LayoutConfig

  // Components
  components: ComponentVariants

  // Animation
  animation: AnimationConfig

  // Industry-specific extensions
  industry?: {
    type: 'artist' | 'restaurant' | 'pilates' | 'ecommerce' | 'government' | 'education'
    customTokens?: Record<string, unknown>
  }
}

// Theme preset (pre-defined themes)
export interface ThemePreset {
  id: string
  name: string
  description: string
  preview?: string  // Preview image URL
  config: ThemeConfig
}

// Available presets
export const THEME_PRESETS = [
  'minimal',
  'bold',
  'elegant',
  'modern',
  'classic'
] as const

export type ThemePresetId = typeof THEME_PRESETS[number]
