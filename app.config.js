import { POCKETBASE_URL } from "./src/config/local.config";

export default {
  expo: {
    name: "PokeDex App",
    slug: "poke-dex-app",
    version: "1.0.0",
    extra: {
      POCKETBASE_URL: POCKETBASE_URL,
    },
  },
};
