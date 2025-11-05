import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";

export default function PokemonModal({ visible, onClose, dados }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Dados do Pokémon</Text>
            {dados ? (
              <>
                <Text>Nome: {dados.name}</Text>
                <Text>Altura: {dados.height}</Text>
                <Text>Peso: {dados.weight}</Text>
                {dados.sprites && dados.sprites.front_default && (
                  <View style={{ alignItems: "center", marginVertical: 8 }}>
                    <Image
                      source={{ uri: dados.sprites.front_default }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                    <Text style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
                      URL: {dados.sprites.front_default}
                    </Text>
                  </View>
                )}
                <View style={{ marginTop: 16, width: "100%" }}>
                  <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                    JSON retornado:
                  </Text>
                  <Text style={{ fontSize: 12, color: "#333" }}>
                    {JSON.stringify(dados, null, 2)}
                  </Text>
                </View>
              </>
            ) : (
              <Text>Nenhum dado encontrado.</Text>
            )}
          </ScrollView>
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    elevation: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
