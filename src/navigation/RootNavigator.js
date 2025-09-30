import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import BottomTabs from "./BottomTabs";

// Autenticação desabilitada para navegação livre no front
// const [isAuthenticated, setIsAuthenticated] = useState(false);

export default function RootNavigator() {
  // Sempre mostra as BottomTabs (Home) para facilitar o front
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
