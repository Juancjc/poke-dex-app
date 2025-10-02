import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function TabIcon({ name, color, size, onPress, style }) {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={style}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <MaterialCommunityIcons name={name} color={color} size={size} />
      </TouchableOpacity>
    );
  }
  return (
    <MaterialCommunityIcons
      name={name}
      color={color}
      size={size}
      style={style}
    />
  );
}
