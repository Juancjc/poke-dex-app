import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { getPokemon } from "../config/pokeapi";
import PokemonModal from "../components/PokemonModal";
import { TextInput, Button } from "react-native-paper";
export default function SearchScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const theme = useTheme();
  const [nomePokemon, setNomePokemon] = React.useState("");
  const dadosPokemon = React.useState(null);
  // usar dadosPokemon para armazenar os dados retornados da API
  const [dados, setDados] = dadosPokemon;
  const [endpoint, setEndpoint] = React.useState("");
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
          setModalVisible(true);
        }}
      >
        Buscar Pokémon
      </Button>
      {endpoint ? (
        <Text style={{ fontSize: 14, color: "#007aff", marginTop: 8 }}>
          Endpoint usado: {endpoint}
        </Text>
      ) : null}
      <PokemonModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        dados={dados}
      />
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
