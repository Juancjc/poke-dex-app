export default {
  expo: {
    name: "PokeDex App",
    slug: "poke-dex-app",
    version: "1.0.0",
    android: {
      package: "com.juancjc.pokedex",
    },
    extra: {
      // POCKETBASE_URL: process.env.POCKETBASE_URL, // Use process.env se quiser passar variáveis de ambiente do Node
      eas: {
        projectId: "22b5f7d1-6cbd-430a-b35c-afa01f09595b",
      },
    },
  },
};
