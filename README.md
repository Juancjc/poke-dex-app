# PokeDex App

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

## Instalação

1. Instale as dependências:
   ```sh
   npm install
   npm install react-native-paper react-native-vector-icons
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
