import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme, TextInput, Button } from "react-native-paper";
import { getPokemon } from "../config/pokeapi";
import MostrarPokemon from "../components/MostrarPokemon";

export default function SearchScreen() {
  const theme = useTheme();
  const [nomePokemon, setNomePokemon] = React.useState("");
  const [dados, setDados] = React.useState(null);
  const [mostrar, setMostrar] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState("");

  async function buscarPokemon() {
    const nomeFormatado = nomePokemon.toLowerCase();
    const pokemon = await getPokemon(nomeFormatado);
    setDados(pokemon);
    setMostrar(true);
  }

  function handleVoltar() {
    setMostrar(false);
    setDados(null);
    setNomePokemon("");
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {!mostrar ? (
        <>
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
            onPress={buscarPokemon}
          >
            Buscar Pokémon
          </Button>
          {endpoint ? (
            <Text style={{ fontSize: 14, color: "#007aff", marginTop: 8 }}>
              Endpoint usado: {endpoint}
            </Text>
          ) : null}
        </>
      ) : (
        <MostrarPokemon dados={dados} onVoltar={handleVoltar} />
      )}
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
