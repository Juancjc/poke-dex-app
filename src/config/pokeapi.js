import { POKEDEX_API_UR, POKEDEX_ENDPOINTS } from "./local.config.example";

export function getPokemon(name) {
  return fetch(`${POKEDEX_API_URL}/${POKEDEX_ENDPOINTS[36]}/${name}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  );
}
