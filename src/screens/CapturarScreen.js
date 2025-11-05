import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import { Modal, Portal } from "react-native-paper";
import ApiErrorModal from "../components/ApiErrorModal";
import { useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text, useTheme, TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getPokemon } from "../config/pokeapi";
import {
  adicionarPokemonPocketBase,
  prepararDadosPokemon,
} from "../config/pokemonPocketBase";

export default function CapturarScreen() {
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [dataParaConfirmar, setDataParaConfirmar] = useState(null);
  const [ultimoDataEnviado, setUltimoDataEnviado] = useState(null);
  const [erroModalVisible, setErroModalVisible] = useState(false);
  const [erroApi, setErroApi] = useState("");
  const theme = useTheme();
  const [nomePokemon, setNomePokemon] = useState("");
  const [pokeApiData, setPokeApiData] = useState(null);
  const [foto, setFoto] = useState(null);
  const [nomeDado, setNomeDado] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    async function fetchUserId() {
      try {
        const auth = await import("../utils/authPersist");
        const user = await auth.getAuth();
        if (user && user.model && user.model.id) {
          setUserId(user.model.id);
        }
      } catch (e) {
        setUserId("");
      }
    }
    fetchUserId();
  }, []);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function buscarPokemon() {
    setMensagem("");
    try {
      const data = await getPokemon(nomePokemon.toLowerCase());
      setPokeApiData(data);
    } catch (e) {
      setMensagem("Pokémon não encontrado!");
      setPokeApiData(null);
    }
  }

  async function escolherFoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFoto(result.assets[0]);
    }
  }

  async function tirarFoto() {
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFoto(result.assets[0]);
    }
  }

  async function enviarPocketBase() {
    setMensagem("");

    if (!nomePokemon) {
      setErroApi("Digite o nome do Pokémon!");
      setErroModalVisible(true);
      return;
    }

    const apiData = await getPokemon(nomePokemon.toLowerCase());
    if (!apiData?.id) {
      setErroApi("Pokémon não encontrado na PokéAPI!");
      setErroModalVisible(true);
      return;
    }
    setPokeApiData(apiData);
    const data = prepararDadosPokemon(apiData, foto, nomeDado, userId);
    setDataParaConfirmar(data);
    setModalConfirmVisible(true);
  }

  return (
    <>
      <ApiErrorModal
        visible={erroModalVisible}
        error={erroApi}
        onClose={() => setErroModalVisible(false)}
      />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <TextInput
          label="Nome do Pokémon"
          value={nomePokemon}
          onChangeText={setNomePokemon}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Nome dado ao Pokémon"
          value={nomeDado}
          onChangeText={setNomeDado}
          style={{ marginBottom: 12 }}
        />
        {/* O ID do usuário logado será preenchido automaticamente */}
        <Button mode="outlined" onPress={tirarFoto} style={{ marginBottom: 8 }}>
          Tirar Foto
        </Button>
        <Button
          mode="outlined"
          onPress={escolherFoto}
          style={{ marginBottom: 12 }}
        >
          Escolher da Galeria
        </Button>
        {foto && (
          <Image
            source={{ uri: foto.uri }}
            style={{ width: 100, height: 100, marginBottom: 12 }}
          />
        )}
        <Button mode="contained" onPress={enviarPocketBase} loading={enviando}>
          Enviar para PocketBase
        </Button>
        <Portal>
          <Modal
            visible={modalConfirmVisible}
            onDismiss={() => setModalConfirmVisible(false)}
            contentContainerStyle={{
              backgroundColor: "black",
              padding: 20,
              margin: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Confirme os dados antes de enviar:
            </Text>
            {dataParaConfirmar &&
              Object.entries(dataParaConfirmar).map(([key, value]) => (
                <Text key={key} style={{ marginBottom: 2 }}>
                  {key}: {String(value)}
                </Text>
              ))}
            <Button
              mode="contained"
              style={{ marginTop: 16 }}
              onPress={async () => {
                setEnviando(true);
                try {
                  await adicionarPokemonPocketBase(dataParaConfirmar);
                  setMensagem("Pokémon enviado com sucesso!");
                  setUltimoDataEnviado(dataParaConfirmar);
                } catch (e) {
                  setErroApi(e?.message || e);
                  setErroModalVisible(true);
                }
                setEnviando(false);
                setModalConfirmVisible(false);
              }}
            >
              Confirmar e Enviar
            </Button>
            <Button
              mode="outlined"
              style={{ marginTop: 8 }}
              onPress={() => setModalConfirmVisible(false)}
            >
              Cancelar
            </Button>
          </Modal>
        </Portal>
        {ultimoDataEnviado && (
          <View
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
              Dados enviados:
            </Text>
            {Object.entries(ultimoDataEnviado).map(([key, value]) => (
              <Text key={key} style={{ marginBottom: 2 }}>
                {key}: {String(value)}
              </Text>
            ))}
          </View>
        )}
        {mensagem ? (
          <Text
            style={{
              marginTop: 16,
              color: mensagem.includes("sucesso") ? "green" : "red",
            }}
          >
            {mensagem}
          </Text>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 20,
    borderRadius: 12,
    maxWidth: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    width: "8%",
  },
  button: {
    marginTop: 16,

    alignSelf: "center",
  },
});
