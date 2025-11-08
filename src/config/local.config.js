import {
  USE_POCKETBASE as ENV_USE_POCKETBASE,
  POCKETBASE_URL as ENV_POCKETBASE_URL,
  EXTERNAL_API_URL as ENV_EXTERNAL_API_URL,
  POKEDEX_API_URL as ENV_POKEDEX_API_URL,
} from "@env";

// Fallbacks e debug para facilitar diagnóstico
console.log("[DEBUG .env] ENV_USE_POCKETBASE:", ENV_USE_POCKETBASE);
console.log("[DEBUG .env] ENV_POCKETBASE_URL-aqui:", ENV_POCKETBASE_URL);
console.log("[DEBUG .env] ENV_EXTERNAL_API_URL:", ENV_EXTERNAL_API_URL);
console.log("[DEBUG .env] ENV_POKEDEX_API_URL:", ENV_POKEDEX_API_URL);

export const USE_POCKETBASE = (ENV_USE_POCKETBASE ?? "true") === "true";
export const POCKETBASE_URL = ENV_POCKETBASE_URL;
export const EXTERNAL_API_URL = ENV_EXTERNAL_API_URL;
export const POKEDEX_API_URL = ENV_POKEDEX_API_URL;
// Endpoints da PokéAPI
// O índice do array corresponde ao endpoint. Exemplo:
// POKEDEX_ENDPOINTS[0] = "ability"
// POKEDEX_ENDPOINTS[1] = "berry"
// ...
export const POKEDEX_ENDPOINTS = [
  "ability", // 0
  "berry", // 1
  "berry-firmness", // 2
  "berry-flavor", // 3
  "characteristic", // 4
  "contest-effect", // 5
  "contest-type", // 6
  "egg-group", // 7
  "encounter-condition", // 8
  "encounter-condition-value", // 9
  "encounter-method", // 10
  "evolution-chain", // 11
  "evolution-trigger", // 12
  "gender", // 13
  "generation", // 14
  "growth-rate", // 15
  "item", // 16
  "item-attribute", // 17
  "item-category", // 18
  "item-fling-effect", // 19
  "item-pocket", // 20
  "language", // 21
  "location", // 22
  "location-area", // 23
  "machine", // 24
  "move", // 25
  "move-ailment", // 26
  "move-battle-style", // 27
  "move-category", // 28
  "move-damage-class", // 29
  "move-learn-method", // 30
  "move-target", // 31
  "nature", // 32
  "pal-park-area", // 33
  "pokeathlon-stat", // 34
  "pokedex", // 35
  "pokemon", // 36
  "pokemon-color", // 37
  "pokemon-form", // 38
  "pokemon-habitat", // 39
  "pokemon-shape", // 40
  "pokemon-species", // 41
  "region", // 42
  "stat", // 43
  "super-contest-effect", // 44
  "type", // 45
  "version", // 46
  "version-group", // 47
];
