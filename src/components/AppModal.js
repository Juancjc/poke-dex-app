import React from "react";
import { Modal, Portal, Text, Button, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function AppModal({
  visible,
  onDismiss,
  title,
  message,
  buttonText = "OK",
}) {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <Text style={styles.message}>{message}</Text>
        <Button
          mode="contained"
          onPress={onDismiss}
          style={styles.button}
          labelStyle={{ color: "#fff" }}
        >
          {buttonText}
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 24,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    marginTop: 8,
    backgroundColor: "#2196f3",
  },
});
