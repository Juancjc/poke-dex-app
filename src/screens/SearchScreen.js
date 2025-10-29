import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { getPokemon } from "../config/pokeapi";
import { TextInput, Button } from "react-native-paper";
export default function SearchScreen() {
  const theme = useTheme();
  const [nomePokemon, setNomePokemon] = React.useState("");
  const dadosPokemon = React.useState(null);
  // usar dadosPokemon para armazenar os dados retornados da API
  const [dados, setDados] = dadosPokemon;
  function exibirDadosPokemon() {
    if (!dados) return null;
    return (
      <View>
        <Text>Nome: {dados.name}</Text>
        <Text>Altura: {dados.height}</Text>
        <Text>Peso: {dados.weight}</Text>
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
          const pokemon = await getPokemon(nomePokemon.toLowerCase());
          console.log(pokemon);
        }}
      >
        Buscar Pokémon
      </Button>
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
