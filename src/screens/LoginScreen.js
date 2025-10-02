import React, { useState } from "react";
import { login } from "../config/pocketbase";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import AppTextInput from "../components/AppTextInput";
import LogoHeader from "../components/LogoHeader";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <LogoHeader />
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
      <Button
        mode="contained"
        onPress={async () => {
          try {
            await login(email, password);
          } catch (err) {
            alert("Erro ao logar: " + (err?.message || "Verifique seus dados"));
          }
        }}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        labelStyle={{ color: "#fff" }}
      >
        Entrar
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Register")}
        mode="outlined"
        style={styles.button}
      >
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
