import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";

export default function MostrarPokemon({ dados, onVoltar }) {
  if (!dados) return null;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Dados do seu Pokémon</Text>
        <Text>Nome: {dados.name}</Text>
        <Text>Altura: {dados.height}</Text>
        <Text>Peso: {dados.weight}</Text>
        {dados.sprites && dados.sprites.front_default && (
          <>
            <Text>Imagem:</Text>
            <View style={{ marginVertical: 8 }}>
              <Image
                source={{ uri: dados.sprites.front_default }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.url}>URL: {dados.sprites.front_default}</Text>
          </>
        )}
        <View style={styles.jsonBox}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            JSON retornado:
          </Text>
          <Text style={styles.jsonText}>{JSON.stringify(dados, null, 2)}</Text>
        </View>
        <Button mode="outlined" style={styles.button} onPress={onVoltar}>
          Voltar para pesquisa
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  container: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    maxWidth: 400,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  url: {
    marginTop: 8,
    fontSize: 12,
    color: "#888",
  },
  jsonBox: {
    marginTop: 16,
    width: "90%",
  },
  jsonText: {
    fontSize: 12,
    color: "#333",
  },
  button: {
    marginTop: 24,
    alignSelf: "center",
  },
});
