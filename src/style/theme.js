import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { lightColors, darkColors } from "./color";
import { useColorScheme } from "react-native";

export function usePaperTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const palette = isDark ? darkColors : lightColors;
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: palette.primary,
      secondary: palette.secondary,
      background: palette.background,
      surface: palette.surface,
      error: palette.error,
      onSurface: palette.text,
      onBackground: palette.text,
      outline: palette.border,
      success: palette.success,
      warning: palette.warning,
      info: palette.info,
      disabled: palette.disabled,
      // Customização do fundo do input
      elevation: {
        ...baseTheme.colors.elevation,
        level0: palette.background,
        level1: palette.surface,
      },
      // Para TextInput v5+ (Paper), use 'inputBackground' se necessário
      inputBackground: palette.surface,
    },
    // Para TextInput v4, use roundness ou mode se necessário
  };
}
