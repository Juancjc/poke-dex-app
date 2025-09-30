import React, { useState, useMemo, createContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import RootNavigator from "./navigation/RootNavigator";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { lightColors, darkColors } from "./style/color";

export const ThemeModeContext = createContext({
  toggleTheme: () => {},
  mode: "light",
});

export default function App() {
  const [mode, setMode] = useState("light");
  const isDark = mode === "dark";
  const theme = useMemo(() => {
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
      },
    };
  }, [isDark]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </ThemeModeContext.Provider>
  );
}
