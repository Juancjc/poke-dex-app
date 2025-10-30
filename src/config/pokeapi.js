import { POKEDEX_API_URL, POKEDEX_ENDPOINTS } from "./local.config";

// Função genérica para buscar qualquer endpoint da PokéAPI
export function getFromPokeApi(endpoint, param = "") {
  let url = `${POKEDEX_API_URL}/${endpoint}`;
  if (param) url += `/${param}`;
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

// Função específica para buscar Pokémon
export function getPokemon(name) {
  return getFromPokeApi(POKEDEX_ENDPOINTS[36], name);
}
