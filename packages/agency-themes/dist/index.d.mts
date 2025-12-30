import { ThemeConfig, ThemePresetId } from '@agency/core';

declare const THEMES_VERSION = "0.1.0";
declare const defaultTheme: ThemeConfig;
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type ThemeOverrides = DeepPartial<ThemeConfig> & {
    id: string;
    name: string;
};
declare const themePresets: Record<ThemePresetId, ThemeOverrides>;
/**
 * Create a theme by extending the default theme
 * Uses deep merge to allow partial overrides at any level
 */
declare function createTheme(overrides: ThemeOverrides): ThemeConfig;
/**
 * Get a theme preset by ID
 */
declare function getThemePreset(presetId: ThemePresetId): ThemeConfig;

export { THEMES_VERSION, type ThemeOverrides, createTheme, defaultTheme, getThemePreset, themePresets };
