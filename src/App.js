import React, { useState, useMemo, useEffect, createContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import RootNavigator from "./navigation/RootNavigator";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { lightColors, darkColors } from "./style/color";
import { pb } from "./config/pocketbase";
import { saveAuth, getAuth, clearAuth } from "./utils/authPersist";

export const ThemeModeContext = createContext({
  toggleTheme: () => {},
  mode: "light",
});

export const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: () => {},
  logout: () => {},
});

export default function App() {
  const [mode, setMode] = useState("light");
  const [isAuthenticated, setAuthenticated] = useState(false);
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

  // Carregar autenticação do SecureStore ao iniciar
  useEffect(() => {
    (async () => {
      const auth = await getAuth();
      if (auth && auth.token) {
        pb.authStore.save(auth.token, auth.model, auth.verified);
        setAuthenticated(pb.authStore.isValid);
      }
    })();
    // Listener para salvar no SecureStore ao logar
    pb.authStore.onChange(() => {
      if (pb.authStore.isValid) {
        saveAuth({
          token: pb.authStore.token,
          model: pb.authStore.model,
          verified: pb.authStore.verified,
        });
        setAuthenticated(true);
      } else {
        clearAuth();
        setAuthenticated(false);
      }
    });
  }, []);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const logout = () => {
    pb.authStore.clear();
    clearAuth();
    setAuthenticated(false);
  };

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <AuthContext.Provider
        value={{ isAuthenticated, setAuthenticated, logout }}
      >
        <PaperProvider theme={theme}>
          <RootNavigator />
        </PaperProvider>
      </AuthContext.Provider>
    </ThemeModeContext.Provider>
  );
}
