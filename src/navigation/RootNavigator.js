import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import BottomTabs from "./BottomTabs";
import { AuthContext } from "../App";

export default function RootNavigator() {
  const { isAuthenticated } = useContext(AuthContext);
  // Importa o tema do Paper via useTheme
  const { useTheme } = require("react-native-paper");
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
