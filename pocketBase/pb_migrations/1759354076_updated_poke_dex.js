/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_669363771")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_q553fad31o` ON `usuarios` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_q553fad31o` ON `usuarios` (`email`) WHERE `email` != ''"
    ],
    "name": "usuarios"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_669363771")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_q553fad31o` ON `poke_dex` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_q553fad31o` ON `poke_dex` (`email`) WHERE `email` != ''"
    ],
    "name": "poke_dex"
  }, collection)

  return app.save(collection)
})
