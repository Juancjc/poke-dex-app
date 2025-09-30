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

## Temas e Cores
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
