## Comandos Projeto

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
