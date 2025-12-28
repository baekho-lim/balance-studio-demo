'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'
import type { ThemeConfig, ThemePreset } from './types'
import { themes } from './presets'
import { applyTheme } from './utils'

interface ThemeContextValue {
  theme: ThemeConfig
  preset: ThemePreset
  setPreset: (preset: ThemePreset) => void
  setCustomTheme: (theme: Partial<ThemeConfig>) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_STORAGE_KEY = 'limhyejung-theme-preset'

interface ThemeProviderProps {
  children: ReactNode
  defaultPreset?: ThemePreset
}

export function ThemeProvider({
  children,
  defaultPreset = 'elegant',
}: ThemeProviderProps) {
  const [preset, setPresetState] = useState<ThemePreset>(defaultPreset)
  const [customOverrides, setCustomOverrides] = useState<Partial<ThemeConfig>>({})

  // Get the current theme, merging any custom overrides
  const theme: ThemeConfig = {
    ...themes[preset],
    ...customOverrides,
    colors: {
      ...themes[preset].colors,
      ...(customOverrides.colors || {}),
    },
    fonts: {
      ...themes[preset].fonts,
      ...(customOverrides.fonts || {}),
    },
  } as ThemeConfig

  // Load saved preset from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedPreset = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedPreset && savedPreset in themes) {
      setPresetState(savedPreset as ThemePreset)
    }
  }, [])

  // Apply theme CSS variables when theme changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Set preset and save to localStorage
  const setPreset = useCallback((newPreset: ThemePreset) => {
    setPresetState(newPreset)
    setCustomOverrides({}) // Reset custom overrides when changing preset

    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newPreset)
    }
  }, [])

  // Set custom theme overrides
  const setCustomTheme = useCallback((overrides: Partial<ThemeConfig>) => {
    setCustomOverrides(prev => ({
      ...prev,
      ...overrides,
    }))
    setPresetState('custom')
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        preset,
        setPreset,
        setCustomTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
