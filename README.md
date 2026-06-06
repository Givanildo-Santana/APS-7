# ArLimpo Mobile

Aplicativo Android para consultar qualidade do ar e clima em cidades brasileiras.

## Como funciona

O usuário seleciona um estado, depois escolhe uma cidade daquele estado. O aplicativo consulta dados públicos de localização, clima e qualidade do ar e exibe um resumo ambiental com telas de detalhe.

## Fontes de dados

- IBGE: estados e municípios
- Open-Meteo: geocodificação, clima atual e qualidade do ar

## Tecnologias

- React Native
- Expo
- TypeScript
- Axios

## Instalação

O instalador Android fica na raiz do projeto:

```txt
ArLimpo-Mobile.apk
```

Para desenvolvimento local:

```bash
cd mobile
npm install
npm start
```

## API antiga

A pasta `api` foi mantida no repositório como serviço intermediário em Node.js e Express. O APK atual não depende dela para funcionar.
