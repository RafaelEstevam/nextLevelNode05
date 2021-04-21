## Comandos Projeto

## Instalar dependências e Yarn

```
npm install
npm install --global yarn
```

Iniciar o projeto

```
yarn dev
npm run dev
```

## Comandos Typeorm Migration

Comandos de gerenciamento do TYPEORM

Criação da migration dentro da pasta configurada

```
yarn typeorm migrations:create -n <Nome da Migration>
npm run typeorm migrations:create -- -n <Nome da Migration>
```

Rodar migration no banco de dados

```
yarn typeorm migrations:run
npm run typeorm migrations:run
```

## Documentação

A documentação das APIs está disponibilizada em http://localhost:3333/api-docs

### Gerar documentação

```
npm run swagger-autogen
```
