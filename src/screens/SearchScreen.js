import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { getFromPokeApi, getPokemon } from "../config/pokeapi";
import { TextInput, Button } from "react-native-paper";
export default function SearchScreen() {
  const theme = useTheme();
  const [nomePokemon, setNomePokemon] = React.useState("");
  const dadosPokemon = React.useState(null);
  // usar dadosPokemon para armazenar os dados retornados da API
  const [dados, setDados] = dadosPokemon;
  const [endpoint, setEndpoint] = React.useState("");
  function exibirDadosPokemon() {
    if (!dados) return null;
    return (
      <View style={{ alignItems: "center", marginTop: 16 }}>
        <Text>Nome: {dados.name}</Text>
        <Text>Altura: {dados.height}</Text>
        <Text>Peso: {dados.weight}</Text>
        {dados.sprites && dados.sprites.front_default && (
          <>
            <Text>Imagem:</Text>
            {/* Corrigido para React Native: usar Image */}
            <View style={{ marginVertical: 8 }}>
              <Image
                source={{ uri: dados.sprites.front_default }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#ccc",
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
              URL: {dados.sprites.front_default}
            </Text>
          </>
        )}
        {/* Exibe o JSON completo retornado da API */}
        <View style={{ marginTop: 16, width: "90%" }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            JSON retornado:
          </Text>
          <Text style={{ fontSize: 12, color: "#333" }}>
            {JSON.stringify(dados, null, 2)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.title}>Procure pokemons</Text>
      <TextInput
        placeholder="Nome do Pokémon"
        value={nomePokemon}
        onChangeText={setNomePokemon}
        style={styles.input}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={async () => {
          const nome = nomePokemon.toLowerCase();
          const pokemon = await getPokemon(nome);
          setDados(pokemon);
        }}
      >
        Buscar Pokémon
      </Button>
      {endpoint ? (
        <Text style={{ fontSize: 14, color: "#007aff", marginTop: 8 }}>
          Endpoint usado: {endpoint}
        </Text>
      ) : null}
      <Text style={styles.title}>Dados do seu pokemon</Text>
      {exibirDadosPokemon()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    width: "80%",
  },
  button: {
    marginTop: 16,

    alignSelf: "center",
  },
});
