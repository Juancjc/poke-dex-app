import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme } from "react-native-paper";
import TabIcon from "../components/TabIcon";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Array de abas para fácil manutenção
export const TABS = [
  {
    name: "Home",
    component: HomeScreen,
    label: "Início",
    icon: "home",
  },
  {
    name: "Search",
    component: SearchScreen,
    label: "Buscar",
    icon: "magnify",
  },
  {
    name: "Favorites",
    component: FavoritesScreen,
    label: "Favoritos",
    icon: "heart",
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
