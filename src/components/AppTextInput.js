import React from "react";
import { TextInput, useTheme } from "react-native-paper";

export default function AppTextInput(props) {
  const theme = useTheme();
  return (
    <TextInput
      {...props}
      theme={{
        ...props.theme,
        colors: {
          ...((props.theme && props.theme.colors) || {}),
          background: theme.colors.surface,
        },
      }}
    />
  );
}
