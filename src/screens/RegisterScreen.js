import React, { useState } from "react";
import { register } from "../config/pocketbase";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import AppTextInput from "../components/AppTextInput";
import LogoHeader from "../components/LogoHeader";

export default function RegisterScreen({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <LogoHeader />
      <Text style={styles.title}>Cadastro</Text>
      <AppTextInput
        label="Nickname"
        value={nickname}
        onChangeText={setNickname}
        style={styles.input}
      />
      <AppTextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
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
      <AppTextInput
        label="Confirmar senha"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        style={styles.input}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={async () => {
          try {
            if (password !== passwordConfirm) {
              throw new Error("Senha e confirmação não conferem");
            }
            await register({
              email,
              password,
              passwordConfirm,
              nome,
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
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        labelStyle={theme.colors.buttonTextColor}
      >
        Cadastrar
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        labelStyle={{ color: theme.colors.primary }}
      >
        Já tem conta? Entrar
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
