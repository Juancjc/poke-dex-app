import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import { lightColors, darkColors } from "../style/color";

export default function AppTextInput(props) {
  const theme = useTheme();
  // Detecta tema claro ou escuro
  const inputBackground = theme.dark
    ? darkColors.inputBackground
    : lightColors.inputBackground;
  return (
    <TextInput
      {...props}
      theme={{
        ...props.theme,
        colors: {
          ...((props.theme && props.theme.colors) || {}),
          background: inputBackground,
        },
      }}
      style={[{ backgroundColor: inputBackground }, props.style]}
    />
  );
}
