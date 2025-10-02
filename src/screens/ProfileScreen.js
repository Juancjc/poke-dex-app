import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme, Appbar } from "react-native-paper";
import AppTextInput from "../components/AppTextInput";
import { ThemeModeContext, AuthContext } from "../App";

export default function ProfileScreen() {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const { toggleTheme, mode } = useContext(ThemeModeContext);
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
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
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Salvar
        </Button>
        <Button mode="outlined" onPress={toggleTheme} style={styles.button}>
          Alternar para modo {mode === "light" ? "escuro" : "claro"}
        </Button>
        <Button
          Button
          mode="outlined"
          style={styles.button}
          icon="logout"
          onPress={logout}
          accessibilityLabel="Sair"
        >
          Sair
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
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
