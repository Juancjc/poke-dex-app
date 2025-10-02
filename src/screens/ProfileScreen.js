import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme, Appbar } from "react-native-paper";
import AppTextInput from "../components/AppTextInput";
import { ThemeModeContext, AuthContext } from "../App";

export default function ProfileScreen() {
  const [nickname, setNickname] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaNovaConfirm, setSenhaNovaConfirm] = useState("");
  const [loading, setLoading] = useState(false);
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
          label="Senha atual"
          value={senhaAntiga}
          onChangeText={setSenhaAntiga}
          style={styles.input}
          secureTextEntry
        />
        <AppTextInput
          label="Nova senha"
          value={senhaNova}
          onChangeText={setSenhaNova}
          style={styles.input}
          secureTextEntry
        />
        <AppTextInput
          label="Confirmar nova senha"
          value={senhaNovaConfirm}
          onChangeText={setSenhaNovaConfirm}
          style={styles.input}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={async () => {
            setLoading(true);
            try {
              // Validação de senha
              if (senhaNova || senhaNovaConfirm) {
                if (!senhaNova || !senhaNovaConfirm) {
                  throw new Error("Preencha a nova senha e a confirmação");
                }
                if (senhaNova !== senhaNovaConfirm) {
                  throw new Error("Nova senha e confirmação não conferem");
                }
                if (!senhaAntiga)
                  throw new Error("Informe a senha atual para alterar");
              }
              // Monta dados para update
              const updateData = {
                nickname,
                nome,
                email,
              };
              if (senhaNova) {
                updateData.oldPassword = senhaAntiga;
                updateData.password = senhaNova;
                updateData.passwordConfirm = senhaNovaConfirm;
              }
              const userId = pb.authStore.model?.id;
              if (!userId) throw new Error("Usuário não encontrado");
              await pb.collection("users").update(userId, updateData);
              alert("Dados atualizados com sucesso!");
              setSenhaAntiga("");
              setSenhaNova("");
              setSenhaNovaConfirm("");
            } catch (e) {
              alert("Erro ao atualizar: " + (e?.message || "Tente novamente"));
            }
            setLoading(false);
          }}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          labelStyle={{ color: "#fff" }}
          loading={loading}
        >
          Salvar
        </Button>
        <Button
          mode="contained"
          onPress={toggleTheme}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          labelStyle={{ color: "#fff" }}
        >
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
