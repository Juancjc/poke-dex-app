import { POCKETBASE_URL } from "./local.config";
import PocketBase from "pocketbase";
import { getAuth } from "../utils/authPersist";

/**
 * Instância do PocketBase
 */
const pb = new PocketBase(POCKETBASE_URL);

/**
 * No React Native, deixar o fetch criar o boundary do multipart.
 * Este hook cobre tanto Headers nativos quanto objetos simples.
 */
pb.beforeSend = (url, req) => {
  try {
    // Caso Headers (RN / fetch padrão)
    if (req.headers?.get && typeof req.headers.get === "function") {
      const ct = req.headers.get("Content-Type");
      if (ct && ct.includes("multipart/form-data")) {
        req.headers.delete("Content-Type");
      }
    }
    // Caso objeto simples
    else if (req.headers && typeof req.headers === "object") {
      for (const k of Object.keys(req.headers)) {
        if (
          k.toLowerCase() === "content-type" &&
          String(req.headers[k]).includes("multipart/form-data")
        ) {
          delete req.headers[k];
        }
      }
    }
  } catch (_) {
    // silencioso: se algo der errado aqui, deixamos seguir
  }
  return req;
};

/**
 * Garante que há um usuário autenticado no pb.authStore.
 * Retorna o userId autenticado ou lança erro se não estiver autenticado.
 */
async function ensureAuth() {
  if (!pb.authStore?.model?.id) {
    const persisted = await getAuth();
    if (persisted?.token && persisted?.model) {
      pb.authStore.save(persisted.token, persisted.model);
    }
  }
  const userId = pb.authStore?.model?.id;
  if (!userId) {
    throw new Error("Usuário não autenticado. Faça login e tente novamente.");
  }
  return userId;
}

/**
 * Normaliza o asset do ImagePicker para o formato esperado pelo PocketBase:
 * { uri, name, type } ou null se não houver imagem.
 */
function normalizeImageFile(fotoAsset) {
  if (!fotoAsset?.uri) return null;

  const fileName =
    fotoAsset.fileName ||
    fotoAsset.name ||
    fotoAsset.uri.split("/").pop() ||
    `foto_${Date.now()}.jpg`;

  const lower = fileName.toLowerCase();
  let mimeType = "image/jpeg";
  if (lower.endsWith(".png")) mimeType = "image/png";
  else if (lower.endsWith(".gif")) mimeType = "image/gif";
  else if (lower.endsWith(".webp")) mimeType = "image/webp";
  else if (lower.endsWith(".bmp")) mimeType = "image/bmp";
  else if (lower.endsWith(".heic")) mimeType = "image/heic";
  else if (lower.endsWith(".jpg") || lower.endsWith(".jpeg"))
    mimeType = "image/jpeg";

  return { uri: fotoAsset.uri, name: fileName, type: mimeType };
}

/**
 * Constrói um FormData a partir de um objeto plano, tratando campo "foto".
 * - Campos não-arquivo são enviados como string ("" para null/undefined).
 * - Campo "foto" deve ser { uri, name, type }.
 */
function buildFormData(data) {
  const formData = new FormData();
  Object.entries(data || {}).forEach(([key, value]) => {
    if (key === "foto") {
      if (value?.uri) {
        formData.append("foto", value);
      }
    } else {
      // PocketBase aceita string/número/boolean; para segurança, convertendo para string
      const safe =
        value === null || value === undefined
          ? ""
          : typeof value === "string"
          ? value
          : String(value);
      formData.append(key, safe);
    }
  });
  return formData;
}

/**
 * Exclui um pokémon pelo id
 */
export async function excluirPokemonPocketBase(id) {
  await ensureAuth();
  try {
    await pb.collection("pokemons").delete(id);
    return true;
  } catch (error) {
    // Deixe a mensagem do PB chegar para o caller (útil para regras/ACL)
    throw error;
  }
}

/**
 * Busca todos os pokémons do usuário autenticado
 */
export async function listarPokemonsDoUsuario() {
  const userId = await ensureAuth();
  try {
    // getFullList pagina automaticamente
    const result = await pb.collection("pokemons").getFullList({
      filter: `user_id = "${userId}"`,
      sort: "-created",
    });
    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Cria um pokémon no PocketBase com suporte a upload de imagem.
 * `data` deve conter os mesmos campos usados no schema da coleção.
 */
export async function adicionarPokemonPocketBase(data) {
  await ensureAuth();

  // Se vier um asset cru, normalize aqui para garantir { uri, name, type }
  const normalized =
    data?.foto && !data.foto.uri
      ? { ...data, foto: normalizeImageFile(data.foto) }
      : data;

  const formData = buildFormData(normalized);

  try {
    const record = await pb.collection("pokemons").create(formData);
    return record;
  } catch (error) {
    // Dica: error?.data?.data traz validações do PB
    throw error;
  }
}

/**
 * Prepara o payload a partir da PokeAPI + ImagePicker para enviar ao PB.
 * - `pokeApiData`: objeto retornado pelo endpoint do Pokémon (com .id, .name, .sprites)
 * - `fotoAsset`: result.assets[0] do ImagePicker
 * - `nomeDado`: nome escolhido pelo usuário para o Pokémon
 * - `userId`: id do usuário (opcional se você usar ensureAuth no envio)
 */
export function prepararDadosPokemon(pokeApiData, fotoAsset, nomeDado, userId) {
  const foto = normalizeImageFile(fotoAsset);

  return {
    url_pokemon: `https://pokeapi.co/api/v2/pokemon/${pokeApiData.id}`,
    id_pokemon_api: pokeApiData.id,
    nome: pokeApiData.name,
    nome_dado: nomeDado,
    user_id: userId, // pode ser ignorado se as regras usarem @request.auth.id
    img_api: pokeApiData.sprites?.front_default || "",
    foto, // arquivo ou null
  };
}
