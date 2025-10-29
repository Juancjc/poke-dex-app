import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme } from "react-native-paper";
import TabIcon from "../components/TabIcon";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CapturarScreen from "../screens/CapturarScreen";
// Array de abas para fácil manutenção
export const TABS = [
  {
    name: "Home",
    component: HomeScreen,
    label: "Início",
    icon: "pokemon-go",
  },
  {
    name: "Capturar",
    component: CapturarScreen,
    label: "Capturar",
    icon: "pokeball",
  },
  {
    name: "Search",
    component: SearchScreen,
    label: "Buscar",
    icon: "magnify",
  },
  {
    name: "Profile",
    component: ProfileScreen,
    label: "Perfil",
    icon: "account",
  },
];

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const theme = useTheme();
  const ReactCtx = require("react");
  const { useContext } = ReactCtx;
  const { toggleTheme, mode } = useContext(require("../App").ThemeModeContext);
  const { logout } = useContext(require("../App").AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const tab = TABS.find((t) => t.name === route.name);
          return (
            <TabIcon name={tab?.icon || "circle"} color={color} size={size} />
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.primary,
        headerRight: () => (
          <ReactCtx.Fragment>
            <TabIcon
              name={mode === "dark" ? "white-balance-sunny" : "weather-night"}
              color={theme.colors.primary}
              size={24}
              onPress={toggleTheme}
              style={{ marginRight: 16 }}
            />
            <TabIcon
              name="logout"
              color={theme.colors.error}
              size={24}
              onPress={logout}
              style={{ marginRight: 8 }}
            />
          </ReactCtx.Fragment>
        ),
      })}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ title: tab.label }}
        />
      ))}
    </Tab.Navigator>
  );
}

// Para adicionar/remover abas, basta editar o array TABS acima.
