import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabIcon({ name, color, size }) {
  return <MaterialCommunityIcons name={name} color={color} size={size} />;
}
