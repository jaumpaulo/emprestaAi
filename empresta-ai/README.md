# Empresta Ai

Sistema simples para registrar objetos emprestados entre amigos e acompanhar suas devolucoes. O projeto pode ser usado pelo terminal com `prompt-sync` ou pela API com Express.

## Estrutura

```text
empresta-ai/
├── middlewares/
│   └── validarEmprestimo.js
├── routes/
│   ├── index.js
│   └── emprestimos.js
├── index.js
├── servidor.js
├── menu.js
├── repositorio.js
└── package.json
```

## Instalar

Dentro da pasta do projeto, execute:

```bash
npm install
```

## Usar pelo terminal

Execute:

```bash
npm run menu
```

O menu permite cadastrar emprestimos, listar todos, listar os pendentes, registrar devolucoes e excluir registros. O usuario digita as informacoes diretamente no terminal.

## Usar a API

Para iniciar o servidor Express, execute:

```bash
npm run dev
```

A API vai funcionar em `http://localhost:3000`. Para fazer requisicoes, use o Bruno.

## Dias da semana

Digite somente o numero correspondente ao dia:

| Numero | Dia |
| --- | --- |
| 1 | Segunda-feira |
| 2 | Terca-feira |
| 3 | Quarta-feira |
| 4 | Quinta-feira |
| 5 | Sexta-feira |
| 6 | Sabado |
| 7 | Domingo |

## Rotas

Todas as rotas ficam dentro de `/api`.

| Metodo | URL | Funcao |
| --- | --- | --- |
| GET | `/api` | Mostra a mensagem da API |
| GET | `/api/emprestimos` | Lista todos os emprestimos |
| GET | `/api/emprestimos/pendentes` | Lista os que ainda nao foram devolvidos |
| GET | `/api/emprestimos/total` | Mostra a quantidade de emprestimos |
| GET | `/api/emprestimos/:id` | Busca um emprestimo pelo id |
| POST | `/api/emprestimos` | Cadastra um emprestimo |
| PATCH | `/api/emprestimos/:id` | Altera a situacao do emprestimo |
| DELETE | `/api/emprestimos/:id` | Exclui um emprestimo |

## Exemplo de cadastro pela API

No POST `/api/emprestimos`, envie um JSON como este:

```json
{
  "objeto": "Carregador",
  "pessoa": "Lucas",
  "diaEmprestimo": 2,
  "diaDevolucao": 5
}
```

A situacao comeca automaticamente como `emprestado` e o id e gerado pelo sistema.

## Observacoes

- Os dados ficam salvos no arquivo `emprestimos.json`, mesmo depois de fechar o programa.
- O menu do terminal e a API usam o mesmo arquivo de dados.
- Para os dias da semana, so sao aceitos numeros inteiros de 1 a 7.
- A validacao do cadastro pela API fica no middleware `validarEmprestimo`.
- O projeto usa Express, `prompt-sync` e `fs/promises`.
