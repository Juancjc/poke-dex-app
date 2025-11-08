import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  Text,
  useTheme,
  Card,
  Modal,
  Portal,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";

import {
  listarPokemonsDoUsuario,
  excluirPokemonPocketBase,
} from "../config/pokemonPocketBase";
import { POCKETBASE_URL } from "../config/local.config";

/* =========================
      Subcomponentes
========================= */

const FotoModal = React.memo(function FotoModal({
  visible,
  onDismiss,
  fotoUri,
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        {fotoUri ? (
          <Image
            source={{ uri: fotoUri }}
            style={styles.modalImg}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.muted}>Sem foto</Text>
        )}
      </Modal>
    </Portal>
  );
});

/* =========================
        Tela Principal
========================= */

export default function HomeScreen() {
  const theme = useTheme();

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [fotoModalVisible, setFotoModalVisible] = useState(false);
  const [fotoModalUri, setFotoModalUri] = useState(null);

  const baseUrl = (POCKETBASE_URL || "").replace(/\/$/, "");

  const getFotoUrl = useCallback(
    (item) => {
      if (!item || !item.foto || !item.id) return null;
      // Rota padrão de arquivos do PocketBase
      return `${baseUrl}/api/files/pokemons/${item.id}/${item.foto}`;
    },
    [baseUrl]
  );

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const result = await listarPokemonsDoUsuario();
      setPokemons(Array.isArray(result) ? result : []);
    } catch (e) {
      console.warn("Erro ao listar pokémons:", e);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const result = await listarPokemonsDoUsuario();
      setPokemons(Array.isArray(result) ? result : []);
    } catch (e) {
      console.warn("Erro ao atualizar lista:", e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPokemons();
    }, [fetchPokemons])
  );

  const openFoto = useCallback(
    (item) => {
      const url = getFotoUrl(item);
      if (url) {
        setFotoModalUri(url);
        setFotoModalVisible(true);
      }
    },
    [getFotoUrl]
  );

  const keyExtractor = useCallback(
    (item, index) => String(item?.id ?? index),
    []
  );
  const handleExcluir = useCallback(
    async (id) => {
      try {
        await excluirPokemonPocketBase(id);
        fetchPokemons();
      } catch (e) {
        alert("Erro ao excluir Pokémon");
      }
    },
    [fetchPokemons]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <Card style={styles.card} mode="elevated">
        <View style={styles.row}>
          <IconButton
            icon="camera"
            size={24}
            style={styles.iconBtn}
            onPress={() => openFoto(item)}
            accessibilityLabel="Ver foto enviada"
          />

          {item?.img_api ? (
            <Image
              source={{ uri: item.img_api }}
              style={styles.thumbnail}
              resizeMode="contain"
            />
          ) : (
            <View style={[styles.thumbnail, styles.thumbPlaceholder]} />
          )}

          <View style={styles.info}>
            <Text style={styles.nome} numberOfLines={1}>
              {item?.nome_dado ?? "Sem nome"}
            </Text>
            <Text style={styles.id} numberOfLines={1}>
              {item?.nome ?? "-"}
            </Text>
          </View>

          <IconButton
            icon="delete"
            size={24}
            style={styles.deleteBtn}
            onPress={() => handleExcluir(item.id)}
            accessibilityLabel="Excluir Pokémon"
            color="#e53935"
          />
        </View>
      </Card>
    ),
    [openFoto, handleExcluir]
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {" "}
      // background dinâmico
      <FotoModal
        visible={fotoModalVisible}
        onDismiss={() => setFotoModalVisible(false)}
        fotoUri={fotoModalUri}
      />
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator animating size="large" />
          <Text style={styles.muted}>Carregando...</Text>
        </View>
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.muted}>Nenhum Pokémon encontrado.</Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Layouts */
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  /* Card / Lista */
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },

  /* Imagens */
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
  thumbPlaceholder: {
    backgroundColor: "#eee",
  },

  /* Textos */
  nome: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
    textTransform: "capitalize",
    letterSpacing: 0.4,
    maxWidth: 160,
  },
  id: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "600",
    maxWidth: 160,
  },
  muted: {
    fontSize: 16,
    color: "#888",
  },

  /* Infos / Botões */
  info: {
    marginLeft: 12,
    flexShrink: 1,
  },
  iconBtn: {
    marginRight: 8,
    marginLeft: -8,
    backgroundColor: "#e0e7ef",
    borderRadius: 20,
  },
  deleteBtn: {
    position: "absolute",
    right: -110,
    top: 8,
    backgroundColor: "#fdecea",
    borderRadius: 20,
    zIndex: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingRight: 48, // espaço para o botão de excluir
  },

  /* Modal */
  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 24,
  },
  modalImg: {
    width: 280,
    height: 280,
    borderRadius: 16,
    backgroundColor: "#f2f2f2",
  },
});
