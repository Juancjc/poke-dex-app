// Utilitário para persistir login usando expo-secure-store
import * as SecureStore from "expo-secure-store";

const KEY = "pb_auth";

export async function saveAuth(authData) {
  await SecureStore.setItemAsync(KEY, JSON.stringify(authData));
}

export async function getAuth() {
  const data = await SecureStore.getItemAsync(KEY);
  return data ? JSON.parse(data) : null;
}

export async function clearAuth() {
  await SecureStore.deleteItemAsync(KEY);
}
