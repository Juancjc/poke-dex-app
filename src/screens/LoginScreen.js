import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import AppTextInput from "../components/AppTextInput";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.title}>Login</Text>
      <AppTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AppTextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={() => {}} style={styles.button}>
        Entrar
      </Button>
      <Button onPress={() => navigation.navigate("Register")}>
        Não tem conta? Cadastre-se
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
