import PocketBase from "pocketbase";
import { getAuth } from "../utils/authPersist";

const pb = new PocketBase(
  "https://pocket-base-railway-production.up.railway.app"
);

// (opcional, mas ajuda no RN: deixe o fetch criar o boundary do multipart)
pb.beforeSend = (url, req) => {
  if (
    req.headers &&
    req.headers["Content-Type"]?.includes("multipart/form-data")
  ) {
    delete req.headers["Content-Type"];
  }
  return req;
};

export async function adicionarPokemonPocketBase(data) {
  // Sempre que houver chance de file, use FormData
  const formData = new FormData();

  // monta os campos
  Object.entries(data).forEach(([key, value]) => {
    if (key === "foto") {
      // Só anexa se for objeto { uri, name, type }
      if (value && value.uri) {
        formData.append("foto", value); // value já é { uri, name, type }
      }
      // se for null/undefined, simplesmente não manda o campo 'foto'
    } else {
      formData.append(key, value ?? "");
    }
  });

  // Recupera auth persistido, se necessário
  if (!pb.authStore.model || !pb.authStore.model.id) {
    const persisted = await getAuth();
    if (persisted?.token && persisted?.model) {
      pb.authStore.save(persisted.token, persisted.model);
    }
  }
  if (!pb.authStore.model?.id) {
    throw new Error("Usuário não autenticado. Faça login antes de enviar.");
  }

  try {
    const record = await pb.collection("pokemons").create(formData);
    return record;
  } catch (error) {
    // Dica: error?.data?.data traz validações do PB
    throw error;
  }
}
export function prepararDadosPokemon(pokeApiData, fotoAsset, nomeDado, userId) {
  // fotoAsset é o objeto do ImagePicker (result.assets[0])
  // Precisamos transformar em { uri, name, type }
  let foto = null;

  if (fotoAsset?.uri) {
    const fileName =
      fotoAsset.fileName ||
      fotoAsset.uri.split("/").pop() ||
      `foto_${Date.now()}.jpg`;
    // tenta inferir mime
    let mimeType = "image/jpeg";
    const lower = fileName.toLowerCase();
    if (lower.endsWith(".png")) mimeType = "image/png";
    else if (lower.endsWith(".gif")) mimeType = "image/gif";
    else if (lower.endsWith(".webp")) mimeType = "image/webp";
    else if (lower.endsWith(".bmp")) mimeType = "image/bmp";
    else if (lower.endsWith(".heic")) mimeType = "image/heic";
    else if (lower.endsWith(".jpg") || lower.endsWith(".jpeg"))
      mimeType = "image/jpeg";

    foto = { uri: fotoAsset.uri, name: fileName, type: mimeType };
  }

  return {
    url_pokemon: `https://pokeapi.co/api/v2/pokemon/${pokeApiData.id}`,
    id_pokemon_api: pokeApiData.id,
    nome: pokeApiData.name,
    nome_dado: nomeDado,
    user_id: userId,
    img_api: pokeApiData.sprites?.front_default || "",
    foto, // ✅ agora é um arquivo
  };
}
