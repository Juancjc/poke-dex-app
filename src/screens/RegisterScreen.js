import React, { useState } from "react";
import { register } from "../config/pocketbase";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import AppTextInput from "../components/AppTextInput";

export default function RegisterScreen({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.title}>Cadastro</Text>
      <AppTextInput
        label="Nickname"
        value={nickname}
        onChangeText={setNickname}
        style={styles.input}
      />
      <AppTextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
            await register({
              email,
              password,
              passwordConfirm: password,
              name,
              nickname,
            });
            alert("Cadastro realizado com sucesso!");
            navigation.goBack();
          } catch (err) {
            alert(
              "Erro ao cadastrar: " + (err?.message || "Verifique os dados")
            );
          }
        }}
        style={styles.button}
      >
        Cadastrar
      </Button>
      <Button onPress={() => navigation.goBack()}>Já tem conta? Entrar</Button>
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
