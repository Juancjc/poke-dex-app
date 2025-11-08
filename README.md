## Gerar APK para instalar no celular

Por padrão, o comando `npx eas build --platform android` gera um arquivo `.aab` (Android App Bundle), que é usado para publicação na Play Store.

Para gerar um arquivo `.apk` (instalável diretamente no dispositivo), use:

```sh
npx eas build --platform android --profile preview
```

O link para baixar o APK será exibido no final do build no terminal ou no painel do EAS.

# Guia Rápido para Desenvolvedores

## Estrutura e arquivos essenciais

- `App.js` e `src/App.js`: ponto de entrada do app.
- `index.js`: registra o app no Expo.
- `src/config/local.config.js`: carrega variáveis do `.env` para uso no app.
- `src/config/pocketbase.js`: integra o app ao backend PocketBase.
- `src/config/pokeapi.js`: integra com a PokéAPI.
- `src/config/pokemonPocketBase.js`: funções para CRUD de pokémons no backend.
- `src/utils/authPersist.js`: persiste login usando `expo-secure-store`.
- `src/navigation/`: navegação entre telas (autenticação, abas, etc).
- `src/screens/`: telas principais (Login, Cadastro, Home, Favoritos, etc).
- `.env`: variáveis de ambiente (endereços de APIs, etc).

## Variáveis de ambiente

O arquivo `.env` deve estar na raiz do projeto, sem aspas:

```
USE_POCKETBASE=true
POCKETBASE_URL=https://pocket-base-railway-<ambiente>.up.railway.app
EXTERNAL_API_URL=http://<ip>:3000
POKEDEX_API_URL=https://pokeapi.co/api/v2
```

Essas variáveis são lidas automaticamente pelo app via `react-native-dotenv`.

## Comandos principais

Instalar dependências:
```sh
npm install
```

Rodar o app (Expo):
```sh
npx expo start -c
```

Login no EAS (Expo Application Services):
```sh
npx eas login
```

Build para Android/iOS:
```sh
npx eas build --platform android
npx eas build --platform ios
```

## Fluxo de autenticação

- O login/cadastro é feito nas telas de `src/screens/LoginScreen.js` e `src/screens/RegisterScreen.js`.
- O backend PocketBase é acessado via `src/config/pocketbase.js` e `src/config/pokemonPocketBase.js`.
- O token de autenticação é salvo localmente usando `expo-secure-store` (`src/utils/authPersist.js`).
- O estado de autenticação é controlado pelo `AuthContext` em `src/App.js`.

## Observações

- Sempre reinicie o Metro Bundler com `npx expo start -c` após mudar o `.env`.
- O app só lê variáveis do `.env` em tempo de build, não em tempo de execução.
- Para rodar o backend local, use o PocketBase conforme instruções abaixo.


# PokeDex App

## Passo a Passo para Criar a Aplicação (Guia para Aula)

### 1. Instalar o Node.js e o Expo CLI

- Baixe e instale o [Node.js](https://nodejs.org/).
- No terminal, instale o Expo CLI globalmente:
  ```sh
  npm install -g expo-cli
  ```

### 2. Criar o Projeto Expo

- No terminal, execute:
  ```sh
  expo init poke-dex-app
  ```
- Escolha o template **blank (TypeScript ou JavaScript)**.
- Entre na pasta do projeto:
  ```sh
  cd poke-dex-app
  ```

### 3. Estruturar as Pastas

- Crie a estrutura de pastas conforme abaixo (pode ser manualmente ou usando comandos):
  ```
  src/
    components/
    navigation/
    screens/
    style/
    hooks/
    utils/
    assets/
  ```

### 4. Instalar Dependências do Projeto

- Execute:
  ```sh
  npm install
  npm install react-native-paper react-native-vector-icons
  ```

### 5. Configurar o Backend (PocketBase)

- Baixe o [PocketBase](https://pocketbase.io/) para seu sistema operacional.
- Extraia o arquivo.
- No terminal, rode o servidor:
  - **Windows:**
    ```sh
    .\pocketbase.exe serve
    ```
  - **Linux/Mac:**
    ```sh
    ./pocketbase serve
    ```
  - **Rede local:**
    ```sh
    ./pocketbase serve --http=0.0.0.0:8090
    ```
- Acesse o painel web em `http://localhost:8090/_/`.

### 6. Configurar o Endereço do Backend

- No arquivo `src/config/local.config.js`, defina a URL do PocketBase:
  ```js
  export const POCKETBASE_URL = "http://localhost:8090";
  ```

### 7. Configurar o Expo para Usar a URL

- No arquivo `app.config.js`, adicione:
  ```js
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
  ```

### 8. Rodar o Projeto

- No terminal, execute:
  ```sh
  npm start
  ```
- Use o app Expo Go no celular para escanear o QR code e testar.

---

Aplicativo React Native com navegação, autenticação e tema customizado usando React Native Paper.

## Estrutura de Pastas

```
src/
  components/      # Componentes reutilizáveis
  navigation/      # Navegação (BottomTabs, AuthStack, RootNavigator)
  screens/         # Telas (Login, Cadastro, Home, etc)
  style/           # Paleta de cores e tema do Paper
  hooks/           # Custom hooks (futuros)
  utils/           # Funções utilitárias (futuras)
  assets/          # Imagens e ícones
App.js             # Entry point (importa src/App.js)
```

## Variáveis de ambiente no Expo

Para definir o endereço do backend (PocketBase), use o arquivo `app.config.js`:

```js
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
```

No código, acesse assim:

```js
import Constants from "expo-constants";
const POCKETBASE_URL = Constants.expoConfig.extra.POCKETBASE_URL;
```

Se aparecer erro ao importar do `@env`, troque para esse método.

---

## Como instalar e rodar o PocketBase

O backend do projeto utiliza o [PocketBase](https://pocketbase.io/), um banco de dados local leve e fácil de usar.

1. Acesse https://pocketbase.io/ e baixe o executável para seu sistema operacional.
2. Extraia o arquivo baixado.
3. Para rodar o servidor, execute no terminal:
   - **Windows:**
     ```sh
     .\pocketbase.exe serve
     ```
   - **Linux/Mac:**
     ```sh
     ./pocketbase serve
     ```
   - **Rede local (acessar de outros dispositivos):**
     ```sh
     ./pocketbase serve --http=0.0.0.0:8090
     ```
4. O painel web estará disponível em `http://localhost:8090/_/` ou `http://<ip-da-sua-maquina>:8090/_/`.
5. Configure o endereço do backend no arquivo `src/config/local.config.js` conforme instruções acima.

---

## Instalação do Projeto

1. Instale as dependências:
   ```sh
   npm install
   npm install react-native-paper react-native-vector-icons
   npm install -g expo-cli
   ```
2. Rode o app:
   ```sh
   npm start
   ```

## Paleta de Cores

### Light

```js
{
   primary: "#1976D2",
   secondary: "#FFB300",
   background: "#F5F5F5",
   surface: "#FFFFFF",
   error: "#D32F2F",
   success: "#388E3C",
   warning: "#FFA000",
   info: "#0288D1",
   text: "#222",
   textSecondary: "#666",
   border: "#E0E0E0",
   disabled: "#BDBDBD",
   tabActive: "#1976D2",
   tabInactive: "#BDBDBD",
   pokeRed: "#EE1515",
   pokeYellow: "#FFCC00",
   pokeBlue: "#3B4CCA",
   pokeGreen: "#48D0B0",
}
```

### Dark

```js
{
   primary: "#90CAF9",
   secondary: "#FFD54F",
   background: "#181A20",
   surface: "#23262F",
   error: "#EF5350",
   success: "#66BB6A",
   warning: "#FFA726",
   info: "#29B6F6",
   text: "#F5F5F5",
   textSecondary: "#BDBDBD",
   border: "#333646",
   disabled: "#555",
   tabActive: "#90CAF9",
   tabInactive: "#555",
   pokeRed: "#EE1515",
   pokeYellow: "#FFCC00",
   pokeBlue: "#3B4CCA",
   pokeGreen: "#48D0B0",
}
```

- As cores do app estão em `src/style/color.js`.
- O tema do Paper é customizado em `src/style/theme.js`.

## Navegação

- As abas do Bottom Navigation são controladas pelo array `TABS` em `src/navigation/BottomTabs.js`.
- Para adicionar/remover abas, basta editar esse array.

## Telas de Autenticação

- Login e Cadastro prontos para integração com backend.

## Observações

- Projeto pronto para expansão e fácil manutenção.
- Siga o padrão das pastas para novos componentes/telas.
