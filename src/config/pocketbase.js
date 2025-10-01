// Configuração global do PocketBase
import Constants from "expo-constants";
import PocketBase from "pocketbase";

const POCKETBASE_URL =
  Constants.expoConfig?.extra?.POCKETBASE_URL || "http://127.0.0.1:8090";
export const pb = new PocketBase(POCKETBASE_URL);

// Função de autenticação
export async function login(email, password) {
  return pb.collection("users").authWithPassword(email, password);
}

// Função de registro
export async function register(data) {
  return pb.collection("users").create(data);
}

// Função para verificar se está autenticado
export function isAuthenticated() {
  return pb.authStore.isValid;
}

// Função para logout
export function logout() {
  pb.authStore.clear();
}
