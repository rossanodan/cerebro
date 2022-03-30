# Cerebro

## How to install

To install required dependencies, run

```
npm install
```

> Developed with Node v14.15.4

## How to run in local environment

First, create a `.env` file (see `.env.example`) and paste your public and private key to access Marvel Developer APIs.
Then, in the root folder, run

```
npm run dev
```

You will see something like this in the terminal

```
🚀 Server is ready at http://localhost:4001/graphql
```

Open a web browser and visit http://localhost:4001/graphql.

## Queries

| Query       | Description | Params | Return type |
| ----------- | ----------- | ------ | ----------- |
| `getCharacters`      | Returns a list of characters       | limit: number, name: string | `GetCharactersResponse` |

`*` mandatory param