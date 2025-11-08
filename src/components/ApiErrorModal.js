import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";

export default function ApiErrorModal({ visible, onClose, error }) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Erro ao enviar</Text>
          <ScrollView style={{ maxHeight: 200 }}>
            <Text style={styles.errorText}>
              {typeof error === "string"
                ? error
                : JSON.stringify(error, null, 2)}
            </Text>
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
    maxWidth: 400,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  errorText: {
    color: "#c00",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "left",
  },
});
